const path = require('path')
const config = require('./config.js')
const resolve = function(dir) {
  return path.join(__dirname, '../', dir)
}

const assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  resolve,
  assetsPath
}
