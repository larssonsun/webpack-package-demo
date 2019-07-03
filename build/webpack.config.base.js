const path = require('path') // Node.js path 模块提供了一些用于处理文件路径的小工具
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const webpack = require('webpack'); // 引入webpack模块
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const entrySuffix = "-vue" // 手动区分两个入口，纯粹测试方便（""或者"-vue"）

module.exports = {
  entry: { // 如果项目根目录下存在"app.js"则entry的设置会被无视
    main: "./src/index" + entrySuffix + ".js"// 打包入口文件，默认为 ./src/index.js。这里的main就是一个chunk的名称。如果想打包多个文件到一起则main:['','',...]
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [path.resolve(__dirname, '../loaders/replaceLoader.js')] // 引入自定义 loader。似乎对vue中引入的组件中的alert方法无效
      },
      {
        test: /\.js$/, // 使用正则来匹配 js 文件
        exclude: /node_modules/, // 排除依赖包文件夹
        use: {
          loader: 'babel-loader' // 使用 babel-loader
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'images/[name]-[hash:5].min.[ext]',
            limit: 8000 // 图片文件<=8kb 的文件转成 Base64 的格式
          }
        }]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name]-[hash:5].min.[ext]',
            limit: 8000 // 字体文件<= 8KB, 转换成base64, 否则输出单独文件（依赖file-loader）
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      // title: '自动生成 HTML',
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: path.resolve(__dirname, '../tempate-index' + entrySuffix + '.html'), // 根据此模版生成 HTML 文件
      chunks: ['main'] // 只打包entry中的入口文件中的“main”
    }),
    new webpack.DefinePlugin({ // 使用当前配置文件中的process.env.NODE_ENV来设置外部js文件中的process.env.NODE_ENV
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) // 注意，如果没有再命令行注入ENV以任何内容，则process.env.NODE_ENV为undefined
      }
    }),
    new VueLoaderPlugin() // 请确保引入这个插件！
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'], // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    alias: {
      'com-btn': path.resolve(__dirname, '../src/components/custom/button'), // com-btn指向 src/components/custom/button 目录
      "vue": "vue/dist/vue.js" // 解决 vue 的 package.json 中的 main 默认指向 dist/vue.common.js的问题
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // webpack最终打包的输入路径。其中__dirname，就是当前webpack.config.js文件所在的绝对路径
    filename: 'js/[name].[hash:5].js',
    publicPath: './' // 表示输出后的文件中的引用从文件当前的路径开始
  }
}