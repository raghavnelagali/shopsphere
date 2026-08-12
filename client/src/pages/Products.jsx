import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";


function Products() {

    const [searchParams, setSearchParams] =
        useSearchParams();


    // ==========================================
    // STATE
    // ==========================================

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const [search, setSearch] =
        useState(
            searchParams.get("search") || ""
        );


    const [sort, setSort] =
        useState(
            searchParams.get("sort") || ""
        );


    const [page, setPage] =
        useState(
            Number(
                searchParams.get("page")
            ) || 1
        );


    const [totalPages, setTotalPages] =
        useState(1);


    const limit = 8;


    // ==========================================
    // SYNC URL WITH STATE
    // ==========================================

    useEffect(() => {

        setSearch(
            searchParams.get("search") || ""
        );

        setSort(
            searchParams.get("sort") || ""
        );

        setPage(
            Number(
                searchParams.get("page")
            ) || 1
        );

    }, [searchParams]);


    // ==========================================
    // FETCH PRODUCTS
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                setError("");


                const params = {
                    page,
                    limit,
                };


                if (search.trim()) {

                    params.search =
                        search.trim();

                }


                if (sort) {

                    params.sort =
                        sort;

                }


                const response =
                    await getProducts(params);


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

    }, [
        search,
        sort,
        page,
    ]);


    // ==========================================
    // SORT
    // ==========================================

    const handleSort = (e) => {

        const value =
            e.target.value;


        const params = {};


        if (search.trim()) {

            params.search =
                search.trim();

        }


        if (value) {

            params.sort =
                value;

        }


        params.page = 1;


        setSearchParams(params);

    };


    // ==========================================
    // PAGE
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


        const params = {};


        if (search.trim()) {

            params.search =
                search.trim();

        }


        if (sort) {

            params.sort =
                sort;

        }


        if (newPage > 1) {

            params.page =
                newPage;

        }


        setSearchParams(params);


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // ==========================================
    // CLEAR SEARCH
    // ==========================================

    const clearSearch = () => {

        setSearchParams({});

    };


    return (

        <div className="bg-light min-vh-100">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <section className="bg-white border-bottom">

                <div className="container py-4 py-md-5">

                    <div className="row align-items-center">

                        <div className="col-12 col-md-7">

                            <span className="badge bg-primary mb-2">
                                ShopSphere Store
                            </span>


                            <h1 className="fw-bold mb-2">

                                {search
                                    ? `Search results for "${search}"`
                                    : "All Products"
                                }

                            </h1>


                            <p className="text-muted mb-0">

                                {search
                                    ? "Products matching your search"
                                    : "Explore our collection of quality electronics"
                                }

                            </p>

                        </div>


                        {/* SORT */}

                        <div className="col-12 col-md-5 mt-3 mt-md-0">

                            <div className="d-flex justify-content-md-end align-items-center gap-2">

                                <label
                                    htmlFor="sortProducts"
                                    className="text-muted text-nowrap"
                                >
                                    Sort by
                                </label>


                                <select
                                    id="sortProducts"
                                    className="form-select"
                                    style={{
                                        maxWidth: "220px",
                                    }}
                                    value={sort}
                                    onChange={
                                        handleSort
                                    }
                                >

                                    <option value="">
                                        Recommended
                                    </option>

                                    <option value="price">
                                        Price: Low → High
                                    </option>

                                    <option value="-price">
                                        Price: High → Low
                                    </option>

                                    <option value="newest">
                                        Newest First
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* PRODUCTS CONTENT */}
            {/* ================================= */}

            <main className="container py-4 py-md-5">


                {/* ================================= */}
                {/* SEARCH FILTER */}
                {/* ================================= */}

                {search && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-body p-3">

                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">

                                <div>

                                    <span className="text-muted">
                                        Searching for:
                                    </span>

                                    <span className="fw-semibold ms-2">
                                        "{search}"
                                    </span>

                                </div>


                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={
                                        clearSearch
                                    }
                                >
                                    ✕ Clear Search
                                </button>

                            </div>

                        </div>

                    </div>

                )}


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (

                    <div
                        className="alert alert-danger border-0 shadow-sm"
                        role="alert"
                    >

                        <div className="fw-semibold mb-1">
                            Something went wrong
                        </div>

                        {error}

                    </div>

                )}


                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}

                {loading ? (

                    <div className="card border-0 shadow-sm">

                        <div className="card-body py-5">

                            <div className="text-center">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                />

                                <p className="text-muted mt-3 mb-0">
                                    Loading products...
                                </p>

                            </div>

                        </div>

                    </div>

                ) : products.length === 0 ? (

                    /* ================================= */
                    /* NO RESULTS */
                    /* ================================= */

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-4"
                                style={{
                                    width: "90px",
                                    height: "90px",
                                }}
                            >

                                <span className="fs-1">
                                    🔍
                                </span>

                            </div>


                            <h3 className="fw-bold">
                                No products found
                            </h3>


                            <p className="text-muted mx-auto mb-4"
                                style={{
                                    maxWidth: "500px",
                                }}
                            >

                                {search
                                    ? `We couldn't find any products matching "${search}".`
                                    : "There are no products available right now."
                                }

                            </p>


                            {search && (

                                <button
                                    className="btn btn-primary"
                                    onClick={
                                        clearSearch
                                    }
                                >
                                    View All Products
                                </button>

                            )}

                        </div>

                    </div>

                ) : (

                    /* ================================= */
                    /* PRODUCT GRID */
                    /* ================================= */

                    <>

                        {/* PRODUCT COUNT */}

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <p className="text-muted mb-0">

                                Showing{" "}
                                <strong className="text-dark">
                                    {products.length}
                                </strong>{" "}
                                products

                            </p>


                            {totalPages > 1 && (

                                <small className="text-muted">

                                    Page{" "}
                                    <strong>
                                        {page}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {totalPages}
                                    </strong>

                                </small>

                            )}

                        </div>


                        {/* GRID */}

                        <div className="row g-3 g-md-4">

                            {products.map(
                                (product) => (

                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={
                                            product._id
                                        }
                                    >

                                        <ProductCard
                                            product={
                                                product
                                            }
                                        />

                                    </div>

                                )
                            )}

                        </div>

                    </>

                )}


                {/* ================================= */}
                {/* PAGINATION */}
                {/* ================================= */}

                {!loading &&
                    products.length > 0 &&
                    totalPages > 1 && (

                    <div className="d-flex justify-content-center mt-5">

                        <nav
                            aria-label="Product pagination"
                        >

                            <ul className="pagination mb-0">


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
                                        disabled={
                                            page === 1
                                        }
                                    >
                                        ← Previous
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
                                        disabled={
                                            page ===
                                            totalPages
                                        }
                                    >
                                        Next →
                                    </button>

                                </li>

                            </ul>

                        </nav>

                    </div>

                )}

            </main>

        </div>

    );

}


export default Products;