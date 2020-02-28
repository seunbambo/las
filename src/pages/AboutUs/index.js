import React, { useEffect, useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ResponsivePage from "../../components/ResponsivePage/ResponsivePage";
import Grid from "@material-ui/core/Grid";
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
import govImage from "./asset/gov.png";
import woman from "./asset/woman.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  imageStyle: {
    width: 220,
    height: 300,
    top: 143,
    [theme.breakpoints.down("md")]: {
      position: "relative",
      float: "justify",
      top: 0
    }
  },
  imageStyle2: {
    width: 220,
    height: 300,
    top: 500,
    [theme.breakpoints.down("md")]: {
      float: "justify",
      position: "relative",
      top: 0
    }
  },
  container: {
    width: "100%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "96%"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
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
    <ResponsivePage title="">
      <div className={classes.container}>
        <Grid container spacing={3} style={{ marginTop: 30 }}>
          <Grid item xs={12} sm={9} md={9} key={"text012"}>
            <p style={{ textAlign: "justify", lineHeight: 2 }}>
              Lagos State Real Estate Transaction Department is the regulatory
              authority in Lagos State on Real Estate Transactions.(LASRETRAD)
            </p>
            <p style={{ textAlign: "justify", lineHeight: 2 }}>
              {" "}
              This dedicated department was created by the Lagos State
              Government with the aim to regulate Real Estate/Developers working
              within the State. The Department was established on the 22nd of
              June, 2012 by the then the Executive Governor of Lagos State, Mr.
              Babatunde Raji Fashola and the State Executive Council strongly
              supported the established of this regulatory body.
            </p>

            <h2 style={{ textAlign: "justify", lineHeight: 2 }}>Purpose</h2>
            <p style={{ textAlign: "justify", lineHeight: 2 }}>
              The purpose of LASRETRAD can be narrowed down to five (5)
              specifics. These are{" "}
            </p>
            <ol style={{ textAlign: "justify", lineHeight: 2 }}>
              <li>
                <p>
                  The protection and enhancement of the stability of Lagos State
                  Real Estate Market.
                </p>
              </li>
              <li>
                <p>
                  Securing certain level of protection for property seekers.
                </p>
              </li>
              <li>
                <p>
                  To make property transaction process extremely transparent.
                </p>{" "}
              </li>
              <li>
                <p>
                  To totally eradicate quackery in Real Estate industry in the
                  state.
                </p>
              </li>
              <li>
                <p>To eliminate any type of property frauds. </p>
              </li>
            </ol>
            <p style={{ textAlign: "justify", lineHeight: 2 }}>
              The philosophy of Lasretrad is that property Seeker’s should be
              provided with necessary information needed to make right decision.
              Such information must be clear, fair and not misleading. Also,
              such prospective clients have the right to expect that any
              professional advice received is appropriate for his/her individual
              circumstance. In essence, the true condition of the property must
              be disclosed. See article 3-9 of the Primary Duty to Client, under
              licensed Estate Agents Code of Conduct.{" "}
            </p>
            <h2 style={{ textAlign: "justify", lineHeight: 2 }}>
              Consumer Information
            </h2>
            <ul style={{ textAlign: "justify", lineHeight: 2 }}>
              <li>
                <p>Avoid unregistered Estate Agents.</p>
              </li>
              <li>
                <p>
                  Together, we can nip in the bud, activities of quacks and all
                  unwholesome trade practiceson Real Estate Transaction in Lagos
                  State.
                </p>
              </li>
              <li>
                <p>
                  Search through the list directory to ascertain the
                  authenticity of estate agents you patronize. Find out if they
                  registered with us to avoid falling into the wrong hands.
                </p>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3} md={3} key={"text012"}>
            <img src={govImage} alt="" className={classes.imageStyle} />
            <img src={woman} alt="" className={classes.imageStyle2} />
          </Grid>
        </Grid>
      </div>
    </ResponsivePage>
  );
}
