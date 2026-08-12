import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";


function OrderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH ORDER
    // ==========================================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                setLoading(true);

                const response =
                    await getOrderById(id);

                setOrder(response.data);

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
                    "Failed to load order"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOrder();

    }, [id, navigate]);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }
        );

    };


    // ==========================================
    // SHORT ORDER ID
    // ==========================================

    const shortOrderId = order?._id
        ? order._id.slice(-8).toUpperCase()
        : "";


    // ==========================================
    // PAYMENT BADGE
    // ==========================================

    const getPaymentBadge = (paymentStatus) => {

        if (paymentStatus === "Paid") {

            return (
                <span className="badge bg-success">
                    ✓ Paid
                </span>
            );

        }

        if (paymentStatus === "Failed") {

            return (
                <span className="badge bg-danger">
                    ✕ Failed
                </span>
            );

        }

        return (
            <span className="badge bg-warning text-dark">
                Payment Pending
            </span>
        );

    };


    // ==========================================
    // ORDER STATUS BADGE
    // ==========================================

    const getOrderStatusBadge = (orderStatus) => {

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
    // STATUS PROGRESS
    // ==========================================

    const statusSteps = [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
    ];


    const currentStatusIndex =
        statusSteps.indexOf(
            order?.orderStatus
        );


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
                            Loading order details...
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

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <div className="display-4">
                                ⚠️
                            </div>

                            <h3 className="fw-bold mt-3">
                                Unable to load order
                            </h3>

                            <p className="text-muted">
                                {error}
                            </p>

                            <Link
                                to="/orders"
                                className="btn btn-primary"
                            >
                                Back to My Orders
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    if (!order) {

        return (

            <div className="container py-5 text-center">

                <h2>
                    Order not found
                </h2>

                <Link
                    to="/orders"
                    className="btn btn-primary mt-3"
                >
                    Back to My Orders
                </Link>

            </div>

        );

    }


    // ==========================================
    // TOTAL ITEMS
    // ==========================================

    const totalItems =
        order.orderItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <p className="text-muted mb-1">
                            My Orders / Order Details
                        </p>

                        <h1 className="fw-bold mb-1">
                            Order #{shortOrderId}
                        </h1>

                        <p className="text-muted mb-0">
                            Placed on{" "}
                            {formatDate(order.createdAt)}
                        </p>

                    </div>


                    <Link
                        to="/orders"
                        className="btn btn-outline-primary"
                    >
                        ← Back to Orders
                    </Link>

                </div>


                {/* ================================= */}
                {/* ORDER STATUS TIMELINE */}
                {/* ================================= */}

                {order.orderStatus !== "Cancelled" && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-body p-4">

                            <h4 className="fw-bold mb-4">
                                Order Status
                            </h4>


                            <div className="row text-center">

                                {statusSteps.map(
                                    (step, index) => {

                                        const completed =
                                            currentStatusIndex >=
                                            index;

                                        const active =
                                            order.orderStatus ===
                                            step;


                                        return (

                                            <div
                                                key={step}
                                                className="col-3"
                                            >

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className={
                                                            completed
                                                                ? "bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                                                : "bg-light text-muted border rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                                        }
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                        }}
                                                    >

                                                        {completed
                                                            ? "✓"
                                                            : index + 1}

                                                    </div>

                                                </div>


                                                <small
                                                    className={
                                                        active
                                                            ? "fw-bold text-primary d-block mt-2"
                                                            : "text-muted d-block mt-2"
                                                    }
                                                >
                                                    {step}
                                                </small>


                                                {index <
                                                    statusSteps.length -
                                                        1 && (

                                                    <div
                                                        className="d-none d-md-block"
                                                    />

                                                )}

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================================= */}
                {/* STATUS SUMMARY */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="row g-4 align-items-center">


                            <div className="col-md-4">

                                <p className="text-muted small mb-2">
                                    Order Status
                                </p>

                                {getOrderStatusBadge(
                                    order.orderStatus
                                )}

                            </div>


                            <div className="col-md-4">

                                <p className="text-muted small mb-2">
                                    Payment Status
                                </p>

                                {getPaymentBadge(
                                    order.paymentStatus
                                )}

                            </div>


                            <div className="col-md-4">

                                <p className="text-muted small mb-2">
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


                {/* ================================= */}
                {/* MAIN CONTENT */}
                {/* ================================= */}

                <div className="row g-4">


                    {/* ================================= */}
                    {/* LEFT */}
                    {/* ================================= */}

                    <div className="col-lg-8">


                        {/* ================================= */}
                        {/* PRODUCTS */}
                        {/* ================================= */}

                        <div className="card border-0 shadow-sm mb-4">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <h4 className="fw-bold mb-0">
                                        Ordered Items
                                    </h4>

                                    <span className="badge bg-light text-dark">
                                        {totalItems}{" "}
                                        {totalItems === 1
                                            ? "item"
                                            : "items"}
                                    </span>

                                </div>


                                {order.orderItems.map(
                                    (item) => {

                                        const itemTotal =
                                            item.price *
                                            item.quantity;


                                        return (

                                            <div
                                                key={item._id}
                                                className="border-bottom py-3"
                                            >

                                                <div className="row align-items-center g-3">


                                                    {/* IMAGE */}

                                                    <div className="col-4 col-md-2">

                                                        <div
                                                            className="bg-light rounded p-2"
                                                            style={{
                                                                height: "100px",
                                                            }}
                                                        >

                                                            {item.product?.images?.length >
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
                                                                    No Image
                                                                </div>

                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* PRODUCT */}

                                                    <div className="col-8 col-md-4">

                                                        <h6 className="fw-bold mb-1">
                                                            {
                                                                item.product?.name ||
                                                                "Product"
                                                            }
                                                        </h6>

                                                        <p className="text-muted small mb-1">
                                                            {
                                                                item.product?.brand ||
                                                                ""
                                                            }
                                                        </p>

                                                        <p className="text-muted small mb-0">
                                                            Unit Price: ₹
                                                            {item.price.toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </p>

                                                    </div>


                                                    {/* QUANTITY */}

                                                    <div className="col-4 col-md-2">

                                                        <p className="text-muted small mb-1">
                                                            Quantity
                                                        </p>

                                                        <strong>
                                                            {item.quantity}
                                                        </strong>

                                                    </div>


                                                    {/* TOTAL */}

                                                    <div className="col-8 col-md-4 text-md-end">

                                                        <p className="text-muted small mb-1">
                                                            Item Total
                                                        </p>

                                                        <h6 className="fw-bold mb-0">
                                                            ₹
                                                            {itemTotal.toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </h6>

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* SHIPPING ADDRESS */}
                        {/* ================================= */}

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Delivery Address
                                </h4>


                                <div className="d-flex">

                                    <div
                                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            flexShrink: 0,
                                        }}
                                    >
                                        📍
                                    </div>


                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            {
                                                order.shippingAddress
                                                    .fullName
                                            }
                                        </h6>

                                        <p className="text-muted mb-1">
                                            {
                                                order.shippingAddress
                                                    .mobile
                                            }
                                        </p>

                                        <p className="text-muted mb-1">
                                            {
                                                order.shippingAddress
                                                    .address
                                            }
                                        </p>

                                        <p className="text-muted mb-1">

                                            {
                                                order.shippingAddress
                                                    .city
                                            }
                                            ,{" "}
                                            {
                                                order.shippingAddress
                                                    .state
                                            }
                                            {" - "}
                                            {
                                                order.shippingAddress
                                                    .pincode
                                            }

                                        </p>

                                        <p className="text-muted mb-0">
                                            {
                                                order.shippingAddress
                                                    .country
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* RIGHT */}
                    {/* ================================= */}

                    <div className="col-lg-4">

                        <div
                            className="card border-0 shadow-sm sticky-top"
                            style={{
                                top: "20px",
                            }}
                        >

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Order Summary
                                </h4>


                                <div className="d-flex justify-content-between mb-3">

                                    <span className="text-muted">
                                        Items
                                    </span>

                                    <span>
                                        {totalItems}
                                    </span>

                                </div>


                                <div className="d-flex justify-content-between mb-3">

                                    <span className="text-muted">
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹
                                        {order.totalAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>


                                <div className="d-flex justify-content-between mb-3">

                                    <span className="text-muted">
                                        Delivery
                                    </span>

                                    <span className="text-success fw-semibold">
                                        FREE
                                    </span>

                                </div>


                                <hr />


                                <div className="d-flex justify-content-between align-items-center">

                                    <h5 className="fw-bold mb-0">
                                        Total
                                    </h5>

                                    <h4 className="fw-bold text-primary mb-0">
                                        ₹
                                        {order.totalAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </h4>

                                </div>


                                {/* PAYMENT ID */}

                                {order.razorpayPaymentId && (

                                    <div className="bg-light rounded p-3 mt-4">

                                        <p className="text-muted small mb-1">
                                            Payment ID
                                        </p>

                                        <p className="small mb-0 text-break">
                                            {
                                                order.razorpayPaymentId
                                            }
                                        </p>

                                    </div>

                                )}


                                <Link
                                    to="/orders"
                                    className="btn btn-outline-primary w-100 mt-4"
                                >
                                    ← Back to My Orders
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default OrderDetails;