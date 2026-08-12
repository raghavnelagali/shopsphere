import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {

    const { user } = useAuth();


    return (

        <div className="bg-light min-vh-100 py-4 py-md-5">

            <div className="container">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                    <div>

                        <span className="badge bg-primary mb-2">
                            Admin Panel
                        </span>

                        <h1 className="fw-bold mb-1">
                            Dashboard
                        </h1>

                        <p className="text-muted mb-0">
                            Welcome back, {user?.name || "Admin"} 👋
                        </p>

                    </div>


                    <Link
                        to="/"
                        className="btn btn-outline-primary mt-3 mt-md-0"
                    >
                        ← Back to Shop
                    </Link>

                </div>


                {/* ================================= */}
                {/* SUMMARY */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <h4 className="fw-bold mb-2">
                                    Manage ShopSphere
                                </h4>

                                <p className="text-muted mb-0">
                                    Manage your products, customer
                                    orders and registered users from
                                    one place.
                                </p>

                            </div>


                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <Link
                                    to="/admin/products/add"
                                    className="btn btn-primary"
                                >
                                    + Add Product
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* MANAGEMENT CARDS */}
                {/* ================================= */}

                <div className="row g-4">


                    {/* ================================= */}
                    {/* PRODUCTS */}
                    {/* ================================= */}

                    <div className="col-12 col-md-6 col-lg-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                    }}
                                >

                                    <span className="fs-2">
                                        📦
                                    </span>

                                </div>


                                <h4 className="fw-bold mb-2">
                                    Products
                                </h4>


                                <p className="text-muted flex-grow-1">

                                    Add new products, edit existing
                                    products, manage stock and
                                    product images.

                                </p>


                                <Link
                                    to="/admin/products"
                                    className="btn btn-primary w-100"
                                >
                                    Manage Products →
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* ORDERS */}
                    {/* ================================= */}

                    <div className="col-12 col-md-6 col-lg-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="rounded-3 bg-success bg-opacity-10 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                    }}
                                >

                                    <span className="fs-2">
                                        🛒
                                    </span>

                                </div>


                                <h4 className="fw-bold mb-2">
                                    Orders
                                </h4>


                                <p className="text-muted flex-grow-1">

                                    View customer orders, check
                                    payment information and update
                                    order status.

                                </p>


                                <Link
                                    to="/admin/orders"
                                    className="btn btn-primary w-100"
                                >
                                    Manage Orders →
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* USERS */}
                    {/* ================================= */}

                    <div className="col-12 col-md-6 col-lg-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="rounded-3 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                    }}
                                >

                                    <span className="fs-2">
                                        👥
                                    </span>

                                </div>


                                <h4 className="fw-bold mb-2">
                                    Users
                                </h4>


                                <p className="text-muted flex-grow-1">

                                    View registered ShopSphere
                                    customers and their account
                                    information.

                                </p>


                                <Link
                                    to="/admin/users"
                                    className="btn btn-primary w-100"
                                >
                                    Manage Users →
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* QUICK ACTIONS */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Quick Actions
                                </h4>

                                <p className="text-muted mb-3 mb-md-0">
                                    Quickly access the most common
                                    admin tasks.
                                </p>

                            </div>


                            <div className="d-flex flex-wrap gap-2">

                                <Link
                                    to="/admin/products/add"
                                    className="btn btn-primary"
                                >
                                    + Add Product
                                </Link>


                                <Link
                                    to="/admin/orders"
                                    className="btn btn-outline-primary"
                                >
                                    View Orders
                                </Link>


                                <Link
                                    to="/"
                                    className="btn btn-outline-secondary"
                                >
                                    View Store
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* ADMIN INFO */}
                {/* ================================= */}

                <div className="text-center mt-4">

                    <small className="text-muted">

                        ShopSphere Admin Panel •
                        Logged in as{" "}
                        <strong>
                            {user?.name || "Admin"}
                        </strong>

                    </small>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;