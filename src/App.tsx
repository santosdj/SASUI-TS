import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import {
  Home,
  RequestNew,
  Request,
  Requests,
  RequestsAuthor,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/requests" exact component={Requests} />
            <Route path="/request/new" exact component={RequestNew} />
            <Route path="/request/open/:id" exact component={Request} />
            <Route
              path="/requests/author/:status"
              exact
              component={RequestsAuthor}
            />
            <Route
              path="/requests/ordered/:orderby"
              exact
              component={Requests}
            />
          </Switch>
        </Layout>
      </>
    </BrowserRouter>
  );
}

export default App;
