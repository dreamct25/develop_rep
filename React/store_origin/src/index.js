import React from 'react';
import ReactDOM from 'react-dom';
import './globalStyles.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { Router,Redirect,HashRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const AppAll = (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <HashRouter>
        <Redirect to="/" />
        <App />
      </HashRouter>
    </Router>
  </Provider>
)

ReactDOM.render(AppAll,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
