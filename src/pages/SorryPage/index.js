import React from "react";
import "./SorryPage.css";
import { useHistory } from "react-router-dom";

import top from "./sorry.png";
import DashboardLayout from "../../layouts/DashboardLayout";

const SorryPage = props => {
  let history = useHistory();
  function handleClick() {
    history.push("/licence");
  }
  return (
    <DashboardLayout>
      <img src={top} alt="sorry" className="imgTop" />
      <h1 className="reg__header">Licence Registration</h1>
      <p className="reg__description">
        We are sorry, you can not register a transaction at this moment until
        you get a licence with LASRETRAD. Go to the Get?Renew Licence to request
        for a LASERTRAD Licence to proceed.
      </p>
      <div className="form__column_button">
        <button onClick={handleClick} className="form__button">
          Proceed To Get Licence
        </button>
      </div>
    </DashboardLayout>
  );
};

export default SorryPage;
