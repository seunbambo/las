import React,{useState, useEffect} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import {sendHttpRequest, BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
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
import report from './assets/report.svg'


import useForm from 'react-hook-form'
import StepperFormPageOneDashboard from '../StepperFormPageOneDashboard';
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
    
    margin2: {
        width: '65%',
        paddingRight: 10,
        paddingBottom:10,
        [theme.breakpoints.down('sm')]: {
          width: '94%', float: 'none', paddingRight:0, paddingLeft:0, marginLeft:'3%'
        },     
  
      },

    margin: {
      width: '33%',
      paddingRight:30,
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '94%', float: 'none', paddingRight:0, paddingLeft:0, marginLeft:'3%'
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
        width: '95%', float: 'none',
      },  
    },
    formContainer: {
      position: 'fixed',
      cursor: 'pointer',
      minHeight:210,
      border: '1px solid gray',
      left: '17%',
      top: '120px',
      width: '250px',
      height: '250px',
      borderRadius: '10px',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },   
},
formContainerText: {
  textAlign: 'left',
  paddingTop: 24
},
formPageText: {
    fontSize: 11,
    textAlign: 'left'
},
submit: {
  margin: theme.spacing(3, 0, 2),
  backgroundColor:'#072455',
  width: '70%',
  [theme.breakpoints.down('sm')]: {
    width:'100%',
  },
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
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%!important'
    },   
  },
  btnCategory: {
      width: '100%'
  },

  buttonCont: {
    margin:'auto'
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
  btnHolder: {
      marginTop: 20,
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
      marginTop: 3,
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

export default function WhistleBlowingDashboard(props) {
  const { register, handleSubmit } = useForm()
  const [allFiles, changeAllFiles] = useState([]);
  const [second, changeSecond] = useState(false)
  const [btnColor, changebtnColor] = useState('#072455');
  const [enabled, changeEnabled] = useState(false)
  const [btnColorOutline, changebtnColorOutline] = useState('transparent');
  const [certificate_of_incorporation, changeCert] = useState("")
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("")
  const [myErrors, changeErrors] = useState([])
  const [showPreloader, changePreloader] = useState(false)

  let history = useHistory();

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  useEffect(() => {   
    var state = JSON.parse(localStorage.getItem('reduxStore'));
    const userToken2 = localStorage.getItem('token');
    if(userToken2==null || userToken2=="" || state.userDetail=={}){
      history.push('/login')
    }      
  }, []);

  
  const registerUrl = BASEURL+'/whistle-blows';


  const defaultDetails = {name: "null", last_name:"null"}
var state = JSON.parse(localStorage.getItem('reduxStore'));

  const Detail = isEmpty(state) ? defaultDetails : state.userDetail
  const allImageNames = []
  
const onSubmit = data => {
  const postUrl = BASEURL+'/whistle-blows';
  let accessToken = Detail.access_token
  let user_id = Detail.user.id
  console.log("this is the access token", accessToken)
  console.log("this is the user_id", )
  console.log("my datas", data)
  const formData = new FormData(); 
  formData.append('user_id', user_id)
  formData.append('your_first_name', data.first_name)
  formData.append('your_last_name', data.last_name)
  formData.append('your_phone_number', data.phone_number)
  formData.append('your_email', data.email)
  formData.append('role', data.role)
  formData.append('id_number', data.id_number)
  formData.append('complaint', data.complaint)
  formData.append('report_type', "tenant")
  // formData.append('supporting_image', JSON.stringify(allFiles))
  for(var i in allFiles){
    formData.append('supporting_image[]', allFiles[i])
  }
  formData.append('first_name_of_reporter', Detail.user.name)
  formData.append('last_name_of_reporter', Detail.user.last_name)
  formData.append('first_name', Detail.user.name)
  formData.append('last_name', Detail.user.last_name)
  formData.append('report', data.report)

  formData.forEach((value, key) => {
    console.log("my datas from formData","key %s: value %s", key, value);
  })
 sendHttpRequestWithFormDataWithoutHeaders('POST', registerUrl, formData).then(responseData=>{            
   console.log("fffffffeeeeeeeee",responseData)    
   if(responseData.data != {} || responseData != ""){
       history.push('/success_page/report')
   } 
     
 })
}
const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPageOneDashboard 
 header1="Whistle Blow"
 number={1}
 topText = "Whistle Blow"
 message = "Make your Complaint to LASRETRAD"
 sideImage={report}
 currentPage="Whistle Blow"
 bottomText=""
 page1={
   
   <div>

<FormControl className={classes.margin}>
    
        <span style={{fontSize: '10px'}}>Firstname*</span> 
        <BootstrapInput inputRef={register} name="first_name" placeholder="firstname" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Lastname*</span> 
        <BootstrapInput inputRef={register} name="last_name" placeholder="lastname" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Role*</span> 
        <BootstrapInput inputRef={register} name="role" placeholder="Role" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>ID Number*</span> 
        <BootstrapInput inputRef={register} name="id_number" placeholder="ID Number" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Complaint*</span> 
        <BootstrapInput inputRef={register} name="complaint" placeholder="kindly state your complaints" id="bootstrap-input" />
</FormControl>

<Button
      type="submit"
    
      fullWidth
      variant="contained"
      className={classes.submit}
    >Submit</Button>
   </div>
  
 }
 


 
 />
 </form>
    );
}