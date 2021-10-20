import moment from 'moment';
import React from 'react';
import { Row, Col } from "react-bootstrap";
import { apiGet } from './Api.js';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      summaryData: {},
      profileData:{},
      loadSummaryData: false,
    };
  }

  componentDidMount() {
    this.getSummary();
    this.getProfileData();
  }

  getProfileData = () => {
    let requestDetails = {
      method: `/exec-users/${localStorage.userid}`,
      params: {}
    };
    apiGet(requestDetails).then((response) => {
      if (response && response.data && response.status === 200) {
        this.setState({ profileData: response.data });
      } else {
        this.setState({ profileData: {} });
      }
    }).catch(error => {
      console.log(error)
    });
  }


  getSummary = () => {
    this.setState({ loadSummaryData: true });
    let requestDetails = {
      method: 'customers/summary',
      params: {}
    };
    apiGet(requestDetails).then((response) => {
      if (response && response.data && response.status === 200) {
        this.setState({ summaryData: response.data, loadSummaryData: false });
      } else {
        this.setState({ summaryData: {}, loadSummaryData: false });
      }
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    const { summaryData, loadSummaryData, profileData } = this.state;
    return (
      <div className="Dashboard">
        <Row className="p-5 text-white mb-5">
          {loadSummaryData ? <h3 className="text-black">Please Wait...</h3> :
            <>
              <Col lg="8" md="8" sm="12" className="summary py-3">
                <h3>Here are summary of all pending registrations...</h3>
                <div className="bg-white rounded">
                  <div className="p-3">
                    <div class="horizontal-line py-3"></div>
                    <div className="d-flex p-2 align-items-center">
                      <h1 className="px-2 text-orange">{summaryData.numOfNew}</h1>
                      <div className="pl-2">
                        <h6 className="text-gray">New Customer Registrations</h6>
                        <button onClick={() => this.setState({ reset: false })} className="button register-btn py-2 px-4 m-0">Review Now</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white mt-3 rounded text-gray">
                  <div className="p-3">
                    <h5>Profile Information:</h5>
                    <Row>
                      <Col lg={6} md={6} sm={12} className="pr-0">
                        <h6 className="text-blue">Your Name: <span className="text-gray">{profileData.firstName} {profileData.lastName}</span> </h6>
                        <h6 className="text-blue">Title: <span className="text-gray">{profileData.title}</span></h6>
                        <h6 className="text-blue">Cell Phone: <span className="text-gray">{profileData.cellPhone}</span></h6>
                        <h6 className="text-blue">Office Phone: <span className="text-gray">{profileData.officePhone}</span></h6>
                        <h6 className="text-blue">Fax Number: <span className="text-gray">{profileData.fax}</span></h6>
                        <h6 className="text-blue">Email: <span className="text-gray">{profileData.email}</span></h6>
                      </Col>
                      <Col lg={6} md={6} sm={12} className="px-0">
                        <h6 className="text-blue mb-0">Address:</h6>
                        <h6>
                          {profileData.address}
                          <br />
                          {profileData.city}, {profileData.state}, {profileData.zipcode}
                          <br />
                          {profileData.country}
                          <br />
                        </h6>
                        <br />
                        <br />
                        <h6 className="text-blue">Executive Since: <span className="text-gray">{profileData.startTime ? moment(profileData.startTime).format('YYYY-MM-DD') : ''}</span></h6>
                      </Col>
                    </Row>
                    <div class="horizontal-line py-3"></div>
                    <Row>
                      <Col lg={7} md={7} sm={12} />
                      <Col lg={5} md={5} sm={12} className="text-right">
                        <button onClick={() => this.setState({ reset: false })} className="button register-btn py-2 px-4 m-0">Review Profile Information</button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="4" sm="12">
                <div className="py-3 bg-orange rounded">
                  <h6 className="px-2 mb-0">Currently, There are</h6>
                  <h5 className="px-2">{summaryData.numOfSuspended} Suspended Accounts</h5>
                  <h6 className="px-2 pt-3 mb-0 text-right"><u>View All Suspended Customers</u> ({summaryData.numOfSuspended})</h6>
                </div>
                <div className="my-3 bg-white rounded">
                  <h6 className="p-2 mb-0 bg-green rounded-top">Executive Summary</h6>
                  <div>
                    <h3 className="p-3 text-orange">{summaryData.numOfActive} <span className="font-12 text-gray">Total Active Customers</span></h3>
                  </div>
                </div>
              </Col>
            </>
          }
        </Row>
      </div>
    );
  }
}
export default Dashboard;