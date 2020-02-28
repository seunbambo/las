import React,{useState} from 'react';
import ClientLayout from '../../layouts/ClientLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import PreviousButton from './previousButton'
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Select from '@material-ui/core/Select';
import './RegisterSalesAndLeases.css';
import SnackBar from './SnackBar';
import useForm from 'react-hook-form'
import mark from './assets/mark.svg';

import home3 from './home3.png'
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import { NONAME } from 'dns';
import { isAbsolute } from 'path';



  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    rootList: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },

    margin: {
      width: '33%',
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },     

    },
   card: {
    position: 'relative'
   },
    rightSide: {
        width: '60%', float: 'left',
        [theme.breakpoints.down('sm')]: {
          width: '88%', float: 'none', marginLeft: 10
        },     
    },
    leftSide: {
      width: '35%', float: 'left',
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', display:'none', width:0
      },     
  },
    rightSide2: {
      width: '5%',
      top: 150,
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },  
    },
    rightSide3: {
      width: '5%',
      top: '50%',
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },  
    },
    formContainer: {
      position: 'fixed',
      cursor: 'pointer',
      minHeight:210,
      border: '1px solid gray',
      left: '17%',
      width: '220px',
      height: '220px',
      borderRadius: '10px',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },   
},
formContainerText: {
  textAlign: 'center',
  paddingTop: 24,
  color: '#284174',
  fontWeight: 'bold'
},

formContainerImage: {
  width: 100,
  height: 100,
  margin: 'auto',
  marginTop: '29px',
   
 
},
contain: {
  marginLeft: '6%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },   
},

  counterColumn: {
    width:'100%', height:50, backgroundColor:'#024d71',
    bottom: 0,
    position: 'absolute'
  },
 
  formContainerImage: {
    width: 100,
    height: 100,
    margin: 'auto',
    marginTop: '29px',
         
   
  },
  formCon: {
    
    [theme.breakpoints.down('sm')]: {
      width:'98%',
    }, 
  },
  contain: {    
    position: 'absolute',
    top: 172,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%!important'
    },   
  },
  btnCategory: {
      width: '100%'
  },

  buttonCont: {
    margin:'auto',
    marginTop: 130,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  formSize: {
    width: '100%important'
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  }));
  


const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(2),
        fontSize: 12,
        color: '#072455'
      },
    },
    input: {
      borderRadius: 4,
      marginTop: 15,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #072455',
      color: '#072455',
      fontSize: 12,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: '15px 10px',
        
      },   
      padding: '15px 15px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);

export default function RegisterSalesAndLeases(props) {
  // form methods
  const { register, handleSubmit } = useForm()
  const [count, setCount] = useState(1);
  const onSubmit = data => {console.log("this is the form data",data)}

  const height = props.height ==="tall" ? 600 : 200;

    const classes = useStyles();
    
    let history = useHistory();
  
  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  const currentItems = [ 
      <SnackBar message={props.header1} number={props.number}/>,
   
   
  ]


  const moveBack = (link) => history.goBack()
const itemSelector =() => {
  return currentItems.slice(0,count)
} 

const nextItem = (type="",) => {
  if(type=="increment"){
    count===2?setCount(1):setCount(count+1)
  }
  else if(type==="decrement"){
    count==1?setCount(1):setCount(count -1)
  }


}

const tenantmarkedImage = mark;
  return (
    <ClientLayout width="100%" showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="700px">


<Grid container style={{width:'100%', marginTop:20}}>
<Grid item md={3}></Grid>

<Grid item xs={12} sm={12} md={9} className={classes.itemContainer}>
    
    {itemSelector()}

</Grid>
</Grid>

<div className={classes.leftSide}>
    <Grid className={classes.contain}>
        <Grid item xs={12} sm={3} md={2}>
                <div data-id="1" className={classes.formContainer} style={{borderSize:1, borderRadius:10, position: 'relative', }}>
                <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${tenantmarkedImage})`, borderWidth:1 }}></div>
                <Avatar src={props.sideImage} className={classes.formContainerImage} style={{overflow:'visible'}} />
                <Typography className={classes.formContainerText}>{props.currentPage}</Typography>
        
        </div>

        </Grid>
    </Grid>
</div>

<Grid container className={classes.formCon}>
<Grid item md={3}></Grid>
<Grid item xs={12} sm={12} md={9}>

<div style={{width: '100%', height: 100}}>


{count == 1 &&
<div>
{props.page1}
</div>
}



</div>
{/* <div className={classes.rightSide2}><PreviousButton  clickHandler={() =>nextItem("decrement") }/></div> */}
<div className={classes.rightSide3}>{props.loader}</div>
<div style={{height: 500}}></div>


</Grid>

</Grid>
    </ClientLayout>
  );
}
