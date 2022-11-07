const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == "production";

const config = {
  target: 'node',
  entry: "./src/webpackTest.js",
  experiments: {
    topLevelAwait: true
  },
  output: {
    filename: 'webpackTest.bundle.js',
  },
  resolve: {
    extensions: [".js"],
    mainFields: ["main"]
  },
  // resolve: {
  //   extensions: [".tsx", ".ts", ".js", ".mjs"],
  //   fallback:
  //   {
  //     assert: require.resolve('assert'),
  //     assert: require.resolve("assert/"),
  //     buffer: require.resolve('buffer'),
  //     crypto: require.resolve('crypto-browserify'),
  //     fs: require.resolve('fs'),
  //     http: require.resolve('stream-http'),
  //     https: require.resolve('https-browserify'),
  //     os: require.resolve("os-browserify/browser"),
  //     stream: require.resolve('stream-browserify'),
  //     url: require.resolve('url'),
  //     url: require.resolve("url/")
  //   }
  // },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};