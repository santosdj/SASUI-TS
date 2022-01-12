/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface IPrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

const PrivateRoute = (props: IPrivateRouteProps): JSX.Element => {
  const { component: Component, location, ...rest } = props;
  const { accountInfo } = useAuth();

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
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
