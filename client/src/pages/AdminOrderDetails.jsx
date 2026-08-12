import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";


function AdminOrderDetails() {

    const { id } = useParams();


    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [updating, setUpdating] =
        useState(false);

    const [success, setSuccess] =
        useState("");


    // ==========================================
    // FETCH ORDER
    // ==========================================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get(
                        `/orders/${id}`
                    );

                const orderData =
                    response.data.data;

                setOrder(orderData);

                setStatus(
                    orderData.orderStatus
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load order"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchOrder();

    }, [id]);


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const handleStatusUpdate = async () => {

        setUpdating(true);

        setError("");

        setSuccess("");


        try {

            const response =
                await api.put(
                    `/orders/${id}/status`,
                    {
                        orderStatus: status,
                    }
                );


            setOrder(
                response.data.data
            );


            setSuccess(
                "Order status updated successfully."
            );


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdating(false);

        }

    };


    // ==========================================
    // STATUS BADGE
    // ==========================================

    const getStatusBadge = (orderStatus) => {

        switch (orderStatus) {

            case "Delivered":
                return "badge text-bg-success";

            case "Shipped":
                return "badge text-bg-info";

            case "Processing":
                return "badge text-bg-primary";

            case "Cancelled":
                return "badge text-bg-danger";

            case "Placed":
                return "badge text-bg-warning";

            default:
                return "badge text-bg-secondary";

        }

    };


    // ==========================================
    // PAYMENT BADGE
    // ==========================================

    const getPaymentBadge = (paymentStatus) => {

        switch (paymentStatus) {

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
                    Loading order...
                </p>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && !order) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

                <Link
                    to="/admin/orders"
                    className="btn btn-primary"
                >
                    ← Back to Orders
                </Link>

            </div>

        );

    }


    if (!order) {

        return (

            <div className="container py-5">

                <div className="text-center py-5">

                    <div className="display-4 mb-3">
                        📦
                    </div>

                    <h2 className="fw-bold">
                        Order not found
                    </h2>

                    <p className="text-muted">
                        The order you're looking for
                        doesn't exist.
                    </p>

                    <Link
                        to="/admin/orders"
                        className="btn btn-primary"
                    >
                        ← Back to Orders
                    </Link>

                </div>

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
                            Order Details
                        </h1>

                        <div className="d-flex flex-wrap align-items-center gap-2">

                            <span className="text-muted">
                                Order #
                                {order._id.slice(-8)}
                            </span>

                            <span
                                className={
                                    getStatusBadge(
                                        order.orderStatus
                                    )
                                }
                            >
                                {order.orderStatus}
                            </span>

                        </div>

                    </div>


                    <Link
                        to="/admin/orders"
                        className="btn btn-outline-secondary mt-3 mt-md-0"
                    >
                        ← Back to Orders
                    </Link>

                </div>


                {/* ================================= */}
                {/* ALERTS */}
                {/* ================================= */}

                {error && (

                    <div
                        className="alert alert-danger alert-dismissible"
                        role="alert"
                    >
                        {error}

                    </div>

                )}


                {success && (

                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        ✓ {success}
                    </div>

                )}


                <div className="row g-4">


                    {/* ================================= */}
                    {/* CUSTOMER */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-6">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            👤
                                        </span>

                                    </div>


                                    <div>

                                        <h5 className="fw-bold mb-0">
                                            Customer
                                        </h5>

                                        <small className="text-muted">
                                            Customer information
                                        </small>

                                    </div>

                                </div>


                                <div className="bg-light rounded-3 p-3">

                                    <p className="mb-2">

                                        <span className="text-muted">
                                            Name
                                        </span>

                                        <br />

                                        <strong>
                                            {order.user?.name ||
                                                "N/A"}
                                        </strong>

                                    </p>


                                    <p className="mb-0">

                                        <span className="text-muted">
                                            Email
                                        </span>

                                        <br />

                                        <strong>
                                            {order.user?.email ||
                                                "N/A"}
                                        </strong>

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* ORDER INFORMATION */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-6">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-3 bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            🧾
                                        </span>

                                    </div>


                                    <div>

                                        <h5 className="fw-bold mb-0">
                                            Order Information
                                        </h5>

                                        <small className="text-muted">
                                            Payment and order status
                                        </small>

                                    </div>

                                </div>


                                <div className="row g-3">

                                    <div className="col-12">

                                        <small className="text-muted">
                                            Order Date
                                        </small>

                                        <div className="fw-semibold">

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </div>

                                    </div>


                                    <div className="col-6">

                                        <small className="text-muted">
                                            Payment
                                        </small>

                                        <div className="mt-1">

                                            <span
                                                className={
                                                    getPaymentBadge(
                                                        order.paymentStatus
                                                    )
                                                }
                                            >
                                                {
                                                    order.paymentStatus
                                                }
                                            </span>

                                        </div>

                                    </div>


                                    <div className="col-6">

                                        <small className="text-muted">
                                            Status
                                        </small>

                                        <div className="mt-1">

                                            <span
                                                className={
                                                    getStatusBadge(
                                                        order.orderStatus
                                                    )
                                                }
                                            >
                                                {
                                                    order.orderStatus
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* SHIPPING ADDRESS */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-5">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-3 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            📍
                                        </span>

                                    </div>


                                    <div>

                                        <h5 className="fw-bold mb-0">
                                            Shipping Address
                                        </h5>

                                        <small className="text-muted">
                                            Delivery information
                                        </small>

                                    </div>

                                </div>


                                <div className="bg-light rounded-3 p-3">

                                    <p className="fw-bold mb-1">

                                        {
                                            order.shippingAddress
                                                ?.fullName
                                        }

                                    </p>


                                    <p className="mb-1 text-muted">

                                        {
                                            order.shippingAddress
                                                ?.mobile
                                        }

                                    </p>


                                    <p className="mb-1">

                                        {
                                            order.shippingAddress
                                                ?.address
                                        }

                                    </p>


                                    <p className="mb-1">

                                        {
                                            order.shippingAddress
                                                ?.city
                                        },{" "}

                                        {
                                            order.shippingAddress
                                                ?.state
                                        }

                                    </p>


                                    <p className="mb-1">

                                        {
                                            order.shippingAddress
                                                ?.pincode
                                        }

                                    </p>


                                    <p className="mb-0">

                                        {
                                            order.shippingAddress
                                                ?.country
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* UPDATE STATUS */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-7">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            🔄
                                        </span>

                                    </div>


                                    <div>

                                        <h5 className="fw-bold mb-0">
                                            Update Order Status
                                        </h5>

                                        <small className="text-muted">
                                            Change the current order status
                                        </small>

                                    </div>

                                </div>


                                <div className="row align-items-end">

                                    <div className="col-md-8 mb-3 mb-md-0">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="orderStatus"
                                        >
                                            Order Status
                                        </label>

                                        <select
                                            id="orderStatus"
                                            className="form-select"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Placed">
                                                Placed
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-md-4">

                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={
                                                handleStatusUpdate
                                            }
                                            disabled={updating}
                                        >

                                            {updating ? (

                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    />

                                                    Updating...

                                                </>

                                            ) : (

                                                "Update Status"

                                            )}

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* PRODUCTS */}
                    {/* ================================= */}

                    <div className="col-12">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <h5 className="fw-bold mb-1">
                                            Ordered Products
                                        </h5>

                                        <small className="text-muted">
                                            {order.orderItems?.length || 0}{" "}
                                            {order.orderItems?.length === 1
                                                ? "item"
                                                : "items"}{" "}
                                            in this order
                                        </small>

                                    </div>


                                    <span className="badge bg-primary rounded-pill px-3 py-2">

                                        {order.orderItems?.length || 0}

                                    </span>

                                </div>


                                <div>

                                    {order.orderItems.map(
                                        (item, index) => (

                                            <div
                                                key={item._id}
                                                className={
                                                    `d-flex flex-column flex-sm-row align-items-sm-center py-3 ${
                                                        index !==
                                                        order.orderItems.length - 1
                                                            ? "border-bottom"
                                                            : ""
                                                    }`
                                                }
                                            >

                                                {/* IMAGE */}

                                                <div
                                                    className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                                                    style={{
                                                        width: "90px",
                                                        height: "90px",
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
                                                                    ?.name
                                                            }
                                                            style={{
                                                                width:
                                                                    "100%",
                                                                height:
                                                                    "100%",
                                                                objectFit:
                                                                    "contain",
                                                                borderRadius:
                                                                    "10px",
                                                            }}
                                                        />

                                                    ) : (

                                                        <span className="fs-3">
                                                            📦
                                                        </span>

                                                    )}

                                                </div>


                                                {/* PRODUCT INFO */}

                                                <div className="flex-grow-1 ms-sm-4 mt-3 mt-sm-0">

                                                    <h6 className="fw-bold mb-1">

                                                        {
                                                            item
                                                                .product
                                                                ?.name ||
                                                            "Product unavailable"
                                                        }

                                                    </h6>


                                                    <p className="text-muted mb-1">

                                                        ₹
                                                        {
                                                            item.price
                                                        }

                                                        {" × "}

                                                        {
                                                            item.quantity
                                                        }

                                                    </p>


                                                    <small className="text-muted">

                                                        Unit price: ₹
                                                        {
                                                            item.price
                                                        }

                                                    </small>

                                                </div>


                                                {/* ITEM TOTAL */}

                                                <div className="text-sm-end mt-3 mt-sm-0">

                                                    <small className="text-muted d-block">
                                                        Item Total
                                                    </small>

                                                    <span className="fw-bold fs-5">

                                                        ₹
                                                        {
                                                            item.price *
                                                            item.quantity
                                                        }

                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* TOTAL */}

                                <div className="border-top mt-3 pt-4">

                                    <div className="row justify-content-end">

                                        <div className="col-12 col-sm-6 col-md-4">

                                            <div className="d-flex justify-content-between mb-2">

                                                <span className="text-muted">
                                                    Items
                                                </span>

                                                <span>
                                                    {order.orderItems.reduce(
                                                        (
                                                            total,
                                                            item
                                                        ) =>
                                                            total +
                                                            item.quantity,
                                                        0
                                                    )}
                                                </span>

                                            </div>


                                            <div className="d-flex justify-content-between align-items-center">

                                                <span className="fw-semibold">
                                                    Order Total
                                                </span>

                                                <span className="fs-4 fw-bold text-primary">

                                                    ₹
                                                    {
                                                        order.totalAmount
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AdminOrderDetails;