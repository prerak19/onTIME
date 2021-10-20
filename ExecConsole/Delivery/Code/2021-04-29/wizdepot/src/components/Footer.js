import React from 'react';
import Logo from './assets/img/footer_logo.png';
class Footer extends React.Component {
	render() {
  return (
    <div className="footer">
        <div className="row">
            <div className="col-lg-2 col-xl-2 col-md-2 col-sm-12 col-xs-6 mt-4 pt-2"><img src={Logo} width="100%" alt="Logo"/></div>
            <div className="col-lg-2 col-xl-2 col-md-2 col-sm-6 col-xs-4">
            <ul>
              <li className="list-unstyled">
                <a href="#!">About</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Tour</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Case Studies</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Blog</a>
              </li>
            </ul>
            </div>
            <div className="col-lg-2 col-xl-2 col-md-2 col-sm-6 col-xs-4">
            <ul>
              <li className="list-unstyled">
                <a href="#!">Help Center</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">FAQ</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Testimonials</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Terms</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Privacy</a>
              </li>
            </ul>
            </div>
            <div className="col-lg-3 col-xl-3 col-md-3 col-sm-6 col-xs-6">
                <ul>
                <li className="list-unstyled">Contact us at:</li>
                <li className="list-unstyled">info@wizdepot.com</li></ul>
            </div>
            <div className="col-lg-3 col-xl-3 col-md-3 col-sm-6 col-xs-6 mblicon">
                <p>Stay up to date with the latest WizDepot news.</p>
                <img src={require("./assets/img/fb.png").default} width="20%" alt="Logo"/>
                <img src={require("./assets/img/twitter.png").default} width="20%" alt="Logo"/>
                <img src={require("./assets/img/linkedin.png").default} width="20%" alt="Logo"/>
                <img src={require("./assets/img/youtube.png").default} width="20%" alt="Logo"/>
            </div>
        </div>
    </div>
  );
}
}
export default Footer;
