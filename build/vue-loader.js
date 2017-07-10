const ExtractTextPlugin =require('extract-text-webpack-plugin');
const postConfig = require("./postcss.config.js");
module.exports = {
    loaders: {
        css: ExtractTextPlugin.extract({
            use: ["css-loader"],
            fallback: 'vue-style-loader'
        }),
        scss: ExtractTextPlugin.extract({
            use: ["css-loader!sass-loader"],
            fallback: 'vue-style-loader'
        })
    },
    postcss: postConfig
}