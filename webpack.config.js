var webpack = require('webpack')
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname),
    SOURCE_PATH = path.resolve(ROOT_PATH, 'source'),
    TEMP_PATH = path.resolve(SOURCE_PATH, 'template')
module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3080'
      }
    }
  },
  entry: {
    index: path.resolve(TEMP_PATH, 'app.js')
  },
  output: {
    path: './',
    filename: '[name].js?[hash]'
  },
  module: {
    loaders: [
      /*{
        test: '/\.css$/',
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!'
        )
      },*/
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.sass$/, loader: 'style!sass' },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url?limit=10000&name=[path][name].[ext]?[hash:8]&context=source'
      }
    ]
  },
  /*htmlWebpackPlugin: {
    files: {
      css: ['../common/common.css'],
      js: ['./index/index.js'],
      chunks: {
        head: {
          entry: 'index',
          css: ['common.css']
        }
      }
    }
  },*/
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
var plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlwebpackPlugin({
    title: 'kooofly\'s website',
    template: path.resolve(TEMP_PATH, 'app.html'),
    filename: 'index.html',
    chunks: ['index'],
    inject: 'body'
  })
]
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
  module.exports.vue = {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract("css!stylus")
    }
  }
} else {
  module.exports.plugins = plugins
  module.exports.output.publicPath = 'output/'
  module.exports.devtool = '#source-map'
}

