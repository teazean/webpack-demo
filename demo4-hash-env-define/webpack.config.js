const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfig = {
    entry: {
        test: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name]-[hash].js' : '[name].js'
    },
    resolve: {
        alias: {
            '#': path.resolve(__dirname, 'node_modules/@baidu/lego-events-common/lib')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules/@baidu/lego-events-common')
                ]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        // css转成module
                        'css-loader',
                        // 处理css
                        'postcss-loader',
                        // less => css
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: isProduction ? 'img/[name]-[hash].[ext]' :  'img/[name].[ext]'
                }
            },
            {
                test: /\.(wav|mp3)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: isProduction ? 'audio/[name]-[hash].[ext]' :  'audio/[name].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        ...(isProduction ? [
            new UglifyJSPlugin()
        ] : []),
        new webpack.DefinePlugin({
            TEST_URL: isProduction ? "'https://brandshow.baidu.com'" : "'http://cp01-top-db00.cp01.baidu.com:8085'"
        }),
        new ExtractTextPlugin("css/[hash].css")
    ],
    devServer: {
        port: 8001,
        host: '0.0.0.0'
    },
    devtool: "cheap-source-map"
};

module.exports = webpackConfig;
