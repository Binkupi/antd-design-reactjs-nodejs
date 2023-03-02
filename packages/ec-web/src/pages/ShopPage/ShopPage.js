import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import SearchContainer from "../../containers/SearchContainer";
import FilterNameContainer from "../../containers/FilterContainer/FilterNameContainer";
import SortContainer from "../../containers/SortContainer";
import ShopContainer from "../../containers/ShopContainer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import callApi from "../../utils/apiCaller";
import * as actions from "../../actions/index";

import "./bootstrap.css";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 9,
      categoriesList: [],
      tagsList: [],
      queryParams: this.props.history.location.search.length > 0 ? JSON.parse(
        '{"' +
          decodeURI(
            this.props.history.location.search
              .substring(1)
              .replace(/&/g, '","')
              .replace(/=/g, '":"')
          ) +
          '"}'
      ) : {},
    };
  }

  componentDidMount() {
    this.props.fetchProductsRequest(this.state.page, this.state.pageSize, this.state.queryParams);
    this.props.getDataPage(this.state.page);
    callApi("categories", "GET")
      .then((res) => {
        if (res && res.status === 200)
          this.setState({
            categoriesList: res.data.results,
          });
      })
      .catch((err) => {
        // if (err && err.response) alert(err.response.data);
      });
    callApi("tags", "GET")
      .then((res) => {
        if (res && res.status === 200)
          this.setState({
            tagsList: res.data.results,
          });
      })
      .catch((err) => {
        // if (err && err.response) alert(err.response.data);
      });
  }

  displayFilterCategories = () => {return this.state.categoriesList.map((category, index) => {
      return (
        <li key={index}>
          <Link type="button" to={`/shop?category=${category.name}`} onClick={() => {
            const queryParams = {
              category: category.name
            } 
            this.setState({ queryParams, page: 1  });
            this.props.fetchProductsRequest(this.state.page, this.state.pageSize, queryParams);
          }}>
            {category.name}
          </Link>
        </li>
      );
    });
  };

  displayFilterTags = () => {
    return this.state.tagsList.map((tag, index) => {
      return (
        <Link key={index} type="button" to={`/shop?tag=${tag.name}`} onClick={() => {
          const queryParams = {
            tags: tag.name
          } 
          this.setState({ queryParams, page: 1 });
          this.props.fetchProductsRequest(this.state.page, this.state.pageSize, queryParams);
        }}>
          {tag.name}
        </Link>
      );
    });
  };

  handlePageChange(pageNumber) {
    this.setState({page: pageNumber});
    this.props.fetchProductsRequest(pageNumber, this.state.pageSize, this.state.queryParams);
  }

  renderProductContainer() {
    if (this.props.productsPagination.total > 0) {
      return (
        <>
        <div className="row">
          <ShopContainer history={this.props.history} />
        </div>
          <div className="row pagination">
            <Pagination
              activePage={this.state.page}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.props.productsPagination.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
        </div>
        </>
      )
    }
    
    return (<p class="mt-5 pt-5 text-center">Không có sản phẩm</p>);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Cửa hàng</title>
        </Helmet>

        {/* <!-- Breadcrumb Section Begin --> */}
        <section className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Cửa hàng</h4>
                  <div className="breadcrumb__links">
                    <a href="/#">Trang chủ</a>
                    <span>Cửa hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Breadcrumb Section End --> */}

        {/* <!-- Shop Section Begin --> */}
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-3 wow fadeInLeftBig"
                data-wow-duration="1s"
              >
                <div className="shop__sidebar">
                  <div className="shop__sidebar__search">
                    <FilterNameContainer history={this.props.history} />
                  </div>
                  <div className="shop__sidebar__accordion">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-heading">
                          <a
                            href="/#"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                          >
                            Thể loại
                          </a>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="shop__sidebar__categories">
                              <ul className="nice-scroll">
                                {this.displayFilterCategories()}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <a
                            href="/#"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                          >
                            Kích thước
                          </a>
                        </div>
                        <div
                          id="collapseFour"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="shop__sidebar__size">
                              <Link type="button" to={`/shop/sizes?value=XS`}>
                                <label>
                                  xs
                                  <input type="radio" id="xs" />
                                </label>
                              </Link>
                              <Link type="button" to={`/shop/sizes?value=S`}>
                                <label>
                                  s
                                  <input type="radio" id="s" />
                                </label>
                              </Link>
                              <Link type="button" to={`/shop/sizes?value=M`}>
                                <label>
                                  m
                                  <input type="radio" id="m" />
                                </label>
                              </Link>
                              <Link type="button" to={`/shop/sizes?value=L`}>
                                <label>
                                  l
                                  <input type="radio" id="l" />
                                </label>
                              </Link>
                              <Link type="button" to={`/shop/sizes?value=XL`}>
                                <label>
                                  xl
                                  <input type="radio" id="xl" />
                                </label>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <a
                            href="/#"
                            data-toggle="collapse"
                            data-target="#collapseSix"
                          >
                            Nhãn
                          </a>
                        </div>
                        <div
                          id="collapseSix"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="shop__sidebar__tags">
                              {this.displayFilterTags()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-9 wow fadeInRightBig"
                data-wow-duration="1s"
              >
                <div className="shop__product__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      {/* <div className="shop__product__option__left">
                                                <p>Showing 1–12 of 126 results</p>
                                            </div> */}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <SortContainer />
                    </div>
                  </div>
                </div>
                { this.renderProductContainer() }
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Shop Section End --></div> */}
        <SearchContainer history={this.props.history} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    productsPagination: state.products.pagination,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsRequest: (page, pageSize, queryParams) => {
      dispatch(actions.fetchProductsRequest(page, pageSize, queryParams));
    },
    getDataPage: (data) => {
      dispatch(actions.getDataPage(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
