var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/main.css');
 
var config = {
  context: path.join(__dirname, 'client/js'),
  entry: [
    './ClientApp.jsx',
  ],
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      { test: /\.scss$/i, 
        loader: extractCSS.extract(['css','sass']) 
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins:[
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    extractCSS
  ]
};

module.exports = config;
