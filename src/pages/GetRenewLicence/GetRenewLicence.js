import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HeaderDescription from "../../components/headerDescription";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
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
import professional from "./assets/upload-to-cloudldpi.svg";
import {
  BootstrapInput,
  Label,
  ControlGet as FormControl,
  SelectContainer
} from "../../components/BootstrapInput/BootstrapInput";

// const state = localStorage('reduxStore')

// import './GetRenewLicence.css';
import useForm from "react-hook-form";

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { NONAME } from "dns";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  margin: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      float: "none"
    }
  },
  labelss: {
    fontFamily: "montserrat",
    fontSize: "13px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },

  margin22: {
    width: "29%",
    color: "#072455",
    marginTop: 13,
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      float: "none",
      marginRight: 0,
      marginLeft: "3%"
    }
  },
  margin23: {
    width: "29%",
    color: "#072455",
    marginTop: 13,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      float: "none",
      marginRight: 0,
      marginLeft: "3%"
    }
  },

  rightSide: {
    width: "75%",
    marginLeft: "23%",
    [theme.breakpoints.down("sm")]: {
      width: "92%",
      margin: "auto"
    }
  },
  leftSide: {
    width: "35%",
    float: "left",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      float: "none"
    }
  },
  description: {
    textAlign: "center",
    width: "70%",
    fontFamily: "Montserrat",
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto"
  },
  header: {
    textAlign: "center",
    width: "70%",
    fontFamily: "Montserrat",
    marginTop: 50,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto"
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
  selectItem: {
    marginTop: 4,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      float: "none"
    }
  },
  formContainerImage: {
    width: 100,
    height: 100,
    margin: "auto",
    marginTop: "29px"
  },
  textBox: {
    maxWidth: "100%",
    flexBasis: "22%"
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
  submit: {
    margin: theme.spacing(3, 0),
    backgroundColor: "#072455",
    width: "89%",
    height: 50,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
}));

