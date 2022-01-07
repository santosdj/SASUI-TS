import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/auth";
import { Home, Request, Requests } from "./pages/index";
import { NewAS400RequestForm } from "./pages/RequestStepForm/AS400/NewAS400RequestForm";
import { NewSAPRequestForm } from "./pages/RequestStepForm/SAP/NewSAPRequestForm";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./routes/PrivateRoute";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // eslint-disable-next-line @typescript-eslint/naming-convention
  type DefaultTheme = Theme;
}

const theme = createTheme({
  palette: {
    primary: { main: "#31546d", light: "#5f809b", dark: "#002b42" },
    secondary: { main: "#5c6670", light: "#89949e", dark: "#323c45" },
  },
});

export default function Router(): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <>
              <Switch>
                <Layout>
                  <Route path="/signin" exact component={SignIn} />
                  <PrivateRoute path="/" exact component={Home} />
                  <PrivateRoute path="/home" exact component={Home} />
                  <PrivateRoute path="/requests" exact component={Requests} />
                  <Route
                    path="/sap/request"
                    exact
                    component={NewSAPRequestForm}
                  />
                  <Route
                    path="/as400/request"
                    exact
                    component={NewAS400RequestForm}
                  />
                  <PrivateRoute path="/request/:id" exact component={Request} />
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
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
