import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import * as authActions from '../../Containers/LoginPage/actions';
import { Layout as AntLayout, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = AntLayout;

const HeaderStyled = styled(Header)`
  .info-login {
    display: flex;
    height: 100%;
    border: none;
    align-items: center;
    outline: 0 !important;
    box-shadow: none !important;
    outline-style: none;
    background-color: rgb(255, 255, 255);
  }
  .info-login:hover, .info-login:focus {
    background-color: rgb(250, 250, 251);
    color: rgba(0, 0, 0, 0.85);
    outline: 0 !important;
    box-shadow: none !important;
    outline-style: none
  }

  .btn-logout {
    background: #00ff00;
    color: #ffffff;
  }
`;

const HeaderLayout = (props) => {
  
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.aliyun.com" style={{ display: "flex", alignItems: "center" }}>
          <UserOutlined /> &nbsp; Tài khoản của tôi
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <span style={{ display: "flex", alignItems: "center" }} onClick={props.logout}>
          <LogoutOutlined /> <span className="pb-1">&nbsp; Đăng xuất</span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderStyled
      className="site-layout-background"
      style={{ padding: "0 20px", textAlign: "right", display: "flex", justifyContent: "flex-end" }}
    >
      <Dropdown overlay={menu} trigger={['click']}>
        <button className="info-login" onClick={e => e.preventDefault()}>
          Admin &nbsp; <CaretDownOutlined />
        </button>
      </Dropdown>
    </HeaderStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayout);