import React,{useState, useEffect, useRef} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import {BASEURL, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
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
import useForm from 'react-hook-form';
import Loader from 'react-loader-spinner';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepperFormPage3 from '../StepperFormPage3';
import home3 from './home3.png';
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

import lease from './assets/lease.svg'

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
      color: '#072455',
      marginTop: 3,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none',
      },     

    },
    margin22: {
      width: '33%',
      color: '#072455',
      marginTop: 3,
      marginRight: 10,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', marginRight:0
      },     

    },
    margin23: {
      width: '30%',
      color: '#072455',
      marginTop: 3,
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        width: '100%', float: 'none', marginRight:0
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
    backgroundColor:'#072455',
    color: 'white',
  },
  selectMenu: {
    width:'92%', marginTop:'inherit',
    [theme.breakpoints.down('sm')]: {
      width:'100%'
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
    width: '100%important',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '80%!important'
    },
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
        padding: '15px 10px', width:'100%', 
        
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
      
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);


export default function RegisterSalesAndLeases(props) {
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
  const { register, handleSubmit } = useForm()
  const classes = useStyles();
  let history = useHistory();
  const [Loadme, setLoader] = useState(true);
  const [type_of_property, changePropertyType] = useState("")
  const [showPreloader, changePreloader] = useState(false)  
  const [totalLeaseAmount, setTotalLeaseAmount] = useState("")
  const [enabled, changeEnabled] = useState(false)  
  const [individualColor, changeIndividualColor] = useState('#072455')
  const [corporateColor, changeCorporateColor] = useState("#E5E7E9")
  const [description, setDescription] = useState("")
  const [prices, setPrice] = useState("")
  const [addresses, setAddress] = useState("")
  const [residential, changeResidential] = useState('#E5E7E9')
  const [hotel, changeHotel] = useState('#E5E7E9')
  const [industrial, changeIndustrial] = useState('#E5E7E9')
  const [office, changeOffice] = useState('#E5E7E9')

  const [certificate_of_occupancy, changeCert] = useState("")
  const [building_permit, changeBuilding] = useState("");
  const [identification_document, changeIDocument] = useState("")
  const [landlordText, setLandlord] = useState("")
  const [developerText, setDeveloper] = useState("")
  const [picture, changePicture] = useState("picture.jpg");
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



  // function fileSender(pix, fieldName){
  //   const formPicture = new FormData();
  //   let accessToken = Detail.access_token
  //   let authHeader = 'Bearer ' + accessToken
  //   formPicture.append("file", pix)
  //   const professionalUrl = BASEURL+'/register-sales-leases/media';
  //   console.log("file---------filesender---", pix)

  //   if(fieldName==="certificate_of_occupancy")
  //   changePreloader(true)
  //   sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData=>{
  //     console.log("certificate aloone", responseData)
  //     changeCert(responseData.name)
  //     if(responseData.name){
  //       changePreloader(false)
  //       notify("Upload Successful")
  //       console.log("success")
  //     }
  //     else if(responseData.name==undefined){
  //       changePreloader(false)
  //       notify("Error In File Upload")
  //     }
  //     else{
  //       changePreloader(true)
  //       console.log("failed")
  //       notify("Error in File Upload")
  //     }
  //   })
  //   if(fieldName==="building_permit")
  //   changePreloader(true)
  //   sendHttpRequestWithFormData('POST', professionalUrl, formPicture, authHeader).then(responseData2=>{
  //     console.log("building permit alone", responseData2)
  //     changeBuilding(responseData2.name)
  //     if(responseData2.name){
  //       changePreloader(false)
     
  //       console.log("success")
  //     }
  //     else if(responseData2.name==undefined){
  //       changePreloader(false)
  //       notify("Error In File Upload")
  //     }
  //     else{
  //       changePreloader(true)
  //       console.log("failed")
  //       notify("Error in File Upload")
  //     }
  //   })
    
    

  // }

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

  const onSubmit = data => {
    const postUrl = BASEURL+'/register-sales-leases';
    let accessToken = Detail.access_token
    let user_id = Detail.user.id
    changePreloader(true)
  
    
    const formData = new FormData();
    formData.append('type_of_property', type_of_property)
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('morgage_outright_sale', data.morgage_outright_sale)    
    formData.append('sale_lease', data.sale_lease)    
    formData.append('name_of_developer', data.name_of_developer)    
    formData.append('name_of_landlord', data.name_of_landlord)
    formData.append('certificate_of_occupancy', identification_document)
    formData.append('address', data.address)
    formData.append('building_permit', picture)
    formData.append('total_leases_sales_amount', data.total_leases_sales_amount)
    formData.append('buyer_first_name', data.buyer_first_name)
    formData.append('buyer_last_name', data.buyer_last_name)
    formData.append('buyer_address', data.buyer_address)
    formData.append('user_id',user_id)
    formData.append('amount_paid', data.amount_paid)
    

    formData.forEach((value, key) => {
      console.log("my datas from formData","key %s: value %s", key, value);
    })
    
    let authHeader = 'Bearer ' + accessToken
    console.log("this is the auth headers",authHeader)

    sendHttpRequestWithFormData('POST', postUrl, formData, authHeader).then(responseData => {
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
              console.log("rrrrrrrrrrr", responseData)            
              const formDataInvoice = new FormData();
              const company_address = data.address
                formDataInvoice.append('user_id', user_id )
                formDataInvoice.append('entity_type', "property")
                formDataInvoice.append('entity_id', responseData.data.id)
                formDataInvoice.append('customer_name', `${name} ${lastname}`)
                formDataInvoice.append('amount_due', responseData.data.charge)
                formDataInvoice.append('customer_address', responseData.data.address)            
                formDataInvoice.append('item_name', responseData.data.type_of_property)
                formDataInvoice.append('item_description', responseData.data.type_of_property)
                formDataInvoice.append('number_of_item', 1)
                formDataInvoice.append('payment_status', 0)
                formDataInvoice.forEach((value, key) => {
                  console.log("my datas from formData to create invoice is created","key %s: value %s", key, value);
                })
                let link = BASEURL+'/invoices'
                sendHttpRequestWithFormData('POST', link, formDataInvoice, authHeader).then(responseData=>{
                  console.log("datassssssii", responseData); 
                  if(!responseData.error)
                  {
                  const licencePlan = {"business":type_of_property, "company_address": company_address}   
                  console.log("thisis the responnse datas", responseData.data)
                  localStorage.setItem('invoiceDetails', JSON.stringify(responseData.data))
                  localStorage.setItem('licencePlan', JSON.stringify(licencePlan))
                  notify("Invoice for Sales and Lease created Successfully")   
                  changePreloader(true)
                  history.push('/invoice')
                  }
                  else{
                    notify("Error occured in creating Sales and Lease")
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

function handleClick(e){
  fileUploader.current.click();   
}

function handleClick2(e){
  fileUploader2.current.click();   
}

function handleClick3(e){
  fileUploader3.current.click();   
}
 
useEffect(() => {   
  var state = JSON.parse(localStorage.getItem('reduxStore'));
  const userToken2 = localStorage.getItem('token');
  if(userToken2==null || userToken2=="" || state.userDetail=={}){
    history.push('/login')
  } 
  else if(userToken2!==null || userToken2!=="" || state.userDetail!=={}){
   console.log("this is the state te",state)
  
      changeName(state.userDetail.user.name)
      changeLastName(state.userDetail.user.last_name)
      changeUserId(state.userDetail.user.id)
  }
}, []);

/*
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    const element = data[key];
      console.log(key+": ", element);
  }
}
*/

  return (
    <>
    <ToastContainer className='toast-container'/>
    <form onSubmit={handleSubmit(onSubmit)}>
 <StepperFormPage3 
 header1="Type of Property"
 header2="Seller Information"
 topText = "Register Sales/Lease"
 header3 = "Buyer Information"
 page1Validated = {type_of_property!=="" ? true: false}
 page2Validated = {developerText.length>=3 && landlordText.length>=3 && identification_document!="" && picture !="picture.jpg" && totalLeaseAmount!=="" && addresses.length>5 && description.length > 5 && prices!=="" ? true:false }
 sideImage = {lease}
 message = "Register Sales/Lease of Property"
 loader = {showLoader(100,100)}
 page1={
  
<Grid container spacing={2} className={classes.btnHolder}> 
<Grid item xs={12} sm={12} md={4} >
    <Button variant="outlined" color="primary" onClick={()=>toggleView("residential")} style={{width:'100%', borderColor: residential}} className={classes.outlinedBtn}>
            Residential
    </Button>
</Grid>

<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("office")} style={{width:'100%', borderColor: office}} className={classes.outlinedBtn}>
            Office
    </Button>
</Grid>


<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("hotel")} style={{width:'100%', borderColor: hotel}} className={classes.outlinedBtn}>
            Hotel
    </Button>
</Grid>


<Grid item xs={12} sm={12} md={4}>
    <Button variant="outlined" color="primary" onClick={()=>toggleView("industrial")} style={{textAlign:'left', width:'100%', borderColor: industrial, borderSize: 2}} className={classes.outlinedBtn}>
            Industrial
    </Button>
</Grid>

</Grid>

 }
 
 page2={
  <div>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>First Name*</span>
        <BootstrapInput inputRef={register} onChange={e => setDescription(e.target.value)}  name="first_name" placeholder="firstname" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Last Name*</span>
        <BootstrapInput inputRef={register} onChange={e => setPrice(e.target.value)}  name="last_name" placeholder="lastname" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>        

        <span style={{fontSize: '10px', marginBottom:5}}>Mortgage Outright or Sale</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select">
        <select name="morgage_outright_sale" ref={register} className={classes.selectMenu}>
        <option value="mortgage">Mortgage</option>
        <option value="sale">Sale</option>
    
         
        </select>
        </div>
    </FormControl>
<FormControl className={classes.margin}>        
<span style={{fontSize: '10px', marginBottom:5}}>Sales or Lease</span>
        {/* <BootstrapInput inputRef={register} name="gender" placeholder="Gender" id="bootstrap-input" /> */}
        <div className="custom-select" >
      
        <select name="sale_lease" ref={register} className={classes.selectMenu}>
        <option value="sale">Sale</option>
        <option value="lease">Lease</option>
    
         
        </select>
        </div>
    </FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Name of Developer*</span>
        <BootstrapInput onChange={e => setDeveloper(e.target.value)} inputRef={register} name="name_of_developer" placeholder="Name of Developer" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Name of Landlord*</span>
        <BootstrapInput onChange={e => setLandlord(e.target.value)} inputRef={register} name="name_of_landlord" placeholder="Name of Landlord" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin2}>
<span style={{fontSize: '10px'}}>Address*</span>
        <BootstrapInput2 onChange={e => setAddress(e.target.value)} inputRef={register} name="address" placeholder="Enter Address" id="bootstrap-input" />
</FormControl>



<FormControl className={classes.margin22}>
<input type="file" id="file" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader2}/>
<span style={{fontSize: '10px', marginBottom:5}}>Certificate of Occupancy</span> 
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={identification_document} />
    <img src={professional} className="icon__dash" onClick={handleClick2}/>
</div>

</FormControl>


<FormControl className={classes.margin22}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<span style={{fontSize:10,  marginBottom:5}}>Upload Tenancy Agreement</span>
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={picture} />
    <img src={professional} className="icon__dash" onClick={handleClick}/>
</div>

</FormControl>


{/* <FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Building Permit</span>  
        <BootstrapInput required onChange={(e)=>fileChangedHandler(e,5000000000)} type="file" inputRef={register} name="certificate_of_occupancy" placeholder="certificate of occupancy" id="bootstrap-input" />
</FormControl>




<FormControl className={classes.margin}>
        <span style={{fontSize: '10px'}}>Building Permit</span>  
        <BootstrapInput required onChange={(e)=>fileChangedHandler(e,5000000000)} type="file" inputRef={register} name="building_permit" placeholder="certificate of occupancy" id="bootstrap-input" />
</FormControl> */}

<FormControl className={classes.margin23}>
<span style={{fontSize: '10px'}}>Total Leases and Sales amount</span>         
        <BootstrapInput required inputRef={register} onChange={e => setTotalLeaseAmount(e.target.value)}  name="total_leases_sales_amount" placeholder="10000000" id="bootstrap-input" type="number"/>
</FormControl>
  </div>
}

page3={
  <div>

    
<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Firstname*</span> 
        <BootstrapInput required inputRef={register} name="buyer_first_name" placeholder="Ademola" id="bootstrap-input" />
</FormControl>


<FormControl className={classes.margin}>
        <span style={{fontSize: '10px'}}>Last Name*</span> 
        <BootstrapInput required inputRef={register} name="buyer_last_name" placeholder="Gbadamosi" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Amount Paid*</span> 
        <BootstrapInput required inputRef={register} type="number" name="amount_paid" placeholder="10000000" id="bootstrap-input" />
</FormControl>

<FormControl className={classes.margin}>
<span style={{fontSize: '10px'}}>Address</span> 
        <BootstrapInput required inputRef={register} name="buyer_address" placeholder="Enter Address" id="bootstrap-input" />
</FormControl>
{/* {showSidebar.map((text, index) => (
        <Link className={classes.linkConfig} to={text.link}>
          
      <ListItem button key={text.name}>
        
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text.name} />
        </ListItem>
        </Link>
      ))} */}
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
variant="contained"
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
