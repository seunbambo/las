import React,{useState, useRef} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import {BASEURL, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
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
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from 'react-hook-form'
import professional from './assets/upload-to-cloudldpi.svg';
import StepperFormPage2 from '../StepperFormPage2';
import './styles.css';

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
          width: '100%', float: 'none', paddingRight:2,
        },     
  
      },

    margin: {
      width: '33%',
      paddingRight:30,
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', paddingRight:2,
      },     

    },
    pageView: {
      marginLeft:50,
      [theme.breakpoints.down('sm')]: {
        marginLeft:0,
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

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#072455',
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
  multiUpload: {
    borderRadius: 4,
    marginTop: 3,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #072455',
    color: '#072455',
    fontSize: 12,
    width: 310,
    [theme.breakpoints.down('sm')]: {
      padding: '15px 10px',
      width: '100%',
      
    },   
    padding: '15px 15px',
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

export default function ComplaintsDashboard(props) {
  console.log("current PPPProps", props)
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
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

const defaultDetails = {name: "null", last_name:"null"}
var state = JSON.parse(localStorage.getItem('reduxStore'));

  const Detail = isEmpty(state) ? defaultDetails : state.userDetail
  const allImageNames = []

  function fileSender(singleImage){
    changePreloader(true)
    let accessToken = Detail.access_token
    let authHeader = 'Bearer ' + accessToken
    const formPicture = new FormData();
    formPicture.append("file", singleImage)
    const reportsUrl = BASEURL+'/reports/media';
    
    sendHttpRequestWithFormData('POST', reportsUrl, formPicture, authHeader).then(responseData=>{
      console.log("cert aloone", responseData.name)
      if(responseData.name != undefined){
        allImageNames.push(responseData.name)
        changePreloader(false)
        notify("Upload Successful")
        
      }
    
    })
    changeAllFiles(allImageNames)
  }

  
  function showLoader(width, height){
    if(showPreloader){
    return (
      
        <Loader
        type="Rings"
        color="#072455"
        visible={true}
        height={width}
        width={height}
        />
      )
    }
    else{
      return null
    }
}


function handleClick(e){
  fileUploader.current.click();   
}

function handleClick2(e){
  fileUploader2.current.click();   
}

function handleClick3(e){
  fileUploader3.current.click();   
}

function fileChangedHandler(event, maximumFileSize){
  if(event.target.files.length>0){
    let file_size = event.target.files[0].size===undefined?null:event.target.files[0].size;
      //or if you like to have name and type
      let file_type = event.target.files[0].type;
    let validFileExtensions = ["image/jpeg", "image/jpg", "image/png"]
    var n = validFileExtensions.includes(file_type);
    //file type validation
    if(n===false || file_size>=maximumFileSize){
      changeEnabled(true)
    }
    else if(n===true && file_size<=maximumFileSize){
      fileSender(event.target.files[0], event.target.name)
      changeEnabled(false)
    }
  }
  
} 
  
const onSubmit = data => {
  const postUrl = BASEURL+'/complaints';
  let accessToken = Detail.access_token
  let user_id = Detail.user.id
  console.log("this is the access token", accessToken)
  console.log("this is the user_id", )
  console.log("my datas", data)
/*
your_first_name:  The your first name field is required.
index.js:391 your_last_name:  The your last name field is required.
index.js:391 your_phone_number:  The your phone number field is required.
index.js:391 your_email:  The your email field is required.
index.js:391 role:  The role field is required.
index.js:391 id_number:  The id number field is required.
index.js:391 complaint:  The complaint field is required.
*/ 
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
  
  let authHeader = 'Bearer ' + accessToken
  console.log("this is the auth headers",authHeader)
 

  sendHttpRequestWithFormData('POST', postUrl, formData, authHeader).then(responseData => {
    changePreloader(true)
    
    console.log("datassssssii for making complaints", responseData);  
    const allErrors = []
      if(responseData.error){
        console.log(responseData.error)
        changePreloader(false)
        notify("Error in Form Submission")    
        for (const key in responseData.error) {
          if (responseData.error.hasOwnProperty(key)) {
            const element = responseData.error[key];
              console.log(key+": ", element[0]);
              allErrors.push(element[0])
          }
        }
        changeErrors(allErrors)
        changePreloader(false)
      }
      else if(responseData.error ===false && responseData.data!= null || responseData.data != undefined || responseData.data!= []){
        changePreloader(false)
        notify("Complaints Submitted Successfully")   
        history.push("/dashboard");
      }
    })
      
}
const notify = (message) => toast(message);
const classes = useStyles();

  return (
    <>
    <ToastContainer className='toast-container'/>
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage2 
 header1="General Information"
 header2="Make Complaints"
 loader = {showLoader(100,100)}
 sideImage={report}
 page1={
   <div className={classes.pageView}>

  <FormControl className={classes.margin}>
  <span style={{fontSize: '10px'}}>First Name*</span>
        <BootstrapInput inputRef={register} name="first_name" placeholder="firstname" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Last Name*</span>
        <BootstrapInput inputRef={register} name="last_name" placeholder="lastname" id="bootstrap-input" />
</FormControl>



<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Phone Number*</span>
        <BootstrapInput inputRef={register} name="phone_number" placeholder="phone number" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Email Address*</span>
        <BootstrapInput inputRef={register} name="email" type="email" placeholder="Mobile Number" id="bootstrap-input" />
</FormControl>

<Grid>
</Grid>
</div>
 }
 
 page2={
  <div className={classes.pageView}>

    
<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Role</span>
        <BootstrapInput inputRef={register} name="role" placeholder="123" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin2}>
<span style={{fontSize: '10px'}}>ID Number</span>
        <BootstrapInput autocomplete="fal" inputRef={register} name="id_number" placeholder="Identification Number" id="bootstrap-input" />
        
</FormControl>

<FormControl className={classes.margin2}>
<span style={{fontSize: '10px'}}>Complaints</span>
        <BootstrapInput autocomplete="fal" inputRef={register} name="complaint" placeholder="Complaints" id="bootstrap-input" />
        
</FormControl>
<Grid item xs={12} sm={12} md={4}>
<FormControl className={classes.margin22}>
      <input type="file" id="file" name="img" onChange={(e)=>fileChangedHandler(e,5000000000)} multiple style={{display:'none'}} inputRef={register} ref={fileUploader}/>
      <span style={{fontSize:10}}>Upload Supporting Image(s)</span>
      <div className="input-container__dash">
          <input className="input-field__dashs" required type="text" value={allFiles[0]} />
          <img src={professional} className="icon__dashs" onClick={handleClick}/>
      </div>
</FormControl>
</Grid>
{/* 
<Grid item xs={10} sm={10} md={10}>
    <FormControl className={classes.margin}>
    <span style={{fontSize: '10px', width:'100%'}}>Upload Supporting Images</span>
    <input type="file" name="img" onChange={(e)=>fileChangedHandler(e,5000000000)} multiple inputRef={register} className={classes.multiUpload} />
    </FormControl>
</Grid> */}
<ul>
  {myErrors.length>0 &&
  <p>Form not submitted because of the following error(s):</p>
}
{myErrors.map((text, index)=>(
<li style={{color:'red', fontSize:10}}>{text}</li>
))}
</ul>
<Grid item xs={10} sm={12} md={12} className={classes.buttonCont}>
      <Button
      type="submit"
      disabled={showPreloader}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >Submit</Button>
<p style={{color: 'red', fontSize: 11, textAlign: 'center'}}>{props.bottomText}</p>
</Grid>

  </div>
}

 
 />
 </form>
 </>
    );
}
