const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HappyPack = require('happypack')
const common = require('./webpack.common.js')
const util = require('./util.js')
const config = require('./config.js')
const spinner = ora('building for production...')
spinner.start()
const productionConfig = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        include: [util.resolve('src'), /map/i]
      }
    ]
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendors: {
    //       test: /node_modules/,
    //       name: 'vendors'
    //     }
    //   }
    // },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new optimizeCss(),
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true
      })
    ]
  },
  output: {
    path: util.resolve('dist'),
    filename: util.assetsPath('js/[name].js'),
    chunkFilename: util.assetsPath('js/[name].[contenthash].js')
  },

  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../dist/dll/vendor-manifest.json')
    }),
    new InlineManifestWebpackPlugin('manifest'),
    new HappyPack({
      // 用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      // 如何处理  用法和loader 的配置一样
      loaders: [
        {
          path: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015']
          }
        }
      ],
      // 共享进程池
      threadPool: HappyPack.ThreadPool({ size: 8 }),
      // 允许 HappyPack 输出日志
      verbose: true
    })
    // new webpack.NamedChunksPlugin(chunk => {
    //   // console.log(chunk.name)
    //   if (chunk.name === 'polyfills') {
    //     //   const hash = require('hash-sum')
    //     // const joinedHash = hash(modules.map(m => m.id).join('_'))
    //     // let len = nameLength
    //     // while (seen.has(joinedHash.substr(0, len))) len++
    //     // seen.add(joinedHash.substr(0, len))
    //     // return `chunk-${joinedHash.substr(0, len)}`
    //     return 'polyfills'
    //   }
    //   // const modules = Array.from(chunk.modulesIterable)
    //   // if (modules.length > 1) {
    //   //   const hash = require('hash-sum')
    //   //   const joinedHash = hash(modules.map(m => m.id).join('_'))
    //   //   let len = nameLength
    //   //   while (seen.has(joinedHash.substr(0, len))) len++
    //   //   seen.add(joinedHash.substr(0, len))
    //   //   return `chunk-${joinedHash.substr(0, len)}`
    //   // } else {
    //   //   return modules[0].id
    //   // }
    // })
  ]
})

if (config.build.analyzerReport) {
  productionConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8081
    })
  )
}

rm(path.join(__dirname, '../dist/static'), err => {
  webpack(productionConfig, (err, stats) => {
    if (err) throw err
    spinner.stop()
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('Build complete.\n'))
  })
})
