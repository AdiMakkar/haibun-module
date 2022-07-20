# haibun-web-accessibility-lighthouse

Haibun Web Accessibility Lighthouse is a module that incorporates Haibun's integration and testing with that of Lighthouse, an open source API used for measuring the quality of web pages. 

## Installation

Normally, libraries from this repository will be included in a project like any other, or used via the cli, for example, using `npx @haibun/cli`. For more information you can visit `Haibun` at `https://github.com/withhaibun/haibun`

### Lighthouse 

Lighthouse is a tool developed by Google that analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices.

To download: 

`npm i lighthouse`

### Playwright-Lighthouse 

Playwright is a Node library to automate Chromium, Firefox and WebKit with a single API. Also built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

To download: 

`npm i playwright-lighthouse`

With the requirement of 'lighthouse', 'playwright', and 'playwright-lighthouse', add them to your project:

```sh
$ yarn add -D playwright-lighthouse playwright lighthouse
# or
$ npm install --save-dev playwright-lighthouse playwright lighthouse
```

After the installation, the modules in this repository can be used freely. 

# Developing haibun-web-accessibility-lighthouse

Installation uses a shell script, which is tested in Linux & macOS,
and should also work on Windows using WSL.

Clone the repo, 
and install Lerna and Typescript globally;

`npm i -g lerna typescript`

To build:

  `npm run build`

  `npm run tsc-watch`

Use this at the top level to build and watch all modules.

Top level tests for all modules are also available:

`npm run test`

or

`npm run test-watch`

Each module can be developed independently using: 

`npm run tsc-watch`  # not needed if using top-level `tsc-watch`

`npm test`

or 

`npm run test-watch`

## Developing modules and Haibun core together

To develop your own separate module while developing Haibun modules, use:

`npm link @haibun/core`

and any other modules you may need.
