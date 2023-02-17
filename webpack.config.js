const path = require('path');

module.exports = {
  entry: './src/index.ts', // webpack enters here
  devtool: 'inline-source-map', // eextract source maps from tsconfig.json
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader', // loads all ts and tsx files, relies on tsconfig.json module
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // outputs this file
    path: path.resolve(__dirname, 'dist'),
  },
};