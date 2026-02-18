const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro"); // make sure this import exists

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Apply uniwind modifications before exporting
const uniwindConfig = withUniwindConfig(config, {
  // relative path to your global.css file
  cssEntryFile: "./src/global.css",
  // optional: path to typings
  dtsFile: "./src/uniwind-types.d.ts",
  // custom themes beyond light/dark
  extraThemes: [
    "light-default",
    "light-ocean",
    "light-forest",
    "light-sunset",
    "light-lavender",

    "dark-default",
    "dark-ocean",
    "dark-forest",
    "dark-sunset",
    "dark-lavender",
  ],
});

module.exports = uniwindConfig;
