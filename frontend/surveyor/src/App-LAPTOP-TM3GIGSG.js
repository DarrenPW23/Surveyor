import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Overview from './overview/overview';
import Login from './auth/login';
import Auth from './auth/authenticated';
import G2Forms from './g2Form/g2Forms';
import Register from './auth/register';



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
          <Route exact path="/form/logo"   render={(props) => ( <G2Forms {...props} formTitle="Logo questionare" /> )} />
          <PrivateRoute path='/private' component={Overview} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route  component={Overview}/>
        </Switch>
      </Router>
    );
}



export default App;
