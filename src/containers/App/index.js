import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Loadable from 'react-loadable';


const LoadingComponent = () => (<div>Loading...</div>);
const Landing = Loadable({
  loader: () => import('../Landing'),
  loading: LoadingComponent,
});


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={ <Landing /> } path="/" />
        <Route element={ <Navigate replace to="/" /> } path="*" />

        {/* TODO: Replace the following route with a 404 page down-the-road */}
        {/* <Route component={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};


export default App;
