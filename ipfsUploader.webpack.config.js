const isProduction = process.env.NODE_ENV == "production";

const config = {
  target: 'node',
  entry: "./src/ipfsUploader.ts",
  experiments: {
    topLevelAwait: true
  },
  output: {
    filename: 'ipfsUploader.bundle.js',
    // libraryTarget: "umd"
  },
  module: {
    // unknownContextCritical: false,
    rules: [
      // {
      //   test: /\.node$/,
      //   loader: "node-loader",
      // },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.m?js$/i,
        type: "javascript/auto",
      },
      // {
      //   test: /\.m?js$/i,
      //   resolve: {
      //     fullySpecified: false,
      //   },
      // },
    ],
  },
  resolve: {
    mainFields: ["main"],
    extensions: [

      ".js",
      ".tsx", ".ts", ".js", ".mjs"
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};