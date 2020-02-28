import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./NewsAndEventScreen.css";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory, Link } from "react-router-dom";
import ClientLayout from "../../layouts/ClientLayout";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
import LoadingOverlay from "react-loading-overlay";
import dateFormat from "dateformat";
import Divider from "@material-ui/core/Divider";
import SearchButton from "../../components/searchNews/searchButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  typography: {
    button: {
      textTransform: "none"
    }
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
  paper2: {
    padding: 0,
    boxShadow: "none",
    textAlign: "center",
    height: "360px",
    flexGrow: 1,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10
    }
  },
  paper: {
    padding: 0,
    boxShadow: "none",
    textAlign: "center",
    marginBottom: 30,
    flexGrow: 1,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textDecoration: "none",
    backgroundColor: "#072455",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
}));

const theme = createMuiTheme();

export default function Education() {
  const url = BASEURL + "/news-events";
  const [allNews, setNews] = useState([]);
  const [Loadme, setLoader] = useState(true);
  const [offset, handleClick] = useState(0);
  const [currentLocation, changeCurrentLocation] = useState(6);
  //onClick={(e, offset) => this.handleClick(offset)
  const classes = useStyles();

  useEffect(() => {
    sendHttpRequestWithError("GET", url).then(responseData => {
      // console.log("this is the newsData", responseData.data);
      setNews(responseData.data);
      setLoader(false);
    });
  }, []);

  function truncator(str, length) {
    return str.substr(0, length) + "...";
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

  const firstThree = allNews.slice(0, 6);
  const firstFourSix = allNews.slice(3, 6);
  const fourAlone = allNews.slice(3, 4);
  const sixAlone = allNews.slice(5, 6);

  const loadmore = () => {
    let current = currentLocation;
    changeCurrentLocation(current + 3);
  };

  const remainingDocument = allNews.slice(6, currentLocation);

  // console.log("this is the first3", firstThree);
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
            <div className="rules" style={{ marginTop: 20, marginBottom: 10 }}>
              <h1 style={{ fontWeight: "bold" }}>News and Events</h1>
              <p style={{ fontWeight: "bold" }}>
                The News and Events are personally Curated by the team at
                Lasretrad
              </p>

              <div>
                <SearchButton
                  items={items}
                  DropdownBgColor="#072455"
                  DropdownTextColor="white"
                />
              </div>
            </div>
            <Grid container spacing={2} style={{ marginTop: 30 }}>
              <Grid item xs={12} sm={6} md={3} key={"v021"}>
                <Link className={classes.linkConfig}>
                  <Paper className={classes.paper}>
                    <div
                      style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontSize: 12
                      }}
                    >
                      <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/MpWCv7AVppA"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div style={{ position: "relative", textAlign: "left" }}>
                      <span
                        style={{
                          color: "#b2f2e5",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          fontSize: 30,
                          letterSpacing: 3
                        }}
                      >
                        QA1...
                      </span>
                      <span
                        style={{
                          color: "#757784",
                          fontWeight: "600",
                          position: "absolute",
                          top: "36%",
                          left: 0,
                          fontFamily: "Montserrat",
                          fontSize: 10
                        }}
                      >
                        {dateFormat("2020-02-18 13:10:25", "dd mmm yyyy")}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginTop: 0
                      }}
                    >
                      {truncator("Introduction...", 46)}
                    </h4>
                    <Link style={{ textDecoration: "none", color: "#b8babe" }}>
                      <p
                        style={{
                          textDecoration: "none",
                          textAlign: "left",
                          fontSize: 12
                        }}
                      >
                        {" "}
                        {ReactHtmlParser(truncator("", 220))}{" "}
                      </p>
                    </Link>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={3} key={"v02"}>
                <Link className={classes.linkConfig}>
                  <Paper className={classes.paper}>
                    <div
                      style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontSize: 12
                      }}
                    >
                      <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/0DSd0gz9goo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div style={{ position: "relative", textAlign: "left" }}>
                      <span
                        style={{
                          color: "#b2f2e5",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          fontSize: 30,
                          letterSpacing: 3
                        }}
                      >
                        QA1...
                      </span>
                      <span
                        style={{
                          color: "#757784",
                          fontWeight: "600",
                          position: "absolute",
                          top: "36%",
                          left: 0,
                          fontFamily: "Montserrat",
                          fontSize: 10
                        }}
                      >
                        {dateFormat("2020-02-18 13:10:25", "dd mmm yyyy")}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginTop: 0
                      }}
                    >
                      {truncator("Question & Answer one", 46)}
                    </h4>
                    <Link style={{ textDecoration: "none", color: "#b8babe" }}>
                      <p
                        style={{
                          textDecoration: "none",
                          textAlign: "left",
                          fontSize: 12
                        }}
                      >
                        {" "}
                        {ReactHtmlParser(truncator("", 220))}{" "}
                      </p>
                    </Link>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={3} key={"v02"}>
                <Link className={classes.linkConfig}>
                  <Paper className={classes.paper}>
                    <div
                      style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontSize: 12
                      }}
                    >
                      <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/74Yjs-thOsM"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div style={{ position: "relative", textAlign: "left" }}>
                      <span
                        style={{
                          color: "#b2f2e5",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          fontSize: 30,
                          letterSpacing: 3
                        }}
                      >
                        QA12...
                      </span>
                      <span
                        style={{
                          color: "#757784",
                          fontWeight: "600",
                          position: "absolute",
                          top: "36%",
                          left: 0,
                          fontFamily: "Montserrat",
                          fontSize: 10
                        }}
                      >
                        {dateFormat("2020-02-18 13:10:25", "dd mmm yyyy")}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginTop: 0
                      }}
                    >
                      {truncator("Question & Answer two", 46)}
                    </h4>
                    <Link style={{ textDecoration: "none", color: "#b8babe" }}>
                      <p
                        style={{
                          textDecoration: "none",
                          textAlign: "left",
                          fontSize: 12
                        }}
                      >
                        {" "}
                        {ReactHtmlParser(truncator("", 220))}{" "}
                      </p>
                    </Link>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={3} key={"v03"}>
                <Link className={classes.linkConfig}>
                  <Paper className={classes.paper}>
                    <div
                      style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontSize: 12
                      }}
                    >
                      <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/TwZH9wLxC5w"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div style={{ position: "relative", textAlign: "left" }}>
                      <span
                        style={{
                          color: "#b2f2e5",
                          fontFamily: "Montserrat",
                          fontWeight: "900",
                          fontSize: 30,
                          letterSpacing: 3
                        }}
                      >
                        QA13...
                      </span>
                      <span
                        style={{
                          color: "#757784",
                          fontWeight: "600",
                          position: "absolute",
                          top: "36%",
                          left: 0,
                          fontFamily: "Montserrat",
                          fontSize: 10
                        }}
                      >
                        {dateFormat("2020-02-18 13:10:25", "dd mmm yyyy")}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontSize: 13,
                        color: "black",
                        textAlign: "left",
                        marginTop: 0
                      }}
                    >
                      {truncator("Question & Answer three", 46)}
                    </h4>
                    <Link style={{ textDecoration: "none", color: "#b8babe" }}>
                      <p
                        style={{
                          textDecoration: "none",
                          textAlign: "left",
                          fontSize: 12
                        }}
                      >
                        {" "}
                        {ReactHtmlParser(truncator("", 220))}{" "}
                      </p>
                    </Link>
                  </Paper>
                </Link>
              </Grid>
            </Grid>

            <Divider />
            <Grid container spacing={3} style={{ marginTop: 30 }}>
              {firstThree.map((eachNews, index) => (
                <Grid item xs={12} sm={6} md={4} key={eachNews.id}>
                  <Link
                    className={classes.linkConfig}
                    to={`news/${eachNews.id}`}
                  >
                    <Paper className={classes.paper}>
                      <img
                        alt="lasretrad"
                        style={{ width: "100%", height: 200 }}
                        src={`https://lasretradbackend.landlordstech.com/${eachNews.image[0].url}`}
                      />
                      <div style={{ position: "relative", textAlign: "left" }}>
                        <span
                          style={{
                            color: "#b2f2e5",
                            fontFamily: "Montserrat",
                            fontWeight: "900",
                            fontSize: 30,
                            letterSpacing: 3
                          }}
                        >
                          0{eachNews.id}
                        </span>
                        <span
                          style={{
                            color: "#757784",
                            fontWeight: "600",
                            position: "absolute",
                            top: "36%",
                            left: 0,
                            fontFamily: "Montserrat",
                            fontSize: 10
                          }}
                        >
                          {dateFormat(eachNews.created_at, "dd mmm yyyy")}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontSize: 13,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                          textTransform: "uppercase"
                        }}
                      >
                        {truncator(eachNews.title, 46)}
                      </h4>
                      <Link
                        style={{ textDecoration: "none", color: "#b8babe" }}
                        to={`news/${eachNews.id}`}
                      >
                        <p
                          style={{
                            textDecoration: "none",
                            textAlign: "left",
                            fontSize: 12
                          }}
                        >
                          {" "}
                          {ReactHtmlParser(
                            truncator(eachNews.description, 185)
                          )}{" "}
                        </p>
                      </Link>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>

            {/* <Divider /> */}

            <Grid container spacing={3} style={{ marginTop: 50 }}>
              {/* <Grid
                item
                xs={12}
                sm={6}
                md={4}
                // style={{ position: "relative", width: "100", height: "auto" }}
              >
                {fourAlone.map((eachNews, index) => (
                  <Grid item xs={12} sm={12} md={12} key={eachNews.id}>
                    <Link
                      className={classes.linkConfig}
                      to={`news/${eachNews.id}`}
                    >
                      <Paper className={classes.paper2}>
                        <img
                          alt="lasretrad"
                          style={{ width: "100%", height: 200 }}
                          src={`https://lasretradbackend.landlordstech.com/${eachNews.image[0].url}`}
                        />
                      
                      <div
                          style={{ position: "relative", textAlign: "left" }}
                      >
                          <span
                            style={{
                              color: "#b2f2e5",
                              fontFamily: "Montserrat",
                              fontWeight: "900",
                              fontSize: 30,
                              letterSpacing: 3
                            }}
                          >0{eachNews.id}
                          </span>
                          <span
                            style={{
                              color: "#757784",
                              fontWeight: "600",
                              position: "absolute",
                              top: "36%",
                              left: 0,
                              fontFamily: "Montserrat",
                              fontSize: 10
                            }}
                          >
                          {dateFormat(eachNews.created_at, "dd mmm yyyy")}
                        </span>
                        </div>
                        <h4
                          style={{
                            fontSize: 13,
                            color: "black",
                            textAlign: "left",
                            marginTop: 0
                          }}
                        >
                          {truncator(eachNews.title, 46)}
                        </h4>
                        <Link
                          style={{ textDecoration: "none", color: "#b8babe" }}
                          to={`news/${eachNews.id}`}
                        >
                          <p
                            style={{
                              textDecoration: "none",
                              textAlign: "left",
                              fontSize: 12
                            }}
                          >
                            {" "}
                            {ReactHtmlParser(
                              truncator(eachNews.description, 220)
                            )}{" "}
                          </p>
                        </Link>
                    </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid> */}
              {/* <Grid container spacing={3} item xs={12} sm={12} md={12}>
                {firstFourSix.map((eachNews, index) => (
                  <Grid item xs={12} sm={6} md={4} key={eachNews.id}>
                    <Link
                      className={classes.linkConfig}
                      to={`news/${eachNews.id}`}
                    >
                      <Paper className={classes.paper}>
                        <img
                          alt="lasretrad"
                          style={{ width: "100%", height: 200 }}
                          src={`https://lasretradbackend.landlordstech.com/${eachNews.image[0].url}`}
                        />
                        <div
                          style={{ position: "relative", textAlign: "left" }}
                        >
                          <span
                            style={{
                              color: "#b2f2e5",
                              fontFamily: "Montserrat",
                              fontWeight: "900",
                              fontSize: 30,
                              letterSpacing: 3
                            }}
                          >
                            0{eachNews.id}
                          </span>
                          <span
                            style={{
                              color: "#757784",
                              fontWeight: "600",
                              position: "absolute",
                              top: "36%",
                              left: 0,
                              fontFamily: "Montserrat",
                              fontSize: 10
                            }}
                          >
                            {dateFormat(eachNews.created_at, "dd mmm yyyy")}
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: 13,
                            color: "black",
                            textAlign: "left",
                            marginTop: 0
                          }}
                        >
                          {truncator(eachNews.title, 40)}
                        </h4>
                        <Link
                          style={{ textDecoration: "none", color: "#b8babe" }}
                          to={`news/${eachNews.id}`}
                        >
                          <p
                            style={{
                              textDecoration: "none",
                              textAlign: "left",
                              fontSize: 12
                            }}
                          >
                            {" "}
                            {ReactHtmlParser(
                              truncator(eachNews.description, 185)
                            )}{" "}
                          </p>
                        </Link>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid> */}
              {/* <Grid item xs={12} sm={6} md={4}>
                {sixAlone.map((eachNews, index) => (
                  <Grid item xs={12} sm={12} md={12} key={eachNews.id}>
                    <Link
                      className={classes.linkConfig}
                      to={`news/${eachNews.id}`}
                    >
                      <Paper className={classes.paper}>
                        <img
                          style={{ width: "100%", height: 200 }}
                          src={`https://lasretradbackend.landlordstech.com/${eachNews.image[0].url}`}
                        />
                        <div
                          style={{ position: "relative", textAlign: "left" }}
                        >
                          <span
                            style={{
                              color: "#b2f2e5",
                              fontFamily: "Montserrat",
                              fontWeight: "900",
                              fontSize: 30,
                              letterSpacing: 3
                            }}
                          >
                            0{eachNews.id}
                          </span>
                          <span
                            style={{
                              color: "#757784",
                              fontWeight: "600",
                              position: "absolute",
                              top: "36%",
                              left: 0,
                              fontFamily: "Montserrat",
                              fontSize: 10
                            }}
                          >
                            {dateFormat(eachNews.created_at, "dd mmm yyyy")}
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: 13,
                            color: "black",
                            textAlign: "left",
                            marginTop: 0
                          }}
                        >
                          {truncator(eachNews.title, 46)}
                        </h4>
                        <Link
                          style={{ textDecoration: "none", color: "#b8babe" }}
                          to={`news/${eachNews.id}`}
                        >
                          <p
                            style={{
                              textDecoration: "none",
                              textAlign: "left",
                              fontSize: 12
                            }}
                          >
                            {" "}
                            {ReactHtmlParser(
                              truncator(eachNews.description, 220)
                            )}{" "}
                          </p>
                        </Link>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid> */}

              <Grid
                container
                spacing={4}
                style={{ marginTop: 30, marginLeft: 2 }}
              >
                {remainingDocument.map((eachNews, index) => (
                  <Grid item xs={12} sm={4} md={4} key={eachNews.id}>
                    <Link
                      className={classes.linkConfig}
                      to={`news/${eachNews.id}`}
                    >
                      <Paper className={classes.paper}>
                        <div
                          style={{ position: "relative", textAlign: "left" }}
                        >
                          <span
                            style={{
                              color: "#b2f2e5",
                              fontFamily: "Montserrat",
                              fontWeight: "900",
                              fontSize: 30,
                              letterSpacing: 3
                            }}
                          >
                            0{eachNews.id}
                          </span>
                          <span
                            style={{
                              color: "#757784",
                              fontWeight: "600",
                              position: "absolute",
                              top: "36%",
                              left: 0,
                              fontFamily: "Montserrat",
                              fontSize: 10
                            }}
                          >
                            {dateFormat(eachNews.created_at, "dd mmm yyyy")}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontSize: 13,
                            color: "black",
                            textAlign: "left",
                            marginTop: 0
                          }}
                        >
                          {truncator(eachNews.title, 46)}
                        </h4>
                        <Link
                          style={{ textDecoration: "none", color: "#b8babe" }}
                          to={`news/${eachNews.id}`}
                        >
                          <p
                            style={{
                              textDecoration: "none",
                              textAlign: "left",
                              fontSize: 12
                            }}
                          >
                            {" "}
                            {ReactHtmlParser(
                              truncator(eachNews.description, 185)
                            )}{" "}
                          </p>
                        </Link>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={loadmore}
                  className={classes.submit}
                >
                  Load More
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={3}></Grid>
          </div>
        </ClientLayout>
      </LoadingOverlay>
    </>
  );
}
