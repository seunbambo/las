import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    description: {
        textAlign: 'center',
        width: '70%',
        marginBottom: 50,
        margin: 'auto'
    },
    header: {
        textAlign: 'center',
        width: '70%',
        margin: 'auto'
    },

}))



export default function HeaderComponent(props){
    const classes = useStyles();

    return (       

    <>
        <Typography variant="h6" gutterBottom className={classes.header}>
                {props.title}
        </Typography>        
        <Typography variant="subtitle2" gutterBottom className={classes.description}>
           {props.description}
        </Typography>
    </>
        )

}
