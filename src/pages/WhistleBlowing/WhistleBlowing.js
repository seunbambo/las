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
import Divider from "@material-ui/core/Divider";
import useForm from "react-hook-form";
import Chart from "react-google-charts";
import PreviousButton from "../../components/PreviousButton";
import {
  sendHttpRequest,
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { NONAME } from "dns";

import useStateWithCallback, {
  useStateWithCallbackInstant
} from "use-state-with-callback";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  margin: {
    marginBottom: 20,
    width: "85%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  formCont: {
    color: "#9cf3c2",
    width: "87%",
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#f5fdfc",
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  rightSide: {
    width: "60%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  btnHolder: {
    marginBottom: 30,
    marginTop: 20
  },
  description: {
    textAlign: "center",
    fontFamily: "Montserrat",
    marginTop: 30,
    marginBottom: 30
  },
  header: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 600
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
    color: "white",
    textTransform: "capitalize"
  },
  rightSide2: {
    width: "5%",
    top: 250,
    right: 30,
    position: "absolute",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  RightText: {
    textAlign: "left",
    color: "#bcc3c8"
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
  formC: {
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "96%"
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
  labelss: {
    fontSize: "13px",
    fontWeight: 600,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  labels: {
    fontSize: "13px",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    background: "#ffffff",
    fontSize: 14,
    marginRight: theme.spacing(1),
    width: "80%",
    borderRadius: 3,
    border: "1px solid #072455",
    marginTop: 2,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  textCont: {
    textAlign: "left",
    paddingLeft: 10
  },
  spacer: {
    maxWidth: "62%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      float: "none"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#072455",
    width: "80%",
    height: 50,
    marginLeft: 8,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      marginLeft: 0
    }
  },
  submit2: {
    margin: theme.spacing(1, 0),
    backgroundColor: "#072455",
    width: "90%",
    height: 50,
    [theme.breakpoints.down("sm")]: {
      width: "97%",
      marginLeft: 8,
      float: "none"
    }
  }
}));

const BootstrapInput2 = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
      fontSize: 14,
      color: "#072455"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #072455",
    color: "#072455",
    fontSize: 14,
    marginLeft: 10,
    width: 450,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
      width: "100%",
      marginLeft: 0
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
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #072455",
    color: "#072455",
    fontSize: 12,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
      width: "100%"
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

export default function WhistleBlowing(props) {
  // form methods
  const { register, handleSubmit } = useForm();
  const [second, changeSecond] = useState(false);
  // const [homeView, changeView] = useState(true)
  const [errorMessage, changeErrorMessage] = useState("");
  const [disabled, changeDisabled] = useState(true);
  const [bgColor, changeColor] = useState("#bcc3c8");
  const [page1, changePage] = useState("block");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(1);
  const [page2, changePage2] = useState("none");
  const [page3, changePage3] = useState("none");
  const [btnColor, changebtnColor] = useState("#072455");
  const [btnColorOutline, changebtnColorOutline] = useState("transparent");
  const [homeView, changeView] = useStateWithCallbackInstant(true, homeView => {
    if (homeView == false) {
      changebtnColor("transparent");
      changebtnColorOutline("#072455");
    } else if (homeView == true) {
      changebtnColor("#072455");
      changebtnColorOutline("transparent");
    }
  });

  const pageOneActiveColor = page1 === "block" ? "#e0e8e9" : "#53e2c5";
  const pageThreeActiveColor = page3 === "none" ? "#e0e8e9" : "#53e2c5";

  function nextPage() {
    if (subject === "") {
      changeErrorMessage("You need to fill in the subject");
    } else if (message === "") {
      changeErrorMessage("You need to fill in the description field");
    } else if (subject !== "" && message !== "") {
      setCount(2);
      changeErrorMessage("");
      changePage("none");
      changePage2("block");
      changePage3("none");
    }
  }
  function nextPage2() {
    setCount(3);
    changePage("none");
    changePage2("none");
    changePage3("block");
  }

  const onSubmit = data => {
    const registerUrl = BASEURL + "/whistle-blows";

    console.log("my datas", data);
    const formDataUser = new FormData();
    formDataUser.append("email", data.email);
    formDataUser.append("phone_number", data.mobile_number);
    formDataUser.append("first_name", data.first_name);
    formDataUser.append("last_name", data.last_name);
    formDataUser.append("subject", data.subject);
    formDataUser.append("complaint", data.description);

    sendHttpRequestWithFormDataWithoutHeaders(
      "POST",
      registerUrl,
      formDataUser
    ).then(responseData => {
      console.log("fffffffeeeeeeeee", responseData);
      if (responseData.data != {} || responseData != "") {
        history.push("/");
      }
    });
  };

  const classes = useStyles();
  const currentPage = props.match.params.category_id;
  let history = useHistory();

  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  const nextItem = (type = "") => {
    if (type === "decrement") {
      if (count == 3) {
        changePage("none");
        changePage2("block");
        changePage3("none");
        count == 1 ? setCount(1) : setCount(count - 1);
      } else if (count == 2) {
        changePage("block");
        changePage2("none");
        changePage3("none");
        count == 1 ? setCount(1) : setCount(count - 1);
      }
    }
  };

  return (
    <ClientLayout
      width="100%"
      showCurvedFooter={false}
      showFooter={true}
      showBackgroundImage={false}
      backgroundColor="white"
      height="700px"
    >
      <div className={classes.rightSide}>
        <Typography variant="h4" gutterBottom className={classes.header}>
          Whistle Blowing
        </Typography>

        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.description}
        >
          Please Input all the neccessary Information to help us resolve your
          complaints as soon as possible
        </Typography>
        <Grid container spacing={2} className={classes.btnHolder}></Grid>

        {homeView && (
          <Grid container spacing={1} className={classes.formCont}>
            <Grid item xs={3} sm={3} md={2}>
              <Typography
                variant="subtitle2"
                gutterBottom
                className={classes.leftText}
              >
                <span
                  style={{
                    color: "white",
                    background: pageOneActiveColor,
                    borderRadius: "50%",
                    padding: "5px 10px"
                  }}
                >
                  1
                </span>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={8} style={{ marginTop: 10 }}>
              <Divider
                style={{
                  backgroundColor: "transparent",
                  borderTop: "2px dashed #53e2c5"
                }}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={2}>
              <Typography
                variant="subtitle2"
                gutterBottom
                className={classes.RightText}
              >
                <span
                  style={{
                    background: pageThreeActiveColor,
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px 10px"
                  }}
                >
                  2
                </span>
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={3} sm={3} md={3} style={{ textAlign: "center" }}>
                <Typography
                  style={{
                    fontSize: 10,
                    color: pageOneActiveColor,
                    paddingLeft: 10
                  }}
                >
                  Your Complaint
                </Typography>
              </Grid>
              <Grid item md={6} className={classes.spacer}></Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                style={{ color: pageThreeActiveColor }}
                className={classes.textCont}
              >
                <Typography style={{ fontSize: 10 }}>
                  Your Personal Information
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}

        <div className={classes.formC}>
          <div>
            <span style={{ color: "red" }}>{errorMessage}</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: page1, marginBottom: 20 }}>
              <Grid item xs={12} sm={12} md={12} style={{ maginBottom: 20 }}>
                <FormControl className={classes.margin}>
                  <span className={classes.labelss}>Subject*</span>
                  <BootstrapInput2
                    onChange={e => setSubject(e.target.value)}
                    required
                    inputRef={register}
                    name="subject"
                    id="bootstrap-input"
                  />
                </FormControl>
              </Grid>

              <span className={classes.labelss}>Description*</span>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  onChange={e => setMessage(e.target.value)}
                  name="description"
                  inputRef={register}
                  multiline
                  rows="10"
                  className={classes.textField}
                  margin="normal"
                />

                <Button
                  onClick={nextPage}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Continue
                </Button>
              </Grid>
            </div>

            <Grid container spacing={2}>
              <div style={{ width: "100%", display: page2 }}>
                <h1 style={{ fontSize: 30, textAlign: "center" }}>
                  Would you like us to Contact you
                </h1>
                <h1 style={{ fontSize: 15, textAlign: "center" }}>
                  If YES, kindly continue, if NO, click Complete
                </h1>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit2}
                >
                  Complete
                </Button>
                <Button
                  onClick={nextPage2}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit2}
                >
                  Continue
                </Button>
              </div>
              {/* entity/get/invoice */}
              <div style={{ width: "100%", display: page3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl className={classes.margin}>
                      <span className={classes.labels}>Your Firstname*</span>
                      <BootstrapInput
                        inputRef={register}
                        name="firstname"
                        placeholder="firstname"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl className={classes.margin}>
                      <span className={classes.labels}>Your Lastname*</span>
                      <BootstrapInput
                        inputRef={register}
                        name="last_name"
                        placeholder="lastname"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl className={classes.margin}>
                      <span className={classes.labels}>Your Email*</span>
                      <BootstrapInput
                        inputRef={register}
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl className={classes.margin}>
                      <span className={classes.labels}>Your Phone Number*</span>
                      <BootstrapInput
                        inputRef={register}
                        name="phone_number"
                        placeholder="phone number"
                        id="bootstrap-input"
                      />
                    </FormControl>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit2}
                  >
                    Complete
                  </Button>
                </Grid>
              </div>
            </Grid>
          </form>
        </div>
        <div className={classes.rightSide2}>
          <PreviousButton clickHandler={() => nextItem("decrement")} />
        </div>
      </div>
    </ClientLayout>
  );
}
