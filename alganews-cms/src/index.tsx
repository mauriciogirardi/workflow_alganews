import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'app/components/ErrorBoundary';
import { GlobalStyles } from 'core/styles/globalStyles'
import { MainRoutes } from 'app/routes'

import 'core/styles/imports.css';

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <GlobalStyles />
            <BrowserRouter>
                <MainRoutes />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);
