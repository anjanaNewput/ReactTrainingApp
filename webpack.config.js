var webpack = require("webpack");
var path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./index.js'],
    module: {
        loaders: [
            {
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            { test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
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
                  name: '[path][name].[ext]'
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
        new ExtractTextPlugin("public/assets/css/app.css"),
        new HtmlWebpackPlugin({filename: 'index.html', template: 'index.html'}),
      ],
    devServer: {
        historyApiFallback: true
    }
}
