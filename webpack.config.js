const path = require("path");
const HTMLplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
    reg: "./src/reg.js",
    prof: "./src/prof.js",
  },
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLplugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["app"],
    }),
    new HTMLplugin({
      filename: "signin.html",
      template: "./src/signin.html",
      chunks: ["reg"],
    }),
    new HTMLplugin({
      filename: "profile.html",
      template: "./src/profile.html",
      chunks: ["prof"],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
