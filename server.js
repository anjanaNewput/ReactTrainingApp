const path = require('path');
const express = require('express');
const port = (process.env.PORT || 8081);

const app = express();
const indexPath = path.join(__dirname, 'index.html');
app.use(express.static(path.join(__dirname, '/public/dist')));
app.get('*', function (_, res) { res.sendFile(path.resolve(indexPath))});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.prod.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

app.listen(port);
