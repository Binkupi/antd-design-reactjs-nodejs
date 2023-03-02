import React,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
class InfoUser extends Component {
  render(){
      var {user}=this.props;
    return (
        <Fragment>
            <div className="wow fadeInUpBig" data-wow-duration="1s">
                <h3 className="text-center">Tài khoản của tôi</h3>
                <table class="table" style={{width:"70%", marginLeft:"auto",marginRight:"auto"}} >
                    <thead> 
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Họ tên</th>
                            <td className="text-info">{user.firstName + " " + user.lastName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Số điện thoại:</th>
                            <td className="text-info">{user.phone}</td>
                        </tr>
                        <tr>
                                <th scope="row">Email:</th>
                                <td className="text-info">{user.email}</td>
                        </tr>
                        <tr>
                                <th scope="row">Địa chỉ:</th>
                                <td className="text-info">19 Quang Trung, TX. An Khê, Bình Định
                                    </td>
                        </tr>
                        <tr>
                                <td colSpan="2"><p className="text-center"><Link to={'/user/change-pasword'} className="btn btn-info">Thay đổi mật khẩu</Link></p></td>
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

        }
    }
export default connect(mapStateToProps,mapDispatchToProps)(InfoUser);

