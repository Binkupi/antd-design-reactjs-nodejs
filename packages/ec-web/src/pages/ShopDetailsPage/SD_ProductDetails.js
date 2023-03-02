import React, { Component } from "react";
import $ from "jquery";
import { Helmet } from "react-helmet";
import convertToMoney from "./../../utils/convertMoney";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class SD_ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      quantitySize: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    $(".shop__sidebar__size label, .product__details__option__size label").on(
      "click",
      function () {
        $(
          ".shop__sidebar__size label, .product__details__option__size label"
        ).removeClass("active");
        $(this).addClass("active");
      }
    );
    const { options } = this.props.product;
    if (prevProps.product !== this.props.product) {
      this.setState({
        size: options[0].size,
        quantitySize: options[0].remaining,
      });
    }
  }

  renderAddToCartBtn = () => {
    if (this.state.quantitySize > 0) {
      return (
        <button id="addToCartBtn" className="primary-btn" onClick={this.handleAddItemToCart}>
          Thêm vào giỏ hàng
        </button>
      );
    }

    return (
      <button id="addToCartBtn" className="primary-btn" style={{ opacity: "0.6", cursor: "not-allowed" }} disabled={true}>
        Thêm vào giỏ hàng
      </button>
    );
  }

  handleAddItemToCart = () => {
    const { token, history } = this.props;
    if (!token) {
      return history.replace("/login");
    }

    const item = {
      product: this.props.product.id,
      size: this.state.size,
      quantity: 1
    };
    const btn = document.getElementById("addToCartBtn");
    btn.setAttribute("disabled", true);
    btn.innerHTML = 
      `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Đang thêm vào...`;

    this.props.addItemToCart(item, token, function() {
      btn.removeAttribute("disabled");
      btn.innerHTML = "Thêm vào giỏ hàng";
    });
  };

  handleChangeSize = (value) => {
    var product = this.props.product;
    var options = product.options;
    var quantity = 0;

    if (product.options) {
      options.forEach((item, index) => {
        if (item.size === value) {
          quantity = item.remaining;
        }
      });

      this.setState({
        size: value,
        quantitySize: quantity,
      });
    }
  };

  render() {
    var product = this.props.product;
    let options = this.props.options;
    let { quantitySize, size } = this.state;
    let displaySize = [];
    if (options) {
      // console.log(options);
      displaySize = options.map((option, index) => {
        return (
          <label
            key={index}
            onClick={() => this.handleChangeSize(option.size)}
            className={size === option.size ? "active" : ""}
          >
            {option.size}
          </label>
        );
      });
    }
    return (
      <div
        className="product__details__text wow fadeInLeftBig "
        data-wow-duration="1s"
      >
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        {/* <h1>{displaySize}</h1> */}
        <h4>{product.name}</h4>
        <div className="rating">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-o"></i>
          <span> - 5 Đánh giá</span>
        </div>
        <h3>{convertToMoney(product.price)}VND</h3>
        <p>{product.shortDesc}</p>
        <div className="product__details__option">
          <div className="product__details__option__size">
            <span>Kích cỡ:</span>
            {displaySize}
          </div>
        </div>
        <div className="product__details__cart__option">
          <div className="quantity">
            <div className="">
              <span>
                Số lượng sản phẩm trong kho <b>{quantitySize}</b> sản phẩm
              </span>
            </div>
          </div>
          { this.renderAddToCartBtn() }
        </div>
        <div className="product__details__last__option">
          <h5>
            <span>Các kênh thanh toán</span>
          </h5>
          <img src="/img/shop-details/details-payment.png" alt="" />
          <ul>
            <li>
              <span>SKU:</span> {product.sku}
            </li>
            <li>
              <span>Loại:</span> {product.category}
            </li>
            <li>
              <span>Nhãn:</span> {product.tags}
            </li>
          </ul>
        </div>
      </div>
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
    addItemToCart: (item, jwt, cb) => {
      dispatch(actions.addItemToCart(item, jwt, cb));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SD_ProductDetails);
