import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/style.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import UserContextProvider from './contexts/GridDataContext/GridDataContextProvider';


ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
