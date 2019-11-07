const express = require("express");
const path = require("path");
const vueRender = require("vue-server-renderer");
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = require('fs').readFileSync('./dist/index.html', 'utf-8')
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.get('*',(req,res) => {
  const context = { url: req.url }
  const renderer = vueRender.createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  })
  renderer.renderToString(context, (err, html) => {
    console.log(123,err)
    res.end(html)
  })
})

app.listen(5001,() => {
    console.log("服务已开启")
});