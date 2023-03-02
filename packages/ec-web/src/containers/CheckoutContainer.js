import React, { Component, Fragment } from "react";
import ListOrder from "./../components/Checkout/ListOrder";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import * as Message from "./../constants/Message";
import convertToMoney from "./../utils/convertMoney";

class CheckoutContainer extends Component {
  renderOrderItem(cart) {
    if (cart.items.length > 0) {
      return cart.items.map((item, index) => {
        if (item.quantity !== 0)
          return (
            <div className="row mb-3 mx-0" style={styles.smallText}>
              <div className="col-4 pt-2">
                <img src={`${process.env.REACT_APP_API_URL}${item.product.images[0]}`} alt={ item.product.name } />
              </div>
              <div className="col-8 pl-0">
                <p
                className="my-0"
                style={styles.autoEclipse}
                data-toggle="tooltip" 
                data-placement="top" 
                title={ item.product.name }
                >
                  <small>{ item.product.name}</small>
                </p>
                <p className="my-0">
                  <small>Size: { item.size }</small>
                </p>
                <p
                className="my-0"
                style={styles.autoEclipse}
                data-toggle="tooltip" 
                data-placement="top" 
                title={ `${convertToMoney(item.product.price)}đ x ${item.quantity} = ${convertToMoney(item.product.price * item.quantity)}đ` }
                >
                  <small>{ `${convertToMoney(item.product.price)}đ x ${item.quantity} = ${convertToMoney(item.product.price * item.quantity)}đ` }</small>
                </p>
              </div>
            </div>
          );
        return false;
      });
    }
    
    return (<li>{ Message.MSG_ORDER_EMPTY }</li>);
  }
  
  render() {
    const { cart } = this.props;
    return (
      <Fragment>
        <ListOrder
          renderOrderItem={this.renderOrderItem(cart)}
          onAddCouponToOrder={this.props.onAddCouponToOrder}
          cart={cart}
        />
      </Fragment>
    );
  }
}


const styles = {
  autoEclipse: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "context-menu",
  },
  smallText: {
    fontSize: '0.8rem',
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCouponToOrder: (infoCoupon) => {
      dispatch(actions.addCouponToOrder(infoCoupon));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
