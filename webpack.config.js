const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let configBase = {
  entry: {
    index: "./index.js",
    monero: "./libs/monero.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
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
      {
        test: /\.(woff(2)?|png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        ],
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
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
  plugins: [
    new HtmlWebpackPlugin({
      title: "TipXMR",
      template: "index.html",
    }),
  ],
};

module.exports = configBase;
