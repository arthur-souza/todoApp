const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DEV_MODE = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.[hash].js",
    publicPath: "/",
    sourceMapFilename: "bundle.[hash].js.map",
  },
  devtool: DEV_MODE ? "evel" : "eval-cheap-module-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: "/node_modules",
      },
      {
        test: /\.css/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 1,
              localIdentName: "[local]",
            }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64:5]",
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./src"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
}