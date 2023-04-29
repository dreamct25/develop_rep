const { ProvidePlugin,EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
const webpackConfig = {
    mode: process.env.APP_ENV,
    entry: './src/entry.ts',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    devtool: process.env.APP_ENV === 'development' ? 'source-map' : false,
    devServer:{
        port:9901,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "raw-loader",
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js','.ts'],
        fallback: {
            'util': require.resolve('util/')
        }
    },
    plugins: [
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
}

module.exports = webpackConfig