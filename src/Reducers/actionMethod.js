import React from 'react';
import {Login} from '../../src/helpers/apiUtilities';
import {useSelector, useDispatch} from 'react-redux';



export const LoginHandler = async(payload, url)=> {
    const dispatch = useDispatch()//we use it to pass an action, by specifying the action Type
const userDetail = useSelector(state=>state.userDetail)
const isLoading = useSelector(state=>state.loading)

    try {        
        dispatch({type:"STARTLOADERICON"})
      const data = await Login(url, payload);
      console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
      dispatch({type:"STOPLOADERICON"})
      alert("successfully logged In")
    //   history.push('/successfulpayment')
    } catch (error) {
      console.error(error);
      dispatch({type:"STOPLOADERICON"})
      alert("Error in Loggin In")
    }
  }