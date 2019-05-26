const path = require('path');
module.exports = {
    entry: './src/js/index',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'myWebpack.js'
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
    }

}