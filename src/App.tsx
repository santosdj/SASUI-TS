import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Home,
  RequestNew,
  Request,
  Requests,
  RequestsAuthor,
} from './pages/index';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
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
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
