import React, { Component, Fragment } from 'react'
import callApi from '../../../utils/apiCaller';

export default class ViewCategory extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            loading: true,
            id: query.get('id')
        }
    }

    componentDidMount() {
        callApi(`categories/${this.state.id}`, 'GET')
            .then(res => {
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

    handleGoToEdit = (event, id) => {
        event.preventDefault();
        console.log(this.props.history);
        this.props.history.push(`/admin/sua-danh-muc?id=${id}`)
    }

    handleGoBack = (event) => {
        event.preventDefault();
        this.props.history.push(`/admin/xem-danh-muc`)
    }

    render() {
        return (
            <Fragment>
                <h4>Thêm danh mục</h4>
                <form id="form">
                <div className="row mx-0">
                        <div className="form-group col-6 mx-0 pl-0 pr-2">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input type="text" className="form-control readonly" id="name" name="name" readOnly />
                        </div>
                        <div className="form-group col-6 mx-0 pr-0 pl-2">
                            <label htmlFor="slug">Đường dẫn</label>
                            <input type="text" className="form-control readonly" id="slug" name="slug" readOnly />
                        </div>
                    <div className="form-group col-12 mx-0 px-0">
                        <label htmlFor="desc">Mô tả chi tiết</label>
                        <textarea className="form-control readonly" id="desc" name="desc" readOnly />
                    </div>
                    <div className="col-12 row mx-0 px-0">
                        <div className="col-6 px-0">
                            <button type="submit" class="btn btn-success" onClick={ event => this.handleGoToEdit(event, this.state.id) }>Sửa đổi</button>
                        </div>
                        <div className="col-6 text-right px-0">
                            <button type="reset" class="btn btn-danger" onClick={this.handleGoBack}>Quay lại</button>
                        </div>
                    </div>
                </div>
                </form>
                { this.displayLoading() }
            </Fragment>
        )
    }
}
