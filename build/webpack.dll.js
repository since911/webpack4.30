const webpack = require('webpack')
const path = require('path')
const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('building for production...')
spinner.start()
const targetArr = [
  'vue/dist/vue.esm.js',
  'vuex/dist/vuex.esm.js',
  'vue-router/dist/vue-router.esm.js',
  'axios/lib/axios.js',
  'babel-polyfill'
]
const dllConfig = {
  mode: 'production',
  entry: {
    vendor: targetArr
  },
  output: {
    path: path.join(__dirname, '../dist/dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}

rm(path.join(__dirname, '../dist/dll'), err => {
  if (err) throw err
  webpack(dllConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
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
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
