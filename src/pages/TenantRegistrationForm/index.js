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
import {sendHttpRequest, BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
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
import StepperFormPage3 from '../StepperFormPage3';
import Loader from 'react-loader-spinner';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BootstrapInput, Label, ControlSpaced as FormControl, SelectContainer} from '../../components/BootstrapInput/BootstrapInput'
import tenant from './assets/tenant/clicked.svg'



import useForm from 'react-hook-form'

import StepperFormPage1 from '../StepperFormPage1';

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
          width: '105%', float: 'none', paddingRight:0,
        },     
  
      },

    margin: {
      width: '33%',
      paddingRight:30,
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '105%', float: 'none',  paddingRight:0,
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
        width: '100%', float: 'none',
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
    width: '97%',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
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
  btnHolder: {
      marginTop: 20,
  },
  selectCon: {
    marginTop:4, width:'98%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  lasraCon: {
    width:'100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
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
  



export default function DeveloperRegistration(props) {
  const { register, handleSubmit, errors } = useForm()
  const [bottomText, changebottomText] = useState("")
  let history = useHistory();
  const [enabled, changeEnabled] = useState(false)
  const [myErrors, changeErrors] = useState([])

  const [password, changePassword] = useState("")
  const [confirmPassword, changeConfirmPassword] = useState("")
  const [certificate_of_incorporation, changeCert] = useState("")
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("")
  const [showPreloader, changePreloader] = useState(false)
  const [mobile, setMobile] = useState("")

  
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

  

  function fileSender(pix, fieldName){
    const formPicture = new FormData();
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/professionals/media';

    if(fieldName==="picture")
    sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formPicture).then(responseData=>{
      console.log("picture aloone", responseData)
      changePicture(responseData.name)
    })
    if(fieldName==="identification_document")
    sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formPicture).then(responseData=>{
      console.log("identification document", responseData)
      changeIDocument(responseData.name)
    })
    
  }


  const onSubmit = data => {
    if(mobile.length<11) {
      changebottomText("Please Enter a Valid Phone Number of atleast 11 digits")
      notify("Please Enter a Valid Phone Number of of atleast than 11 digits")
    }
    else if(password !== confirmPassword){
      changebottomText("Your password and the confirm password does not correspond")
      notify("Your password and the confirm password does not correspond")
    }
    else if(mobile.length>=11){
      changePreloader(true)
    const registerUrl = BASEURL+'/eregister';
    const tenantUrl = BASEURL+'/tenants';
    // console.log("this is the access token", accessToken)
     console.log("my datas", data)  
    // const formData = new FormData();
    const formDataUser = new FormData();
    const formTenant = new FormData();
    const currentLocation = props.match.url.split("/")[2]

    formDataUser.append('name', data.name)
    formDataUser.append('last_name', data.last_name)
    formDataUser.append('email', data.email)
    formDataUser.append('password', data.password)
    formDataUser.append('gender', data.gender)
    formDataUser.append('mobile_number', data.mobile_number)
    formDataUser.append('lga', data.lga)
    formDataUser.append('user_type', currentLocation)

    sendHttpRequestWithFormDataWithoutHeaders('POST', registerUrl, formDataUser).then(responseData=>{            
      console.log("Tenant datasssssssssssss",responseData)
      formTenant.append('user_id', responseData.data.id);

      sendHttpRequestWithFormDataWithoutHeaders('POST', tenantUrl, formTenant).then(responseData=>{            
        console.log(responseData)
        changePreloader(false)
        history.push('/regsuccess');
      })

    })
 
  }

  }

  const notify = (message) => toast(message);
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage1 
 currentPage="Tenant"
 number="1"
 header1="General Information"
 bottomText="All Optional Fields are to be completed within 60 days"
 loader = {showLoader(100,100)}
 sideImage={tenant}
 page1={

   <div>
     <ToastContainer className='toast-container'/>

<FormControl>
<Label label="Firstname*"/>
        <BootstrapInput required inputRef={register} name="name" placeholder="theoderic" id="bootstrap-input" />
</FormControl>

<FormControl>
<Label label="Lastname*"/>
        <BootstrapInput required inputRef={register} name="last_name" placeholder="onipe" id="bootstrap-input" />
</FormControl>


<FormControl>
<Label label="Gender*"/>
<SelectContainer>
<select name="gender" ref={register} className={classes.selectCon}>
    <option value="male">Male</option>
    <option value="female">Female</option>
    
  </select>
  </SelectContainer>
</FormControl>


<FormControl>
<Label label="Email*"/>
        <BootstrapInput required inputRef={register} type="email" name="email" placeholder="Email" id="bootstrap-input" />
</FormControl>

<FormControl>
<Label label="Mobile Number*"/>
        <BootstrapInput type="number" required inputRef={register} value={mobile} onChange={e => setMobile(e.target.value)} name="mobile_number" placeholder="Mobile Number" id="bootstrap-input" />
</FormControl>

     <FormControl>
       <Label label="LGA*" />
       <SelectContainer>
         <select name="lga" ref={register} className={classes.selectCon}>
           <option value="Agege">Agege</option>
           <option value="Ajeromi Ifelodun">Ajeromi Ifelodun</option>
           <option value="Alimosho">Alimosho</option>
           <option value="Amuwo-Odofin">Amuwo-Odofin</option>
           <option value="Apapa">Apapa</option>
           <option value="Badagry">Badagry</option>
           <option value="Epe">Epe</option>
           <option value="Eti-Osa">Eti-Osa</option>
           <option value="Ibeju-Lekki">Ibeju-Lekki</option>
           <option value="Ifako-Ijaye">Ifako-Ijaye</option>
           <option value="Ikeja">Ikeja</option>
           <option value="Ikorodu">Ikorodu</option>
           <option value="Kosofe">Kosofe</option>
           <option value="Lagos Island">Lagos Island</option>
           <option value="Lagos Mainland">Lagos Mainland</option>
           <option value="Mushin">Mushin</option>
           <option value="Ojo">Ojo</option>
           <option value="Oshodi-Isolo">Oshodi-Isolo</option>
           <option value="Somolu">Somolu</option>
           <option value="Surulere">Surulere</option>
         </select>
       </SelectContainer>

     </FormControl>

<FormControl>
<Label label=" LASSRA Identification Number (Optional)"/>
        <BootstrapInput inputRef={register} name="lassra" placeholder="1020202020" id="bootstrap-input" className={classes.lasraCon} />
</FormControl>


<FormControl>
  <Label label="Password*"/>
  <BootstrapInput required inputRef={register}  onChange={e => changePassword(e.target.value)} placeholder="password" name="password" id="bootstrap-input" type="password" />
</FormControl>


<FormControl>
        <Label label="Confirm Password*"/>
        <BootstrapInput inputRef={register} name="confirm_password" onChange={e => changeConfirmPassword(e.target.value)} placeholder="confirm password" id="bootstrap-input" type="password" />
      </FormControl>
<div style={{width:'100%'}}><p style={{textAlign:'center', fontSize:11, color:'red'}}>{bottomText}</p></div>

<ul>
{myErrors.length>0 &&
<p>Form not submitted because of the following error(s):</p>
}
{myErrors.map((text, index)=>(
<li style={{color:'red', fontSize:10}}>{text}</li>
))}
</ul>

<Grid item xs={12} sm={12} md={12} className={classes.buttonCont}>
      <Button
      type="submit"
      fullWidth
      disabled={showPreloader}
      variant="contained"
      color="primary"
      className={classes.submit}
    >Submit</Button>
 <div><p style={{color: 'red', fontSize: 10, textAlign: 'center',}}>All Optional Fields are to be completed within 60 days</p></div>
</Grid>

   </div>
 }
 


 
 />
 </form>
    );
}
