import React,{useState, useEffect} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import {BASEURL, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { amber, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Select from '@material-ui/core/Select';
import useForm from 'react-hook-form'
import Loader from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepperFormPage3 from '../StepperFormPage3';

import top from './sorry.svg'


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
      width: '100%',
      marginTop: 5,
      [theme.breakpoints.down('sm')]: {
        width: '90%', float: 'none',
      },     

    },
    margin: {
      width: '33%',
      marginTop: 5,
      [theme.breakpoints.down('sm')]: {
        width: '90%', float: 'none',
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
  textAlign: 'center',
  paddingTop: 24
},

outlinedBtn: {
  textAlign: 'left',
  padding: 10
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
  formContainerText: {
    textAlign: 'center',
    paddingTop: 24
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
      width: '80%!important'
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
      marginTop: 5,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #072455',
      color: '#072455',
      fontSize: 12,
      width: '80%',
      [theme.breakpoints.down('sm')]: {
        padding: '15px 4%',
        
      },   
      padding: '12px 15px',
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


  

const BootstrapInput2 = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
      fontSize: 12,
      color: '#072455'
    },
  },
  input: {
    borderRadius: 4,
    marginTop: 5,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #072455',
    color: '#072455',
    fontSize: 12,
    width: '93%',
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


export default function SuccessfulDashboard(props) {
  const { register, handleSubmit } = useForm()
  const classes = useStyles();
  let history = useHistory();
  const [type_of_property, changePropertyType] = useState("")
  const [enabled, changeEnabled] = useState(false)  
  const [showPreloader, changePreloader] = useState(false)
  const [residential, changeResidential] = useState('#E5E7E9')
  const [hotel, changeHotel] = useState('#E5E7E9')
  const [industrial, changeIndustrial] = useState('#E5E7E9')
  const [office, changeOffice] = useState('#E5E7E9')
  const [accessToken, changeAccessToken] = useState("")
  const [certificate_of_occupancy, changeCert] = useState("")
  const [building, changeBuilding] = useState("");
  const [identification_document, changeIDocument] = useState("")
  const [building_approval, changeBuildingApproval] = useState("")
  const [other_documents, changeOtherDocument] = useState("")
  
  const [userId, changeUserId] = useState(0)
  const [name, changeName] = useState("");
  const [lastname, changeLastName] = useState("");
  
    
  
  function toggleView(currentType){
    changePropertyType(currentType)
    console.log(currentType)
    //hotel industrial,
    if(currentType=="residential"){
      changeResidential('#072455')    
      changeHotel('#E5E7E9')
      changeOffice('#E5E7E9')
      changeIndustrial('#E5E7E9')
      
    }
    else if(currentType=="hotel"){
      changeResidential('#E5E7E9')
      changeHotel('#072455')  
      changeIndustrial('#E5E7E9')
      changeOffice('#E5E7E9')
    }
    else if(currentType=="industrial"){
      changeResidential('#E5E7E9')  
      changeHotel('#E5E7E9')
      changeOffice('#E5E7E9')
      changeIndustrial('#072455')
    }
    else if(currentType=="office"){
      changeResidential('#E5E7E9')  
      changeHotel('#E5E7E9')
      changeIndustrial('#E5E7E9')
      changeOffice('#072455')
    }
    
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



  function fileSender(pix, fieldName){
    const formPicture = new FormData();
    let accessToken = Detail.access_token
    let authHeader = 'Bearer ' + accessToken
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/developments/media';
    console.log("file---------filesender---", pix)

    if(fieldName==="building_approval")
    changePreloader(true)
    sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData=>{
      console.log("buildingApproval", responseData)
      changeBuildingApproval(responseData.name)
      if(responseData.name){
        changePreloader(false)
        notify("Upload Successful")
        console.log("success")
      }
      else{
        changePreloader(true)
        console.log("failed")
        notify("Error in File Upload")
      }
    })
    if(fieldName==="other_documents")
    sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData2=>{
      console.log("other documents", responseData2)
      changeOtherDocument(responseData2.name)
      if(responseData2.name){
        changePreloader(false)
     
        console.log("success")
      }
      else{
        changePreloader(true)
        console.log("failed")
        notify("Error in File Upload")
      }
    })
    
    

  }

  function validateMobile(e){
    if(e.target.value<11){
      changeEnabled(true)
    }
    else if(e.target.value>=11){
      changeEnabled(false)
    }
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
// const url = BASEURL+'/news-events/'+props.match.params.id
useEffect(() => {    
    const postUrl = BASEURL+ '/invoices/payment/success'
 var invoiceDetails = JSON.parse(localStorage.getItem('invoiceDetails'))
  var state = JSON.parse(localStorage.getItem('reduxStore'));
  const userToken = "Bearer "+ state.userDetail.access_token;
  changeAccessToken(state.userDetail.access_token)
  console.log("this is the state te",state)  
  console.log("the access token", userToken)
  const formData = new FormData()
  console.log("eeeeeeeeee",state.userDetail.user.email)
  formData.append('invoice_number', props.match.params.id)
  sendHttpRequestWithFormDataWithObject('POST', postUrl, formData, userToken).then(responseData=>{
    console.log("datassssssii", responseData);
  })

}, []);


const logOut = ()=> {
  history.push('/dashboard')
}

const notify = (message) => toast(message);
 
     return (
        <DashboardLayout width='100%' showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="100%">
            <img src={top} className="imgTop" style={{width:'20%'}}/>
            <h1 className="reg__header">{props.match.params.id} Made Successfully</h1>
           <p className="reg__description">Your Request with LASRETRAD is successful.</p>
           <div className="form__column_button">
            <button className="form__button" onClick={logOut}>Proceed to Dashboard</button>
    </div>
        </DashboardLayout>
    )
}


/*
 return (
        <DashboardLayout width='100%' showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="100%">
            <img src={top} className="imgTop"/>
            <h1 className="reg__header">Payment Successful</h1>
           <p className="reg__description">Your Payment with LASRETRAD is successful. You'll recieve your message box details of this transaction.</p>
           <div className="form__column_button">
            <button onClick={handleClick} className="form__button">Proceed To the Dashboard</button>
    </div>
        </DashboardLayout>
    )
*/ 