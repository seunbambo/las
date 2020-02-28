import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Education.css";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Link } from "react-router-dom";
import ClientLayout from "../../layouts/ClientLayout";
import TransparentButton from "../../components/TransparentButton/TransparentButton";
import {
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import Loader from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";
import SearchButton from "../../components/searchButton/searchButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  linkConfig: {
    textDecoration: "none",
    color: "#0768ab"
  },
  all: {
    paddingRight: theme.spacing(4),
    fontWeight: "500",
    paddingBottom: theme.spacing(2),
    // borderBottom: '3px solid #0FCAD0',
    marginBottom: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginBottom: 100,
    flexGrow: 1,
    color: theme.palette.text.secondary
  }
}));

export default function Education() {
  const url = BASEURL + "/education";
  const [allNews, setNews] = useState([]);
  const [Loadme, setLoader] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    sendHttpRequestWithError("GET", url).then(responseData => {
      // console.log("this is the newsData for education", responseData.data);
      setNews(responseData.data);
      setLoader(false);
    });
  }, []);

  function truncator(str) {
    return str.substr(0, 200) + "...";
  }
  function headerTruncator(str) {
    return str.substr(0, 35) + "...";
  }
  const items = [
    "Theoderic",
    "theo",
    "Onipe",
    "Lagos",
    "Sara",
    "Jane",
    "Roland",
    "Ohunene"
  ];
  return (
    <>
      <LoadingOverlay active={Loadme} spinner text="Loading your content...">
        <ClientLayout
          width="100%"
          showCurvedFooter={false}
          showFooter={true}
          showBackgroundImage={false}
          backgroundColor="white"
          height="400px"
        >
          <div className="news__container">
            <div className="rules" style={{ marginTop: 20, marginBottom: 20 }}>
              <h1>Education</h1>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4} md={2}>
                <Typography className={classes.all} variant="subtitle" noWrap>
                  All
                </Typography>
                <Typography className={classes.all} variant="subtitle" noWrap>
                  Published
                </Typography>
                <Typography className={classes.all} variant="subtitle" noWrap>
                  Paid
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 30 }}>
              {allNews.map((eachNews, index) => (
                <Grid item xs={12} sm={6} md={4} key={eachNews.id}>
                  <Link
                    to={`education/${eachNews.id}`}
                    className={classes.linkConfig}
                  >
                    <Paper className={classes.paper}>
                      <img
                        style={{ width: "100%", height: "auto" }}
                        src={`https://lasretradbackend.landlordstech.com/${eachNews.image[0].url}`}
                      />

                      <h4
                        style={{
                          textTransform: "uppercase",
                          textAlign: "left"
                        }}
                      >
                        {ReactHtmlParser(headerTruncator(eachNews.title))}
                      </h4>
                      <p style={{ textAlign: "left" }}>
                        {ReactHtmlParser(truncator(eachNews.description))}
                      </p>
                      <Link to={`education/${eachNews.id}`}>Read more</Link>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </ClientLayout>
      </LoadingOverlay>
    </>
  );
}
