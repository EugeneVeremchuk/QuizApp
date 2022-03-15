
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
   // context: path.resolve(__dirname, 'source'),
   mode: 'development',
   entry: {
      main: './source/app.js',
   },
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      assetModuleFilename: 'images/[name].[hash][ext]',
   },
   plugins: [
      new HTMLWebpackPlugin({
         template: './source/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      })
   ],
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.html$/,
            loader: 'html-loader'
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
         },
      ]
   }
}

module.exports = config