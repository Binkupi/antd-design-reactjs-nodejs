import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HomeOutlined, TagOutlined , UserOutlined, ShoppingCartOutlined,SkinOutlined, FilterOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const StyledSider = styled(Sider)`
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  
`;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse} >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
            <span>Trang chủ</span>
            <Link to="/"></Link>
        </Menu.Item>
        <SubMenu key="users" icon={<UserOutlined />} title="Người dùng">
          <Menu.Item key="/nguoi-dung/danh-sach">
            <span>Quản lý người dùng</span>
            <Link to="/nguoi-dung/danh-sach">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="product" icon={<SkinOutlined  />} title="Sản phẩm">
          <Menu.Item key="/products">
                <span>Quản lý</span>
                <Link to="/products">
                </Link>
          </Menu.Item>
          <Menu.Item key="/products/create">
            <span>Tạo</span>
            <Link to="/products/create">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="category" icon={<FilterOutlined />} title="Thể loại sản phẩm">
          <Menu.Item key="/categories">
            <span>Quản lý</span>
            <Link to="/categories">
            </Link>
          </Menu.Item>
          <Menu.Item key="/categories/create">
            <span>Tạo mới</span>
            <Link to="/categories/create">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="tag" icon={<TagOutlined />} title="Tag">
          <Menu.Item key="/tags">
            <span>Quản lý tags</span>
            <Link to="/tags">
            </Link>
          </Menu.Item>
          <Menu.Item key="/tags/create">
            <span>Create tag</span>
            <Link to="/tags/create">
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="order" icon={<ShoppingCartOutlined />} title="Đơn hàng">
          <Menu.Item key="/orders">
            <span>Quản lý đơn hàng</span>
            <Link to="/orders">
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
// .ant-menu{
//   color:white;
//   background:#3155E2 !important;
// }
// .ant-menu > .ant-menu-item:hover,
// .ant-menu > .ant-menu-submenu:hover{
//   color: red;
//   background: #5e8e2f !important;
// }
// .ant-menu > .ant-menu-item-active,
// .ant-menu> .ant-menu-submenu-active,
// .ant-menu > .ant-menu-item-selected,
// .ant-menu > .ant-menu-submenu-selected {
//   color: red;
//   background: #84ea1e !important;
// }
// .ant-menu > .ant-menu-item-open,
// .ant-menu> .ant-menu-submenu-open,
