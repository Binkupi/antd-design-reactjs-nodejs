import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom'

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            allBillsCount: 0,
            processingBillsCount: 0,
            productCount: 0,
            categoryCount: 0,
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/bills/count'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    allBillsCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/bills/count?status=0'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    processingBillsCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/products/count?'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    productCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/categories/count'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    categoryCount: res.data
                })
            }
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        let data = {
            name: document.getElementById('name').value,
            slug: document.getElementById('slug').value,
            desc: document.getElementById('desc').value
        }
        axios({
            method: 'POST',
            url: '/api/categories',
            data: data,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res && res.status === 200) {
                alert("Thêm danh mục thành công!!!");
                document.getElementById('name').value = '';
                document.getElementById('slug').value = '';
                document.getElementById('desc').value = '';
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!!!");
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message);
                this.setState({
                    loading: false
                });
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div className="row mx-0">
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>Đơn hàng chưa xử lý</h5>
                            <p>Có {this.state.processingBillsCount} đơn hàng chưa xử lý</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>Đơn hàng</h5>
                            <p>Có tổng cộng {this.state.allBillsCount} đơn hàng</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>Sản phẩm</h5>
                            <p>Có tổng cộng {this.state.productCount} sản phẩm</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>Danh mục</h5>
                            <p>Có tổng cộng {this.state.categoryCount} danh mục</p>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCategory));