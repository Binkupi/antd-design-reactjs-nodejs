import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/products'
        }).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    products: res.data,
                    loading: false
                })
            }
        }).catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            }
            this.setState({
                loading: false
            })
        })
    }

    displayLoading = () => {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }

    deleteProduct = (event, id) => {
        event.preventDefault();
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            this.setState({
                loading: true
            });
            axios({
                method:'DELETE',
                url: `/api/products/${id}`,
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }).then(res => {
                if (res && res.status === 200) {
                    // Fetch new data
                    axios({
                        method: 'GET',
                        url: '/api/products'
                    }).then(res => {
                        if (res && res.status === 200) {
                            this.setState({
                                products: res.data
                            })
                        }
                        alert("Đã xóa thành công!!!");
                        this.setState({
                            loading: false
                        });
                    })
                } else {
                    alert("Xóa thất bại, vui lòng thử lại sau!!!");
                }
            }).catch(error => {
                if(error.response) {
                    alert("Lỗi: " + error.response.data.message)
                }
                this.setState({
                    loading: false
                });
            })
        }
    }

    viewProduct = (event, id) => {
        event.preventDefault();
        this.props.history.push(`/admin/san-pham?id=${id}`)
    }

    editProduct  = (event, id) => {
        event.preventDefault();
        this.props.history.push(`/admin/sua-san-pham?id=${id}`)
    }

    
    handleSearchSubmit = event => {
        event.preventDefault();
        let query = "?";

        if(document.getElementById("name").value)
            query += "name=" + document.getElementById("name").value + '&';

        if(document.getElementById("sku").value)
            query += "sku=" + document.getElementById("sku").value;

        axios({
            method: 'GET',
            url: `/api/products/search${query}`
        }).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    products: res.data,
                    loading: false
                })
            }
        }).catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            }
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const productList = this.state.products.map((product, index) => {
            return (
                <tr key={ index }>
                    <td>{ (index + 1).toString().padStart(3, 0) }</td>
                    <td>{ product.sku }</td>
                    <td>{ product.name }</td>
                    <td>{ product.category }</td>
                    <td className="pt-0 text-center">
                        <button className="btn" onClick={(event) => this.viewProduct(event, product.sku)}><i className="fa fa-eye text-primary" aria-hidden="true"></i></button>
                        <button className="btn" onClick={(event) => this.editProduct(event, product.sku)}><i className="fa fa-pencil-square-o text-success" aria-hidden="true"></i></button>
                        <button className="btn" onClick={(event) => this.deleteProduct(event, product.sku)}><i className="fa fa-trash text-danger" aria-hidden="true"></i></button>
                    </td>
                </tr>
            );
        })
        return (
            <Fragment>
                <h4 className="text-center mb-4">Danh sách sản phẩm</h4>
                <div className="row mx-0">
                    <div className="col-4 px-0">
                        <div className="row form-group px-0 mx-0">
                            <div className="col-3 d-flex align-items-center px-0">
                            <label className="mb-0">SKU:</label>
                            </div>
                            <div className="col-9 d-flex align-items-center px-0">
                            <input type="text" id="sku" className="form-control" aria-describedby="helpId"  />
                            </div>
                        </div>
                    </div>
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Tên sản phẩm:</label>
                            </div>
                            <div className="col-8 d-flex align-items-center px-0">
                            <input type="text" id="name" className="form-control" aria-describedby="helpId"  />
                            </div>
                        </div>
                    </div>
                    <div className="col-2 py-0 text-right px-0">
                        <button type="submit" className="btn btn-success" onClick={this.handleSearchSubmit}>Tìm ngay</button>
                    </div>
                </div>
                <div className="product-list mt-3">
                    <table className="table table--custom">
                        <thead className="sticky-top thead--custom">
                            <tr>
                                <th>STT</th>
                                <th>SKU</th>
                                <th>Tên sản phẩm</th>
                                <th>Danh mục</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            { productList }
                        </tbody>
                    </table>
                </div>
                <div className="text-center my-3">Tổng cộng: { this.state.products.length } sản phẩm</div>
                { this.displayLoading() }
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.authorization
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            dispatch(actions.setToken(token));
        },
        setAdmin: (isAdmin) => {
            dispatch(actions.setAdmin(isAdmin));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));