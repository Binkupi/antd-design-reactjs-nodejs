import "antd/dist/antd.css";
import "./index.css";
import logo from "../../logo.png";
import React from "react";
import { Redirect } from 'react-router-dom';
import ResetPasswordForm from "./Components/ResetPasswordForm";

const ResetPasswordPage = ({ location }) => {
  const code = new URLSearchParams(location.search).get("code");
  if (!code) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="login-page__body">
        <img src={logo} alt="" width="250px" style={{ marginTop: "-200px" }} />
        <ResetPasswordForm code={code} />
      </div>
    </>
  );
};

export default ResetPasswordPage;