const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.common.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
})

module.exports = config

// const compiler = webpack(config);
// compiler.run(function(err,stats){
//   console.log(123)
// })