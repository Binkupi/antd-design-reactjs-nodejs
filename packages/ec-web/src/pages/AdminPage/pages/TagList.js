import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';

class TagList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tags: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/tags'
        }).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    tags: res.data,
                    loading: false
                })
            }
        }).catch(error => {
            if(error.response) {
                alert("Lỗi: " + error.response.data.message)
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

    deleteTag = (event, id) => {
        event.preventDefault();
        if (window.confirm("Bạn có chắc muốn xóa tag này?")) {
            this.setState({
                loading: true
            });
            axios({
                method:'DELETE',
                url: `/api/tags/${id}`,
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }).then(res => {
                if (res && res.status === 200) {
                    // Fetch new data
                    axios({
                        method: 'GET',
                        url: '/api/tags'
                    }).then(res => {
                        if (res && res.status === 200) {
                            this.setState({
                                tags: res.data
                            })
                        }
                        alert("Đã xóa thành công!!!");
                        this.setState({
                            loading: false
                        });
                    }).catch(error => {
                        if(error.response) {
                            alert("Lỗi: " + error.response.data.message)
                        }
                        this.setState({
                            loading: false
                        });
                    });
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

    render() {
        const tagList = this.state.tags.map((tag, index) => {
            return (
                <tr key={index}>
                    <td>{(index + 1).toString().padStart(3, 0)}</td>
                    <td>{tag.name}</td>
                    <td>{tag.desc}</td>
                    <td className="pt-0 text-center">
                        <button className="btn" onClick={(event) => this.deleteTag(event, tag._id)}><i className="fa fa-trash text-danger" aria-hidden="true"></i></button>
                    </td>
                </tr>
            )
        })
        return (
            <Fragment>
                <h4 className="text-center mb-4">Danh sách tags</h4>
                <div className="category-list mt-3">
                    <table className="table table--custom">
                        <thead className="sticky-top thead--custom">
                            <tr>
                                <th>STT</th>
                                <th>Tên tag</th>
                                <th>Mô tả</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tagList}
                        </tbody>
                    </table>
                </div>
                <div className="text-center my-3">Tổng cộng: { this.state.tags.length } danh mục</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagList));