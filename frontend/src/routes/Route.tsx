import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // creating a property to receive it as {Component} not as <Component />
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {

  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      // here is where the logic stays
      render={({ location }) =>{
        /* if route is private and user is authenticater or
        if route is not private and user not authenticated
        than return <Component /> */
        return isPrivate === !!user ? (
          <Component />
        ) : (
          // if not in the logic above, than redirect to dashboard or home
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              // allows history to be mantained even when logged in or out
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
