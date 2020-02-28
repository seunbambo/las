import React, { useEffect, useState } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import useForm from "react-hook-form";
import axios from "axios";
import { BASEURL } from "../../helpers/apiMethods";
import { Line as LineChart } from "react-chartjs-2";

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

import useStateWithCallback, {
  useStateWithCallbackInstant
} from "use-state-with-callback";
import LoadingOverlay from "react-loading-overlay";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: 5,
      width: "20%",
      [theme.breakpoints.down("sm")]: {
        width: "98%"
      }
    }
  },

  margin: {
    margin: theme.spacing(3, 1),
    [theme.breakpoints.down("sm")]: {
      width: "98%",
      float: "none"
    }
  },
  formCont: {
    color: "#9cf3c2",
    paddingBottom: 10
  },
  rightSide: {
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      float: "none"
    }
  },
  btnHolder: {
    marginBottom: 30,
    marginTop: 20
  },
  description: {
    textAlign: "center",
    fontFamily: "Montserrat",
    marginTop: 30,
    marginBottom: 30
  },
  header: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 600
  },
  formContainer: {
    minWidth: 200,
    cursor: "pointer",
    minHeight: 210,
    border: "1px solid gray",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  formContainerText: {
    textAlign: "center",
    paddingTop: 24
  },

  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  outlinedBtn: {
    width: "100%",
    color: "#072455",
    border: "1px solid #072455",
    height: 55,
    textTransform: "capitalize"
  },
  normalBtn: {
    width: "100%",
    height: 55,
    color: "white",
    textTransform: "capitalize"
  },
  RightText: {
    textAlign: "left"
  },
  leftText: {
    textAlign: "right"
  },
  circularText: {
    borderRadius: "50%",
    height: "26px",
    width: "26px",
    lineHeight: "26px",
    display: "inline-block",
    textAlign: "center",
    marginRight: "6px"
  },
  contain: {
    marginLeft: "6%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  btnCategory: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
      fontSize: 12,
      color: "#072455"
    }
  },
  input: {
    borderRadius: 4,
    marginTop: 15,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #072455",
    color: "#072455",
    fontSize: 12,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px"
    },
    padding: "15px 15px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

export default function InformationAndDataAnalysis(props) {
  // form methods
  const url = BASEURL + "/chart/load";
  const [data, setData] = useState([]);
  const [propertiesData, setDataProperties] = useState([]);
  const [developmentData, setDataDevelopments] = useState([]);
  const [tenancyData, setDataTenancies] = useState([]);
  const { register, handleSubmit } = useForm();

  const [LoadMe, setLoader] = useState(true);

  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate:
      '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
  };
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json"
    };
    axios({
      method: "POST",
      url: url,
      headers: headers
    })
      .then(response => {
        console.log(response.data.data.properties);
        setData(response.data);
        setDataProperties(response.data.data.properties);
        setDataTenancies(response.data.data.tenancies);
        setDataDevelopments(response.data.data.developments);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  const statData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Properties stats for " + data.year,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(6,29,68)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(6,29,68)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(6,29,68)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: propertiesData
      },
      {
        label: "Tenancy stats for " + data.year,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(19,68,27)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(19,68,27)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(19,68,27)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: tenancyData
      },
      {
        label: "Developments stats for " + data.year,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(68,26,34)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(68,26,34)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(68,26,34)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: developmentData
      }
    ]
  };
  const onSubmit = data => {
    setLoader(true);
    const headers = {
      "Content-Type": "application/json"
    };

    setData([]);
    const searchUrl = BASEURL + "/chart/load";
    const formDataChart = new FormData();
    formDataChart.append("location", data.location);
    formDataChart.append("type", data.type);
    formDataChart.append("year", data.year);
    axios({
      method: "POST",
      url: searchUrl,
      data: formDataChart,
      headers: headers
    }).then(response => {
      setData(response.data);
      setDataProperties(response.data.data.properties);
      setDataTenancies(response.data.data.tenancies);
      setDataDevelopments(response.data.data.developments);
      setLoader(false);
      if (response.hasOwnProperty("data")) {
      } else {
        setLoader(false);
      }
    });
  };
  return (
    <LoadingOverlay active={LoadMe} spinner text="Loading data...">
      <ClientLayout
        width="100%"
        showCurvedFooter={false}
        showFooter={true}
        showBackgroundImage={false}
        backgroundColor="white"
        height="700px"
      >
        <div className={classes.rightSide}>
          <Typography variant="h4" gutterBottom className={classes.header}>
            Information & Data Analysis
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.description}
          >
            Expert Research in condensed form. The National Development Survey
            helps marketers, planners, project managers and developers etc to
            Understand Real Estate consumer behaviour and there interaction
            across geo-political zones. Explore to Real Estate development and
            marketing on a national basis.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            autoComplete="off"
          >
            <div style={{ width: "100%" }}>
              <TextField
                id="standard-select-currency"
                select
                label="LGA"
                ref={register}
                name="location"
              >
                <MenuItem selected="selected" key={"all"} value={"all"}>
                  All
                </MenuItem>
                <MenuItem key={"ikeja"} value={"ikeja"}>
                  Ikeja
                </MenuItem>
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                ref={register}
                label="Property Type"
                name="type"
              >
                <MenuItem key={"all"} value={"all"}>
                  All
                </MenuItem>
                <MenuItem key={"residential"} value={"residential"}>
                  Residential
                </MenuItem>
                <MenuItem key={"office"} value={"office"}>
                  Office
                </MenuItem>
                <MenuItem key={"hotel"} value={"hotel"}>
                  Hotel
                </MenuItem>
                <MenuItem key={"industrial"} value={"industrial"}>
                  Industrial
                </MenuItem>
              </TextField>
              <TextField
                id="standard-select-year"
                select
                ref={register}
                label="Year"
                name="year"
              >
                <MenuItem key={"2019"} value={"2019"}>
                  2019
                </MenuItem>
                <MenuItem key={"2020"} value={"2020"}>
                  2020
                </MenuItem>
              </TextField>
              <Button
                ref={register}
                type="submit"
                variant="outlined"
                size="small"
                color="primary"
                className={classes.margin}
              >
                Submit
              </Button>
            </div>
          </form>
          <Grid container spacing={2} className={classes.btnHolder}>
            <Grid item xs={12} sm={12} md={12} key={"data-analysis"}>
              <LineChart data={statData} options={options} />
            </Grid>
          </Grid>
        </div>
      </ClientLayout>
    </LoadingOverlay>
  );
}
