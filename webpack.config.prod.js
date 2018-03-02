const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      vendor: ['semantic-ui-react'],
      app: [
      'react-hot-loader/patch', //active HMR for react
      './src/index.js'
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: 'vendor',
            name: 'vendor',
            enforce: true
          }
        }
      }
    },
    output: {
        publicPath: '/', //hot reloading won't work wfor nested routes without it
        filename: 'static/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            //js rule
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },

            //styles
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true, //loader use css modules to make css working in js,
                      localIdentName: '[folder]-[local]-[hash:12]',
                      camelCase: true,
                      sourceMap: true,
                      // Allows to configure how many loaders
                      // before css-loader should be applied
                      // to @import(ed) resources
                      importLoaders: 1
                    }
                  },
                  {
                    // PostCSS will run before css-loader and will
                    // minify and autoprefix our CSS rules. We are also
                    // telling it to only use the last 2
                    // versions of the browsers when autoprefixing
                    loader: 'postcss-loader',
                    options: {
                      config: {
                        ctx: {
                          autoprefixer: {
                            browsers: 'last 2 versions'
                          }
                        }
                      }
                    }
                  }
                ]
              })
            }
        ]
    },
    plugins: [
      new htmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      }),
      // Create the stylesheet under 'styles' directory
      new ExtractTextPlugin({
        filename: 'styles/styles.[contenthash].css',
        allChunks: true
      })
    ]
}
