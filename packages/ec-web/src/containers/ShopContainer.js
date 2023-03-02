import React, { Component, Fragment } from "react";
import ProductList from "../components/ProductList";
import { connect } from "react-redux";
import ProductItem from "../components/ProductItem";
import { withRouter } from "react-router";
import * as actions from "./../actions/index";
class ShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 3,
    };
  }
  renderProductItems(productsData) {
    var result;
    if (productsData.length > 0) {
      result = productsData.map((product, index) => (
        <ProductItem
          key={index}
          index={index}
          product={product}
          onChange={this.state.option}
          onPage={0}
          onSort={this.props.onSort}
          onAddToCart={this.props.onAddToCart}
          history={this.props.history}
        />
      ));
    }
    return result;
  }
  onClick(option) {
    this.setState({
      option: option,
    });
  }
  render() {
    var { productsData, keyword, sort } = this.props;
    var { match } = this.props;
    let query = new URLSearchParams(this.props.location.search);
    var filter = match.params.filter;
    if (filter) {
      if (filter === "categories") {
        productsData = productsData.filter((product) => {
          return product.category === query.get("value");
        });
      } else if (filter === "branding") {
        productsData = productsData.filter((product) => {
          return product.brand === query.get("value");
        });
      } else if (filter === "tags") {
        productsData = productsData.filter((product) => {
          var result = false;
          product.tags.map((element) => {
            if (element === query.get("value")) {
              result = true;
            }
            return null;
          });
          if (result) {
            return 1;
          }
          return 0;
        });
      } else if (filter === "sizes") {
        productsData = productsData.filter((product) => {
          var result = false;
          product.options.map((element) => {
            if (element.size === query.get("value")) {
              result = true;
            }
          });
          if (result) {
            return 1;
          }
          return 0;
        });
      } else if (filter === "search") {
        keyword = query.get("value").toLowerCase();
        productsData = productsData.filter((product) => {
          return product.name.toLowerCase().indexOf(keyword) !== -1;
        });
      }
    }
    //     //xử lý sự kiện search
    //     if(keyword){
    //       productsData=productsData.filter(product=>{
    //         keyword=keyword.toLowerCase()

    //       })

    //   }
    //xử lý sự kiện sort
    sort = Number(sort);
    if (sort === 1) {
      productsData = productsData.sort(function (product1, product2) {
        if (product1.price > product2.price) return 1;
        else if (product1.price < product2.price) return -1;
        return 0;
      });
    } else if (sort === 2) {
      productsData = productsData.sort(function (product1, product2) {
        if (product1.price < product2.price) return 1;
        else if (product1.price > product2.price) return -1;
        return 0;
      });
    } else if (sort === 3) {
      productsData = productsData.filter((product, index) => {
        return product.price <= 500000;
      });
      productsData = productsData.sort(function (product1, product2) {
        if (product1.price > product2.price) return 1;
        else if (product1.price < product2.price) return -1;
        return 0;
      });
    } else if (sort === 4) {
      productsData = productsData.filter((product, index) => {
        return product.price > 500000;
      });
      productsData = productsData.sort(function (product1, product2) {
        if (product1.price > product2.price) return 1;
        else if (product1.price < product2.price) return -1;
        return 0;
      });
    }
  
    return (
      <Fragment>
        <ProductList>{this.renderProductItems(productsData)}</ProductList>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsData: state.products.results,
    productsPagination: state.products.pagination,
    onPage: state.page,
    keyword: state.search,
    sort: state.sort,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopContainer));
