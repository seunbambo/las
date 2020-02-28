import React from 'react';
import './DrawerToggleButton.css';
//specifically created to add the three hamburger lines, so the 3 dives would have same class

const drawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
    </button>
)

export default drawerToggleButton;