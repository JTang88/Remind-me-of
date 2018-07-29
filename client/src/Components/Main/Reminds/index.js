import React, { Component } from 'react';
import { Button, Typography, FormControl, MenuItem, Select, InputLabel, withStyles } from '@material-ui/core';
import axios from 'axios';
import { times, hours } from '../../../lib'


const styles = {
  typoRoot: {
    margin: 40,
  }, 
  root: {
    display: 'block',
    width: 100,
    margin: '20px auto'
  }, 
  button: {
    margin: 40,
    color: 'white'
  }
}

class Reminds extends Component {
  state = {
    from: 8,
    to: 20,
    freq: 5,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = async () => {
    const { from, to, freq } = this.state
    const { data } = await axios.put(`${process.env.REACT_APP_REST_SERVER_URL}/api/reminds`, {
      from,
      to,
      freq,
    }); 
    console.log('here is data in Reminds', data); 
  }

  render = () => {
    const { classes: { typoRoot, root, button } } = this.props;
    return (
      <div>
        <Typography align='center' variant='title' gutterBottom className={typoRoot}> 
          I'd like to receive text messages
        </Typography>
        <FormControl className={root}>
          <InputLabel htmlFor="from">FROM</InputLabel>
          <Select
            value={this.state.from}
            onChange={this.handleChange}
            inputProps={{
              name: 'from',
              id: 'from',
            }}
          >
            {
              times().map((time, i) => {
                 if (time < 12) {
                   return <MenuItem key={i} value={time}>{time < 10 ? '0' + time : time}:00 am</MenuItem>
                 } else if (time === 12) {
                   return <MenuItem key={i} value={time}>{time}:00 pm</MenuItem>
                 } else  {
                   return <MenuItem key={i} value={time}>{time -12 < 10 ? '0' + (time - 12) : time - 12}:00 am</MenuItem>
                 }
               })
            }
            <MenuItem value={1}></MenuItem>
          </Select>
        </FormControl> 
        <FormControl className={root}>
          <InputLabel htmlFor="to">TO</InputLabel>
          <Select
            value={this.state.to}
            onChange={this.handleChange}
            inputProps={{
              name: 'to',
              id: 'to',
            }}
          >
            {
              times().map((time, i) => {
                if (time < 12) {
                  return <MenuItem key={i} value={time}>{time < 10 ? '0' + time : time}:00 am</MenuItem>
                } else if (time === 12) {
                  return <MenuItem key={i} value={time}>{time}:00 pm</MenuItem>
                } else {
                  return <MenuItem key={i} value={time}>{time - 12 < 10 ? '0' + (time - 12) : time - 12}:00 pm</MenuItem>
                }
              })
            }
            <MenuItem value={1}></MenuItem>
          </Select>
        </FormControl>
        <Typography align='center' variant='title' gutterBottom className={typoRoot}>
          Please don't send me text messages more than once per
        </Typography>
        <Select
          value={this.state.freq}
          onChange={this.handleChange}
          inputProps={{
            name: 'freq',
            id: 'freq',
          }}
        >
          <MenuItem value={1}>1 hour</MenuItem>
          {
            hours().map(hour => 
              <MenuItem value={hour}>{hour} hours</MenuItem>
            )
          }
        </Select>
        <div>
          <Button className={button} size='large' variant='contained' color='primary' onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    )
  }
    
} 
 
export default withStyles(styles)(Reminds)