import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs'
import {join} from 'path'
import {setPushs} from '../lib/helper'


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

let server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );
    if (context.url) {
      res.redirect(context.url);
    } else {
      if(res.push) setPushs([assets.client.js],res)
      res.end(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
        if ('serviceWorker' in navigator) {
            // 为了保证首屏渲染性能，可以在页面 load 完之后注册 Service Worker
            window.onload = function () {           
                navigator.serviceWorker.register('/sw.js');
            };
        }
</script>
    </body>
</html>`);
    }
  });


server.use('/', express.static(join(__dirname, '../build/public')))


export default server;
