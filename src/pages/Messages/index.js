import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import DashboardLayout from "../../layouts/DashboardLayout";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  useHistory,
  Redirect,
  NavLink,
  Route,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import {
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";

// import './GetRenewLicence.css';
import useForm from "react-hook-form";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const dispatch = useDispatch(); //we use it to pass an action, by specifying the action Type
  const [type_of_property, changePropertyType] = useState("Residential");
  const [showPreloader, changePreloader] = useState(false);
  const [Detail, changeDetails] = useState({});
  const [user_type, changeUserType] = useState("");
  const [token2, changeToken] = useState("");
  const [enabled, changeEnabled] = useState(false);
  const [redirect, changeRedirect] = useState(false);
  const [licencePlan, changeLicencePlan] = useState("");
  const [certificate_of_incorporation, changeCert] = useState("");
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("");
  const [accessToken, changeAccessToken] = useState("");
  const [userId, changeUserId] = useState(0);

  const [name, changeName] = useState("");
  const [lastname, changeLastName] = useState("");
  const isRedirected = useSelector(state => state.toHome);
  const userDetail = useSelector(state => state.userDetail);

  let history = useHistory();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    var state = JSON.parse(localStorage.getItem("reduxStore"));
    const userToken2 = localStorage.getItem("token");
    if (userToken2 == null || userToken2 == "" || state.userDetail == {}) {
      history.push("/login");
    }
    if (userToken2 != null && state.userDetail != {}) {
      changeDetails(state.userDetail);
      console.log("from useEffect", state.userDetail);
      changeUserType(state.userDetail.user.user_type);
      changeName(state.userDetail.user.name);
      changeLastName(state.userDetail.user.last_name);
      changeUserId(state.userDetail.user.id);
      changeAccessToken(state.userDetail.access_token);
      // console.log("from use Eff", state.userDetail.access_token)
      // console.log("from eff", state.userDetail.user.id)
    }
  }, []);
  return (
    <DashboardLayout
      width="100%"
      showCurvedFooter={false}
      showFooter={true}
      showBackgroundImage={false}
      backgroundColor="white"
      height="700px"
    >
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </DashboardLayout>
  );
}
