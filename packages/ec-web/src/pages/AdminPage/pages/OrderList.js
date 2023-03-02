import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orderCode: null,
            orderStatus: -1,
            sort: 'newest',
            filterOptions: [
                {
                    value: -1,
                    label: "Tất cả"
                },
                {
                    value: 0,
                    label: "Đang xử lý"
                },
                {
                    value: 1,
                    label: "Đã tiếp nhận"
                },
                {
                    value: 2,
                    label: "Đang giao hàng"
                },
                {
                    value: 3,
                    label: "Hoàn thành"
                },
                {
                    value: 4,
                    label: "Đã hủy"
                },
            ],
            sortOptions: [
                {
                    value: "newest",
                    label: "Mới nhất"
                },
                {
                    value: "oldest",
                    label: "Cũ nhất"
                }
            ],
            bills: []
        }
    }

    componentDidMount() {
        console.log(this.props.token);
        axios({
            method: 'GET',
            url: '/api/bills/search',
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    bills: res.data,
                    loading: false
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

    search = () => {
        this.setState({
            loading: true
        })

        let query = '?';
        if(this.state.orderCode) {
            query += 'code=' + this.state.orderCode + '&';
        }

        if(this.state.orderStatus >= 0 && this.state.orderStatus <= 4) {
            query += 'status=' + this.state.orderStatus + '&';
        }

        if(this.state.sort === 'newest') {
            query += 'sort=newest&';
        }

        if(this.state.sort === 'oldest') {
            query += 'sort=oldest&';
        }

        console.log(query);
        // callApi(`bills/search${query}`, 'GET', null, {
        //     headers: {
        //         "Authorization" : `Bearer ${this.props.token}`
        //     }})
        axios({
            method: 'GET',
            url: `/api/bills/search${query}`,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            if(res && res.status === 200)
                    this.setState({
                        bills: res.data
                    });
            this.setState({
                loading: false
            });
        });
    }

    handleCodeOnChange = (event) => {
        const value = event.target.value;
        this.setState({
            orderCode: value
        })
    }

    handleCodeSubmit = (event) => {
        event.preventDefault();
        this.search();
    }

    handleStatusOnChange = selectedOption => {
        this.setState({
            orderStatus: selectedOption.value
        }, this.search);
    }

    handleSortOnChange = selectedOption => {
        this.setState({
            sort: selectedOption.value
        }, this.search);
    }

    render() {
        const displayBills = this.state.bills.map((bill, index) => {
            bill.bookingDate = new Date(bill.bookingDate);
            let statusText = (<span className="badge badge--custom badge-secondary">Đang xử lý</span>);
            switch(bill.status) {
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
            return (
                <tr>
                    <td>{ (index + 1).toString().padStart(4, 0) }</td>
                    <td className="text-center">{ bill.id_Bill }</td>
                    <td className="text-center">{ `${bill.bookingDate.getDate()}/${bill.bookingDate.getMonth() + 1}/${bill.bookingDate.getFullYear()}` }</td>
                    <td className="text-center">{ bill.totalPrice.toLocaleString('de-DE') + 'đ' }</td>
                    <td className="text-center">{ statusText }</td>
                    <td className="text-center"><Link to={`/admin/don-hang?id=${bill.id_Bill}`} className="text-primary">Xem chi tiết</Link></td>
                </tr>
            )
        })
        return (
            <Fragment>
                <h4 className="text-center mb-4">Danh sách đơn hàng</h4>
                <div className="row mx-0 px-0">
                    <div className="col-2  d-flex align-items-center">
                      <label className="mb-0">Mã đơn hàng: </label>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control" name="orderCode" id="orderCode" placeholder={"Ví dụ: AK12345"} onChange={this.handleCodeOnChange} />
                    </div>
                    <div className="col-4">
                      <button type="submit" className="btn btn-success" onClick={this.handleCodeSubmit}>Tìm ngay</button>
                    </div>
                </div>
                <div className="row mx-0 px-0 mt-4">
                    <div className="col row mx-0 px-0">
                        <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Trạng thái: </label>
                        </div>
                        <div className="col-8">
                            <Select
                                ref={(ref) => { this.statusSelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                defaultValue={this.state.filterOptions[0]}
                                options={this.state.filterOptions}
                                onChange={this.handleStatusOnChange}
                            />
                        </div>
                    </div>
                    <div className="col-1"></div>      
                    <div className="col row mx-0 px-0">
                        <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Sắp xếp theo: </label>
                        </div>
                        <div className="col-8">
                            <Select
                                ref={(ref) => { this.statusSelect = ref }}
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                defaultValue={this.state.sortOptions[0]}
                                options={this.state.sortOptions}
                                onChange={this.handleSortOnChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="order-list mt-3">
                    <table className="table table--custom">
                        <thead className="sticky-top thead--custom" style={{zIndex: 0}}>
                            <tr>
                                <th>STT</th>
                                <th className="text-center">Mã đơn hàng</th>
                                <th className="text-center">Ngày đặt hàng</th>
                                <th className="text-center">Tổng thành tiền</th>
                                <th className="text-center">Trạng thái</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            { displayBills }
                        </tbody>
                    </table>
                </div>
                <div className="text-center my-3">Tổng cộng: {this.state.bills.length} danh mục</div>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderList));