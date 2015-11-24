import fs from 'fs';
import path from 'path';
import express from 'express';

const HASH = '18f824598b3f06373434';
const BASE_PATH = path.join(__dirname, 'build', HASH);
const stats = JSON.parse(fs.readFileSync(path.join(BASE_PATH, 'stats.json'), 'utf8'));
const app = express();
app.use(stats.publicPath, express.static(BASE_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', HASH, 'index.html'));
});

const server = app.listen(3005, '0.0.0.0', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }
  const { address: host, port } = server.address();
  console.log(`Listening at http://${host}:${port}`); // eslint-disable-line no-console
});
