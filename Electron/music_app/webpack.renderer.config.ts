import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

import path from 'path'
// eslint-disable-next-line import/default
import CopyWebpackPlugin from 'copy-webpack-plugin'

const assets = ['asset/img','asset/icon'];
const copyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns:[
      {
        from: path.resolve( __dirname, 'src', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }
    ]
  });
});


export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }
        ],
      }
    ],
  },
  plugins: [...plugins, ...copyPlugins],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'), // 將 @ 映射到 src 目錄
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  externals: {
    electron: 'commonjs2 electron',
  }
};
