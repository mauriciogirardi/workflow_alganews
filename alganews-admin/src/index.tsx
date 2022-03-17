import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ptBR from 'antd/lib/locale/pt_BR';

import { store } from './core/store';
import { MainRoutes } from './app/routers';
import { DefaultLayout } from './app/Layout';

import './styles/index.less';
import 'react-loading-skeleton/dist/skeleton.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ptBR}>
        <Provider store={store}>
          <DefaultLayout>
            <MainRoutes />
          </DefaultLayout>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
