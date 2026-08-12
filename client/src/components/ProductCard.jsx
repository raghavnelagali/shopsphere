import { Link } from "react-router-dom";


function ProductCard({ product }) {

    const isInStock =
        product.stock > 0;


    return (

        <div
            className="card h-100 border-0 shadow-sm product-card overflow-hidden"
        >


            {/* ================================= */}
            {/* PRODUCT IMAGE */}
            {/* ================================= */}

            <Link
                to={`/products/${product._id}`}
                className="text-decoration-none"
            >

                <div
                    className="bg-white position-relative d-flex align-items-center justify-content-center"
                    style={{
                        height: "230px",
                    }}
                >

                    {product.images?.length > 0 ? (

                        <img
                            src={
                                product.images[0].url
                            }
                            className="w-100 h-100"
                            alt={product.name}
                            style={{
                                objectFit: "contain",
                                padding: "18px",
                            }}
                        />

                    ) : (

                        <div
                            className="d-flex flex-column justify-content-center align-items-center text-muted bg-light w-100 h-100"
                        >

                            <span className="fs-1 mb-2">
                                📦
                            </span>

                            <span>
                                No Image
                            </span>

                        </div>

                    )}


                    {/* STOCK BADGE */}

                    {!isInStock && (

                        <span
                            className="position-absolute top-0 end-0 badge text-bg-danger m-2"
                        >
                            Out of Stock
                        </span>

                    )}

                </div>

            </Link>


            {/* ================================= */}
            {/* PRODUCT DETAILS */}
            {/* ================================= */}

            <div className="card-body d-flex flex-column p-3 p-md-4">


                {/* BRAND */}

                <p className="text-muted small mb-1 text-uppercase">
                    {product.brand}
                </p>


                {/* PRODUCT NAME */}

                <Link
                    to={`/products/${product._id}`}
                    className="text-decoration-none"
                >

                    <h5
                        className="card-title text-dark fw-semibold mb-2"
                        style={{
                            minHeight: "48px",
                        }}
                    >
                        {product.name}
                    </h5>

                </Link>


                {/* ================================= */}
                {/* RATING */}
                {/* ================================= */}

                <div className="mb-2">

                    <span className="badge bg-success">

                        ⭐{" "}
                        {product.rating || 0}

                    </span>


                    <span className="text-muted small ms-2">

                        {product.numReviews || 0}{" "}
                        reviews

                    </span>

                </div>


                {/* ================================= */}
                {/* PRICE */}
                {/* ================================= */}

                <h5 className="fw-bold text-primary mb-2">

                    ₹
                    {product.price?.toLocaleString(
                        "en-IN"
                    )}

                </h5>


                {/* ================================= */}
                {/* STOCK */}
                {/* ================================= */}

                {isInStock ? (

                    <p className="text-success small mb-3">

                        <span className="fw-semibold">
                            ✓ In Stock
                        </span>

                        {product.stock <= 5 && (

                            <span className="text-warning ms-2">
                                Only {product.stock} left
                            </span>

                        )}

                    </p>

                ) : (

                    <p className="text-danger small mb-3 fw-semibold">
                        Out of Stock
                    </p>

                )}


                {/* ================================= */}
                {/* BUTTON */}
                {/* ================================= */}

                <div className="mt-auto">

                    <Link
                        to={`/products/${product._id}`}
                        className={`btn w-100 ${
                            isInStock
                                ? "btn-primary"
                                : "btn-outline-secondary"
                        }`}
                    >

                        {isInStock
                            ? "View Product"
                            : "View Details"}

                    </Link>

                </div>

            </div>

        </div>

    );

}


export default ProductCard;