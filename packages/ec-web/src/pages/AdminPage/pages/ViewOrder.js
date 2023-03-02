import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            loading: true,
            id: query.get('id'),
            status: 0,
            details: [],
            id_Bill: ''
        }
    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: `/api/bills/${this.state.id}`
        }).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    status: Number(res.data.status)
                });
                this.setState({
                    id_Bill: res.data.id_Bill
                });
                this.setState({
                    details: res.data.products
                });
                document.getElementById('name').value = res.data.nameCustomer;
                document.getElementById('phone').value = res.data.phone;
                document.getElementById('email').value = res.data.email;
                document.getElementById('address').value = res.data.address;
                document.getElementById('coupon').value = (res.data.coupon !== ' ')  ?  res.data.coupon : 'Không có';
                document.getElementById('paymentMethod').value = res.data.paymentMethod;
                document.getElementById('orderNote').value = (res.data.orderNote !== ' ')  ?  res.data.orderNote : 'Không có';
                const bookingDate = new Date(res.data.bookingDate);
                document.getElementById('bookingDate').value = `${bookingDate.getDate()}/${bookingDate.getMonth() + 1}/${bookingDate.getFullYear()}`
                document.getElementById('totalPrice').value = res.data.totalPrice.toLocaleString('de-DE') + 'đ';
                this.setState({
                    loading: false
                });
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

    setStatus = (value) => {
        let alertText ="Bạn có chắc muốn tiếp nhận đơn hàng này?";
        switch(value) {
            case 2: 
                alertText ="Bạn có chắc đã vận chuyển đơn hàng này?";
                break;
            case 3:
                alertText ="Bạn có chắc đã hoàn thành đơn hàng này?";
                break;
        }

        if(window.confirm(alertText)) {
            this.setState({
                loading: true
            });
            
            axios({
                method: 'PUT',
                url: `/api/bills/${this.state.id}`,
                data: { status: value },
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }).then(res => {
                if(res && res.status === 200) {
                    this.setState({
                        status: value
                    })
                    this.setState({
                        loading: false
                    });
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

    cancelBill = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/api/bills/cancel-bill',
            data: {
                id_Bill: this.state.id_Bill
            }
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    status: 4
                })
                this.setState({
                    loading: false
                });
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

    displayMethod = () => {
        const methods = [
            {
                value: 1,
                label: "Tiếp nhận"
            },
            {
                value: 2,
                label: "Đã vận chuyển"
            },
            {
                value: 3,
                label: "Hoàn thành"
            },
        ];

        return methods.map((method, index) => {
            const disabled = (method.value <= this.state.status) ? true : false;
            return (
                <button disabled={disabled} className="btn btn-success mr-2" onClick={() => this.setStatus(method.value)}>{ method.label }</button>
            )
        })
    }

    displayCancel = () =>  {
        const disabled = (this.state.status >= 3) ? true : false;
        return (
            <button disabled={disabled} className="btn btn-danger" onClick={this.cancelBill}>Hủy đơn hàng</button>
        )
    }

    displayStatus = () => {
        let statusText = (<span className="badge badge--custom badge-secondary">Đang xử lý</span>);
        switch(this.state.status) {
            case 1: 
                statusText = (<span className="badge badge--custom badge-info">Đã tiếp nhận</span>);
                break;
            case 2: 
                statusText = (<span className="badge badge--custom badge-primary">Đang giao hàng</span>);
                break;
            case 3: 
                statusText = (<span className="badge badge--custom badge-success">Hoàn thành</span>);
                break;
            case 4: 
                statusText = (<span className="badge badge--custom badge-danger">Đã hủy</span>);
                break;
        }
        return statusText;
    }

    displayDetail = () => {
        if(this.state.details.length > 0) {
            return this.state.details.map((detail, index) => {
                return (
                        <Fragment>
                            <p className="mb-0 mt-4">#{ index + 1}</p>
                            <hr />
                            <div className="col-12 row mx-0 d-flex align-items-center">
                                <div className="col-2">
                                    <img src={ `${process.env.REACT_APP_API_URL}${detail.image}`} className="img-fluid" alt="" />
                                </div>
                                <div className="col">#{ detail.sku }</div>
                                <div className="col-3">{ detail.name }</div>
                                <div className="col">SL: { detail.quantity }</div>
                                <div className="col">Đơn giá: { detail.price.toLocaleString("de-DE") }</div>
                                <div className="col">Size: { detail.size }</div>
                            </div>
                        </Fragment>
                )
            })
        }
    }

    render() {
        return (
            <Fragment>
                <div className="d-flex align-items-center justify-content-center mb-3">
                    <h4 className="text-center mb-0 mr-3">Chi tiết đơn hàng #{ this.state.id }</h4> 
                    { this.displayStatus() }
                </div>
                <div className="row mx-0 mb-4">
                    <div className="col-8">
                        {this.displayMethod()}
                    </div>
                    <div className="col-4 text-right">
                        {this.displayCancel()}
                    </div>
                </div>
                <div className="row mx-0 border p-3">
                    <div className="col-12 mb-3">
                        <h5 className="text-center">Thông tin khách hàng</h5>
                    </div>
                    <div className="form-group col-6 mx-0 pl-0 pr-2">
                        <label htmlFor="name">Họ tên khách hàng: </label>
                        <input type="text" className="form-control readonly" id="name" name="name" disabled onChange={this.handleSLug} />
                    </div>
                    <div className="form-group col-6 mx-0 pr-0 pl-2">
                        <label htmlFor="phone">Số điện thoại: </label>
                        <input type="text" className="form-control readonly" id="phone" name="phone" disabled />
                    </div>
                    <div className="form-group col-6 mx-0 pl-0 pr-2">
                        <label htmlFor="email">Email: </label>
                        <input type="text" className="form-control readonly" id="email" name="email" disabled onChange={this.handleSLug} />
                    </div>
                    <div className="form-group col-6 mx-0 pr-0 pl-2">
                        <label htmlFor="address">Địa chỉ: </label>
                        <input type="text" className="form-control readonly" id="address" name="address" disabled />
                    </div>
                </div>
                <div className="row mx-0 border p-3 mt-5">
                    <div className="col-12 mb-3">
                        <h5 className="text-center">Thông tin đơn hàng</h5>
                    </div>
                    <div className="form-group col-6 mx-0 pl-0 pr-2">
                        <label htmlFor="bookingDate">Ngày đặt hàng: </label>
                        <input type="text" className="form-control readonly" id="bookingDate" name="bookingDate" disabled onChange={this.handleSLug} />
                    </div>
                    <div className="form-group col-6 mx-0 pr-0 pl-2">
                        <label htmlFor="totalPrice">Tổng thành tiền: </label>
                        <input type="text" className="form-control readonly" id="totalPrice" totalPrice="name" disabled onChange={this.handleSLug} />
                    </div>
                    <div className="form-group col-6 mx-0 pl-0 pr-2">
                        <label htmlFor="coupon">Mã giảm giá: </label>
                        <input type="text" className="form-control readonly" id="coupon" name="coupon" disabled />
                    </div>
                    <div className="form-group col-6 mx-0 pr-0 pl-2">
                        <label htmlFor="paymentMethod">Phương thức thanh toán: </label>
                        <input type="text" className="form-control readonly" id="paymentMethod" name="paymentMethod" disabled />
                    </div>
                    <div className="form-group col-12 mx-0 pl-0 pr-2">
                        <label htmlFor="orderNote">Ghi chú: </label>
                        <textarea className="form-control readonly" rows={4} id="orderNote" name="orderNote" disabled>Đây là ghi chú của khách hàng</textarea>
                    </div>
                </div>
                <div className="row mx-0 border p-3 mt-5">
                    <div className="col-12">
                        <h5 className="text-center">Chi tiết đơn hàng</h5>
                    </div>
                    <div className="form-group col-12 mx-0 pl-0 pr-2">
                        { this.displayDetail() }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewOrder));