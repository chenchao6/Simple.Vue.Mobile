const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');  // 用于更友好地输出webpack的警告、错误等信息
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postConfig = require("./postcss.config.js");
const vueConfig = require("./vue-loader.js");
const utils = require("./utils.js");
const publicPath = process.env.NODE_ENV === 'production' ? '/' : utils.config.serverPath;
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: [resolve('/src/main.js')],
        vendor:[resolve('/src/assets/js/jquery.js'),resolve('/src/assets/js/plugins.js')]
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js',
        path: resolve('/dist'),
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js',
            '@assets': resolve("/src/assets")
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve("/src")
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", use: ["css-loader", "sass-loader", {
                        loader: "postcss-loader",
                        options: {
                            plugins:postConfig
                        }
                    }]
                }),
                include: resolve("/src")
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", use: ["css-loader", {
                        loader: "postcss-loader",
                        options: {
                            plugins:postConfig
                        }
                    }]
                })

            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //Using NoErrorsPlugin is deprecated,Use NoEmitOnErrorsPlugin instead.
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: utils.assetsPath('[name].[hash].css')
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../src/view/index.html'),
            inject: true
        }),
        //不知道为什么不起作用，只能分别在loader额外配置
        new webpack.LoaderOptionsPlugin(
            { options: postConfig }),
        new FriendlyErrorsPlugin()
    ]
}