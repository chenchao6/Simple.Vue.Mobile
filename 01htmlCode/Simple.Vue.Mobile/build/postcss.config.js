const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const postcssImport = require('postcss-import');
var postConfig = [
  postcssImport(),
  autoprefixer({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] }),
  px2rem({ remUnit: 75 })
]
module.exports = postConfig