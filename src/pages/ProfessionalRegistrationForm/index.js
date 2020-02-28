import React,{useState, useRef} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import {sendHttpRequest, BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Select from '@material-ui/core/Select';
import Loader from 'react-loader-spinner';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useForm from 'react-hook-form'
import professional from './assets/upload-to-cloudldpi.svg';
import prof from './assets/professional/clicked.svg'
import PreviousButton from '../../components/PreviousButton';

import StepperFormPage1 from '../StepperFormPage1';
import {BootstrapInput, Label, ControlSpaced as FormControl, ControlSpacedEdge as FormControlEdge, SelectContainer} from '../../components/BootstrapInput/BootstrapInput'
import './styles.css'


import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';




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
          width: '100%', float: 'none',
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
    marginEdge: {
      width: '31%',
      paddingRight:30,
      paddingBottom:10,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',  paddingRight:0,
      },     

    },
    margin3: {
      width: '33%',
      paddingRight:30,
      paddingBottom:10,
      marginTop: 13,
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
    selectItem: {
      marginTop:4, width:'97%',
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
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
        width: '97%', float: 'none',
      },  
    },
    formContainer: {
      position: 'fixed',
      cursor: 'pointer',
      minHeight:210,
      border: '1px solid gray',
      left: '17%',
      top: '100px',
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
    width:'98%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 2,
      marginRight:2,
      width: '100%'
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
  

export default function ProfessionalRegistration(props) {
  console.log("current PPPProps", props)
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
  const { register, handleSubmit } = useForm()
  const [myErrors, changeErrors] = useState([])
  const [bottomText, changebottomText] = useState("")
  const [password, changePassword] = useState("")
  const [confirmPassword, changeConfirmPassword] = useState("")
  const [showPreloader, changePreloader] = useState(false)
  const [btnColor, changebtnColor] = useState('#072455');
  const [mobile, setMobile] = useState("")
  const [enabled, changeEnabled] = useState(false)
  const [btnColorOutline, changebtnColorOutline] = useState('transparent');
  const [certificate_of_incorporation, changeCert] = useState()
  const [picture, changePicture] = useState();
  const [identification_document, changeIDocument] = useState()
  function toggleView(currentState){
      
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


  function fileSender(pix, fieldName){
    changePreloader(true)
    const formPicture = new FormData();
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/professionals/media';

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

  const classes = useStyles();
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
    else if(certificate_of_incorporation ==undefined){
      changebottomText("Please Upload certificate of Incorportation")
    }
    else if(identification_document ==undefined){
      changebottomText("Please Upload identification document")
    }
    else if(picture ==undefined){
      changebottomText("Please Upload A valid photograph of yourself")
    }
    else if(mobile.length<=1){
      changebottomText("Please enter a valid phone number of nothing less than 11 digits")
    }
    else if(mobile.length>=11 && password === confirmPassword){
      changePreloader(true)
    const registerUrl = BASEURL+'/eregister';
    const professionalUrl = BASEURL+'/professionals'
    // console.log("this is the access token", accessToken)
     
    // const formData = new FormData();
    const formDataUser = new FormData();
    const formDataProfessional = new FormData();
    const currentLocation = props.location.pathname.split("/")[1]

    formDataUser.append('name', data.name)
    formDataUser.append('last_name', data.last_name)
    formDataUser.append('email', data.email)
    formDataUser.append('password', data.password)
    formDataUser.append('gender', data.gender)
    formDataUser.append('mobile_number', data.mobile_number)
    formDataUser.append('lga', data.lga)
    formDataUser.append('user_type', "professional")


formDataProfessional.append('business_registration_number', data.business_registration_number)
formDataProfessional.append('certificate_of_incorporation', certificate_of_incorporation)
formDataProfessional.append('company_name', data.company_name)
formDataProfessional.append('profession_type', data.profession_type)
formDataProfessional.append('company_address', data.company_address)
formDataProfessional.append('mode_of_identification', data.mode_of_identification)
formDataProfessional.append('identification_document', identification_document)
formDataProfessional.append('picture', picture)
formDataProfessional.append('identification_number', data.identification_number)
console.log("my datas from data", data)  
formDataProfessional.forEach((value, key) => {
  console.log("my datas from formData","key %s: value %s", key, value);
})

    sendHttpRequestWithFormDataWithoutHeaders('POST', registerUrl, formDataUser).then(responseData=>{            
      // console.log(responseData)
      // const user_id = responseData.data.id
      // formDataProfessional.append('user_id', user_id);
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
      //child
      // sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formDataProfessional).then(responseData=>{

      //   console.log("datassssssii ", responseData)
      //   changePreloader(false)
      //   history.push('/regsuccess')
      // })

      else if(responseData.data!= null || responseData.data != undefined || responseData.data!= []){
        const user_id = responseData.data.id
        formDataProfessional.append('user_id', user_id);
        sendHttpRequestWithFormDataWithoutHeaders('POST', professionalUrl, formDataProfessional).then(responseData=>{            
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
    //end of child
    })
  }
  
  }
  const notify = (message) => toast(message);

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

  /*
1. Has been addressed on backend
2. I made other fields not required except business type
3. I've added a filed to form, professional_type
4. It's to update user_type and pictures
5. I've added a landlord_lasretrad_id to users table... 
The option to fill in landlords Id will only be shown of the user is a tenant
*/

  return (
    <>
     <ToastContainer className='toast-container'/>
 <StepperFormPage1 
 currentPage="Professional"
 number={1}
 height="tall"
 header1="General Information"
 bottomText="All Optional Fields are to be completed within 60 days"
 loader = {showLoader(100,100)}
 sideImage={prof}

 page1={
   <div>
     
     <ToastContainer className='toast-container'/>
<form onSubmit={handleSubmit(onSubmit)}>




<FormControl className={classes.margin}>
<Label label="Firstname*"/>
        <BootstrapInput required inputRef={register} name="name" placeholder="theoderic" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<Label label="Lastname*"/>
        <BootstrapInput required inputRef={register} name="last_name" placeholder="onipe" id="bootstrap-input" />
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


<FormControl className={classes.margin}>
<Label label="Select Profession*"/>
<SelectContainer>
<select name="profession_type" ref={register} required className={classes.selectItem}>
    <option value="lawyer">Lawyer</option>
    <option value="surveyor">Surveyor</option>
    <option value="accountant">Accountant</option>
    <option value="engineer">Engineer</option>
    <option value="laborer">Laborer</option>
    <option value="marketer">Marketer</option>
    <option value="trader">Trader</option>
    <option value="it_professional">IT Professional</option>
    
  </select>
  </SelectContainer>
</FormControl>
<FormControl className={classes.margin}>
<Label label="Email*"/>
        <BootstrapInput required inputRef={register} type="email" name="email" placeholder="Email" id="bootstrap-input" />
</FormControl>

<FormControlEdge>
<Label label="Mobile Number*"/>
        <BootstrapInput required type="number"  value={mobile} onChange={e => setMobile(e.target.value)}  inputRef={register} name="mobile_number" placeholder="Mobile Number" id="bootstrap-input" />
</FormControlEdge>

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




<FormControl className={classes.margin}>
<Label label="Business Registration Number*"/>
        <BootstrapInput required inputRef={register} name="business_registration_number" placeholder="Business Registration Number" id="bootstrap-input" />
</FormControl>



<FormControl className={classes.margin}>
<Label label="Companey Name*"/>
        <BootstrapInput required inputRef={register} name="company_name" placeholder="Company name" id="bootstrap-input" />
</FormControl>




<FormControlEdge>
<Label label="Company Address*"/>
        <BootstrapInput required inputRef={register} name="company_address" placeholder="Company Address" id="bootstrap-input" />
</FormControlEdge>


<FormControl className={classes.margin3} style={{marginTop:9}}>
<input type="file" id="file" name="certificate_of_incorporation" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader3}/>
<Label label="Upload Professional membership certificate*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={certificate_of_incorporation} />
    <img src={professional} className="icon" onClick={handleClick3}/>
</div>
<div><span style={{fontSize:10}}>Ensure that the file is not more than 3mb</span></div>

</FormControl>


<FormControl className={classes.margin}>
  <Label label="Mode of Identification*"/>
<SelectContainer>
  <select name="mode_of_identification" ref={register} className={classes.selectItem}>
    <option value="drivers_licence">Driver's Licence</option>
    <option value="national_id_card">National ID Card</option>
    <option value="voters_card">Voters Card</option>
    <option value="international_id_card">International Passport</option>
    
  </select>
  <div><span style={{fontSize:11}}>Valid proof of Identification</span></div>
  </SelectContainer>

</FormControl>


<FormControlEdge className={classes.margin} style={{marginTop:9}}>
<input type="file" id="file" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader2}/>
<Label label="Upload Identification Document*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={identification_document} />
    <img src={professional} className="icon" onClick={handleClick2}/>
</div>
<div><span style={{fontSize:10}}>Ensure that the file is not more than 3mb</span></div>

</FormControlEdge>
{/* <FormControl className={classes.margin3}>
<span style={{fontSize:12}}> Upload Photo of Yourself</span>
<div className="input-container">

    <input className="input-field" required onChange={(e)=>fileChangedHandler(e,5000000000)} maximumFileSize={5000} type="file" name="picture" placeholder="photo.jpg"/>
    <img src={professional} className="icon"/>
</div>
<div><span style={{fontSize:10}}>Please Take Your sunglasses or hat off, and make sure your face is fully visible, Photo within the last 6 month</span></div>
</FormControl> */}
{/* starting */}
<FormControl className={classes.margin} style={{marginTop:9}}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>

<Label label="Upload Photo of Yourself*"/>
<div className="input-container">
    <input className="input-field" required type="text" value={picture} />
    <img src={professional} className="icon" onClick={handleClick}/>
</div>
<div><span style={{fontSize:10}}>Please Take Your sunglasses or hat off, and make sure your face is fully visible, Photo within the last 6 month</span></div>

</FormControl>





<FormControl className={classes.margin}>
      
<Label label="LASSRA Identification Number (Optional)"/>
        <BootstrapInput inputRef={register} name="identification_number" placeholder="1020202020" id="bootstrap-input" />
</FormControl>

<FormControlEdge>
<Label label="Password*"/>
<BootstrapInput required inputRef={register}  onChange={e => changePassword(e.target.value)} placeholder="password" name="password" id="bootstrap-input" type="password" />
</FormControlEdge>


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
      disabled={showPreloader}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >Submit</Button>
<div><p style={{color: 'red', fontSize: 10, textAlign: 'center',}}>All Optional Fields are to be completed within 60 days</p></div>



</Grid>
</form>
   </div>
 }
 


 
 />
 </>
    );
}
