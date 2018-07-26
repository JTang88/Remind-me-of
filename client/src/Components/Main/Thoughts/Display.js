import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { 
  Paper, 
  withStyles, 
  IconButton, 
  Icon, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { getTimeStamp } from '../../../lib/index';


const styles = {
  paperRoot: {
    backgroundColor: '#F8EFBA',
    minHeight: 400,
    width: 900,
    margin: 'auto',
  },
  root: {
    // boxShadow: '10px 10px',
    margin: 'auto',
    width: 900,
    backgroundColor: '#F8EFBA',
  },
  timeStamp: {
    marginTop: 15,
    marginLeft: 16,
    color: '#7f8c8d',
  },
  listItemRoot: {
    position: 'relative'
  },
  editButton: {
    fontSize: 10,
    position: 'absolute',
    top: 10,
    right: 65,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  }
}

@inject('thoughtsStore')
@observer

class Display extends Component {
  handleEdit = (thoughtId) => {
    console.log('let us edit')
  }

  handleDelete = (thoughtId) => {
    console.log('delete this')
  }

  render () {
    const { 
      thoughtsStore: { thoughts }, 
      handleAdd, 
      classes: { paperRoot, timeStamp, root, listItmeTextRoot, listItemRoot, deleteButton, editButton } 
    } = this.props;

    if (thoughts) {
      return (
        <div>
          <IconButton onClick={handleAdd} color="primary">
            <Icon>add_circle</Icon>
          </IconButton>
          <List className={root}>
            {
              thoughts.map(thought =>
                <ListItem key={thought._id} divider button className={listItemRoot}>
                  <div>
                    <Typography className={timeStamp} gutterBottom variant='subheading'>
                      {getTimeStamp(thought._id)}
                    </Typography>
                    <ListItemText className={listItmeTextRoot} primary={thought.text} />
                    <IconButton className={editButton} onClick={this.handleEdit(thought._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton className={deleteButton} onClick={this.handleDelete(thought._id)}>
                      <Delete />
                    </IconButton>
                  </div>
                </ListItem>
              )
            }
          </List>
        </div>
      )
    } else {
      return (
        <Paper className={paperRoot}>
          Nothing here yet, click on the add sign to add a thought
        </Paper>
      )
    }

  }
}

export default withStyles(styles)(Display);

