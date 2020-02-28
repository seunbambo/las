import React,{useEffect} from 'react';
import './PaymentSuccessfulScreen.css';
import { useHistory, } from "react-router-dom";
// import ClientLayout from '../../components/ClientLayout';
import ClientLayout from '../../layouts/ClientLayout'
import Typography from '@material-ui/core/Typography';
import {BASEURL, sendHttpRequestGetSingle, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import top from './top.png'

const PaymentSuccessfulScreen = (props) => {
    let history = useHistory();
    function handleClick() {
        history.push("/login");
      }
 
      useEffect(() => {    
        console.log("this is the props", props.location)
        let rawText = props.location.search;
    //     let midRawText = rawText.split("&email=")
    //     let email = midRawText[1]
        let RawToken = rawText.split("verification_token=")
        let token = RawToken[1]
        console.log(token)
        const url = BASEURL+'/userVerification/'+token
        sendHttpRequestGetSingle('GET', url).then(responseData=>{      
            console.log("this is the responseData", responseData)
            // console.log("this is the Data",responseData.data)  
            // setNews(responseData.data)  
            // setLoader(false)  
      
          })
     
         }, []);
     
    return (
        <ClientLayout width='100%' showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="100%">
            <img src={top} className="imgTop"/>
            <h1 className="reg__header">Verificatiton Successful</h1>
           <p className="reg__description">Email has been successfully verified</p>
           <div className="form__column_button">
            <button onClick={handleClick} className="form__button">Proceed To Login</button>
    </div>
        </ClientLayout>
    )
}

export default PaymentSuccessfulScreen;