import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./functions/auth";

const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Header = lazy(() => import("./components/navbar/Header"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Home = lazy(() => import("./pages/Home"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCategoryCreate = lazy(() =>
  import("./pages/admin/subcategory/SubCategoryCreate")
);
const SubCategoryUpdate = lazy(() =>
  import("./pages/admin/subcategory/SubCategoryUpdate")
);
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Products = lazy(() => import("./pages/admin/product/Products"));
const Product = lazy(() => import("./pages/Product"));
const Category = lazy(() => import("./pages/Category"));
const SubCategory = lazy(() => import("./pages/SubCategory"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const CouponCreate = lazy(() => import("./pages/admin/coupon/CouponCreate"));
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center py-5">
          Welcome to WOODECOR
          <br />
          <LoadingOutlined className="my-5" />
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        {/* User Routes */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory"
          component={SubCategoryCreate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory/:_id"
          component={SubCategoryUpdate}
        />
        <AdminRoute exact path="/admin/products" component={Products} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/product/:_id"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupon" component={CouponCreate} />
        {/* General Routes */}
        <Route exact path="/product/:_id" component={Product} />
        <Route exact path="/category/:slug" component={Category} />
        <Route exact path="/subcategory/:_id" component={SubCategory} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
