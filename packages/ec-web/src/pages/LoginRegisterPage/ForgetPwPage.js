import React, { Component,Fragment } from 'react';
import {Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import { Link, withRouter } from 'react-router-dom';
import SearchContainer from '../../containers/SearchContainer';
class ForgetPwPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = { 
            email: document.getElementById('email').value,
        }

        if(data.email) {
            this.setState({
                loading: true
            });

            axios({
                method: 'POST',
                url: '/forget-password',
                data
            }).then(res => {
                if(res && res.status === 200) {
                    this.setState({
                        loading: false
                    });
                    alert("Gửi yêu cầu thành công!!! Vui lòng kiểm tra email để lấy mật khẩu mới");
                }
            }).catch(error => {
                this.setState({
                    loading: false
                });
                if(error.response) {
                    alert("Lỗi: " + error.response.data.message)
                }
            })
        }
        else {
            alert("Vui lòng điền vào email thuộc về tài khoản của bạn!!!")
        }
    }
    render() {
        let disabledSubmit = (this.state.loading === true) ? true : false;
        let contentSubmit = (this.state.loading === false) ? 'Lấy lại mật khẩu' : (
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
        return (
            <Fragment> 
            <div className="container mt-2 mb-4 wow fadeInUpBig" data-wow-duration="1s">
                <Helmet>
                    <title>Quên mật khẩu</title>
                </Helmet>
                <form className="regForm mx-auto shadow p-4">
                    <h2 className="text-center">Quên mật khẩu</h2>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" class="form-control" placeholder="Tên" aria-describedby="helpId" /> 
                    </div>
                    <div className="text-center">
                        <button class="btn btn-dark w-100" onClick={this.handleSubmit} disabled={disabledSubmit}>
                            { contentSubmit }
                        </button>
                    </div> 
                </form>
            </div>
            <SearchContainer history={this.props.history}/>
            </Fragment>  
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgetPwPage));