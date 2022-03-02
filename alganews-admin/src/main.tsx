import 'antd/dist/antd.css';
import './styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './core/store';
import { MainRoutes } from './app/routers';
import { DefaultLayout } from './app/Layout';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DefaultLayout>
          <MainRoutes />
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
