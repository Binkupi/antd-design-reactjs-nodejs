import "antd/dist/antd.css";
import "./index.css";
import logo from "../../logo.png";
import React from "react";
import ForgetPasswordForm from "./Components/ForgetPasswordForm";

const ForgetPasswordPage = ({ history }) => {
  return (
    <div className="login-page__body">
      <img src={logo} alt="" width="250px" style={{ marginTop: "-200px" }} />
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPasswordPage;