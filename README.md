[![Build Status](https://travis-ci.org/BitolaCo/piwik-cloudflare.svg?branch=master)](https://travis-ci.org/BitolaCo/piwik-cloudflare)

This is a CloudFlare app to automatically inject Piwik tracking JavaScript
code into your CloudFlare powered website.

It (currently) does not support all the Piwik JavaScript tracking code
features, so feel free to submit a PR if you can add any of the features.
We'll be happy to merge it.

## Developing

We're using a [GulpJS](http://gulpjs.com) powered build system. JavaScript code is 
automatically built using Uglify . Just run 
the follow command to get started:

```bash
gulp
```

That will kick off both the Karma test runner and JSHint linting.
Both will run constantly in the background, and run the tests
in the following browsers:

- Chrome
- Chrome Canary
- Firefox
- Opera
- PhantomJS

## Testing

Any pull requests should be fully tested.

Unit testing is done with [Karma](https://karma-runner.github.io/).


### Running tests once

To run the unit tests, simply run the following command:

```bash
gulp test
```

### Building for production

Run the build command. It runs all the tests first, and
then builds the files if everything passes.

```bash
gulp build
```

## To Do

- Fuller test suite of browsers via [Sauce Labs](https://saucelabs.com/opensauce)
- [Travis CI](https://travis-ci.org) integration.
- Complete the tracking code options to match the Piwik dashboard.