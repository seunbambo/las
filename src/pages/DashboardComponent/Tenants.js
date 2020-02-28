import React from 'react';
import './DashboardComponent.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import DashboardLayout from '../../layouts/DashboardLayout';
import icon1 from './assets/house.png';
import four from './assets/four.svg';
import two from './assets/two.svg';
import three from './assets/three.svg';
import one from './assets/one.svg'

import { useHistory, Redirect } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
var state = JSON.parse(localStorage.getItem('reduxStore'));


export default function Tenant(props) {
    
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const defaultDetails = {name: "null", last_name:"null"}
let myState = state
console.log("current state condition", myState)
const Detail = isEmpty(state) ? defaultDetails : state.userDetail.user


let history = useHistory();

function handleSubmit(flexibleRoute) {
  history.push(`/${flexibleRoute}`);
}
const userDetail = useSelector(state=>state.userDetail)

console.log("This is the user Details",state)

    return (
        <div className="card_view">
        <center><h3 className="header">Welcome to your dashboard {Detail.name} {Detail.last_name}</h3></center>
       <div>
        <div class="card" onClick={()=>handleSubmit("sorry")}>
            <div><h4 className="card__upper--text">Register Tenency</h4></div>
            <div class="container">                
            <img src={one} className="card__image"/>
            </div>     
            <div><h4 className="card__upper--text__lower">Register Tenency of a Property</h4></div>
            <div class="card__bottom">
                <h5 className="card__bottom--text">Register</h5>
            </div>       
        </div> 

        <div class="card">
            <div><h4 className="card__upper--text">Profile</h4></div>
            <div class="container">                
            <img src={three} className="card__image"/>
            </div>     
            <div><h4 className="card__upper--text__lower">Complete Your Profile within 60 days</h4></div>
            <div class="card__bottom">
                <h5 className="card__bottom--text">Register</h5>
            </div>       
        </div> 

        <div className="card" onClick={()=>handleSubmit('report')}>
            <div><h4 className="card__upper--text">Report Tenant</h4></div>
            <div class="container">                
            <img src={two} className="card__image"/>
            </div>     
            <div><h4 className="card__upper--text__lower">Report Tenant to LASRETRAD</h4></div>
            <div class="card__bottom">
                <h5 className="card__bottom--text">Register</h5>
            </div>       
        </div> 

        <div className="card" onClick={()=>handleSubmit("lease")}>
            <div><h4 className="card__upper--text">Register Sales/Lease</h4></div>
            <div class="container">                
            <img src={four} className="card__image"/>
            </div>     
            <div><h4 className="card__upper--text__lower">Register Sales and Lease of Property</h4></div>
            <div class="card__bottom">
                <h5 className="card__bottom--text">Register</h5>
            </div>       
        </div> 
        
        
        </div>
    </div>
    )
}