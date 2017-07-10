
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.base.config.js');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require("./utils.js");
const path = require('path');
module.exports = webpackMerge(webpackConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({  ///文件压缩
            compress: {
                warnings: false
            },
            sourceMap: false,
            include:path.resolve(__dirname, "../src"),
            beautify:true
        }),
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, ".."),       　　　　　　　　　　//根目录
            verbose: true,        　　　　　　　　　　//开启在控制台输出信息
            dry: false        　　　　　　　　　　//启用删除文件
        })
    ]
});