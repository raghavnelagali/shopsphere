import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productService";
import api from "../services/api";


function AdminProducts() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH PRODUCTS
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                const response =
                    await getProducts({
                        page: 1,
                        limit: 100,
                    });

                setProducts(
                    response.data || []
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

    }, []);


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const handleDelete = async (productId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await api.delete(
                `/products/${productId}`
            );


            setProducts(
                (currentProducts) =>
                    currentProducts.filter(
                        (product) =>
                            product._id !==
                            productId
                    )
            );


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

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
                    Loading products...
                </p>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

                <Link
                    to="/admin"
                    className="btn btn-outline-primary"
                >
                    ← Back to Dashboard
                </Link>

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
                            Products
                        </h1>

                        <p className="text-muted mb-0">

                            {products.length}{" "}

                            {products.length === 1
                                ? "product"
                                : "products"}{" "}
                            in your store

                        </p>

                    </div>


                    <div className="d-flex gap-2 mt-3 mt-md-0">

                        <Link
                            to="/admin"
                            className="btn btn-outline-secondary"
                        >
                            ← Dashboard
                        </Link>


                        <Link
                            to="/admin/products/add"
                            className="btn btn-primary"
                        >
                            + Add Product
                        </Link>

                    </div>

                </div>


                {/* ================================= */}
                {/* PRODUCT TABLE CARD */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm overflow-hidden">

                    {/* TABLE HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Product Inventory
                                </h5>

                                <small className="text-muted">
                                    Manage your ShopSphere products
                                </small>

                            </div>


                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                {products.length}

                            </span>

                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th className="px-4 py-3">
                                            Product
                                        </th>

                                        <th className="py-3">
                                            Category
                                        </th>

                                        <th className="py-3">
                                            Brand
                                        </th>

                                        <th className="py-3">
                                            Price
                                        </th>

                                        <th className="py-3">
                                            Stock
                                        </th>

                                        <th className="py-3">
                                            Featured
                                        </th>

                                        <th className="text-end px-4 py-3">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {products.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-5"
                                            >

                                                <div
                                                    className="d-flex flex-column align-items-center"
                                                >

                                                    <div
                                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                        }}
                                                    >

                                                        <span className="fs-2">
                                                            📦
                                                        </span>

                                                    </div>


                                                    <h5 className="fw-bold">
                                                        No products yet
                                                    </h5>


                                                    <p className="text-muted mb-3">
                                                        Add your first product
                                                        to start selling.
                                                    </p>


                                                    <Link
                                                        to="/admin/products/add"
                                                        className="btn btn-primary"
                                                    >
                                                        + Add Product
                                                    </Link>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        products.map(
                                            (product) => (

                                                <tr
                                                    key={
                                                        product._id
                                                    }
                                                >


                                                    {/* PRODUCT */}

                                                    <td className="px-4">

                                                        <div className="d-flex align-items-center">

                                                            {/* IMAGE */}

                                                            <div
                                                                className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                                                                style={{
                                                                    width: "64px",
                                                                    height: "64px",
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

                                                                    <span>
                                                                        📦
                                                                    </span>

                                                                )}

                                                            </div>


                                                            {/* NAME */}

                                                            <div className="ms-3">

                                                                <div className="fw-semibold">

                                                                    {
                                                                        product.name
                                                                    }

                                                                </div>

                                                                <small
                                                                    className="text-muted"
                                                                    style={{
                                                                        fontSize:
                                                                            "11px",
                                                                    }}
                                                                >

                                                                    ID:{" "}
                                                                    {
                                                                        product._id
                                                                    }

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* CATEGORY */}

                                                    <td>

                                                        <span className="text-muted">

                                                            {
                                                                product.category
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* BRAND */}

                                                    <td>

                                                        <span className="fw-semibold">

                                                            {
                                                                product.brand
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* PRICE */}

                                                    <td>

                                                        <span className="fw-bold">

                                                            ₹
                                                            {
                                                                product.price
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* STOCK */}

                                                    <td>

                                                        {product.stock ===
                                                        0 ? (

                                                            <span className="badge text-bg-danger">

                                                                Out of Stock

                                                            </span>

                                                        ) : product.stock <=
                                                          5 ? (

                                                            <span className="badge text-bg-warning">

                                                                {product.stock}{" "}
                                                                left

                                                            </span>

                                                        ) : (

                                                            <span className="badge text-bg-success">

                                                                {product.stock}

                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* FEATURED */}

                                                    <td>

                                                        {product.featured ? (

                                                            <span className="badge text-bg-primary">

                                                                ★ Featured

                                                            </span>

                                                        ) : (

                                                            <span className="badge text-bg-light text-secondary border">

                                                                No

                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td className="text-end px-4">

                                                        <div className="d-flex justify-content-end gap-2">

                                                            <Link
                                                                to={`/admin/products/edit/${product._id}`}
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                Edit
                                                            </Link>


                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        product._id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* FOOTER ACTION */}
                {/* ================================= */}

                {products.length > 0 && (

                    <div className="d-flex justify-content-between align-items-center mt-3">

                        <small className="text-muted">
                            Showing {products.length} products
                        </small>


                        <Link
                            to="/admin/products/add"
                            className="btn btn-sm btn-primary"
                        >
                            + Add Another Product
                        </Link>

                    </div>

                )}

            </div>

        </div>

    );

}


export default AdminProducts;