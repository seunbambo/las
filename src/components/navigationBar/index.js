import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, styled } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import FolderIcon from "@material-ui/icons/Folder";
import CommentIcon from "@material-ui/icons/Comment";
import TimelineIcon from "@material-ui/icons/Timeline";
import SportsIcon from "@material-ui/icons/Sports";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import HelpIcon from "@material-ui/icons/Help";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Tenancy from "./tenancy.pdf";
// import Link from '@material-ui/core/Link';
import {
  sendHttpRequest,
  sendHttpRequestNoJSON
} from "../../helpers/apiMethods";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import CloudDownload from "@material-ui/icons/CloudDownload";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import images from "./index.jpg";
import rightImage from "./right.png";
import topRight from "./topright2.jpg";

import tower from "./tower.jpg";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "./homeiconright.png";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink,
  Route,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import "./navStyles.css";
import { resetState } from "redux-localstore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tower1 from "./tower.jpg";
import tower2 from "./tower.jpg";
import tower3 from "./tower.jpg";
import {
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";

const drawerWidth = 240;
const primary = grey[50]; // #F44336

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  bgImage: {
    position: "absolute",
    content: "",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },

  hide: {
    display: "none"
  },

  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  roundedFooter: {
    width: "70%",
    backgroundColor: "transparent",
    float: "right",
    height: 100,
    right: 0,
    bottom: 66,
    borderTopLeftRadius: 14,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  pTex: {
    fontSize: 14,
    textAlign: "left",
    lineHeight: 1,
    cursor: "pointer",
    fontFamily: "Montserrat"
    // fontWeight:'bold'
  },
  rounder: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  // AdobeClean-Bold, AdobeClean-Light, Montserrat
  menuBtns: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    textDecoration: "none",
    color: "#00ffcb",
    textAlign: "center",
    fontSize: 35,
    height: 50,
    marginTop: 5,
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
      textAlign: "right"
    }
  },
  linkbtn: {
    cursor: "pointer",
    textDecoration: "none",
    float: "left",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  downloadButton: {
    borderColor: "white",
    marginRight: theme.spacing(2),
    color: "white",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    fontSize: 13,
    padding: "7px 20px 7px",
    display: "none",
    marginLeft: 6,
    borderRadius: 2,
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  downloadButtonSearch: {
    borderColor: "white",
    marginRight: theme.spacing(2),
    color: "white",
    border: "1px solid #7e8093",
    borderRadius: 2,
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    fontSize: 13,
    width: "50px",
    marginLeft: 1,
    padding: "7px 20px 7px 20px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  downloadButton2: {
    borderColor: "white",
    marginRight: theme.spacing(2),
    color: "white",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    fontSize: 12,
    padding: "7px 20px 7px 20px",
    width: 130,
    borderRadius: 2,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },

  downloadButtonWhite: {
    display: "none",
    fontFamily: "Montserrat",
    textTransform: "capitalize",
    padding: "8px 20px 8px 20px",
    width: 130,
    borderRadius: 2,
    marginRight: "3%",
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    backgroundColor: "white",
    fontSize: 13,
    borderColor: "white",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  titles: {
    fontFamily: "Montserrat",
    fontWeight: "bold"
  },
  usefulLinks: {
    textDecoration: "none",
    textDecorationColor: "black",
    color: "black"
  },
  footer: {
    backgroundColor: "white",
    paddingTop: 70,
    paddingBottom: 50
  },
  toolbar: {
    border: "1px solid #5b637f",
    borderLeft: "none",
    borderRight: "none",
    width: "100%",
    borderTop: "1px solid #383e5e",
    justifyContent: "space-between",
    fontFamily: "Montserrat",
    margin: "auto",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inherit"
    }
  },

  rightImage: {
    borderRadius: 4,
    width: 60,
    height: 60,
    marginLeft: "3%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  // 00ffcb
  menuItems: {
    fontSize: 13,
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  contentContainer: {
    marginTop: 100,
    paddingRight: 0,
    paddingLeft: 14,

    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
      paddingLeft: 7
    }
  },
  linkConfig: {
    textDecoration: "none",
    color: "#0768ab"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function ClientLayout(props) {
  let history = useHistory();
  const dispatch = useDispatch(); //we use it to pass an action, by specifying the action Type
  const isLoading = useSelector(state => state.loading);
  const toHome = useSelector(state => state.toHome);

  //lastNewsImageImage secondLastNewsImage
  const [secondLastNewsImage, setSecondLastNewsImage] = useState("");
  const [token2, changeToken] = useState("");
  const [lastNewsImageImage, setLastNewsImage] = useState("");
  const [lastEducation, setEducation] = useState([]);
  const [educationImage, setEducationImage] = useState("");
  const [allNews, setNews] = useState([]);
  const [lastNews, setLastNews] = useState({});
  const [secondLastNews, setSecondLastNews] = useState({});

  const [navBackground, setNavBackground] = useState("rgba(0,0,0,.2)");

  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const urlNews = BASEURL + "/news-events";
  const urlEdu = BASEURL + "/education";

  useEffect(() => {
    //console.log("this is the current scroll positon",window.pageYOffset)
    const userToken2 = localStorage.getItem("token");
    changeToken(userToken2);
    const handleScroll = () => {
      //console.log("current position of scroll", window.pageYOffset)
      if (window.pageYOffset > 100) {
        setNavBackground("#072455");
      } else if (window.pageYOffset < 100) {
        setNavBackground("rgba(0,0,0,.2)");
      }
    };

    // get news
    sendHttpRequestWithError("GET", urlNews).then(responseData => {
      if (
        responseData.data != null ||
        responseData.data != undefined ||
        responseData.data != []
      ) {
        setLastNews(responseData.data[responseData.data.length - 1]);
        console.log(
          "this is the last news image",
          responseData.data[responseData.data.length - 1].image[0]
        );
        if (
          responseData.data[responseData.data.length - 1].image[0] !== undefined
        ) {
          setLastNewsImage(
            responseData.data[responseData.data.length - 1].image[0].url
          );
        }

        setSecondLastNews(responseData.data[responseData.data.length - 2]);
        setSecondLastNewsImage(
          responseData.data[responseData.data.length - 2].image[0].url
        );
        console.log(
          "last record",
          responseData.data[responseData.data.length - 1]
        );
        // console.log("second to the last", responseData.data[responseData.data.length-2])
        // console.log("this is the newsData",responseData.data)
      } else {
        setLastNews(null);
      }
    });
    sendHttpRequestWithError("GET", urlEdu).then(responseData => {
      console.log("this is the education", responseData.data);
      if (
        responseData.data != null ||
        responseData.data != undefined ||
        responseData.data != []
      ) {
        setEducation(responseData.data[responseData.data.length - 1]);

        setEducationImage(
          responseData.data[responseData.data.length - 1].image[0].url
        );
      } else {
        setEducation(null);
      }
    });

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const imageName = props.showBackgroundImage ? tower : false;

  //userToken

  const sideBarArray = [
    { name: "Education", link: "/education" },
    { name: "FAQ", link: "/rules" },
    { name: "News & Events", link: "/news" },
    { name: "Login", link: "/login" },
    { name: "Register", link: "/category" }
  ];

  const sideBarArrayLoggedIn = [
    { name: "Education", link: "/education" },
    { name: "FAQ", link: "/rules" },
    { name: "News & Events", link: "/news" },
    { name: "Dashboard", link: "/dashboard" }
  ];

  const showSidebar = token2 ? sideBarArrayLoggedIn : sideBarArray;
  const showLogOut = token2 ? (
    <div>
      {" "}
      <ListItem button onClick={() => logOut()}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  ) : null;

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          { name: "Directory", link: "/directory" },
          { name: "Complaint & Petition", link: "/complaintandpetition" },
          { name: "Information & Data Analysis", link: "/information" },
          { name: "Whistle Blowing", link: "/whistle_blowing" }
        ].map((text, index) => (
          <Link className={classes.linkConfig} to={text.link}>
            <ListItem button key={text.name}>
              {/* var x = (day == "yes") ? "Good Day!" : (day == "no") ? "Good Night!" : ""; */}
              <ListItemIcon>
                {index === 0 ? (
                  <FolderIcon />
                ) : index == 1 ? (
                  <CommentIcon />
                ) : index == 2 ? (
                  <TimelineIcon />
                ) : index == 3 ? (
                  <SportsIcon />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* import AnnouncementIcon from '@material-ui/icons/Announcement';
import DashboardIcon from '@material-ui/icons/Dashboard';*/}
      <Divider />
      <List>
        {showSidebar.map((text, index) => (
          <Link className={classes.linkConfig} to={text.link}>
            <ListItem button key={text.name}>
              <ListItemIcon>
                {index == 0 ? (
                  <CastForEducationIcon />
                ) : index == 1 ? (
                  <HelpIcon />
                ) : index == 2 ? (
                  <AnnouncementIcon />
                ) : index == 3 ? (
                  <DashboardIcon />
                ) : index == 4 ? (
                  <LockOpenIcon />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          </Link>
        ))}
        {token2 && <center>{showLogOut}</center>}
      </List>
    </div>
  );

  const userToken = localStorage.getItem("token");
  //console.log(userToken)
  const notify = message => toast(message);

  const logOut = () => {
    localStorage.removeItem("reduxStore");
    localStorage.removeItem("token");
    changeToken("");
    dispatch({ type: "UNAUTHENTICATEROUTES" });

    const getUrl = BASEURL + "/logout";
    //   sendHttpRequestNoJSON('GET', getUrl).then(responseData => {
    //     //console.log("logOut response data",responseData);
    //     if(responseData!="error"){
    //       window.localStorage.clear();
    //       localStorage.removeItem('reduxStore')
    //       //console.log("this is the response data",responseData)
    //       dispatch({type:"STOPLOADER"})
    //       notify("Logout Successful")
    //       //console.log("loggedOut successfully")
    //       history.push("/")
    //     }
    //     else{
    //       localStorage.removeItem('reduxStore')
    //   localStorage.removeItem('token')
    //   dispatch({type:"UNAUTHENTICATEROUTES"})

    //       notify("LogOut Not successful",{type: toast.TYPE.INFO})
    //       dispatch({type:"STOPLOADER"})
    //     }
    // })
  };

  const gotoDashboard = () => {
    history.push("/dashboard");
  };

  const downloadForm = () => {
    window.open(Tenancy);
  };
  const truncator = str => {
    if (str != undefined) {
      return str.substr(0, 25) + "...";
    } else return;
  };

  const gotoPage = link => {
    history.push(`/${link}`);
  };
  const lastImage =
    lastNewsImageImage === ""
      ? tower1
      : `https://lasretradbackend.landlordstech.com/${lastNewsImageImage}`;
  console.log("this is the current state of the last image", lastImage);

  return (
    <>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>

      <div
        style={{
          backgroundImage: `url(${imageName})`,
          height: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{
            background: props.showBackgroundImage
              ? "rgb(4,81,153,0.3)"
              : "#072455"
          }}
        >
          <div
            className={classes.bgImage}
            style={{
              background: navBackground,
              transition: "background-color 500ms linear"
            }}
          ></div>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <img
              alt="Lasretrad"
              src={images}
              style={{
                borderRadius: 4,
                marginRight: "4%",
                width: 60,
                height: 60
              }}
            />

            <Button
              onClick={downloadForm}
              className={classes.downloadButton}
              startIcon={<CloudDownload />}
              variant="outlined"
              color={primary}
            >
              Tenancy Form
            </Button>
            <Link to="directory" className={classes.linkbtn}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // onClick={handleDrawerOpen}
                edge="start"
                className={classes.downloadButtonSearch}
              >
                <SearchIcon />
              </IconButton>
            </Link>

            <Link to="/" className={classes.title}>
              <Typography className={classes.title} variant="h3" noWrap>
                LASRETRAD
              </Typography>{" "}
            </Link>

            {!userToken && (
              <div>
                <Link to="/category" className={classes.linkbtn}>
                  <Button
                    variant="outlined"
                    color={primary}
                    className={classes.downloadButton2}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login" className={classes.linkbtn}>
                  <Button
                    variant="contained"
                    className={classes.downloadButtonWhite}
                    color={primary}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            )}
            {userToken && (
              <div>
                <IconButton
                  color="inherit"
                  style={{
                    border: "1px solid white",
                    borderRadius: 2,
                    padding: 5,
                    float: "left",
                    marginRight: 30
                  }}
                  aria-label="open drawer"
                  onClick={gotoDashboard}
                  edge="start"
                  className={classes.downloadButton}
                >
                  <AccountCircleIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  style={{
                    border: "1px solid white",
                    float: "left",
                    borderRadius: 2,
                    padding: 5
                  }}
                  aria-label="open drawer"
                  onClick={logOut}
                  edge="start"
                  className={classes.downloadButton}
                >
                  <PowerSettingsNewIcon />
                </IconButton>
              </div>
            )}
            <img
              alt="Lasretrad"
              src={topRight}
              className={classes.rightImage}
            />
          </Toolbar>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/directory"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Directory
              </NavLink>
            </Typography>

            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/licence"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Get & Renew Licence
              </NavLink>
            </Typography>

            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/category"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Registration
              </NavLink>
            </Typography>

            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/complaintandpetition"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Complaint & Petition
              </NavLink>
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/information"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Information & Data Analysis
              </NavLink>
            </Typography>

            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/whistle_blowing"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Whistle Blowing
              </NavLink>
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/education"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                Education
              </NavLink>
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/rules"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                FAQ
              </NavLink>
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.menuItems}
              noWrap
            >
              <NavLink
                to="/news"
                activeStyle={{ fontWeight: "bold" }}
                style={{
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white"
                }}
              >
                News & Events
              </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.drawerHeader} />
        <main>
          <Container className={classes.contentContainer}>
            {props.children}
          </Container>

          {props.showRoundFooter && (
            <Grid container className={classes.rounder}>
              <Grid
                item
                md={4}
                style={{ backgroundColor: "transparent", height: 100 }}
              ></Grid>
              <Grid
                item
                md={8}
                style={{
                  backgroundColor: "white",
                  height: 100,
                  borderTopLeftRadius: 14,
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {lastNews === null && (
                  <div style={{ flex: 1 }}>
                    <Avatar
                      alt="Lasretrad"
                      src={tower1}
                      style={{
                        fontFamily: "Montserrat",
                        float: "left",
                        borderRadius: 2,
                        width: 80,
                        height: 80,
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    />
                    <div
                      style={{
                        float: "left",
                        marginRight: 5,
                        fontFamily: "Montserrat",
                        color: "#2a2e43"
                      }}
                    >
                      <ul style={{ listStyle: "none", marginLeft: -30 }}>
                        <li style={{ opacity: 0.56 }}>Education</li>
                        <li style={{ fontWeight: "600" }}>
                          Ministry of Housing
                        </li>
                        <li>LASRETRAD Aug 2019</li>
                      </ul>
                    </div>
                  </div>
                )}
                {/* //lastNewsImageImage secondLastNewsImage */}
                {lastNews !== null && (
                  <Link to={`news/${lastNews.id}`}>
                    <div style={{ flex: 1 }}>
                      <Avatar
                        alt="Lasretrad"
                        src={`${lastImage}`}
                        style={{
                          fontFamily: "Montserrat",
                          float: "left",
                          borderRadius: 2,
                          width: 80,
                          height: 80,
                          paddingTop: 10,
                          paddingLeft: 10
                        }}
                      />
                      <div
                        style={{
                          float: "left",
                          marginRight: 5,
                          fontFamily: "Montserrat",
                          color: "#2a2e43"
                        }}
                      >
                        <ul style={{ listStyle: "none", marginLeft: -30 }}>
                          <li style={{ opacity: 0.56, fontSize: 11 }}>News</li>
                          <li style={{ fontWeight: "600", fontSize: 11 }}>
                            {truncator(lastNews.title)}
                          </li>
                          <li>LASRETRAD</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                )}

                {secondLastNews === null && (
                  <div style={{ flex: 1 }}>
                    <Avatar
                      alt="Lasretrad"
                      src={tower2}
                      style={{
                        float: "left",
                        borderRadius: 2,
                        width: 80,
                        height: 80,
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    />
                    <div
                      style={{
                        float: "left",
                        marginRight: 5,
                        fontFamily: "Montserrat"
                      }}
                    >
                      <ul style={{ listStyle: "none", marginLeft: -30 }}>
                        <li style={{ opacity: 0.56 }}>Agent</li>
                        <li style={{ fontWeight: "600" }}>
                          Ministry of Housing
                        </li>
                        <li>LASRETRAD Aug 2014</li>
                      </ul>
                    </div>
                  </div>
                )}

                {secondLastNews != null && (
                  <Link to={`news/${secondLastNews.id}`}>
                    <div style={{ flex: 1 }}>
                      <Avatar
                        alt="Lasretrad"
                        src={`https://lasretradbackend.landlordstech.com/${secondLastNewsImage}`}
                        style={{
                          float: "left",
                          borderRadius: 2,
                          width: 80,
                          height: 80,
                          paddingTop: 10,
                          paddingLeft: 10
                        }}
                      />
                      <div
                        style={{
                          float: "left",
                          marginRight: 5,
                          fontFamily: "Montserrat",
                          color: "#2a2e43"
                        }}
                      >
                        <ul style={{ listStyle: "none", marginLeft: -30 }}>
                          <li style={{ opacity: 0.56, fontSize: 11 }}>News</li>
                          <li style={{ fontWeight: "600", fontSize: 11 }}>
                            {truncator(secondLastNews.title)}
                          </li>
                          <li>LASRETRAD</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                )}
                {lastEducation === null && (
                  <div style={{ flex: 1 }}>
                    <Avatar
                      alt="Lasretrad"
                      src={tower3}
                      style={{
                        float: "left",
                        borderRadius: 2,
                        width: 80,
                        height: 80,
                        paddingTop: 10,
                        paddingLeft: 10
                      }}
                    />
                    <div style={{ float: "left", fontFamily: "Montserrat" }}>
                      <ul style={{ listStyle: "none", marginLeft: -30 }}>
                        <li style={{ opacity: 0.56 }}>Developer</li>
                        <li style={{ fontWeight: "600" }}>
                          Ministry of Housing
                        </li>
                        <li>LASRETRAD Aug 2014</li>
                      </ul>
                    </div>
                  </div>
                )}
                {lastEducation != null && (
                  <Link to={`education/${lastEducation.id}`}>
                    <div style={{ flex: 1 }}>
                      <Avatar
                        alt="Lasretrad"
                        src={`https://lasretradbackend.landlordstech.com/${educationImage}`}
                        style={{
                          float: "left",
                          borderRadius: 2,
                          width: 80,
                          height: 80,
                          paddingTop: 10,
                          paddingLeft: 10
                        }}
                      />
                      <div
                        style={{
                          float: "left",
                          fontFamily: "Montserrat",
                          color: "#2a2e43"
                        }}
                      >
                        <ul style={{ listStyle: "none", marginLeft: -30 }}>
                          <li style={{ opacity: 0.56, fontSize: 11 }}>
                            Education
                          </li>
                          <li style={{ fontWeight: "600", fontSize: 11 }}>
                            {truncator(lastEducation.title)}
                          </li>
                          <li>LASRETRAD</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                )}
              </Grid>
            </Grid>
          )}
        </main>

        {/* Footer */}

        {/* End footer */}
      </div>

      {props.showFooter && (
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  gutterBottom
                  className={classes.titles}
                >
                  LASRETRAD
                </Typography>
                <p className={classes.pTex}>
                  Lagos State Real Estate Transaction Department
                </p>
                <p className={classes.pTex}>Block 21, 1st floor, room 119</p>
                <p className={classes.pTex}>The secretariat</p>
                <p className={classes.pTex}>Alausa Ikeja</p>
                <p className={classes.pTex}>Lagos</p>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  gutterBottom
                  className={classes.titles}
                >
                  Company
                </Typography>
                <p
                  className={classes.pTex}
                  onClick={() => gotoPage("about_us")}
                >
                  About Us
                </p>
                <p
                  className={classes.pTex}
                  onClick={() => gotoPage("about_lagos")}
                >
                  About Lagos
                </p>
                <p className={classes.pTex} onClick={() => gotoPage("rules")}>
                  FAQ
                </p>
                <p className={classes.pTex} onClick={() => gotoPage("news")}>
                  Latest News
                </p>
                <p className={classes.pTex}>
                  <a
                    href="mailto:info@Lasretrad.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </p>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  gutterBottom
                  className={classes.titles}
                >
                  Useful Links
                </Typography>

                <p className={classes.pTex}>
                  <a
                    className={classes.usefulLinks}
                    target="_blank"
                    href="https://lagosstate.gov.ng/"
                  >
                    Lagos State Government
                  </a>
                </p>

                <p className={classes.pTex}>
                  <a
                    className={classes.usefulLinks}
                    target="_blank"
                    href="https://lagoswater.org/"
                  >
                    Lagos Water Corporation
                  </a>
                </p>

                <p className={classes.pTex}>
                  <a
                    className={classes.usefulLinks}
                    target="_blank"
                    href="https://www.lagosresidents.gov.ng/"
                  >
                    LASRRA
                  </a>
                </p>

                <p className={classes.pTex}>
                  <a
                    className={classes.usefulLinks}
                    target="_blank"
                    href="https://www.lawma.gov.ng/"
                  >
                    LAWMA
                  </a>
                </p>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  gutterBottom
                  className={classes.titles}
                >
                  Support
                </Typography>
                <p className={classes.pTex}>
                  +234(09019999977 or 09013333331).
                </p>
                <p className={classes.pTex}>info@Lasretrad.com</p>
                <p className={classes.pTex}>Terms of Service</p>
                <p className={classes.pTex}>Privacy Policy</p>
              </Grid>
            </Grid>
          </Container>
        </footer>
      )}
    </>
  );
}
