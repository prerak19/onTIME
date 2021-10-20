import React from 'react';
import Logo from './assets/img/footer_logo.png';
import { NavLink, Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { MDBDropdown, MDBDropdownToggle, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { getBlobImage } from '../Api';

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreviewImg: null,
    }
  }

  componentDidMount() {
    // if ((window.performance && window.performance.navigation.type == window.performance.navigation.TYPE_RELOAD) || !localStorage.userImg) {
    //   this.getUserProfileImg();
    // } else {
    //   this.setState({ userPreviewImg: localStorage.userImg })
    // }
  }

  getUserProfileImg = async () => {
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

  onSubmit = (e) => {
    localStorage.clear();
    this.props.history.push("/");
  }
  render() {
    const { userPreviewImg } = this.state;
    return (
      <div className="admin-header">
        <Navbar expand="lg" className="py-0 pr-0">
          <Navbar.Brand href="#home"><img src={Logo} width="100%" alt="Logo" />
            <span className="small_font text-white">Executive Console</span></Navbar.Brand>
          <div className="ml-auto">
            <MDBBtnGroup>
              <Nav.Link as={NavLink} to="/MyProfile" className="p-0 mt-2">
                <img alt="Banner" className="header-profile-img"
                  src={userPreviewImg ? userPreviewImg : require("./assets/img/user-default.png").default} />
              </Nav.Link>
              <MDBDropdown>
                <MDBDropdownToggle caret className="drop-menu-header" />
                <MDBDropdownMenu color="danger" className="header-drop-left">
                  <Link as={Link} to="/MyProfile">
                    <MDBDropdownItem className="pl-2">
                      <i className="font-25 fa fa-user-circle pr-2"></i><span>Profile</span>
                    </MDBDropdownItem>
                  </Link>
                  <Link onClick={this.onSubmit}>
                    <MDBDropdownItem className="pl-2">
                      <i className="font-25 fa fa-sign-out pr-2"></i><span>Logout</span>
                    </MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
          </div>
        </Navbar>
        <Navbar expand="md" sticky="top" className="pl-4 py-0 pr-0 nav2">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white mr-1" />
          <Navbar.Collapse id="basic-navbar-nav" className="ml-0">
            <Nav className="float-left">
              <Nav.Link as={NavLink} to="/Dashboard">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
              <Nav.Link as={NavLink} to="/executive_management">Executive Management</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(AdminHeader);
