import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Redirect } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

const ManagerPrivateRoute = ({ component: Component, ...rest }) => {
  let userType = localStorage.getItem('usertype');
  return (
    <>
      <div className="App">
        <Container>
          <AdminHeader />
        </Container>
      </div>
      <Route
        {...rest}
        render={props =>
          userType === 'manager' ? (<Component {...props} />) :
            (<Redirect to={{ pathname: "/index", state: { from: props.location } }}
            />)
        }
      />
    </>
  );
}

export default ManagerPrivateRoute;