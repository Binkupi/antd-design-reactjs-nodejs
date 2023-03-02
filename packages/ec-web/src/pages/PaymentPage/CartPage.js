import React, { Component, Fragment } from "react";
import SearchContainer from "../../containers/SearchContainer";
import CartContainer from "../../containers/CartContainer";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from '../../actions';
// import * as actions from './../../actions/index'
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    this.props.fetchCart(token);
  }

  render() {
    const { token } = this.props;
    if (!token) {
      return <Redirect to="/login" />;
    } else {
      return (
        <Fragment>
          <section className="breadcrumb-option ">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 wow fadeInLeftBig"
                  data-wow-duration="1s"
                >
                  <div className="breadcrumb__text">
                    <h4>Giỏ hàng</h4>
                    <div className="breadcrumb__links">
                      <a href="./Cart.html">Trang chủ</a>
                      <a href="./shop.html">Shop</a>
                      <span>Giỏ hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="section wow fadeInRightBig"
            data-wow-duration="1s"
          >
            <div className="table-responsive">
              <CartContainer />
            </div>
          </section>
          <SearchContainer history={this.props.history} />
        </Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.authorization,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (jwt) => {
        dispatch(actions.fetchCart(jwt));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
