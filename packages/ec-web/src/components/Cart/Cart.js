import React,{Component,Fragment} from 'react';
// import CartItem from './CartItem';
// import $ from "jquery";
class Cart extends Component {

  render(){
    return (
        <Fragment>
            <table className="table product-table table-hover cart container" >
                <thead>
                    <tr>
                        <th className="col-1 text-center">Hình ảnh</th>
                        <th className="col-2 text-center">Sản Phẩm</th>
                        <th className="col-1">Kích thước</th>
                        <th className="col-1">Đơn giá</th>
                        <th className="col-1 text-center">Số lượng còn</th>
                        <th className="col-1 text-center">Số Lượng mua</th>
                        <th className="col-1">Tổng Cộng</th>
                        <th className="col-1 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                   {this.props.children}
                </tbody>
            </table>
        </Fragment>
        
    );
  }
  
}


export default Cart;
