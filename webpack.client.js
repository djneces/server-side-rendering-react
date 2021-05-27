const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  //tell webpack the root file, it's different than for server webpack config
  entry: './src/client/client.js',

  //tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};

//merge config files
module.exports = merge(baseConfig, config);
