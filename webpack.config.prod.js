import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import pkg from './package.json';

const PACKAGES_TO_EXCLUDE = [
  'redux-devtools',
  'redux-devtools-dock-monitor',
  'redux-devtools-log-monitor',
  'redux-logger',
  'bootstrap',
];
export default {
  entry: {
    vendor: Object.keys(pkg.dependencies).filter(dep => PACKAGES_TO_EXCLUDE.indexOf(dep) === -1),
    app: [
      'bootstrap/dist/css/bootstrap.css',
      './src/styles.css',
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'build', '[hash]'),
    publicPath: '/',
    filename: 'output.[name].[hash].bundle.js',
    chunkFilename: '[id].[hash].bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify('AIzaSyDU4Uv70DPJfmgkObBxdvJYiTUnvkJbp80'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],

  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.(svg|eot|woff|woff2|ttf)$/, loaders: [ 'url?limit=1024' ] },
    ],
  },
};
