import React, {useState, useEffect} from 'react';
import ClientLayout from '../../layouts/ClientLayout'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import images from './icon/images.svg';
import tower from './icon/tower.jpg';
import { useHistory } from "react-router-dom";
import './font.css';


const useStyles = makeStyles(theme => ({
   menuBtns: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
    letterSpacing: 5,
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#f5f6f8',
    textAlign: 'left',
    fontSize: 34,
    textTransform:'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },    
  },
  description: {
    letterSpacing: 1,
    fontFamily: 'Montserrat',
    flexGrow: 1,
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#e6ebf9',
    fontSize: 15,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
      paddingTop: 20
    },    
  },
  downloadButton: {
    borderColor:'white',
    marginRight: theme.spacing(2),
    color: 'white',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
    },    
  },
  roundedFooter: {
    width:'60%',
    fontFamily: 'Montserrat',
    backgroundColor:'white', 
    height: 100, 
    position:'absolute', 
    right: 0, 
    bottom:66, 
    borderTopLeftRadius:14,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
    },    
  },
  bottomCarousel: {
    marginTop: 100,
    color: '#b9bbc2',
    marginLeft:'6%',
    fontFamily: 'Montserrat',
    [theme.breakpoints.down('sm')]: {
      
      marginTop: '30px'
    },    
  },
  homeContainer: {
    width: '50%',
    fontFamily: 'Montserrat',
    marginTop: 150,
    marginLeft:'6%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '70px'
    },    
    
    
  }
  }));
function Layout(props) {
const [total, setTotal] = useState(3)
const [current, setCurrent] = useState(0)

const words = [{bigTitle: "Lagos State Real Estate Transaction Department", longDescription: "The legislation for the establishment of Real Estate Transaction Department was confirmed by an Executive order No. EQ/BRF/009 of 2012 by the erstwhile Governor of Lagos State, Mr Babatunde Raji Fashola (SAN)", title: "REAL ESTATE", description: "The legacy of the new lagos, a new Dawn", subheader: "New Lasretrad policy"}, 
              {bigTitle: "Legislation and The Executive order of the state Government", longDescription: "Various Legislation and the Executive order of the State Government for Estate Agents, Developers, Letting Agents and other Property Service Providers were introduced to create a credible regulatory framework and to ensure that consumers are better Informed.", title: "REAL ESTATE", description: "The legacy of the new lagos, a new Dawn", subheader: "New Lasretrad policy"}, 
              {bigTitle: "Ensure Adequate Protection for Consumers ", longDescription: "The organisation is to work with other relevant agencies of Government to ascertain that Lagos residents are adequately protected in the course of Real Estate transactions and to equally entrench the principle of fair-play, orderly conduct and accountability in Real Estate sector of the state.", title: "REAL ESTATE", description: "The legacy of the new lagos, a new Dawn", subheader: "New Lasretrad policy"}
              
]
useEffect(() => {
  const interval = setInterval(() => {
    setCurrent(current+1==total?0:current+1)
  }, 6000);

  return () => clearInterval(interval);
});
const bullets = ["○","○","○"];
bullets[current] = "⏺"

function goNext(){
  this.setCurrent(
    current+1 == total? 0 : current+1
  )
}

  const classes = useStyles();
    return (
      <>
        <ClientLayout showFooter={true} showBackgroundImage={true} Height="550px" showRoundFooter={true}>
        <div className={classes.homeContainer}>
        <Typography className={classes.title} variant="h5">
        {words[current].bigTitle}
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
       {words[current].longDescription}
        </Typography>
        </div>

        <div className={classes.bottomCarousel}>
         <p style={{color:"white"}}>{bullets}</p> 
      <p style={{margin:0}}>{words[current].title}</p> 
       <p style={{margin:0}}> {words[current].subheader}</p>
<p style={{margin:0}}>{words[current].description}</p>
        </div>
        </ClientLayout>
      </>
    );
  }
  
  export default Layout;