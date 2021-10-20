import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import MyProfile from './MyProfile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminPrivateRoute from './Routes/AdminPrivateRoute';
import Customers from './Customers';
import ExecutiveManagement from './ExecutiveManagement';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <AdminPrivateRoute path="/Dashboard" component={Dashboard} />
      <AdminPrivateRoute path="/customers" component={Customers} />
      <AdminPrivateRoute path="/executive_management" component={ExecutiveManagement} />
      <Route path="/MyProfile" render={(props) => <MyProfile {...props} />} />
      <Route path="/ForgotPassword" render={(props) => <ForgotPassword {...props} />} />
      <Route path="/ResetPassword" render={(props) => <ResetPassword {...props} />} />
      <Redirect to="/login" />
      <Redirect from="/" to="/login" />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();