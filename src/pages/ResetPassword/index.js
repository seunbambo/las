import React, {useState} from 'react';
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

export default function ResetPassword() {
   
  const counter = useSelector(state=>state.counter)//we use this one to select the specific state that we want
  const dispatch = useDispatch()//we use it to pass an action, by specifying the action Type
  const userDetail = useSelector(state=>state.userDetail)
  const isRedirected = useSelector(state=>state.toHome)
  const isLoading = useSelector(state=>state.loading)
  const [errmessage, changeErrorMessage] = useState('')
  const classes = useStyles();
  let history = useHistory();
  const { register, handleSubmit } = useForm()


  const onSubmit = data => {
      console.log("this is the form data",data)
      const formDataLogin = new FormData();
      formDataLogin.append('email', data.email)
      
      dispatch({type:"STARTLOADER"})
        const postUrl = BASEURL+'/password/email'
       
        sendHttpRequestWithFormDataWithoutHeaders('POST', postUrl, formDataLogin).then(responseData=>{            
            console.log("datas", responseData)
            if(responseData.error){
              changeErrorMessage(responseData.error)
              dispatch({type:"STOPLOADER"})             
            }
        }) 
                
  }


  const notify = (message) => toast(message);
  
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
      
    
 
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forget Password
        </Typography>
  <p style={{color:'red'}}>{errmessage}</p>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            label="Password"
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
            label="Password"
            inputRef={register} 
            name="email"
            autoComplete="email"
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
            Send Reset Password Link
          </Button>
 
           
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
            <Link to="/category" className={classes.linkbtn}>Dont have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
        
      </div>
      <Box mt={8}>
       
 
      </Box>
    </Container>
    </ClientLayout>
    </LoadingOverlay>
    </>
  );
}
