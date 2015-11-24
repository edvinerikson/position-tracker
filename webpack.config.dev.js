import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'bootstrap/dist/css/bootstrap.css',
      './src/styles.css',
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify('AIzaSyDU4Uv70DPJfmgkObBxdvJYiTUnvkJbp80'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loaders: [ 'style', 'css' ] },
      { test: /\.(svg|eot|woff|woff2|ttf)$/, loaders: [ 'url' ] },
    ],
  },
};
