import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ClientLayout from "../../layouts/ClientLayout";
import { useHistory, Redirect } from "react-router-dom";
import useForm from "react-hook-form";
import {
  NavLink,
  Route,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { useSelector, useDispatch } from "react-redux";
import {
  sendHttpRequestWithFormDataWithoutHeadersLogin,
  sendHttpRequest,
  sendHttpRequestWithFormDataWithObjectGet,
  BASEURL,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import {
  BootstrapInput,
  Label,
  ControlLogin as FormControl,
  SelectContainer
} from "../../components/BootstrapInput/BootstrapInput";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getData = url => {
  const getUrl = BASEURL + url;
  sendHttpRequest("GET", getUrl).then(responseData => {
    console.log(responseData);
  });
};

const useStyles = makeStyles(theme => ({
  loginContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 370
    }
  },
  paper: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "100%"
  },
  formContainer: {
    minWidth: 200,
    cursor: "pointer",
    minHeight: 210,
    position: "relative",
    border: "1px solid gray",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main
  },
  linkbtn: {
    cursor: "pointer",
    textDecoration: "none",
    float: "left"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    height: 50,
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#072455"
  },
  label: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: 600
  }
}));

export default function LoginForm() {
  const counter = useSelector(state => state.counter); //we use this one to select the specific state that we want
  const dispatch = useDispatch(); //we use it to pass an action, by specifying the action Type
  const userDetail = useSelector(state => state.userDetail);
  const isRedirected = useSelector(state => state.toHome);
  const isLoading = useSelector(state => state.loading);
  const classes = useStyles();
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch({ type: "STOPLOADER" });
  }, []);

  const onSubmit = data => {
    console.log("this is the form data", data);
    const formDataLogin = new FormData();
    formDataLogin.append("email", data.email);
    formDataLogin.append("password", data.password);
    dispatch({ type: "STARTLOADER" });
    console.log("thisisi", BASEURL + "/login");
    const postUrl = BASEURL + "/login";
    const checkUser = BASEURL + "/check/license";
    sendHttpRequestWithFormDataWithoutHeadersLogin(
      "POST",
      postUrl,
      formDataLogin
    ).then(responseData => {
      console.log("datas", responseData);
      // console.log("Erorr soluttions", responseData)
      const checkAuthenticationStatus = responseData.hasOwnProperty("status");

      if (responseData.hasOwnProperty("message") && checkAuthenticationStatus) {
        notify("Verify your email, before signing In");
        dispatch({ type: "STOPLOADER" });
      } else if (
        (checkAuthenticationStatus === false &&
          responseData != "error" &&
          !responseData.hasOwnProperty("message")) ||
        (responseData.hasOwnProperty("message") &&
          responseData != "error" &&
          responseData.message != "Unauthorized" &&
          responseData.message != "Not verified" &&
          checkAuthenticationStatus === false)
      ) {
        console.log("this is the response data", responseData);

        let user_type = responseData.user.user_type;
        if (user_type === "tenant") {
          dispatch({ type: "SAVELOGINDETAILS", payload: responseData });
          dispatch({ type: "STOPLOADER" });
          localStorage.setItem("token", "Bearer " + responseData.access_token);
          notify("Login Successful");
          dispatch({ type: "AUTHENTICATEROUTES" });
          history.push("/dashboard");
        } else if (user_type !== "tenant") {
          let newToken = "Bearer " + responseData.access_token;
          sendHttpRequestWithFormDataWithObjectGet(
            "GET",
            checkUser,
            newToken
          ).then(responseData2 => {
            console.log("this is the responseData2", responseData2);

            if (
              responseData2.success ||
              responseData.user.user_type === "tenant"
            ) {
              console.log("it was a success");
              dispatch({ type: "SAVELOGINDETAILS", payload: responseData });
              dispatch({ type: "STOPLOADER" });
              localStorage.setItem(
                "token",
                "Bearer " + responseData.access_token
              );
              notify("Login Successful");
              dispatch({ type: "AUTHENTICATEROUTES" });
              history.push("/dashboard");
              console.log("from reduxsss", userDetail);
            } else if (responseData2.error) {
              console.log("No valid licence");
              dispatch({ type: "SAVELOGINDETAILS", payload: responseData });
              // dispatch({type:"STOPLOADER"})
              localStorage.setItem(
                "token",
                "Bearer " + responseData.access_token
              );
              notify("Login Successful, But No licence");
              dispatch({ type: "AUTHENTICATEROUTES" });
              history.push("/licence");
              console.log("from reduxsss", userDetail);
            } else if (responseData2.created) {
              console.log("it was a success");
              dispatch({ type: "SAVELOGINDETAILS", payload: responseData });
              dispatch({ type: "STOPLOADER" });
              localStorage.setItem(
                "token",
                "Bearer " + responseData.access_token
              );
              notify("Login Successful");
              dispatch({ type: "AUTHENTICATEROUTES" });
              localStorage.setItem(
                "invoiceDetails",
                JSON.stringify(responseData2.created.invoice)
              );
              localStorage.setItem(
                "licencePlan",
                JSON.stringify(responseData2.created.licence)
              );
              notify("Invoice for Licence created Successfully");
              history.push("/invoice");
              console.log("from reduxsss", userDetail);
            }
          });
        }
      } else {
        notify("Invalid Username or Password", { type: toast.TYPE.INFO });
        dispatch({ type: "STOPLOADER" });
      }
    });
  };
  const notify = message => toast(message);

  return (
    <>
      {isRedirected ? <Redirect to="/dashboard" /> : null}
      <LoadingOverlay active={isLoading} spinner text="Loading your content...">
        <ToastContainer className="toast-container" />
        <ClientLayout
          showBackgroundImage={false}
          showFooter={true}
          Height="500px"
        >
          <Container
            component="main"
            maxWidth="xs"
            className={classes.loginContainer}
          >
            <CssBaseline />
            <div style={{ marginTop: 20 }}>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Typography>

              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                Sign in
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <span className={classes.label}>Email Address</span>
                  <BootstrapInput
                    required
                    inputRef={register}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    id="bootstrap-input"
                  />
                </FormControl>

                <FormControl>
                  <span className={classes.label}>Password</span>
                  <BootstrapInput
                    required
                    inputRef={register}
                    type="password"
                    name="password"
                    placeholder="password"
                    id="bootstrap-input"
                  />
                </FormControl>

                <FormControlLabel
                  style={{ textAlign: "left" }}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot" className={classes.linkbtn}>
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/category" className={classes.linkbtn}>
                      Dont have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}></Box>
          </Container>
        </ClientLayout>
      </LoadingOverlay>
    </>
  );
}
