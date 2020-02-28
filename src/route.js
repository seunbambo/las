import React,{Component} from 'react';

import GetRenewLicence from '../src/pages/GetRenewLicence/GetRenewLicence';
import HomePage from '../src/pages/HomePage';
import InvoicePage from '../src/pages/InvoicePage';
import PayLicencePage from '../src/pages/PayLicence';
import PaymentSuccessfulScreen from '../src/pages/PaymentSuccessfulScreen';
import DirectoryListing from '../src/pages/DirectoryListing/DirectoryListing'
import WhistleBlowing from '../src/pages/WhistleBlowing/WhistleBlowing';
import ComplaintAndPetition from '../src/pages/ComplaintAndPetition/ComplaintAndPetition';
import Education from '../src/pages/Education/Education';
import CategorySelection from '../src/pages/CategorySelection';
import NewsAndEventScreen from '../src/pages/NewsAndEventScreen/NewsAndEventScreen';
import RulesAndRegulationScreen from '../src/pages/RulesAndRegulationScreen/RulesAndRegulationScreen'
import LoginForm from '../src/pages/LoginForm';
import RegistrationForm from '../src/pages/RegistrationForm';
import InformationAndDataAnalysis from '../src/pages/InformationAndDataAnalysis/InformationAndDataAnalysis';
import RegisterSalesAndLeases from '../src/pages/RegisterSalesAndLeases';
import ProfessionalRegistration from '../src/pages/ProfessionalRegistrationForm';
import RegistrationSuccessful from '../src/pages/RegistrationSuccessful';
import ReportTenant from '../src/pages/ReportTenant';
import DeveloperRegistration from '../src/pages/DeveloperRegistration';
import TenantRegistrationForm from '../src/pages/TenantRegistrationForm';
import MakeComplaint from '../src/pages/ComplaintsDashboard';
// dashboard components
import AgentRegistration from '../src/pages/AgentRegistration';
import DashboardComponent from '../src/pages/DashboardComponent/DashboardComponent';
import FormComponent from '../src/pages/FormComponent/FormComponent';
import SorryPage from '../src/pages/SorryPage';
import WhistleBlowingDashboard from '../src/pages/WhistleBlowiingDashboard';
import RegisterDevelopment from '../src/pages/RegisterDevelopment'
import RegisterTenancy from '../src/pages/RegisterTenancy'
import SinglePage from '../src/pages/SingleReadPage';
import SingleEducation from '../src/pages/SingleEducation';
import ListingPage from '../src/pages/RegisteredDirectoryListing';
import RegisteredPropertyLeaseListing from '../src/pages/RegisteredPropertyLeaseListing'
import UserProfile from '../src/pages/UserProfile'
import SuccessfulPaymentPage from '../src/pages/SuccessfulPaymentPage'
import Messages from '../src/pages/Messages';
import App from './App';
import { Redirect, Route, Link, HashRouter as Router } from 'react-router-dom'
import RegisteredDevelopments from './pages/RegisteredDevelopments';
import ForgotPassword from './pages/ForgetPassword';
import Forgot from './pages/Forgot';
import ComplaintSuccess from '../src/pages/ComplaintSuccess';
import ScheduleSuccess from '../src/pages/ScheduleSuccess';
import SuccessfulDashboard from '../src/pages/SuccessDashboard';
import PasswordResetScreen from '../src/pages/PasswordResetSuccess';
import AboutUs from '../src/pages/AboutUs';
import UserVerification from '../src/pages/UserVerification';
import UploadSuccess from '../src/pages/UserProfileSuccess';
import AboutLagos from '../src/pages/AboutLagos';


export const Routing = (
  <Router>    
    <Route exact path="/" component={HomePage} />
    <Route exact path="/home" component={HomePage}/>
    <Route path="/index.html" component={HomePage} />
    <Route exact path="/licence" component={GetRenewLicence} />
    <Route exact path="/invoice" component={InvoicePage} />
    <Route exact path="/paylicence" component={PayLicencePage} />
    <Route exact path="/successfulpayment" component={PaymentSuccessfulScreen} />
    <Route exact path="/directory" component={DirectoryListing} />
    <Route exact path="/whistle_blowing" component={WhistleBlowing} />
    <Route exact path="/complaintandpetition" component={ComplaintAndPetition} />
    <Route exact path="/education" component={Education} />
    <Route exact path="/information" component={InformationAndDataAnalysis} />
    <Route exact path="/category" component={CategorySelection} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/rules" component={RulesAndRegulationScreen} />
    <Route exact path="/news" component={NewsAndEventScreen} />
    <Route exact path="/dashboard" component={DashboardComponent} />
    <Route exact path="/form" component={FormComponent} />
    <Route exact path="/sorry" component={SorryPage} />
    <Route exact path='/registration/landlords' component={RegistrationForm} />
    <Route exact path='/registration/developer' component={DeveloperRegistration} />
    <Route exact path='/registration/tenant' component={TenantRegistrationForm} />
    <Route exact path='/registration/professional' component={ProfessionalRegistration} />
    <Route exact path='/registration/agent' component={AgentRegistration} />
    <Route exact path="/lease" component={RegisterSalesAndLeases} />
    <Route exact path="/regsuccess" component={RegistrationSuccessful} />
    <Route exact path="/make_complaint" component={MakeComplaint} />
    <Route exact path="/report" component={ReportTenant} />
    <Route exact path="/whistle_dashboard" component={WhistleBlowingDashboard} />
    <Route exact path="/reg_development" component={RegisterDevelopment} />    
    <Route exact path="/reg_tenancy" component={RegisterTenancy} />
    <Route exact path="/news/:id" component={SinglePage} />
    <Route exact path="/education/:id" component={SingleEducation} />
    <Route exact path="/tenancies_listings" component = {ListingPage} />
    <Route exact path="/lease_listing" component={RegisteredPropertyLeaseListing} />
    <Route exact path="/development_listing" component={RegisteredDevelopments} /> 
    <Route exact path="/user_profile" component={UserProfile} />   
    <Route exact path="/success_invoice/:id" component={SuccessfulPaymentPage} />
    <Route exact path="/success_page/:id" component={SuccessfulDashboard} />
    <Route exact path="/messages" component={Messages} />
    <Route exact path="/forgot_password" component={ForgotPassword} />
    <Route exact path="/reset_password" component={ForgotPassword} />
    <Route exact path="/forgot" component={Forgot} />
    <Route exact path="/complaint_success" component={ComplaintSuccess} />
    <Route exact path="/password_reset_success" component={PasswordResetScreen} />
    <Route exact path="/schedule_success" component={ScheduleSuccess} />
    <Route exact path="/about_us" component={AboutUs} />
    <Route exact path="/user_verification" component={UserVerification} />
    <Route exact path="/upload_success" component={UploadSuccess} />
    <Route exact path="/about_lagos" component={AboutLagos} />
  </Router>
)