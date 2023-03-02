/* eslint-disable no-template-curly-in-string */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import * as actions from './actions';
import { DownloadOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { HeaderLayout, BreadcrumbLayout, FooterLayout, LoadingScreenCustom, Toast } from './../../Components';
import { useHistory } from 'react-router-dom';
const { Title, Text } = Typography;
const { Column } = Table;
const { Content } = AntLayout;
const StyleManageCategory = styled(AntLayout)`
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

const ManageCategoryPage = () => {

    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [isSearch, setIsSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history=useHistory();

    useEffect(() => {
        onGetListCatagorys({
        pageIndex,
        pageSize,
        });
        
    }, [isSearch]);

    const onPageChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setIsSearch(!isSearch);
    };
    const onGetListCatagorys = async (pagination) => {
        try {
          setIsLoading(true);
          const data = await actions.onGetListCatagorysRequest(pagination);
          let lstTempCatagory = data.results;
          let lstCatagory = lstTempCatagory.map((item, index) => {
              return {
              ...item,
              key: index,
              index: index + 1,
              };
          });
          const panigionServer = data.pagination;
          setDataSource(lstCatagory);
          setTotalCategories(panigionServer.total);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          Toast.notifyError("Đã có lỗi xảy ra. Vui lòng kiểm tra lại")
        }
    };

    const onRedirectUpdate=(item)=>{
      history.push(`/Categories/${item.id}/update`)
    }

    const onRedirectShow=(item)=>{
      history.push(`/Categories/${item.id}`)
    }

    const onDeleteCategory = async (category) =>{
      let isDelete= window.confirm(`Bạn có muốn xóa thể loại ${category.id} này không?`);
      if(! isDelete) return;
      try{
        setIsLoading(true);
        await actions.onDeleteCategoryByIdRequest(category.id);
        setIsLoading(false);
        setIsSearch(!isSearch);
        Toast.notifySuccess(`Xóa sản phẩm ${category.id} thành công`)
      }catch(e){
        setIsLoading(false);
        Toast.notifyError("Đã có lỗi xảy ra. Vui lòng kiểm tra lại")
      }
    }

    return (
        <StyleManageCategory>
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
            <BreadcrumbLayout root="Thể loại sản phẩm" branch="Quản lý" />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Title className="main-title" level={2}>
                  Danh sách loại sản phẩm
              </Title>
              {/* <div className={showReportResult ? 'show' : 'hide'}> */}
              <div>
                  <Divider plain>Danh sách loại sản phẩm hiện nay</Divider>
                  <Text className="result-total">Tổng số loại sản phẩm hiện nay: {totalCategories} loại</Text>;
                  <Table
                  className="result-table"
                  dataSource={dataSource}
                  pagination={{
                      current: pageIndex,
                      pageSize: pageSize,
                      total: totalCategories,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '15'],
                      onChange: onPageChange,
                  }}
                  >
                  <Column title="Số thứ tụ" dataIndex="index" />
                  <Column title="Mã loại sản phẩm" dataIndex="id" />
                  <Column title="Tên loại sản phẩm" dataIndex="name" />
                  <Column
                      title="Thực hiện"
                      key="action"
                      render={(item) => {
                      return (
                          <Space size="middle">
                          <Button
                              icon={<EyeOutlined />}
                              onClick={() => {
                                onRedirectShow(item);
                              }}
                          />
                          <Button
                              icon={<EditOutlined />}
                              onClick={() => {
                              onRedirectUpdate(item);
                              }}
                          />
                          <Button
                              icon={<DeleteOutlined />}
                              onClick={() => {
                              onDeleteCategory(item);
                              }}
                          />
                          </Space>
                      );
                      }}
                  />
                  </Table>
              </div>
              <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
        </Content>
        <FooterLayout />
        </StyleManageCategory>
    );
    };

    export default ManageCategoryPage;
