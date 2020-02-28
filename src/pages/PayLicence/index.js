import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Typography from '@material-ui/core/Typography';
import './PayLicence.css'
import { useHistory } from "react-router-dom";

import FormComponent from './FormComponent/FormComponent'

const PayLicence = (props) => {    

    let history = useHistory();

  function handleClick() {
    history.push("/invoice");
  }

    return (
        <DashboardLayout width='100%' showCurvedFooter={false} showFooter={false} showBackgroundImage={false} backgroundColor="white" height="100%">
            <FormComponent onRegister = {handleClick}/>
        </DashboardLayout>
    )
}

export default PayLicence