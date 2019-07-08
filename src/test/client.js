import App from './App';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept();
}


