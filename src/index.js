import http from 'http';
import spdy from 'spdy'
import fs from 'fs'
import {join} from 'path'


let app  = require('./server').default;

const options = {
  key: fs.readFileSync(join(__dirname,'./../key/server.key')),
  cert: fs.readFileSync(join(__dirname, './../key/server.crt'))
}


const spdyserver = spdy.createServer(options,app);
const server = http.createServer(options,app);

let currentApp = app;


server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀server started');
});

spdyserver.listen(3002, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 spdyserver started');
});




if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      spdyserver.removeListener('request', currentApp);
      spdyserver.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
