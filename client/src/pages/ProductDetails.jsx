import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getProductById } from "../services/productService";
import api from "../services/api";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [cartMessage, setCartMessage] =
        useState("");

    const [addingToCart, setAddingToCart] =
        useState(false);


    // ==========================================
    // FETCH PRODUCT
    // ==========================================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);

                const response =
                    await getProductById(id);

                setProduct(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [id]);


    // ==========================================
    // QUANTITY
    // ==========================================

    const increaseQuantity = () => {

        if (
            product &&
            quantity < product.stock
        ) {

            setQuantity(
                quantity + 1
            );

        }

    };


    const decreaseQuantity = () => {

        if (quantity > 1) {

            setQuantity(
                quantity - 1
            );

        }

    };


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = async () => {

        const token =
            localStorage.getItem(
                "accessToken"
            );


        if (!token) {

            navigate("/login");

            return;

        }


        try {

            setAddingToCart(true);

            setCartMessage("");


            await api.post(
                "/cart",
                {
                    productId:
                        product._id,

                    quantity,
                }
            );


            setCartMessage(
                "Product added to cart successfully!"
            );


        } catch (error) {

            console.error(error);

            setCartMessage(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        } finally {

            setAddingToCart(false);

        }

    };


    // ==========================================
    // BUY NOW
    // ==========================================

    const handleBuyNow = async () => {

        const token =
            localStorage.getItem(
                "accessToken"
            );


        if (!token) {

            navigate("/login");

            return;

        }


        try {

            await api.post(
                "/cart",
                {
                    productId:
                        product._id,

                    quantity,
                }
            );


            navigate("/cart");

        } catch (error) {

            console.error(error);

            setCartMessage(
                error.response?.data?.message ||
                "Unable to proceed"
            );

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

                    <p className="mt-3 text-muted">
                        Loading product...
                    </p>

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

                            <div className="display-4 mb-3">
                                ⚠️
                            </div>

                            <h3 className="fw-bold">
                                Unable to load product
                            </h3>

                            <p className="text-muted">
                                {error}
                            </p>

                            <Link
                                to="/products"
                                className="btn btn-primary"
                            >
                                ← Back to Products
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    if (!product) {

        return (

            <div className="bg-light min-vh-100">

                <div className="container py-5 text-center">

                    <div className="display-4 mb-3">
                        📦
                    </div>

                    <h2 className="fw-bold">
                        Product not found
                    </h2>

                    <p className="text-muted">
                        The product you're looking for
                        doesn't exist.
                    </p>

                    <Link
                        to="/products"
                        className="btn btn-primary mt-2"
                    >
                        ← Back to Products
                    </Link>

                </div>

            </div>

        );

    }


    // ==========================================
    // CALCULATIONS
    // ==========================================

    const totalPrice =
        product.price * quantity;

    const isInStock =
        product.stock > 0;


    return (

        <div className="bg-light min-vh-100">


            {/* ================================= */}
            {/* BREADCRUMB */}
            {/* ================================= */}

            <div className="container pt-4">

                <nav aria-label="breadcrumb">

                    <ol className="breadcrumb mb-0">

                        <li className="breadcrumb-item">

                            <Link
                                to="/"
                                className="text-decoration-none"
                            >
                                Home
                            </Link>

                        </li>


                        <li className="breadcrumb-item">

                            <Link
                                to={`/category/${product.category}`}
                                className="text-decoration-none"
                            >
                                {product.category}
                            </Link>

                        </li>


                        <li className="breadcrumb-item active text-truncate"
                            style={{
                                maxWidth: "250px",
                            }}
                        >

                            {product.name}

                        </li>

                    </ol>

                </nav>

            </div>


            {/* ================================= */}
            {/* PRODUCT */}
            {/* ================================= */}

            <main className="container py-4 py-md-5">

                <div className="card border-0 shadow-sm overflow-hidden">

                    <div className="card-body p-3 p-md-5">

                        <div className="row g-4 g-lg-5">


                            {/* ================================= */}
                            {/* IMAGE */}
                            {/* ================================= */}

                            <div className="col-12 col-lg-6">

                                <div
                                    className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        minHeight:
                                            "400px",
                                        height:
                                            "100%",
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
                                            className="img-fluid"
                                            style={{
                                                maxHeight:
                                                    "500px",
                                                maxWidth:
                                                    "100%",
                                                objectFit:
                                                    "contain",
                                                padding:
                                                    "25px",
                                            }}
                                        />

                                    ) : (

                                        <div className="text-center text-muted">

                                            <div className="display-3">
                                                📦
                                            </div>

                                            <p className="mb-0">
                                                No Image Available
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* INFORMATION */}
                            {/* ================================= */}

                            <div className="col-12 col-lg-6">

                                <div className="h-100 d-flex flex-column">


                                    {/* BRAND */}

                                    <p className="text-primary text-uppercase fw-semibold small mb-2">

                                        {product.brand}

                                    </p>


                                    {/* NAME */}

                                    <h1 className="fw-bold display-6 mb-3">

                                        {product.name}

                                    </h1>


                                    {/* RATING */}

                                    <div className="d-flex align-items-center mb-3">

                                        <span className="badge bg-success px-2 py-1">

                                            ⭐{" "}
                                            {
                                                product.rating ||
                                                0
                                            }

                                        </span>


                                        <span className="text-muted small ms-2">

                                            {
                                                product.numReviews ||
                                                0
                                            }{" "}
                                            reviews

                                        </span>

                                    </div>


                                    <hr />


                                    {/* PRICE */}

                                    <div className="my-3">

                                        <span className="text-muted small d-block">
                                            Price
                                        </span>

                                        <span className="display-6 fw-bold text-primary">

                                            ₹
                                            {product.price.toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <p className="text-muted lh-lg">

                                        {
                                            product.description
                                        }

                                    </p>


                                    {/* CATEGORY */}

                                    <div className="mb-3">

                                        <span className="fw-semibold">
                                            Category:
                                        </span>{" "}

                                        <Link
                                            to={`/category/${product.category}`}
                                            className="text-decoration-none"
                                        >
                                            {
                                                product.category
                                            }
                                        </Link>

                                    </div>


                                    {/* STOCK */}

                                    {isInStock ? (

                                        <div className="alert alert-success py-2">

                                            <strong>
                                                ✓ In Stock
                                            </strong>

                                            <span className="ms-2">
                                                {
                                                    product.stock
                                                }{" "}
                                                available
                                            </span>

                                        </div>

                                    ) : (

                                        <div className="alert alert-danger py-2">

                                            <strong>
                                                Out of Stock
                                            </strong>

                                        </div>

                                    )}


                                    {/* ================================= */}
                                    {/* QUANTITY */}
                                    {/* ================================= */}

                                    {isInStock && (

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Quantity
                                            </label>


                                            <div
                                                className="input-group"
                                                style={{
                                                    maxWidth:
                                                        "180px",
                                                }}
                                            >

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={
                                                        decreaseQuantity
                                                    }
                                                    disabled={
                                                        quantity ===
                                                        1
                                                    }
                                                >
                                                    −
                                                </button>


                                                <span
                                                    className="input-group-text justify-content-center fw-semibold"
                                                    style={{
                                                        minWidth:
                                                            "60px",
                                                    }}
                                                >
                                                    {
                                                        quantity
                                                    }
                                                </span>


                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={
                                                        increaseQuantity
                                                    }
                                                    disabled={
                                                        quantity >=
                                                        product.stock
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                    )}


                                    {/* TOTAL */}

                                    {isInStock && (

                                        <div className="d-flex justify-content-between align-items-center border-top border-bottom py-3 my-2">

                                            <span className="text-muted">
                                                Total
                                            </span>

                                            <span className="fs-3 fw-bold">
                                                ₹
                                                {totalPrice.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>

                                    )}


                                    {/* ================================= */}
                                    {/* BUTTONS */}
                                    {/* ================================= */}

                                    <div className="row g-2 mt-auto pt-3">

                                        <div className="col-12 col-sm-6">

                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg w-100"
                                                onClick={
                                                    handleAddToCart
                                                }
                                                disabled={
                                                    !isInStock ||
                                                    addingToCart
                                                }
                                            >

                                                {addingToCart ? (

                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        />

                                                        Adding...
                                                    </>

                                                ) : (

                                                    "🛒 Add to Cart"

                                                )}

                                            </button>

                                        </div>


                                        <div className="col-12 col-sm-6">

                                            <button
                                                type="button"
                                                className="btn btn-warning btn-lg w-100"
                                                onClick={
                                                    handleBuyNow
                                                }
                                                disabled={
                                                    !isInStock
                                                }
                                            >
                                                ⚡ Buy Now
                                            </button>

                                        </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* CART MESSAGE */}
                                    {/* ================================= */}

                                    {cartMessage && (

                                        <div
                                            className="alert alert-info mt-3 mb-0"
                                            role="alert"
                                        >

                                            {cartMessage}

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* DESCRIPTION */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4 p-md-5">

                        <h3 className="fw-bold mb-3">
                            Product Description
                        </h3>

                        <p className="text-muted lh-lg mb-0">

                            {product.description}

                        </p>

                    </div>

                </div>


                {/* ================================= */}
                {/* SHOPPING INFO */}
                {/* ================================= */}

                <div className="row g-3 mt-1">


                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body text-center p-4">

                                <div className="fs-2 mb-2">
                                    🚚
                                </div>

                                <h6 className="fw-bold">
                                    Fast Delivery
                                </h6>

                                <p className="text-muted small mb-0">
                                    Quick and reliable
                                    delivery.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body text-center p-4">

                                <div className="fs-2 mb-2">
                                    🔒
                                </div>

                                <h6 className="fw-bold">
                                    Secure Payment
                                </h6>

                                <p className="text-muted small mb-0">
                                    Safe and secure
                                    checkout.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body text-center p-4">

                                <div className="fs-2 mb-2">
                                    ↩️
                                </div>

                                <h6 className="fw-bold">
                                    Easy Shopping
                                </h6>

                                <p className="text-muted small mb-0">
                                    Simple and convenient
                                    shopping experience.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}


export default ProductDetails;