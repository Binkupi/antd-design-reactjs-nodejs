import React, {useState} from 'react'
import {
    Input,
    Modal,
    Select,
  } from 'antd';
import { Toast} from '../../../Components'
import * as actions from './../actions'
const { Option } = Select;


const PopupChangeStatus=(props)=>{
    
    const {visible, setVisible, onChangeValueStatus,
          dataOptionModal, valueID, valueStatus, flagSearch, setFlagSearch
        } = props
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOkModal=async()=>{
        if(dataOptionModal.length===0){
          setVisible(false);
          return ;
        }
        try{
          setConfirmLoading(true);
          const body={
            id:valueID,
            status:valueStatus
          } 
          await actions.onUpdateOrderStatusByIdRequest(body);
          setConfirmLoading(false);
          setVisible(false);
          setFlagSearch(!flagSearch);
          Toast.notifySuccess(`Cập nhật trạng thái hóa đơn ${valueID} thành công.`)
        }catch(e){
          setConfirmLoading(false);
          setVisible(false);
          Toast.notifyError("Đã có lỗi trong quá trình cập nhật trạng thái hóa đơn. Vui lòng kiểm tra lại")
        }
      }
    
      const handleCancelModal=()=>{
        setVisible(false);
      }
    return (
        <Modal
        title="Chuyển trạng thái đơn hàng"
        visible={visible}
        onOk={handleOkModal}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModal}
      >  
      { 
        dataOptionModal.length>0?(
          <>
          <div className="mb-3">
            <Input disabled={true} value={valueID} style={{color:'red'}}/>
          </div>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Thay đổi trạng thái sản phẩm"
            optionFilterProp="children"
            optionLabelProp="label"
            value={valueStatus}
            onChange={onChangeValueStatus}
            filterOption={(input, option) =>{
              return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
              }
              >{
                dataOptionModal.map((item,index)=>(
                  <Option value={item.status} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>  
        </>
        ):
        <p>Đơn hàng đã hoàn tất. Không thể thay đổi trạng thái</p>
      }
      </Modal>
    )
}
export default PopupChangeStatus;