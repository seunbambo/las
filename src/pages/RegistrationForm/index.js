import React, { useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  sendHttpRequest,
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from '@material-ui/core/FormControl';
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import "react-toastify/dist/ReactToastify.css";
import "./RegistrationForm.css";
import StepperFormPage3 from "../StepperFormPage3";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mark from "./assets/mark.svg";
import useForm from "react-hook-form";

import Snackbar from "../../components/Snackbar";
import PreviousButton from "../../components/PreviousButton";

import {
  BootstrapInput,
  Label,
  Control as FormControl,
  Control2 as FormControl2
} from "../../components/BootstrapInput/BootstrapInput";

import home3 from "./home3.png";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { NONAME } from "dns";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  marginTopButtom: {
    marginBottom: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10
    }
  },

  rightSide: {
    width: "65%",
    float: "left",
    marginTop: 5,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  leftSide: {
    width: "35%",
    float: "left",
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      width: 0
    }
  },
  formContainer: {
    minWidth: 200,
    cursor: "pointer",
    minHeight: 210,
    border: "1px solid rgb(134, 148, 177)",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  formContainerText: {
    paddingTop: 24,
    textAlign: "center",
    color: "#b2bbcc",
    fontWeight: "bold"
  },

  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  genClass: {
    marginTop: 4,
    width: "94%",
    border: "1px solid  #a7a8b1",
    [theme.breakpoints.down("sm")]: {
      width: "99%"
    }
  },

  contain: {
    marginLeft: "26%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  btnCategory: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#072455",
    width: "99%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0
    }
  }
}));

