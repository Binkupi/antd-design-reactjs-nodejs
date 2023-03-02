import 'antd/dist/antd.css';
import '../index.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import * as actions from '../actions';

const LoginForm = ({ login }) => {
  const openNotification = (description) => {
    notification.error({
      message: "Đăng nhập thất bại",
      description,
      placement: "topRight",
    });
  };
  const onFinish = values => {
    const { email, password, remember } = values;
    login(email, password, remember, (error) => {
      const { data: messageCode } = error.response ? error.response.data : {};
      switch (messageCode) {
        case "Password.wrongs":
          openNotification("Tên tài khoản hoặc mật khẩu không đúng");
          break;
      
        default:
          openNotification("Không thể liên lạc tới máy chủ");
          break;
      }
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Hãy nhập email đăng nhập',
            type: 'email',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" style={{ marginRight: '.5rem' }} />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Hãy nhập mật khẩu của bạn',
          },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" style={{ marginRight: '.5rem' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Nhớ tài khoản</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/quen-mat-khau">
          Quên mật khẩu
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, remember, onError) => {
      dispatch(actions.login(email, password, remember, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
