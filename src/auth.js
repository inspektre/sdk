const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path');
const { Issuer } = require('openid-client');
const prompts = require('prompts');
const got = require('got');
const open = require('open');
const dotenv = require('dotenv');
const figures = require('figures');
const chalk = require('chalk');

const envpath = path.join(homedir, '/.config/inspektre/.env');
dotenv.config({ path: envpath });


const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Auth = (async (verbose, headless) => {
  const audience = 'https://api.inspektre.io';
  const scope = 'email offline_access openid';

  if(process.env.INSPEKTRE_CLIENT_ID === undefined || process.env.INSPEKTRE_CLIENT_SECRET === undefined) {
    process.stdout.write('Please set the requiredenvironment variables');
    process.stdout.write('Visit: https://app.inspektre.io/app/account for details');
    process.exit(1);
  };
  // fetches the .well-known endpoint for endpoints, issuer value etc.
  const auth = await Issuer.discover('https://auth.inspektre.io');

  // instantiates a client
  const client = new auth.Client({
    client_id: process.env.INSPEKTRE_CLIENT_ID,
    client_secret: process.env.INSPEKTRE_CLIENT_SECRET,
    token_endpoint_auth_method: 'Post',
    id_token_signed_response_alg: 'RS256',
  });

  // Device Authorization Request - https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15#section-3.1
  const { body: deviceAuthorizationResponse } = await got.post(auth.device_authorization_endpoint, {
    json: true, // parse the response as json
    form: true, // send the request body as application/x-www-form-urlencoded
    body: { client_id: client.client_id, scope: scope, audience: audience }, // no client authentication
  });

  const { verification_uri_complete, device_code, user_code, expires_in } = deviceAuthorizationResponse;
  let { interval } = deviceAuthorizationResponse;

  // use the interval specified or default to 5seconds as per the specification
  // interval
  //   OPTIONAL.  The minimum amount of time in seconds that the client
  //   SHOULD wait between polling requests to the token endpoint.  If no
  //   value is provided, clients MUST use 5 as the default.
  if (interval) {
    // interval in ms
    interval = interval * 1000;
  } else {
    interval = 5000;
  }

  

  if(!headless) {
    await prompts({
      type: 'invisible',
      message: `Press any key to open up the browser to login or press ctrl-c to abort. You should see the following code: ${chalk.underline.bgRed(user_code)}. It expires in ${expires_in % 60 === 0 ? `${expires_in / 60} minutes` : `${expires_in} seconds`}.`,
    });
    open(verification_uri_complete);
  }
  else {
    process.stdout.write(chalk.yellow(figures.main.arrowRight).concat(`Navigate to https://auth.inspektre.io/activate and enter the code: ${chalk.underline.bgRed(user_code)}\n`));
  }
  
  let done;
  let tokens;
  let logged;

  while (!done && !tokens) {
    // Device Access Token Request https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15#section-3.4
    tokens = await client.grant({
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      device_code,
    }).catch((err) => {
      switch (err.error) {
        case 'slow_down': // soft error, should re-try in the specified interval
        case 'authorization_pending': // soft error, should re-try in the specified interval
          if (!logged) {
            if(verbose === true){
              process.stdout.write('\n\nauthorization pending ...\n');
            }
            logged = true;
          }
          return wait(interval);
          break;
        case 'access_denied': // end-user declined the device confirmation prompt, consent or rules failed
          if(verbose === true) {
            process.stderr.write('\n\ncancelled interaction\n');
          }
          done = true;
          break;
        case 'expired_token': // end-user did not complete the interaction in time
          process.stderr.write('\n\nAuthorization\n');
          done = true;
          break;
        default:
          if (err.name === 'OpenIdConnectError' && verbose === true) {
            process.stderr.write(`\n\nerror = ${err.error}; error_description = ${err.error_description}\n`);
            done = true;
          } else {
            throw err;
          }
      }
    });
  }
  if(tokens) {
    if (tokens.id_token) {
      await client.validateIdToken(tokens); // validate ID Token (mandatory claims and signature)
    }
    console.log(chalk.green(figures.main.tick).concat(' Authorization successful.'));
    // process.stdout.write(figures.main.tick, "Device is now authorized. Saving Access Locally.\n");
    fs.writeFile(envpath, `INSPEKTRE_ACCESS_TOKEN=${tokens.access_token}`, function (err) {
      if (err) {
        process.stderr.write('Failed to set access token');
        process.exit(1);
      }
    });
    process.stdout.write('Please Save the below into your environment as INSPEKTRE_TOKEN\n');
    process.stdout.write(chalk.green(figures.main.arrowRight));
    process.stdout.write(`${tokens.refresh_token}\n`);
    // requests without openid scope will not contain an id_token
    process.stdout.write('completed\n');
  }
});



const Refresh = async (verbose) => {
  const auth = await Issuer.discover('https://auth.inspektre.io');
  // const localAuthData = readAuthConfig();
  const data = await got.post(auth.token_endpoint, {
      json: true, // parse the response as json
      form: true, // send the request body as application/x-www-form-urlencoded
      body: {
          grant_type: 'refresh_token',
          client_id: process.env.INSPEKTRE_CLIENT_ID,
          refresh_token: process.env.INSPEKTRE_TOKEN
      },
  });

  if(data && data.body && data.body.access_token) {
    fs.writeFile(envpath, `INSPEKTRE_ACCESS_TOKEN=${data.body.access_token}`, function (err) {
      if (err) {
        process.stderr.write('Failed to set access token');
        process.exit(1);
      }
    });
    if(verbose) {
      process.stdout.write("Refreshing Authentication for the device was successful.\n");
    }
    process.stdout.write(figures.main.tick.concat(" Device is now reauthorized.\n"));
  }
};

module.exports = { Auth, Refresh };