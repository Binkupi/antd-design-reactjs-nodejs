import React, { useState } from 'react';
import {

  Breadcrumb,

} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const BreadcrumbLayout=({root,branch})=>{
    return(
        <Breadcrumb className="m-3">
          <Breadcrumb.Item>{root}</Breadcrumb.Item>
          <Breadcrumb.Item>{branch}</Breadcrumb.Item>
        </Breadcrumb>
    )
    
}

export default BreadcrumbLayout;