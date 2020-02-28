import React,{useState, useEffect} from 'react';
import './DashboardComponent.css';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useHistory, Redirect, withRouter } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import DashTemplate from './dashtemplate';
import four from './assets/four.svg';
import two from './assets/two.svg';
import three from './assets/three.svg';
import report from './assets/report.svg';
import one from './assets/one.svg';
import userdp from './assets/userdp.svg';
import smiley from './assets/smiley.svg';
import housepencil from './assets/housepencil.svg';
import singlehouse from './assets/singlehouse.svg';
import driving from './assets/driving.svg';
import LoadingOverlay from 'react-loading-overlay';
import Loader from 'react-loader-spinner';
import MyLoader from '../../components/MyLoader';
import {sendHttpRequest, sendHttpRequestWithFormDataWithObjectGet, BASEURL, sendHttpRequestWithFormDataWithObject, sendHttpRequestWithError, sendHttpRequestWithFormDataWithoutHeaders} from '../../helpers/apiMethods';


const DashboardComponent = props => {
    let history = useHistory();
const [Detail, changeDetails] = useState({})
const [user_type, changeUserType] = useState("")
const [name, changeName] = useState("");
const [lastname, changeLastName] = useState("");
const [Loadme, setLoader] = useState(true)
const isRedirected = useSelector(state=>state.toHome)
const userDetail = useSelector(state=>state.userDetail)



const landlordInfo = [{link_name: "reg_tenancy",upper_text: "Register Tenancy",image_name: singlehouse, description: "Register Tenancy of a property",bottom_text: "Register"},
{link_name: "user_profile",upper_text: "Profile",image_name: userdp, description: "Complete your profile within 60 days",bottom_text: "Get Started"},
{link_name: "report",upper_text: "Report Tenant",image_name: smiley,description: "Report Tenant to LASRETRAD",bottom_text: "Report"},
{link_name: "lease",upper_text: "Register Sales/Leases",image_name: housepencil, description: "Register Sales/Lease of Property",bottom_text: "Register"}]


const developerInfo = [{link_name: "reg_development",upper_text: "Register Development",image_name: singlehouse,description: "Register Development of a property",bottom_text: "Register"},
{link_name: "user_profile",upper_text: "Profile",image_name: userdp, description: "Complete your profile within 60 days",bottom_text: "Get Started"},
{link_name: "",upper_text: "Licence",image_name: driving, description: "Download Temporary Licence",bottom_text: "Download"},
{link_name: "lease",upper_text: "Register Sales/Leases", image_name: housepencil, description: "Register Sales/Lease of Property",bottom_text: "Register"}]



const agentInfo = [{link_name: "reg_tenancy",upper_text: "Register Tenancy",image_name: singlehouse,description: "Register Tenancy of a property",bottom_text: "Register"},
{link_name: "user_profile" ,upper_text: "Profile",image_name: userdp, description: "Complete your profile within 60 days",bottom_text: "Get Started"},
{link_name: "",upper_text: "Licence",image_name: driving,description: "Download Temporary Licence",bottom_text: "Download"},
{link_name: "lease",upper_text: "Register Sales/Leases",image_name: housepencil, description: "Register Sales/Lease of Property",bottom_text: "Register"}]


const tenantInfo = [{link_name: "make_complaint",upper_text: "make Compliants",image_name: report, description: "Make your Complaints to LASRETRAD",bottom_text: "Make Complaints"},
{link_name: "user_profile", upper_text: "Profile",image_name: userdp, description: "Complete your Profile within 60 days",bottom_text: "Get Started"},
{link_name: "",upper_text: "Report Landlord",image_name: smiley, description: "Report Landlord to LASRETRAD",bottom_text: "Report"}]


const professionalInfo = [
{link_name: "reg_tenancy",upper_text: "Register Tenency",image_name: singlehouse, description: "Register Tenancy of a property",bottom_text: "Register"},
{link_name: "whistle_dashboard",upper_text: "Whistle Blow",image_name: report, description: "Make your Complaints to LASRETRAD",bottom_text: "Whistle Blow"},
{link_name: "user_profile",upper_text: "Profile",image_name: userdp, description: "Complete Your profile within 60 days",bottom_text: "Get Started"},
{link_name: "report",upper_text: "Report",image_name: smiley, description: "Report Landlord, developer, Tenant or Agent to LASRETRAD",bottom_text: "Report"},
{link_name: "lease",upper_text: "Register Sales/lease",image_name: housepencil,description: "Register Sales/Lease of property",bottom_text: "Register"}
]




function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

useEffect(() => {   
    var state = JSON.parse(localStorage.getItem('reduxStore'));
    const checkUser = BASEURL+'/check/license'
    changeDetails(state.userDetail)
    const userToken2 = localStorage.getItem('token');
    if(state.userDetail.user.user_type==="tenant"){
        changeUserType(state.userDetail.user.user_type)
        history.push('dashboard')
        setLoader(false)
    }
    else if(state.userDetail.user.user_type!=="tenant"){
        sendHttpRequestWithFormDataWithObjectGet('GET', checkUser, userToken2).then(responseData2=>{
            if(responseData2.hasOwnProperty('created')){
                changeUserType(state.userDetail.user.user_type)
              localStorage.setItem('invoiceDetails', JSON.stringify(responseData2.created.invoice))
              localStorage.setItem('licencePlan', JSON.stringify(responseData2.created.licence))
              setLoader(false)
              history.push('/invoice')
            }
            else if(responseData2.hasOwnProperty('success')){
                console.log("it was successful_______________")
                console.log("this is the user type",state.userDetail.user.user_type)
                changeUserType(state.userDetail.user.user_type)
                changeName(state.userDetail.user.name)
                changeLastName(state.userDetail.user.last_name)
             setLoader(false)
              history.push('/dashboard')
             
            }
            else if(responseData2.hasOwnProperty('error')){
                changeUserType(state.userDetail.user.user_type)
                setLoader(false)
              history.push('/licence')
              
            }
          })  
    }

    // else if(!state.userDetail.user.license_expire_time){
    //     history.push('/licence')
    // }
    else if(userToken2==null || userToken2=="" || state.userDetail=={}){
      history.push('/login')
    }
    else if(userToken2!=null || userToken2!="" || state.userDetail!={}){
        changeUserType(state.userDetail.user.user_type)
        changeName(state.userDetail.user.name)
        changeLastName(state.userDetail.user.last_name)
    }
    else{
        history.push('dashboard')
    }
      
  }, []);
function showLoader(width, height){

    return (
        <Loader
        type="Watch"
        color="#072455"
        visible={true}
        height={width}
        width={height}
        />
)
}

  
return (
    <>

<MyLoader loadme={Loadme}/>

    <DashboardLayout name={name} lastname={lastname} user_type={user_type} showLoader={showLoader} >
        {/* <DashTemplate cardGenerator = {landlordInfo}/>
        <DashTemplate cardGenerator = {landlordInfo}/> */}
    {user_type =="tenant" &&
        <DashTemplate cardGenerator = {tenantInfo} name={name} lastname={lastname} showLoader={showLoader}/>
    }
    {user_type =="professional" &&
        <DashTemplate cardGenerator = {professionalInfo} name={name} lastname={lastname} showLoader={showLoader}/>
    }
    {user_type =="landlord" &&
        <DashTemplate cardGenerator = {landlordInfo} name={name} lastname={lastname} showLoader={showLoader} />
    }
    {user_type =="property_agent" &&
        <DashTemplate cardGenerator = {agentInfo} name={name} lastname={lastname} showLoader={showLoader()}/>
    }
    {user_type =="developer" &&
        <DashTemplate cardGenerator = {developerInfo} name={name} lastname={lastname} showLoader={showLoader()}/>
    }
    </DashboardLayout>
    
    </>
)

}
export default withRouter(DashboardComponent);
//the sidebar is independent of the toolbar, so we add it alongside app.js