import React,{Component,Fragment} from 'react';
import * as actions from './../../actions'
import {connect} from 'react-redux'
class LogOut extends Component {
    onClick=()=>{
        var {user,history}=this.props;
        this.props.onLogOut(user.id_User);
        this.props.logoutCart();
        this.props.setToken(null);
        this.props.setAdmin(null);
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
        history.replace('/');
    }
  render(){
      var {user}=this.props;
    return (
        <Fragment>
            <div className="wow fadeInUpBig" data-wow-duration="1s">
            <h2 className="text-center mb-4">Đăng xuất</h2>
                <table class="table" style={{width:"70%", marginLeft:"auto",marginRight:"auto"}} >
                    <thead> 
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Họ tên</th>
                            <td className="text-info"><b>{user.username}</b></td>
                        </tr>
                        <tr>
                                <td colSpan="2"><p className="text-center"><button type="button" onClick={this.onClick} className="btn btn-success">Đăng xuất</button></p></td>
                        </tr>
                    </tbody>
                </table>  
            </div>
            
        </Fragment>
        
    );
  }
  
}

const mapStateToProps=(state)=>{
    return {
        user:state.user,
        
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
       onLogOut:(id_User)=>{
            dispatch(actions.logOut(id_User));
        },
        setToken: (token) => {
            dispatch(actions.setToken(token));
        },
        logoutCart:() => {
            dispatch(actions.logoutCart());
        },
        setAdmin: (isAdmin) => {
            dispatch(actions.setAdmin(isAdmin));
        }
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
