import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";

import WholeSkeleton from "./components/WholeSkeleton";

// import HomePage from "./pages/HomePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));
const FavouriteProductsPage = lazy(() =>
  import("./pages/FavouriteProductsPage")
);
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const RegisterPage = lazy(() => import("./pages/authPages/RegisterPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/authPages/ForgotPasswordPage")
);
const ResetPasswordByOtp = lazy(() =>
  import("./pages/authPages/ResetPasswordByOtp")
);
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/admin/UpdateCategory"));
const UsersList = lazy(() => import("./pages/admin/UsersList"));
const Orders = lazy(() => import("./pages/user/Orders"));
const SingleOrder = lazy(() => import("./pages/user/SingleOrder"));
const Profile = lazy(() => import("./pages/user/Profile"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminSingleOrder = lazy(() => import("./pages/admin/AdminSingleOrder"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

function App() {
  return (
    <>
      <Suspense fallback={<WholeSkeleton />}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
            <Route
              path="user/favourite-products"
              element={<FavouriteProductsPage />}
            />
            <Route path="user/order/:oid" element={<SingleOrder />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/update-category" element={<UpdateCategory />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/users" element={<UsersList />} />
            <Route path="admin/order/:oid" element={<AdminSingleOrder />} />
          </Route>
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/reset-password-by-otp"
            element={<ResetPasswordByOtp />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
