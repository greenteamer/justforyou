const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');


// module.exports = {
//   entry: {
//     bundle: ['babel-polyfill', './src/index'],
//   },
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name].js',
//     chunkFilename: '[id].js',
//     publicPath: '/static/',
//   },
//   watch: true,
//   resolve: {
//     extensions: ['', '.js', '.jsx'],
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loaders: ['babel'],
//         include: path.join(__dirname, 'src'),
//       },
//       {
//         test: /\.scss$/,
//         loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
//       },
//       {
//         test: /\.sass$/,
//         loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
//       },
//     ],
//   },
//   plugins: [
//     new ExtractTextPlugin('[name].css'),
//     new ProvidePlugin({
//       jQuery: 'jquery',
//       $: 'jquery',
//       jquery: 'jquery',
//       Tether: 'tether',
//       'window.Tether': 'tether',
//     }),
//     new FlowStatusWebpackPlugin({
//       failOnError: true,
//     }),
//   ],
//   devtool: 'source-map',
// };


module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      // 'webpack-dev-server/client?http://localhost:8000', // WebpackDevServer host and port
      // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './src/index', // Your appʼs entry point
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: 'http://localhost:8080/dist/',
  },
  watch: true,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      // {
      //   test: /\.jsx?$/,
      //   loaders: ['babel'],
      //   include: path.join(__dirname, 'src'),
      // },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
    // new FlowStatusWebpackPlugin({
    //   failOnError: true,
    // }),
  ],
  devtool: 'source-map',
};
