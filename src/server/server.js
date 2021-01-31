/* eslint-disable global-require */
//importamos varias de las herramientas que usamos en frontedn
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import dotenv from 'dotenv';
import express from 'express';
import webpack from 'webpack';
import reducer from '../frontend/reducers';
import initialState from '../frontend/utils/initialState';
import routes from '../frontend/routes/serverRoutes';
//estas son las de backend

console.log(dotenv.config());
const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));

}
const setResponse = (html) => {
  return (`
  <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="assets/app.css">
        <title>Platzi Video</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="assets/app.js" type="text/javascript"></script>
      </body>
    </html>
  `);
};
//antes de enviar el html renderisamos el resto
const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html));
};
app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
});
