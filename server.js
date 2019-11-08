const express = require("express");
const path = require("path");
const vueRender = require("vue-server-renderer");
const template = require('fs').readFileSync('./dist/index.html', 'utf-8')
const app = express();
const env = process.env.NODE_ENV
app.use('/',express.static(path.join(__dirname, './dist')));
app.use('/static',express.static(path.join(__dirname, './dist/static')));
let renderer;
if(env === 'development'){
    require('./build/webpack.dev.js')(app,(serverBundle,clientBundle) => {
      renderer = vueRender.createBundleRenderer(serverBundle, {
        template,
        clientBundle
      })
    })
}else{
  // const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  // const clientManifest = require('./dist/vue-ssr-client-manifest.json')
}

app.get('*',(req,res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    res.end(html)
  })
})

app.listen(5001,() => {
    console.log("服务已开启")
});