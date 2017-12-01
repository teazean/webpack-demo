const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        test: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // 第一步
        // libraryTarget: 'umd',
        // library: 'openservice'
    },
    // 第三步
    module: {
        rules: [
            {
                test: /\.html$/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // 第二步：css
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
            }
        ]
    },
    // 第一步：html
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
    ],
    // 第二步
    devServer: {
        port: 8001,
        host: '0.0.0.0'
    },
    devtool: "cheap-source-map"
}
