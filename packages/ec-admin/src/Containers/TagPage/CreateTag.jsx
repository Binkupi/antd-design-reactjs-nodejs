/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import styled from 'styled-components';
import * as actions from './actions';
import {useHistory} from 'react-router-dom'
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Divider,
} from 'antd';

import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom, Toast} from './../../Components'
import { removeAccents} from '../../helper/generateSku';
const { Content } = AntLayout;
const { Title} = Typography;
const { TextArea } = Input;
const StyledCreateCategoryForm = styled(AntLayout)`
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
    position: relative;
    z-index:0
  }
`;

const CreateCategoryForm = () => {
  const history=useHistory();
  const [slug,setSlug]=useState('');
  const [isLoading,setIsLoading] = useState(false);


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

  const onFinishAddItem = async (values) => {
    try{
      setIsLoading(true);
      const result= await actions.onCreateTagRequest(values);
      setIsLoading(false);
      Toast.notifySuccess(`Thêm tag thành công. Bạn có thể tìm kiếm với mã ${result.id}`);
      history.push('/tags')
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi xảy ra vui lòng kiểm tra lại");
    }
     
  };

  return (
    <StyledCreateCategoryForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Tag" branch="Khởi tạo" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
           Quản lý Tag
          </Title>
          
          <Divider plain>Thêm tag</Divider>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinishAddItem}
            validateMessages={validateMessages}
            fields={[
              {
                name: ["slug"],
                value: slug,
              },
            ]}
          >
            <Form.Item
              name="name"
              label="Tên tag"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="desc"
              label="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
              <Button type="primary" htmlType="submit">
                Thêm Tag
              </Button>
            </Form.Item>
          </Form>
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </Content>
      <FooterLayout />
    </StyledCreateCategoryForm>
  );
};

export default CreateCategoryForm;
