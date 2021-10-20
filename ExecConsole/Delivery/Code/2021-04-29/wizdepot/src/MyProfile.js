import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import AdminHeader from './components/AdminHeader.js';
import { apiPost, apiGet, apiPut, uploadImage, getBlobImage } from './Api.js';
import { isEqual } from 'lodash';
import { Redirect } from 'react-router';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreviewImg: null,
      userProfile_file: null,
      approvalList: [],
      userImgEditable: true,
      nameeditable: true,
      emaileditable: true,
      designation: true,
      reset: false,
      userID: localStorage.userdetails && JSON.parse(localStorage.userdetails).alternate.userID,
      email: localStorage.userdetails && JSON.parse(localStorage.userdetails).email,
      userName: localStorage.userdetails && JSON.parse(localStorage.userdetails).userName,
      password: localStorage.userdetails && JSON.parse(localStorage.userdetails).password,
      npassword: '',
      cnpassword: '',
      error_message: ''
    };
  }

  componentDidMount = () => {
    this.getApproverData();
    // this.getUserProfileImg();
  }

  getUserProfileImg = async (e) => {
    let imageSrc = '';
    const getRequest = {
      method: `employees/images?id=${localStorage.userid}&itemtype=user_photo`
    };
    await getBlobImage(getRequest).then((response) => {
      if (response.data && response.data.size) {
        imageSrc = URL.createObjectURL(response.data);
        this.setState({ userPreviewImg: imageSrc });
        localStorage.setItem('userImg', imageSrc);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  getApproverData = () => {
    const getRequest = {
      method: `employees/alternates?org=${localStorage.orgid}&manager=${localStorage.userid}`,
      params: {}
    };
    apiGet(getRequest, true, false).then((response) => {
      if (isEqual(response.status, 200) && response.data) {
        this.setState({ approvalList: response.data })
      } else {
        this.setState({ approvalList: [] })
      }
    }).catch(error => {
      this.setState({ approvalList: [] })
    });
  }


  changeApproval = () => {
    const { userID } = this.state;
    this.setState({ designation: true, userID })
    let requestDetails = {
      method: 'employees/alternates',
      params: {
        type: "user",
        userID: localStorage.userid,
        alternate: {
          userID: userID === 'No alternate' ? 0 : Number(userID)
        }
      }
    };
    apiPost(requestDetails, true).then((response) => {
      if (isEqual(response.status, 200) && response.data) {
        let obj = JSON.parse(localStorage.userdetails);
        obj.alternate.userID = userID;
        localStorage.setItem('userdetails', JSON.stringify(obj));
      }
    }).catch(error => {
      console.log(error);
      window.alert('Something Went Wrong!');
    });
  }

  handleFormChange = (e) => {
    let ename = e.target.name;
    this.setState({ [ename]: e.target.value });
  }
  resetPassword = (e) => {
    if (this.state.npassword === this.state.cnpassword) {
      let requestDetails1 = {
        method: 'employees/password-reset',
        params: {
          userName: this.state.userName,
          oldPassword: this.state.password,
          newPassword: this.state.npassword
        }
      };
      apiPost(requestDetails1, true).then((response) => {
        this.setState({ reset: false });
      }).catch(error => {
        console.log(error); this.setState({ reset: false });
      });
    } else {
      this.setState({ 'error_message': 'New Password and Confirm New Password are not Same!' });
    }
  }

  updateUser = (e) => {
    let udetails = JSON.parse(localStorage.userdetails);
    let requestDetails1 = {
      method: 'employees/' + localStorage.userid,
      params: {}
    };
    apiGet(requestDetails1, true).then((response) => {
      udetails = response.data
    }).catch(error => {
      console.log(error)
    });

    let requestDetails = {
      method: 'employees/' + localStorage.userid,
      params: {
        type: "user",
        userID: localStorage.userid,
        userName: this.state.userName,
        password: this.state.password,
        firstName: udetails.firstName,
        lastName: udetails.lastName,
        employeeType: udetails.employeeType,
        userType: udetails.userType,
        status: udetails.status,
        email: this.state.email,
        wage_category: udetails.wage_category,
        timingMethod: udetails.timingMethod,
        timeApprover: udetails.timeApprover,
        group: udetails.group,
        userProfile: udetails.userProfile,
        userActivities: udetails.userActivities
      }
    };
    apiPut(requestDetails, true).then((response) => {
      this.setState({ editsupershow: false });
    }).catch(error => {
      console.log(error)
    });

    let requestDetails2 = {
      method: 'employees/' + localStorage.userid,
      params: {}
    };
    apiGet(requestDetails2, true).then((response) => {
      localStorage.setItem("userdetails", JSON.stringify(response.data));
    }).catch(error => {
      console.log(error)
    });
    this.setState({ nameeditable: true })
    this.setState({ emaileditable: true })
  }

  userLogoChange = event => {
    const fileUploaded = event.target.files[0];
    this.setState({ userPreviewImg: URL.createObjectURL(fileUploaded), userProfile_file: fileUploaded, userImgEditable: false });
  };

  updateEmpImage = (e) => {
    e.preventDefault();
    const { userProfile_file } = this.state;
    let userid = localStorage.userid;
    let requestDetails3 = { method: `employees/images?id=${userid}&itemtype=user_photo` };
    let empUserImg = new FormData();
    if (userProfile_file) {
      empUserImg.append("file", userProfile_file);
    }
    uploadImage(requestDetails3, empUserImg).then((response) => {
      if (response.status === 200 && response.data) {
        this.setState({ userImgEditable: true });
      }
    }).catch(error => {
      console.log(error)
    });
  }
  render() {
    const userType = localStorage.usertype;
    if (!userType) return <Redirect to="/" />
    const { userPreviewImg, userImgEditable } = this.state;
    return (
      <div className="App">
        <Container>
          <AdminHeader />
          <div className="content mt-3 pl-2 width-80 small_font">
            <div>
              <h6>Super User Profile - {localStorage.userdetails && `${JSON.parse(localStorage.userdetails).firstName + ' ' + JSON.parse(localStorage.userdetails).lastName}`} ({localStorage.userdetails && JSON.parse(localStorage.userdetails).email})</h6>
              <p className="">Manage User Information</p>
            </div>
            <div className="my-4">
              <div className="row form-group">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <label>Login Name</label>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <input type="text" disabled={this.state.nameeditable} className="form-control" value={this.state.userName} placeholder="Enter Login Name" onChange={this.handleFormChange} name="userName" />
                </div>
                <div style={this.state.nameeditable === true ? { display: 'none' } : {}} className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <p>
                    <span className="link-style pl-0" onClick={() => this.setState({ nameeditable: true })}>Cancel</span> |
                    <span className="link-style pl-2" onClick={this.updateUser}>Save</span>
                  </p>
                </div>
                <div style={this.state.nameeditable === true ? {} : { display: 'none' }} className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <p>
                    <span className="link-style pl-0 mt-1" onClick={() => this.setState({ nameeditable: false })}>Change</span>
                  </p>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <label>Email</label>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <input type="email" disabled={this.state.emaileditable} className="form-control" value={this.state.email} placeholder="Enter Email" onChange={this.handleFormChange} name="email" />
                </div>
                <div style={this.state.emaileditable === true ? { display: 'none' } : {}} className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <p>
                    <span className="link-style pl-0" onClick={() => this.setState({ emaileditable: true })}>Cancel</span> |
                    <span className="link-style pl-2" onClick={this.updateUser}>Save</span>
                  </p>
                </div>
                <div style={this.state.emaileditable === true ? {} : { display: 'none' }} className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <p>
                    <span className="link-style pl-0 mt-1" onClick={() => this.setState({ emaileditable: false })}>Change</span>
                  </p>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <label>Password</label>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <input type="password" disabled='disabled' className="form-control" value={this.state.password} placeholder="Enter Password" onChange={this.handleFormChange} name="password" />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                  <p>
                    <span className="link-style pl-0" onClick={() => this.setState({ reset: true })}>Reset</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="border-bottom">
                <p className="mb-0">Change Your Profile Photo</p>
              </div>
              <Row className="p-3 text-center">
                <Col lg="3" md="3" sm="12">
                  <p className="text-muted">Upload Photo</p>
                  <img alt="Banner" className="profile-img" width="50%"
                    src={userPreviewImg ? userPreviewImg : require("./components/assets/img/user-default.png").default} />
                  <p>File size limit: 1 MB</p>
                </Col>
                <Col lg="9" md="9" sm="12" className="mt-6 text-left">
                  {userImgEditable ? <label className="button resend-btn py-2 px-4 m-0 cursor-pointer">
                    <input id="userSignature" type="file" onChange={this.userLogoChange} accept=".png, .jpg, .jpeg" style={{ display: 'none' }} />
                      Choose File
                      </label> :
                    <div>
                      <button className="button cancel-btn py-2 px-4 m-0 cursor-pointer mr-2" onClick={() => { this.setState({ userImgEditable: true }); this.getUserProfileImg() }}>Cancel</button>
                      <button className="button resend-btn py-2 px-4 m-0 cursor-pointer" onClick={this.updateEmpImage}>Save</button>
                    </div>}
                </Col>
              </Row>
            </div>
            {localStorage.usertype === 'manager' &&
              <div>
                <div className="border-bottom my-2"></div>
                <div className="row form-group pb-5 pt-3">
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                    <label>Select Designated Approver</label>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <select value={this.state.userID} disabled={this.state.designation} name="type" onChange={(e) => this.setState({ userID: e.target.value })} placeholder="Select" className="form-control">
                      <option value="No alternate">No alternate</option>
                      {Array.isArray(this.state.approvalList) && this.state.approvalList.map((item, i) => {
                        return <option value={item.userID} key={i}>{item.lastName} {item.firstName}</option>
                      })
                      }
                    </select>
                  </div>
                  {!this.state.designation &&
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                      <p>
                        <span className="link-style pl-0" onClick={() => this.setState({ designation: true })}>Cancel</span> |
                    <span className="link-style pl-2" onClick={() => this.changeApproval()}>Save</span>
                      </p>
                    </div>}
                  {this.state.designation &&
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 pt-2">
                      <p>
                        <span className="link-style pl-0 mt-1" onClick={() => this.setState({ designation: false })}>Change</span>
                      </p>
                    </div>}
                </div>
              </div>}
            <Modal size="md" onHide={() => this.setState({ reset: false })}
              show={this.state.reset}
              aria-labelledby="example-modal-sizes-title-lg">
              <Modal.Header closeButton>
                <Modal.Title className="h6" id="example-modal-sizes-title-lg">
                  Reset Password
        </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid small_font">
                <Container>
                  <span className="text-danger small_font">{this.state.error_message}</span>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Current Password*</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.handleFormChange} className="form-control" placeholder="Enter Current Password" />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">New Password*</label>
                    <input type="password" value={this.state.npassword} name="npassword" onChange={this.handleFormChange} className="form-control" placeholder="Enter New Password" />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password*</label>
                    <input type="password" value={this.state.cnpassword} name="cnpassword" onChange={this.handleFormChange} className="form-control" placeholder="Enter Confirm New Password" />
                  </div>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <ul className="row form-group mr-0 mt-4 pr-0 list-inline pull-right">
                  <li><button onClick={() => this.setState({ reset: false })} className="button cancel-btn py-2 px-4 m-0 mr-2">Close</button></li>
                  <li><button onClick={this.resetPassword} className="button resend-btn py-2 px-4 m-0">Save</button></li>
                </ul>
              </Modal.Footer>
            </Modal>
          </div>
        </Container>

      </div>
    );
  }
}

export default MyProfile;
