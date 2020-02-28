import React from 'react';

import './Backdrop.css';

//this is the overlay that would be shown on the page when the side bar is clicked
const Backdrop = (props) => (
    <div className="backdrop" onClick={props.click}/> 
);


//we give it a z-index less than the sidedraw but greater than the normal contents and an rgba color
export default Backdrop