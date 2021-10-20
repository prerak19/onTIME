import React from 'react';
import Logo from './components/assets/img/login-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/css/login.css';
import 'font-awesome/css/font-awesome.css';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { apiGet, apiPost } from './Api.js';

class Login extends React.Component {
  constructor(props) {
    localStorage.clear();
    super(props);
    this.state = {
      errors: {},
      fields: {},
      errorAlert: false,
      messageTitle: "",
      messageContent: "",
      success_msg: (this.props && this.props.location && this.props.location.state) ? this.props.location.state.msg : '',
    }
  }
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    //userName
    if (!fields["userName"]) {
      formIsValid = false;
      errors["userName"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    if (!formIsValid) {
      this.setState({
        error_message: 'Please fill all *Required Fields!'
      });
    } else {
      this.setState({
        error_message: ''
      });
    }
    return formIsValid;
  }
  forceLogin = async (e) => {
    e.preventDefault();
    const { fields } = this.state;
    let data = null;
    if (this.handleValidation()) {
      let requestLogin = {
        method: 'exec-users/login',
        params: {
          userName: fields['userName'],
          passWord: fields['password'],
        }
      };
      await apiPost(requestLogin, true).then((response) => {
        if (response.status === 200 && response.data) {
          data = response.data;
          localStorage.setItem("access_token", response.data.msg);
          localStorage.setItem('userid', 1);
          this.props.history.push("/Dashboard");
        }else{
          this.setState({ error_message: 'Invalid login or Account Not Activated!' })
        }
      }).catch(error => {
        console.log(error.response)
      });
      // if (data && data.returnValue !== '' && !isEmpty(localStorage.access_token)) {
      //   let requestDetails1 = {
      //     method: 'employees/' + data.returnValue,
      //     params: {}
      //   };
      //   await apiGet(requestDetails1, true).then((response) => {
      //     localStorage.setItem("userid", response.data.userID);
      //     localStorage.setItem("orgid", response.data.org_id);
      //     if (response.data.adminType == 0 && response.data.userType <= 1) {
      //       localStorage.setItem("usertype", 'employee');
      //       this.props.history.push("/Dashboard");
      //     } else if (response.data.adminType == 0 && response.data.userType > 1) {
      //       localStorage.setItem("usertype", 'manager');
      //       this.props.history.push("/Dashboard");
      //     } else {
      //       localStorage.setItem("usertype", 'admin');
      //       this.props.history.push("/Dashboard");
      //     }
      //     localStorage.setItem("userdetails", JSON.stringify(response.data));
      //   }).catch(error => {
      //     console.log(error)
      //   });
      // } else {
      //   this.setState({ error_message: 'Invalid login or Account Not Activated!' });
      // }
    }
  }
  render() {
    return (
      <div className="background min-h-100">
        <div className="container">
          <div className="row h-100 justify-content-center align-items-center m-0">
            <div className="col-12 my-6">
              <div className="login-form text-center col-lg-4 col-md-5 col-sm-9">
                <img src={Logo} width="86%" alt="Logo" />
                <p className="font-weight-bold font-11 mb-2">WizDepot Executive Console</p>
                <p className="font-11 mb-2">Login to the Executive Console</p>
                <span className="text-danger small_font">{this.state.error_message}</span>
                <span className="text-success small_font">{this.state.success_msg}</span>
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i style={{ fontSize: '12px' }} className="fa fa-envelope" aria-hidden="true"></i></span>
                    </div>
                    <input type="text" className={(this.state.errors["userName"] ? 'form-control is-invalid' : 'form-control')}
                      name="email" onChange={this.handleChange.bind(this, "userName")} value={this.state.userName} placeholder="Enter Your Email Address*" />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-lock" aria-hidden="true"></i></span>
                    </div>
                    <input type="password"
                      className={(this.state.errors["password"] ? 'form-control is-invalid' : 'form-control')}
                      name="password" onChange={this.handleChange.bind(this, "password")} value={this.state.password} placeholder="Enter your Password*" />
                  </div>
                  <p className="small_font float-left px-1"><input type="checkbox" defaultChecked className="form-control w-auto float-left mt-1" /><label className="remember">Remember</label></p>
                  <Nav.Link as={NavLink} to='/ForgotPassword' className="small_font float-right text-decoration-underline blue-color p-0">
                    Forgot Password?
              </Nav.Link>
                  <input type="button" onClick={this.forceLogin.bind(this)} className="button w-100 py-2" value="Login" />
                </form>
                <p className="xs_font light_color px-2 mt-3 mb-0">By continuing, you're confirming that you've read our <a href="!#" className="text-decoration-underline blue-color">Terms & Conditions</a> and <a href="!#" className="text-decoration-underline blue-color">Cookie Policy</a></p>
              </div>
              <p className="col-12 text-center xs_font light_color px-2 mt-2 mb-0">(c) 2021 WizDepot. All Rights Reserved</p>
              <p className="col-12 text-center font-11 px-2 mt-3">Don't have an account?<Nav.Link href="#home" className="blue-color px-3">Sign Up</Nav.Link></p>
            </div>
          </div>
        </div></div>
    );
  }
}

export default Login;
