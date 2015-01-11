var fs = require("fs");

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (! process.env.SAUCE_USERNAME) {
    if (! fs.existsSync("sauce.json")) {
      console.log("Create a sauce.json with your credentials.");
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require("./sauce").username;
      process.env.SAUCE_ACCESS_KEY = require("./sauce").accessKey;
    }
  }

  // Check out https://saucelabs.com/platforms for all browser/platform combos
  var customLaunchers = {
    "SL_Chrome": {
      base: "SauceLabs",
      browserName: "chrome",
      platform: "Linux"
    },
    "SL_IE": {
      base: "SauceLabs",
      browserName: "internet explorer"
    },
    "SL_IE_9": {
      base: "SauceLabs",
      browserName: "internet explorer",
      version: "9"
    },
    "SL_IE_8": {
      base: "SauceLabs",
      browserName: "internet explorer",
      version: "8"
    },
    "SL_Firefox": {
      base: "SauceLabs",
      browserName: "firefox"
    },
    "SL_iphone": {
      base: "SauceLabs",
      browserName: "iphone"
    },
    "SL_android": {
      base: "SauceLabs",
      browserName: "android"
    },
    "SL_safari": {
      base: "SauceLabs",
      browserName: "safari",
      platform: "OS X 10.10"
    },
    "SL_opera": {
      base: "SauceLabs",
      browserName: "Opera",
      platform: "Linux"
    }
  };

  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "src/js/source.js",
      "test/unit/**/*.spec.js"
    ],
    reporters: ["dots", "saucelabs"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: "Cloudflare integration for Piwik unit tests"
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
