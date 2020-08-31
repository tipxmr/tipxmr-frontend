const path = require("path");

let configBase = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname, "node_modules"),
        type: "javascript/auto",
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
            },
          },
        ],
      },
    ],
  },
  devtool: "source-map",
  externals: ["worker_threads", "ws", "perf_hooks"], // exclude nodejs
  resolve: {
    alias: {
      fs: "html5-fs",
    },
    extensions: [".js", ".jsx", ".css", ".json", "otf", "ttf", "eot", "svg"],
    modules: ["node_modules"],
  },
  cache: true,
  context: __dirname,
};

let monero = Object.assign({}, configBase, {
  name: "Offline wallet generator",
  entry: "./src/libs/monero.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monero.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    // open browser after npm start
    open: false,
    hot: true,
  },
});

module.exports = monero;
