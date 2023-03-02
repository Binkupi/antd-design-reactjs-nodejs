/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Layout as AntLayout,
  Table,
  Tag,
  Space,
  Button,
  Input,
} from "antd";
import Highlighter from "react-highlight-words";
import { connect } from "react-redux";
import * as actions from "./actions";
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.css";

import { HeaderLayout, BreadcrumbLayout, FooterLayout } from "../../Components";
const { Content } = AntLayout;

const StyleManageOrder = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
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

const ManageOrderPage = ({ users, pagination, fetchUsers, history }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  let searchInput;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => {
      return  (
        <div className="custom-filter-dropdown">
          <Input
            ref={node => {
              searchInput = node;
            }}
          
            placeholder={`Tìm kiếm cho ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            size="small"
            icon={<SearchOutlined />}
            style={{ width: 90, marginRight: 8 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      )
    },
    filterIcon: filtered => (
      <SearchOutlined color="#1890ff" />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  const handleSearch = (selectedKeys, confirm) => {
    fetchUsers({}, page, pageSize);
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
      width: '12%',
      render: (text, record) => record.lastName,
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left",
      width: '12%',
      render: (text, record) => record.firstName,
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: '12%',
      align: "center",
      render: gender => {
        if (gender === "MALE") {
          return (
            <Tag color={"geekblue"} key={gender}>
              Nam
            </Tag>
          );
        }

        return (
          <Tag color={"pink"} key={gender}>
            Nữ
          </Tag>
        );
      },
      filters: [
        {
          text: 'Nam',
          value: 'MALE',
        },
        {
          text: 'Nữ',
          value: 'FEMALE',
        },
      ],
      onFilter: (value, record) => record.gender.startsWith(value),
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: '20%',
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: '12%',
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
      align: "center",
      width: '12%',
      render: role => {
        switch (role.key) {
          case "super_admin":
            return (
              <Tag color={"orange"} key={role.key}>
                Quản trị viên
              </Tag>
            );

          case "sales_staff":
            return (
              <Tag color={"green"} key={role.key}>
                Nhân viên bán hàng
              </Tag>
            );

          case "warehouse_staff":
            return (
              <Tag color={"purple"} key={role.key}>
                Nhân viên quản kho
              </Tag>
            );
        
          default:
            return (
              <Tag color={"default"} key={role.key}>
                Khách hàng
              </Tag>
            );
        }
      },
      filters: [
        {
          text: 'Quản trị viên',
          value: 'super_admin',
        },
        {
          text: 'Nhân viên bán hàng',
          value: 'sales_staff',
        },
        {
          text: 'Nhân viên quản kho',
          value: 'warehouse_staff',
        },
        {
          text: 'Khách hàng',
          value: 'user',
        },
      ],
      onFilter: (value, record) => record.role.key === value,
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: "action",
      align: "center",
      render: (item) => {
        return(
            <Space size="middle">
                <Button icon={<EyeOutlined />} onClick={()=>{console.log(item)}}/>
                <Button icon={<EditOutlined/>} onClick={()=>{
                  history.push({pathname:`/nguoi-dung/${item.id}`,
                  state:{
                    id:item.id
                  }})
                }}/>
            </Space>
        )},
      fixed: "right",
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    fetchUsers({}, page, pageSize);
  };

  useEffect(() => {
   const fetchData = async () => {
    setLoading(true);
    await fetchUsers({}, page, pageSize);
    setLoading(false);
   }
   fetchData();
  }, [fetchUsers, page, pageSize]);

  return (
    <StyleManageOrder>
      <HeaderLayout />
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbLayout root="Người dùng" branch="Quản lý người dùng" />
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            onChange: handlePaginationChange,
            total: pagination.total
          }}
        />
      </Content>
      <FooterLayout />
    </StyleManageOrder>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.results,
    pagination: state.users.pagination,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (queryParams, page, pageSize) => {
      dispatch(actions.fetchUsers(queryParams, page, pageSize));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrderPage);