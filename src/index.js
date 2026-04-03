import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/stylesheets/style.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import UserContextProvider from './contexts/GridDataContext/GridDataContextProvider';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
