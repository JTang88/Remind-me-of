import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login';
import CheckAuth from '../CheckAuth';
import Main from '../Main';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={(props) => (
          <CheckAuth component={Main} {...props} />
        )} />
      </Switch>
    );
  }
}

export default App;
