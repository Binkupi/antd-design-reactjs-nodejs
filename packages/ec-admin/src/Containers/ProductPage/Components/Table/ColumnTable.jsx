import React from 'react';
import styled from 'styled-components';

import { Table, Space,Typography } from 'antd';

const { Column, ColumnGroup } = Table;
const { Title, Text } = Typography;

const ColumnTable=()=>{
    const HeaderStyled = styled()`
    .info-login{
        margin: 10px 
    }`;
    return(
    <>
        <Column title="Số thứ tụ" dataIndex="index" key="index" />
        <Column title="Mã sản phẩm" dataIndex="sku" key="sku" />
        <Column title="Tên sản phẩm" dataIndex="productName" key="productName" />
        <Column title="Giá bán" dataIndex="price" key="price" />
        <Column
            title="Thực hiện"
            key="action"
            render={(text, record) => (
                <Space size="middle">
                    <Text>{record.sku}</Text>
                    <Text>{text}</Text>
                </Space>
            )}/>
    </>
    )
    
}

export default ColumnTable;