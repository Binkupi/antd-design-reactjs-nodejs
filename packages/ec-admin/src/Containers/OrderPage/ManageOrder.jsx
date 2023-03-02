/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as actions from './actions'
import {
  Layout as AntLayout,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  Table,
  Space,
  Tag,
  Modal,
  Select,
  DatePicker
} from 'antd';
import {convertNumberToMoney} from './../../helper/convertNumberToMoney'
import { DownloadOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from '@ant-design/icons';
import {HeaderLayout, BreadcrumbLayout,FooterLayout,LoadingScreenCustom, Toast} from './../../Components'
import {useLocation, useHistory} from 'react-router-dom'
import PopupChangeStatus  from './Components/PopupChangeStatus';
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const { Option } = Select;
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

  const location=useLocation();
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalProducts, setTotalProduct] = useState(0);
  const history=useHistory();
  const [isLoading,setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  
  const [dataOptionModal,setDataOptionModal]= useState([]);
  const [valueID,setValueID]=useState('');
  const [valueStatus,setValueStatus]=useState('');
  const [flagSearch,setFlagSearch]=useState(false);
  const [status,setStatus] =useState('ALL');
  const [fromDate,setFromDate] =useState('');
  const [toDate,setToDate] =useState('');

  useEffect( ()=>{
    let objSearch={
      page:pageIndex,
      pageSize:pageSize
    };
    if(status!=='ALL'){
      objSearch={
        ...objSearch,
        status:status
      };
    }
    if(fromDate!==''){
      objSearch={
        ...objSearch,
        orderDate_gte:fromDate
      };
    }
    if(toDate!==''){
      objSearch={
        ...objSearch,
        orderDate_lte:toDate
      };
    }
    onGetListOrder(objSearch);
  },[flagSearch])

  useEffect(()=>{
    form.setFieldsValue({
      keyword:'',
    });
  },[])

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

  const onGetListOrder =async(objSearch)=>{
        try {
            setIsLoading(true);
          const data = await actions.onGetListOrderRequest(objSearch);
            let lstTempOrder = data.results;
            let lstOrder = lstTempOrder.map((item, index) => {
            return {
                ...item,
                key: index,
                index: index + 1,
                finalAmount:convertNumberToMoney(item.finalAmount)
            };
            });
            const panigionServer = data.pagination;
            setDataSource(lstOrder);
            setIsLoading(false);
            setTotalProduct(panigionServer.total);
        } catch (e) {
          setIsLoading(false);
            Toast.notifyError('Đã có lỗi xảy ra vui lòng kiểm tra lại');
        }
    
    }
    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setFlagSearch(!flagSearch);
    }
    const onSearch= async(values)=>{
      try{
        let objSearch={
          page:pageIndex,
          pageSize:pageSize
        };
        if(status!=='ALL'){
          objSearch={
            ...objSearch,
            status:status
          };
        }
        if(fromDate!==''){
          objSearch={
            ...objSearch,
            orderDate_gte:fromDate
          };
        }
        if(toDate!==''){
          objSearch={
            ...objSearch,
            orderDate_lte:toDate
          };
        }
        if(values.option==='receiverEmail'){
          objSearch={
            ...objSearch,
            receiverEmail:values.keyword
          };
        }
        if(values.option==='receiverPhone'){
          objSearch={
            ...objSearch,
            receiverPhone:values.keyword
          };
        }
        await onGetListOrder(objSearch);
      }
      catch(e){
        setIsLoading(false);
        Toast.notifyError("Đã có lỗi. Vui lòng thử lại")
      }
      

    }

  const onUpdateStatus=(objOrder)=>{
    setValueID(objOrder.id);
    setValueStatus(objOrder.status);
    setDataModel(objOrder);
    setVisible(true);
  }

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

  const onRedirectShow=(objOrder)=>{
    history.push({pathname:`/orders/${objOrder.id}`,
    state:{
      id:objOrder.id
    }})
  }

  const mapStatusWithColor=(status)=>{
    let data={
    };
    if(status==="NEW"){
      data={
        color:'blue',
        name:"MỚI"
      }
    }
    if(status==="CONFIRMED"){
      data={
        color:'geekblue',
        name:"ĐÃ XÁC NHẬN"
      }
    }
    if(status==="DELIVERING"){
      data={
        color:'cyan',
        name:"ĐANG GIAO HÀNG"
      }
    }
    if(status==='SUCCESS'){
      data={
        color:'green',
        name:"GIAO HÀNG THÀNH CÔNG"
      }
    }
    if(status==='CANCELED_BY_USER'){
      data={
        color:'volcano',
        name:"KHÁCH HÀNG ĐÃ HỦY"
      }
    }
    if(status==='CANCELED_BY_SHOP'){
      data={
        color:'red',
        name:"SHOP ĐÃ HỦY"
      }
    }
    return data;
  }

  

  const onChangeValueStatus=(value)=>{
    setValueStatus(value);
  }

  const onChangeFromDate = (date, dateString) => {
    setFromDate(dateString);
    setFlagSearch(!flagSearch);
  }
  const onChangeToDate = (date, dateString) => {
    setToDate(dateString);
    setFlagSearch(!flagSearch);
  }

  const onCancelOrder= async (objOrder)=>{
    let isCancel=window.confirm("Bạn có muốn hủy đơn hàng này không?");
    if(!isCancel){
      Toast.notifyInfo("Bạn đã hủy thao tác");
      return;
    }
    setIsLoading(true);
    const dataOptionFail=['SUCCESS', 'CANCELED_BY_USER', 'CANCELED_BY_SHOP'];
    let indexValueOrderFail=dataOptionFail.findIndex(data=>data===objOrder.status);
    if(indexValueOrderFail!==-1){
      setIsLoading(false);
      Toast.notifyWarning("Đơn hàng của bạn đã hoàn tất. Không thể hủy được");
      return ;
    }
    try{
      const body={
        id:objOrder.id,
        status:'CANCELED_BY_SHOP'
      } 
      await actions.onUpdateOrderStatusByIdRequest(body);
      setIsLoading(false);
      setFlagSearch(!flagSearch);
      Toast.notifySuccess(`Hủy hóa đơn ${objOrder.id} thành công.`)
    }catch(e){
      setIsLoading(false);
      Toast.notifyError("Đã có lỗi trong quá trình cập nhật trạng thái hóa đơn. Vui lòng kiểm tra lại")
    }
  }

  const onChangeStatus = async (value)=>{
    setStatus(value);
    setFlagSearch(!flagSearch);
  }
    

  return (
    <>
    <StyleManageProduct >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Hóa đơn" branch="Quản lý" />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, position: 'relative' }}>
          <Title className="main-title" level={2}>
            Danh sách đơn hàng
          </Title>
          <Form
            form={form}
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            label="Tìm kiếm theo"
            onFinish={onSearch}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="option"
              rules={[
                { 
                  required: true,
                },
              ]}
            >
              <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tùy chọn"
              optionFilterProp="children"
              optionLabelProp="label"
              value={valueStatus}
              onChange={onChangeValueStatus}
              filterOption={(input, option) =>{
                return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}>
                <Option value='receiverEmail' key='email'>
                  Email
                </Option>
                <Option value='receiverPhone' key='phone'>
                  Số điện thoại
                </Option>

              </Select>  
            </Form.Item>
            <Form.Item
              name="keyword"
              rules={[
                { 
                  required: true,
                },
              ]}
            >
              <Input placeholder="Nhập từ khóa" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm 
              </Button>
            </Form.Item>
          </Form>

          {/* <div className={showReportResult ? 'show' : 'hide'}> */}
          <div>
            <Divider plain>Danh sách hóa đơn hiện nay</Divider>
            <Text className="result-total">Tổng hóa đơn hiện nay: {totalProducts} hóa đơn</Text>
            <div style={{display:'flex',justifyContent: 'flex-end'}} className="mt-3 mb-3">
              <div className="me-2">
                <Text>Từ ngày: </Text>
                <DatePicker style={{width:'100%'}} onChange={onChangeFromDate} />
              </div>
              <div>
                <Text>Đến ngày: </Text>
                <DatePicker style={{width:'100%'}} onChange={onChangeToDate}  />
              </div>
            </div>
            <div className="mb-4" style={{width:'100%'}}>
              <label >Trạng thái đơn hàng: </label>
              <Select
              showSearch
              style={{width:'20%'}}
              className="me-3 ms-2"
              placeholder="Trạng thái sản phẩm"
              optionFilterProp="children"
              optionLabelProp="label"
              value={status}
              onChange={onChangeStatus}
              filterOption={(input, option) =>{
                return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}>
                  {
                  dataOption.map((item,index)=>{
                    return (
                      <Option value={item.status} key={index}>
                        {item.name}
                      </Option>
                    )
                  })
                }
                <Option value="ALL" key="ALL">
                  Tất cả
                </Option>
                
              </Select>  
            </div>
            <Table className="result-table" dataSource={dataSource} 
            pagination={{current:pageIndex,pageSize: pageSize,total: totalProducts,
             showSizeChanger: true, pageSizeOptions: ['5', '10', '15'],
             onChange:onPageChange}} >
              <Column title="STT" dataIndex="index"/>
              <Column title="Mã đơn hàng" dataIndex="id" />
              <Column title="Số điện thoại" dataIndex="receiverPhone"  />
              <Column title="Ngày nhận" dataIndex="orderDate"  />
              <Column title="Thanh toán" dataIndex="finalAmount"/>
              <Column title="PTTT" dataIndex="paymentMethod"/>
              <Column title="Trạng thái" dataIndex="status"
                    render= {status => {
                      //  renderStatus(status);
                      let data= mapStatusWithColor(status);
                       return (
                          <Space align="center">
                            <Tag color={data.color} key={status} style={{width:'200px'}}>
                             {data.name}
                           </Tag>
                          </Space>    
                          )
                    }}
                    />
              <Column
                    title="Thực hiện"
                    key="action"
                    render={(item) => {
                        return(
                            <Space size="middle" key={item.id}>
                                <Button icon={<EyeOutlined />} onClick={()=>{onRedirectShow(item)}}/>
                                <Button icon={<EditOutlined/>} onClick={()=>{onUpdateStatus(item)}}/>
                                <Button icon={<DeleteOutlined/>} onClick={()=>onCancelOrder(item)}/>
                            </Space>
                        )}
                    }
                    />
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
