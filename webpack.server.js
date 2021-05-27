const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
//shave off the files needed for webpack => reducing the app starting time
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  //inform webpack that we're building a bundle for nodeJs, rather than for the browser
  target: 'node',

  //tell webpack the root file of our server application
  entry: './src/index.js',

  //tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  //whatever lib included in node_modules is not included in server side bundle
  externals: [webpackNodeExternals()],
};

//merge config files
module.exports = merge(baseConfig, config);
