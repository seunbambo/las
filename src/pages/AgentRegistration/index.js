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
import {sendHttpRequest, BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
// import FormControl from '@material-ui/core/FormControl';
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
import agent from './assets/agent/clicked.svg'
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import professional from './assets/upload-to-cloudldpi.svg';
import PreviousButton from '../../components/PreviousButton';

import {BootstrapInput, Label, ControlSpaced as FormControl, SelectContainer, ControlSpacedBig as FormControlBig, ControlSpacedMedium as FormControlMedium} from '../../components/BootstrapInput/BootstrapInput'



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
        width: '67%',
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
        width: '100%', float: 'none',  paddingRight:0,
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
margin3: {
  width: '33%',
  paddingRight:30,
  paddingBottom:10,
  marginTop: 13,
  [theme.breakpoints.down('sm')]: {
    width: '105%', float: 'none',  paddingRight:0,
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

  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
    background: '#072455',
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
  selectCon: {
    marginTop:4, width:'98%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
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
  


export default function AgentRegistration(props) {
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
  const { register, handleSubmit } = useForm();
  const [myErrors, changeErrors] = useState([])
  const [bottomText, changebottomText] = useState("")
  const [password, changePassword] = useState("")
  const [confirmPassword, changeConfirmPassword] = useState("")
  const [enabled, changeEnabled] = useState(false)
  const [mobile, setMobile] = useState("")
  const [btnColorOutline, changebtnColorOutline] = useState('transparent');
  const [certificate_of_incorporation, changeCert] = useState("certificate of incorporation")
  const [picture, changePicture] = useState("photo.jpg");
  const [showPreloader, changePreloader] = useState(false)
  const [identification_document, changeIDocument] = useState("driverslicence.jpg")
  const classes = useStyles();


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


const moveBack = (link) => history.goBack()
  function fileSender(pix, fieldName){
    changePreloader(true)
    const formPicture = new FormData();
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/property-agents/media';

    if(fieldName==="certificate_of_incorporation")
    sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formPicture).then(responseData=>{
      console.log("cert aloone", responseData)
     
      if(responseData.name != undefined){
        changeCert(responseData.name)
        changePreloader(false)
        notify("Upload Successful")
        console.log("success")
      }
    })
    if(fieldName==="picture")
    sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formPicture).then(responseData=>{
      console.log("picture aloone", responseData)
      if(responseData.name != undefined){
        changePicture(responseData.name)
        changePreloader(false)
        notify("Upload Successful")
        console.log("success")
      }
  
    })
    if(fieldName==="identification_document")
    sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formPicture).then(responseData=>{
      console.log("identification document", responseData)
      if(responseData.name != undefined){
        changeIDocument(responseData.name)
        changePreloader(false)
        notify("Upload Successful")
        console.log("success")
      }
    
    })
    

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
  let history = useHistory();
 
  const onSubmit = data => {
    if(mobile.length<11) {
      changebottomText("Please Enter a Valid Phone Number of atleast 11 digits")
      notify("Please Enter a Valid Phone Number of of atleast than 11 digits")
    }
    else if(password !== confirmPassword){
      changebottomText("Your password and the confirm password does not correspond")
      notify("Your password and the confirm password does not correspond")
    }
  
    else if(mobile.length>=11 && password === confirmPassword){
      changePreloader(true)
    const registerUrl = BASEURL+'/eregister';
    const agentUrl = BASEURL+'/property-agents'
    // console.log("this is the access token", accessToken)
     
    // const formData = new FormData();
    const formDataUser = new FormData();
    const formDataAgent = new FormData();
    const currentLocation = props.location.pathname.split("/")[1]

    formDataUser.append('name', data.name)
    formDataUser.append('last_name', data.last_name)
    formDataUser.append('email', data.email)
    formDataUser.append('password', data.password)
    formDataUser.append('gender', data.gender)
    formDataUser.append('mobile_number', data.mobile_number)
    formDataUser.append('lga', data.lga)
    formDataUser.append('user_type', "property_agent")


formDataAgent.append('business_type', data.business_type)
formDataAgent.append('certificate_of_incorporation', certificate_of_incorporation)
formDataAgent.append('company_name', data.company_name)
formDataAgent.append('company_address', data.company_address)
formDataAgent.append('mode_of_identification', data.mode_of_identification)
formDataAgent.append('identification_document', identification_document)
formDataAgent.append('picture', picture)
formDataAgent.append('identification_number', data.identification_number)
console.log("my datas from data", data)  
formDataAgent.forEach((value, key) => {
  console.log("my datas from formData","key %s: value %s", key, value);
})

    sendHttpRequestWithFormDataWithoutHeaders('POST', registerUrl, formDataUser).then(responseData=>{            
      console.log(responseData)
      const user_id = responseData.data.id
      formDataAgent.append('user_id', user_id);
      //child
      sendHttpRequestWithFormDataWithoutHeaders('POST', agentUrl, formDataAgent).then(responseData=>{

        console.log("datassssssii ", responseData)
        if(!responseData.error){
          changePreloader(false)
        history.push('/regsuccess')}
      })
    //end of child
    })
  }

  }
  const notify = (message) => toast(message);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage1 
 currentPage="Property Agent"
 number = '1'
 height="tall"
 header1="General Information"
 bottomText="All Optional Fields are to be completed within 60 days"
 sideImage={agent}
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
        <BootstrapInput required type="number" required inputRef={register} name="mobile_number" value={mobile} onChange={e => setMobile(e.target.value)}  placeholder="Mobile Number" id="bootstrap-input" />
</FormControl>

     <FormControl>
       <Label label="LGA*" />
       <SelectContainer>
           <select name="lga" required ref={register} className={classes.selectCon}>
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

<FormControlMedium>
<Label label="Business Type*"/>
<SelectContainer>
<select name="business_type" required ref={register} className={classes.selectCon}>
    <option value='individual'>Individual Business Name</option>
    <option value="cooperate">Cooperate Business Name</option>

  </select>

</SelectContainer>

     </FormControlMedium>

<FormControlMedium>
<Label label="Company Name*"/>
        <BootstrapInput required inputRef={register} name="company_name" placeholder="company name" id="bootstrap-input" />
</FormControlMedium>

<FormControlBig>
<Label label="Company Address*"/>
        <BootstrapInput required inputRef={register} name="company_address" placeholder="Company Address" id="bootstrap-input" />
</FormControlBig>

<FormControl className={classes.margin3} style={{marginTop:9}}>
<input type="file" id="file" name="certificate_of_incorporation" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader3}/>
<Label label="Upload Certificate of Incorporation*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={certificate_of_incorporation} />
    <img src={professional} className="icon" onClick={handleClick3}/>
</div>
<div><span style={{fontSize:10}}>Ensure that the file is not more than 3mb</span></div>
</FormControl>

<FormControl>
<Label label="Mode of Identification*"/>
<SelectContainer>

        <select name="mode_of_identification" ref={register} className={classes.selectCon}>

    <option value="drivers_licence">Driver's Licence</option>
    <option value="national_id_card">National ID Card</option>
    <option value="voters_card">Voters Card</option>
    <option value="international_id_card">International Passport</option>
    
  </select>
  <div><span style={{fontSize:11}}>Valid proof of Identification</span></div>
</SelectContainer>

</FormControl>

<FormControl style={{marginTop:9}}>
<input type="file" id="file" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader2}/>
<Label label="Upload Identification Document*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={identification_document} />
    <img src={professional} className="icon" onClick={handleClick2}/>
</div>
<div><span style={{fontSize:10}}>Ensure that the file is not more than 3mb</span></div>

</FormControl>

<FormControl style={{marginTop:9}}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<Label label="Upload Photo of Yourself*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={picture} />
    <img src={professional} className="icon" onClick={handleClick}/>
</div>
<div><span style={{fontSize:10}}>Please Take Your sunglasses or hat off, and make sure your face is fully visible, Photo within the last 6 month</span></div>

</FormControl>

<FormControl>
        <Label label=" LASSRA Identification Number (Optional)"/>
        <BootstrapInput inputRef={register} name="identification_number" placeholder="1020202020" id="bootstrap-input" />
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
      variant="contained"
      color="primary"
      disabled={showPreloader}
      className={classes.submit}
    >Register</Button>
      <div><p style={{color: 'red', fontSize: 10, textAlign: 'center',}}>All Optional Fields are to be completed within 60 days</p></div>
</Grid>

   </div>
 }

 />
</form>
    );
}
