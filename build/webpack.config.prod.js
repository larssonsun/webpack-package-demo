const path = require('path')// Node.js path 模块提供了一些用于处理文件路径的小工具
const webpackConfig = require('./webpack.config.base.js');// base 配置文件
const merge = require('webpack-merge');// 配置合并模块
const { CleanWebpackPlugin } = require('clean-webpack-plugin')// 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资源。 
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const TerserWebpackPlugin = require('terser-webpack-plugin')// 压缩 js （当前版本的webpack4内置）

module.exports = merge(webpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // 使用mini-css-extract-plugin的loader来处理css
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'// 补全css文件中的引用路径，指明引用的路径以“../”开头
            }
          },
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    // 默认情况下是压缩js的，即minimizer:true。如果你手动覆盖了minimizer的配置就像这里一样，必须手动指定js的压缩插件
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        cssProcessor: require('cssnano'), // 用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, // 传递给 cssProcessor 的选项，默认为{}
        canPrint: true // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true
      }),
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
});