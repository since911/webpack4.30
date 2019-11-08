const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(baseConfig, {
  entry: {
    app:'./src/entry-client.js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../dist/dll/vendor-manifest.json')
    }),
    new VueSSRClientPlugin()
  ]
})


module.exports = config

const compiler = webpack(config);
compiler.run(function(err,stats){
  console.log(123)
})