import React, { useState, useEffect } from "react";
import "./DashboardComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import four from "./assets/four.svg";
import two from "./assets/two.svg";
import three from "./assets/three.svg";
import one from "./assets/one.svg";
import userdp from "./assets/userdp.svg";
import housepencil from "./assets/housepencil.svg";
import singlehouse from "./assets/singlehouse.svg";
import driving from "./assets/driving.svg";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
var state = JSON.parse(localStorage.getItem("reduxStore"));

const ImageLibrary = [
  { name: "housepencil", file: housepencil },
  { name: "singlehouse", file: singlehouse },
  { name: "driving", file: driving },
  { name: "userdp", file: userdp }
];

export default function Professionals(props) {
  /*
 {props.links.map((eachLink, index, array) =>
                    <li key={eachLink.id}><Link to={eachLink.path}>{eachLink.name}</Link></li>
                       
                )}    
*/
  let history = useHistory();

  function handleSubmit(flexibleRoute) {
    history.push(`/${flexibleRoute}`);
  }
  const userDetail = useSelector(state => state.userDetail);
  console.log("this is the passed in props", props);

  return (
    <center>
      <div className="card_view">
        <h3 className="header">
          Welcome to your dashboard {props.name} {props.last_name}
        </h3>

        <div style={{ width: "100%" }}>
          <div className="card__overall">
            {props.cardGenerator.map((eachCard, index, array) => (
              <div
                className="card"
                onClick={() => handleSubmit(eachCard.link_name)}
              >
                <div>
                  <h4 className="card__upper--text">{eachCard.upper_text}</h4>
                </div>
                <div className="container">
                  <img src={eachCard.image_name} className="card__image" />
                </div>
                <div>
                  <h4 className="card__upper--text__lower">
                    {eachCard.description}
                  </h4>
                </div>
                <div className="card__bottom">
                  <h5 className="card__bottom--text">{eachCard.bottom_text}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </center>
  );
}
