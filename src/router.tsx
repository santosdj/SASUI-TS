import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/auth";
import {
  Home,
  RequestNew,
  Request,
  Requests,
  RequestsAuthor,
} from "./pages/index";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./routes/PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <>
          <Switch>
            <Layout>
              <Route path="/signin" exact component={SignIn} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/home" exact component={Home} />
              <PrivateRoute path="/requests" exact component={Requests} />
              <PrivateRoute path="/request/new" exact component={RequestNew} />
              <PrivateRoute
                path="/request/open/:id"
                exact
                component={Request}
              />
              <PrivateRoute
                path="/requests/author/:status"
                exact
                component={RequestsAuthor}
              />
              <PrivateRoute
                path="/requests/ordered/:orderby"
                exact
                component={Requests}
              />
            </Layout>
          </Switch>
        </>
      </AuthProvider>
    </BrowserRouter>
  );
}
