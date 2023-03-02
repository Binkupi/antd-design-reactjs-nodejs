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
    onGetCategoryById(params.id);
  },[])

  const onGetCategoryById=async (id)=>{
    try{
      setIsLoading(true);
      const data= await actions.onGetCategoryByIdRequest(id);
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
      description:obj.description,
    });
    setSlug(obj.slug);

  }
  const onFinishAddItem = async (values) => {
    try{
      setIsLoading(true);
      const result= await actions.onUpdateCategoryRequest(params.id,values);
      setIsLoading(false);
      Toast.notifySuccess(`Cập nhật thể loại sản phẩm thành công. Bạn có thể tìm kiếm với mã ${result.id}`);
      history.push('/categories');
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi xảy ra vui lòng kiểm tra lại");
    }
     
  };

  const onChangeName= (e)=>{
    let name=e.target.value;
    name=removeAccents(name);
    let slug=name.toLowerCase().split(' ').join('-');
    setSlug(slug);

  }
  return (
    <StyledCreateCategoryForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Thể loại sản phẩm" branch="Cập nhật" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
           Quản lý thể loại sản phẩm
          </Title>
          
          <Divider plain>Thêm thể loại sản phẩm</Divider>
          <Form
            {...layout}
            form={form}
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
              name="slug"
              label="Slug"
              disabled={true}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên thể loại"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={onChangeName}/>
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Thêm thể loại
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
