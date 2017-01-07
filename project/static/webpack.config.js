const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');


module.exports = {
  entry: {
    bundle: ['babel-polyfill', './src/index'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/static/',
  },
  watch: true,
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './src')
        ],
        exclude: /node_modules/,
        loader: 'babel'
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
  devtool: 'eval-source-map',
};


// module.exports = {
//   devtool: "eval-source-map",
//   entry: ['babel-polyfill', './src/index'],
//   output: {
//     devtoolLineToLine: true,
//     sourceMapFilename: "./bundle.js.map",
//     pathinfo: true,
//     path: __dirname,
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         include: [
//           path.resolve(__dirname, './src')
//         ],
//         exclude: /node_modules/,
//         loader: 'babel'
//       },
//       {
//         test: /\.scss$/,
//         loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
//       },
//       {
//         test: /\.sass$/,
//         loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
//       },
//     ]
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
//     // new FlowStatusWebpackPlugin({
//     //   failOnError: true,
//     // }),
//   ],
// };