import React, { Component, Fragment } from 'react'
import axios from 'axios';
import convertToSlug from '../../../utils/convertToSlug';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom'

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleSLug =(event) => {
        const value = event.target.value;
        document.getElementById('slug').value = convertToSlug(value);
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
                <h4>Thêm danh mục</h4>
                <form id="form">
                <div className="row mx-0">
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="name" name="name" required onChange={this.handleSLug} />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="slug">Đường dẫn</label>
                            <input type="text" className="form-control" id="slug" name="slug" required />
                        </div>
                    <div className="form-group col-12 mx-0 px-0">
                        <label htmlFor="desc">Mô tả chi tiết</label>
                        <textarea className="form-control" id="desc" name="desc" rows={4} required onChange={this.handleInputChange} />
                    </div>
                    <div className="col-12 row mx-0 px-0">
                        <div className="col-6 px-0">
                            <button type="submit" className="btn btn-success" onClick={ this.handleSubmit }>Tạo ngay</button>
                        </div>
                        <div className="col-6 text-right px-0">
                            <button type="reset" className="btn btn-danger">Nhập mới</button>
                        </div>
                    </div>
                </div>
                </form>
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