module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    port: 9000,
    host: '127.0.0.1',
    useEslint: true // 开启eslint
  },
  build: {
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    gzip: true, // 开启gzip预压缩
    analyzerReport: false // 生成打包后的分析报告
  }
}
