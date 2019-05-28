const path = require('path');
// html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
      "main": "./src/js/index",
        "a": "./src/js/a"
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        // 多个entry，文件名不能写死，会冲突
        // hash与chunkhash区别，chunkhash为chunk唯一性，hash为每次打包统一名字
        filename: './js/[name]-[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                // 从右往左顺序解析
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        // 多个 new HtmlWebpackPlugin,多个html文件生成
        // 不需要手写js，js会被动态编译注入到HTML中
        new HtmlWebpackPlugin({
            // 在模板中这个不管用，要在模板title中输入<%= htmlWebpackPlugin.options.title %>
            title: "webpack-config",
            // js插入到body后面
            inject: 'body',
            // 为js，css添加hash，也算是缓存，一旦文件改变了，hash就变，浏览器就重新请求
            // 该文件，如果hash不变，浏览器直接从缓存中获取文件
            hash: true,
            filename: 'index.html',
            // 模板来源必须写，不写的话，body内容会被清除，只保留js
            template: "./src/demo.html",
            // 当前HTML需要加载哪些js文件，同理excludeChunks不需要加载哪些js
            chunks: ["main"],
            // 优化html
            minify: {
                // 移出HMTL中的注释
                removeComments: true,
                // 删除空白符和换行符
                collapseWhitespace: false,
                // 压缩内联css
                minifyCSS: true
            },
            // 指定页面图标
            favicon: ''
        })
    ]

}