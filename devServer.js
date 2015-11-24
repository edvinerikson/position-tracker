import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.dev.html'));
});

const server = app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }
  const { address: host, port } = server.address();
  console.log(`Listening at http://${host}:${port}`); // eslint-disable-line no-console
});
