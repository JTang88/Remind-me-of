import React from 'react';
import FacebookLogin from 'react-facebook-login'
import { observer, inject } from 'mobx-react';
import { Typography, withStyles } from '@material-ui/core';
import axios from 'axios'
import './index.css'

const styles = {
  title: {
    width: 400,
    borderRadius: 20,
    margin: 'auto',
  },
}

const Login = ({ thoughtsStore: { initalizeThoughts }, userStore: { insertUserInfo }, history, location, classes: { title } }) => {

  const responseFacebook = async (response) => {
    insertUserInfo(response);
    localStorage.setItem('authenticated', 'true')
    const { data: { thoughts } } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/fetch-user`, {
      _id: response.id,
    });
    console.log('here are thoughts', thoughts)
    if (thoughts) {
      initalizeThoughts(thoughts)
    } 
    if (location.from) {
      history.push(`${location.from}`);
    } else {
      history.push('/');
    }
  }

  console.log('here is history in Login', history)
  return (
    <div className="login-container">
      <Typography
        className={title}
        variant='display4'
        color="secondary"
        align='left'
      >
        REMIND
      </Typography>
      <Typography
        className={title}
        variant='display4'
        color="secondary"
        align='left'
      >
        ME
      </Typography>
      <Typography
        className={title}
        variant='display4'
        color="secondary"
        align='left'
        gutterBottom
      >
        OF
      </Typography>
      <div className='login-box'>
        <div className="face-login-wrap">
          <FacebookLogin
            appId="237618007038254"
            fields="name,email,picture.width(120).height(120)"
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  )
};


const LoginWithStyles = withStyles(styles)(Login);

export default inject('userStore', 'thoughtsStore')(observer(LoginWithStyles));