import React, { useState, useEffect, useRef } from "react";
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

import Moment from "react-moment";
import dateFormat from "dateformat";
// pick a date util library
import MomentUtils from "@date-io/moment";
import professional from "./assets/upload-to-cloudldpi.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviousButton from "../../components/PreviousButton";
import Calendar from "react-calendar";
import "./ComplaintAndPetition.css";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import {
  sendHttpRequest,
  BASEURL,
  sendHttpRequestWithFormData,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import { ValidateEmail } from "../../helpers/utility";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { NONAME } from "dns";
import SweetCalendar from "./SweetCalendar";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import useStateWithCallback, {
  useStateWithCallbackInstant
} from "use-state-with-callback";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  margin: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  formCont: {
    color: "#9cf3c2",
    paddingBottom: 40
  },
  rightSide: {
    width: "40%",
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
  labelss: {
    fontSize: "13px",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      marginLeft: 0
    }
  },
  labels: {
    fontSize: "13px",
    fontWeight: 600,
    marginTop: 15,
    [theme.breakpoints.down("md")]: {
      marginLeft: 5
    }
  },

  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  rightSide2: {
    width: "5%",
    top: 250,
    right: 30,
    position: "absolute",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none",
      top: 450
    }
  },
  outlinedBtn: {
    width: "97%",
    color: "#072455",
    border: "1px solid #072455",
    height: 55,
    textTransform: "capitalize"
  },
  normalBtn: {
    width: "97%",
    height: 55,
    color: "white",
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
  spacer: {
    maxWidth: "48%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      float: "none"
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
  textField: {
    background: "#ffffff",
    fontSize: 10,
    marginLeft: 5,
    marginTop: 0,
    border: "1px solid #072455",
    width: "97%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  submit: {
    width: "96%",
    justifyContent: "center",
    height: 50,
    marginTop: 20,
    backgroundColor: "#072455",
    [theme.breakpoints.down("md")]: {
      width: "99%",
      marginLeft: 3
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

const useStylesReddit = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: "none",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));

export default function ComplaintAndPetition(props) {
  // form methods
  const { register, handleSubmit } = useForm();
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
  const [email, setEmail] = useState("");
  const [errorMessage, changeErrorMessage] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [second, changeSecond] = useState(false);
  // const [homeView, changeView] = useState(true)
  const [bgColor, changeColor] = useState("gray");
  const [allFiles, changeAllFiles] = useState([]);
  const [countOne, changeCountOne] = useState(0);
  const [enabled, changeEnabled] = useState(false);
  const [page11, changePageOne] = useState("block");
  const [page22, changePageTwo] = useState("none");
  const [developer_type, changeType] = useState("individual_developer");
  const [certificate_of_incorporation, changeCert] = useState("");
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("");
  const [showPreloader, changePreloader] = useState(false);
  const [page1, changePage] = useState(true);
  const [btnColor, changebtnColor] = useState("#072455");
  const [btnTextColor, changebtnTextColor] = useState("white");
  const [btnTextColor2, changebtnTextColor2] = useState("#072455");
  const [btnColorOutline, changebtnColorOutline] = useState("transparent");
  const [message, setMessage] = useState("");

  const [selectedDate, setState] = useState(undefined);

  const [selectDate, handleChange] = useState(new Date());

  const [scheduleView, changeSchedule] = useState(false);
  const [homeView, changeView] = useStateWithCallbackInstant(true, homeView => {
    if (homeView == false) {
      changebtnColor("transparent");
      changebtnColorOutline("#072455");
      changebtnTextColor("#072455");
      changebtnTextColor2("white");
    } else if (homeView == true) {
      changebtnColor("#072455");
      changebtnColorOutline("transparent");
      changebtnTextColor("white");
      changebtnTextColor2("#072455");
    }
  });
  const onChange = date => handleChange({ date });

  console.log("this is the selected date", selectedDate);

  const classes = useStyles();
  const currentPage = props.match.params.category_id;
  let history = useHistory();

  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  function prevPage() {
    console.log("clicked");
    changePageTwo("none");
    changeSecond(true);
    changeColor("#9cf3c2");
    changePageOne("block");
    countOne === 1 ? changeCountOne(0) : changeCountOne(countOne + 1);
  }
  function RedditTextField(props) {
    const classes = useStylesReddit();

    return (
      <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
    );
  }

  useEffect(() => {
    var state = JSON.parse(localStorage.getItem("reduxStore"));
    const userToken2 = localStorage.getItem("token");

    if (
      userToken2 == undefined ||
      state.userDetail == {} ||
      state.userDetail == undefined
    ) {
      history.push("/category");
    } else if (userToken2 !== undefined && state.userDetail !== {}) {
      history.push("/dashboard");
    }
  }, []);

  // function validateEmail(email)
  // {
  //     var re = /\S+@\S+\.\S+/;
  //     return re.test(email);
  // }
  console.log("this is the valid email", ValidateEmail("theoderic@gmail.com"));
  function nextPage() {
    if (firstname === "") {
      changeErrorMessage("First name is required");
    } else if (lastname === "") {
      changeErrorMessage("Last name is required");
    } else if (email === "") {
      changeErrorMessage("Email is required");
    } else if (email != "" && ValidateEmail(email) === false) {
      changeErrorMessage("Please Enter a valid email address");
    } else if (phone.length < 11) {
      changeErrorMessage("Enter a valid phone number of 11 digits");
    } else if (
      firstname != "" &&
      lastname != "" &&
      email != "" &&
      phone != ""
    ) {
      changeErrorMessage("");
      changePageTwo("block");
      changeSecond(true);
      changeColor("#9cf3c2");
      changePageOne("none");
      countOne === 2 ? changeCountOne(1) : changeCountOne(countOne + 1);
    }
  }

  function handleClick(e) {
    fileUploader.current.click();
  }

  function nextPageCalendar() {
    if (page1 === true) {
      changePage(false);
    } else {
      history.push("/");
    }
  }
  const defaultDetails = { name: "null", last_name: "null" };
  var state = JSON.parse(localStorage.getItem("reduxStore"));

  const Detail = isEmpty(state) ? defaultDetails : state.userDetail;
  const allImageNames = [];

  function fileSender(singleImage) {
    let accessToken = Detail.access_token;
    let authHeader = "Bearer " + accessToken;
    const formPicture = new FormData();
    formPicture.append("file", singleImage);
    const reportsUrl = BASEURL + "/complaints/media";

    sendHttpRequestWithFormData(
      "POST",
      reportsUrl,
      formPicture,
      authHeader
    ).then(responseData => {
      console.log("cert aloone", responseData.name);
      if (responseData.name != undefined) {
        allImageNames.push(responseData.name);
        changePicture("Images pushed successfully");
        notify("file Upload successful");
      }
      console.log("these are the list of pushed Images", allImageNames);
      changePicture("Images pushed successfully");
    });
    changeAllFiles(allImageNames);
  }

  function fileChangedHandler(event, maximumFileSize) {
    if (event.target.files.length > 0) {
      let file_size =
        event.target.files[0].size === undefined
          ? null
          : event.target.files[0].size;
      //or if you like to have name and type
      let file_type = event.target.files[0].type;
      let validFileExtensions = ["image/jpeg", "image/jpg", "image/png"];
      var n = validFileExtensions.includes(file_type);
      //file type validation
      if (n === false || file_size >= maximumFileSize) {
        changeEnabled(true);
      } else if (n === true && file_size <= maximumFileSize) {
        fileSender(event.target.files[0], event.target.name);
        changeEnabled(false);
      }
    }
  }

  const onSubmit = data => {
    const registerUrl = BASEURL + "/complaints";

    // console.log("this is the access token", accessToken)
    console.log("my datas", data);
    // const formData = new FormData();
    const formDataUser = new FormData();
    formDataUser.append("your_first_name", data.your_first_name);
    formDataUser.append("your_last_name", data.your_last_name);
    formDataUser.append("your_email", data.your_email);
    formDataUser.append("your_phone_number", data.your_phone_number);
    formDataUser.append("first_name", data.first_name);
    formDataUser.append("last_name", data.last_name);
    formDataUser.append("id_number", data.last_name);
    formDataUser.append("complaint", data.complaint);
    formDataUser.append("role", data.role);
    for (var i in allFiles) {
      formDataUser.append("supporting_image[]", allFiles[i]);
    }

    sendHttpRequestWithFormDataWithoutHeaders(
      "POST",
      registerUrl,
      formDataUser
    ).then(responseData => {
      console.log(responseData);
      if (
        responseData.data.your_first_name != null ||
        responseData.data.your_first_name != undefined
      ) {
        notify("Complaints has been sent");
        history.push("/complaint_success");
      }
    });
  };

  // const onDay = (datas) => {
  //   console.log("this are the click day", datas)
  //   handleDateChange(datas)

  // }

  function formatDate(now) {
    // var newDate = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    // console.log("this is the newDate", newDate)
    return <Moment parse="YYYY-MM-DD HH:mm:ss">{now}</Moment>;

    // var dateStringWithTime = moment(now).format(YYYY-'MM-DD HH:mm:ss');
  }
  //'2019-12-17 07:43:21'
  const onSubmit2 = data => {
    const formattedDate = dateFormat(selectedDate, "yyyy-mm-dd hh:MM:ss");

    const registerUrl = BASEURL + "/schedules";

    console.log("my datas", data);
    const formDataUser = new FormData();
    formDataUser.append("your_first_name", data.first_name2);
    formDataUser.append("your_last_name", data.last_name2);
    formDataUser.append("email", data.email2);
    formDataUser.append("phone_number", data.mobile_number2);
    formDataUser.append("first_name", data.first_name2);
    formDataUser.append("last_name", data.last_name2);
    formDataUser.append("date_time", formattedDate);

    sendHttpRequestWithFormDataWithoutHeaders(
      "POST",
      registerUrl,
      formDataUser
    ).then(responseData => {
      console.log("fffffffeeeeeeeee", responseData);
      if (responseData.data != {} || responseData != "") {
        history.push("/schedule_success");
      }
    });
  };
  const nextItem = (type = "") => {
    if (type == "increment") {
      changePageOne("none");
      changePageTwo("block");
      countOne === 2 ? changeCountOne(1) : changeCountOne(countOne + 1);
    } else if (type === "decrement") {
      if (countOne == 2) {
        changePageOne("block");
        changePageTwo("none");
        countOne == 1 ? changeCountOne(1) : changeCountOne(countOne - 1);
      }
    }
  };
  console.log("selectttttttted date", selectedDate);

  function toggleView(currentState) {
    changeView(currentState);
    homeView ? changebtnColor("#072455") : changebtnColor("transparent");
  }
  const notify = message => toast(message);

  const pageOneActiveColor = page11 === "block" ? "#e0e8e9" : "#53e2c5";
  const pageThreeActiveColor = page22 === "none" ? "#e0e8e9" : "#53e2c5";

  const disabledDays = {
    daysOfWeek: [0, 6]
  };

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      setMessage("Appointments cannot be booked on weekends");
      return;
    } else if (!modifiers.disabled) {
      setMessage("Appointment booked, continue by filling the form below");
    }
    setState(modifiers.selected ? undefined : day);
  };

  return (
    <>
      <ToastContainer className="toast-container" />

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
            Complaints & Petition
          </Typography>

          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.description}
          >
            To make Complaints, Please Input all the neccessary Information to
            help us resolve your complaints as soon as possible
          </Typography>
          <Grid container spacing={1} className={classes.btnHolder}>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleView(true, "#072455")}
                style={{ backgroundColor: btnColor, color: btnTextColor }}
                className={classes.normalBtn}
              >
                Make a Complaint
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => toggleView(false, "#072455")}
                style={{
                  backgroundColor: btnColorOutline,
                  color: btnTextColor2
                }}
                className={classes.outlinedBtn}
              >
                Schedule A meeting
              </Button>
            </Grid>
          </Grid>
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
              <Grid item xs={6} sm={6} md={7} style={{ marginTop: 10 }}>
                <Divider style={{ borderTop: "1px dashed green" }} />
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
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ textAlign: "center", color: pageOneActiveColor }}
                >
                  <Typography style={{ fontSize: 10 }}>
                    Your Personal Information
                  </Typography>
                </Grid>
                <Grid item md={6} className={classes.spacer}></Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  style={{
                    textAlign: "left",
                    paddingRight: 20,
                    color: pageThreeActiveColor
                  }}
                >
                  <Typography style={{ fontSize: 10 }}>
                    Your Complaint
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          <div>
            <span style={{ color: "red" }}>{errorMessage}</span>
          </div>
          <Grid container spacing={1} style={{ width: "100%" }}>
            {homeView && (
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <div style={{ display: page11, marginLeft: 5 }}>
                  <Grid container spacing={1} style={{ width: "100%" }}>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>Your Firstname*</span>
                        <BootstrapInput
                          onChange={e => setFirstname(e.target.value)}
                          inputRef={register}
                          name="your_first_name"
                          placeholder="firstname"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>Your Lastname*</span>
                        <BootstrapInput
                          required
                          onChange={e => setLastname(e.target.value)}
                          inputRef={register}
                          name="your_last_name"
                          placeholder="lastname"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>Your Email*</span>
                        <BootstrapInput
                          required
                          onChange={e => setEmail(e.target.value)}
                          inputRef={register}
                          name="your_email"
                          placeholder="your email"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>
                          Your Phone Number*
                        </span>
                        <BootstrapInput
                          required
                          inputRef={register}
                          onChange={e => setPhoneNumber(e.target.value)}
                          name="your_phone_number"
                          placeholder="phone number"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={nextPage}
                    className={classes.submit}
                  >
                    Continue
                  </Button>
                </div>

                <div style={{ display: page22 }}>
                  <div className={classes.rightSide2} onClick={prevPage}>
                    <PreviousButton />
                  </div>
                  <Grid>
                    <span className={classes.labels}>Enter Complaint</span>
                    <TextField
                      id="outlined-multiline-static"
                      name="complaint"
                      inputRef={register}
                      InputProps={{ disableUnderline: true }}
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                      style={{ width: "98%" }}
                    />

                    {/* onDayClick (day: date, modifiers: Object, e: SyntheticEvent) ⇒ void
                     */}
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl
                        className={classes.margin}
                        style={{ marginLeft: 5, marginTop: 9, width: "98%" }}
                      >
                        <input
                          type="file"
                          id="file"
                          name="picture"
                          onChange={e => fileChangedHandler(e, 5000000000)}
                          style={{ display: "none" }}
                          inputRef={register}
                          ref={fileUploader}
                        />
                        <span style={{ fontSize: 12 }}>
                          {" "}
                          Upload Supporting Images
                        </span>
                        <div className="input-container">
                          <input
                            className="input-field"
                            type="text"
                            value={picture}
                          />
                          <img
                            src={professional}
                            className="icon"
                            onClick={handleClick}
                          />
                        </div>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}

            {!homeView && (
              <div>
                <div style={{ marginLeft: "auto", display: "block" }}>
                  <DayPicker
                    selectedDays={selectedDate}
                    disabledDays={disabledDays}
                    onDayClick={handleDayClick}
                  />
                </div>

                <br />
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  {message}
                </p>
                <br />

                <form onSubmit={handleSubmit(onSubmit2)}>
                  <Grid container spacing={1} style={{ width: "100%" }}>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>Your Firstname*</span>
                        <BootstrapInput
                          inputRef={register}
                          name="first_name2"
                          placeholder="firstname"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>Your Lastname*</span>
                        <BootstrapInput
                          inputRef={register}
                          name="last_name2"
                          placeholder="lastname"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>
                          Your Email Address*
                        </span>
                        <BootstrapInput
                          inputRef={register}
                          name="email2"
                          placeholder="email"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl className={classes.margin}>
                        <span className={classes.labels}>
                          Your Phone Number*
                        </span>
                        <BootstrapInput
                          inputRef={register}
                          name="mobile_number2"
                          placeholder="07039148866"
                          id="bootstrap-input"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </div>
            )}
          </Grid>
        </div>
      </ClientLayout>
    </>
  );
}
