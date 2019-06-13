const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const util = require('./util.js')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [util.resolve('src'), /map/i],
        options: {
          postcss: [require('autoprefixer')],
          js: 'happypack/loader?id=vue'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        include: util.resolve('src')
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        include: util.resolve('src')
      },
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
        include: util.resolve('src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: util.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: util.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: util.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  resolve: {
    unsafeCache: true,
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': util.resolve('src'),
      'cube-ui': 'cube-ui/lib'
    }
  },
  devtool: 'source-map',
  target: 'web',
  stats: 'errors-only',
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: util.assetsPath('css/[name].[contenthash].css')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: util.resolve('static'),
        to: util.resolve('dist/static'),
        ignore: ['.*']
      }
    ]),
    new HappyPack({
      id: 'vue',
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      threadPool: HappyPack.ThreadPool({ size: 5 }),
      verbose: true
    })
  ]
}
