import React,{useState, useEffect, useRef} from 'react';
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
import PreviousButton from './previousButton'
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
import tenant from './assets/tenency.svg';
import StepperFormPage3 from '../StepperFormPage3';
import Loader from 'react-loader-spinner';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import home3 from './home3.png'
import professional from './assets/upload-to-cloudldpi.svg';


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
      marginTop: 3,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },     

    },
    margin: {
      width: '33%',
      marginTop: 3,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },     

    },

    margin5: {
      width: '33%',
      marginTop: 3,
      marginLeft: 20,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', marginLeft: 0

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
  padding: 10,
  width:'88%',
  [theme.breakpoints.down('sm')]: {
    width:'100%'
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
    backgroundColor:'#072455',
    width:'97%'
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
  selectStyle: {
    width:'92%', marginTop:'inherit',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%'
    },  
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
        fontSize: 12,
        color: '#072455'
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
        padding: '15px 10px', width: '100%',
        
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

export default function RegisterSalesAndLeases(props) {
  const { register, handleSubmit } = useForm()
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()
  const [type_of_property, changePropertyType] = useState("")
  const [showPreloader, changePreloader] = useState(false)
  const [enabled, changeEnabled] = useState(false)  
  const [description, setDescription] = useState("")
  const [prices, setPrice] = useState("")
  const [addresses, setAddress] = useState("")
  const [formVerified, changeVerified] = useState(false)
  const [corporateColor, changeCorporateColor] = useState("#E5E7E9")
  const [residential, changeResidential] = useState('#E5E7E9')
  const [hotel, changeHotel] = useState('#E5E7E9')
  const [industrial, changeIndustrial] = useState('#E5E7E9')
  const [office, changeOffice] = useState('#E5E7E9')
  const [picture, changePicture] = useState("picture.jpg");
  const [certificate_of_occupancy, changeCert] = useState("certificate")
  const [building_permit, changeBuilding] = useState("building");
  const [identification_document, changeIDocument] = useState("")
  const isLoading = useSelector(state=>state.loading)
  const [userId, changeUserId] = useState(0)
  const [name, changeName] = useState("");
  const [lastname, changeLastName] = useState("");
  const [myErrors, changeErrors] = useState([])


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
    let accessToken = Detail.access_token
    let authHeader = 'Bearer ' + accessToken
    changePreloader(true)
    const formPicture = new FormData();
    formPicture.append("file", pix)
    const professionalUrl = BASEURL+'/tenancies/media';

    if(fieldName==="certificate_of_incorporation")
    sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData=>{
      console.log("cert aloone", responseData)     
      if(responseData.name != undefined){
        changeCert(responseData.name)
        changePreloader(false)
        notify("Upload Successful")
        console.log("success")
      }
    })
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
    if(fieldName==="identification_document")
    sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData=>{
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

  // function fileChangedHandler(event, maximumFileSize){
  //   let file_size = event.target.files[0].size;
  //     //or if you like to have name and type
  //     let file_name = event.target.files[0].name;
  //     let file_type = event.target.files[0].type;
  //   let validFileExtensions = ["image/jpeg", "image/jpg", "image/png"]
  //   var n = validFileExtensions.includes(file_type);
  //   console.log("__________",event.target.name)
  //   //file type validation
  //   if(n===false || file_size>=maximumFileSize){
  //     changeEnabled(true)
  //   }
  //   else if(n===true && file_size<=maximumFileSize){
  //     fileSender(event.target.files[0], event.target.name)
  //     changeEnabled(false)
  //   }
    

  // }

  const onSubmit = data => {
    changePreloader(true)
    const postUrl = BASEURL+'/tenancies';
    let accessToken = Detail.access_token
    let user_id = Detail.user.id
    const company_address = data.address
  
    const formData = new FormData();
    formData.append('type_of_property', type_of_property)
    formData.append('description_of_property', data.description_of_property)   
    formData.append('number_of_units', data.number_of_units) 
    formData.append('property_type', data.property_type)    
    formData.append('bedrooms', data.bedrooms)    
    formData.append('toilets', data.toilets)
    formData.append('other_documents', identification_document)
    formData.append('address', data.address)
    formData.append('building_approval', picture)
    formData.append('price', data.price)
    formData.append('user_id',user_id)

    
    

    formData.forEach((value, key) => {
      console.log("my datas from formData","key %s: value %s", key, value);
    })
    
    let authHeader = 'Bearer ' + accessToken
    console.log("this is the auth headers",authHeader)
   
    sendHttpRequestWithFormData('POST', postUrl, formData, authHeader).then(responseData=>{
      console.log("datassssssii first", responseData);
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
      else if(responseData.data.user_id != null || responseData.data.user_id != undefined || responseData.data.user_id != []){
        console.log(user_id)            
        const formDataInvoice = new FormData();
        const company_address = data.address
          formDataInvoice.append('user_id', user_id )
          formDataInvoice.append('entity_type', "tenancy")
          formDataInvoice.append('entity_id', responseData.data.id)
          formDataInvoice.append('customer_name', `${name} ${lastname}`)
          formDataInvoice.append('customer_address', responseData.data.address)
          formDataInvoice.append('amount_due', responseData.data.charge)
          formDataInvoice.append('item_name', responseData.data.type_of_property)
          formDataInvoice.append('item_description', responseData.data.type_of_property)
          formDataInvoice.append('number_of_item', 1)
          formDataInvoice.append('payment_status', 0)
          formDataInvoice.forEach((value, key) => {
            console.log("my datas from formData to create invoice is created","key %s: value %s", key, value);
          })
          let link = BASEURL+'/invoices'
          sendHttpRequestWithFormData('POST', link, formDataInvoice, authHeader).then(responseData=>{
            console.log("datassssssiiSecond", responseData.data); 
            if(!responseData.error)
            {
              const licencePlan = {"business":type_of_property, "company_address": company_address}   
              console.log("thisis the responnse datas", responseData.data)
              localStorage.setItem('invoiceDetails', JSON.stringify(responseData.data))
              localStorage.setItem('licencePlan', JSON.stringify(licencePlan))
              notify("Invoice for Tenancy created Successfully")   
              changePreloader(true)
              history.push('/invoice')
            }
            else{
              notify("Error occured in creating Tenancy")
            }
            
          })                   
    }
    else {
        notify("Error in Creating Invoice, Try Again")   
        changePreloader(true)
    } 
    })
        
            
        
}
const notify = (message) => toast(message);


useEffect(() => {   
  var state = JSON.parse(localStorage.getItem('reduxStore'));
  const userToken2 = localStorage.getItem('token');
  if(userToken2==null || userToken2=="" || state.userDetail=={}){
    history.push('/login')
  }
  console.log("this is the state te",state)
  
      changeName(state.userDetail.user.name)
      changeLastName(state.userDetail.user.last_name)
      changeUserId(state.userDetail.user.id)


}, []);

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
      <ToastContainer className='toast-container'/>
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage3 
 header1="General Information"
 header2="Property Information"
 header3 = "Upload Necessary Documents"
 message ="Register Tenancy of a Property"
 topText = "Register Tenancy"
 page1Validated = {type_of_property!=="" ? true: false}
 page2Validated = {addresses.length>5 && description.length > 5 && prices!=="" ? true:false }
 sideImage = {tenant}
 loader = {showLoader(100,100)}
 page1={
  
<Grid container spacing={2} className={classes.btnHolder}> 
<Grid item xs={12} sm={12} md={4} >
    <Button variant="outlined" color="primary" onClick={()=>toggleView("residential")} style={{borderColor: residential}} className={classes.outlinedBtn}>
            Residential
    </Button>
</Grid>

<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("office")} style={{borderColor: office}} className={classes.outlinedBtn}>
            Office
    </Button>
</Grid>


<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("hotel")} style={{borderColor: hotel}} className={classes.outlinedBtn}>
            Hotel
    </Button>
</Grid>


<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("industrial")} style={{textAlign:'left',borderColor: industrial, borderSize: 2}} className={classes.outlinedBtn}>
            Industrial
    </Button>
</Grid>

</Grid>

 }
 
 page2={
  <div>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Description of Property</span>
        <BootstrapInput onChange={e => setDescription(e.target.value)} inputRef={register} name="description_of_property" placeholder="description of property" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>        
<span style={{fontSize: '10px'}}>Type of Property</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select" style={{marginTop:'inherit'}}>
        <select name="property_type" ref={register} className={classes.selectStyle}>
          <option value="semi-detached-duplex">Semi detached Duplex</option>         
        </select>
        </div>
</FormControl>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Price</span>
        <BootstrapInput inputRef={register} onChange={e => setPrice(e.target.value)} type="number" name="price" placeholder="Total Development Amount" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin2}>
