// 用node服务器预览打包后的dist资源
const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const compression = require('compression')
app.use(compression()) // 开启gzip压缩
app.use(history()) // 支持前端histroy路由
app.use('/', express.static('dist'))
const server = app.listen(3000, '0.0.0.0', () => {
  const host = server.address().address
  const port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
