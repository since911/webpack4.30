const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const config = require('./config.js')

const developmentConfig = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../dist/dll/vendor-manifest.json')
    }),
    // 控制台输出信息显示
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`本地启动成功: http://${config.dev.host}:${config.dev.port}`]
      },
      clearConsole: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist', // 指定devServer启动的入口文件
    publicPath: '/', // 指定devServer启动的入口文件为项目根路径
    open: true, // 启动后自动打开浏览器
    compress: true, // 启动压缩
    port: config.dev.port || 9000,
    host: config.dev.host || 'localhost',
    quiet: true, // 不显示webpack  console的信息
    overlay: {
      errors: true // 编译出现错误时，错误直接贴到页面上
    }
  }
})

module.exports = developmentConfig