export default function RegistrationForm(props) {
  // form methods
  const { register, handleSubmit } = useForm();
  const [showPreloader, changePreloader] = useState(false);
  const [myErrors, changeErrors] = useState([]);
  const [bottomText, changebottomText] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  // const [showPreloader, changePreloader] = useState(false)
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentPage = props.match.params.category_id;
  let history = useHistory();

  function showLoader(width, height) {
    if (showPreloader) {
      return (
        <Loader
          type="Rings"
          color="#072455"
          visible={true}
          height={width}
          width={height}
        />
      );
    } else {
      return null;
    }
  }

  function showLoader(width, height) {
    if (showPreloader) {
      return (
        <Loader
          type="Rings"
          color="#072455"
          visible={true}
          height={width}
          width={height}
        />
      );
    } else {
      return null;
    }
  }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const onSubmit = data => {
    if (mobile.length < 11) {
      changebottomText(
        "Please Enter a Valid Phone Number of atleast 11 digits"
      );
      notify("Please Enter a Valid Phone Number of of atleast than 11 digits");
    } else if (password !== confirmPassword) {
      changebottomText(
        "Your password and the confirm password does not correspond"
      );
      notify("Your password and the confirm password does not correspond");
    } else if (mobile.length >= 11 && password === confirmPassword) {
      changePreloader(true);

      dispatch({ type: "STARTLOADER" });
      const registerUrl = BASEURL + "/eregister";
      const landlordUrl = `${BASEURL}/landlords`;
      const formDataUser = new FormData();
      const formDataLandlord = new FormData();

      formDataUser.append("name", data.name);
      formDataUser.append("last_name", data.last_name);
      formDataUser.append("email", data.email);
      formDataUser.append("password", data.password);
      formDataUser.append("gender", data.gender);
      formDataUser.append("mobile_number", data.mobile_number);
      formDataUser.append("lga", data.lga);
      formDataUser.append("user_type", "developer");
      for (var pair of formDataUser.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      sendHttpRequestWithFormDataWithoutHeaders(
        "POST",
        registerUrl,
        formDataUser
      ).then(responseData => {
        console.log(responseData);
        console.log("datassssssii from creating lease", responseData);
        const allErrors = [];
        if (responseData.error) {
          console.log(responseData.error);
          for (const key in responseData.error) {
            if (responseData.error.hasOwnProperty(key)) {
              const element = responseData.error[key];
              console.log(key + ": ", element[0]);
              allErrors.push(element[0]);
            }
          }
          changeErrors(allErrors);
          changePreloader(false);
        } else if (
          responseData.data != null ||
          responseData.data != undefined ||
          responseData.data != []
        ) {
          const user_id = responseData.data.id;
          formDataLandlord.append("user_id", user_id);
          sendHttpRequestWithFormDataWithoutHeaders(
            "POST",
            landlordUrl,
            formDataLandlord
          ).then(responseData => {
            console.log(responseData);
            if (responseData.data) {
              changePreloader(false);
              history.push("/regsuccess");
            } else if (responseData.error) {
              changePreloader(false);
              history.push("/registration/developer");
            }
          });
        }
      });

      // sendHttpRequestWithError('POST', postUrl, data).then(responseData=>{
      //     if(responseData!="error"){
      //
      //       // if its a landlord
      //         const landID = {
      //           "user_id":responseData.data.id
      //         }
      //         sendHttpRequestWithError('POST', landlordUrl, landID).then(responseData=>{
      //           notify(`You have successfully registered`)
      //           dispatch({type:"STOPLOADER"})
      //           history.push('/regsuccess')
      //         })

      //     }
      //     else{
      //       notify("Login Not successful", {type: toast.TYPE.INFO})
      //       dispatch({type:"STOPLOADER"})
      //     }
      // })
    }
  };
  console.log("these are the passwords", password, confirmPassword);
  const tenantmarkedImage = mark;

  const moveBack = link => history.goBack();

  const notify = message => toast(message);
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
        <div className={classes.leftSide}>
          <Grid container spacing={10} className={classes.contain}>
            <Grid
              item
              className={classes.marginTopButtom}
              xs={12}
              sm={3}
              md={2}
            >
              <div
                data-id="1"
                className={classes.formContainer}
                style={{
                  borderSize: 1,
                  position: "relative",
                  borderRadius: 10
                }}
              >
                <div
                  style={{
                    borderRadius: 40,
                    float: "right",
                    width: 20,
                    height: 20,
                    right: 10,
                    top: 20,
                    position: "absolute",
                    backgroundColor: "white",
                    border: "solid",
                    backgroundImage: `url(${tenantmarkedImage})`,
                    borderWidth: 1
                  }}
                ></div>
                <Avatar
                  alt="Remy Sharp"
                  src={home3}
                  className={classes.formContainerImage}
                />
                <Typography className={classes.formContainerText}>
                  Landlord
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <PreviousButton right={5} clickHandler={moveBack} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.rightSide}>
            <Grid container spacing={2}>
              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={12}
                md={12}
              >
                <Snackbar number="1" message="General Information" />
              </Grid>
              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Firstname*" />
                  <BootstrapInput
                    required
                    inputRef={register}
                    name="name"
                    placeholder="firstname"
                    id="bootstrap-input"
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Lastname*" />
                  <BootstrapInput
                    required
                    inputRef={register}
                    name="last_name"
                    placeholder="lastname"
                    id="bootstrap-input"
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Gender*" />
                  <div class="custom-select">
                    <select
                      name="gender"
                      ref={register}
                      className={classes.genClass}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </FormControl>
              </Grid>

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Email*" />
                  <BootstrapInput
                    required
                    inputRef={register}
                    name="email"
                    placeholder="Email"
                    id="bootstrap-input"
                    type="email"
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Mobile Numbers*" />
                  <BootstrapInput
                    required
                    inputRef={register}
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    name="mobile_number"
                    placeholder="07030000000"
                    id="bootstrap-input"
                    type="number"
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="LGA*" />
                  <div class="custom-select">
                    <select
                      name="lga"
                      ref={register}
                      className={classes.genClass}
                    >
                      <option value="Agege">Agege</option>
                      <option value="Ajeromi Ifelodun">Ajeromi Ifelodun</option>
                      <option value="Alimosho">Alimosho</option>
                      <option value="Amuwo-Odofin">Amuwo-Odofin</option>
                      <option value="Apapa">Apapa</option>
                      <option value="Badagry">Badagry</option>
                      <option value="Epe">Epe</option>
                      <option value="Eti-Osa">Eti-Osa</option>
                      <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                      <option value="Ifako-Ijaye">Ifako-Ijaye</option>
                      <option value="Ikeja">Ikeja</option>
                      <option value="Ikorodu">Ikorodu</option>
                      <option value="Kosofe">Kosofe</option>
                      <option value="Lagos Island">Lagos Island</option>
                      <option value="Lagos Mainland">Lagos Mainland</option>
                      <option value="Mushin">Mushin</option>
                      <option value="Ojo">Ojo</option>
                      <option value="Oshodi-Isolo">Oshodi-Isolo</option>
                      <option value="Somolu">Somolu</option>
                      <option value="Surulere">Surulere</option>
                    </select>
                  </div>
                </FormControl>
              </Grid>

              <BootstrapInput
                required
                inputRef={register}
                value="landlord"
                placeholder="user type"
                name="user_type"
                id="bootstrap-input"
                type="hidden"
              />

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Password*" />
                  <BootstrapInput
                    required
                    inputRef={register}
                    onChange={e => changePassword(e.target.value)}
                    placeholder="password"
                    name="password"
                    id="bootstrap-input"
                    type="password"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Confirm Password*" />
                  <BootstrapInput
                    inputRef={register}
                    name="confirm_password"
                    onChange={e => changeConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    id="bootstrap-input"
                    type="password"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={6}
                md={4}
              >
                <FormControl>
                  <Label label="Lasra Identification Number*" />
                  <BootstrapInput
                    inputRef={register}
                    name="lasra_number"
                    placeholder="lasra identification number"
                    id="bootstrap-input"
                    type="number"
                  />
                </FormControl>
              </Grid>
              <div style={{ width: "100%" }}>
                <p style={{ textAlign: "center", fontSize: 11, color: "red" }}>
                  {bottomText}
                </p>
              </div>

              <ul>
                {myErrors.length > 0 && (
                  <p>Form not submitted because of the following error(s):</p>
                )}
                {myErrors.map((text, index) => (
                  <li style={{ color: "red", fontSize: 10 }}>{text}</li>
                ))}
              </ul>
              {/* changeConfirmPassword changePassword */}

              <Grid
                item
                className={classes.marginTopButtom}
                xs={12}
                sm={12}
                md={12}
                style={{ marginBottom: 30 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={showPreloader}
                  className={classes.submit}
                >
                  Register
                </Button>
                <div>
                  <p
                    style={{ color: "red", fontSize: 10, textAlign: "center" }}
                  >
                    All Optional Fields are to be completed within 60 days
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </ClientLayout>
    </>
  );
}
