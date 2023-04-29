const path = require('path')
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
  mode:'development',
  entry: [
    'react-hot-loader/patch',
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
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins:[
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    })
  ]
};

module.exports = config;

// const configs = {
//     mode:'development',
//     devtool:'eval-source-map',
//     entry:'./src/entry.tsx',
//     devServer: {
//         port:9900,
//         hot:true,
//         open:true
//     },
//     output:{
//         publicPath:'auto',
//         path: path.resolve(__dirname, 'public'),
//         filename: 'bundle.js',
//     },
//     module:{
//         rules:[
//             {
//                 // test: /\.tsx?$/,
//                 test: /\.(ts|tsx)$/,
//                 use:{
//                     loader:'ts-loader'
//                 },
//                 include:[path.resolve(__dirname,'src')],
//             },
//         ]
//     },
//     resolve:{
//         extensions:['.ts','.tsx','.js'],
//         // modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//     }
// }

// module.exports = configs
