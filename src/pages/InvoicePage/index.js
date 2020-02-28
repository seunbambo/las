import React, { useState, useEffect } from "react";
import "./InvoicePage.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";
import lagoslogo from "./lagoslogo.jpg";
import useForm from "react-hook-form";
import { withRouter, useHistory } from "react-router-dom";
import {
  BASEURL,
  sendHttpRequestWithError,
  sendHttpRequestWithErrorObject,
  sendHttpRequestWithAuthHeaders,
  sendHttpRequestWithFormData,
  sendHttpRequestWithFormDataWithoutHeaders
} from "../../helpers/apiMethods";

const InvoicePage = props => {
  // form methods
  const [type_of_property, changePropertyType] = useState("Residential");
  const [showPreloader, changePreloader] = useState(false);
  const [invoiceDetails, changeInvoiceDetaiils] = useState({});
  const [Detail, changeDetails] = useState({});
  const [user_type, changeUserType] = useState("");
  const [enabled, changeEnabled] = useState(false);
  const [redirect, changeRedirect] = useState(false);
  const [licencePlan, changeLicencePlan] = useState({});
  const [certificate_of_incorporation, changeCert] = useState("");
  const [picture, changePicture] = useState("");
  const [identification_document, changeIDocument] = useState("");
  const [accessToken, changeAccessToken] = useState("");
  const [userId, changeUserId] = useState(0);

  const [name, changeName] = useState("");
  const [lastname, changeLastName] = useState("");
  const [email, changeEmail] = useState("");
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  useEffect(() => {
    var state = JSON.parse(localStorage.getItem("reduxStore"));
    console.log("this is the state", state);
    const invoiceDetails = JSON.parse(localStorage.getItem("invoiceDetails"));
    const licencePlan = JSON.parse(localStorage.getItem("licencePlan"));
    const userToken2 = localStorage.getItem("token");
    if (userToken2 == null || userToken2 == "" || state.userDetail == {}) {
      history.push("/login");
    } else if (invoiceDetails == null && state.userDetail.user != undefined) {
      history.push("/licence");
    } else if (
      (licencePlan != {} && invoiceDetails != {}) ||
      state.userDetail.user != undefined
    ) {
      changeDetails(state.userDetail);
      changeInvoiceDetaiils(invoiceDetails);
      changeLicencePlan(licencePlan);
      console.log("from useEffect", state.userDetail);
      changeUserType(state.userDetail.user.user_type);
      changeName(state.userDetail.user.name);
      changeLastName(state.userDetail.user.last_name);
      changeUserId(state.userDetail.user.id);
      changeAccessToken(state.userDetail.access_token);
      changeEmail(state.userDetail.user.email);
    }
  }, []);

  function goToPayLicence() {
    history.push("/");
  }
  const payGate = "https://paygatetest.softalliance.com/payment/?billno=";

  const onSubmit = data => {
    const registerUrl =
      "https://paygatetest.softalliance.com/payment/index.php";
    // console.log("this is the access token", accessToken)
    console.log("my datas", data);
    // const formData = new FormData();
    const formDataDeveloper = new FormData();

    formDataDeveloper.append("billno", data.billno);
    formDataDeveloper.append("processpayment", data.processpayment);
    formDataDeveloper.append("redirecturl", data.redirecturl);

    sendHttpRequestWithFormDataWithoutHeaders(
      "POST",
      registerUrl,
      formDataDeveloper
    ).then(responseData => {
      console.log(responseData);
    });
  };
  const successUrl =
    "https://lasretradbackend.landlordstech.com/lasretrad/#/success_invoice";
  console.log(successUrl);

  return (
    <DashboardLayout
      showCurvedFooter={false}
      showFooter={false}
      showBackgroundImage={false}
      backgroundColor="white"
      height="900px"
    >
      <div id="wrapper">
        <div id="left">
          <img src={lagoslogo} height={100} width={100} />
          <p style={{ fontWeight: "bold", marginLeft: 10 }}>LASRETRAD</p>
          <p>
            Block 21, 1st floor, <br />
            Room 119, Lagos State Real Estate Transaction Department, Alausa
            Ikeja, Lagos. <br />
            Phone: +234 901 999 9977
          </p>
        </div>
        <div id="right-text">
          <div>
            <h1
              style={{
                fontSize: 25,
                lineHeight: 0,
                paddingTop: 35,
                textAlign: "left",
                paddingBottom: 0
              }}
            >
              Invoice: Unpaid{" "}
            </h1>
            <p style={{ paddingBottom: 20 }}>{licencePlan.business}</p>
            <p style={{}}>
              Invoice #:
              <span style={{ paddingLeft: 10 }}>
                {" "}
                {invoiceDetails.invoice_number}
              </span>{" "}
            </p>
            <p style={{}}>
              Invoice Date:<span style={{ paddingLeft: 10 }}> 12/14/2012</span>{" "}
            </p>
            <p style={{ marginRight: 10, fontStyle: "italic", marginTop: 30 }}>
              Attention: {name}
              {lastname}
            </p>
            <p style={{ marginRight: 10 }}>{licencePlan.company_address}</p>
            <p style={{ marginRight: 10 }}>{email}</p>
          </div>
        </div>
        {/* <div className="break" /> */}

        <table>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>{invoiceDetails.item_name}</td>
            <td>{invoiceDetails.item_description} </td>
            <td>1</td>
            <td></td>
            <td>{invoiceDetails.amount_due}</td>
          </tr>
        </table>
        <div className="left">
          <img
            src={logo}
            height={100}
            width={100}
            style={{ visibility: "hidden" }}
          />
        </div>
        <div className="right">
          <table
            style={{
              width: "50%",
              marginTop: 30,
              marginBottom: 10,
              float: "right"
            }}
            id="right-table"
          >
            <tr style={{ display: "none" }}>
              <th>Subtotal</th>
              <th>Description</th>
            </tr>
            <tr>
              <td className="down__table">Subtotal</td>
              <td className="down__table">{invoiceDetails.amount_due}</td>
            </tr>

            <tr>
              <td className="down__table">Total Due</td>
              <td className="down__table">{invoiceDetails.amount_due}</td>
            </tr>
            <tr>
              <td className="down__table">Due Date</td>
              <td className="down__table">2/12/2020</td>
            </tr>
            {/* http://localhost:3000/#/success_invoice/ */}
          </table>
          <div style={{ marginTop: 20, marginRight: 10 }}>
            <form
              method="post"
              action="https://paygatetest.softalliance.com/payment/index.php"
              class="payment-form"
            >
              <button
                className="BUTTON_FYD_TRANSPARENT"
                onClick={goToPayLicence}
              >
                Download Invoice
              </button>
              <a
                href={payGate + invoiceDetails.invoice_number}
                target="_blank"
              ></a>
              <input
                type="hidden"
                name="billno"
                ref={register}
                value={invoiceDetails.invoice_number}
              />
              <input
                type="hidden"
                name="processpayment"
                ref={register}
                value="POST"
              />
              <input
                type="hidden"
                name="redirecturl"
                ref={register}
                value={`${successUrl}/${invoiceDetails.invoice_number}`}
              />
              <button
                type="submit"
                className="BUTTON_FYD"
                style={{ float: "right" }}
              >
                Pay Invoice Now
              </button>
              <p
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  // paddingLeft: 10,
                  color: "green",
                  textAlign: "center"
                }}
              >
                Thank you for your business and have a great day!
              </p>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default withRouter(InvoicePage);
