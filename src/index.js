import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './index.css';
import App from './App';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { HashRouter } from 'react-router-dom';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <HashRouter>
  <Provider store={store}>
    <App />
  </Provider> 
  </HashRouter>,
);
