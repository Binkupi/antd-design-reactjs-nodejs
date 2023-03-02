/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
} from 'antd';
import {HeaderLayout, BreadcrumbLayout,FooterLayout} from './../../Components'
const { Content } = AntLayout;
const { Title, Text } = Typography;

const StyledCreateProductForm = styled(AntLayout)`
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
`;

const RegisterAdminForm = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      carName: 'Toyota',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
    {
      key: '2',
      carName: 'Honda',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
    {
      key: '3',
      carName: 'Suzuki',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
  ]);

  dataSource.map((item, index) => (item.carNumber = index + 1));

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

  const onFinishAddItem = (values) => {
    values.carNumber = dataSource.length + 1;
    const newData = {
      carNumber: values.carNumber,
      carName: values.carName,
      numberRepair: values.numberRepair,
      ratio: `${values.ratio}%`,
      total: values.total,
    };
    setDataSource([...dataSource, newData]);
  };

  return (
    <StyledCreateProductForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Product" branch="create" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
            Form thêm sản phẩm
          </Title>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinishAddItem}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="carName"
              label="Tên sản phẩm"
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
              label="Loại sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ratio"
              label="Giá cả"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                  max: 100,
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="total"
              label="Thể loại"
              rules={[
                {
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <FooterLayout />
    </StyledCreateProductForm>
  );
};

export default RegisterAdminForm;
