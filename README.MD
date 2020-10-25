# Inspektre CLI & SDK 
This is a mono repo for CLI as well as javascript SDK forInspektre Security Graphs.

## Code Scan
![CodeQL](https://github.com/inspektre/inspektre/workflows/CodeQL/badge.svg?branch=main)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/inspektre/inspektre.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/inspektre/inspektre/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/inspektre/inspektre.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/inspektre/inspektre/context:javascript)

## Wiki
`inspektre-cli` Wiki can be found [here](https://github.com/inspektre/sdk/wiki)

## Purpose
This CLI utility is helpful in performing the following:
1. Query Inspektre Security Graphs.
2. Manage projects on Inspektre Platform.
3. Modify user roles or permissions.
4. Supress attack patterns or weaknesses or verifications.

`inspektre-cli` is a graphql client that queries to `api.inspektre.io` and query the `inspektre security graphs`. 


## Usage 
```
Usage: cli [options] [command]

  _                      _    _                           _ _
 (_)_ __  ___ _ __   ___| | _| |_ _ __ ___            ___| (_)
 | | '_ \/ __| '_ \ / _ \ |/ / __| '__/ _ \  _____   / __| | |
 | | | | \__ \ |_) |  __/   <| |_| | |  __/ |_____| | (__| | |
 |_|_| |_|___/ .__/ \___|_|\_\\__|_|  \___|          \___|_|_|
             |_|                                               

Options:
  -V, --version          output the version number
  -h, --help             display help for command

Commands:
  version                Display the version of Inspektre-CLI in use.
  init [options]         Initialize Configuration store in the user's home directory
  authorize [options]    Authorize a Device to interact with Inspektre API
  reauthorize [options]  Reauthorize a Device to interact with Inspektre API
  projects [options]     Query for projects created on Inspektre
  attacks [options]      Query for general attack patterns on Inspektre by Likelihood, Severity, Tag OR Skill Level of a malicious actor
  weakness [options]     Query for weaknesses recorded on Inspektre by tags.
```

## Authorize
Inspektre CLI command `authorize` is  *Device Authorization Grant* as specified in OAuth 2.0 RFC 8628 located [here](https://tools.ietf.org/html/rfc8628).
- To Authorize a device, run `inspektre-cli authorize`.
- For verbose mode, run `inspektre-cli authorize -v`.

## Reauthorize
Reauthroize command is used to refresh device authorization and extending the device authorization.
- To reauthorize, run `inspektre-cli reauthorize`.
- For Verbose, run `inspektre-cli reauthorize -v`.

## Environment Variables
- In order to use Inspektre `CLI`, Please ensure that an environment variable `CLIENT_ID` is set.
- You will be able find the `CLIENT_ID` under your account at `https://app.inspektre.io/app/account`.


##  Development
- When bumping cli `version`, Please change it in the package.json `manifest` file.
- This entry in the manifestis used to get the `version` into the CLI Client.

## Builds
In order to generate binaries for `Mac OS X` or`Windows` or `Linux`, Vercel `pkg` is required.

With Yarn
```
yarn global add pkg
```

With NPM
```
npm i -g pkg
```

## Typical Severity
- Critical, High, Medium, Low, Very Low

## Likelihood of Attack
- High, Low, Medium
