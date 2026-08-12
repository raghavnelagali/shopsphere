import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    getCart,
    updateCart,
    removeFromCart,
} from "../services/cartService";


function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingId, setUpdatingId] =
        useState(null);


    // ==========================================
    // FETCH CART
    // ==========================================

    const fetchCart = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getCart();

            setCart(
                response.data || []
            );

            setTotal(
                response.total || 0
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
                "Failed to load cart"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // INITIAL FETCH
    // ==========================================

    useEffect(() => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        if (!token) {

            navigate("/login");

            return;

        }

        fetchCart();

    }, []);


    // ==========================================
    // UPDATE QUANTITY
    // ==========================================

    const handleQuantityChange = async (
        productId,
        newQuantity
    ) => {

        if (newQuantity < 1) {
            return;
        }

        try {

            setUpdatingId(productId);

            await updateCart(
                productId,
                newQuantity
            );

            await fetchCart();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update quantity"
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // ==========================================
    // REMOVE PRODUCT
    // ==========================================

    const handleRemove = async (
        productId
    ) => {

        try {

            setUpdatingId(productId);

            await removeFromCart(
                productId
            );

            await fetchCart();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to remove product"
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="text-muted mt-3">
                        Loading your cart...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && cart.length === 0) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <div className="display-4 mb-3">
                                ⚠️
                            </div>

                            <h3 className="fw-bold">
                                Unable to load cart
                            </h3>

                            <p className="text-muted">
                                {error}
                            </p>

                            <Link
                                to="/"
                                className="btn btn-primary"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                }}
                            >

                                <span className="display-5">
                                    🛒
                                </span>

                            </div>


                            <h2 className="fw-bold">
                                Your cart is empty
                            </h2>


                            <p
                                className="text-muted mx-auto"
                                style={{
                                    maxWidth: "500px",
                                }}
                            >
                                Looks like you haven't added
                                anything to your cart yet.
                                Start shopping and find
                                something you love.
                            </p>


                            <Link
                                to="/products"
                                className="btn btn-primary btn-lg mt-3"
                            >
                                Start Shopping
                            </Link>

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
                                Shopping Cart
                            </h1>

                            <p className="text-muted mb-0">
                                Review your items before checkout
                            </p>

                        </div>


                        <Link
                            to="/products"
                            className="btn btn-outline-primary d-none d-md-inline-block"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* CART CONTENT */}
            {/* ================================= */}

            <div className="container py-4 py-md-5">


                {error && (

                    <div className="alert alert-danger border-0 shadow-sm">

                        {error}

                    </div>

                )}


                <div className="row g-4">


                    {/* ================================= */}
                    {/* CART ITEMS */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-8">

                        <div className="card border-0 shadow-sm overflow-hidden">


                            <div className="card-header bg-white border-0 p-4">

                                <h5 className="fw-bold mb-0">
                                    Cart Items
                                </h5>

                            </div>


                            <div className="card-body p-0">

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


                                        const isUpdating =
                                            updatingId ===
                                            product._id;


                                        return (

                                            <div
                                                key={
                                                    item._id
                                                }
                                                className="border-top p-3 p-md-4"
                                            >

                                                <div className="row align-items-center g-3">


                                                    {/* IMAGE */}

                                                    <div className="col-4 col-sm-3 col-md-2">

                                                        <Link
                                                            to={`/products/${product._id}`}
                                                            className="d-block bg-light rounded"
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
                                                                    className="img-fluid w-100"
                                                                    style={{
                                                                        height:
                                                                            "120px",
                                                                        objectFit:
                                                                            "contain",
                                                                    }}
                                                                />

                                                            ) : (

                                                                <div
                                                                    className="d-flex align-items-center justify-content-center text-muted"
                                                                    style={{
                                                                        height:
                                                                            "120px",
                                                                    }}
                                                                >
                                                                    📦
                                                                </div>

                                                            )}

                                                        </Link>

                                                    </div>


                                                    {/* PRODUCT */}

                                                    <div className="col-8 col-sm-9 col-md-4">

                                                        <Link
                                                            to={`/products/${product._id}`}
                                                            className="text-decoration-none"
                                                        >

                                                            <h5 className="fw-bold text-dark mb-1">

                                                                {
                                                                    product.name
                                                                }

                                                            </h5>

                                                        </Link>


                                                        <p className="text-muted small mb-1">

                                                            {
                                                                product.brand
                                                            }

                                                        </p>


                                                        <p className="text-primary fw-bold mb-0">

                                                            ₹
                                                            {product.price.toLocaleString(
                                                                "en-IN"
                                                            )}

                                                        </p>

                                                    </div>


                                                    {/* QUANTITY */}

                                                    <div className="col-6 col-md-3">

                                                        <small className="text-muted d-block mb-2">
                                                            Quantity
                                                        </small>


                                                        <div
                                                            className="input-group"
                                                            style={{
                                                                maxWidth:
                                                                    "140px",
                                                            }}
                                                        >

                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                disabled={
                                                                    item.quantity <=
                                                                        1 ||
                                                                    isUpdating
                                                                }
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        product._id,
                                                                        item.quantity -
                                                                            1
                                                                    )
                                                                }
                                                            >
                                                                −
                                                            </button>


                                                            <span className="input-group-text justify-content-center fw-semibold flex-grow-1">

                                                                {
                                                                    item.quantity
                                                                }

                                                            </span>


                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                disabled={
                                                                    item.quantity >=
                                                                        product.stock ||
                                                                    isUpdating
                                                                }
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        product._id,
                                                                        item.quantity +
                                                                            1
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>

                                                        </div>


                                                        {isUpdating && (

                                                            <small className="text-muted d-block mt-2">
                                                                Updating...
                                                            </small>

                                                        )}


                                                        <button
                                                            type="button"
                                                            className="btn btn-link text-danger p-0 mt-2"
                                                            disabled={
                                                                isUpdating
                                                            }
                                                            onClick={() =>
                                                                handleRemove(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>

                                                    </div>


                                                    {/* ITEM TOTAL */}

                                                    <div className="col-6 col-md-3 text-md-end">

                                                        <small className="text-muted d-block mb-1">
                                                            Item Total
                                                        </small>

                                                        <h5 className="fw-bold mb-0">

                                                            ₹
                                                            {itemTotal.toLocaleString(
                                                                "en-IN"
                                                            )}

                                                        </h5>

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* ORDER SUMMARY */}
                    {/* ================================= */}

                    <div className="col-12 col-lg-4">

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
                                        Subtotal
                                    </span>

                                    <span className="fw-semibold">
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


                                <div className="d-flex justify-content-between align-items-center mb-4">

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


                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={() =>
                                        navigate(
                                            "/checkout"
                                        )
                                    }
                                >
                                    Proceed to Checkout
                                </button>


                                <Link
                                    to="/products"
                                    className="btn btn-outline-primary w-100 mt-2"
                                >
                                    Continue Shopping
                                </Link>


                                <div className="border-top mt-4 pt-3">

                                    <div className="d-flex gap-2 mb-2">

                                        <span>
                                            🔒
                                        </span>

                                        <small className="text-muted">
                                            Secure checkout
                                        </small>

                                    </div>


                                    <div className="d-flex gap-2">

                                        <span>
                                            🚚
                                        </span>

                                        <small className="text-muted">
                                            Free delivery
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* MOBILE CONTINUE SHOPPING */}

                <div className="d-md-none mt-3">

                    <Link
                        to="/products"
                        className="btn btn-outline-primary w-100"
                    >
                        ← Continue Shopping
                    </Link>

                </div>

            </div>

        </div>

    );

}


export default Cart;