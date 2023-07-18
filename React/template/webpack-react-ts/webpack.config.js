const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin,EnvironmentPlugin } = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
  mode:'development',
  entry: [
    './src/entry.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    port:9900,
    hot:true,
    open:true,
    static: {
      directory: './public'
    }
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
    fallback: {
      'util': require.resolve('util/')
    }
  },
  plugins:[
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new EnvironmentPlugin({
        ...process.env
    }),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
        scriptLoading: "blocking"
    })
  ]
};

module.exports = config;