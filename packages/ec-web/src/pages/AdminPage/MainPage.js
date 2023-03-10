import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import './theme/style.css'
import AddProduct from './pages/AddProduct';
import CategoryList from './pages/CategoryList';
import OrderList from './pages/OrderList';
import ProductList from './pages/ProductList';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import EditProduct from './pages/EditProduct';
import ViewCategory from './pages/ViewCategory';
import ViewProduct from './pages/ViewProduct';
import ViewOrder from './pages/ViewOrder';
import AddTag from './pages/AddTag';
import TagList from './pages/TagList';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import axios from 'axios';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: ''
        }
    }

    componentDidMount() {
        if(this.props.token) {
            this.setState({
                loading: true
            });
            axios({
                method: 'GET',
                url: `/api/users/me`,
                headers: {
                    "Authorization": `Bearer ${this.props.token}`
                }
            }).then(res => {
                if(res && res.status === 200) {
                    this.props.setAdmin(res.data.isAdmin);
                    this.setState({
                        username: res.data.username
                    })
                    this.setState({
                        loading: false
                    });
                }
            });
        }
    }

    loginSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        axios({
            method: 'POST',
            url: `/login`,
            data: {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            }
        }).then(res => {
            if(res && res.status === 200) {
                this.props.setToken(res.data.token);
                axios({
                    method: 'GET',
                    url: `/api/users/me`,
                    headers: {
                        "Authorization": `Bearer ${this.props.token}`
                    }
                }).then(res => {
                    if(res && res.status === 200) {
                        this.props.setAdmin(res.data.isAdmin);
                        let user = {
                            ...res.data
                        };
                        this.setState({
                            username: user.username
                        })
                        this.props.fetchIdUserInCart(user.id_User);
                        this.props.fetchIdUserInOrder(user.id_User);
                        user = JSON.stringify(user);
                        localStorage.setItem('user', user);
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
                alert('T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c');
                this.setState({
                    loading: false
                });
            }
          });
    }

    goBackHome = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    logout = (event) => {
        event.preventDefault();
        this.props.setToken(null);
        this.props.setAdmin(null);
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
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

    render() {
        if(!this.props.token) {
            return (
                <Router>
                    <div className="fixed">
                        <div className="login-box rounded">
                            <h4 className="text-center mb-4">????ng nh???p</h4>
                            <div className="form-group">
                                <label>T??n ????ng nh???p</label>
                                <input type="text" className="form-control" name="username" id="username" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <label>M???t kh???u</label>
                                <input type="password" className="form-control" name="password" id="password" aria-describedby="helpId" />
                            </div>
                            <button type="submit" class="btn btn-success w-100 mt-3" onClick={this.loginSubmit}>????ng nh???p</button>
                        </div>
                    </div>
                    { this.displayLoading() }
                </Router>
            )
        } else {
            if(!this.props.isAdmin) {
                return (
                    <Router>
                        <div className="fixed">
                            <div className="login-box rounded">
                                <h4 className="text-center mb-4 text-danger">Th??ng b??o</h4>
                                <p className="text-center mb-4">T??i kho???n c???a b???n kh??ng c?? quy???n truy c???p ch???c n??ng n??y!!!</p>
                                <div className="text-center">
                                    <button type="submit" class="btn btn-success mr-3" onClick={this.goBackHome}>V??? trang ch???</button>
                                    <button type="submit" class="btn btn-danger" onClick={this.logout}>?????i t??i kho???n</button>
                                </div>
                            </div>
                        </div>
                        { this.displayLoading() }
                    </Router>
                )
            } else {
                return (
                    <Router>
                        <Helmet>
                            <title>Admin Page</title>
                        </Helmet>
                        <div className="body">
                        <div className="container d-flex align-items-stretch shadow-lg px-0">
                            <nav id="sidebar">
                                <div className="p-4">
                                    <h2 className="text-center text-white"><a href="/">Male Fashion</a></h2>
                                    <ul className="list-unstyled components mb-5">
                                        <li>
                                            <a href="#accountSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle "><i className="fa fa-user-circle mr-2" aria-hidden="true"></i>{ this.state.username }</a>
                                            <ul className="collapse list-unstyled" id="accountSubmenu">
                                                <li>
                                                    <Link to="/admin/doi-mat-khau">Thay ?????i m???t kh???u</Link>
                                                </li>
                                                <li>
                                                    <Link to="" onClick={this.logout}>????ng xu???t</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link to="/admin/xem-don-hang">Qu???n l?? ????n h??ng</Link>
                                        </li>
                                        <li>
                                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Qu???n l?? s???n ph???m</a>
                                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                                <li>
                                                    <Link to="/admin/xem-san-pham">Danh s??ch s???n ph???m</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/them-san-pham">Th??m s???n ph???m</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Qu???n l?? danh m???c</a>
                                            <ul className="collapse list-unstyled" id="categorySubmenu">
                                                <li>
                                                    <Link to="/admin/xem-danh-muc">Danh s??ch danh m???c</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/them-danh-muc">Th??m danh m???c</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#tagSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Qu???n l?? tags</a>
                                            <ul className="collapse list-unstyled" id="tagSubmenu">
                                                <li>
                                                    <Link to="/admin/xem-tags">Danh s??ch tags</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/them-tag">Th??m danh tag m???i</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            {/* Page Content  */}
                            <div id="content" className="p-4 bg-white">
                                <Route path={'/admin/xem-san-pham'} component={ProductList} />
                                <Route path={'/admin/xem-danh-muc'} component={CategoryList} />
                                <Route path={'/admin/them-san-pham'} component={AddProduct} />
                                <Route path={'/admin/them-danh-muc'} component={AddCategory} />
                                <Route path={'/admin/sua-danh-muc'} component={EditCategory} />
                                <Route path={'/admin/sua-san-pham'} component={EditProduct} />
                                <Route path={'/admin/danh-muc'} component={ViewCategory} />
                                <Route path={'/admin/san-pham'} component={ViewProduct} />
                                <Route path={'/admin/xem-don-hang'} component={OrderList} />
                                <Route path={'/admin/don-hang'} component={ViewOrder} />
                                <Route path={'/admin/doi-mat-khau'} component={ChangePassword} />
                                <Route path={'/admin/xem-tags'} component={TagList} />
                                <Route path={'/admin/them-tag'} component={AddTag} />
                                <Route exact path={'/admin'} component={Home} />
                            </div>
                        </div>
                        </div>
                        { this.displayLoading() }
                    </Router>
                )
            }
        }
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
        },
        // fetchIdUserInCart: (id) => {
        //     dispatch(actions.fetchIdUserInCart(id));
        // },
        fetchIdUserInOrder:(id)=>{
            dispatch(actions.fetchIdUserInOrder(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));