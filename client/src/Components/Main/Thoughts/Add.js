import React, { Component } from 'react'
import { withStyles, TextField, Button } from '@material-ui/core';
import './index.css';

const styles = {
  textRoot: {
    padding: 20,
    backgroundColor: '#F8EFBA',
  },
  button: {
    margin: 10,
  }
}

class Add extends Component {
  state = {
    thought: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { handleCancel, classes: { textRoot, button } } = this.props;
    return (
      <div className='text-field-container' >
        <TextField
          className={textRoot}
          autoFocus
          placeholder='Meaningful thoughts that you would like to be reminded of..'
          id="thought"
          name="thought"
          value={this.state.thought}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          multiline
          rows={15}
        />
        <Button className={button} variant='outlined' color='inherit' onClick={handleCancel}>
          Cancel
          </Button>
        <Button className={button} variant='outlined' color='inherit'>
          Submit
        </Button>
      </div>
    ) 
  }
}

export default withStyles(styles)(Add);