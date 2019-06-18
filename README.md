## 使用步骤
  * npm install 安装npm依赖包
  * npm run dll 打包公共依赖库
  * npm run dev  运行项目
  * npm run build  打包项目
  * npm run site  服务器下预览打包后的项目

## 公司项目升级后打包时间对比
  单位(s)|webpack3|webpack4
  :---:|:---:|:---:
  打包时间|35~40s|13-15s
  构建时间|17s|11s

  ## 优化要点：
  * dllPlugin预打包不常变动的公共库（vue,vuex,axios等）
  * happypack开启多线程编译
  * 独立抽取manifest.js，以免vendor等库文件缓存失效
  * inline  manifest，减少一次http请求
  * 开启gzip压缩
  * 生产模式用到的插件或loader不要配置到common里
  *  noParse，避免不必要的解析

