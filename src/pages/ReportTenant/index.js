import React,{useState, useEffect, useRef} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import useForm from 'react-hook-form';
import HeaderDescription from '../../components/headerDescription'
import {BASEURL, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import LoadingOverlay from 'react-loading-overlay';
import {useSelector, useDispatch} from 'react-redux';
import StepperFormPageOneDashboard from '../StepperFormPageOneDashboard';
import tenant from './assets/two.svg'
import professional from './assets/upload-to-cloudldpi.svg';

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import { NONAME } from 'dns';


import useStateWithCallback, {useStateWithCallbackInstant} from 'use-state-with-callback';

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    rightSide3: {
      width: '5%',
      top: '50%',
      right:30,
      position: 'absolute',
      
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },  
    },
    marginleft: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '98%', float: 'none'
      },   
    },
    margin: {
      [theme.breakpoints.down('sm')]: {
        width: '98%', float: 'none',
      },     

    },
    formCont: {
        color: '#9cf3c2',
        paddingBottom:10,
    },
    rightSide: {
         margin:'auto',
        [theme.breakpoints.down('sm')]: {
          width: '100%', float: 'none', marginLeft: '4%'
        },     
    },
    btnHolder: {
        marginBottom: 30,
        marginTop: 20
    },
    description: {
        textAlign: 'center'
    },
    header: {
        textAlign: 'center'
    },
    formContainer: {
        minWidth:200, 
        cursor: 'pointer',
        minHeight:210,
        border: '1px solid gray',
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        },   
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
  outlinedBtn: {
      width: '100%',
      color: '#072455',
      border: '1px solid #072455',
      height: 55,
      textTransform: 'capitalize'
  },
  buttonCont: {
    marginTop: 30,
   
    width: '100%'
  },
  normalBtn: {
      width: '100%',
      height:55,
      color: 'white',
      textTransform: 'capitalize'
  },
  RightText: {
    textAlign: 'left'
  },
  leftText: {
      textAlign: 'right',
  },
circularText: {
    borderRadius:"50%",
    height:"26px",
    width:"26px",
    lineHeight:"26px",
    display:"inline-block",
    textAlign:"center",
    marginRight:"6px"
},
  contain: {
    marginLeft: '6%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },   
  },
  btnCategory: {
      width: '100%'
  },
  textField: {
    width:'78%',
    border: '1px solid #072455',
    borderRadius:6,
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#072455',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },
  },
  spanLabel: {
    marginLeft: 10,
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
      width: '98%',
      marginLeft: 0,
      
    },   
    padding: '15px 15px',
  },
 


  }));
  


