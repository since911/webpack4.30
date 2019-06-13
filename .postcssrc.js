/**
 * @author zhouchao 2019.5.4
 * postcss配置
 */
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {}
    // "postcss-plugin-px2rem": {
    //   rootValue: 75,
    //   mediaQuery: true,
    //   include: "/\.less$/",
    //   exclude: "/node_modules/i",
    //   selectorBlackList: ['html', 'mint-', 'mt-', 'mpvue-', 'calendar', 'iconfont'],
    //   propBlackList: ['border']
    // }
  }
}
