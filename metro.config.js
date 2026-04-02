const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Customize Metro bundler for faster development
config.resolver.assetExts.push(
  // Add any additional asset extensions if needed
);

// Enable faster bundling for development
config.transformer.minifierConfig = {};

// Configure for faster development builds
config.watchFolders = [__dirname];

module.exports = config;
