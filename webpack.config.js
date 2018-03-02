const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js'
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
      new htmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      })
    ],
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
}
