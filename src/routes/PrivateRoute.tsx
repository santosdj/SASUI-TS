/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface IPrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, location, ...rest } = props;
  const { accountInfo } = useAuth();
  console.log("Private Route");
  console.log(accountInfo?.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        accountInfo?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
