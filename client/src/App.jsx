import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import BrandProducts from "./pages/BrandProducts";
import NotFound from "./pages/NotFound";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminUsers from "./pages/AdminUsers";


function App() {
    return (
        <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">

            <Navbar />
            <main className="flex-grow-1">
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/category/:category/brand/:brand"
                    element={<BrandProducts />}
                />

                <Route
                    path="/category/:category"
                    element={<Category />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/order-success/:id"
                    element={<OrderSuccess />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />

                {/* ADMIN */}

                <Route element={<AdminRoute />}>

                    <Route
                      path="/admin"
                      element={<AdminDashboard />}
                    />

                    <Route
                      path="/admin/products"
                      element={<AdminProducts />}
                    />

                    <Route
                      path="/admin/products/add"
                      element={<AdminAddProduct />}
                    />

                    <Route
                      path="/admin/products/edit/:id"
                      element={<AdminEditProduct />}
                    />

                    <Route
                      path="/admin/orders"
                      element={<AdminOrders />}
                    />

                    <Route
                      path="/admin/orders/:id"
                      element={<AdminOrderDetails />}
                    />

                    <Route
                      path="/admin/users"
                      element={<AdminUsers />}
                    />


                </Route>

                <Route
        path="*"
        element={<NotFound />}
    />

                

            </Routes>
            </main>


            <Footer />

        </div>
        </BrowserRouter>
    );
}

export default App;