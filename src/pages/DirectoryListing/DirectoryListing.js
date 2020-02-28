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
  sendHttpRequestWithErrorGet,
  sendHttpRequestWithError,
  sendHttpRequestWithFormDataWithObject,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";
import SearchButton from "../../components/searchButton/searchButton";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    width: "100%",
    margin: "auto",
    textAlign: "justify",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      width: "97%"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  header: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 30
  }
}));

export default function RulesAndRegulationScreen() {
  const classes = useStyles();

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
    <ResponsivePage title="" className={classes.header}>
      <Typography variant="h4" gutterBottom className={classes.header}>
        Directory Listing
      </Typography>
      <div className={classes.container}>
        <p>
          This public register is a database of all our Licensed Real Estate
          Agents. Companies and Estate Brokers in Lagos State. Once an Estate
          Agent is registered by us, we require them to meet the standards set
          out in our professional code of Ethics and bill of Rules and
          Regulations. Please click here to see the Rules and Regulatory Code of
          Conduct that guides and protects the practice of Estate Agents in
          Lagos State.
        </p>
        <p>
          {" "}
          This public register can be used to check if someone is licenced by
          us. find their contact details and also check if they have any
          complaints upheld against them.
        </p>
        <p>
          Our search form can be used to find a person who holds a licence to
          deal on Real estate in the state
        </p>
        <div style={{ overflow: "auto" }}>
          <SearchButton
            items={items}
            DropdownBgColor="#072455"
            DropdownTextColor="white"
          />
        </div>
      </div>
    </ResponsivePage>
  );
}
