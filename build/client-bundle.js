const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: '../src/entry-client.js',
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})