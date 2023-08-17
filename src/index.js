import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';//부트스트랩 css
import AppContainer from './containers/AppContainer';
import reportWebVitals from './reportWebVitals';

//리덕스 세팅
import {Provider} from "react-redux";
import store from "./lib/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
//라우터 및 리덕스 세팅
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
