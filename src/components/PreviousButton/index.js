import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        width: '30px', height:'10px', position:'absolute', margin:'none'
      },
    },
  },
  fab: {
    width:46, height:46,
    [theme.breakpoints.down('sm')]: {
      width: '30px', height:'10px',right:8
    },
  },
}));

export default function PreviousButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{zIndex:10, position:'absolute', top: props.top, right: props.right}}>
      <Fab color="gray" aria-label="add" onClick={props.clickHandler} className={classes.fab}>
        <ArrowBackIosIcon style={{height:15}}/>
      </Fab>
  
    </div>
  );
}