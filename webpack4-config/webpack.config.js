const path = require('path');
// webpack
const webpack = require('webpack');
// html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理旧的dist，生成新的dist
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 提取css到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 合成雪碧图
const Spritesmith = require('webpack-spritesmith');
// 是否开发模式
const devMode = process.env.NODE_ENV === 'dev' ;

console.log(devMode)

module.exports = {
    // production 生产模式，development开发模式
    entry: {
      "main": "./src/js/main",
        "a": "./src/js/a"
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        // 多个entry，文件名不能写死，会冲突
        // hash与chunkhash区别，chunkhash为chunk唯一性，hash为每次打包统一名字
        filename:  './js/[name]-[chunkhash:8].js',
        // 线上时候
        // publicPath: "http://cdn.example.com/[hash]/"
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
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                      loader:  MiniCssExtractPlugin.loader,
                      options: {
                           // 指定css中图片的路径从上一层查找，即dist目录下，
                           // 不指定,则从css目录下查找图片，查找不到的，报错
                           // 线上时候可以指定cdn地址
                           publicPath: '../'

                      }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 表示当前loader之后 2个loader来处理 import的css
                            importLoaders: 2,
                            // 可以查看到源代码
                            sourceMap: true
                        }

                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                // 处理@import规则的文件，比如@import 'a.css'
                                require('postcss-import')(),
                                // postcss-preset-env包含 autoprefixer
                                require('postcss-preset-env')({

                                    browsers: ['> 1%', 'last 2 versions', 'not ie <=8']

                                }),
                                // 是否压缩css代码
                                 devMode ? function(){} : require('cssnano')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 小于8k转为base64，大于8k，用file-loader处理
                            limit: 8192,
                            // 文件输出的位置
                            name: 'images/[name].[hash:7].[ext]'

                        }
                    }
                  /*  {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }*/
                ]

            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "[name]-[hash:5].[ext]",
                        // 小于5k用base64，大于5k字体图标
                        limit: 5000,
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // 多个 new HtmlWebpackPlugin,多个html文件生成
        // 不需要手写js，js会被动态编译注入到HTML中
        new HtmlWebpackPlugin({
            // 在模板中这个不管用，要在模板title中输入<%= htmlWebpackPlugin.options.title %>
            title: "webpack-config",
            // js插入到body后面
            inject: 'body',
            // 为js，css添加hash，也算是缓存，一旦文件改变了，hash就变，浏览器就重新请求
            // 该文件，如果hash不变，浏览器直接从缓存中获取文件
            hash: devMode ? false : true,
            filename: 'index.html',
            // 模板来源必须写，不写的话，body内容会被清除，只保留js
            template: "./src/demo.html",
            // 当前HTML需要加载哪些js文件，同理excludeChunks不需要加载哪些js
            chunks: ["main"],
            // 优化html
            minify: {
                // 移出HMTL中的注释
                removeComments: devMode ? false : true,
                // 删除空白符和换行符
                collapseWhitespace: devMode ? false : true,
                // 压缩内联css
                minifyCSS: devMode ? false : true
            },
            // 指定页面图标
            favicon: ''
        }),
        // 清除旧的output，生成新的output
        // new CleanWebpackPlugin(),
        // 提取css为单独文件
        new MiniCssExtractPlugin({
            filename:  'css/[name].[hash:8].css'  ,
            chunkFilename:  'css/[id].[hash:8].css'
        }),
        // 生成雪碧图,跟CleanWebpackPlugin冲突
        new Spritesmith({
            // 要合并的图片源路径
            src: {
                cwd: path.resolve(__dirname, 'src/images'),
                glob: '*.png'
            },
            // 合并图片的目标路径
            target: {
                image: path.resolve(__dirname, 'dist/sprites/sprite.png'),
                css: path.resolve(__dirname, 'dist/sprites/sprite.css')
            },
            // 引用雪碧图的路径写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            // 雪碧图合并规则
            spritesmithOptions: {
                // 从上到下方式合成
                algorithm: 'top-down'
            }
        })
    ]

}