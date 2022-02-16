const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const assets = ['asset'];
const copyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({patterns:[
    {
      from: path.resolve( __dirname, 'src', asset),
      to: path.resolve(__dirname, '.webpack/renderer', asset)
    }
  ]});
});

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: [...plugins,...copyPlugins],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  externals: {
    electron: 'commonjs2 electron',
  },
};
