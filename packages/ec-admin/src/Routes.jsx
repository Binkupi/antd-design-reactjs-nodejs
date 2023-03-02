import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import HomePage from './Containers/HomePage';
import ManageProductPage from './Containers/ProductPage/ManageProduct';
import CreateProductPage from './Containers/ProductPage/CreateProduct';
import UpdateProductPage from './Containers/ProductPage/UpdateProduct';
import ShowProductPage from './Containers/ProductPage/ShowProduct';
import ManageCategoryPage from './Containers/CategoryPage/ManageCategory';
import CreateCategoryPage from './Containers/CategoryPage/CreateCategory';
import UpdateCategoryPage from './Containers/CategoryPage/UpdateCategory';
import ShowCategoryPage from './Containers/CategoryPage/ShowCategory';
import ManageTagPage from './Containers/TagPage/ManageTag';
import ShowTagPage from './Containers/TagPage/ShowTag';
import CreateTagPage from './Containers/TagPage/CreateTag';
import UpdateTagPage from './Containers/TagPage/UpdateTag';
import ManageOrderPage from './Containers/OrderPage/ManageOrder';
import ShowOrderPage from './Containers/OrderPage/ShowOrder';
import ManageUserPage from './Containers/UserPage/ManageUser';
import LoginPage from './Containers/LoginPage/LoginPage';
import ForgetPasswordPage from './Containers/LoginPage/ForgetPasswordPage';
import ResetPasswordPage from './Containers/LoginPage/ResetPasswordPage';
import Layout from './Components/Layout';
import LoadingScreen from './Components/LoadingScreen';

function Routes({ isLoggedIn, isLoading }) {
  if (isLoading) {
    return (<LoadingScreen />);
  }

  return (
    <BrowserRouter>
      {isLoggedIn ?
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/products/create" component={CreateProductPage} />
            <Route path="/products/:slug/update" component={UpdateProductPage} />
            <Route path="/products/:slug" component={ShowProductPage} />
            <Route path="/products" component={ManageProductPage} />
            <Route path="/categories/create" component={CreateCategoryPage} />
            <Route path="/categories/:id/update" component={UpdateCategoryPage} />
            <Route path="/categories/:id/" component={ShowCategoryPage} />
            <Route path="/categories" component={ManageCategoryPage} />
            <Route path="/tags/create" component={CreateTagPage} />
            <Route path="/tags/:id/update" component={UpdateTagPage} />
            <Route path="/tags/:id" component={ShowTagPage} />
            <Route path="/tags" component={ManageTagPage} />
            <Route path="/orders/:id" component={ShowOrderPage} />
            <Route path="/orders" component={ManageOrderPage} />
            <Route path="/nguoi-dung/danh-sach" component={ManageUserPage} />
            <Redirect from="/dang-nhap" to="/" />
            <Redirect from="/quen-mat-khau" to="/" />
            <Redirect from="/dat-lai-mat-khau" to="/" />
          </Switch>
        </Layout>
      :
      <Switch>
        <Route path="/dang-nhap" component={LoginPage} />
        <Route path="/quen-mat-khau" component={ForgetPasswordPage} />
        <Route path="/dat-lai-mat-khau" component={ResetPasswordPage} />
        <Redirect from="*" to="/dang-nhap" />
      </Switch>}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(Routes);