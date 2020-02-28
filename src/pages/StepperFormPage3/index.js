import React,{useState} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
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
import Loader from 'react-loader-spinner';

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
        width: '95%', float: 'none',
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
        width: '95%', float: 'none',
      },     
  },

  
    rightSide2: {
      width: '5%',
      top: 130,
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '95%', float: 'none',  top: 110,
      },  
    },
    rightSide3: {
      width: '5%',
      top: '50%',
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '95%', float: 'none',
      },  
    },
    formContainer: {
      position: 'fixed',
      cursor: 'pointer',
      minHeight:210,
      border: '1px solid gray',
      left: '14%',
      top: '150px',
      width: '250px',
      height: '250px',
      borderRadius: '10px',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },   
},
formContainerMessage: {
  textAlign: 'center',
  width: '70%',
  margin: 'auto',
  textAlign: 'center',
  marginTop: 10,
  fontSize: 12
},


formContainerImage: {
  width: 90,
  height: 90,
  margin: 'auto',
  marginTop: '9px',
   
 
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
  formContainerText: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    color: '#b2bbcc',
    fontWeight: 'bold'
  },
  
  topText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 15
  },


  formElements: {
    width: '84%', height: 100, marginLeft: '4%',
    [theme.breakpoints.down('sm')]: {
      width: '90%!important'
    },   
  },

  contain: {
    
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%!important'
    },   
  },
  btnCategory: {
      width: '100%'
  },

  buttonCont: {
    marginTop: 5,

    [theme.breakpoints.down('sm')]: {
      marginTop: 1,
    },   
  },

  submit: {
  
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#284174',
    color: 'white',
  
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
textCont: {
  position: 'absolute',
  background: '#2a2e43',
  bottom: 0,
  width: '100%',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
},

  icon: {
    fontSize: 20,
  },
  itemContainer: {
    paddingLeft: 30,
    paddingBottom:10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
    }, 

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
      width: 200,
      [theme.breakpoints.down('sm')]: {
        padding: '15px 5%',
        
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
  const [page1, changePageOne] = useState('block')
  const [page2, changePageTwo] = useState('none')
  const [page3, changePageThree] = useState('none')
  const [page2Validated, changePageTwoValidationState] = useState(props.page2Validated)
  

    const classes = useStyles();
    // const currentPage = props.match.params.category_id;
    let history = useHistory();
  
  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  const currentItems = [ 
      <SnackBar message={props.header1}/>,
      <SnackBar message={props.header2}/>,
      <SnackBar message={props.header3}/>
  ]



const itemSelector =() => {
  return currentItems.slice(0,count)
} 


const nextItem = (type="",) => {
  if(type=="increment"){
   if(count ==1){
    changePageOne('none')
    changePageTwo('block')
    changePageThree('none')
    count===3?setCount(1):setCount(count+1)
   }
   else if(count == 2){
    changePageOne('none')
    changePageTwo('none')
    changePageThree('block')
    count===3?setCount(1):setCount(count+1)
   }
    
  }
 
  else if(type==="decrement"){
    if(count == 3){
      changePageOne('none')
      changePageTwo('block')
      changePageThree('none')
      count==1?setCount(1):setCount(count -1)
     }
    else if(count == 2){
      changePageOne('block')
      changePageTwo('none')
      changePageThree('none')
      count==1?setCount(1):setCount(count -1)
     }
  }


}
function showLoader(width, height){

  return (
      <Loader
      type="Watch"
      color="#072455"
      visible={true}
      height={width}
      width={height}
      />
)
}
const showPage1Button = props.page1Validated;
const showPage2Button = props.page2Validated;
console.log("this is the descritive validation", showPage2Button)
  return (
    <DashboardLayout marginTop={114} width="100%" showCurvedFooter={false} showFooter={true} showBackgroundImage={false} backgroundColor="white" height="700px">
<Grid container style={{width:'100%', marginTop:20}}>
<Grid item md={4}></Grid>

<Grid item xs={12} sm={12} md={8} className={classes.itemContainer}>
    
    {itemSelector()}

</Grid>
</Grid>
<div className={classes.leftSide}>
    <Grid container spacing={10} className={classes.contain}>
        <Grid item xs={12} sm={3} md={2}>
        
                <div data-id="1" className={classes.formContainer} style={{borderSize:1}}>
                <Typography className={classes.topText}>{props.topText}</Typography>
                <Avatar src={props.sideImage} className={classes.formContainerImage} style={{overflow:'visible'}} />
        
        <Typography className={classes.formContainerMessage}>{props.message}</Typography>
        <div className={classes.textCont}>
        <Typography className={classes.formContainerText}>{count}/3</Typography>
       
        </div>
        </div>

        </Grid>
    </Grid>
</div>

<Grid container>
<Grid item md={4}></Grid>
<Grid item xs={12} sm={12} md={8}>

<div className={classes.formElements}>


<div style={{display:page1}}>
{props.page1}
{count ===1 &&
<Grid item xs={12} sm={12} md={12} className={classes.buttonCont}>

      <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={!showPage1Button}
      onClick={() => nextItem("increment")}
      className={classes.submit}
    >Continue</Button>
</Grid>
}
</div>




<div style={{display:page2}}>
{props.page2}
{count ===2 &&
<Grid item xs={12} sm={12} md={12} className={classes.buttonCont}>
      <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={!showPage2Button}
      onClick={() => nextItem("increment")}
      className={classes.submit}
    >Continue</Button>
</Grid>
}
</div>

<div style={{display:page3}}>
{props.page3}

</div>


</div>
<div className={classes.rightSide2}><PreviousButton  clickHandler={() =>nextItem("decrement") }/></div>

  <div className={classes.rightSide3}>{props.loader}</div>
</Grid>

<Grid container className={classes.formContain}>
<Grid item xs={10} sm={12} md={4} className={classes.buttonCont}>
      
</Grid>

</Grid>

</Grid>
    </DashboardLayout>
  );
}
