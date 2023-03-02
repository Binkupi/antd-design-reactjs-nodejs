import React, { Component, Fragment } from "react";
import convertToMoney from "./../../utils/convertMoney";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.cart.coupon ? this.props.cart.coupon.code : "",
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  renderSubmitCouponBtn = (coupon) => {
    const input = document.querySelector('input[name="code"]');
    if (coupon) {
      if (input) {
        input.setAttribute('disabled', true);
      }

      return (
        <button
          type="button"
          className="site-btn my-0"
          onClick={() => {
            this.props.removeCoupon(this.props.token)
            this.setState({ code: "" });
          }}
        >
          Hủy
        </button>
      );
    }

    if (input) {
      input.removeAttribute('disabled');
    }
    
    return (
      <button
        type="button"
        className="site-btn my-0"
        onClick={() =>
          this.props.applyCoupon(this.props.cart, this.state.code, this.props.token)
        }
      >
        Dùng
      </button>
    );
  }

  renderCouponStatus = (cart) => {
    const { coupon } = cart;
    if (cart.invalidCoupon === 'INVALID_CODE') {
      return (
        <p className="text-danger">
          Mã khuyến mãi không hợp lệ
        </p>
      );
    }

    if (!coupon) {
      return;
    }

    if (cart.invalidCoupon === 'EXPIRES') {
      if (coupon.expiresDate && typeof coupon.expiresDate === 'string') {
        coupon.expiresDate = new Date(coupon.expiresDate.substring(0,10));
      }
      
      const expiresDate = `${coupon.expiresDate.getDate()}/${coupon.expiresDate.getMonth() + 1}/${coupon.expiresDate.getFullYear()}`;
      return (
        <p className="text-danger">
          Mã khuyến mãi đã hết hạn từ { expiresDate }
        </p>
      );
    }

    if (cart.invalidCoupon === 'CONDITION') {
      let condition;
      switch (coupon.condition) {
        case 'GTE':
          condition = 'lớn hơn hoặc bằng';
          break;

        case 'LTE':
          condition = 'nhỏ hơn hoặc bằng';
          break;

        default:
          break;
      }
      return (
        <p className="text-danger">
          Mã khuyến mãi chỉ áp dụng cho đơn hàng { condition } { convertToMoney(coupon.orderValue) }đ
        </p>
      );
    }

    let value;
    switch(coupon.type) {
      case 'PERCENT':
        value = `${coupon.value}% giá trị đơn hàng`;
        break;

      case 'CASH':
        value = `${convertToMoney(coupon.value)}đ`;
        break;

      default:
        break;
    }
    return(
      <p className="text-success">
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        &nbsp;Thành công. Mã khuyến mãi giảm { value }
      </p>
    );
  }

  render() {
    const { totalAmount, finalAmount, coupon } = this.props.cart;
    return (
      <Fragment>
        <div className="checkout__order">
          <h4 className="order__title">Hóa đơn của bạn</h4>
          <ul className="checkout__total__products" style={{ maxHeight: "250px", display: "block", overflowY: "auto"}}>
            {this.props.renderOrderItem}
          </ul>
          <ul className="checkout__total__all">
            <li>
              Tổng phụ <span>{convertToMoney(totalAmount)}đ</span>
            </li>
            <li>
              Khuyến mãi <span>{convertToMoney(totalAmount - finalAmount)}đ</span>
            </li>
            <li>
              Số tiền phải trả <span> {convertToMoney(finalAmount)}đ </span>
            </li>
          </ul>
          <p>Nhập mã khuyến mãi tại đây</p>
          <div className="row align-items-center mb-3">
            <div className="col-lg-6 mr-0 pr-0">
              <div className="checkout__input my-0">
                <input
                  type="text"
                  name="code"
                  className="my-0"
                  value={this.state.code}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              { this.renderSubmitCouponBtn(coupon) }
            </div>
          </div>
          { this.renderCouponStatus(this.props.cart) }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyCoupon: (cart, code, jwt) => {
        dispatch(actions.applyCoupon(cart, code, jwt));
    },

    removeCoupon: (jwt) => {
        dispatch(actions.removeCoupon(jwt));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);