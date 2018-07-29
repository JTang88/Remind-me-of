import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { withStyles, TextField, Button } from '@material-ui/core';

const styles = {
  textRoot: {
    padding: 20,
    backgroundColor: '#F8EFBA',
  },
  button: {
    margin: 10,
  }
}

@inject('userStore')
@observer

class Add extends Component {
  state = {
    thought: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  }

  handleSubmit = async () => {
    const { userStore: { addThought }, userStore: { id } } = this.props;
    const { data: { thought } } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/thought`, {
      _id: id,
      text: this.state.thought,
    });
    console.log('here is new thought', thought)
    addThought(thought);
    this.handleCancel();
  }

  render () {
    const { classes: { textRoot, button } } = this.props;
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
        <Button className={button} variant='outlined' color='inherit' onClick={this.handleCancel}>
          Cancel
          </Button>
        <Button className={button} variant='outlined' color='inherit' onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    ) 
  }
}

export default withStyles(styles)(Add);