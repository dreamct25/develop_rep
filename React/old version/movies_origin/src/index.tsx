import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router, HashRouter,Redirect } from 'react-router-dom'

const AppJSX: JSX.Element = (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <HashRouter>
        <Redirect to="/" />
        <App />
      </HashRouter>
    </Router>
  </Provider>
)

ReactDOM.render(
  AppJSX,
  document.getElementById('root')
);