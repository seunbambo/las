import React, {useState, Component} from 'react';
import { withRouter, useHistory } from "react-router-dom";
import {defineState} from 'redux-localstore'

const defaultState = {
    counter: 0,
    toHome: false,
    loading: false,
    licenceDetail: {

    },
    userDetail: {
    },
    loggedIn: false,
}

const initialState = defineState(defaultState)(rootReducer);


export default function rootReducer(state=initialState, action){
    switch(action.type){
        case 'INCREMENT':
            return {...state, value: state.value + 1}
        case 'DECREMENT':
            return {...state, counter: state.counter-1}
        case 'STARTLOADER':
            return {...state, loading: true}
        case 'AUTHENTICATEROUTES':
            return {...state, toHome: true}
        case 'UNAUTHENTICATEROUTES':
                    return {...state, toHome: false}
        case 'STOPLOADER':
            return {...state, loading: false}
        case 'SAVELOGINDETAILS':    
            const newUser = Object.assign(state.userDetail, action.payload) 
            return {...state, userDetail: newUser}
        case 'SAVELICENCEPLAN':
            console.log("this si the current State", ...state)

        //     var newUserObject = Object.assign({}, state.licenceDetail, {
        //         detail: action.payload   // or some other fields
        //    })           
        //    return Object.assign({}, state, {licenceDetail: newUserObject})
        case 'CHANGELOGINSTATUS':
            return {...state, loggedIn:true}

        
        default:
            return state;
    }
}