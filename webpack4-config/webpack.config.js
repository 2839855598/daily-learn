const path = require('path');
// webpack
const webpack = require('webpack');
// html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理旧的dist，生成新的dist
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 提取css到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css tree-shaking
const PurifyCss = require('purifycss-webpack');
// 处理css-tree-shaking 路径问题
const glob = require('glob-all');
// 合成雪碧图
const Spritesmith = require('webpack-spritesmith');
// 模块依赖分析图
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 是否开发模式
const devMode = process.env.NODE_ENV === 'dev' ;

console.log(devMode)

module.exports = {
    // production 生产模式，development开发模式
    entry: {
        "main": "./src/js/main",
        "index": "./src/js/index"
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        // 多个entry，文件名不能写死，会冲突
        // hash与chunkhash区别，chunkhash为chunk唯一性，hash为每次打包统一名字
        filename:  './js/[name]-[hash:8].js',
        // 线上时候
        // publicPath: "http://cdn.example.com/[hash]/"

    },
    // 开启调试
    // devtool: "source-map",
    // 开发服务器
    devServer: {
        // 告诉服务器从哪提供内容，只有在想要提供静态文件时才需要
        contentBase: path.join(__dirname, 'dist'),
        // 一切服务都启用gzip压缩
        compress: true,
        // 默认localhost
        host: 'localhost',
        // 端口号
        port: '8082',
        // 热更新
        // hot: true,
        // inline: true,
        // 自动打开浏览器
        open: true,
        // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        overlay: true,
        // 404时候，返回到index.html
        historyApiFallback: true,
        // 可以使用 easymock模拟数据接口
        proxy: {
            '/mock/5c03dec03b23d255f07eca44/example/comments': {
                target: "https://www.easy-mock.com",
                secure: false,
                changeOrigin: true,
                logLevel: "debug",
                headers: {
                    Cookie: ""
                }
            }

        }
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
            // 当前HTML需要加载哪些js/css文件，同理excludeChunks不需要加载哪些js/css
            chunks: ["main","mainfest", "vendors","initial-common",'es6-demand','scss'],
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
        new HtmlWebpackPlugin({
            // 在模板中这个不管用，要在模板title中输入<%= htmlWebpackPlugin.options.title %>
            title: "webpack-config2",
            // js插入到body后面
            inject: 'body',
            // 为js，css添加hash，也算是缓存，一旦文件改变了，hash就变，浏览器就重新请求
            // 该文件，如果hash不变，浏览器直接从缓存中获取文件
            hash: devMode ? false : true,
            filename: 'index2.html',
            // 模板来源必须写，不写的话，body内容会被清除，只保留js
            template: "./src/demo2.html",
            // 当前HTML需要加载哪些js文件，同理excludeChunks不需要加载哪些js
            chunks: ["index","mainfest", "vendors","initial-common",'es6-demand'],
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
            filename:  'css/[name].[hash:8].css'
            // chunkFilename:  'css/[id].[hash:8].css'
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
        }),
        // 第三方库设为全局变量
       /* new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash'
        }),*/
        new PurifyCss({
            paths: glob.sync([
                // 同样对html需要 css-tree-shaking
                path.resolve(__dirname, "./src/*.html"),
                path.resolve(__dirname, "./src/js/*.js")
            ])
        }),
        // 模块依赖分析图
        new BundleAnalyzerPlugin()


    ],
    optimization: {
        // 如果修改入口文件的逻辑代码，防止第三方库打包名字也变化,
        runtimeChunk: {
            "name": "mainfest"
        },
        splitChunks: {
            // 包括同步的和异步的（即import和import()两种方式）
            chunks: 'all',
            cacheGroups: {
                // 提取node_modules的es6按需加载模块
                es6: {
                    name: 'es6-demand',
                    test:  /[\\/]node_modules[\\/]core-js[\\/]/,
                    chunks: 'initial',
                    priority: 30
                },
                vendor: {
                    name: 'vendors',
                    test:  /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 20
                },
                // 同步加载的公共代码
                common: {
                    // chunkName，在htmlPlugin中chunks能用到
                    name: 'initial-common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 10,
                    // 此代码是否可复用，再次遇到就不必打包
                    reuseExistingChunk: true,
                    // 强制生成
                    enforce: true
                },
                // 也可以拆分css文件
               scss: {
                    test: /\.scss$/,
                    name: 'scss',
                    chunks: 'initial',
                    enforce: true
               }
            }
        }


    }


}