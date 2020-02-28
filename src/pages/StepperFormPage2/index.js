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
import PreviousButton from '../../components/PreviousButton';
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
    rightSide3: {
      width: '5%',
      top: '50%',
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '95%', float: 'none',paddingRight:0
      },  
    },
    margin: {
      width: '33%',
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', paddingRight:0
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
        width: 0, float: 'none', paddingRight:0, display:'none'
      },     
  },
    rightSide2: {
      width: '5%',
      top: 160,
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '95%', float: 'none', top:60, right:5
      },  
    },
    formContainer: {
      position: 'fixed',
      cursor: 'pointer',
      minHeight:210,
      border: '1px solid gray',
      left: '17%',
      width: '220px',
      height: '230px',
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
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%!important',
      marginTop: 10,
    },  
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#072455',
    width: '99%',
    [theme.breakpoints.down('sm')]: {
      width:'96%',
      margin:0,
    },
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
      width: 200,
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
  const [page1, changePageOne] = useState('block')
  const [page2, changePageTwo] = useState('none')
  const onSubmit = data => {console.log("this is the form data",data)}

    const classes = useStyles();
    
    let history = useHistory();
  
  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  const currentItems = [ 
      <SnackBar message={props.header1} number={1}/>,
      <SnackBar message={props.header2} number={2}/>,
   
  ]



const itemSelector =() => {
  return currentItems.slice(0,count)
} 

const nextItem = (type="",) => {
  if(type=="increment"){
    changePageOne('none')
    changePageTwo('block')
    count===2?setCount(1):setCount(count+1)
  }
  else if(type==="decrement"){
    if(count == 2){
      changePageOne('block')
      changePageTwo('none')
      count==1?setCount(1):setCount(count -1)
     }
    else if(count == 1){
     history.goBack()
    }
  }
}


const showPage1Button = props.page1Validated;
const showPage2Button = props.page2Validated;
  return (
    <ClientLayout width="100%" showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="700px">
<Grid container >
  <Grid item md={4}></Grid>
  <Grid item xs={12} sm={12} md={8}>
      
      {itemSelector()}

  </Grid>
</Grid>
<div className={classes.leftSide}>
    <Grid container spacing={1} className={classes.contain}>
        <Grid item xs={12} sm={3} md={2}>
                <div data-id="1" className={classes.formContainer} style={{borderSize:1}}>
                <Avatar src={props.sideImage} className={classes.formContainerImage} style={{overflow:'visible'}} />
  <Typography className={classes.formContainerText}>{count}/2<p>{props.currentPage}</p></Typography>
        
        </div>

        </Grid>
    </Grid>
</div>

<Grid container spacing={3} >
<Grid item md={4}></Grid>
<Grid item xs={12} sm={12} md={8}>

<div style={{width: '100%', height: 100}}>

<div style={{display:page1}}>
{props.page1}
{count !=2 &&
<Grid item xs={12} sm={12} md={12} className={classes.buttonCont}>
      <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => nextItem("increment")}
      className={classes.submit}
    >Continue</Button>
</Grid>
}
</div>



<div style={{display:page2}}>
{props.page2}
</div>

</div>
<div className={classes.rightSide2}><PreviousButton  clickHandler={() =>nextItem("decrement") }/></div>
<div className={classes.rightSide3}>{props.loader}</div>
<div style={{height:150}}></div>


</Grid>

</Grid>
    </ClientLayout>
  );
}
