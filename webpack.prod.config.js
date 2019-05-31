const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use:  {
          loader : 'file-loader',
          options: {
            name: 'public/assets/images/[name].[ext]'
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
           loader: 'html-loader'
        }
     }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new HtmlWebpackPlugin({filename: 'index.html', template: 'index.html'}),
    new CleanWebpackPlugin([path.resolve(__dirname, 'public/dist')]),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
