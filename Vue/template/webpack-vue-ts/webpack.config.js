const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');


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
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
// const configs = {
//     mode:'development',
//     entry:'./src/entry.ts',
//     devServer:{
//         port:9901,
//         open:true
//     },
//     output:{
//         path:path.resolve(__dirname,'public'),
//         publicPath:'auto',
//         filename:'bundle.js'
//     },
//     module:{
//         rules:[
//             {
//                 test:/\.ts$/,
//                 use:{
//                     loader:'ts-loader',
//                     options: {
//                         appendTsSuffixTo: [/\.vue$/],
//                     },
//                 },
//                 include:[path.resolve(__dirname,'src')]
//             },
//             {
//                 test:/\.vue$/,
//                 use:{
//                     loader:'vue-loader'
//                 },
//                 include:[path.resolve(__dirname,'src')]
//             }
//         ]
//     },
//     resolve:{
//         extensions:[".vue",".ts",".js"]
//     },
//     plugins:[new VueLoaderPlugin()]
// }

module.exports = configs