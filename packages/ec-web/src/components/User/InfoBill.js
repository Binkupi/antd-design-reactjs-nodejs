import React,{Component,Fragment} from 'react';
import DetailProductBill from './DetailProductBill';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
// import $ from "jquery";
class InfoBill extends Component {


    renderProductsInBill=(bills)=>{
        var products=[];
        var id_Bill=this.props.match.params.idBill;
        bills.forEach((item, index)=>{
            
            if(id_Bill===item.id_Bill){
                products=item.products;
                
            }
            
        })
        var result=null;
        result=products.map((item,index)=>{
            return <DetailProductBill key={index}
            product={item}/>;
        })
        return result;
    }
  render(){
    var {list_bill}=this.props;
    return (
        <Fragment>
            <h4 className="text-center mb-4 wow fadeInUpBig" data-wow-duration="1s">Chi tiết đơn hàng của tôi</h4>
            <div className="row wow fadeInUpBig" data-wow-duration="1s">
                <table className="table product-table table-hover" >
                    <thead>
                        <tr>
                            <th className="col-2"></th>
                            <th className="col-3">Sản Phẩm</th>
                            <th className="col-1">kích thước</th>
                            <th className="col-2">Giá</th>
                            <th className="col-2">Số Lượng</th>
                            <th className="col-2">Tổng Cộng</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderProductsInBill(list_bill)}
                    </tbody>
                </table>
            </div>
            <div className="row mx-0 wow fadeInUpBig" data-wow-duration="1s">   

                    <div className="col-12 px-0 text-center mt-5">
                    <Link to={'/user/order-traking'} className="btn btn-info">Quay lại trang quản lý đơn hàng</Link>
                    </div>

                </div>
            {/* <div className="row">
                <class
            </div> */}
        </Fragment>
        
    );
  }
  
}


const mapStateToProps=(state)=>{
    return {
        list_bill:state.list_bill
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
     
        }
    }
  export default connect(mapStateToProps,mapDispatchToProps)(InfoBill);
