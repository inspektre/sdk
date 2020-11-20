const { Issuer } = require('openid-client');
const prompts = require('prompts');
const got = require('got');
const open = require('open');
const dotenv = require('dotenv');
const figures = require('figures');
const { writeAuthConfig, readAuthConfig } = require('./util');
const chalk = require('chalk');

dotenv.config();


const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Auth = (async (verbose, headless) => {
  const audience = 'https://api.inspektre.io';
  const scope = 'email offline_access openid';

  if(process.env.INSPEKTRE_CLIENT_ID === undefined || process.env.INSPEKTRE_CLIENT_SECRET === undefined) {
    console.log('Please set the requiredenvironment variables');
    console.log('Visit: https://app.inspektre.io/app/account for details');
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
              console.log('\n\nauthorization pending ...');
            }
            logged = true;
          }
          return wait(interval);
          break;
        case 'access_denied': // end-user declined the device confirmation prompt, consent or rules failed
          if(verbose === true) {
            console.error('\n\ncancelled interaction');
          }
          done = true;
          break;
        case 'expired_token': // end-user did not complete the interaction in time
          console.error('\n\ndevice flow expired');
          done = true;
          break;
        default:
          if (err.name === 'OpenIdConnectError' && verbose === true) {
            console.error(`\n\nerror = ${err.error}; error_description = ${err.error_description}`);
            done = true;
          } else {
            throw err;
          }
      }
    });
  }
  if(tokens) {
    // requests without openid scope will not contain an id_token
    console.log('completed');
    if (tokens.id_token) {
      await client.validateIdToken(tokens); // validate ID Token (mandatory claims and signature)
    }

    console.log(figures.main.tick, "Device is now authorized");
    // console.log('\n\nresult tokens', { ...tokens });
    const { access_token, refresh_token} = tokens;
    writeAuthConfig({ inspektre_access_token: access_token, inspektre_refresh_token: refresh_token });
    // To Observe claims -> tokens.claims()
    // To get user info ->  await client.userinfo(tokens)
  }
});



const Refresh = async (verbose) => {
  const auth = await Issuer.discover('https://auth.inspektre.io');
  const localAuthData = readAuthConfig();
  const data = await got.post(auth.token_endpoint, {
      json: true, // parse the response as json
      form: true, // send the request body as application/x-www-form-urlencoded
      body: {
          grant_type: 'refresh_token',
          client_id: process.env.INSPEKTRE_CLIENT_ID,
          refresh_token: localAuthData.inspektre_refresh_token
      },
  });

  if(data) {
    writeAuthConfig({ inspektre_access_token: data.body.access_token, inspektre_refresh_token: data.body.refresh_token });
    if(verbose) {
      console.log("Refreshing Authentication for the device was successful");
    }
    console.log(figures.main.tick.concat(" Device is now reauthorized."));
  }
};

module.exports = { Auth, Refresh };