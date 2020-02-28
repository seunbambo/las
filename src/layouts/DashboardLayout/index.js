import React from "react";
import ClientLayout from "../../components/navigationBar/index";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
//since backdrop is another seperate component we import backdrop here
import Backdrop from "./BackDrop/Backdrop";
import {
  sendHttpRequest,
  sendHttpRequestWithFormDataWithObjectGet,
  BASEURL,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import {
  NavLink,
  Route,
  Link,
  withRouter,
  BrowserRouter as Router
} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import MyLoader from "../../components/MyLoader";
import { useSelector, useDispatch } from "react-redux";
import "./app.css";
import back from "../ClientLayout/back.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    sideDrawerOpen: false,
    Loadme: true,
    userDetails: {},
    id: "",
    imageLink: ""
  };

  drawerToggleClickHandler = () => {
    //since we need to access the previous state we do it like this
    //here we will recieve the previous state as an argument
    this.setState(prevState => {
      //you now return an object which updates the state
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount() {
    const url = BASEURL + `/user`;

    var mystate = JSON.parse(localStorage.getItem("reduxStore"));
    const userToken2 = localStorage.getItem("token");

    sendHttpRequestWithFormDataWithObjectGet("GET", url, userToken2).then(
      responseData => {
        console.log("fkfkfkf", responseData);

        // const users={
        //   user:responseData
        // }
        // console.log("this is the responsef data", users)
        // this.setState({userDetails: responseData})

        // console.log("this is the userz token", userToken2)
        // console.log("this is the current statess", mystate)
        if (
          userToken2 == null ||
          userToken2 == "" ||
          mystate.userDetail == {}
        ) {
          this.props.history.push("/login");
        } else if (
          userToken2 !== null ||
          userToken2 !== "" ||
          mystate.userDetail !== {}
        ) {
          console.log("this is the users details", mystate.userDetail.user);

          const checkUser = BASEURL + "/check/license";
          // this.setState({userDetails: mystate.userDetail.user})
          this.setState({ userDetails: responseData });

          sendHttpRequestWithFormDataWithObjectGet(
            "GET",
            checkUser,
            userToken2
          ).then(responseData2 => {
            console.log("this dddddddd", responseData2);
            if (responseData2.hasOwnProperty("created")) {
              console.log("this is the responseData22222", responseData2);
              localStorage.setItem(
                "invoiceDetails",
                JSON.stringify(responseData2.created.invoice)
              );
              localStorage.setItem(
                "licencePlan",
                JSON.stringify(responseData2.created.licence)
              );
              this.props.history.push("/invoice");
            } else if (responseData2.hasOwnProperty("success")) {
              console.log("this is the success responsta22222", responseData2);
              // this.props.history.push('/dashboard')
            } else if (
              responseData2.hasOwnProperty("error") &&
              mystate.userDetail.user.user_type !== "tenant"
            ) {
              this.props.history.push("/licence");
            }
          });
        }
      }
    );
  }

  render() {
    let links = [
      { name: "dashboard", path: "/dashboard", id: 1 },
      { name: "registered tenency", path: "/tenancies_listings", id: 2 },
      { name: "Get/Renew Licence", path: "/licence", id: 3 },
      // {name:"Messages", path:"/messages", id:4},
      { name: "Registered Property Lease", path: "/lease_listing", id: 5 }
    ];
    let links_developer = [
      { name: "dashboard", path: "/dashboard", id: 1 },
      { name: "registered developments", path: "/development_listing", id: 2 },
      { name: "Get/Renew Licence", path: "/licence", id: 3 },
      // {name:"Messages", path:"/messages", id:4},
      { name: "Registered Property Lease", path: "/lease_listing", id: 5 }
    ];
    let links_tenant = [
      { name: "dashboard", path: "/dashboard", id: 1 }
      // {name:"Messages", path:"/messages", id:4},
    ];
    //let sideDrawer;
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backdropClickHandler} />;
    }
    console.log("Imadfe", this.imageLink);
    return (
      <>
        {/* {this.props.children} */}
        <ClientLayout
          showRoundFooter={this.props.showRoundFooter}
          showBackgroundImage={this.props.showBackgroundImage}
          showFooter={false}
        >
          <div
            style={{
              height: this.props.Height,
              backgroundImage: `url(${back})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: 160
            }}
          >
            {/* {this.props.children} */}
          </div>

          <div style={{ height: "100%" }}>
            {this.state.userDetails.user_type === "landlord" && (
              <>
                <Toolbar
                  imageLink={this.state.userDetails.picture.url}
                  drawerClickHandler={this.drawerToggleClickHandler}
                  links={links}
                  name={this.state.userDetails.name}
                  lastname={this.state.userDetails.last_name}
                  profession={this.state.userDetails.user_type}
                />
                <SideDrawer show={this.state.sideDrawerOpen} links={links} />
              </>
            )}
            {this.state.userDetails.user_type === "developer" && (
              <>
                <Toolbar
                  imageLink={this.state.userDetails.picture.url}
                  drawerClickHandler={this.drawerToggleClickHandler}
                  links={links_developer}
                  name={this.state.userDetails.name}
                  lastname={this.state.userDetails.last_name}
                  profession={this.state.userDetails.user_type}
                />
                <SideDrawer
                  show={this.state.sideDrawerOpen}
                  links={links_developer}
                />
              </>
            )}
            {this.state.userDetails.user_type === "professional" && (
              <>
                <Toolbar
                  imageLink={this.state.userDetails.picture.url}
                  drawerClickHandler={this.drawerToggleClickHandler}
                  links={links}
                  name={this.state.userDetails.name}
                  lastname={this.state.userDetails.last_name}
                  profession={this.state.userDetails.user_type}
                />
                <SideDrawer show={this.state.sideDrawerOpen} links={links} />
              </>
            )}
            {this.state.userDetails.user_type === "property_agent" && (
              <>
                <Toolbar
                  imageLink={this.state.userDetails.picture.url}
                  drawerClickHandler={this.drawerToggleClickHandler}
                  links={links}
                  name={this.state.userDetails.name}
                  lastname={this.state.userDetails.last_name}
                  profession="Property Agent"
                />
                <SideDrawer show={this.state.sideDrawerOpen} links={links} />
              </>
            )}
            {this.state.userDetails.user_type === "tenant" && (
              <>
                <Toolbar
                  imageLink={this.state.userDetails.picture.url}
                  drawerClickHandler={this.drawerToggleClickHandler}
                  links={links_tenant}
                  name={this.state.userDetails.name}
                  lastname={this.state.userDetails.last_name}
                  profession={this.state.userDetails.user_type}
                />
                <SideDrawer
                  show={this.state.sideDrawerOpen}
                  links={links_tenant}
                />
              </>
            )}

            {backDrop}
            <main className="main">{this.props.children}</main>
          </div>
        </ClientLayout>
      </>
    );
  }
}

export default withRouter(App);
// the logic is that the hambuger button should open the sidebar, and clicking on the backdrop should close it
