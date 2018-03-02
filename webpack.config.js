const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000

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
        filename: '[name].[hash].js'
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
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true, //loader use css modules to make css working in js,
                    localIdentName: '[folder]-[local]-[hash:12]',
                    camelCase: true,
                    sourceMap: true
                  }
                }
              ]
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), //print hotmodule replacement info
      new htmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      })
    ],
    devServer: {
      host: 'localhost',
      port: port,
      hot: true,
      historyApiFallback: true,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
}
