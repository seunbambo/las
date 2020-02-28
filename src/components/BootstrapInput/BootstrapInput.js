import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  labels: {
    fontSize: 13,
    marginTop: 15,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13
    }
  },
  selectCont: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  formContainerText: {
    textAlign: "center",
    paddingTop: 24,
    color: "#b2bbcc",
    fontWeight: "bold"
  },

  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  margin: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  marginLogin: {
    width: "100%",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      marginTop: 20
    }
  },
  margin2: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  marginSpaced: {
    width: "33%",
    paddingRight: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      paddingRight: 0
    }
  },
  marginSpacedEdge: {
    width: "32%",
    paddingRight: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      paddingRight: 0
    }
  },
  marginSpacedGet: {
    width: "25%",
    paddingRight: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      paddingRight: 0
    }
  },
  marginSpacedBig: {
    width: "65%",
    paddingRight: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      paddingRight: 0
    }
  },
  marginSpacedMedium: {
    width: "49%",
    paddingRight: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      paddingRight: 0
    }
  },
  contain: {
    marginLeft: "6%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  btnCategory: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2),
      fontSize: 14,
      color: "#072455"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #a7a8b1",
    marginTop: 3,
    color: "#072455",
    fontSize: 14,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
      width: "100%"
    },
    padding: "13px 15px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

export function Label(props) {
  const classes = useStyles();
  return <span className={classes.labels}>{props.label}</span>;
}

export function Control(props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.margin} style={{ display: props.display }}>
      {props.children}
    </FormControl>
  );
}
export function ControlGet(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginSpacedGet}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}

export function ControlLogin(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginLogin}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}
export function Control2(props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.margin2} style={{ display: props.display }}>
      {props.children}
    </FormControl>
  );
}
export function ControlSpaced(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginSpaced}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}
export function ControlSpacedEdge(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginSpacedEdge}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}
export function ControlSpacedBig(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginSpacedBig}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}
export function ControlSpacedMedium(props) {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.marginSpacedMedium}
      style={{ display: props.display }}
    >
      {props.children}
    </FormControl>
  );
}
//marginSpacedBig

export function SelectContainer(props) {
  const classes = useStyles();
  return <div className={classes.selectCont}>{props.children}</div>;
}
