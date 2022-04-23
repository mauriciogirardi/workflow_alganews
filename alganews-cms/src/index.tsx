import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ErrorBoundary } from 'app/components/ErrorBoundary';
import { GlobalStyles } from 'core/styles/globalStyles';
import { MainRoutes } from 'app/routes';
import { store } from 'core/store';

import 'auth/httpConfig';
import 'core/styles/imports.css';

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <GlobalStyles />
            <BrowserRouter>
                <Provider store={store}>
                    <MainRoutes />
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root'),
);
