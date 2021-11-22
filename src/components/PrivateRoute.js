import { Redirect, Route } from 'react-router-dom';
//import { selectIsAuthenticated } from '../features/authentication/authSelectors';
//import { useSelector } from 'react-redux';
import { useState } from 'react';

const PrivateRoute = ({ children, ...props }) => {
  //let isAuthenticated = useSelector(selectIsAuthenticated);
  const [isAuth] = useState(localStorage.getItem('authorized') === '1');

  return (
    <Route
      {...props}
      render={() => (isAuth ? children : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
