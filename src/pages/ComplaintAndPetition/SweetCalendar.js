import React, { useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useForm from "react-hook-form";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

// pick a date util library
import MomentUtils from "@date-io/moment";

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { NONAME } from "dns";
import ResponsivePage from "./../../components/ResponsivePage/ResponsivePage";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  margin: {
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      float: "none"
    }
  },
  formCont: {
    color: "#9cf3c2"
  },
  rightSide: {
    width: "40%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      float: "none"
    }
  },
  btnHolder: {
    marginBottom: 30,
    marginTop: 20
  },
  description: {
    textAlign: "center"
  },
  header: {
    textAlign: "center"
  },
  formContainer: {
    minWidth: 200,
    cursor: "pointer",
    minHeight: 210,
    border: "1px solid gray",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  formContainerText: {
    textAlign: "center",
    paddingTop: 24
  },

  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  outlinedBtn: {
    width: "100%",
    color: "#072455",
    border: "1px solid #072455",
    height: 55,
    textTransform: "capitalize"
  },
  normalBtn: {
    width: "100%",
    height: 55,
    color: "1px solid #072455",
    backgroundColor: "#072455",
    textTransform: "capitalize"
  },
  RightText: {
    textAlign: "left"
  },
  leftText: {
    textAlign: "right"
  },
  circularText: {
    borderRadius: "50%",
    height: "26px",
    width: "26px",
    lineHeight: "26px",
    display: "inline-block",
    textAlign: "center",
    marginRight: "6px"
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  responsive: {
    float: "center",
    [theme.breakpoints.down("sm")]: {
      float: "center"
    }
  }
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
      fontSize: 12,
      color: "#072455"
    }
  },
  input: {
    borderRadius: 4,
    marginTop: 15,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #072455",
    color: "#072455",
    fontSize: 12,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px"
    },
    padding: "15px 15px",
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

export default function SweetCalendar(props) {
  // form methods
  const { register, handleSubmit } = useForm();
  const [selectedDate, handleDateChange] = useState(new Date());

  const onSubmit = data => {
    console.log("this is the form data", data);
  };

  const classes = useStyles();

  let history = useHistory();

  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  return (
    <MuiPickersUtilsProvider className={classes.responsive} utils={MomentUtils}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="subtitle2">
          <h1>Quickly select Date and Time</h1>
        </Typography>
      </Grid>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <TimePicker value={selectedDate} onChange={handleDateChange} />
      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}
