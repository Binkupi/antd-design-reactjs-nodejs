import "antd/dist/antd.css";
import "./index.css";
import logo from "../../logo.png";
import React from "react";
import LoginForm from "./Components/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page__body">
      <img src={logo} alt="" width="250px" style={{ marginTop: "-200px" }} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;