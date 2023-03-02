import React, { Component, Fragment } from "react";
import Cart from "./../components/Cart/Cart";
import CartResult from "./../components/Cart/CartResult";
import CartItem from "./../components/Cart/CartItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import * as Message from "./../constants/Message";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
class CartContainer extends Component {
  handleRemoveItemFromCart = (item) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?',
      buttons: [
        {
          label: 'Xóa ngay',
          onClick: () => this.props.removeItemFromCart(item._id, this.props.token, function() {})
        },
        {
          label: 'Hủy',
          onClick: () => {}
        }
      ]
    });
  }

  handleChangeItemQuantity = (item, quantity) => {
    this.props.changeItemQuantity(item._id, quantity, this.props.token, function() {});
  }

  handleChangeItemSize = (item, size) => {
    this.props.changeItemSize(item._id, size, this.props.token, function() {});
  }

  renderCart(cart) {
    if (cart.items.length > 0) {
      return cart.items.map((item, index) => (
        <CartItem
          key={index}
          cartItem={item}
          onDeleteProductToCart={this.handleRemoveItemFromCart}
          handleChangeItemQuantity={this.handleChangeItemQuantity}
          handleChangeItemSize={this.handleChangeItemSize}
        />
      ));
    }

    return (
      <tr>
        <td colSpan="8">
          <div className="text-align">
            <p className="text-info text-align">
              <span className="mr-3">{Message.MSG_CART_EMPTY}</span>
              <Link type="button" to={`/shop`} className="text-success">
                Tiếp tục mua sắm !!!
              </Link>
            </p>
          </div>
        </td>
      </tr>
    );
  }

  renderTotalMount(cart) {
    if (cart.items.length > 0) {
      return <CartResult total={cart.totalAmount} canOrder={cart.canOrder} />;
    }

    return;
  }

  render() {
    const { cart } = this.props;

    return (
      <Fragment>
        <Cart>
          {this.renderCart(cart)}
          {this.renderTotalMount(cart)}
        </Cart>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    ...state.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItemFromCart: (itemId, jwt, cb) => {
      dispatch(actions.removeItemFromCart(itemId, jwt, cb));
    },
    changeItemQuantity: (itemId, quantity, jwt, cb) => {
      dispatch(actions.changeItemQuantity(itemId, quantity, jwt, cb));
    },
    changeItemSize: (itemId, size, jwt, cb) => {
      dispatch(actions.changeItemSize(itemId, size, jwt, cb));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