<span style={{fontSize: '10px'}}>Address</span>
        <BootstrapInput2 inputRef={register} onChange={e => setAddress(e.target.value)}  name="address" placeholder="address" id="bootstrap-input" />
</FormControl>



<FormControl className={classes.margin}>        
<span style={{fontSize: '10px'}}>Number of Units</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select" >
        <select required name="number_of_units" ref={register} className={classes.selectStyle}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
         
        </select>
        </div>
    </FormControl>



<FormControl className={classes.margin}>        
<span style={{fontSize: '10px'}}>Bathrooms</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select">
        <select required name="bedrooms" ref={register} className={classes.selectStyle}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
         
        </select>
        </div>
    </FormControl>


      <FormControl className={classes.margin}>        
      <span style={{fontSize: '10px'}}>Toilets</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select">
        <select required name="toilets" ref={register} className={classes.selectStyle}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
         
        </select>
        </div>
    </FormControl>





  </div>
}



page3={
  <div>





<FormControl className={classes.margin5}>
<input type="file" id="file" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader2}/>
<span style={{fontSize:12}}>Upload Landlord Agreement</span>
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={identification_document} />
    <img src={professional} className="icon__dash" onClick={handleClick2}/>
</div>
<div><span style={{fontSize:10}}>Please all document must have a seal of either NBA, NIA, NIOB, EAS or NIES</span></div>

</FormControl>


<FormControl className={classes.margin5}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<span style={{fontSize:12}}>Upload Tenancy Agreement</span>
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={picture} />
    <img src={professional} className="icon__dash" onClick={handleClick}/>
</div>
<div><span style={{fontSize:10}}>Please all document must have a seal of either NBA, NIA, NIOB, EAS or NIES</span></div>

</FormControl>


<Grid item xs={12} sm={12} md={12} className={classes.buttonCont}>
<ul>
  {myErrors.length>0 &&
  <p>Form not submitted because of the following error(s):</p>
}
{myErrors.map((text, index)=>(
<li style={{color:'red', fontSize:10}}>{text}</li>
))}
</ul>
<Button
type="submit"
fullWidth
variant="contained"
color="primary"
disabled={showPreloader}
className={classes.submit}
>Submit</Button>
    

</Grid>

  </div>

}

 
 />
 </form>
 </>
    );
}
