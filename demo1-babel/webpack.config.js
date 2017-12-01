const path = require('path');

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
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    // 第二步：非webpack的配置项，是webpack-dev-server借webpack.config.js
    devServer: {
        hot: true,
        port: 8001,
        host: '0.0.0.0'
    },
    devtool: "cheap-source-map"
}
