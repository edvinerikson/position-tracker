/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import mustache from 'mustache';
import config from './webpack.config.prod';

const compiler = webpack(config);

compiler.run((err, rawStats) => {
  console.info('Compilation done.');
  const stats = rawStats.toJson({source: false, origins: false});
  if (err || stats.errors.length > 0 || stats.warnings.length > 0) {
    console.log(err, stats.errors, stats.warnings);
  }

  const context = {
    publicPath: stats.publicPath,
    vendorJS: stats.assetsByChunkName.vendor,
    appJS: stats.assetsByChunkName.app[0],
    appCSS: stats.assetsByChunkName.app[1],
  };

  const template = fs.readFileSync(
    path.join(__dirname, 'index.prod.html'),
    'utf8'
  );
  const html = mustache.render(template, context);
  fs.writeFileSync(
    path.join(__dirname, 'build', stats.hash, 'index.html'),
    html
  );
  fs.writeFileSync(
    path.join(__dirname, 'build', stats.hash, 'stats.json'),
    JSON.stringify(context)
  );
  /*
  fs.writeFileSync(
    path.join(__dirname, 'build', 'stats.json'),
    JSON.stringify(stats)
  );
  fs.writeFileSync(
    path.join(__dirname, 'build', 'full-stats.json'),
    JSON.stringify(rawStats.toJson())
  );
  */
  console.log('Done');
  console.log(stats.hash);
});
