import React from 'react';
import './SideDrawer.css';
import icon1 from './images.jpg'
import { NavLink, Route, Link, BrowserRouter as Router } from 'react-router-dom';
// const state = getState();

// the side drawer will contain the same items with the Toolbar
const SideDrawer = props => {
//since we would want to do some calculations
let drawerClass = 'side-drawer';
if(props.show){
    drawerClass='side-drawer open'
}
return (
    <nav className={drawerClass}>
    
        <ul>  
        <div className="user__image__sidebar_container">  <img src={icon1} className="user__image__sidebar"/></div>
        {props.links.map((eachLink, index, array) =>
        <li key={eachLink.id}><Link to={eachLink.path}>{eachLink.name}</Link></li>                       
        )}    
        </ul>
    </nav>
)

}
export default SideDrawer;
//the sidebar is independent of the toolbar, so we add it alongside app.js