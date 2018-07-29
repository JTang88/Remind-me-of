import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import axios from 'axios';
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
import './index.css';


const styles = {
  paperRoot: {
    backgroundColor: '#F8EFBA',
    color: '#2d3436',
    padding: 20,
    height: 50,
    width: 900,
    margin: 'auto',
  },
  root: {
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

@inject('userStore')
@observer

class Thoughts extends Component {
  handleEdit = (thoughtId) => {
    this.props.history.push(`/edit/${thoughtId}`)   
  }

  handleAdd = () => {
    this.props.history.push('/add')
  }

  handleDelete = async (thoughtId) => {
    axios.delete(`${process.env.REACT_APP_REST_SERVER_URL}/api/thought`, {
      params: {
        thoughtId,
        userId: this.props.userStore.id
      }
    }); 
    this.props.userStore.deleteThought(thoughtId);
  }

  render () {
    const { 
      userStore: { thoughts }, 
      classes: { paperRoot, timeStamp, root, listItmeTextRoot, listItemRoot, deleteButton, editButton } 
    } = this.props;
    return (
      <div>
        <IconButton onClick={this.handleAdd} color="primary">
          <Icon>add_circle</Icon>
        </IconButton>
        {
          thoughts.length > 0 ? 
            <List className={root}>
              {
                thoughts.map(thought =>
                  <ListItem key={thought._id} divider button className={listItemRoot}>
                    <div>
                      <Typography className={timeStamp} gutterBottom variant='subheading'>
                        {new Date(thought.updatedAt).toLocaleString()}
                      </Typography>
                      <ListItemText className={listItmeTextRoot} primary={thought.text} />
                      <IconButton className={editButton} onClick={() => this.handleEdit(thought._id)}>
                        <Edit />
                      </IconButton>
                      <IconButton className={deleteButton} onClick={() => this.handleDelete(thought._id)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </ListItem>
                )
              }
            </List> : 
            <Paper className={paperRoot}>
              <Typography variant='subheading' color='inherit'>
                Nothing here yet, click on the add sign to add a thought
              </Typography>
            </Paper>
        }
      </div>
    )
  }
}

export default withStyles(styles)(Thoughts);

