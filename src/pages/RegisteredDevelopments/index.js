import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DashboardLayout from '../../layouts/DashboardLayout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector, useDispatch} from 'react-redux';
import {BASEURL,sendHttpRequestWithFormDataWithObjectGet, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import HeaderDescription from '../../components/headerDescription/headerDescription';
import MyLoader from '../../components/MyLoader';
import { ToastContainer, toast } from 'react-toastify';
import {
  fade,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';


const StyledTableCell = withStyles(theme => ({
 
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Theoderic Onipe', 159, 6.0, 24, 4.0),

];

const useStyles = makeStyles(theme =>({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: {
    width:'80%', background:'yellow', height:100, margin:'auto'
  },
  table: {
    minWidth: 700,
  },
  submit: {
    width:'100%',
    backgroundColor:'#072455',
    color:'white',
    height: 50,
    outline: 'none',
    border: 'transparent',
    borderRadius: '5px',
   },
  
}));

export default function RegisteredDevelopments(props) {
  const classes = useStyles();
  const userDetail = useSelector(state=>state.userDetail)
  const [token2, changeToken] = useState("")
  const url = BASEURL+'/developments/mine'
  const [allNews, setNews] = useState([]);
  const [Loadme, setLoader] = useState(true)
  let history = useHistory();
 

  useEffect(() => {   
    var state = JSON.parse(localStorage.getItem('reduxStore')); 
    const userToken2 = localStorage.getItem('token');
    if(!state.userDetail.user.license_expire_time){
      history.push('/licence')
    }
    else if(userToken2==null || userToken2=="" || state.userDetail=={}){
      history.push('/login')
    }
    changeToken(userToken2)
    console.log("this is theuser token", userToken2)
    sendHttpRequestWithFormDataWithObjectGet('GET', url, userToken2).then(responseData=>{      
      console.log("this is the newsData Lease", responseData)  
      setNews(responseData.data)  
      setLoader(false)  
    })
  
  }, []);

  
  const verifier = (str) => {
    if(str=="0" || str==null){
      return "Not Verified"
    }
    else {
      return "Verified"
    }
  }
  const verifierPaid = (str, id) => {
    if(str==="1"){
      return "Paid"
    }
    else {
      return (<button  onClick={()=>makePayment(id)} className={classes.submit}>Make Payment</button>)
    }
  }

const goto = () => {
  history.push('/invoice')
}
//tenancy, property, 
const makePayment = (entity_id) => {
  const postUrl = BASEURL+'/entity/get/invoice';
 
  const formData = new FormData();
  formData.append('entity_type', "development")   
  formData.append('entity_id', entity_id)  

  formData.forEach((value, key) => {
    console.log("my datas from formData","key %s: value %s", key, value);
  })
  
  let authHeader = token2
  console.log("this is the auth headers",authHeader)
 
  sendHttpRequestWithFormData('POST', postUrl, formData, authHeader).then(responseData=>{
    console.log("datassssssii first", responseData);
    if(responseData.hasOwnProperty("message")){
      notify("Error occurred during getting of invoice")
    }
    else if(responseData.hasOwnProperty("data")){
      notify("Invoice Gotten successffully")
      const licencePlan = {"business":responseData.item_description, "company_address":responseData.customer_address}   
      console.log("thisis the responnse datas", responseData.data)
      localStorage.setItem('invoiceDetails', JSON.stringify(responseData.data))
      localStorage.setItem('licencePlan', JSON.stringify(licencePlan))
      notify("Invoice for Tenancy created Successfully")   
      history.push('/invoice')
    }
    
    
  })
            
      
}

const notify = (message) => toast(message);
  return (
    <>
<ToastContainer className='toast-container'/>
<MyLoader loadme={Loadme}/>
  <DashboardLayout width="100%" showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="700px">
    <HeaderDescription title="Welcome to your property Registered Lease board" description="This board contains all the property registered by you in the platform" />
    <Grid container spacing={10} className={classes.tableContainer} >
      
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Paid</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allNews.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.type_of_property}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                <StyledTableCell align="left">{row.type_of_property}</StyledTableCell>
                <StyledTableCell align="left">{verifier(row.verified)}</StyledTableCell>
                <StyledTableCell align="left">{verifierPaid(row.paid)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    
    </Grid>
    </DashboardLayout>
    </>
  );
}
