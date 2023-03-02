import React, { Component, Fragment } from "react";
// import $ from "jquery";
import { Link } from "react-router-dom";
import convertToMoney from "./../../utils/convertMoney";
// import Cart from './Cart';
class CartItem extends Component {
  handleChangeItemSize = (event) => {
    const { value } = event.target;
    const { cartItem } = this.props;
    this.props.handleChangeItemSize(cartItem, value);
  };
  onDeleteProductToCart(cartItem) {
    this.props.onDeleteProductToCart(cartItem);
  }
  UpdateQuantity(cartItem, quantity) {
    // Increase or decrease quantity
    cartItem.quantity += quantity;

    if (cartItem.inventory < cartItem.quantity) {
      cartItem.quantity = cartItem.inventory;
    }

    cartItem.quantity = cartItem.quantity > 0 ? cartItem.quantity : 1;

    if (cartItem.inventory === 0) {
      cartItem.quantity = 0;
    }
    this.props.onUpdateProductToCart(cartItem);
  }
  renderOption = (options) => {
    return options.map((option) => {
      return (
        <option value={option.size} key={option.id}>
          {option.size}
        </option>
      );
    });
  };
  render() {
    const { cartItem } = this.props;
    const { quantity, size } = cartItem;
    const { remaining: inventory } = cartItem.product.options.find((option) => option.size === size);
    return (
      <Fragment>
        <tr>
          <th scope="row">
            <Link to={"#"}>
              <img
                src={`${process.env.REACT_APP_API_URL}${cartItem.product.images[0]}`}
                alt=""
                className=" z-depth-0"
                style={{ width: 100 }}
              />
            </Link>
          </th>
          <td>
            <h5>
              <strong>{cartItem.product.name}</strong>
            </h5>
          </td>
          <td>
            <select
              name="size"
              className="custom-select"
              value={size}
              onChange={this.handleChangeItemSize}
            >
              {this.renderOption(cartItem.product.options)}
            </select>
          </td>
          <td>{convertToMoney(cartItem.product.price)}đ</td>
          <td className="text-center">
            {inventory === 0 ? "sản phẩm tạm hết hàng" : inventory}
          </td>
          <td className="center-on-small-only text-center">
            <div className="btn-group radio-group">
              <button
                type="button"
                className="btn btn-sm btn--quantity-control rounded btn-secondary waves-effect waves-light"
                onClick={() => this.props.handleChangeItemQuantity(cartItem, quantity - 1)}
              >
                -
              </button>
              <span className="qty ml-2 mr-2 text-primary mt-1">
                { quantity }
              </span>
              <button
                type="button"
                className="btn btn-sm btn--quantity-control rounded btn-secondary waves-effect waves-light"
                onClick={() => this.props.handleChangeItemQuantity(cartItem, quantity + 1)}
              >
                +
              </button>
            </div>
          </td>
          <td>{convertToMoney(cartItem.product.price * quantity)}đ</td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-sm btn-danger"
              title=""
              onClick={() => this.onDeleteProductToCart(cartItem)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default CartItem;