export default function GetRenewLicence(props) {
  // form methods
  const dispatch = useDispatch(); //we use it to pass an action, by specifying the action Type
  const fileUploader = useRef(null);
  const fileUploader2 = useRef(null);
  const fileUploader3 = useRef(null);
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
  const [myErrors, changeErrors] = useState([]);

  const { register, handleSubmit } = useForm();

  const classes = useStyles();
  const currentPage = props.match.params.category_id;
  let history = useHistory();

  // function handleSubmit() {
  //   history.push("/dashboard");
  // }

  function showLoader(width, height) {
    if (showPreloader) {
      return (
        <Loader
          type="Rings"
          color="#072455"
          visible={true}
          height={width}
          width={height}
        />
      );
    } else {
      return null;
    }
  }
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
  function fileSender(pix, fieldName) {
    changePreloader(true);
    const formPicture = new FormData();
    let accessToken = Detail.access_token;
    let authHeader = "Bearer " + accessToken;
    formPicture.append("file", pix);
    const professionalUrl = BASEURL + "/licenses/media";
    console.log("file---------filesender---", pix);
    if (fieldName === "certificate_of_incorporation")
      sendHttpRequestWithFormData(
        "POST",
        professionalUrl,
        formPicture,
        authHeader
      ).then(responseData => {
        console.log("cert aloone", responseData);
        changeCert(responseData.name);
        if (responseData.name) {
          changePreloader(false);
          notify("Upload Successful");
          console.log("success");
        } else {
          changePreloader(true);
          console.log("failed");
          notify("Error in File Upload");
        }
      });
    if (fieldName === "picture")
      sendHttpRequestWithFormData(
        "POST",
        professionalUrl,
        formPicture,
        authHeader
      ).then(responseData => {
        console.log("picture aloone", responseData);
        changePicture(responseData.name);
        if (responseData.name) {
          changePreloader(false);
          notify("Upload Successful");
          console.log("success");
        } else {
          changePreloader(true);
          console.log("failed");
          notify("Error in File Upload");
        }
      });
    if (fieldName === "identification_document")
      sendHttpRequestWithFormData(
        "POST",
        professionalUrl,
        formPicture,
        authHeader
      ).then(responseData => {
        console.log("identification document", responseData);
        changeIDocument(responseData.name);
        if (responseData.name) {
          changePreloader(false);
          notify("Upload Successful");
          console.log("success");
        } else {
          changePreloader(true);
          console.log("failed");
          notify("Error in File Upload");
        }
      });
  }

  function validateMobile(e) {
    if (e.target.value < 11) {
      changeEnabled(true);
    } else if (e.target.value >= 11) {
      changeEnabled(false);
    }
  }

  function handleClick(e) {
    fileUploader.current.click();
  }

  function handleClick2(e) {
    fileUploader2.current.click();
  }

  function handleClick3(e) {
    fileUploader3.current.click();
  }

  function fileChangedHandler(event, maximumFileSize) {
    if (event.target.files.length > 0) {
      let file_size =
        event.target.files[0].size === undefined
          ? null
          : event.target.files[0].size;
      //or if you like to have name and type
      let file_type = event.target.files[0].type;
      let validFileExtensions = ["image/jpeg", "image/jpg", "image/png"];
      var n = validFileExtensions.includes(file_type);
      //file type validation
      if (n === false || file_size >= maximumFileSize) {
        changeEnabled(true);
      } else if (n === true && file_size <= maximumFileSize) {
        fileSender(event.target.files[0], event.target.name);
        changeEnabled(false);
      }
    }
  }

  console.log("this is the user id", Detail.user_id);
  const onSubmit = data => {
    changePreloader(true);
    const postUrl = BASEURL + "/licenses";
    let accessToken = Detail.access_token;
    let user_id = Detail.user.id;
    console.log("this is the access token", accessToken);
    console.log("this is the user_id");
    console.log("my datas", data);
    changeLicencePlan(data.business);

    const formData = new FormData();

    formData.append("business", data.business);
    formData.append("business_type", data.business_type);
    formData.append(
      "business_registration_number",
      data.business_registration_number
    );
    formData.append(
      "certificate_of_incoorporation",
      certificate_of_incorporation
    );
    formData.append("company_address", data.company_address);
    formData.append("mode_of_identification", data.mode_of_identification);
    formData.append("lga", data.lga);
    formData.append("identification_document", identification_document);
    formData.append("picture", picture);
    formData.append("user_id", user_id);

    formData.forEach((value, key) => {
      console.log("my datas from formData", "key %s: value %s", key, value);
    });

    let authHeader = "Bearer " + accessToken;
    console.log("this is the auth headers", authHeader);
    //to create the licence plan
    sendHttpRequestWithFormData("POST", postUrl, formData, authHeader).then(
      responseData => {
        console.log("datassssssii", responseData);
        localStorage.setItem("licencePlan", JSON.stringify(responseData.data));
        const allErrors = [];
        if (responseData.error) {
          console.log(responseData.error);
          for (const key in responseData.error) {
            if (responseData.error.hasOwnProperty(key)) {
              const element = responseData.error[key];
              console.log(key + ": ", element[0]);
              allErrors.push(element[0]);
            }
          }
          changeErrors(allErrors);
          changePreloader(false);
        } else if (
          responseData.data.user_id != null ||
          responseData.data.user_id != undefined ||
          responseData.data.user_id != []
        ) {
          let url = BASEURL + "/license-plans/" + responseData.data.business;
          const licence = responseData;
          //to create the invoice
          let business_registration_number =
            responseData.data.business_registration_number;
          let company_address = responseData.data.company_address;
          sendHttpRequestWithError("GET", url).then(responseData => {
            console.log("when we queried the plc", responseData);
            if (
              responseData.data.user_id != null ||
              responseData.data.user_id != undefined ||
              responseData.data.user_id != []
            ) {
              console.log(user_id);
              const formDataInvoice = new FormData();
              formDataInvoice.append("user_id", user_id);
              formDataInvoice.append("entity_type", "licence");
              formDataInvoice.append("entity_id", licence.data.id);
              formDataInvoice.append("customer_name", `${name} ${lastname}`);
              formDataInvoice.append("customer_address", company_address);
              formDataInvoice.append("amount_due", responseData.data[0].price);
              formDataInvoice.append("item_name", responseData.data[0].title);
              formDataInvoice.append(
                "item_description",
                responseData.data[0].description
              );
              formDataInvoice.append("number_of_item", 1);
              formDataInvoice.append("payment_status", 0);
              formDataInvoice.forEach((value, key) => {
                console.log(
                  "my datas from formData to create invoice is created",
                  "key %s: value %s",
                  key,
                  value
                );
              });
              let link = BASEURL + "/invoices";
              sendHttpRequestWithFormData(
                "POST",
                link,
                formDataInvoice,
                authHeader
              ).then(responseData => {
                console.log("datassssssii", responseData);
                if (responseData.hasOwnProperty("message")) {
                  notify("Error Occured in Creating Invoice");
                } else if (responseData.hasOwnProperty("data")) {
                  localStorage.setItem(
                    "invoiceDetails",
                    JSON.stringify(responseData.data)
                  );
                  notify("Invoice for Licence created Successfully");
                  changePreloader(true);
                  history.push("/invoice");
                  console.log("thisis the responnse datas", responseData.data);
                }
              });
            } else {
              notify("Error in Creating Invoice, Try Again");
              changePreloader(true);
            }
          });
        } else {
          notify("Error in Creating Licence, Try Again");
          changePreloader(true);
        }

        //lets get the licenceDetails, then use the licence details to create an Invoice
        // localStorage.setItem('licencePlan', JSON.stringify(responseData))

        // history.push('/invoice')
      }
    );
  };

  function renderRedirect() {
    if (redirect) {
      console.log("it should redirect");
      return (
        <Redirect
          to={{
            pathname: "/invoice",
            state: { licence: licencePlan }
          }}
        />
      );
    }
  }

  const notify = message => toast(message);
  return (
    <>
      <ToastContainer className="toast-container" />
      <DashboardLayout
        width="100%"
        showCurvedFooter={false}
        showFooter={true}
        showBackgroundImage={false}
        backgroundColor="white"
        height="700px"
      >
        {renderRedirect()}
        {showLoader()}

        <Typography variant="h4" gutterBottom className={classes.header}>
          Get/Renew License
        </Typography>

        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.description}
        >
          Please ensure that information entered are accurate to the best of
          your knowledge
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div container className={classes.rightSide}>
            <Grid spacing={2}>
              <FormControl>
                <Label
                  className={classes.labelss}
                  label="Business Registration Number*"
                />
                <BootstrapInput
                  required
                  inputRef={register}
                  name="business_registration_number"
                  placeholder="business registration number"
                  type="number"
                  id="bootstrap-input"
                />
              </FormControl>

              <FormControl>
                <Label className={classes.labelss} label="Company Address*" />
                <BootstrapInput
                  required
                  inputRef={register}
                  name="company_address"
                  placeholder="Company Address"
                  id="bootstrap-input"
                />
              </FormControl>

              <FormControl>
                <Label className={classes.labelss} label="Business*" />
                <SelectContainer>
                  <select
                    required
                    name="business"
                    ref={register}
                    className={classes.selectItem}
                  >
                    <option value="individual_business_name">
                      Individual Business Name
                    </option>
                    <option value="limited_liability">Limited Liability</option>
                    <option value="plc">PLC</option>
                    <option value="cooperative_society">
                      Co-Operative Society
                    </option>
                  </select>
                </SelectContainer>
              </FormControl>
            </Grid>
          </div>

          <div container className={classes.rightSide}>
            <Grid spacing={2}>
              <FormControl>
                <Label
                  className={classes.labelss}
                  label="Mode of Identification*"
                />
                <SelectContainer>
                  <select
                    name="mode_of_identification"
                    required
                    ref={register}
                    className={classes.selectItem}
                  >
                    <option value="drivers_licence">Driver's Licence</option>
                    <option value="national_id_card">National ID Card</option>
                    <option value="voters_card">Voters Card</option>
                    <option value="international_id_card">
                      International Passport
                    </option>
                  </select>
                  <div>
                    <span style={{ fontSize: 11 }}>
                      Valid proof of Identification
                    </span>
                  </div>
                </SelectContainer>
              </FormControl>

              <FormControl>
                <Label label="LGA*" />
                <SelectContainer>
                  <select
                    name="lga"
                    ref={register}
                    className={classes.selectItem}
                  >
                    <option value="Agege">Agege</option>
                    <option value="Ajeromi Ifelodun">Ajeromi Ifelodun</option>
                    <option value="Alimosho">Alimosho</option>
                    <option value="Amuwo-Odofin">Amuwo-Odofin</option>
                    <option value="Apapa">Apapa</option>
                    <option value="Badagry">Badagry</option>
                    <option value="Epe">Epe</option>
                    <option value="Eti-Osa">Eti-Osa</option>
                    <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                    <option value="Ifako-Ijaye">Ifako-Ijaye</option>
                    <option value="Ikeja">Ikeja</option>
                    <option value="Ikorodu">Ikorodu</option>
                    <option value="Kosofe">Kosofe</option>
                    <option value="Lagos Island">Lagos Island</option>
                    <option value="Lagos Mainland">Lagos Mainland</option>
                    <option value="Mushin">Mushin</option>
                    <option value="Ojo">Ojo</option>
                    <option value="Oshodi-Isolo">Oshodi-Isolo</option>
                    <option value="Somolu">Somolu</option>
                    <option value="Surulere">Surulere</option>
                  </select>
                </SelectContainer>
              </FormControl>

              {/*    
        <Grid item xs={12} md={4} className={classes.textBox}>
        <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Upload Certificate of Incorporation
        </InputLabel>
        <BootstrapInput required onChange={(e)=>fileChangedHandler(e,5000000000)} type="file"  name="certificate_of_incorporation" placeholder="photo.jpg" id="bootstrap-input" />
    </FormControl>
        </Grid> */}

              {/* <FormControl className={classes.margin22}>
<input type="file" id="file" name="certificate_of_incorporation" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader3}/>
<span style={{fontSize: '10px'}}>Upload Certificate of Incorporation</span> 
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={certificate_of_incorporation} />
    <img src={professional} className="icon__dash" onClick={handleClick3}/>
</div>
</FormControl> */}

              {/* <FormControl className={classes.margin23}>
<input type="file" id="file" name="identification_document" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader2}/>
<span style={{fontSize: '10px'}}>Upload Identification Document</span> 
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={identification_document} />
    <img src={professional} className="icon__dash" onClick={handleClick2}/>
</div>
</FormControl> */}

              {/* <Grid item xs={12} sm={6} md={4} className={classes.textBox}>
    <FormControl className={classes.margin}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Upload Identification Document 
            </InputLabel>
            <BootstrapInput required onChange={(e)=>fileChangedHandler(e,5000000000)} maximumFileSize={5000} type="file" name="identification_document" placeholder="photo.jpg" id="bootstrap-input" />
          
    </FormControl>
    </Grid> */}

              {/* <Grid item xs={12} sm={6} md={4} className={classes.textBox}>
<FormControl className={classes.margin}>
<InputLabel shrink htmlFor="bootstrap-input">
  Upload Photo of Yourself
</InputLabel>
<BootstrapInput  required inputRef={register} onChange={(e)=>fileChangedHandler(e,5000000000)} placeholder="picture" name="picture" id="bootstrap-input" type="file" />
</FormControl>
</Grid> 
   */}

              {/* <FormControl className={classes.margin22}>
<input type="file" id="file" name="picture" onChange={(e)=>fileChangedHandler(e,5000000000)} style={{display:'none'}} inputRef={register} ref={fileUploader}/>
<span style={{fontSize:10}}>Upload Photo of Yourself</span>
<div className="input-container__dash">
    <input className="input-field__dash" required type="text" value={picture} />
    <img src={professional} className="icon__dash" onClick={handleClick}/>
</div>
</FormControl> */}
              <ul>
                {myErrors.length > 0 && (
                  <p>Form not submitted because of the following error(s):</p>
                )}
                {myErrors.map((text, index) => (
                  <li style={{ color: "red", fontSize: 10 }}>{text}</li>
                ))}
              </ul>
              <Grid item xs={12} sm={12} md={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={showPreloader}
                  className={classes.submit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </DashboardLayout>
    </>
  );
}
