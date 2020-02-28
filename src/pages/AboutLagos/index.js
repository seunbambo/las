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
import govImage from "./asset/gov.png";
import firstImage from "./asset/one.jpg";
import woman from "./asset/woman.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    width: "100%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "96%"
    }
  },
  imageStyle: {
    width: "100%",
    height: 558,
    [theme.breakpoints.down("sm")]: {
      width: "96%",
      height: "100%"
    }
  },
  imageStyleBackground: {
    backgroundImage: `url(${firstImage})`,
    width: "100%",
    height: 350,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function RulesAndRegulationScreen() {
  const classes = useStyles();

  return (
    <ResponsivePage title="">
      <div className={classes.container}>
        <p style={{ textAlign: "justify", lineHeight: 2 }}>
          <div className={classes.imageStyleBackground}></div>
          <br />
          Lagos State was created on May 27, 1967 by virtue of States [Creation
          and Transitional Provisions] Decree No. 14 of 1967 which restructured
          Nigeria’s Federation into 12 States. Prior to this, Lagos Municipality
          was administered as a Federal Territory by the Federal Government
          through the Federal Ministry of Lagos Affairs as the regional
          authority, while the Lagos City Council governed the City of Lagos.
          Equally, the Metropolitan areas [Colony Province] of Ikeja, Agege,
          Mushin, Ojo, Ikorodu, Epe, and Badagry were then administered by the
          Western Region Government. The State took off as an administrative
          entity on April 11, 1968 with Lagos Island serving the dual role of
          being the State and Federal Capital respectively. However, with the
          creation of the Federal Capital Territory of Abuja in 1976, Lagos
          ceased to be the capital of the State, as this was moved to Ikeja.
          Similarly, with the formal relocation of the seat of the Federal
          Government to Abuja on 12th December, 1991, Lagos ceased to be
          Nigeria’s political capital. Nevertheless, Lagos remains the nation’s
          economic and commercial capital. According to extant political
          records, “Lagos is to the people of Nigeria, what the head is to the
          body of an individual”
        </p>
        <p style={{ textAlign: "justify", lineHeight: 2 }}>
          {" "}
          This dedicated department was created by the Lagos State Government
          with the aim to regulate Real Estate/Developers working within the
          State. The Department was established on the 22nd of June, 2012 by the
          then the Executive Governor of Lagos State, Mr. Babatunde Raji Fashola
          and the State Executive Council strongly supported the established of
          this regulatory body.
        </p>

        <h2 style={{ textAlign: "justify", lineHeight: 2 }}>LOCATION/EXTENT</h2>
        <p style={{ textAlign: "justify", lineHeight: 2 }}>
          The State is located on the South–Western part of Nigeria, on the
          narrow plain of the Bight of Benin. Lying approximately on longitude
          20 42’E and 32 2’E respectively, and between latitude 60 22’N and 60
          2’N, Lagos State is bounded in the North and East by Ogun State of
          Nigeria, in the West by Republic of Benin, and stretches over 180
          kilometers along the Guinea Coast of the Bight of Benin on the
          Atlantic Ocean. Its territorial extent and political jurisdiction
          encompasses the city of Lagos and the four administrative divisions of
          Ikeja, Ikorodu, Epe and Badagry collectively referred to as IBILE and
          covering an area of 358,862 hectares or 3,577 sq. km. which represents
          0.4% of Nigeria’s territorial land mass of 923,773 sq. km.
        </p>

        <h2 style={{ textAlign: "justify", lineHeight: 2 }}>RELIEF</h2>
        <p style={{ textAlign: "left", lineHeight: 2 }}>
          The dominant vegetation of the State is the swamp forest of the fresh
          water and mangrove swamp forests, both of which are influenced by the
          double rainfall pattern of the state, which makes the environment a
          wetland region. Generally, the State has two climatic seasons: Dry
          [November-March] and Wet [April-October]. The drainage system of the
          State is characterized by a maze of lagoons and waterways, which
          constitutes about 22% or 787 sq. km. [75.755 hectares] of the State’s
          territory. The major water bodies are the Lagos and Lekki Lagoons,
          Yewa, Ogun, Oshun, and Kweme Rivers. Others are Ologe Lagoon, Kuramo
          Waters, and Badagry, Five Cowries and Omu Creeks respectively.
        </p>
        <h2 style={{ textAlign: "justify", lineHeight: 2 }}>DEMOGRAPHY</h2>
        <p style={{ textAlign: "justify", lineHeight: 2 }}>
          Lagos State is the smallest state in Nigeria yet, it has the highest
          urban population, which is 27.4 % of the national estimate
          [UN-Habitat]. According to the 2006 National Census, Lagos State has a
          population of 9,013,534 in relation to the National count of
          140,003,542. However, based on the UN-Habitat and international
          development agencies’ estimates, Lagos State is said to have about
          24.6 million inhabitants in 2015. Of this population, Metropolitan
          Lagos accounts for over 85% on an area that is 37% of the land area of
          the State, and the fact that Lagos population is growing 10 times
          faster than that of New York and Los Angeles, and more than the
          population of 32 African nations combined, the State population is
          expected to hit the 35 million mark in 2020.
        </p>
      </div>
    </ResponsivePage>
  );
}
