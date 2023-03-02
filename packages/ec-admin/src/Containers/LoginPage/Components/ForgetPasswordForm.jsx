import 'antd/dist/antd.css';
import '../index.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import * as actions from '../actions';

const ForgetPasswordForm = ({ forgetPassword }) => {
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };
  const onFinish = values => {
    const { email } = values;
    const onError = (error) => {
      const { data: messageCode } = error.response ? error.response.data : {};
      const message = "Lấy lại mật khẩu thất bại";
      switch (messageCode) {
        case "Email.not.registered":
          openNotification("error", message, "Email này chưa được đăng ký");
          break;

        default:
          openNotification("error", message, "Không thể liên lạc tới máy chủ");
          break;
      }
    };
    const onSuccess = () => {
      openNotification("success", "Thành công","Vui lòng kiểm tra hộp thư của bạn");
    };
    forgetPassword(email, onSuccess, onError);
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
            message: 'Hãy nhập email tài khoản của bạn',
            type: 'email',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" style={{ marginRight: '.5rem' }} />} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Lấy lại mật khẩu
        </Button>
      </Form.Item>
        <div className="centered">
          <Link to="/dang-nhap">
            Đăng nhập
          </Link>
        </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    forgetPassword: (email, onSuccess, onError) => {
      dispatch(actions.forgetPassword(email, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordForm);
