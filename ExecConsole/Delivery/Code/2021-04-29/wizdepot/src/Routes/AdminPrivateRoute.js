import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Redirect } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  let userType = localStorage.getItem('usertype');
  return (
    <>
      <Container className="bg-gray px-0">
        <AdminHeader />
        {/* <Route
          {...rest}
          render={props =>
            userType === 'admin' ? (<Component {...props} />) :
              (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
              )
          }
        /> */}
        <Route
          {...rest}
          render={props =>(<Component {...props} />)
          }
        />
      </Container>
    </>
  );
}
export default AdminPrivateRoute;