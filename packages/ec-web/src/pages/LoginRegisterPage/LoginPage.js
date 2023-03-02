import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { withRouter } from "react-router-dom";
import SearchContainer from "../../containers/SearchContainer";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  
  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    axios({
      method: "POST",
      url: "/users/auth/local",
      data: {
        email: document.getElementById("username").value,
        password: document.getElementById("password").value,
      },
    })
      .then((res) => {
        if (res && res.status === 200) {
          this.props.setToken(res.data.jwt);
          if (
            res.data.user.role.key !== "user" &&
            res.data.user.role.key !== "public"
          ) {
            this.props.setAdmin(true);
          } else {
            this.props.setAdmin(false);
          }

          let user = {
            ...res.data.user,
          };
          this.props.getUserLogin(user);
          this.props.fetchCartByIdUserRequest(user.id);
          this.props.fetchUserByIdRequest(user.id);
          this.props.fetchIdUserInCart(user.id);
          this.props.fetchIdUserInOrder(user.id);
          user = JSON.stringify(user);
          localStorage.setItem("user", user);
          this.setState({
            loading: false,
          });
          this.props.history.push("/");

          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        if (error.response) {
          if (error.response.status === 403) {
            if (
              window.confirm(
                "Vui lòng xác thực tài khoản của bạn qua email trước khi đăng nhập!!! Cần gửi lại mail xác thực?"
              )
            ) {
              axios({
                method: "POST",
                url: `resend-confirmed-email`,
                data: {
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value,
                },
              })
                .then((res) => {
                  alert(
                    "Gửi lại mail xác nhận thành công!!! Vui lòng kiểm tra email của bạn"
                  );
                })
                .catch((err) => {
                  alert("Lỗi: " + err.response.data.message);
                });
            }
          } else alert("Lỗi: " + error.response.data.message);
        }
      });
  };

  render() {
    if (this.props.token) {
      this.props.history.push("/");
    }

    let disabledSubmit = this.state.loading === true ? true : false;
    let contentSubmit =
      this.state.loading === false ? (
        "Đăng nhập"
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );

    return (
      <Fragment>
        <div className="container mt-2 mb-5">
          <Helmet>
            <title>Đăng nhập</title>
          </Helmet>
          <form className="row">
            <div
              className="col-md-6 p-4 shadow wow fadeInLeftBig"
              data-wow-duration="1s"
            >
              <div className="form-group">
                <h2 className="text-center">Đăng nhập</h2>
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  aria-describedby="helpId"
                  placeholder="Tên đăng nhập"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  aria-describedby="helpId"
                  placeholder="Mật khẩu"
                />
              </div>
              <p className="text-center">
                <u>
                  <Link to="/forget-password">Quên mật khẩu?</Link>
                </u>
              </p>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  onClick={this.handleLoginSubmit}
                  disabled={disabledSubmit}
                >
                  {contentSubmit}
                </button>
              </div>
            </div>

            <div
              className="col-md-6 p-5 wow fadeInRightBig"
              data-wow-duration="1s"
            >
              <h2>Người Mới? Tạo Tài Khoản</h2>
              <p>
                Bằng cách tạo tài khoản với cửa hàng của chúng tôi, bạn sẽ có
                thể thực hiện quy trình thanh toán nhanh hơn, lưu trữ nhiều địa
                chỉ giao hàng, xem và theo dõi đơn đặt hàng trong tài khoản của
                bạn và hơn thế nữa.
              </p>
              <Link to="/register">
                <button type="button" className="btn btn-primary">
                  Tạo tài khoản mới
                </button>
              </Link>
            </div>
          </form>
        </div>
        <SearchContainer history={this.props.history} />
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
    setToken: (token) => {
      dispatch(actions.setToken(token));
    },
    setAdmin: (isAdmin) => {
      dispatch(actions.setAdmin(isAdmin));
    },
    getUserLogin: (user) => {
      dispatch(actions.getUserLogin(user));
    },
    fetchUserByIdRequest: (id) => {
      dispatch(actions.fetchUserByIdRequest(id));
    },
    fetchIdUserInOrder: (id) => {
      dispatch(actions.fetchIdUserInOrder(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
