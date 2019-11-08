const webpack = require('webpack')
const path = require("path");
const chalk = require('chalk')
const MFS = require('memory-fs')
const clientConfig = require('./client-bundle.js')
const serverConfig = require('./server-bundle.js')

let clientJson = null;
let serverJson = null;
const mfs = new MFS();
const runWatch = function(target,type,callback){
  target.watch({
    aggregateTimeout: 300
  },function(err,stats){
    if (err) {
      return;
    }
    if(type === 'client'){
      const clientJsonPath = path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json')
      clientJson = JSON.parse(mfs.readFileSync(clientJsonPath, 'utf-8'))
      if(serverJson){
        callback(serverJson,clientJson)
      }
    }else{
      const serverJsonPath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
      serverJson = JSON.parse(mfs.readFileSync(serverJsonPath, 'utf-8'))
      if(clientJson){
        callback(serverJson,clientJson)
      }
    }
    console.log(chalk.blue(`${type}-success`))
  })
}

module.exports = function devServer(app,callback){
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);
  clientCompiler.outputFileSystem = mfs;
  serverCompiler.outputFileSystem = mfs;
  runWatch(clientCompiler,'client',callback);
  runWatch(serverCompiler,'server',callback)
}