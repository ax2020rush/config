const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 需要开启gz压缩的格式;
// eslint-disable-next-line camelcase
const Is_Pord = ['production', 'test'].includes(process.env.VUE_APP_SERVER_EVN) // 这里的Is_Pord指的是生产环境和测试环境(这里统称Is_Pord)

module.exports = {
  outputDir: 'dist',
  assetsDir: 'src',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: config => {
    // eslint-disable-next-line camelcase
    if (Is_Pord) {
      const plugins = []
      // 添加gzip压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }
  }

}
