const path = require('path');
// html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: './js/myWebpack.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]

}