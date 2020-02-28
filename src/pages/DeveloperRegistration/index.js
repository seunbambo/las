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
import { useHistory } from "react-router-dom";
import {sendHttpRequest, BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
// import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Validator from 'validator';
import StepperFormPage3 from '../StepperFormPage3';
import Loader from 'react-loader-spinner';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import developer from './assets/developer/clicked.svg'
import professional from './assets/upload.svg';
import {BootstrapInput, Label, ControlSpaced as FormControl, SelectContainer, ControlSpacedBig as FormControlBig} from '../../components/BootstrapInput/BootstrapInput'

import useForm from 'react-hook-form'

import StepperFormPage2 from '../StepperFormPage2';

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
          width: '100%', float: 'none',  paddingRight:0,
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
  paddingTop: 24,
  fontSize: 14
},
formPageText: {
    fontSize: 11,
    textAlign: 'left'
},
formPageText2: {
  fontSize: 10,
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
    width:'96%'
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  selectItem: {
    marginTop:4, width:'100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%', float: 'none',
    },   
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
  

export default function DeveloperRegistration(props) {
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const { register, handleSubmit, errors } = useForm()
  let history = useHistory();
  const [enabled, changeEnabled] = useState(false)
  const [mobile, setMobile] = useState("")
  const [file2_name, setFileName2] = useState("Upload file")
  const [Business, setBusiness] = useState("none")
  const [myErrors, changeErrors] = useState([])
  const [bottomText, changebottomText] = useState("")
  const [password, changePassword] = useState("")
  const [confirmPassword, changeConfirmPassword] = useState("")
  const [individualColor, changeIndividualColor] = useState('#072455')
  const [corporateColor, changeCorporateColor] = useState("transparent")
  const [individualFontColor, changeIndividualFontColor] = useState("white")
  const [corporateFontColor, changeCorporateFontColor] = useState('#072455')
  const [developer_type, changeType] = useState("individual_developer")
  const [certificate_of_incorporation, changeCert] = useState("")
  const [picture, changePicture] = useState("photo.jpg");
  const [identification_document, changeIDocument] = useState("identification.jpg")
  const [showPreloader, changePreloader] = useState(false)
   
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


  function toggleView(currentType){
    changeType(currentType)
    console.log(currentType)
    if(currentType=="individual_developer"){
      setBusiness('inline-flex')
      changeIndividualColor("#072455")
      changeCorporateColor('transparent')
      changeIndividualFontColor('white')
      changeCorporateFontColor("#072455")
    }
    else if(currentType=="cooporate_developer"){
      changeCorporateColor("#072455")
      setBusiness('inline-flex')
      changeIndividualColor("transparent")
      changeIndividualFontColor("#072455")
      changeCorporateFontColor('white')

    }
    
  }

  function fileSender(pix, fieldName){
    const formPicture = new FormData();
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/professionals/media';
    changePreloader(true)
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

  function fileChangedHandler2(event, maximumFileSize){
    let file_size = event.target.files[0].size;
      //or if you like to have name and type
      let file_name = event.target.files[0].name;
      let file_type = event.target.files[0].type;
      setFileName2(file_name)
    console.log(file_name, file_size)
   

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
  
    else if(mobile.length>=11 && password === confirmPassword){
    const registerUrl = BASEURL+'/eregister';
    const developerUrl = BASEURL+'/developers'
    // console.log("this is the access token", accessToken)
     console.log("my datas", data)  
    // const formData = new FormData();
    const formDataUser = new FormData();
    const formDataDeveloper = new FormData();
    const currentLocation = props.match.url.split("/")[2]

    formDataUser.append('name', data.name)
    formDataUser.append('last_name', data.last_name)
    formDataUser.append('email', data.email)
    formDataUser.append('password', data.password)
    formDataUser.append('gender', data.gender)
    formDataUser.append('mobile_number', data.mobile_number)
    formDataUser.append('lga', data.lga)
    formDataUser.append('user_type', "developer")

    formDataDeveloper.append('business_registration_number', data.business_registration_number)
    formDataDeveloper.append('developer_type', developer_type)
    formDataDeveloper.append('house_address', data.house_address)
    formDataDeveloper.append('identification_document', identification_document)
    formDataDeveloper.append('picture', picture)
    formDataDeveloper.append('lga', data.lga)
    formDataDeveloper.append('mode_of_identification', data.mode_of_identification)
  
    sendHttpRequestWithFormDataWithoutHeaders('POST', registerUrl, formDataUser).then(responseData=>{            
      console.log(responseData)
      // const user_id = responseData.data.id
      // formDataDeveloper.append('user_id', user_id);
      
      console.log("datassssssii from creating lease", responseData);      
      const allErrors = []
        if(responseData.error){
          console.log(responseData.error)
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
        else if(responseData.data!= null || responseData.data != undefined || responseData.data!= []){
          const user_id = responseData.data.id
          formDataDeveloper.append('user_id', user_id);
          sendHttpRequestWithFormDataWithoutHeaders('POST', developerUrl, formDataDeveloper).then(responseData=>{            
            console.log(responseData)
            if(responseData.data){
              changePreloader(false)
            history.push('/regsuccess');
            }
            else if(responseData.error){
              changePreloader(false)
              history.push('/registration/developer')
            }
            
          })
      }
    })

    }
    
  
  }


  const classes = useStyles();


  const notify = (message) => toast(message);
  return (
    <>
     <ToastContainer className='toast-container'/>
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage2 
 
 currentPage="Developer"
 header1="General Information"
 header2="Work Information"
 number={1}
 number2={2}
 sideImage={developer}
 loader = {showLoader(100,100)}
 page1={
   <div>

<FormControl>
<Label label="Firstname*"/>
        <BootstrapInput inputRef={register} name="name" placeholder="firstname" id="bootstrap-input" />
</FormControl>

<FormControl>
<Label label="Lastname*"/>
        <BootstrapInput inputRef={register} name="last_name" placeholder="lastname" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin}>
<Label label="Gender*"/>
<SelectContainer>
<select name="gender" ref={register} className={classes.selectItem}>
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
        <BootstrapInput type="number" inputRef={register} value={mobile} onChange={e => setMobile(e.target.value)} name="mobile_number" placeholder="Mobile Number" id="bootstrap-input" />
</FormControl>

     <FormControl className={classes.margin}>
       <Label label="LGA*" />
       <SelectContainer>
         <select name="lga" ref={register} className={classes.selectItem}>
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


<FormControl display={Business}>
{/* <div style={{display:Business}}> */}
<Label label="Business Registration Number*"/>
        <BootstrapInput inputRef={register} name="business_registration_number" placeholder="1020202020" id="bootstrap-input" />
        {/* </div> */}
</FormControl>


<Grid>
<Typography className={classes.formContainerText}>Developer Type</Typography>
<Typography className={classes.formPageText}>Please Select if your are either working as a personal developer(not working with an organisation and developing your project yourself) or Company Developer (Working for an organisation)</Typography>
</Grid>

<Grid container spacing={2} className={classes.btnHolder}> 
<Grid item xs={12} sm={6} md={6} >
    <Button variant="contained" color="primary" onClick={()=>toggleView("individual_developer")} style={{width:'96%', color: individualFontColor,  backgroundColor: individualColor}} className={classes.normalBtn}>
            Individual Developer
    </Button>
</Grid>

<Grid item xs={12} sm={6} md={6}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("cooporate_developer")} style={{width:'96%', color: corporateFontColor, backgroundColor: corporateColor}} className={classes.outlinedBtn}>
            Corporate Developer
    </Button>
</Grid>
</Grid>
   </div>
 }

 page2={
  <div>

    
<FormControl>
<Label label="LGA*"/>
        <BootstrapInput required inputRef={register} name="lga" placeholder="Ikeja" id="bootstrap-input" />
</FormControl>


<FormControlBig className={classes.margin2}>
<Label label="House Address*"/>
        <BootstrapInput required autocomplete="fal" inputRef={register} name="house_address" placeholder="50 Ademola Alakija Street, Victoria Island" id="bootstrap-input" />
      
        <Typography className={classes.formPageText2}>
        Please Ensure that the date of Address entered is verifiable</Typography>
</FormControlBig>


<FormControl style={{marginTop:15}}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<Label label="Upload Photo of Yourself*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={picture} />
    <img src={professional} className="icon" onClick={handleClick}/>
</div>
{/* <div><span style={{fontSize:9}}>Please Take Your sunglasses or hat off, and make sure your face is fully visible, Photo within the last 6 month</span></div> */}
<Typography className={classes.formPageText2}>
Please Take Your sunglasses or hat off, and make sure your face is fully visible, Photo within the last 6 month</Typography>
</FormControl>




<FormControl>
<Label label="Mode of Identification*"/>
<SelectContainer>
  <select name="mode_of_identification" ref={register} className={classes.selectItem}>
    <option value="drivers_licence">Driver's Licence</option>
    <option value="national_id_card">National ID Card</option>
    <option value="voters_card">Voters Card</option>
    <option value="international_id_card">International Passport</option>
    
  </select>
  <div><span style={{fontSize:11}}>Valid means of Identification</span></div>
  </SelectContainer>

</FormControl>

<FormControl style={{marginTop:15}}>
<input type="file" id="fil2" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} ref={fileUploader2}/>
<Label label="Upload Identification Document*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={identification_document} />
    <img src={professional} className="icon" onClick={handleClick2}/>
</div>

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
<Grid item xs={10} sm={12} md={12} className={classes.buttonCont}>
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
</>
    );
}
