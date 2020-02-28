import React,{useState, useEffect} from 'react'
import './Toolbar.css';//this automatically injects the css code into our running application
import {useSelector, useDispatch} from 'react-redux';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import icon1 from './images.jpg'
import lagos from './index.jpg'
import { getState } from 'redux-localstore';
import { useHistory, Redirect } from "react-router-dom";
import { NavLink, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { faHome, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BASEURL, sendHttpRequestWithFormDataWithObjectGet, sendHttpRequestWithError, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithAuthHeaders, sendHttpRequestWithFormData, sendHttpRequestWithFormDataWithoutHeaders} from '../../../helpers/apiMethods';



// const state = getState();

const defaultDetails = {name: "null", last_name:"null"}
//we will get some props and then return some jsx
// we will wrap it with normal parenthesis because we wanna return one statement, which would actually be multiline jsx code
const Toolbar = props =>{
    let history = useHistory();
    const dispatch = useDispatch()
    const [display, changeDisplay] = useState('none')
    
    const [token2, changeToken] = useState("")
  const [name, changeName] = useState("");
  const [Loadme, setLoader] = useState(true);
  const [showPreloader, changePreloader] = useState(false)  
  const [last_name, changeLastName] = useState("");
  const [email, changeEmail] = useState("");
  const [mobile_number, changeNumber] = useState("");
  const [gender, changeGender] = useState("")
  const [id, changeID] = useState("")
  const [role_id, changeRoleID] = useState("")
  const [user_type, changeUserType] = useState("")
  const [picture, changePicture] = useState("picture.jpg");
    const userDetail = useSelector(state=>state.userDetail)

const logOut = ()=> {
    localStorage.removeItem('reduxStore')
    localStorage.removeItem('token')
    changeToken("")
    dispatch({type:"UNAUTHENTICATEROUTES"})
    history.push('/login')
}
const url = BASEURL+`/user`
useEffect(() => {   
    ///storage/509/5e3816b90bb7e_cartooncenter.png
        const userToken2 = localStorage.getItem('token');
        changeToken(userToken2)
        console.log("this is theuser token", userToken2)
        sendHttpRequestWithFormDataWithObjectGet('GET', url, userToken2).then(responseData=>{      
            console.log("this is the newsData", responseData)  
            console.log("this is the newsData for the roles", responseData.roles[0].id) 
            setLoader(false)
            changeName(responseData.name)
            changeLastName(responseData.last_name)
            changeEmail(responseData.email)
            changeNumber(responseData.mobile_number)
            changeGender(responseData.gender)
            changeID(responseData.id)
            changeUserType(responseData.user_type)
            changeRoleID(responseData.roles[0].id)
           
        })
        
    }, []);



console.log("tooolbar", props.imageLink)

function handleLogOut(){
    display==='none'?changeDisplay('block'):changeDisplay('none')
}
return (<>
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle--button"><DrawerToggleButton click={props.drawerClickHandler} /></div>
            <div className="toolbar__lagos"><img src={lagos} className="left__image"/></div>
            <div className="toolbar__logo"> <Link to="/">LASRETRAD</Link></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                {props.links.map((eachLink, index, array) =>
                    <li key={eachLink.id}><Link to={eachLink.path}>{eachLink.name}</Link></li>
                       
                )}    
                </ul>
            </div>
            <div className="user__details">
                
                <img src={`https://lasretradbackend.landlordstech.com/${props.imageLink}`} className="user__image"/>
                <ul className="user__detail_list">
                    <li style={{fontSize:10}}>{props.name} {props.lastname}</li>
                    <li className="user__detail_list_small">{props.profession}</li>              
                </ul>
               
            </div>
            <div className="user__details" onClick={handleLogOut}>
               <div className="dropdown__arrow">
               <FontAwesomeIcon icon={faChevronDown} />
               </div>              
            </div>
        </nav>
        <div className="dropdown_logout" style={{display:display}}>
        <center style={{color:'white', borderBottom:'1px solid gray', paddingBottom:5}} onClick={()=>history.push('/user_profile')}>Profile</center>
        <center style={{color:'white'}} onClick={logOut}>Logout</center>
        </div>
    </header>
    </>
)
}
export default Toolbar;