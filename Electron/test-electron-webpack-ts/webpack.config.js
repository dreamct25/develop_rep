const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path')

/** @type {import('webpack-cli').ConfigOptions}*/
module.exports = {
    entry:{
        bundle:['./src/render.tsx']
    },
    output:{
        path: Path.join( __dirname,'build'),
        publicPath: '/build',
        filename: '[name].js'
    },
    target: 'electron-renderer',
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin([{ from: Path.join( __dirname, 'src/public' ),to: 'public' }])
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/, // 轉換的例外排除名單
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)?$/,
                exclude: /(node_modules|bower_components)/, // 轉換的例外排除名單
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
			
        /* 設定 extensions 後 import 或 require 路徑只需要給檔名而不用加副檔名 */
        extensions: [ '.js', '.jsx','.ts','.tsx' ]
    }
}
