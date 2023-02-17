//webpack.config.js
const path = require('path');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
plugins: [
    new HtmlWebpackPlugin({
          inlineSource: '.(js|css)$' // embed all javascript and css inline
      }),
    new HtmlWebpackInlineSourcePlugin()
  ]  

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/App.tsx",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "app-bundle.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};