const BootstrapInput = withStyles(theme => ({
    root: {     
        fontSize: 12,
        color: '#072455'
    },
    input: {
      borderRadius: 2,
      marginTop: 3,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #072455',
      color: '#072455',
      fontSize: 12,
      width: 310,
      [theme.breakpoints.down('sm')]: {
        padding: '15px 10px', width:'100%'
        
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

export default function ReportTenant(props) {
  // form methods
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
  const { handleSubmit, register, errors } = useForm();
  const [mobile, setMobile] = useState("")
  
  const [showPreloader, changePreloader] = useState(false)
  const [bottomText, changebottomText] = useState("")
  const [allFiles, changeAllFiles] = useState([]);
  const [second, changeSecond] = useState(false)
  const [certificate_of_incorporation, changeCert] = useState("")
  const [enabled, changeEnabled] = useState(false)
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("")
  const [bgColor, changeColor] = useState('gray')
  const [page1, changePage] = useState(true)
  const isLoading = useSelector(state=>state.loading)
  const dispatch = useDispatch()
  const [btnColor, changebtnColor] = useState('#072455');
  const [btnColorOutline, changebtnColorOutline] = useState('transparent');
  const [myErrors, changeErrors] = useState([])

  


  const [homeView, changeView] = useStateWithCallbackInstant(true, homeView => {
    if (homeView==false) {
      changebtnColor('transparent')
      changebtnColorOutline('#072455')
    }
    else if(homeView==true){
      changebtnColor('#072455')
      changebtnColorOutline('transparent')
    }
  });
  

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
    const classes = useStyles();
    const currentPage = props.match.params.category_id;
    let history = useHistory();
  
  // function handleSubmit() {
  //   history.push("/dashboard");
  // }
  function nextPage(){
      if(second===false){
        changeSecond(true)
        changeColor('#9cf3c2')
      }
      else{
          history.push('/')
      }
      
  }
  function nextPageCalendar(){
    if(page1===true){
      changePage(false)
    }
    else {
      history.push('/')
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


  
  useEffect(() => {   
    var state = JSON.parse(localStorage.getItem('reduxStore')); 
    const userToken2 = localStorage.getItem('token');
    if(userToken2==null || userToken2=="" || state.userDetail=={}){
      history.push('/login')
    }
  }, []);


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
  if(mobile.length>=11){
    changePreloader(true)
  const postUrl = BASEURL+'/reports';
  let accessToken = Detail.access_token
  let user_id = Detail.user.id
  console.log("this is the access token", accessToken)
  console.log("this is the user_id", )
  console.log("my datas", data)

  const formData = new FormData();
 
  formData.append('user_id', user_id)
  formData.append('first_name', data.first_name)
  formData.append('last_name', data.last_name)
  formData.append('report_type', "tenant")
  // formData.append('supporting_image', JSON.stringify(allFiles))
  for(var i in allFiles){
    formData.append('supporting_image[]', allFiles[i])
  }
  formData.append('first_name_of_reporter', Detail.user.name)
  formData.append('last_name_of_reporter', Detail.user.last_name ? Detail.user.last_name:"Noname")
  formData.append('report', data.report)

  formData.forEach((value, key) => {
    console.log("my datas from formData","key %s: value %s", key, value);
  })
  
  let authHeader = 'Bearer ' + accessToken
  console.log("this is the auth headers",authHeader)
 
  sendHttpRequestWithFormDataWithObject('POST', postUrl, formData, authHeader).then(responseData=>{
    console.log("datassssssii", responseData);
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
    else if(responseData.error ===false || responseData.data!= null || responseData.data != undefined || responseData.data!= []){
      changePreloader(false)
      history.push("/success_page/report");

    }
    
    
  })
      
  }
  else {
    changebottomText("Please Enter a Valid Phone Number of not less than 11 digits")
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
  return (
    <>
    <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading your content...'
        >
    <ToastContainer className='toast-container'/>
    <StepperFormPageOneDashboard 
    currentPage="Report"
    number={1}
    height="tall"
    sideImage = {tenant}
    message = "Report Tenant to LASRETRAD"
    header1="Report Tenant to LASRETRAD"
    topText = "Report Tenant"
    bottomText="All Optional Fields are to be completed within 60 days"
    loader = {showLoader(100,100)}
    page1={
      <div>

<form onSubmit={handleSubmit(onSubmit)}>
<div className={classes.rightSide}>



<Grid container spacing={2} style={{marginTop:20}}>      


<Grid container spacing={2}>   
    <Grid item xs={12} sm={6} md={5}>
    <FormControl className={classes.marginleft}>
    <span style={{fontSize: '10px'}}>First Name*</span>
    <BootstrapInput inputRef={register} name="first_name" placeholder="first name" id="bootstrap-input" />
    </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
    <FormControl className={classes.margin}>
    <span style={{fontSize: '10px'}}>Last Name*</span>
    <BootstrapInput required inputRef={register} name="last_name" placeholder="lastname" id="bootstrap-input" />
    </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={5}>
    <FormControl className={classes.marginleft}>
    <span style={{fontSize: '10px'}}>ID Number(optional)</span>
    <BootstrapInput required inputRef={register} name="id_number" placeholder="id number" id="bootstrap-input" />
    </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
    <FormControl className={classes.margin}>
    <span style={{fontSize: '10px'}}>Mobile Number*</span>
    <BootstrapInput required inputRef={register} value={mobile} onChange={e => setMobile(e.target.value)} name="phone_number" placeholder="Phone number" id="bootstrap-input" />
     
    </FormControl>
    </Grid>
    <Grid item xs={12} sm={12} md={12}>
    <div className={classes.marginleft}>
  
        <TextField
          id="outlined-multiline-static"
          label="Complaint*"
          inputRef={register}
          name="report"
          multiline
          rows="4"
          placeholder="Upload supporting images"
          className={classes.textField}
          variant="outlined"
        />
        </div>
    </Grid>
    {/* <Grid item xs={12} sm={12} md={4}>
    <FormControl className={classes.marginleft}>
    <span style={{fontSize: '10px', marginLeft:15}}>Upload Supporting Image(s)</span>        
    <input type="file" name="img" required onChange={(e)=>fileChangedHandler(e,5000000000)} multiple inputRef={register} className={classes.multiUpload} />
    </FormControl>
    </Grid> */}

<Grid item xs={12} sm={12} md={4}>
<FormControl className={classes.marginleft}>
      <input type="file" id="file" name="img" onChange={(e)=>fileChangedHandler(e,5000000000)} multiple style={{display:'none'}} inputRef={register} ref={fileUploader}/>
      <span style={{fontSize:10}}>Upload Supporting Image(s)</span>
      <div className="input-container__dash">
          <input className="input-field__dash" required type="text" value={allFiles[0]} />
          <img src={professional} className="icon__dash" onClick={handleClick}/>
      </div>
</FormControl>
</Grid>


</Grid>



          </Grid>
    

      </div>
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
      disabled={showPreloader}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >Submit</Button>
<p style={{color: 'red', fontSize: 11, textAlign: 'center', marginTop: 20}}>{bottomText}</p>
</Grid>
      </form>
      </div>

}      
/>
</LoadingOverlay>
</>
  );
}
