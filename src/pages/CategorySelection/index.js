import React, { useState, useEffect } from "react";
import ClientLayout from "../../layouts/ClientLayout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormComponent from "./FormComponent/FormComponent";
import { mergeClasses } from "@material-ui/styles";
import home1 from "./assets/house2.svg";
import developer from "./assets/developer.svg";
import home2 from "./assets/house1.svg";
import tenant from "./assets/tenant.svg";
import landlordsdeep from "./assets/landlorddeep.svg";
import professional from "./assets/professional.svg";
import agent from "./assets/agent.svg";
import { useHistory } from "react-router-dom";
import markedA from "./assets/mark.svg";
import markedI from "./assets/transparent.png";
import useStateWithCallback, {
  useStateWithCallbackInstant
} from "use-state-with-callback";

import landlordsA from "./assets/landlords/clicked.svg";
import landlordsI from "./assets/landlords/unclicked.svg";

import tenantA from "./assets/tenant/clicked.svg";
import tenantI from "./assets/tenant/unclicked.svg";

import agentI from "./assets/agent/unclicked.svg";
import agentA from "./assets/agent/clicked.svg";

import developerA from "./assets/developer/clicked.svg";
import developerI from "./assets/developer/unclicked.svg";

import professionalA from "./assets/professional/clicked.svg";
import professionalI from "./assets/professional/unclicked.svg";

import CategoryCard from "../../components/CategoryCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2)
    }
  },
  formContainer: {
    minWidth: 200,
    cursor: "pointer",
    minHeight: 210,
    border: "1px solid gray"
  },
  formContainerText: {
    textAlign: "center",
    paddingTop: 24,
    fontWeight: "bold",
    color: "#dde1e9"
  },
  flexOverall: {
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "95%"
    }
  },

  formContainerImage: {
    width: 100,
    height: 100,
    borderRadius: "1px",
    margin: "auto",
    marginTop: "29px"
  },
  contain: {
    marginLeft: "6%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: -10
    }
  },
  btnCategory: {
    width: "100%",
    color: "white",
    background: "#072455",
    "&:hover": {
      background: "#284174"
    },
    "&:disabled": {
      background: "#bec6d5"
    }
  }
}));

