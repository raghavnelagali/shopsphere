import ProductCard from "../components/ProductCard";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../services/productService";

function BrandProducts() {

    const { category, brand } = useParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const limit = 8;


    // ==========================================
    // FETCH BRAND PRODUCTS
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getProducts({
                        category,
                        brand,
                        page,
                        limit,
                    });


                setProducts(
                    response.data || []
                );


                setTotalPages(
                    response.totalPages || 1
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load products"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, [category, brand, page]);


    // ==========================================
    // PAGE CHANGE
    // ==========================================

    const handlePageChange = (
        newPage
    ) => {

        if (
            newPage < 1 ||
            newPage > totalPages
        ) {
            return;
        }

        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    return (

        <div className="container py-5">

            {/* ================================= */}
            {/* BREADCRUMB */}
            {/* ================================= */}

            <nav
                aria-label="breadcrumb"
                className="mb-4"
            >

                <ol className="breadcrumb">

                    <li className="breadcrumb-item">

                        <Link to="/">
                            Home
                        </Link>

                    </li>


                    <li className="breadcrumb-item">

                        <Link
                            to={`/category/${category}`}
                        >
                            {category}
                        </Link>

                    </li>


                    <li
                        className="breadcrumb-item active"
                        aria-current="page"
                    >
                        {brand}
                    </li>

                </ol>

            </nav>


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="mb-5">

                <h1 className="fw-bold">
                    {brand} {category}
                </h1>

                <p className="text-muted">
                    Explore the latest{" "}
                    {brand}{" "}
                    {category.toLowerCase()}
                    {" "}products.
                </p>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="alert alert-danger">
                    {error}
                </div>

            )}


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {loading ? (

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3">
                        Loading {brand} products...
                    </p>

                </div>

            ) : products.length === 0 ? (

                /* ================================= */
                /* NO PRODUCTS */
                /* ================================= */

                <div className="text-center py-5">

                    <div className="display-3">
                        📦
                    </div>

                    <h3 className="mt-3">
                        No {brand} {category} found
                    </h3>

                    <p className="text-muted">
                        We currently don't have any
                        products from this brand.
                    </p>

                    <Link
                        to={`/category/${category}`}
                        className="btn btn-primary"
                    >
                        View All {category}
                    </Link>

                </div>

            ) : (

                /* ================================= */
                /* PRODUCTS */
                /* ================================= */

                <>

                    <div className="row g-4">

                        {products.map(
                            (product) => (

                                <div
                                    className="col-6 col-md-4 col-lg-3"
                                    key={product._id}
                                >

                                    <ProductCard
                                        product={product}
                                    />

                                </div>

                            )
                        )}

                    </div>


                    {/* ================================= */}
                    {/* PAGINATION */}
                    {/* ================================= */}

                    {totalPages > 1 && (

                        <div className="d-flex justify-content-center mt-5">

                            <nav>

                                <ul className="pagination">

                                    {/* PREVIOUS */}

                                    <li
                                        className={`page-item ${
                                            page === 1
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                handlePageChange(
                                                    page - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>


                                    {/* PAGE NUMBERS */}

                                    {Array.from(
                                        {
                                            length:
                                                totalPages,
                                        },
                                        (_, index) => {

                                            const pageNumber =
                                                index + 1;

                                            return (

                                                <li
                                                    key={
                                                        pageNumber
                                                    }
                                                    className={`page-item ${
                                                        page ===
                                                        pageNumber
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >

                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNumber
                                                            )
                                                        }
                                                    >
                                                        {
                                                            pageNumber
                                                        }
                                                    </button>

                                                </li>

                                            );

                                        }
                                    )}


                                    {/* NEXT */}

                                    <li
                                        className={`page-item ${
                                            page ===
                                            totalPages
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                handlePageChange(
                                                    page + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        </div>

                    )}

                </>

            )}

        </div>

    );
}


/* ========================================= */
/* PRODUCT CARD */
/* ========================================= */


export default BrandProducts;