
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`
const babelPreset = preset => isProd ? [preset] : []
const postCSS = () => {

   const loader = {
      loader: 'postcss-loader',
      options: {
         postcssOptions: {
            plugins: [
               require('autoprefixer'),
            ]
         }
      }
   }
   if (isProd) {
      const plugins = loader.options.postcssOptions.plugins
      plugins.push(require('cssnano')({ preset: 'default' }))
   }

   return loader

}

const paths = {
   build: path.resolve(__dirname, 'build'),
   dev: path.resolve(__dirname, 'dev'),
}

const config = {

   entry: {
      index: `${paths.dev}/app.js`,
   },
   output: {
      filename: filename('js'),
      assetModuleFilename: isDev ? 'assets/[name][ext]' : 'assets/[name].[hash][ext]',
      path: paths.build,
   },
   optimization: {
      splitChunks: {
         chunks: 'all'
      }
   },
   devtool: isDev ? 'source-map' : 'hidden-source-map',
   devServer: {
      static: paths.build,
      open: true,
      compress: true,
      port: 'auto',
      host: 'local-ip',

      client: {
         logging: 'none',
      },

      watchFiles: [
         `${paths.dev}/**/*.html`,
      ],
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
         template: `${paths.dev}/index.html`,
      }),
      new MiniCssExtractPlugin({
         filename: filename('css')
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: `${paths.dev}/static`,
               to: `${paths.build}/static`
            }
         ]
      })
   ],
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               postCSS(),
               'sass-loader'
            ],
            exclude: '/node-modules/'
         },
         {
            test: /\.js$/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: babelPreset('@babel/preset-env')
               }
            },
            exclude: '/node-modules/'
         },
         {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
               sources: {
                  list: [
                     "...",
                     {
                        tag: 'link',
                        attribute: 'href',
                        type: 'src',
                        filter: () => false
                     }
                  ]
               }
            },
            exclude: '/node-modules/'
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            type: 'asset/resource'
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource'
         },
      ]
   }

}

module.exports = config