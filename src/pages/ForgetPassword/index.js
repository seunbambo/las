import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ClientLayout from '../../layouts/ClientLayout'
import { useHistory, Redirect } from "react-router-dom";
import useForm from 'react-hook-form';
import { NavLink, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {sendHttpRequest, sendHttpRequestWithFormDataWithObjectGet, BASEURL, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getData = (url) => {
  const getUrl = BASEURL+url
  sendHttpRequest('GET', getUrl).then(responseData => {
      console.log(responseData);
  })
}

const useStyles = makeStyles(theme => ({
    loginContainer: {
      marginBottom:100,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 370,
          },    
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    minWidth:200, 
    cursor: 'pointer',
    minHeight:210,
    position: 'relative',
    border: '1px solid gray',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },   
},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  linkbtn: {
    cursor: 'pointer',
    textDecoration: 'none',
    float: 'left'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword(props) {
   
  const counter = useSelector(state=>state.counter)//we use this one to select the specific state that we want
  const dispatch = useDispatch()//we use it to pass an action, by specifying the action Type
  const userDetail = useSelector(state=>state.userDetail)
  const isRedirected = useSelector(state=>state.toHome)
  const isLoading = useSelector(state=>state.loading)
  const [errmessage, changeErrorMessage] = useState('')
  const [successmessage, changeSuccessMessage] = useState('');
  const [userEmail, changeEmail] = useState("")
  const [userToken, changeUserToken] = useState("")
  const [showPreloader, changePreloader] = useState(false)
  const [myErrors, changeErrors] = useState([])

  const [userPassword, changePassword] = useState("")
  const classes = useStyles();
  let history = useHistory();
  const { register, handleSubmit } = useForm()

  useEffect(() => {    
   console.log("this is the props", props.location.search)
   let rawText = props.location.search;
   let midRawText = rawText.split("&email=")
   let email = midRawText[1]
   let RawToken = midRawText[0].split("?token=")
   let token = RawToken[1]
  //  console.log(email, token)
  changeUserToken(token)
  changeEmail(email)



    }, []);

  const onSubmit = data => {
      console.log("this is the form data",data)
      const formDataLogin = new FormData();
      formDataLogin.append('email', userEmail)
      formDataLogin.append('token', userToken)
      formDataLogin.append('password', data.password)
      formDataLogin.append('password_confirmation', data.confirm_password)
          for (var pair of formDataLogin.entries())
          {
          console.log(pair[0]+ ', '+ pair[1]); 
          }
      
      dispatch({type:"STARTLOADER"})
        const postUrl = BASEURL+'/password/reset'
       
        sendHttpRequestWithFormDataWithoutHeaders('POST', postUrl, formDataLogin).then(responseData=>{            
            console.log("datas", responseData)
            const allErrors = []
            if(responseData.error){
              console.log(typeof responseData.error)
              console.log(responseData.error)
              if(typeof responseData.error === "object"){
                for (const key in responseData.error) {
                  if (responseData.error.hasOwnProperty(key)) {
                    const element = responseData.error[key];
                      console.log(key+": ", element[0]);
                      allErrors.push(element[0])
                  }
                }
              changeErrors(allErrors)
              changePreloader(false)
              dispatch({type:"STOPLOADER"})
              }
              else if(typeof responseData.error === "string"){
                changeErrors(responseData.error)
                changePreloader(false)
                dispatch({type:"STOPLOADER"})
              }
             
              
            }
            else if(responseData.data!= null || responseData.data != undefined || responseData.data!= []){
              history.push('/password_reset_success')
            }       
        }) 
                
  }


  const notify = (message) => toast(message);
 const errorType = typeof myErrors


  return (<>
  {isRedirected ? <Redirect to="/dashboard" />: null}
    <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading your content...'
        >
           <ToastContainer className='toast-container'/>   
    <ClientLayout showBackgroundImage={false} showFooter={true} Height="500px">
    <Container component="main" maxWidth="xs" className={classes.loginContainer}>
      <CssBaseline />
      <div className={classes.paper}>
      
    
 
      <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        </Typography>
        <Typography component="h1" variant="h5">
          Create New Password
        </Typography>
  <p style={{color:'red'}}>{errmessage}</p>
  <p style={{color:'green'}}>{successmessage}</p>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            type="text"
            fullWidth
            id="email"
            label="Email"
            value={userEmail}
            disabled={true}
            inputRef={register} 
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            label="Enter New Password"
            inputRef={register} 
            name="password"
            autoComplete="Password"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            label="Confirm Password"
            inputRef={register} 
            name="confirm_password"
            autoComplete="password"
            autoFocus
          />
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Change Password
          </Button>
<div style={{marginBottom:50}}>
  {errorType!=="string" &&       
  <ul>
    {myErrors.length>0 &&
    <p style={{color:'brown',fontSize:12}}>Form not submitted because of the following error(s):</p>
  }
  {myErrors.map((text, index)=>(
  <li style={{color:'red', fontSize:10}}>{text}</li>
  ))}
  </ul>
  }
 {errorType==="string" &&       
  <p style={{color:'red', fontSize:10}}> {myErrors}</p>
}
</div>       
        </form>
        
      </div>
    
    </Container>
    </ClientLayout>
    </LoadingOverlay>
    </>
  );
}
