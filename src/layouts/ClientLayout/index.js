import React from "react";
import ClientLayout from "../../components/navigationBar/index";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import tower from "./index.jpg";
import tower1 from "./download.jpg";
import tower2 from "./downloadd.jpg";
import tower3 from "./downloadh.jpg";
import back from "./back.svg";

import { useHistory } from "react-router-dom";
// import ExampleComponent from 'theoderic_content'

const useStyles = makeStyles(theme => ({
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
    color: "white",
    textAlign: "left",
    fontSize: 35,
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20
    }
  },
  description: {
    flexGrow: 1,
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    fontSize: 15,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      paddingTop: 25
    }
  },
  downloadButton: {
    borderColor: "white",
    marginRight: theme.spacing(2),
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit"
    }
  },
  roundedFooter: {
    width: "100%",
    backgroundColor: "red",
    height: 100,
    right: 0,
    borderTopLeftRadius: 14,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  homeContainer: {
    width: "40%",
    marginLeft: "7%",
    marginTop: 100,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: "100px"
    }
  }
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <>
      <ClientLayout
        showRoundFooter={props.showRoundFooter}
        showBackgroundImage={props.showBackgroundImage}
        showFooter={props.showFooter}
      >
        <div
          style={{
            height: props.Height,
            backgroundImage: `url(${back})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundSize: 160
          }}
        >
          {props.children}
        </div>
      </ClientLayout>
    </>
  );
}

export default Layout;
