import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1200,
  },
  snackbar: {
    margin: theme.spacing(1),
    backgroundColor:'rgb(234, 250, 241, 0.5)',
    boxShadow: 'none',
    width: '80%',
color:'black'
  },
}));

export default function SnackBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
 
      <SnackbarContent
        className={classes.snackbar}
        message={props.message}
        
      />
      
    </div>
  );
}
