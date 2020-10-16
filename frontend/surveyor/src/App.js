import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Overview from './overview/overview';
import Login from './auth/login';
import Auth from './auth/authenticated';
import G2form from './g2form/g2form';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isUserAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
      }}/>
  )} />
);


function App() {
  return (
     <Router style={{height:"100vh"}}>
    
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route exact path="/form" component={G2form} />
          <PrivateRoute path='/private' component={Overview} />
          <Route exact path="/login" component={Login} />
          <Route  component={Overview}/>
        </Switch>
      </Router>
    );
}



export default App;
