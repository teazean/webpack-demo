const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        test: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 第三部： alias
    // resolve: {
    //     alias: {
    //         '#': path.resolve(__dirname, 'node_modules/@baidu/lego-events-common/lib')
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // 第二步： audio
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
            // 第一步：img
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: 'img/[name].[ext]'
                }
            },
            // 第二步： audio
            {
                test: /\.(wav|mp3)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: 'audio/[name].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
    ],
    devServer: {
        port: 8001,
        host: '0.0.0.0'
    },
    devtool: "cheap-source-map"
}
