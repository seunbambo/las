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
    const loadme = props.loadme
    return (  
        <> 
    {loadme &&    
    <div style={{width:'100%', background:'rgba(0,0,0,0.5)', position:'absolute', right:0, left:0, top:0, bottom:0, zIndex:10}}>
       <p style={{color:'white', left:'45%', position:'absolute', top:'50%'}}>Loading Content....</p>
    </div>
    }
    </>
        )

}
