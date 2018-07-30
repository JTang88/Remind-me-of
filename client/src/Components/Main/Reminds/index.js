import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Typography, FormControl, MenuItem, Select, InputLabel, TextField, withStyles, InputAdornment } from '@material-ui/core';
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
  },
  textField: {
    margin: 'auto',
  }
}

@inject('userStore')
@observer

class Reminds extends Component {
  state = {
    from: '',
    to: '',
    freq: '',
    phone: ''
  }

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    })
    console.log('here is state', this.state)
  }

  handleSubmit = async () => {
    const { id: _id, updateReminds, from, to, freq, phone } = this.props.userStore;
    const { data } = await axios.put(`${process.env.REACT_APP_REST_SERVER_URL}/api/reminds`, {
      _id,
      from: this.state.from !== '' ? this.state.from : from,
      to: this.state.to !== '' ? this.state.to : to,
      freq: this.state.freq !== '' ? this.state.freq : freq,
      phone: this.state.phone !== '' ? this.state.phone : phone,
    }); 
    console.log('here is data', data)
    updateReminds(data)
  }

  render = () => {
    const { classes: { typoRoot, root, button, textField }, userStore: { from, to, freq, phone } } = this.props;
    return (
      <div>
        <Typography align='center' variant='title' gutterBottom className={typoRoot}> 
          I'd like to receive text messages
        </Typography>
        <FormControl className={root}>
          <InputLabel htmlFor="from">FROM</InputLabel>
          <Select
            value={this.state.from !== '' ? this.state.from : from}
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
          </Select>
        </FormControl> 
        <FormControl className={root}>
          <InputLabel htmlFor="to">TO</InputLabel>
          <Select
            value={this.state.to !== '' ? this.state.to: to}
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
          </Select>
        </FormControl>
        <Typography align='center' variant='title' gutterBottom className={typoRoot}>
          Please don't send me text messages more than once per
        </Typography>
        <Select
          value={this.state.freq !== '' ? this.state.freq : freq}
          onChange={this.handleChange}
          inputProps={{
            name: 'freq',
            id: 'freq',
          }}
        >
          <MenuItem value={1}>1 hour</MenuItem>
          {
            hours().map(hour => 
              <MenuItem key={`hour${hour}`} value={hour}>{hour} hours</MenuItem>
            )
          }
        </Select>
        <Typography align='center' variant='title' gutterBottom className={typoRoot}>
          Text me at this number
        </Typography>
        <div>
          <TextField
            id="phone"
            name="phone"
            className={textField}
            value={this.state.phone !== '' ? this.state.phone : phone}
            onChange={this.handleChange}
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">+1</InputAdornment>,
            }}
          />
        </div>
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