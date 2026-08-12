import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";


function AdminOrders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH ALL ORDERS
    // ==========================================

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get("/orders/admin/all");

                setOrders(
                    response.data.data || []
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load orders"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);


    // ==========================================
    // GET PAYMENT BADGE
    // ==========================================

    const getPaymentBadge = (status) => {

        switch (status) {

            case "Paid":
                return "badge text-bg-success";

            case "Failed":
                return "badge text-bg-danger";

            case "Pending":
                return "badge text-bg-warning";

            default:
                return "badge text-bg-secondary";

        }

    };


    // ==========================================
    // GET ORDER STATUS BADGE
    // ==========================================

    const getOrderStatusBadge = (status) => {

        switch (status) {

            case "Delivered":
                return "badge text-bg-success";

            case "Shipped":
                return "badge text-bg-info";

            case "Processing":
                return "badge text-bg-primary";

            case "Cancelled":
                return "badge text-bg-danger";

            case "Pending":
                return "badge text-bg-warning";

            default:
                return "badge text-bg-secondary";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3 text-muted">
                    Loading orders...
                </p>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

                <Link
                    to="/admin"
                    className="btn btn-outline-primary"
                >
                    ← Back to Dashboard
                </Link>

            </div>

        );

    }


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
                            Orders
                        </h1>

                        <p className="text-muted mb-0">

                            {orders.length}{" "}

                            {orders.length === 1
                                ? "order"
                                : "orders"}{" "}
                            placed on ShopSphere

                        </p>

                    </div>


                    <Link
                        to="/admin"
                        className="btn btn-outline-secondary mt-3 mt-md-0"
                    >
                        ← Dashboard
                    </Link>

                </div>


                {/* ================================= */}
                {/* SUMMARY CARD */}
                {/* ================================= */}

                <div className="row g-3 mb-4">


                    {/* TOTAL ORDERS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            🛒
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Total Orders
                                        </small>

                                        <h3 className="fw-bold mb-0">
                                            {orders.length}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PAID ORDERS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            ✓
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Paid Orders
                                        </small>

                                        <h3 className="fw-bold mb-0">

                                            {
                                                orders.filter(
                                                    (order) =>
                                                        order.paymentStatus ===
                                                        "Paid"
                                                ).length
                                            }

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PENDING ORDERS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            ⏳
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Pending Payments
                                        </small>

                                        <h3 className="fw-bold mb-0">

                                            {
                                                orders.filter(
                                                    (order) =>
                                                        order.paymentStatus ===
                                                        "Pending"
                                                ).length
                                            }

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* ORDERS TABLE */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm overflow-hidden">


                    {/* CARD HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Customer Orders
                                </h5>

                                <small className="text-muted">
                                    View and manage customer purchases
                                </small>

                            </div>


                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                {orders.length}

                            </span>

                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th className="px-4 py-3">
                                            Order
                                        </th>

                                        <th className="py-3">
                                            Customer
                                        </th>

                                        <th className="py-3">
                                            Date
                                        </th>

                                        <th className="py-3">
                                            Amount
                                        </th>

                                        <th className="py-3">
                                            Payment
                                        </th>

                                        <th className="py-3">
                                            Status
                                        </th>

                                        <th className="text-end px-4 py-3">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >

                                                <div className="d-flex flex-column align-items-center">

                                                    <div
                                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                        }}
                                                    >

                                                        <span className="fs-2">
                                                            🛒
                                                        </span>

                                                    </div>


                                                    <h5 className="fw-bold">
                                                        No orders yet
                                                    </h5>


                                                    <p className="text-muted mb-0">
                                                        Customer orders will
                                                        appear here.
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        orders.map(
                                            (order) => (

                                                <tr
                                                    key={
                                                        order._id
                                                    }
                                                >


                                                    {/* ORDER */}

                                                    <td className="px-4">

                                                        <div className="fw-bold">

                                                            #
                                                            {
                                                                order._id.slice(
                                                                    -8
                                                                )
                                                            }

                                                        </div>

                                                        <small className="text-muted">
                                                            Order ID
                                                        </small>

                                                    </td>


                                                    {/* CUSTOMER */}

                                                    <td>

                                                        <div className="fw-semibold">

                                                            {
                                                                order.user?.name ||
                                                                "Unknown"
                                                            }

                                                        </div>

                                                        <small className="text-muted">

                                                            {
                                                                order.user?.email ||
                                                                "No email"
                                                            }

                                                        </small>

                                                    </td>


                                                    {/* DATE */}

                                                    <td>

                                                        <div className="fw-semibold">

                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleDateString(
                                                                "en-IN"
                                                            )}

                                                        </div>

                                                        <small className="text-muted">

                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleTimeString(
                                                                "en-IN",
                                                                {
                                                                    hour:
                                                                        "2-digit",
                                                                    minute:
                                                                        "2-digit",
                                                                }
                                                            )}

                                                        </small>

                                                    </td>


                                                    {/* AMOUNT */}

                                                    <td>

                                                        <span className="fw-bold">

                                                            ₹
                                                            {
                                                                order.totalAmount
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* PAYMENT */}

                                                    <td>

                                                        <span
                                                            className={getPaymentBadge(
                                                                order.paymentStatus
                                                            )}
                                                        >

                                                            {
                                                                order.paymentStatus
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className={getOrderStatusBadge(
                                                                order.orderStatus
                                                            )}
                                                        >

                                                            {
                                                                order.orderStatus
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ACTION */}

                                                    <td className="text-end px-4">

                                                        <Link
                                                            to={`/admin/orders/${order._id}`}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            View →
                                                        </Link>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* FOOTER */}
                {/* ================================= */}

                {orders.length > 0 && (

                    <div className="d-flex justify-content-between align-items-center mt-3">

                        <small className="text-muted">
                            Showing {orders.length} orders
                        </small>


                        <Link
                            to="/admin"
                            className="btn btn-sm btn-outline-primary"
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                )}

            </div>

        </div>

    );

}


export default AdminOrders;