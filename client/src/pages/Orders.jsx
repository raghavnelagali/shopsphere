import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getMyOrders } from "../services/orderService";


function Orders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const navigate = useNavigate();


    // ==========================================
    // FETCH ORDERS
    // ==========================================

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response =
                    await getMyOrders();

                setOrders(
                    response.data || []
                );

            } catch (error) {

                console.error(error);


                if (
                    error.response?.status === 401
                ) {

                    navigate("/login");

                    return;

                }


                setError(
                    error.response?.data?.message ||
                    "Failed to load orders"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchOrders();

    }, [navigate]);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ==========================================
    // FORMAT ORDER ID
    // ==========================================

    const formatOrderId = (id) => {

        return id
            ? id.slice(-8).toUpperCase()
            : "";

    };


    // ==========================================
    // PAYMENT BADGE
    // ==========================================

    const getPaymentBadge = (
        paymentStatus
    ) => {

        if (
            paymentStatus === "Paid"
        ) {

            return (
                <span className="badge bg-success">
                    ✓ Paid
                </span>
            );

        }


        if (
            paymentStatus === "Failed"
        ) {

            return (
                <span className="badge bg-danger">
                    ✕ Failed
                </span>
            );

        }


        return (
            <span className="badge bg-warning text-dark">
                Pending
            </span>
        );

    };


    // ==========================================
    // ORDER STATUS BADGE
    // ==========================================

    const getOrderStatusBadge = (
        orderStatus
    ) => {

        switch (orderStatus) {

            case "Placed":

                return (
                    <span className="badge bg-primary">
                        Order Placed
                    </span>
                );


            case "Processing":

                return (
                    <span className="badge bg-info text-dark">
                        Processing
                    </span>
                );


            case "Shipped":

                return (
                    <span className="badge bg-warning text-dark">
                        Shipped
                    </span>
                );


            case "Delivered":

                return (
                    <span className="badge bg-success">
                        Delivered
                    </span>
                );


            case "Cancelled":

                return (
                    <span className="badge bg-danger">
                        Cancelled
                    </span>
                );


            default:

                return (
                    <span className="badge bg-secondary">
                        {orderStatus}
                    </span>
                );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading your orders...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div
                        className="card border-0 shadow-sm"
                    >

                        <div className="card-body text-center py-5">

                            <div className="display-4">
                                ⚠️
                            </div>

                            <h3 className="fw-bold mt-3">
                                Unable to load orders
                            </h3>

                            <p className="text-muted">
                                {error}
                            </p>

                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    window.location.reload()
                                }
                            >
                                Try Again
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // NO ORDERS
    // ==========================================

    if (orders.length === 0) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div className="text-center py-5">

                        <div
                            className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto"
                            style={{
                                width: "120px",
                                height: "120px",
                            }}
                        >

                            <span className="display-4">
                                📦
                            </span>

                        </div>


                        <h2 className="fw-bold mt-4">
                            No orders yet
                        </h2>


                        <p className="text-muted mb-4">

                            You haven't placed any
                            orders yet. Start shopping
                            and your orders will appear
                            here.

                        </p>


                        <Link
                            to="/products"
                            className="btn btn-primary btn-lg"
                        >
                            Start Shopping
                        </Link>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ORDERS
    // ==========================================

    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h1 className="fw-bold mb-1">
                            My Orders
                        </h1>

                        <p className="text-muted mb-0">

                            Track and manage your
                            ShopSphere orders.

                        </p>

                    </div>


                    <Link
                        to="/products"
                        className="btn btn-outline-primary"
                    >
                        Continue Shopping
                    </Link>

                </div>


                {/* ================================= */}
                {/* ORDER COUNT */}
                {/* ================================= */}

                <div className="mb-4">

                    <span className="text-muted">

                        {orders.length}{" "}

                        {orders.length === 1
                            ? "Order"
                            : "Orders"}

                    </span>

                </div>


                {/* ================================= */}
                {/* ORDER CARDS */}
                {/* ================================= */}

                <div>

                    {orders.map(
                        (order) => (

                            <div
                                key={order._id}
                                className="card border-0 shadow-sm mb-4"
                            >

                                <div className="card-body p-4">


                                    {/* ================================= */}
                                    {/* ORDER HEADER */}
                                    {/* ================================= */}

                                    <div className="row align-items-center g-3">


                                        <div className="col-md-5">

                                            <p className="text-muted small mb-1">
                                                Order ID
                                            </p>

                                            <h5 className="fw-bold mb-1">

                                                #
                                                {
                                                    formatOrderId(
                                                        order._id
                                                    )
                                                }

                                            </h5>

                                            <p className="text-muted small mb-0">

                                                Placed on{" "}

                                                {
                                                    formatDate(
                                                        order.createdAt
                                                    )
                                                }

                                            </p>

                                        </div>


                                        <div className="col-md-3">

                                            <p className="text-muted small mb-1">
                                                Payment
                                            </p>

                                            {getPaymentBadge(
                                                order.paymentStatus
                                            )}

                                        </div>


                                        <div className="col-md-2">

                                            <p className="text-muted small mb-1">
                                                Status
                                            </p>

                                            {getOrderStatusBadge(
                                                order.orderStatus
                                            )}

                                        </div>


                                        <div className="col-md-2 text-md-end">

                                            <Link
                                                to={`/orders/${order._id}`}
                                                className="btn btn-primary"
                                            >
                                                View Order
                                            </Link>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* ================================= */}
                                    {/* ORDER ITEMS */}
                                    {/* ================================= */}

                                    <div className="row g-3 align-items-center">


                                        <div className="col-md-8">

                                            {order.orderItems
                                                ?.slice(0, 3)
                                                .map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={
                                                                item._id ||
                                                                index
                                                            }
                                                            className="d-flex align-items-center mb-3"
                                                        >


                                                            {/* IMAGE */}

                                                            <div
                                                                className="bg-light rounded p-2 me-3"
                                                                style={{
                                                                    width: "70px",
                                                                    height: "70px",
                                                                    flexShrink: 0,
                                                                }}
                                                            >

                                                                {item.product
                                                                    ?.images
                                                                    ?.length >
                                                                0 ? (

                                                                    <img
                                                                        src={
                                                                            item
                                                                                .product
                                                                                .images[0]
                                                                                .url
                                                                        }
                                                                        alt={
                                                                            item
                                                                                .product
                                                                                .name
                                                                        }
                                                                        className="w-100 h-100"
                                                                        style={{
                                                                            objectFit:
                                                                                "contain",
                                                                        }}
                                                                    />

                                                                ) : (

                                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted small">
                                                                        N/A
                                                                    </div>

                                                                )}

                                                            </div>


                                                            {/* PRODUCT INFO */}

                                                            <div>

                                                                <h6 className="fw-semibold mb-1">

                                                                    {
                                                                        item
                                                                            .product
                                                                            ?.name ||
                                                                        "Product"
                                                                    }

                                                                </h6>

                                                                <p className="text-muted small mb-0">

                                                                    Quantity:{" "}

                                                                    {
                                                                        item.quantity
                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>

                                                    )
                                                )}


                                            {/* MORE ITEMS */}

                                            {order.orderItems?.length >
                                                3 && (

                                                <p className="text-muted small mb-0">

                                                    +{" "}

                                                    {
                                                        order
                                                            .orderItems
                                                            .length - 3
                                                    }

                                                    {" "}more item(s)

                                                </p>

                                            )}

                                        </div>


                                        {/* TOTAL */}

                                        <div className="col-md-4 text-md-end">

                                            <p className="text-muted mb-1">
                                                Order Total
                                            </p>

                                            <h4 className="fw-bold text-primary mb-0">

                                                ₹
                                                {order.totalAmount.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </h4>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>

    );

}


export default Orders;