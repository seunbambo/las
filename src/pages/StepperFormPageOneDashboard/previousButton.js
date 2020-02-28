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
        width: '40px', height:'20px', position:'absolute', right:0
      }, 
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function PreviousButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="gray" aria-label="add" onClick={props.clickHandler} >
        <ArrowBackIosIcon />
      </Fab>  
    </div>
  );
}