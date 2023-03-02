import React, { useEffect, useState } from 'react';
import { Layout as AntLayout, Tabs, Card, Col, Row } from 'antd';
import styled from 'styled-components';
import { Line } from '@ant-design/charts';
import { connect } from "react-redux";
import * as actions from "./actions";
import {HeaderLayout, BreadcrumbLayout, LoadingScreenCustom} from './../../Components'
const { Footer, Content } = AntLayout;
const { TabPane } = Tabs;

const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const Homepage = (props) => {
  const [newOrders, setNewOrders] = useState(0);
  const [ordersInCurrentDay, setOrdersInCurrentDay] = useState(0);
  const [ordersInCurrentMonth, setOrdersInCurrentMonth] = useState(0);
  const [profitInCurrentMonth, setProfitInCurrentMonth] = useState(0);
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [profitByMonth, setProfitByMonth] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [
        newOrdersCount,
        ordersInCurrentDayCount,
        ordersInCurrentMonthCount,
        totalProfit,
        ordersByMonthData,
        profitByMonthData,
      ] = await Promise.all([
        props.countNewOrders(),
        props.countOrdersInCurrentDay(),
        props.countOrdersInCurrentMonth(),
        props.getProfitInCurrentMonth(),
        props.countOrdersBytMonth(),
        props.getProfitByMonth(),
      ]);
      setNewOrders(newOrdersCount);
      setOrdersInCurrentDay(ordersInCurrentDayCount);
      setOrdersInCurrentMonth(ordersInCurrentMonthCount);
      setProfitInCurrentMonth(totalProfit);
      setOrdersByMonth(ordersByMonthData);
      setProfitByMonth(profitByMonthData);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);

  return (
    <StyledHomePage >
      <HeaderLayout />
      <Content style={{ margin: '0 16px' }}>
        <BreadcrumbLayout root="Home" branch="Dashboard" />
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Đơn hàng chưa xử lý" bordered={false}>
              { newOrders } đơn hàng
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Đơn hàng đặt trong ngày" bordered={false}>
              { ordersInCurrentDay } đơn hàng
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Đơn hàng đặt trong tháng" bordered={false}>
              { ordersInCurrentMonth } đơn hàng
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Lợi nhuận trong tháng" bordered={false}>
              { profitInCurrentMonth.toLocaleString('de-DE') }đ
            </Card>
          </Col>
        </Row>
        <div className="site-layout-background" style={{ marginTop: 16, padding: 24, minHeight: 360 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Số đơn hàng theo tháng" key="1">
              <Line 
                data={ordersByMonth}
                padding='auto'
                xField='Date'
                yField='orders'
                xAxis={{
                  // type: 'timeCat',
                  tickCount: 12,
                }}
                smooth={true}
              />;
            </TabPane>
            <TabPane tab="Lợi nhuận theo tháng" key="2">
              <Line 
                data={profitByMonth}
                padding='auto'
                xField='Date'
                yField='profit'
                xAxis={{
                  tickCount: 12,
                }}
                smooth={true}
              />;
            </TabPane>
          </Tabs>
        </div>
        <LoadingScreenCustom isLoading={isLoading} setIsLoading={setIsLoading}/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledHomePage>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    countNewOrders: () => actions.countNewOrders(),
    countOrdersInCurrentDay: () => actions.countOrdersInCurrentDay(),
    countOrdersInCurrentMonth: () => actions.countOrdersInCurrentMonth(),
    getProfitInCurrentMonth: () => actions.getProfitInCurrentMonth(),
    countOrdersBytMonth: () => actions.countOrdersBytMonth(),
    getProfitByMonth: () => actions.getProfitByMonth(),
  };
};

export default connect(undefined, mapDispatchToProps)(Homepage);
