import React, { Component, Fragment } from "react";
import ProductList from "./../components/ProductList";
import { connect } from "react-redux";
import ProductItem from "./../components/ProductItem";
import { withRouter } from "react-router";
import * as actions from "./../actions/index";
import $ from "jquery";

class ProductListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 3,
    };
  }

  componentDidMount() {
    $(".filter__controls li").on("click", function () {
      $(".filter__controls li").removeClass("active");
      $(this).addClass("active");
    });
  }

  renderProductItems(products) {
    var result = null;
    const onPage = this.props.onPage;
    if (products.length > 0) {
      var count = 0;
      result = products.map((product, index) => {
        if (onPage === 1) {
          if (product.status !== 0 && count < 8) {
            count++;
            return (
              <ProductItem
                key={index}
                index={index}
                product={product}
                onChange={this.state.option}
                onPage={this.props.onPage}
                onAddToCart={this.props.onAddToCart}
                history={this.props.history}
              />
            );
          }
        }

        return "";
      });
    }
    return result;
  }
  onClick(option) {
    this.setState({
      option: option,
    });
  }
  render() {
    var { products } = this.props;

    let query = new URLSearchParams(this.props.location.search);

    var search = query.get("search");
    //xử lý sự kiện search
    if (search) {
      var keyword = search.toLowerCase();
      products = products.filter((product) => {
        return product.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    return (
      <Fragment>
        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ul className="filter__controls">
                  <li
                    className="active"
                    data-filter="*"
                    onClick={() => {
                      this.onClick(3);
                    }}
                  >
                    Bán chạy
                  </li>
                  <li
                    data-filter=".new-arrivals"
                    onClick={() => {
                      this.onClick(1);
                    }}
                  >
                    Mặt hàng mới
                  </li>
                  <li
                    data-filter=".hot-sales"
                    onClick={() => {
                      this.onClick(2);
                    }}
                  >
                    Hot Sales
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="row product__filter wow fadeInRightBig"
              data-wow-duration="2s"
            >
              <ProductList>{this.renderProductItems(products)}</ProductList>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.results,
    onPage: state.page,
    keyword: state.search,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductListContainer));
