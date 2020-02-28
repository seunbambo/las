import React, {useState, Component} from 'react';
import { withRouter, useHistory } from "react-router-dom";

export const Registration = async (data, url) => {

}
// Post request
export const Login = async (data, url) => {
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer 44d2ab667330b30a1467d9b07b94092b4967dae2d3e47da1997c75714b74d996'
  
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects

}


let defaultData = {
    "invoice_number":"4034057579",
    "transaction_date":"26-Nov-19",
    "customer_id":"128279",
    "payer_id":"C-38777",
    "customer_name":"Property Link Real Estate Investment Limited.",
    "customer_address":"Plot 1, Block 77 Alh. Basheer Shittu Ave, Magodo GRA Phase 2, lagos State.",
    "amount_due":"250000.00",
    "amount_paid":"0.00",
    "currency_code":"NGN",
    "number_of_items":"1",
    "payment_status":"UNPAID",
    "push_status":"NEW",
    "reference":"11472",
    "client_code":"PISON ",
    "mda_code":"097",
    "mda_description":"LASRETRAD",
    "invoice_lines": [
      {
        "item_name":"Real Estate Agent Annual Registration Fee",
        "unit_price":"250000",
        "quantity":"1",
        "amount":"250000",
        "description":"Real Estste Registration Fee",
        "revenue_code":"01-097-97004-000-11009-0000-32339",
        "revenue_description":"Consolidated Revenue Fund-Office of the Surveyor General-Account-Unspecified-Alausa-Unspecified-Survey Plan"
        
      }
      ]
  }
//     async function postData(url = '', data = {}) {
//       // Default options are marked with *
//       const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'omit', // include, *same-origin, omit
//         // headers: {
//         //   'Accept': 'application/json',
//         //   'Content-Type': 'application/json',
//         //   'Authorization': 'Bearer 44d2ab667330b30a1467d9b07b94092b4967dae2d3e47da1997c75714b74d996'
  
//         //   // 'Content-Type': 'application/x-www-form-urlencoded',
//         // },
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // no-referrer, *client
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//       });
//       return await response.json(); // parses JSON response into native JavaScript objects
//     }
  
  
//   async function sendInvoiceDetails () {
//     try {
//       const data = await postData('https://paygatetest.softalliance.com/index.php/full_invoice', defaultData);
//       console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
//       alert("Invoice Sent Successfully")
//       history.push('/successfulpayment')
//     } catch (error) {
//       console.error(error);
//       alert("Error in Transaction")
//     }
//   }
  
  
  
