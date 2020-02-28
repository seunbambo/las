import React from 'react';
import './FormComponents.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from '@fortawesome/free-solid-svg-icons'


// the side drawer will contain the same items with the Toolbar
const FormComponent = props => {

return (
    <div className="form">
        <p style={{fontWeight:'bold', fontSize:35, textAlign:'center'}}>Get & Renew Licence</p>
        <p style={{textAlign:'center', paddingLeft:200, paddingRight:200}}>Welcome Mr. Theoderic Onipe, Please pay below to issue your licence</p>
        
        <div style={{textAlign:'center'}}>
        <button style={{borderRadius:4, fontWeight:'bold', backgroundColor:'white', outline:'none', borderColor: 'transparent', width: 120, padding: '15px 14px'}}>N25,000</button> 
            <button style={{borderRadius:4, color:'white', width: 100, backgroundColor: '#0b3056', padding: '15px 14px', margin:"35px 10px"}}>USSD</button>             
            <button style={{borderRadius:4, color:'white', width: 130, backgroundColor: '#0b3056', padding: '15px 14px', margin:"35px 10px"}}>Cash Transfer</button>             
            <button style={{borderRadius:4, backgroundColor:'white', outline:'none', borderColor: '#0b3056', width: 120, padding: '15px 14px'}}>Card Payment</button> 
        </div>

        <div className="form__column">
                    <div className="form__container">
                        <label>
                            <p className="form__label">Firstname*</p>
                            <input type="text" className="form__inputs" />
                        </label>
                    </div>
                    <div className="form__container">
                        <label>
                            <p className="form__label">Lastname*</p>
                            <input type="text" className="form__inputs"/>
                        </label>
                    </div>
            </div>
            <div className="form__column">
                    <div className="form__container">
                        <label>
                            <p className="form__label">Expiry Date*</p>
                            <input type="text" className="form__inputs"/>
                        </label>
                    </div>
                    <div className="form__container">
                        <label>
                            <p className="form__label">CVV</p>
                            <input type="text" className="form__inputs"/>
                        </label>
                    </div>
            </div>
            <div className="form__column__large">
                    <div className="form__container_large">
                        <label>
                            <p className="form__label__large">Pin</p>
                            <input type="text" className="form__inputs__large"/>
                        </label>
                    </div>
            </div>
           
    <div className="form__column_button">
            <button onClick={props.onRegister} className="form__button">Confirm</button>
    </div>
    
</div>
)

}
export default FormComponent;
//the sidebar is independent of the toolbar, so we add it alongside app.js