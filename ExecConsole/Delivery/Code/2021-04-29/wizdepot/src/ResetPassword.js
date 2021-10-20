import React from 'react';
import Logo from './components/assets/img/login-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/css/login.css';
import 'font-awesome/css/font-awesome.css';
import {apiPost} from './Api.js';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userid : (this.props.location.state) ? this.props.location.state.id :'',
      userdetails : '',
      fields: {},
      errors: {},
      error_message: '',
      success_message:''
    };
  };
  onSubmit = (e) => {      
      this.props.history.push("/Login");
  }
  handleChange = (e) => {
    let fields = this.state.fields;
    let errors = this.state.errors;
    fields[e.target.name] = e.target.value;
    errors[e.target.name] = "form-control is-valid";
    this.setState({
      fields
    });
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "form-control is-invalid";
    }
    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "form-control is-invalid";
      }
    }    
    if(!formIsValid){
      this.setState({
        error_message: 'Please Enter Valid Email!'
      });
    }else{
      this.setState({
        error_message: ''
      });
    }    
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  resendEmail = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let requestDetails = { 
        method:'adminusers/14/pwd-request',
        params:{
          email : this.state.fields.email
        }
      };
      apiPost(requestDetails, true).then((response)=> {
        this.setState({success_message : 'Email sent Successfully!'}) 
        this.props.history.push({
          pathname:"/Login",
          state:{msg:'Instructions to reset your password has been sent to your Email'}
        });       
      }).catch((error) => {
        this.setState({error_message : error.response.data.msg})
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
      });
    }else{      
    }
  }
	render() {
  return (
    <div className="background h-100">
    <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center m-0">
      <div className="col-12 forgot-margin"> 
          <div className="login-form text-center col-lg-4 col-md-5 col-sm-9">  
              <img src={Logo} width="86%" alt="Logo"/>
              <img alt="Banner" width="15%" src={require("./components/assets/img/time-icon.png").default} />
              <p className="font-weight-bold font-11 mb-2">Reset Password</p>
              <p className="text-danger small_font">{this.state.error_message}</p>
              <p className="text-success small_font">{this.state.success_message}</p>
              <form>
              <div className="input-group my-3">
                  <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                  </div>
                  <input type="password" name='password' value={this.state.fields.password} onChange={this.handleChange} className={ (this.state.errors["password"] ? this.state.errors["password"] : '')} className="form-control" placeholder="Password" />
              </div>
              <div className="input-group my-3">
                  <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                  </div>
                  <input type="password" name='cpassword' value={this.state.fields.cpassword} onChange={this.handleChange} className={ (this.state.errors["cpassword"] ? this.state.errors["cpassword"] : '')} className="form-control" placeholder="Confirm Password" />
              </div>
              <input type="button" onClick={this.resendEmail} className="button w-100 py-2 mb-3"  value="Change Password"/>
              </form>
          </div>
          </div>  
    </div>  
  </div></div>
  );
  }
}

export default ResetPassword;
