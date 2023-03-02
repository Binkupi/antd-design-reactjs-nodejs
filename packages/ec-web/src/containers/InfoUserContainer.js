import React, { Component, Fragment } from "react";
import InfoUser from "./../components/Checkout/InfoUser";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class InfoUserContainer extends Component {
  render() {
    return (
      <Fragment>
        <InfoUser
          onaddInfoUserToOrder={this.props.onaddInfoUserToOrder}
          order={this.props.order}
          cart={this.props.cart}
          onaddBillRequest={this.props.onaddBillRequest}
          onAddBillSucess={this.props.onAddBillSucess}
          history={this.props.history}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onaddInfoUserToOrder: (user) => {
      dispatch(actions.addInfoUserToOrder(user));
    },
    onaddBillRequest: (newOrder) => {
      dispatch(actions.addBillRequest(newOrder));
    },
    onAddBillSucess: (isCheck) => {
      dispatch(actions.addBillSucess(isCheck));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoUserContainer);
