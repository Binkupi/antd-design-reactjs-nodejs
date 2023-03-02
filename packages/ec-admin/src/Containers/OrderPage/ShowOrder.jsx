/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions'
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  Table,
  Space,
} from 'antd';
import {convertNumberToMoney} from './../../helper/convertNumberToMoney'
import PopupChangeStatus  from './Components/PopupChangeStatus';
import { DownloadOutlined } from '@ant-design/icons';
import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom, Toast} from './../../Components'
import {useLocation, useHistory, useParams} from 'react-router-dom'
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageProduct = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
    position: relative;
    z-index:0
  }

  .main-title {
    margin-bottom: 50px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 50px;
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
    font-size:30px;
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

const layout = {
  labelCol: {
    span:6,
  },
  wrapperCol: {
    span: 14,
  },
};

const dataOption=[
  {
    status:'NEW',
    name:'Mới'
  },
  { status:'CONFIRMED',
    name:'Đã xác nhận'
  },
  {
    status: 'DELIVERING',
    name:'Đang giao hàng'
  },
  {
    status: 'SUCCESS',
    name:'Giao hàng thành công'
  },
  { 
    status:'CANCELED_BY_USER',
    name:'Khách hàng đã hủy'
  },
  { 
    status:'CANCELED_BY_SHOP',
    name:'Shop đã hủy'
  }];

const ManageOrderPage = () => {

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalOrders] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const [detailOrder,setDetailOrder]=useState([]);
  const [visible, setVisible] = useState(false);
  const [flagSearch,setFlagSearch]=useState(false);
  const [dataOptionModal,setDataOptionModal]= useState([]);
  const [valueID,setValueID]=useState('');
  const [valueStatus,setValueStatus]=useState('');

  useEffect(()=>{
    onGetOrderById(params.id);
  },[flagSearch])

  const setForm=(objOrder)=>{
    let indexValueOrderStatus=dataOption.findIndex(data=>data.status===objOrder.status);
    form.setFieldsValue({
      id:objOrder.id,
      receiverName:objOrder.receiverName,
      receiverPhone:objOrder.receiverPhone,
      address:objOrder.address,
      orderDate:objOrder.orderDate,
      status:dataOption[indexValueOrderStatus].name,
      paymentMethod:objOrder.paymentMethod,
      finalAmount:convertNumberToMoney(objOrder.finalAmount),
    });
  }

  const onGetOrderById=async (id)=>{
    try{
      setIsLoading(true);
      const data= await actions.onGetOrderByIdRequest(id);
      setForm(data);
      let lstTempDetailOrder = data.items;
      let lstDetailOrder = lstTempDetailOrder.map((item, index) => {
      return {
          ...item,
          key: index,
          index: index + 1,
          unitPrice:convertNumberToMoney(item.unitPrice)
      }});
      setDetailOrder(lstDetailOrder);
      setIsLoading(false);
    }
    catch(e){
      setIsLoading(false);
      Toast.notifyError("Lỗi khi lấy dữ liệu thể loại sản phẩm này.")
    }
  }

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
  const onPageChange = (pageIndex, pageSize) => {
      setPageIndex(pageIndex);
      setPageSize(pageSize);
  }
    
  const onFinishUpdateItem = async (objOrder) => {
    let indexValueOrderStatus=dataOption.findIndex(data=>data.name===objOrder.status);
      setValueID(objOrder.id);
      setValueStatus(dataOption[indexValueOrderStatus].status);
      objOrder={
        ...objOrder,
        status:dataOption[indexValueOrderStatus].status
      }
      setDataModel(objOrder);
      setVisible(true);
  };

  const setDataModel=(objOrder)=>{
    const dataOptionFail=['SUCCESS', 'CANCELED_BY_USER', 'CANCELED_BY_SHOP'];
    let indexValueOrderFail=dataOptionFail.findIndex(data=>data===objOrder.status);
    if(indexValueOrderFail!==-1){
      setDataOptionModal([]);
      return ;
    }
    let indexValueOrderStatus=dataOption.findIndex(data=>data.status===objOrder.status);
    let listOptionSuccess=dataOption.filter((item,index)=>index>=indexValueOrderStatus);
    setDataOptionModal(listOptionSuccess);
  }

  const onChangeValueStatus=(value)=>{
    setValueStatus(value);
  }
  return (
    <>
    <StyleManageProduct >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Đơn hàng" branch="Chi tiết đơn hàng" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, position: 'relative' }}>
          <Title className="main-title" level={2}>
            Quản lý đơn hàng
          </Title>

          <Divider plain>Hiển thị hóa đơn</Divider>
          <Text className="result-total">Chi tiết hóa đơn</Text>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinishUpdateItem}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="id"
              label="Mã hóa đơn"
              disabled={true}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark"/>
            </Form.Item>
            <Form.Item
              name="receiverName"
              label="Tên khách hàng"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark"/>
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark"/>
            </Form.Item>
            <Form.Item
              name="receiverPhone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark"/>
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Chi phí thanh toán"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark"/>
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái đơn hàng"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark" />
            </Form.Item>
            <Form.Item
              name="orderDate"
              label="Ngày đặt hàng"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark" />
            </Form.Item>
            <Form.Item
              name="finalAmount"
              label="Số tiền thanh toán"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} className="text-dark" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật trạng thái đơn hàng
              </Button>
            </Form.Item>
          </Form>

          {/* <div className={showReportResult ? 'show' : 'hide'}> */}
          <div>
            <Divider plain>Danh sách sản phẩm đã mua</Divider>
            <Table className="result-table" dataSource={detailOrder} 
            pagination={{current:pageIndex,pageSize: pageSize,total: totalOrders,
             showSizeChanger: true, pageSizeOptions: ['5', '10', '15'],
             onChange:onPageChange}} >
              <Column title="Số thứ tụ" dataIndex="index"/>
              <Column title="Mã sản phẩm" dataIndex="sku" />
              <Column title="Tên sản phẩm" dataIndex="name"  />
              <Column title="Kích cở" dataIndex="size"/>
              <Column title="Số lượng" dataIndex="quantity"/>
              <Column title="Giá" dataIndex="unitPrice"/>
            </Table>
          </div>
          <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
        
      </Content>
      <FooterLayout />
      <PopupChangeStatus visible={visible}  setVisible={setVisible} onChangeValueStatus={onChangeValueStatus}
          dataOptionModal={dataOptionModal} valueID={valueID} valueStatus={valueStatus} flagSearch={flagSearch}
          setFlagSearch={setFlagSearch}/>
    </StyleManageProduct>
    
    </>
    
  );
};

export default ManageOrderPage;
