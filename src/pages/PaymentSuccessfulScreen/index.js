import React from 'react';
import './PaymentSuccessfulScreen.css';
import { useHistory } from "react-router-dom";
// import ClientLayout from '../../components/ClientLayout';
import ClientLayout from '../../layouts/ClientLayout'
import Typography from '@material-ui/core/Typography';
import top from './top.png'

const PaymentSuccessfulScreen = (props) => {
    let history = useHistory();
    function handleClick() {
        history.push("/");
      }
    return (
        <ClientLayout width='100%' showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="100%">
            <img src={top} className="imgTop"/>
            <h1 className="reg__header">Registration Successful</h1>
           <p className="reg__description">Your registration with LASRETRAD is successful. You'll recieve your message box details of this transaction. Thank You for the Registration</p>
           <div className="form__column_button">
            <button onClick={handleClick} className="form__button">Proceed To Dashboard</button>
    </div>
        </ClientLayout>
    )
}

export default PaymentSuccessfulScreen;