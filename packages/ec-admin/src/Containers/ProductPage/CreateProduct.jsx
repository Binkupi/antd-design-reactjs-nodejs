/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
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
  Checkbox,
  InputNumber,
  Row, Col,
  Select,
} from 'antd';

import {HeaderLayout, BreadcrumbLayout,FooterLayout,ImageLayout, LoadingScreenCustom, Toast} from './../../Components'
import { generateSku, removeAccents} from '../../helper/generateSku';
const { Content } = AntLayout;
const { Title} = Typography;
const { Option } = Select;
const { TextArea } = Input;
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
  .site-layout-background {
    background: #fff;
    position: relative;
    z-index:0
  }
`;

const CreateProductForm = () => {
  const history=useHistory();
  const [slug,setSlug]=useState('');
  const [lstCategory,setListCategory]=useState([]);
  const [lstTag,setListTag]=useState([]);
  const lstGrade=[1,2,3,4,5];
  const [fileList, setFileList]=useState([]);
  const [optionS,setOptionS]=useState(false)
  const [optionM,setOptionM]=useState(false)
  const [optionL,setOptionL]=useState(false)
  const [optionXL,setOptionXL]=useState(false)
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

  useEffect(()=>{
    getListCategoryRequest();
    getListTagRequest();
  },[])

  const getListCategoryRequest=async()=>{
    const data= await actions.onGetListCategoryRequest();
    setListCategory(data.results);
  }
  const getListTagRequest=async()=>{
    const data= await actions.onGetListTagRequest();
    setListTag(data.results);
  }
  

  const onFinishAddItem = async (values) => {
    try{
      setIsLoading(true);
      const lstOptions=convertObjOption(values);
      let data = new FormData();
      data.append('name',values.name);
      data.append('sku',generateSku('SP'));
      data.append('slug',values.slug);
      data.append('price',values.price);
      data.append('rating',values.grade);
      data.append('tags',JSON.stringify(values.tags));
      data.append('category',values.category);
      data.append('status',0);
      data.append('options',JSON.stringify(lstOptions));
      data.append('shortDesc',values.shortDesc);
      data.append('fullDesc',values.fullDesc);
      data.append('additionalInfo',values.additionalInfo);
      data.append('images','[]');
      fileList.forEach(item=>{
       data.append("files.images",item.originFileObj);
      })
      const result= await actions.onCreateProductRequest(data);
      setIsLoading(false);
      Toast.notifySuccess(`Thêm sản phẩm thành công. Bạn có thể tìm kiếm với mã ${result.id}`);
      history.push('/products')
    }catch(e){
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi xảy ra vui lòng kiểm tra lại");
    }
     
  };
  const convertObjOption =(values)=>{
    let lstOptions=[];
    if(optionS){
      let obj={
        size: 'S', quantity: values.quantityS, remaining: values.quantityS
      }
      lstOptions.push(obj);
    }
    if(optionM){
      let obj={
        size: 'M', quantity: values.quantityM, remaining: values.quantityM
      }
      lstOptions.push(obj);
    }
    if(optionL){
      let obj={
        size: 'L', quantity: values.quantityL, remaining: values.quantityL
      }
      lstOptions.push(obj);
    }
    if(optionXL){
      let obj={
        size: 'XL', quantity: values.quantityXL, remaining: values.quantityXL
      }
      lstOptions.push(obj);
    }
    return lstOptions;
  }

  const onChangeName= (e)=>{
    let name=e.target.value;
    name=removeAccents(name);
    let slug=name.toLowerCase().split(' ').join('-');
    setSlug(slug);

  }
  const handleSizeS = (event) => {
    if(!event.target.checked){
      setOptionS(false);
    }else{
      setOptionS(true);
    }
}

  const handleSizeM = (event) => {
    if(!event.target.checked){
      setOptionM(false);
    }else{
      setOptionM(true);
    }
  }

  const handleSizeL = (event) => {
    if(!event.target.checked){
      setOptionL(false);
    }else{
      setOptionL(true);
    }
  }

  const handleSizeXL = (event) => {
    if(!event.target.checked){
      setOptionXL(false);
    }else{
      setOptionXL(true);
    }
  }
  return (
    <StyledCreateProductForm >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
      <BreadcrumbLayout root="Sản phẩm" branch="Khởi tạo" />

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
           Quản lý sản phẩm
          </Title>
          
          <Divider plain>Thêm hình ảnh sản phẩm</Divider>
          <div className="mt-2 text-center">
            <ImageLayout fileList={fileList} setFileList={setFileList} listImage={null} setListImage={null}/>
          </div>
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
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={onChangeName}/>
            </Form.Item>
            <Form.Item name="price" label="Giá cả"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 10000,
                },
              ]}>
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <div className="form-group col-12 mx-0 px-0 mb-2 mt-2" style={{ zIndex: "0" }}>
                  <div style={{width:'70%',margin:'0px auto'}}>
                    <label  htmlFor="category">Kích cỡ & Số lượng</label>
                  </div>
                  <div className="border size-listing px-3 pt-2 pb-3" style={{width:'70%',margin:'0px auto'}}>
                  <Row>
                    <Col span={9}>
                        <Checkbox onChange={handleSizeS}>Size S</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityS" label ="Số lượng">
                        <InputNumber disabled={!optionS}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox onChange={handleSizeM}>Size M</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityM" label ="Số lượng">
                        <InputNumber disabled={!optionM}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox onChange={handleSizeL}>Size L</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityL" label ="Số lượng">
                        <InputNumber disabled={!optionL}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={9}>
                      
                      <Checkbox onChange={handleSizeXL}>Size XL</Checkbox>
                      
                    </Col>
                    <Col span={12}>
                      <Form.Item name="quantityXL" label ="Số lượng">
                        <InputNumber disabled={!optionXL}  style={{width:'80%'}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  </div>
              </div>
            <Form.Item name="grade" label="Xếp hạng"
              rules={[
                {
                  required: true,
                },
              ]}>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Đánh giá sản phẩm"
                    optionFilterProp="children"
                    optionLabelProp="label"
                    filterOption={(input, option) =>{
                      return Number(option.value)===Number(input);
                    }
                  }
                  >{
                    lstGrade.map((item,index)=>(
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    ))
                  }
                  </Select> 
            </Form.Item>
            <Form.Item name="category" label="Thể loại"
              rules={[
                {
                  required: true,
                },
              ]}>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Chọn thể loại"
                    optionFilterProp="children"
                    optionLabelProp="label"
                    filterOption={(input, option) =>{
                        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    }
                  > 
                  {
                    lstCategory.map((item,index)=>(
                      <Option value={item.name} key={index}>
                          {item.name}
                      </Option>
                    ))
                  } 
                  </Select> 
            </Form.Item>
            <Form.Item
              name="tags"
              label="Nhãn"
              rules={[
                {
                  required: true,

                },
              ]}
            >
              <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Chọn nhãn"
                    optionLabelProp="label"
                  >
                    {
                    lstTag.map((item,index)=>(
                      <Option value={item.name} label={item.name} key={index}>
                        <div className="demo-option-label-item">
                          {item.name}
                        </div>
                      </Option>
                    ))
                  } 
                  </Select>
            </Form.Item>
            <Form.Item
              name="shortDesc"
              label="Mô tả ngắn"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item
              name="fullDesc"
              label="Mô tả"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={7}/>
            </Form.Item>
            <Form.Item
              name="additionalInfo"
              label="Thông tin thêm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={5}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </Content>
      <FooterLayout />
    </StyledCreateProductForm>
  );
};

export default CreateProductForm;
