const { ProvidePlugin,EnvironmentPlugin,DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

/** @type {import('webpack').Configuration} */
const configs = {
  mode: 'development',
  entry: './src/entry.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer:{
      port:9901,
      open:true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.tsx',
      '.ts'
    ],
    fallback: {
        'util': require.resolve('util/')
    }
  },
  plugins: [
    new ProvidePlugin({
        process: 'process/browser'
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new EnvironmentPlugin({
        ...process.env
    }),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
        scriptLoading: "blocking"
    }),
    new VueLoaderPlugin()
  ]
};

module.exports = configs