const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let configBase = {
  entry: {
    index: "./index.js",
    monero: "./libs/monero.js",
  },
  output: {
    path: path.resolve(__dirname, "dist2"),
    filename: "[name].js",
    publicPath: "/",
  },
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
  devServer: {
    contentBase: path.join(__dirname, "dist2"),
    historyApiFallback: true,
    // open browser after npm start
    open: true,
    hot: true,
  },
  externals: ["worker_threads", "ws", "perf_hooks"], // exclude nodejs
  resolve: {
    alias: {
      fs: "html5-fs",
    },
    extensions: [".js", ".jsx", ".css", ".json", "otf", "ttf", "eot", "svg"],
    modules: ["node_modules"],
  },
  cache: true,
  context: path.resolve(__dirname, "src"),
  plugins: [new HtmlWebpackPlugin()],
};

/* let monero = {
  name: "Offline wallet generator",
  entry: "./src/libs/monero.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monero.js",
    publicPath: "/",
  },
};

let indexjs = Object.assign({}, configBase, {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
}); */

module.exports = configBase;
