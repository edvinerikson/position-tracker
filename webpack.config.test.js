import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        include: [
          path.join(__dirname, 'src'),
          require.resolve(path.join(__dirname, 'tests.js')),
        ],
      },
      { test: /\.css$/, loaders: [ 'style', 'css' ] },
      { test: /\.(svg|eot|woff|woff2|ttf)$/, loaders: [ 'url' ] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify('AIzaSyDU4Uv70DPJfmgkObBxdvJYiTUnvkJbp80'),
    }),
  ],
};
