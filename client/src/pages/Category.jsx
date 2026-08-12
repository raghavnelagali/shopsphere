import ProductCard from "../components/ProductCard";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../services/productService";

function Category() {

    const { category } = useParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const limit = 8;


    // ==========================================
    // BRANDS
    // ==========================================

    const brands = {

        Mobiles: [
            "Apple",
            "Samsung",
            "OnePlus",
            "Xiaomi",
            "Vivo",
            "Realme",
            "Oppo",
            "Motorola",
            "Google",
            "Nothing",
        ],

        Laptops: [
            "Apple",
            "Dell",
            "HP",
            "Lenovo",
            "Asus",
            "Acer",
            "MSI",
            "Samsung",
            "Microsoft",
            "LG",
        ],

        Audio: [
            "Sony",
            "JBL",
            "Boat",
            "Bose",
            "Sennheiser",
            "Marshall",
            "Skullcandy",
            "Audio-Technica",
            "Apple",
            "Samsung",
        ],

    };


    // ==========================================
    // FETCH PRODUCTS
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getProducts({
                        category,
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

    }, [category, page]);


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


    // ==========================================
    // CURRENT BRANDS
    // ==========================================

    const currentBrands =
        brands[category] || [];


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container py-5">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    {category}
                </h1>

                <p className="text-muted">
                    Explore the best{" "}
                    {category.toLowerCase()} products
                </p>

            </div>


            {/* ================================= */}
            {/* BRANDS */}
            {/* ================================= */}

            <section className="mb-5">

                <h3 className="fw-bold mb-3">
                    Shop by Brand
                </h3>


                <div className="row g-3">

                    {currentBrands.map(
                        (brand) => (

                            <div
                                className="col-6 col-md-4 col-lg-2"
                                key={brand}
                            >

                                <Link
                                    to={`/category/${category}/brand/${brand}`}
                                    className="text-dark"
                                >

                                    <div className="card border-0 shadow-sm text-center h-100">

                                        <div className="card-body d-flex align-items-center justify-content-center">

                                            <h6 className="fw-bold mb-0">
                                                {brand}
                                            </h6>

                                        </div>

                                    </div>

                                </Link>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* ================================= */}
            {/* ALL PRODUCTS */}
            {/* ================================= */}

            <section>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h3 className="fw-bold mb-1">
                            All {category}
                        </h3>

                        <p className="text-muted mb-0">
                            Explore our collection
                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {/* LOADING */}

                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="mt-3">
                            Loading products...
                        </p>

                    </div>

                ) : products.length === 0 ? (

                    /* NO PRODUCTS */

                    <div className="text-center py-5">

                        <div className="display-4">
                            📦
                        </div>

                        <h4 className="mt-3">
                            No products found
                        </h4>

                        <p className="text-muted">
                            There are currently no{" "}
                            {category.toLowerCase()}{" "}
                            products available.
                        </p>

                    </div>

                ) : (

                    /* PRODUCT GRID */

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

                )}

            </section>


            {/* ================================= */}
            {/* PAGINATION */}
            {/* ================================= */}

            {!loading &&
                products.length > 0 &&
                totalPages > 1 && (

                <div className="d-flex justify-content-center mt-5">

                    <nav>

                        <ul className="pagination">

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
                                            className={`page-item ${
                                                page ===
                                                pageNumber
                                                    ? "active"
                                                    : ""
                                            }`}
                                            key={
                                                pageNumber
                                            }
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


                            <li
                                className={`page-item ${
                                    page === totalPages
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

        </div>

    );
}


/* ========================================= */
/* PRODUCT CARD */
/* ========================================= */




export default Category;