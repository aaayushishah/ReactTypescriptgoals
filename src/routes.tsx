import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./config/history";
import UserComponent from "./components/UserComponent";
import LoginComponent from "./components/LoginComponent";
import Storage from "./services/storage";
import RegisterComponent from "./components/RegisterComponent";
import CreateProduct from "./components/Products/CreateProduct";
import ProductList from "./components/Products/ProductList";
import CartList from "./components/Cart/CartList";
import Unauthorized from "./components/Unauthorized";
import Muicharts from "./components/Charts/Mui/charts";
import HighCharts from "./components/Charts/HighCharts/charts";

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = Storage.get("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }: any) => {
  const token = Storage.get("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }: any) => {
  const token = Storage.get("token");
  const user = Storage.getUser();
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAdmin ? <Component {...props} /> : <Redirect to="/products" />
      }
    />
  );
};

export const UserRoute = ({ component: Component, ...rest }: any) => {
  const token = Storage.get("token");
  const user = Storage.getUser();
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const routes = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/products" component={ProductList} exact />
          <PublicRoute path="/register" component={RegisterComponent} exact />
          <PublicRoute path="/login" component={LoginComponent} exact />
          <AdminRoute path="/" component={UserComponent} exact />
          <AdminRoute path="/add/products" component={CreateProduct} exact />
          <AdminRoute path="/muicharts" component={Muicharts} exact />
          <AdminRoute path="/highcharts" component={HighCharts} exact />
          <UserRoute path="/cart" component={CartList} exact />
          <Route path="/unauth" component={Unauthorized} exact />
        </Switch>
      </Router>
    </div>
  );
};
export default routes;
