import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core'; 
import Thoughts from './Thoughts';
import './index.css'; 



@inject('userStore')
@observer

class Main extends Component {
  render () {
    const { userStore: { name, pictureURL } } = this.props;
    return (
      <div className='main-container'>
        <div>
          <img className='profile-pic' src={pictureURL} alt={`${name}'s pic`} />
        </div>
        <Button color='inherit'>
          thoughts
        </Button>
        <Button color='inherit'>
          Reminds
        </Button>
        <div className='main-content-container'>
          <Thoughts />
        </div>
      </div>
    )
  }

} 
  

export default Main;