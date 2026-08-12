import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";

import {
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../services/paymentService";

import { loadRazorpay } from "../utils/razorpay";


function Checkout() {

    const navigate = useNavigate();


    // ==========================================
    // CART
    // ==========================================

    const [cart, setCart] = useState([]);

    const [total, setTotal] = useState(0);


    // ==========================================
    // FORM
    // ==========================================

    const [formData, setFormData] = useState({

        fullName: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",

    });


    // ==========================================
    // UI STATE
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // FETCH CART
    // ==========================================

    useEffect(() => {

        const fetchCart = async () => {

            try {

                setLoading(true);

                const response =
                    await getCart();


                if (
                    !response.data ||
                    response.data.length === 0
                ) {

                    navigate("/cart");

                    return;

                }


                setCart(response.data);

                setTotal(response.total);


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
                    "Failed to load cart"
                );


            } finally {

                setLoading(false);

            }

        };


        fetchCart();

    }, [navigate]);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    // ==========================================
    // LOAD RAZORPAY
    // ==========================================

    const openRazorpay = async (order) => {

        const isLoaded =
            await loadRazorpay();


        if (!isLoaded) {

            throw new Error(
                "Razorpay SDK failed to load"
            );

        }


        // ======================================
        // CREATE RAZORPAY ORDER
        // ======================================

        const response =
            await createRazorpayOrder(
                order._id
            );


        const razorpayData =
            response.data;


        // ======================================
        // RAZORPAY OPTIONS
        // ======================================

        const options = {

            key:
                razorpayData.key,

            amount:
                razorpayData.amount,

            currency:
                razorpayData.currency,

            name:
                "ShopSphere",

            description:
                "Payment for ShopSphere Order",

            order_id:
                razorpayData.razorpayOrderId,


            // ==================================
            // PAYMENT SUCCESS
            // ==================================

            handler: async (
                paymentResponse
            ) => {

                try {

                    const verification =
                        await verifyRazorpayPayment({

                            orderId:
                                razorpayData.orderId,

                            razorpay_payment_id:
                                paymentResponse
                                    .razorpay_payment_id,

                            razorpay_signature:
                                paymentResponse
                                    .razorpay_signature,

                        });


                    if (
                        verification.success
                    ) {

                        navigate(
                            `/order-success/${order._id}`
                        );

                    }

                } catch (error) {

                    console.error(
                        "Payment verification failed:",
                        error
                    );


                    setPlacingOrder(false);

                    setError(
                        error.response?.data?.message ||
                        "Payment verification failed"
                    );

                }

            },


            // ==================================
            // CUSTOMER INFORMATION
            // ==================================

            prefill: {

                name:
                    formData.fullName,

                contact:
                    formData.mobile,

            },


            theme: {

                color: "#2874f0",

            },


            // ==================================
            // PAYMENT CANCELLED
            // ==================================

            modal: {

                ondismiss: () => {

                    setPlacingOrder(false);

                    setError(
                        "Payment was cancelled"
                    );

                },

            },

        };


        const razorpay =
            new window.Razorpay(
                options
            );


        razorpay.open();

    };


    // ==========================================
    // PLACE ORDER
    // ==========================================

    const handlePlaceOrder = async (e) => {

        e.preventDefault();


        setError("");

        setPlacingOrder(true);


        try {

            // 1. Create ShopSphere order

            const response =
                await placeOrder(
                    formData
                );


            const order =
                response.data;


            // 2. Open Razorpay

            await openRazorpay(order);


        } catch (error) {

            console.error(error);


            setPlacingOrder(false);


            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to place order"
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

                        <p className="mt-3 text-muted">
                            Loading checkout...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (
        error &&
        cart.length === 0
    ) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <div className="display-4 mb-3">
                                ⚠️
                            </div>

                            <h3 className="fw-bold">
                                Checkout unavailable
                            </h3>

                            <p className="text-muted">
                                {error}
                            </p>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate("/cart")
                                }
                            >
                                ← Back to Cart
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="bg-white border-bottom">

                <div className="container py-4">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <p className="text-muted mb-1">
                                ShopSphere
                            </p>

                            <h1 className="fw-bold mb-1">
                                Checkout
                            </h1>

                            <p className="text-muted mb-0">
                                Complete your order securely
                            </p>

                        </div>


                        <Link
                            to="/cart"
                            className="btn btn-outline-primary d-none d-md-inline-block"
                        >
                            ← Back to Cart
                        </Link>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* CHECKOUT */}
            {/* ================================= */}

            <div className="container py-4 py-md-5">


                {/* ERROR */}

                {error && (

                    <div
                        className="alert alert-danger border-0 shadow-sm"
                        role="alert"
                    >
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handlePlaceOrder}
                >

                    <div className="row g-4">


                        {/* ================================= */}
                        {/* LEFT SIDE */}
                        {/* ================================= */}

                        <div className="col-12 col-lg-7">


                            {/* ================================= */}
                            {/* DELIVERY ADDRESS */}
                            {/* ================================= */}

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4 p-md-5">


                                    <div className="d-flex align-items-center mb-4">

                                        <div
                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold"
                                            style={{
                                                width: "44px",
                                                height: "44px",
                                            }}
                                        >
                                            1
                                        </div>

                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                Delivery Address
                                            </h4>

                                            <p className="text-muted small mb-0">
                                                Enter where you'd like
                                                your order delivered.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="row g-3">


                                        {/* FULL NAME */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="fullName"
                                                className="form-label fw-semibold"
                                            >
                                                Full Name
                                            </label>

                                            <input
                                                id="fullName"
                                                type="text"
                                                name="fullName"
                                                className="form-control form-control-lg"
                                                placeholder="Enter your full name"
                                                value={
                                                    formData.fullName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* MOBILE */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="mobile"
                                                className="form-label fw-semibold"
                                            >
                                                Mobile Number
                                            </label>

                                            <input
                                                id="mobile"
                                                type="tel"
                                                name="mobile"
                                                className="form-control form-control-lg"
                                                placeholder="Enter mobile number"
                                                value={
                                                    formData.mobile
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* ADDRESS */}

                                        <div className="col-12">

                                            <label
                                                htmlFor="address"
                                                className="form-label fw-semibold"
                                            >
                                                Address
                                            </label>

                                            <textarea
                                                id="address"
                                                name="address"
                                                rows="3"
                                                className="form-control"
                                                placeholder="House / Flat / Street / Area"
                                                value={
                                                    formData.address
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* CITY */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="city"
                                                className="form-label fw-semibold"
                                            >
                                                City
                                            </label>

                                            <input
                                                id="city"
                                                type="text"
                                                name="city"
                                                className="form-control form-control-lg"
                                                placeholder="Enter city"
                                                value={
                                                    formData.city
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* STATE */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="state"
                                                className="form-label fw-semibold"
                                            >
                                                State
                                            </label>

                                            <input
                                                id="state"
                                                type="text"
                                                name="state"
                                                className="form-control form-control-lg"
                                                placeholder="Enter state"
                                                value={
                                                    formData.state
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* PINCODE */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="pincode"
                                                className="form-label fw-semibold"
                                            >
                                                Pincode
                                            </label>

                                            <input
                                                id="pincode"
                                                type="text"
                                                name="pincode"
                                                className="form-control form-control-lg"
                                                placeholder="6-digit pincode"
                                                value={
                                                    formData.pincode
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>


                                        {/* COUNTRY */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="country"
                                                className="form-label fw-semibold"
                                            >
                                                Country
                                            </label>

                                            <input
                                                id="country"
                                                type="text"
                                                name="country"
                                                className="form-control form-control-lg"
                                                value={
                                                    formData.country
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* PAYMENT */}
                            {/* ================================= */}

                            <div className="card border-0 shadow-sm mt-4">

                                <div className="card-body p-4 p-md-5">


                                    <div className="d-flex align-items-center">

                                        <div
                                            className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold"
                                            style={{
                                                width: "44px",
                                                height: "44px",
                                            }}
                                        >
                                            2
                                        </div>


                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                Secure Payment
                                            </h4>

                                            <p className="text-muted small mb-0">
                                                Pay securely using
                                                Razorpay.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="row g-3 mt-3">


                                        <div className="col-md-6">

                                            <div className="border rounded p-3 h-100">

                                                <div className="fs-3 mb-2">
                                                    🔒
                                                </div>

                                                <h6 className="fw-bold">
                                                    Secure Payment
                                                </h6>

                                                <p className="text-muted small mb-0">
                                                    Your payment is
                                                    securely processed
                                                    by Razorpay.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="col-md-6">

                                            <div className="border rounded p-3 h-100">

                                                <div className="fs-3 mb-2">
                                                    💳
                                                </div>

                                                <h6 className="fw-bold">
                                                    Multiple Options
                                                </h6>

                                                <p className="text-muted small mb-0">
                                                    Use cards, UPI,
                                                    net banking and
                                                    supported methods.
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* RIGHT SIDE */}
                        {/* ================================= */}

                        <div className="col-12 col-lg-5">

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


                                    {/* ================================= */}
                                    {/* PRODUCTS */}
                                    {/* ================================= */}

                                    <div>

                                        {cart.map(
                                            (item) => {

                                                const product =
                                                    item.product;

                                                if (!product) {
                                                    return null;
                                                }


                                                const itemTotal =
                                                    product.price *
                                                    item.quantity;


                                                return (

                                                    <div
                                                        key={
                                                            item._id
                                                        }
                                                        className="d-flex align-items-center border-bottom pb-3 mb-3"
                                                    >


                                                        {/* IMAGE */}

                                                        <div
                                                            className="bg-light rounded p-2 me-3 flex-shrink-0"
                                                            style={{
                                                                width:
                                                                    "68px",
                                                                height:
                                                                    "68px",
                                                            }}
                                                        >

                                                            {product.images?.length >
                                                            0 ? (

                                                                <img
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .url
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="w-100 h-100"
                                                                    style={{
                                                                        objectFit:
                                                                            "contain",
                                                                    }}
                                                                />

                                                            ) : (

                                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                                                    📦
                                                                </div>

                                                            )}

                                                        </div>


                                                        {/* NAME */}

                                                        <div className="flex-grow-1 me-2">

                                                            <h6
                                                                className="fw-semibold mb-1"
                                                            >

                                                                {
                                                                    product.name
                                                                }

                                                            </h6>

                                                            <small className="text-muted">

                                                                Qty:{" "}
                                                                {
                                                                    item.quantity
                                                                }

                                                            </small>

                                                        </div>


                                                        {/* PRICE */}

                                                        <span className="fw-semibold text-nowrap">

                                                            ₹
                                                            {itemTotal.toLocaleString(
                                                                "en-IN"
                                                            )}

                                                        </span>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>


                                    {/* ================================= */}
                                    {/* PRICE BREAKDOWN */}
                                    {/* ================================= */}

                                    <div className="pt-2">


                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-muted">
                                                Subtotal
                                            </span>

                                            <span>
                                                ₹
                                                {total.toLocaleString(
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

                                            <span className="fw-bold fs-5">
                                                Total
                                            </span>

                                            <span className="fw-bold fs-4 text-primary">

                                                ₹
                                                {total.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>

                                        </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* PLACE ORDER */}
                                    {/* ================================= */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 mt-4"
                                        disabled={
                                            placingOrder
                                        }
                                    >

                                        {placingOrder ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                />

                                                Processing Payment...
                                            </>

                                        ) : (

                                            <>
                                                🔒 Place Order & Pay
                                            </>

                                        )}

                                    </button>


                                    <p className="text-center text-muted small mt-3 mb-0">

                                        Secure checkout powered by
                                        Razorpay.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </form>


                {/* MOBILE BACK */}

                <div className="d-md-none mt-3">

                    <Link
                        to="/cart"
                        className="btn btn-outline-primary w-100"
                    >
                        ← Back to Cart
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default Checkout;