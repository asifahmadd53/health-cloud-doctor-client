const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get default RN config
const defaultConfig = getDefaultConfig(__dirname);

// Add project root to watchFolders so Metro sees polyfill.js early
defaultConfig.watchFolders = [...(defaultConfig.watchFolders || []), __dirname];

const config = mergeConfig(defaultConfig, {
  // Your other custom config can go here if needed
});

module.exports = withNativeWind(config, { input: "./global.css" });
