const path = require('path')

exports.resolve = (...dirs) => path.join(__dirname, ...dirs)
