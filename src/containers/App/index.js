import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';

// eslint-disable-next-line import/no-webpack-loader-syntax
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../assets/stylesheets/style.scss');


// const Landing = asyncComponent(() => import("../Landing"));
const LoadingComponent = () => (<div>Loading...</div>);
const Landing = Loadable({
  loader: () => import('../Landing'),
  loading: LoadingComponent,
});


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact component={Landing} path="/" />
          <Redirect from="/" to="/" />

          {/* TODO: Replace the following route with a 404 page down-the-road */}
          {/* <Route component={<NotFound />} /> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}


export default App;
