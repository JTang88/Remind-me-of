import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core'; 
import Thoughts from './Thoughts';
import Reminds from '../Main/Reminds';
import Add from '../Main/Thoughts/Add';
import './index.css'; 

@inject('userStore')
@observer

class Main extends Component {

  handleThoughts = () => {
    this.props.history.push('/')
  }

  handleRemind = () => {
    this.props.history.push('/reminds')
  }

  
  render () {
    const { userStore: { name, pictureURL } } = this.props;
    return (
      <div className='main-container'>
        <div>
          <img className='profile-pic' src={pictureURL} alt={`${name}'s pic`} />
        </div>
        <Button color='inherit' onClick={this.handleThoughts}>
          thoughts
        </Button>
        <Button color='inherit' onClick={this.handleRemind}>
          Reminds
        </Button>
        <div className='main-content-container'>
          <Switch>
            <Route path='/reminds' component={Reminds} />
            <Route exact path='/' component={Thoughts} />
            <Route path='/add' component={Add} />
          </Switch>
        </div>
      </div>
    )
  }

} 
  

export default Main;