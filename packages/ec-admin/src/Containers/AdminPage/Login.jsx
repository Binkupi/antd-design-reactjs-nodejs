/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Space
} from 'antd';
import {FooterLayout} from './../../Components'
const { Header } = AntLayout;
const { Content } = AntLayout;
const { Title, Text } = Typography;

const StyledLoginForm = styled(AntLayout)`
  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .result-total {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .result-table {
    margin-bottom: 30px;
  }

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
  .site-layout-background {
    background: #fff;
    margin-left:auto;
    margin-right:auto;
  }
  .header-login{
    background: #fff;
    margin-bottom:30px;
  }
`;

const LoginForm = () => {
  
  const layout = {
    labelCol: {
      span:6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: "'${label}' không thể nhỏ hơn ${min}",
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  
  

  return (
    <StyledLoginForm >
      <Header className="header-login">
        <Text style={{fontSize:'20px'}}><b>Male Fashion</b></Text>
      </Header>
      <Content  className="mb-2">
        <Title className="main-title" level={2}>
          Đăng nhập
        </Title>
        <div className="site-layout-background" style={{ padding: 24, minHeight: '200px' , width:"40%"}}>
          <Title className="main-title" level={2}>
            Thông tin tài khoản của bạn
          </Title>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="carName"
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="numberRepair"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
              <Space>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Button >
                Quay lại cửa hàng
              </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <FooterLayout className="mb-3"/>
    </StyledLoginForm>
  );
};

export default LoginForm;
