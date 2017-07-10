var path = require('path');
exports.assetsPath = function (_path) {
    return path.posix.join('static', _path)
}

exports.config = {
   serverPath:"http://localhost:8888/",
   port:8888
}