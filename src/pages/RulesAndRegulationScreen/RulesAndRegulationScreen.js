import React, { useState, useEffect } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./RulesAndRegulationScreen.css";
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
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  faqContainer: {
    width: "70%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%"
    }
  },
  faqHeader: {
    textAlign: "center",
    lineHeight: 2,
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16
    }
  }
}));

export default function RulesAndRegulationScreen() {
  const classes = useStyles();

  const url = BASEURL + "/frequently-asked-questions";
  const [allNews, setNews] = useState([]);
  const [Loadme, setLoader] = useState(true);

  useEffect(() => {
    console.log("rules starting");
    sendHttpRequestWithError("GET", url).then(responseData => {
      console.log("this is the newsData", responseData.data);
      setNews(responseData.data);
      setLoader(false);
    });
  }, []);

  return (
    <>
      <LoadingOverlay active={Loadme} spinner text="Loading your content...">
        <ClientLayout
          paddingTop="30px"
          width="100%"
          showCurvedFooter={false}
          showFooter={true}
          showBackgroundImage={false}
          backgroundColor="white"
          height="900px"
        >
          <div className={classes.faqContainer}>
            <h1 className={classes.faqHeader}>Frequently Asked Questions</h1>
            <p
              style={{
                textAlign: "center",
                lineHeight: 2,
                fontSize: 14,
                fontFamily: "Montserrat"
              }}
            >
              All property service providers, letting/sales property Agents in
              Lagos that applied for registration must adhere to the high
              standards of ethical behaviour as outlined in the Lagos State code
              of professional ethnics for accredited Estate Agents.
            </p>
            <p
              style={{
                textAlign: "center",
                lineHeight: 2,
                fontSize: 14,
                fontFamily: "Montserrat"
              }}
            >
              The aim of registration is to ensure that all Real Estate Property
              Service Providers in Lagos State are fit and proper to be Estate
              Agents. This registration will help the state Government Real
              Estate Environment to remove disreputable Agents from the market,
              protect landlords and tenants, protect communities and Lagosians
              from the impact of antisocial behaviour and mismanagement of
              property.
            </p>
          </div>
          <div className="rules">
            <TransparentButton />

            {allNews.map((eachNews, index) => (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    className={classes.h6}
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    {eachNews.title}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography style={{ textAlign: "left" }}>
                    {ReactHtmlParser(eachNews.description)}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        </ClientLayout>
      </LoadingOverlay>
    </>
  );
}
