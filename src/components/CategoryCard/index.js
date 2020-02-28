import React,{useState} from 'react';
import {Toolbar, Avatar, Typography, Button, Grid} from '@material-ui/core';
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
        textAlign: 'left',
        width: '100%',
        marginBottom: 1,
        color: '#a8a9b2',
        margin: 'auto',
        fontSize: 12,
        marginTop: 1,
    },
    title: {
        textAlign: 'left',
        fontSize: 13,
        width: '100%',
        margin: 'auto',
        color: '#a8a9b2',
        fontWeight: 'bold'
    },
    header: {
        textAlign: 'left',
        fontFamily: 'Montserrat',
        width: '70%',
        margin: 'auto'
    },
    eachCard: {
        margin:'2%',
        float:'left',        
        width:'15%',
        fontFamily: 'Montserrat',       
        borderRadius: 5,
        position: 'relative',
        height: 200,
        flex:1,
        [theme.breakpoints.down('sm')]: {
           marginRight:0, float: 'none',  paddingRight:0, width:'100%'
          },    
    },
    imgContainer: {
        marginTop: 50,
    }

}))

export default function ProductCard(props){
    const classes = useStyles();
    return (       
        <>
            <div className={classes.eachCard} onClick={props.handleClick} style={{color:props.textColor, border:'solid', borderWidth:props.borderWidth, borderColor:props.borderColor}}>      
            <img src={props.marked} style={{borderRadius:40, float:'right', width: 20, height:20, right:20, top: 20, position:'absolute', border:'solid', borderWidth:1, backgroundPosition: 'center', background:`url(${props.marked})`, backgroundSize:'cover'}} />
                <div className={classes.imgContainer} style={{textAlign:'center'}}>
                    <img src={props.Image} alt="" style={{height:77}} /></div>
                <div style={{textAlign:'center'}}>
                    <p style={{fontWeight:'bold', color:props.textColor}}>{props.bottomText}</p>
                </div>
            </div>
        </>
    )

}
