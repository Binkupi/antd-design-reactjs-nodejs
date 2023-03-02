import React, { Component, Fragment } from 'react'
import convertToSlug from '../../../utils/convertToSlug';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class EditCategory extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            loading: true,
            id: query.get('id')
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `/api/categories/${this.state.id}`,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            if(res && res.status === 200) {
                let data = res.data;
                document.getElementById('name').value = data.name;
                document.getElementById('slug').value = data.slug;
                document.getElementById('desc').value = data.desc;
                this.setState({
                    loading: false
                });
            } else {
                alert("Danh mục cần xem không tồn tại!!!");
                this.props.history.push(`/admin/xem-danh-muc`);
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
            method: 'PUT',
            url: `/api/categories/${this.state.id}`,
            data: data,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res && res.status === 200) {
                if(window.confirm('Lưu thành công!!! Bạn có muốn về trang danh mục?'))
                    this.props.history.push('/admin/xem-danh-muc');
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!!!");
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

    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/admin/xem-danh-muc')
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
                            <button type="submit" class="btn btn-success" onClick={ this.handleSubmit }>Lưu thay đổi</button>
                        </div>
                        <div className="col-6 text-right px-0">
                            <button type="reset" class="btn btn-danger" onClick={ this.handleCancel }>Quay lại</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCategory));