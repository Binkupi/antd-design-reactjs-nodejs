import React,{Component,Fragment} from 'react';
import  {changePassword} from './../../../actions'
import {connect} from 'react-redux'
class ChangePassword extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            errOldPassword:'',
            errNewPassword:'',
            errConfirmPassword:'',
        }
    }
    onChange=(event)=>
    {
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:value
        });
    }
    onSubmit=(e)=>{
        e.preventDefault();
        var {oldPassword,newPassword,confirmPassword}=this.state;
        if(oldPassword.length<8||newPassword.length<8||confirmPassword.length<8){
            if(oldPassword.length<8){
                this.setState({
                    errOldPassword:'Password phải có ít nhất 8 kí tự !!!',
                    
                });
            }else{
                this.setState({
                    errOldPassword:'',
                    
                });
            }
            if(newPassword.length<8){
                this.setState({
                    errNewPassword:'Password phải có ít nhất 8 kí tự !!!',
                    
                });
            }
            else{
                this.setState({
                    errNewPassword:'',
                    
                });
            }
            if(confirmPassword.length<8){
                this.setState({
                    errConfirmPassword:'Password phải có ít nhất 8 kí tự !!!', 
                });
            }else{
                this.setState({
                    errConfirmPassword:'',
                    
                });
            }
                
        }else{
            var {user,history}=this.props;
            if(newPassword===confirmPassword){
                changePassword(user.id_User,{ 
                    newPassword:newPassword,
                    oldPassword:oldPassword,
                })
                .then((res)=>{
                    console.log(res);
                    if(res.status===201){
                        alert("Mật khẩu đã được thay đổi thành công!!!")
                    }
                    else if(res.status===200){
                        this.setState({
                            errOldPassword:'Password không đúng !!!',
                            errNewPassword:'',
                            errConfirmPassword:'',
                        });
                    }
                    

                })      
            }else{
                this.setState({
                    errOldPassword:'',
                    errNewPassword:'',
                    errConfirmPassword:'Xác nhận mật khẩu không trùng khớp',
                });
            }
        }
        
        
    }
  render(){
      var {oldPassword,newPassword,confirmPassword,errConfirmPassword,errOldPassword,errNewPassword}=this.state;
    return (
        <Fragment>
            <h4 className="text-center mb-4">Thay đổi mật khẩu</h4>
            <form onSubmit={this.onSubmit}>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Mật khẩu cũ*:</label>
                            </div>
                            <div className="col-8 d-flex align-items-center px-0">
                            <input type="password" className="form-control" aria-describedby="helpId"  name="oldPassword" value={oldPassword} onChange={this.onChange} required/>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-left px-0">
                        <label className="text-danger">{errOldPassword}</label>
                        
                    </div> 
                </div>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Mật khẩu mới*:</label>
                            </div>
                            <div className="col-8 d-flex align-items-center px-0">
                            <input type="password"  className="form-control" aria-describedby="helpId" name="newPassword" value={newPassword} onChange={this.onChange} required/>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-left px-0">
                        <label className="text-danger">{errNewPassword}</label>
                    </div> 
                </div>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-4 d-flex align-items-center">
                            <label className="mb-0">Xác nhận mật khẩu*:</label>
                            </div>
                            <div className="col-8 d-flex align-items-center px-0">
                            <input type="password" className="form-control" aria-describedby="helpId" name="confirmPassword" value={confirmPassword} onChange={this.onChange} required/>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-left px-0">
                        <label className="text-danger">{errConfirmPassword}</label>
                    </div> 
                </div>
                <div className="row mx-0">
                    <div className="col-4 py-0 text-right px-0">
                        
                    </div>       
                    <div className="col-4 py-0 text-center px-0">
                        <button type="submit" className="btn btn-success">Đổi mật khẩu</button>
                    </div>
                    <div className="col-4 py-0 text-right px-0">
                        
                    </div>    
                </div>     
            </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
