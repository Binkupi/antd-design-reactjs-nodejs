import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import convertToMoney from "./../utils/convertMoney";
import * as actions from "./../actions/index";
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
  componentDidMount() {
    $(".search-switch").on("click", function () {
      $(".search-model").fadeIn(400);
    });
    $(".search-close-switch").on("click", function () {
      $(".search-model").fadeOut(400, function () {
        $("#search-input").val("");
      });
    });
  }
  
  onClick = (event) => {
    event.preventDefault();
    $(".search-switch").on("click", function () {
      $(".search-model").fadeIn(400);
    });
    $(".search-close-switch").on("click", function () {
      $(".search-model").fadeOut(400, function () {
        $("#search-input").val("");
      });
    });
  };
  
  signOut = (e) => {
    e.preventDefault();
    var { user, history } = this.props;
    this.props.onLogOut(user.id_User);
    this.props.logoutCart();
    this.props.setToken(null);
    this.props.setAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    history.push("/");
  };

  renderSignin = (user) => {
    if (!user.id) {
      return <Link to={"/login"}>Đăng nhập</Link>;
    } else {
      if (localStorage.getItem("isAdmin") === "true")
        return (
          <Fragment>
            <a href={"/admin"}>Quản lý Admin</a>
            <Link to={"/user"}>{`${user.firstName} ${user.lastName}`}</Link>
            <Link onClick={this.signOut} className="text-white">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Link>
          </Fragment>
        );
      else
        return (
          <Fragment>
            <Link to={"/user"}>{`${user.firstName} ${user.lastName}`}</Link>
            <Link onClick={this.signOut} className="text-white">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Link>
          </Fragment>
        );
    }
  };

  render() {
    return (
      <Fragment>
        {/* <!-- Header Section Begin --> */}
        <header className="header fadeInLeftBig " data-wow-duration="1s">
          <div className="header__top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-7">
                  <div className="header__top__left">
                    <p>
                      Miễn phí vận chuyển, hoàn trả trong 30 ngày hoặc đảm bảo
                      hoàn lại tiền.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5">
                  <div className="header__top__right">
                    <div className="header__top__links">
                      {this.renderSignin(this.props.user)}
                      <a href="/">FAQs</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="header__logo">
                  <Link to="/">
                    <img src="/img/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li>
                      <NavLink exact to="/" activeClassName="active">
                        Trang chủ
                      </NavLink>
                    </li>
                    <li>
                      <Link to={`/shop`}>Cửa hàng </Link>
                    </li>
                    <li>
                      <NavLink exact to="/about" activeClassName="active">
                        Về chúng tôi
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/contact" activeClassName="active">
                        Liên hệ
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
                  <Link
                    to={""}
                    onClick={this.onClick}
                    className="search-switch"
                  >
                    <img src="/img/icon/search.png" alt="" />
                  </Link>
                  <Link type="button" to={`/shop/cart`}>
                    <img src="/img/icon/cart.png" alt="" />{" "}
                    <span>{this.props.cart.items.length}</span>
                  </Link>
                  <div className="price">
                    {convertToMoney(this.props.cart.totalAmount)}đ
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    products: state.products,
    ...state.authorization,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: (id_User) => {
      dispatch(actions.logOut(id_User));
    },
    setToken: (token) => {
      dispatch(actions.setToken(token));
    },
    logoutCart: () => {
      dispatch(actions.logoutCart());
    },
    setAdmin: (isAdmin) => {
      dispatch(actions.setAdmin(isAdmin));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
