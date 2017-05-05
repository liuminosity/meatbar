const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'frontend/dist');
const APP_DIR = path.resolve(__dirname, 'frontend/src');

const config = {
  entry: APP_DIR + '/main.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
     loaders : [
       {
         test : /\.jsx?/,
         include : APP_DIR,
         loader : 'babel-loader'
       },
       {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       }
     ]
   }
};

module.exports = config;
