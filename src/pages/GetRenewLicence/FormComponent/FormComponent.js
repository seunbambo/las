import React from 'react';
import './FormComponents.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from '@fortawesome/free-solid-svg-icons'


// the side drawer will contain the same items with the Toolbar
const FormComponent = props => {

     function handleSubmit(event){
        event.preventDefault();
        console.log(event.target[0].value)
      }

return (
    <div className="form">
       
        <p className="big__header--text">Get & Renew Licence</p>
        <p className="header__text__form">Get and renew your license with ease, you must have been registered before you can issue/renew Licence <a>Register with LASERTRAD</a></p>
        
        <div style={{textAlign:'center'}}>
            <button className="left__button">Get Licence</button>             
            <button className="right__button">Renew Licence</button> 
        </div>
    <form onSubmit={handleSubmit}>
    <div className="form__c">
        <div className="form__u">
        
        <label>
            <p className="get_form--label">Firstname*</p>
            <input type="text" className="form__inputs" />
        </label>
                 
        <label>
            <p className="get_form--label">Firstname*</p>
            <input type="text" className="form__inputs" />
        </label>
                    
        </div>
        <div className="left_side">        
        <label>
            <p className="get_form--label">Lastname*</p>
            <input type="text" className="form__inputs"/>
        </label>
             
        <label>
            <p className="get_form--label">Firstname*</p>
            <input type="text" className="form__inputs" />
        </label>
        </div>
       

        <div className="big__input">        
            <label>
                <p className="get_form--label">Lastname*</p>
                <input type="text" className="form__inputs--big"/>
            </label>
        </div>
    </div>
    
    <div className="form__column_buttons">
            <button onClick={props.onRegister} className="form__buttons">Confirm</button>
    </div>
    </form>
</div>
)

}
export default FormComponent;
//the sidebar is independent of the toolbar, so we add it alongside app.js