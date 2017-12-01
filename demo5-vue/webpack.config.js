const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name]-[hash].js' : '[name].js'
    },
    resolve: {
        // diff
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // diff
            'vue$': 'vue/dist/vue.esm.js',
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
                use: [
                    // 将css转成script标签
                    'style-loader',
                    // css转成module
                    'css-loader',
                    // 处理css
                    'postcss-loader',
                    // less => css
                    'less-loader'
                ]
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
            },
            // diff
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: [
                        // 将css转成script标签
                        'style-loader',
                        // css转成module
                        'css-loader',
                        // 处理css
                        'postcss-loader',
                        // less => css
                        'less-loader'
                    ]
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
        })
    ],
    devServer: {
        port: 8001,
        host: '0.0.0.0'
    },
    devtool: "cheap-source-map"
};

module.exports = webpackConfig;
