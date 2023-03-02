import React,{Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {deleteBill} from './../../actions'
import * as actions from './../../actions'
import {connect} from 'react-redux'
import convertToMoney from './../../utils/convertMoney';

class DetailBill extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            disabled:false,
        }
    }
    renderName(bill){
        var name='';
        var length=bill.products.length;
        bill.products.forEach((product,index)=>{
            if(index<length-1){
                name+=product.name+', '
            }else{
                name+=product.name;
            }
            
        })
        return name;
    }
    onClick=(id_Bill)=>{
        //var {history}=this.props;
        if(window.confirm("Xác nhận hủy đơn hàng có mã "+id_Bill+"!!!")){
            deleteBill(id_Bill)
            .then(()=>{
                this.props.onChangeStatusBill({
                    id_Bill:id_Bill,
                    status:4
                })
                this.props.fetchCartByIdUserRequest(this.props.user.id_User);
            })
        }
        
    }
    componentDidMount(){
        if(this.props.bill.status===4){
        this.setState({
            disabled:true
        })
        }
    }
    renderStatus=(status)=>{
        if(status===0){
            return <span className="badge badge--custom badge-warning">Đang xử lý</span>
        }else if(status===1){
            return <span className="badge badge--custom badge-primary">Đã tiếp nhận</span>
        }else if(status===2){
            return <span className="badge badge--custom badge-info">Đang giao hàng</span>
        }else if(status===3){
            return <span className="badge badge--custom badge-success">Hoàn thành</span>
        }else if(status===4){
            return <span className="badge badge--custom badge-danger">Đã hủy</span>
        }
    }
    convertDay=(day)=>{
        
        var date=new Date(day);
        var result=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return result;
    }
  render(){
     const    {bill}=this.props;
     const {disabled}=this.state;
    // var {quantity, inventory,size,options}=cartItem;
    return (
       
        <Fragment>
            <tr > 

                <th scope="row">{bill.id_Bill}</th>
                    <td>{this.convertDay(bill.bookingDate)}</td>
                    <td>{this.renderName(bill)}</td>
                    <td>{convertToMoney(bill.totalPrice)} VND</td>
                    <td>{this.renderStatus(bill.status)}</td>
                    <td>
                        <Link type="button" to={`/user/order-traking/${bill.id_Bill}`} className="btn btn-primary mr-3">Xem </Link>
                           
                        <button type="button"  className="btn btn-danger "onClick={()=>this.onClick(bill.id_Bill)} disabled={disabled}>Hủy</button>
                        
                </td>
            </tr> 
        </Fragment>
        
    );
  }
  
}


const mapStateToProps=(state)=>{
    return {
        user:state.user,
        list_bill:state.list_bill,
        cart:state.cart,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        onFetchBillsByUserRequest:(id_User)=>{
            dispatch(actions.fetchBillsByUserRequest(id_User));
        },
        // onFetchUserByIdRequest:(id_User)=>{
        //     dispatch(actions.fetchUserByIdRequest(id_User));
        // },
        onChangeStatusBill:(bill)=>{
            dispatch(actions.changeStatusBill(bill));
        },
        // fetchCartByIdUserRequest:(id)=>{
        //     dispatch(actions.fetchCartByIdUserRequest(id));
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailBill);