export default function CategorySelection() {
  const classes = useStyles();
  const [btnEnabler, changeBtnEnable] = useState(true);
  const [currentLink, changeCurrentLink] = useState("");
  const [mycolors, colors] = useState({
    landlords: "#f1f3f3",
    professional: "#f1f3f3",
    developer: "#f1f3f3",
    tenant: "#f1f3f3",
    property_agent: "#f1f3f3"
  });
  const [items, setItem] = useState({
    unclicked: true,
    category_name_selected: ""
  });

  //

  function itemSelector(selected_id) {
    setItem({
      ...items,
      category_name_selected: selected_id,
      unclicked: !items.unclicked
    });
  }
  let history = useHistory();

  function handleClick() {
    history.push(`registration/${items.category_name_selected}`);
  }

  useEffect(() => {
    var state = JSON.parse(localStorage.getItem("reduxStore"));
    const userToken2 = localStorage.getItem("token");

    if (
      userToken2 == undefined ||
      state.userDetail == {} ||
      state.userDetail == undefined
    ) {
      history.push("/category");
    } else if (userToken2 !== undefined && state.userDetail !== {}) {
      history.push("/dashboard");
    }
  }, []);

  const [eachImage, changeImage] = useState({
    landlords: landlordsI,
    professional: professionalI,
    developer: developerI,
    agent: agentI,
    tenant: tenantI
  });

  const [eachLineSize, changeLineSize] = useState({
    landlords: 1,
    professional: 1,
    developer: 1,
    agent: 1,
    tenant: 1
  });
  const [eachTextColor, changeTextColor] = useState({
    landlords: "#8694b1",
    professional: "#8694b1",
    developer: "#8694b1",
    agent: "#8694b1",
    tenant: "#8694b1"
  });

  const [markedProp, changeMarkedProp] = useState({
    landlords: markedI,
    professional: markedI,
    developer: markedI,
    agent: markedI,
    tenant: markedI
  });

  const clicked = mainCard => {
    //console.log("card name",mainCard)
    const { landlords, professional, developer, agent } = eachLineSize;
    //console.log("this are the montly packages",landlords, professional, developer, agent)
    if ([mainCard] == "landlords") {
      changeLineSize({
        ...eachLineSize,
        landlords: 2,
        professional: 1,
        developer: 1,
        agent: 1,
        tenant: 1
      });
      changeImage({
        ...eachImage,
        landlords: landlordsA,
        professional: professionalI,
        agent: agentI,
        developer: developerI,
        tenant: tenantI
      });
      changeMarkedProp({
        ...markedProp,
        landlords: markedA,
        professional: markedI,
        developer: markedI,
        agent: markedI,
        tenant: markedI
      });

      changeTextColor({
        ...eachTextColor,
        landlords: "#072455",
        professional: "#8694b1",
        developer: "#8694b1",
        agent: "#8694b1",
        tenant: "#8694b1"
      });
      changeBtnEnable(false);
      changeCurrentLink("landlords");
    } else if ([mainCard] == "professional") {
      changeLineSize({
        ...eachLineSize,
        landlords: 1,
        professional: 2,
        developer: 1,
        agent: 1,
        tenant: 1
      });
      changeTextColor({
        ...eachTextColor,
        landlords: "#8694b1",
        professional: "#072455",
        developer: "#8694b1",
        agent: "#8694b1",
        tenant: "#8694b1"
      });
      changeBtnEnable(false);
      changeCurrentLink("professional");
      changeImage({
        ...eachImage,
        professional: professionalA,
        landlords: landlordsI,
        agent: agentI,
        developer: developerI,
        tenant: tenantI
      });
      changeMarkedProp({
        ...markedProp,
        landlords: markedI,
        professional: markedA,
        developer: markedI,
        agent: markedI,
        tenant: markedI
      });
    } else if ([mainCard] == "developer") {
      changeLineSize({
        ...eachLineSize,
        landlords: 1,
        professional: 1,
        developer: 2,
        agent: 1,
        tenant: 1
      });
      changeTextColor({
        ...eachTextColor,
        landlords: "#8694b1",
        professional: "#8694b1",
        developer: "#072455",
        agent: "#8694b1",
        tenant: "#8694b1"
      });
      changeImage({
        ...eachImage,
        landlords: landlordsI,
        professional: professionalI,
        agent: agentI,
        developer: developerA,
        tenant: tenantI
      });
      changeMarkedProp({
        ...markedProp,
        landlords: markedI,
        professional: markedI,
        developer: markedA,
        agent: markedI,
        tenant: markedI
      });
      changeBtnEnable(false);
      changeCurrentLink("developer");
    } else if ([mainCard] == "agent") {
      changeLineSize({
        ...eachLineSize,
        landlords: 1,
        professional: 1,
        developer: 1,
        agent: 2,
        tenant: 1
      });
      changeTextColor({
        ...eachTextColor,
        landlords: "#8694b1",
        professional: "#8694b1",
        developer: "#8694b1",
        agent: "#072455",
        tenant: "#8694b1"
      });
      changeImage({
        ...eachImage,
        agent: agentA,
        professional: professionalI,
        landlords: landlordsI,
        developer: developerI,
        tenant: tenantI
      });
      changeMarkedProp({
        ...markedProp,
        landlords: markedI,
        professional: markedI,
        developer: markedI,
        agent: markedA,
        tenant: markedI
      });
      changeBtnEnable(false);
      changeCurrentLink("agent");
    } else if ([mainCard] == "tenant") {
      changeLineSize({
        ...eachLineSize,
        landlords: 1,
        professional: 1,
        developer: 1,
        agent: 1,
        tenant: 2
      });
      changeTextColor({
        ...eachTextColor,
        landlords: "#8694b1",
        professional: "#8694b1",
        agent: "#8694b1",
        developer: "#8694b1",
        tenant: "#072455"
      });
      changeImage({
        ...eachImage,
        tenant: tenantA,
        agent: agentI,
        professional: professionalI,
        landlords: landlordsI,
        developer: developerI
      });
      changeMarkedProp({
        ...markedProp,
        landlords: markedI,
        professional: markedI,
        developer: markedI,
        agent: markedI,
        tenant: markedA
      });
      changeBtnEnable(false);
      changeCurrentLink("tenant");
    }
  };
  const goto = link => {
    history.push(`/registration/${link}`);
  };
  return (
    <ClientLayout
      showFooter={false}
      width="100%"
      showCurvedFooter={false}
      showFooter={true}
      showBackgroundImage={false}
      backgroundColor="white"
      height="500px"
    >
      <div className={classes.flexOverall}>
        <CategoryCard
          marked={markedProp.landlords}
          borderWidth={eachLineSize.landlords}
          Image={eachImage.landlords}
          handleClick={() => clicked("landlords")}
          textColor={eachTextColor.landlords}
          borderColor={eachTextColor.landlords}
          bottomText="landlords"
        />
        <CategoryCard
          marked={markedProp.professional}
          borderWidth={eachLineSize.professional}
          Image={eachImage.professional}
          handleClick={() => clicked("professional")}
          textColor={eachTextColor.professional}
          borderColor={eachTextColor.professional}
          bottomText="Professional"
        />
        <CategoryCard
          marked={markedProp.developer}
          borderWidth={eachLineSize.developer}
          Image={eachImage.developer}
          handleClick={() => clicked("developer")}
          textColor={eachTextColor.developer}
          borderColor={eachTextColor.developer}
          bottomText="Developer"
        />
        <CategoryCard
          marked={markedProp.agent}
          borderWidth={eachLineSize.agent}
          Image={eachImage.agent}
          handleClick={() => clicked("agent")}
          textColor={eachTextColor.agent}
          borderColor={eachTextColor.agent}
          bottomText="Property-Agent"
        />
        <CategoryCard
          marked={markedProp.tenant}
          borderWidth={eachLineSize.tenant}
          Image={eachImage.tenant}
          handleClick={() => clicked("tenant")}
          textColor={eachTextColor.tenant}
          borderColor={eachTextColor.tenant}
          bottomText="Tenant"
        />
      </div>
      <Grid
        item
        xs={11}
        md={8}
        sm={11}
        style={{ marginBottom: 20, margin: "auto" }}
      >
        <Button
          disabled={btnEnabler}
          onClick={() => goto(currentLink)}
          variant="contained"
          color="#dde1e9"
          className={classes.btnCategory}
        >
          Proceed
        </Button>
      </Grid>
      {/* <div style={{marginTop: 35, marginBottom: 80}}>
      <h2 style={{textAlign:'center'}}> Sign Up for LASRETRAD </h2>
      <p style={{textAlign: 'center'}}>By signing up, you agree to the privacy policy of LASRETRAD</p>
    </div>
    
    <div className={classes.root}>
      <Grid container spacing={6} className={classes.contain}>
        
        <Grid item xs={12} sm={12} md={2}>          
          <div data-id="1" className={classes.formContainer} style={{pointerEvents:"true", position:'relative', borderRadius:8, borderSize:1, borderColor: eachTextColor.landlords}} onClick={()=>changelandlords("landlordss")}>
          <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${markedImage})`, borderColor:bgColor, borderWidth:1 }}></div>
            <Avatar alt="Remy Sharp" src={landpic} className={classes.formContainerImage} />            
            <Typography className={classes.formContainerText}>landlords</Typography>
          </div>

        </Grid>
        <Grid item xs={12} sm={12} md={2}>          
          <div data-id="1" className={classes.formContainer} style={{position:'relative', borderRadius:8, borderSize:1, borderColor: professionalColor}} onClick={()=>changelandlords("professional")}>
          <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${professionalmarkedImage})`, borderColor: professionalColor, borderWidth:1 }}></div>
            <Avatar alt="Remy Sharp" src={professionalpic} className={classes.formContainerImage} />            
            <Typography className={classes.formContainerText}>Professional</Typography>
        </div>

        </Grid>
        <Grid item xs={12} sm={12} md={2}>     
          <div data-id="1" className={classes.formContainer} style={{position:'relative', borderRadius:8, borderSize:1, borderColor: developerColor}} onClick={()=>changelandlords("developer")}>
          <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${developermarkedImage})`, borderColor:developerColor, borderWidth:1 }}></div>
            <Avatar alt="Remy Sharp" src={developerpic} className={classes.formContainerImage} />            
            <Typography className={classes.formContainerText}>Developer</Typography>
        </div>
        </Grid>

        <Grid item xs={12} sm={12} md={2}>        
          <div data-id="1" className={classes.formContainer} style={{position:'relative', borderRadius:8, borderSize:1, borderColor: agentColor}} onClick={()=>changelandlords("agent")}>
          <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${agentmarkedImage})`, borderColor:agentColor, borderWidth:1 }}></div>
            <Avatar alt="Remy Sharp" src={agentpic} className={classes.formContainerImage} />            
            <Typography className={classes.formContainerText}>Property Agent</Typography>
        </div>

        </Grid>
       
        <Grid item xs={12} sm={12} md={2}>       
          <div data-id="1" className={classes.formContainer} style={{position:'relative', borderRadius:8, borderSize:1, borderColor: tenantbgColor}} onClick={()=>changelandlords("tenant")}>
          <div style={{borderRadius:40, float:'right', width: 20, height:20, right:10, top: 20, position:'absolute', backgroundColor:'white', border:'solid', backgroundImage: `url(${tenantmarkedImage})`, borderColor:tenantbgColor, borderWidth:1 }}></div>
            <Avatar alt="Remy Sharp" src={tenantpic} className={classes.formContainerImage} />            
            <Typography className={classes.formContainerText}>Tenant</Typography>
        </div>

        </Grid>
<Grid item xs={12} md={12} sm={12} style={{marginBottom:20}}>
<Button disabled={items.unclicked} onClick={handleClick} variant="contained" color="#dde1e9" className={classes.btnCategory}>
Proceed 
</Button>
</Grid>
      </Grid>
     
    </div> */}
    </ClientLayout>
  );
}
