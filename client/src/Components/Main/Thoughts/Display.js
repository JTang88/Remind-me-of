import React, { Component } from 'react'
import { Paper, withStyles, IconButton, Icon } from '@material-ui/core';


const styles = {
  paperRoot: {
    backgroundColor: '#F8EFBA',
    minHeight: 400,
    width: 800,
    margin: 'auto',
  },
}

class Display extends Component {
  render () {
    const { handleAdd, classes: { paperRoot } } = this.props;
    return (
      <div>
        <IconButton onClick={handleAdd} color="primary">
          <Icon>add_circle</Icon>
        </IconButton>
        <Paper className={paperRoot}>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Display);

