import React, { Component, Fragment } from "react";
import { addBillRequest } from "./../../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import callApi from "../../utils/apiCaller";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class InfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      address: this.props.user.address,
      email: this.props.user.email,
      notes: "",
      paymentMethod: "COD",
      receiverPhone: this.props.user.phone,
      errInformation: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitOrder = (e) => {
    e.preventDefault();
    const { cart, history } = this.props;
    if (cart.items.length === 0 || !cart.canOrder) {
      confirmAlert({
        title: "Giỏ hàng của bạn rỗng!!!",
        message: "Vui lòng thêm ít nhất một sản phẩm để có thể thanh toán",
        buttons: [
          {
            label: 'Về trang chủ',
            onClick: () => history.push('/')
          },
          {
            label: 'Tiếp tục mua sắm',
            onClick: () => history.push('/shop')
          }
        ],
        closeOnClickOutside: false
      });
    }

    const { token } = this.props;
    const orderInfo = {
      receiverName: this.state.receiverName,
      receiverPhone: this.state.receiverPhone,
      paymentMethod: this.state.paymentMethod,
      address: this.state.address,
    };
    if (this.state.notes.length > 0) {
      orderInfo.notes = this.state.notes;
    }

    callApi('orders', "POST", orderInfo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data: order }) => {
        console.log(order);
        if (order.paymentMethod === 'MOMO') {
          callApi(`payment/momo/${order.id}`, "GET")
            .then(({ data }) => {
              console.log(data);
              window.open(data.payUrl, '_self').focus();
            });
          confirmAlert({
            title: "Tạo đơn thành công!!!",
            message: "Chúng tôi sẽ đưa bạn đến trang thanh toán trong vài giây",
            buttons: [],
            closeOnClickOutside: false
          });
        } else {
          confirmAlert({
            title: "Tạo đơn thành công!!!",
            message: "Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi",
            buttons: [
              {
                label: 'Về trang chủ',
                onClick: () => history.push('/')
              },
              {
                label: 'Kiểm tra đơn hàng',
                onClick: () => history.push('/user/order-traking')
              }
            ],
            closeOnClickOutside: false
          });
        }
        this.props.fetchCart(token);
        e.target.reset();
      });
  };

  render() {
    return (
      <Fragment>
        <h6 className="coupon__code">
          <span className="icon_tag_alt"></span>
          Chào mừng bạn đến với trang thanh toán
        </h6>
        <h6 className="checkout__title">Nhập thông tin khách hàng</h6>
        <form onSubmit={this.handleSubmitOrder}>
          <div className="checkout__input">
            <p>
              Họ tên người nhận<span>*</span>
            </p>
            <input
              type="text"
              value={this.state.receiverName}
              name="receiverName"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="checkout__input">
            <p>
              Địa chỉ nhận hàng<span>*</span>
            </p>
            <input
              type="text"
              placeholder="Địa chỉ nhận hàng"
              onChange={this.onChange}
              className="checkout__input__add"
              value={this.state.address}
              name="address"
              required
            />
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Số điện thoại người nhận<span>*</span>
                </p>
                <input
                  type="text"
                  value={this.state.receiverPhone}
                  name="receiverPhone"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Email người nhận<span>*</span>
                </p>
                <input
                  type="email"
                  value={this.state.email}
                  name="email"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="checkout__input">
            <p>
                Phương thức thanh toán<span>*</span>
            </p>
            <select
              id="PaymentMethod"
              value={this.state.paymentMethod}
              name="paymentMethod"
              style={{ height: "50px", color: "#b7b7b7", fontSize: "14px" }}
              className="custom-select mb-3"
              onChange={this.onChange}
            >
              <option defaultValue value="COD">
                Trả tiền khi nhận hàng
              </option>
              <option value="Chuyển khoản ngân hàng">
                Chuyển khoản ngân hàng
              </option>
              <option value="MOMO">Ví điện tử momo</option>
              <option value="Cổng thanh toán VNPay">
                Cổng thanh toán VNPay
              </option>
            </select>
          </div>
          <div className="checkout__input">
            <p>Lưu ý khi giao hàng</p>
            <input
              type="text"
              placeholder="Chú ý khi giao hàng"
              onChange={this.onChange}
              value={this.state.notes}
              name="notes"
            />
          </div>
          <div className="checkout__input">
            <label className="text-danger">
              {this.state.errInformation}
            </label>
          </div>
          <button type="submit" className="site-btn">
            Đặt hàng
          </button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    ...state.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (jwt) => {
        dispatch(actions.fetchCart(jwt));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoUser);
