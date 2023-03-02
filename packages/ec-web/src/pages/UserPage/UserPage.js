import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import ChangePassword from './../../components/User/ChangePassword'
import LogOut from './../../components/User/LogOut'
import InfoUser from './../../components/User/InfoUser'
import OrderTraking from './../../components/User/OrderTraking'
import SearchContainer from '../../containers/SearchContainer';
import './theme/style.css'
import InfoBill from '../../components/User/InfoBill';
import {connect} from 'react-redux'
import * as actions from './../../actions'
import { Redirect } from 'react-router'
 class UserPage extends Component {
    componentDidMount() {
        var {user}=this.props;
        this.props.onFetchBillsByUserRequest(user.id_User);
        this.props.onFetchUserByIdRequest(user.id_User);
    }
    render() {
        var {history,token}=this.props;
        
            if(!token){
                return(
                    <Redirect to='/login'/>
                )
            }
            else{
                return (
                    <Router>
                        <Helmet>
                            <title>User Page</title>
                        </Helmet>
                        <div className="body-user" >
                            <div className="container d-flex align-items-stretch shadow-lg px-0">
                                <nav id="sidebar-user" className="wow fadeInLeftBig" data-wow-duration="1s">
                                    <div className="p-4">
                                        <h2 className="text-center text-black-user"><Link to="/user" >Tài khoản của tôi</Link></h2>
                                        <ul className="list-unstyled components mb-5">
                                            <li>
                                                <a href="#accountSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fa fa-user-circle mr-2" aria-hidden="true"></i> Tài khoản</a>
                                                <ul className="collapse list-unstyled" id="accountSubmenu">
                                                    <li>
                                                        <Link to="/user">Hồ Sơ</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/user/change-pasword">Thay đổi mật khẩu</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/user/logout">Đăng xuất</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            {/* className="active" */}
                                            <li >
                                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Quản lý đơn hàng</a>
                                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                                    <li>
                                                        <Link to="/user/order-traking">Theo dõi đơn hàng</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                                {/* Page Content  */}
                                <div id="content" className="p-4 bg-white">
                                    <Route path={'/user/change-pasword'} component={({history})=><ChangePassword history={history} />}/>
                                    <Route path={'/user/logout'} component={()=><LogOut history={history}/>} />
                                    <Route path={'/user'} component={InfoUser} exact={true}/>
                                    <Route path={'/user/order-traking'} component={({history})=><OrderTraking history={history}/>} exact={true} />
                                    <Route path={'/user/order-traking/:idBill'} component={({match})=><InfoBill match={match}/>} />
                                </div>
                            </div>
                        </div>
                        <SearchContainer history={this.props.history}/>
                    </Router>
                )
            }

            
    }
}

const mapStateToProps=(state)=>{
    return {
        user:state.user,
        list_bill:state.list_bill,
        ...state.authorization,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        onFetchBillsByUserRequest:(id_User)=>{
            dispatch(actions.fetchBillsByUserRequest(id_User));
        },
        onFetchUserByIdRequest:(id_User)=>{
            dispatch(actions.fetchUserByIdRequest(id_User));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
