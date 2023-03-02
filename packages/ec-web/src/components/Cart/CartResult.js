import React, { Component } from "react";
import { Link } from "react-router-dom";
import convertToMoney from "./../../utils/convertMoney";
class CartResult extends Component {
  renderOrderBtn = () => {
    if (this.props.canOrder) {
      return (
        <Link
          to={"/payment"}
          className="btn btn-primary waves-effect waves-light"
        >
          Thanh toán
        </Link>
      );
    }

    return (
      <button
        className="btn btn-secondary waves-effect waves-light"
        disabled={true} 
        style={{ cursor: "not-allowed" }}
      >
        Thanh toán
      </button>
    );
  }

  render() {
    return (
      <tr>
        <td colSpan="2"></td>
        <td colSpan="2">
          <h5>
            <strong>Tổng Tiền</strong>
          </h5>
        </td>
        <td colSpan="2">
          <h5>
            <strong>{convertToMoney(this.props.total)}VND</strong>
          </h5>
        </td>
        <td colSpan="2">
          { this.renderOrderBtn() }
        </td>
      </tr>
    );
  }
}

export default CartResult;
