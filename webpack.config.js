/* eslint-disable eol-last */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpack = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();
const isDev =(process.env.ENV === 'development');
const entry =  ['./src/frontend/index.js'];
if(isDev){
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true')
}
module.exports = {
  entry,
  //Modificacion para que funcione en cualquier entorno
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            'loader': 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  optimization:{
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    isDev ? new webpack.HotModuleReplacementPlugin():
    ()=>{},
    isDev ? ()=>{}: 
    new CompressionWebpack({
      test: /\.js$|\.css$/,
      filename: '[path][base].gz'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};