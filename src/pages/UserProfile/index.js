import React,{useState, useEffect, useRef} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import {BASEURL, sendHttpRequestWithFormDataWithObjectGet, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
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
import report from './assets/userdp.svg';
import Loader from 'react-loader-spinner';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import useForm from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
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
import professional from './assets/upload-to-cloudldpi.svg';


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
          width: '95%', float: 'none',
        },     
  
      },

    margin: {
      width: '33%',
      paddingRight:30,
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', paddingRight:0, paddingLeft:0
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
margin22: {
width:'33%',
},
submit: {
  margin: theme.spacing(3, 0, 2),
  backgroundColor:'#072455',
  width: '70%',
  color:'white',
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

export default function UserProfile(props) {
  const fileUploader = useRef(null);
  let history = useHistory();
  const { register, handleSubmit } = useForm()
  const [btnColor, changebtnColor] = useState('#072455');
  const [btnColorOutline, changebtnColorOutline] = useState('transparent');
  const [token2, changeToken] = useState("")
  const [name, changeName] = useState("");
  const [Loadme, setLoader] = useState(true);
  const [showPreloader, changePreloader] = useState(false)  
  const [last_name, changeLastName] = useState("");
  const [email, changeEmail] = useState("");
  const [enabled, changeEnabled] = useState("");
  const [mobile_number, changeNumber] = useState("");
  const [gender, changeGender] = useState("")
  const [id, changeID] = useState("")
  const [role_id, changeRoleID] = useState("")
  const [user_type, changeUserType] = useState("")
  const [picture, changePicture] = useState("picture.jpg");
  const dispatch = useDispatch()
const url = BASEURL+`/user`
useEffect(() => {   
///storage/509/5e3816b90bb7e_cartooncenter.png
    const userToken2 = localStorage.getItem('token');
    changeToken(userToken2)
    console.log("this is theuser token", userToken2)
    sendHttpRequestWithFormDataWithObjectGet('GET', url, userToken2).then(responseData=>{      
        console.log("this is the newsData", responseData)  
        console.log("this is the newsData for the roles", responseData.roles[0].id) 
        setLoader(false)
        changeName(responseData.name)
        changeLastName(responseData.last_name)
        changeEmail(responseData.email)
        changeNumber(responseData.mobile_number)
        changeGender(responseData.gender)
        changeID(responseData.id)
        changeUserType(responseData.user_type)
        changeRoleID(responseData.roles[0].id)
       
    })
    
}, []);
        


//
function handleName(e){
    changeName(e.target.value)
    console.log(name)
} 

function handleLastName(e){
    changeLastName(e.target.value)
    console.log(last_name)
}

function handleEmail(e){
    changeEmail(e.target.value)
}

function handleMobile(e){
    changeNumber(e.target.value)
}

function handleGender(e){
    changeGender(e.target.value)
}

function handleClick(e){
  fileUploader.current.click();   
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

/*
const formDataUpdate = {
      "email": "admin@admin.com",
      "password": "password",
      "last_name": "Theo",
      "name": "Admin",
      "roles": [1],
      "gender": "male",
      "mobile_number":"08094638273"
     }
*/
function fileSender(pix, fieldName){
  let accessToken = token2
  let authHeader = 'Bearer ' + accessToken
  changePreloader(true)
  const formPicture = new FormData();
  formPicture.append("file", pix)
  const professionalUrl = BASEURL+'/users/media';

  
  if(fieldName==="picture")
  sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData=>{
    console.log("picture aloone", responseData)
    if(responseData.name != undefined){
      changePicture(responseData.name)
      changePreloader(false)
      notify("Upload Successful")
      console.log("success")
    }
  
  })
  
}
const notify = (message) => toast(message);
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
    console.log("this is the user uupdate datas",data, role_id)
  
    // const normalData = 
    //   {
    //     "name": data.name,
    //     "last_name":  data.last_name,
    //     "email": email,
    //     "mobile_number": data.mobile_number,
    //     "gender":data.gender,
    //     "roles":[role_id]
 
    //   }

    const normalData = {
      "email": email,
      "last_name": data.last_name,
      "name": data.name,
      "roles": [role_id],
      "gender": data.gender,
      "mobile_number":data.mobile_number,
      "picture": picture
     }
    
    let link = BASEURL+'/users/'+id
    
    console.log(token2)
    const headers = { 
      'Content-Type': 'application/json',
      // 'enctype' : 'multipart/form-data',
      'Authorization' : token2
    }
    axios({
      method : "PUT",
      url    : link,
      data   : normalData,
      headers: headers,
    }).then(response => {
      console.log("this is the response update", response)
      if(response.hasOwnProperty("data")){
        history.push("/upload_success")
      }
    }).catch(error => {
      console.log("this is the error",error)
    });
}

  const classes = useStyles();
  return (
    <>
   <MyLoader loadme={Loadme}/> 
 <StepperFormPageOneDashboard 
 header1="Update User profile"
 topText = "User Profile"
 number={1}
 message = "Update User Profile"
 sideImage={report}
 currentPage="User Profile"
 loader = {showLoader(100,100)}
 bottomText=""
 page1={
    <form onSubmit={handleSubmit(onSubmit)}>
   <div>
   <ToastContainer className='toast-container'/>   
<FormControl className={classes.margin}>      
        <span style={{fontSize: '10px'}}>Firstname*</span>
        <BootstrapInput inputRef={register} name="name"  onChange={handleName} value={name} placeholder="firstname" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Lastname*</span>
        <BootstrapInput inputRef={register} name="last_name" onChange={handleLastName} value={last_name} placeholder="lastname" id="bootstrap-input" />
</FormControl>


        <BootstrapInput inputRef={register} name="email" onChange={handleEmail} value={email} placeholder="Email" id="bootstrap-input" type="hidden"/>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Gender*</span>
<div class="custom-select" style={{width:'100%'}}>
  <select name="gender" value={gender} onChange={handleGender} ref={register} style={{width:'100%', marginTop:3}}>
    <option value="male">Male</option>
    <option value="female">Female</option>
    
  </select>
</div>
</FormControl>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Mobile Number</span>
        <BootstrapInput inputRef={register} name="mobile_number" onChange={handleMobile} value={mobile_number} id="bootstrap-input" />
</FormControl>



<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Update User type</span>
<div class="custom-select" style={{width:'100%'}}>
  <select name="user_type" value={user_type} onChange={e => changeUserType(e.target.value)} ref={register} style={{width:'100%', marginTop:3}}>
    <option value="landlord">Landlord</option>
    <option value="tenant">Tenant</option>
    <option value="professional">Professional</option>
    <option value="developer">Developer</option>
    <option value="property_agent">Property Agent</option>
    {/*    formDataUser.append('user_type', "property_agent") */}
  </select>
</div>
</FormControl>
<FormControl className={classes.margin22}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<span style={{fontSize:10}}>Upload/Update Picture</span>
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={picture} />
    <img src={professional} className="icon__dash" onClick={handleClick}/>
</div>

</FormControl>

<Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={enabled}
      className={classes.submit}
    >Submit</Button>

   </div>
   </form>
 }
 


 
 />
 </>
    );
}
