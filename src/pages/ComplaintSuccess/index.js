import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import ClientLayout from '../../layouts/ClientLayout'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResponsivePage from '../../components/ResponsivePage/ResponsivePage';
import {BASEURL, sendHttpRequestWithErrorGet, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';
import SearchButton from '../../components/searchButton/searchButton';
import top from './sorry.svg'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    width:'100%', 
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width:'100%', 
      
    },  
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function RulesAndRegulationScreen() {
  const classes = useStyles();
  let history = useHistory();
  
  const items = [
    "Theoderic",
    "theo",
    "Onipe",
    "Lagos",
    "Sara",
    "Jane",
    "Roland",
    "Ohunene"
  ]

  const logOut = ()=> {
    history.push('/')
  }
  

  return (
    <ResponsivePage title="">

<img src={top} className="imgTop" style={{width:'20%'}}/>
            <h1 className="reg__header">Complaints Made Successful</h1>
           <p className="reg__description">Your Complaints has been successfully sent.</p>
           <div className="form__column_button">
            <button className="form__button" onClick={logOut}>Proceed to Home</button>
</div>

  </ResponsivePage>
  );
}
    