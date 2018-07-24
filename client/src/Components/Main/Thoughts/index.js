import React, { Component } from 'react'
import Add from './Add';
import Display from './Display';
import './index.css';

class Thoughts extends Component {

  state = {
    add: false
  }

  handleAdd = () => {
    this.setState({ add: true })
  }

  handleCancel = () => {
    this.setState({
      add: false,
    })
  }

  render () {
    if (this.state.add) {
      return (
        <Add handleAdd={this.handleAdd} handleCancel={this.handleCancel} />
      )
    } else {
      return (
        <Display handleAdd={this.handleAdd} />
      )
    }
   
  }
}

export default Thoughts;