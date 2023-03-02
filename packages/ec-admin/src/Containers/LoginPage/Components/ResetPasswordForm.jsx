import 'antd/dist/antd.css';
import '../index.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import * as actions from '../actions';

const ResetPasswordForm = ({ resetPassword, code }) => {
  const openNotification = (description) => {
    notification.error({
      message: "Đặt lại mật khẩu thất bại",
      description,
      placement: "topRight",
    });
  };
  const onFinish = values => {
    const { newPassword, confirmPassword } = values;
    alert(newPassword);
    alert(confirmPassword);
    resetPassword(newPassword, confirmPassword, code, (error) => {
      const { data: messageCode } = error.response ? error.response.data : {};
      switch (messageCode) {
        case "Token.invalid":
          openNotification("Mã xác thực không hợp lệ");
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
        name="newPassword"
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
          placeholder="Mật khẩu mới"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Hãy xác nhận mật khẩu của bạn',
          },
          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu bạn nhập không giống nhau'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" style={{ marginRight: '.5rem' }} />}
          placeholder="Xác nhận mật khẩu"
         />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đặt lại mật khẩu
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
    resetPassword: (newPassword, confirmPassword, code, onError) => {
      dispatch(actions.resetPassword(newPassword, confirmPassword, code, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
