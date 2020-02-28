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
  circularText: {
  width: 50,
  height: 50,
  borderRadius: '50%',
  padding: '8px 11px',
  marginRight: 20,
  fontSize: 10,
  backgroundColor: '#D8E0DE',
  color: 'white',
  textAlign: 'center',
  background: '#000',
  },
  snackbar: {
    margin: theme.spacing(1),
    backgroundColor:'rgb(234, 250, 241, 0.5)',
    boxShadow: 'none',
    width: '73%',
color:'black',
[theme.breakpoints.down('sm')]: {
  width: '95%'
},     
  },
}));

export default function SnackBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
 
      <SnackbarContent
        className={classes.snackbar}
        message={<span><span className={classes.circularText}>{props.number}</span>{props.message}</span>}
        
      />
      
    </div>
  );
}
