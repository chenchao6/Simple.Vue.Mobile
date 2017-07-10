var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.base.config');
var WebpackDevServer = require('webpack-dev-server');
var utils = require("./utils.js");
config.entry.app.unshift("webpack-dev-server/client?" + utils.config.serverPath);

// 调用webpack并把配置传递过去
var compiler = webpack(config);
// 使用 webpack-dev-middleware 中间件
// app.use(webpackDevMiddleware(compiler, {
//     publicPath: "/",
//     stats: {
//         colors: true,
//         chunks: false
//     }
// }));
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    proxy: {
        '/api': {
            target: 'http://localhost:18080/',
            secure: false
        }
    }
    

});
server.listen(utils.config.port);