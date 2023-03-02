import React, { Component,Fragment } from 'react';
import {Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import { Link, withRouter } from 'react-router-dom';
import SearchContainer from '../../containers/SearchContainer';
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleRegister = (event) => {
        event.preventDefault();
        const data = {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            password: document.getElementById('password').value, 
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value, 
        }

        if(!data.username || !data.name || !data.password || !data.email || !data.phone || !data.address) {
            alert('Vui lòng nhập đủ thông tin!!!')
        } else if(document.getElementById("password").value === document.getElementById("passwordConfirmed").value)
        {
            this.setState({
                loading: true
            });

            axios({
                method: 'POST',
                url: '/register',
                data
            }).then(res => {
                if(res && res.status === 200) {
                    this.setState({
                        loading: false
                    });
                    if(window.confirm('Tạo tài khoản thành công, bạn có muốn đăng nhập ngay?')) {
                        this.props.history.push('/login');
                    }
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
            alert("Mật khẩu bạn nhập không khớp nhau")
        }
    }
    render() {
        let disabledSubmit = (this.state.loading === true) ? true : false;
        let contentSubmit = (this.state.loading === false) ? 'Tạo tài khoản mới' : (
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
        return (
            <Fragment> 
            <div className="container mt-2 mb-4 wow fadeInUpBig" data-wow-duration="1s">
                <Helmet>
                    <title>Đăng ký</title>
                </Helmet>
                <form className="regForm mx-auto shadow p-4">
                    <h2 className="text-center">Đăng ký</h2>
                    <p className="text-center"><u><Link to="/login">Đã có tài khoản? Đăng nhập ngay.</Link></u></p>
                    <div class="form-group">
                        <label for="username">Tên tài khoản</label>
                        <input type="text" name="username" id="username" class="form-control" placeholder="Số điện thoại" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <input type="password" name="password" id="password" class="form-control" placeholder="Mật khẩu" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="passwordConfirmed">Xác nhận mật khẩu</label>
                        <input type="password" name="passwordConfirmed" id="passwordConfirmed" class="form-control" placeholder="Xác nhận mật khẩu" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="name">Họ & tên</label>
                        <input type="text" name="name" id="name" class="form-control" placeholder="Tên" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" class="form-control" placeholder="Tên" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="address">Địa chỉ</label>
                        <input type="text" name="address" id="address" class="form-control" placeholder="Số điện thoại" aria-describedby="helpId" /> 
                    </div>
                    <div class="form-group">
                        <label for="phone">Số điện thoại</label>
                        <input type="number" name="phone" id="phone" class="form-control" placeholder="Số điện thoại" aria-describedby="helpId" /> 
                    </div>
                    <div className="text-center">
                        <button class="btn btn-dark w-100" onClick={this.handleRegister} disabled={disabledSubmit}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));