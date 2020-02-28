import React, { useEffect, useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ResponsivePage from "../../components/ResponsivePage/ResponsivePage";
import {
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import SearchButton from "../../components/searchButton/searchButton";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import Loader from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  sideMargin: {
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      marginRight: 10,
      textAlign: "justify"
    }
  },
  sideMarginImage: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "96%"
    }
  }
}));

export default function RulesAndRegulationScreen(props) {
  const classes = useStyles();
  const [allNews, setNews] = useState([]);
  const [singleImage, setImages] = useState([]);
  const [Loadme, setLoader] = useState(true);
  const url = BASEURL + "/news-events/" + props.match.params.id;
  useEffect(() => {
    sendHttpRequestWithError("GET", url).then(responseData => {
      setImages(responseData.data.image[0].url);
      setNews(responseData.data);
      setLoader(false);
    });
  }, []);

  return (
    <>
      <LoadingOverlay active={Loadme} spinner text="Loading your content...">
        <ResponsivePage title={allNews.title}>
          {/* <img style={{width: '100%', height:500}} src={`https://lasretradbackend.landlordstech.com/${allNews.image[0].url}`} /> */}
          <Grid xs={12} sm={12} md={12}>
            <img
              className={classes.sideMarginImage}
              src={`https://lasretradbackend.landlordstech.com/${singleImage}`}
            />
          </Grid>
          <div className={classes.sideMargin}>
            {ReactHtmlParser(allNews.description)}
          </div>
        </ResponsivePage>
      </LoadingOverlay>
    </>
  );
}
