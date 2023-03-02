/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions';
import {useHistory, useParams} from 'react-router-dom'
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Divider,
} from 'antd';

import {HeaderLayout, BreadcrumbLayout,FooterLayout, LoadingScreenCustom, Toast} from './../../Components'
import { removeAccents} from '../../helper/generateSku';
const { Content } = AntLayout;
const { Title } = Typography;
const { TextArea } = Input;
const StyledShowTagForm = styled(AntLayout)`
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

const ShowTagForm = () => {
  const history=useHistory();
  const [isLoading,setIsLoading] = useState(false);
  const params=useParams();
  const [form] = Form.useForm();


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

  useEffect(()=>{
    onGetTagById(params.id);
  },[])

  const onGetTagById=async (id)=>{
    try{
      setIsLoading(true);
      const data= await actions.onGetTagByIdRequest(id);
      mapObjectToFrom(data);
      setIsLoading(false);
    }
    catch(e){
      setIsLoading(false);
      Toast.notifyError("Lỗi khi lấy dữ liệu thể loại sản phẩm này.")
    }
  }

  const mapObjectToFrom=(obj)=>{
    form.setFieldsValue({
      name:obj.name,
      desc:obj.desc,
      id:obj.id
    });

  }
  
  const onUpdateItem=(tag)=>{
    history.push(`/tags/${tag.id}/update`);
  }

  return (
    <StyledShowTagForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Tag" branch="Hiển thị chi tiết" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
           Quản lý tag
          </Title>
          
          <Divider plain>Hiển thị chi tiết tag</Divider>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onUpdateItem}
          >
            <Form.Item
              name="id"
              label="Mã tag"
              disabled={true}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên tag"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark" />
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
              <TextArea rows={5} disabled={true} className="text-dark" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật tag
              </Button>
            </Form.Item>
          </Form>   
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
        
      </Content>
      <FooterLayout />
    </StyledShowTagForm>
  );
};

export default ShowTagForm;
