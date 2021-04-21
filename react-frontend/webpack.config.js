const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    mode:"development",
    entry:["@babel/polyfill", "./src/index.js"],
    output:{
        path: path.resolve(__dirname, './fld'), 
        publicPath: "/fld/",
        filename:"bundle.js"
    },
    devServer: {
        port: 3000,
        open: true
      },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
          }),
    ],
    module:{
        rules: [
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
              },
              {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                  }
              },
        ]
    }

}