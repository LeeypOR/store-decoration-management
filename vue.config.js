'use strict'

process.env.VUE_APP_VERSION = new Date().toLocaleString()

const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')// 引入path模块
function resolve (dir) {
    return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

const publicPath = process.env.NODE_ENV === 'development' ? '/' : ''

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath,
  // publicPath: '/goldenhome/admin/store',
  productionSourceMap: false,
  // 是否控制台显示eslint信息。
  lintOnSave: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  devServer: {
    port: 8888,

		https: false,

		proxy: {
			'/': {
				target: 'https://testsd.cicd.vpclub.cn', // 设置调用的接口域名和端口
				changeOrigin: true, // 是否跨域
				ws: true,
				pathRewrite: {
					'^/': ''
				}
			}
		},
    // build完后是否自动打开
    open: true,
    // 通过设置让浏览器 overlay 是否同时显示警告和错误：
    overlay: {
      warnings: false,
      errors: true
    }
  },

  css: {
    requireModuleExtension: true,
    sourceMap: !isProduction,
    extract: isProduction
},

  configureWebpack: config => {
    config.externals = {
    }

    // 生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 增加打包分析工具。
      // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      // config.plugins.push(
      //   new BundleAnalyzerPlugin({
      //     analyzerPort: 9528,
      //     openAnalyzer: true,
      //     analyzerMode: 'server'
      //   })
      // )
      config.plugins = [
          ...config.plugins,
          new CompressionPlugin({
              test: /\.js$|\.html$|\.css/,
              threshold: 10240,
              deleteOriginalAssets: false
          })
      ]
    }

    // 修改terserOptions.compress,用于去除生产console和debugger等信息。
    Object.assign(config.optimization.minimizer[0].options.terserOptions.compress, {
      warnings: false,
      // drop_console: true,
      drop_console: false,
      // drop_debugger: true,
      drop_debugger: false

      // pure_funcs: ['console.log']
    })

    // config.devtool = 'source-map';
  },

  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@components', resolve('src/components'))
    .set('@views', resolve('src/views'))
    .set('@images', resolve('src/assets/images'))

    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    if (process.env.NODE_ENV === 'production') {
      // 分包机制。
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {

          vendors: {
            name: 'user-vendors-polyfill',
            chunks: 'initial',
            priority: 12,
            test: module => /[\\/]node_modules[\\/]/.test(module.context) || /components\\ElementUi/.test(module.context)
          },

          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          // 单独抽离比较大的UI组件库。
          antdUI: {
            name: 'chunk-antdUI', // split antdUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
          },
          tinymce: {
            name: 'chunk-tinymce', // split tinymce into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?tinymce(.*)/ // in order to adapt to cnpm
          },
          antdOnlineMini: {
            name: 'chunk-antdOnlineMini', // split antdOnlineMini into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?@jeecg[\\/]antd-online-mini(.*)/ // in order to adapt to cnpm
          },
          // 抽离出公共组件库中，使用2次及以上的组件。
          commons: {
            name: 'chunk-commons',
            // test: resolve('src/components'), // can customize your rules
            test: /[\\/]src[\\/]components[\\/]/, // can customize your rules

            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })

      // runtimejs优化策略。
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            // inline: /runtime\..*\.js$/
            inline: /runtime~.+\.js$/ // 正则匹配runtime文件名

          }
        ])
        .end()
      // 单独抽离 runtimeChunk 之后，每次打包都会生成一个runtimeChunk.xxx.js
      // true 或 "multiple"，会为每个仅含有 runtime 的入口起点添加一个额外 chunk
      // 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
      config.optimization.runtimeChunk('single')
    }
  }

}
