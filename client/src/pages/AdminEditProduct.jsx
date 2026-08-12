import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";


function AdminEditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [featured, setFeatured] =
        useState(false);

    const [image, setImage] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // ==========================================
    // FETCH PRODUCT
    // ==========================================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get(
                        `/products/${id}`
                    );

                const product =
                    response.data.data;


                setName(
                    product.name || ""
                );

                setDescription(
                    product.description || ""
                );

                setPrice(
                    product.price || ""
                );

                setCategory(
                    product.category || ""
                );

                setBrand(
                    product.brand || ""
                );

                setStock(
                    product.stock ?? ""
                );

                setFeatured(
                    product.featured || false
                );


                if (
                    product.images?.length > 0
                ) {

                    setImagePreview(
                        product.images[0].url
                    );

                }

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
    // IMAGE CHANGE
    // ==========================================

    const handleImageChange = (e) => {

        const file =
            e.target.files[0];

        if (!file) {
            return;
        }

        setImage(file);

        setImagePreview(
            URL.createObjectURL(file)
        );

    };


    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);


        try {

            const formData =
                new FormData();


            formData.append(
                "name",
                name
            );

            formData.append(
                "description",
                description
            );

            formData.append(
                "price",
                price
            );

            formData.append(
                "category",
                category
            );

            formData.append(
                "brand",
                brand
            );

            formData.append(
                "stock",
                stock
            );

            formData.append(
                "featured",
                featured ? "true" : "false"
            );


            // Only send image if
            // a new image was selected

            if (image) {

                formData.append(
                    "image",
                    image
                );

            }


            const response =
                await api.put(
                    `/products/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );


            console.log(
                "Updated product:",
                response.data
            );


            setSuccess(
                "Product updated successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/admin/products"
                );

            }, 1000);


        } catch (error) {

            console.error(
                "Update product error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);

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
                    Loading product...
                </p>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

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
                            Edit Product
                        </h1>

                        <p className="text-muted mb-0">
                            Update product information,
                            pricing and inventory.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="btn btn-outline-secondary mt-3 mt-md-0"
                        onClick={() =>
                            navigate(
                                "/admin/products"
                            )
                        }
                    >
                        ← Back to Products
                    </button>

                </div>


                {/* ================================= */}
                {/* FORM */}
                {/* ================================= */}

                <div className="row justify-content-center">

                    <div className="col-12 col-xl-9">

                        <div className="card border-0 shadow-sm overflow-hidden">


                            {/* CARD HEADER */}

                            <div className="card-header bg-white border-0 p-4 p-md-5 pb-0">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            ✏️
                                        </span>

                                    </div>


                                    <div>

                                        <h5 className="fw-bold mb-1">
                                            Product Information
                                        </h5>

                                        <small className="text-muted">
                                            Make changes to your
                                            product details.
                                        </small>

                                    </div>

                                </div>

                            </div>


                            <div className="card-body p-4 p-md-5">


                                {/* ================================= */}
                                {/* ALERTS */}
                                {/* ================================= */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
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


                                <form
                                    onSubmit={handleSubmit}
                                >


                                    {/* ================================= */}
                                    {/* BASIC INFORMATION */}
                                    {/* ================================= */}

                                    <h6 className="fw-bold mb-3">
                                        Basic Information
                                    </h6>


                                    {/* NAME */}

                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="productName"
                                        >
                                            Product Name
                                        </label>

                                        <input
                                            id="productName"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="description"
                                        >
                                            Description
                                        </label>

                                        <textarea
                                            id="description"
                                            className="form-control"
                                            rows="5"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* ================================= */}
                                    {/* PRICE / STOCK */}
                                    {/* ================================= */}

                                    <div className="row">

                                        <div className="col-12 col-md-6 mb-4">

                                            <label
                                                className="form-label fw-semibold"
                                                htmlFor="price"
                                            >
                                                Price
                                            </label>

                                            <div className="input-group">

                                                <span className="input-group-text">
                                                    ₹
                                                </span>

                                                <input
                                                    id="price"
                                                    type="number"
                                                    className="form-control"
                                                    min="0"
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>


                                        <div className="col-12 col-md-6 mb-4">

                                            <label
                                                className="form-label fw-semibold"
                                                htmlFor="stock"
                                            >
                                                Stock Quantity
                                            </label>

                                            <input
                                                id="stock"
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                value={stock}
                                                onChange={(e) =>
                                                    setStock(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* CATEGORY / BRAND */}
                                    {/* ================================= */}

                                    <div className="row">

                                        <div className="col-12 col-md-6 mb-4">

                                            <label
                                                className="form-label fw-semibold"
                                                htmlFor="category"
                                            >
                                                Category
                                            </label>

                                            <input
                                                id="category"
                                                type="text"
                                                className="form-control"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="col-12 col-md-6 mb-4">

                                            <label
                                                className="form-label fw-semibold"
                                                htmlFor="brand"
                                            >
                                                Brand
                                            </label>

                                            <input
                                                id="brand"
                                                type="text"
                                                className="form-control"
                                                value={brand}
                                                onChange={(e) =>
                                                    setBrand(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* ================================= */}
                                    {/* PRODUCT IMAGE */}
                                    {/* ================================= */}

                                    <h6 className="fw-bold mb-3">
                                        Product Image
                                    </h6>


                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-semibold"
                                            htmlFor="productImage"
                                        >
                                            Change Image
                                        </label>

                                        <div className="border rounded-3 p-4 bg-light">

                                            <input
                                                id="productImage"
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={
                                                    handleImageChange
                                                }
                                            />

                                            <small className="text-muted d-block mt-2">
                                                Leave empty to keep
                                                the current image.
                                            </small>

                                        </div>

                                    </div>


                                    {/* IMAGE PREVIEW */}

                                    {imagePreview && (

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Current Image
                                            </label>


                                            <div
                                                className="border rounded-3 bg-light d-flex align-items-center justify-content-center p-3"
                                                style={{
                                                    width: "220px",
                                                    height: "220px",
                                                }}
                                            >

                                                <img
                                                    src={
                                                        imagePreview
                                                    }
                                                    alt={name}
                                                    style={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        objectFit:
                                                            "contain",
                                                    }}
                                                />

                                            </div>


                                            {image && (

                                                <small className="text-success d-block mt-2">
                                                    ✓ New image selected:{" "}
                                                    {image.name}
                                                </small>

                                            )}

                                        </div>

                                    )}


                                    {/* ================================= */}
                                    {/* FEATURED */}
                                    {/* ================================= */}

                                    <div className="card bg-light border-0 mb-4">

                                        <div className="card-body">

                                            <div className="form-check">

                                                <input
                                                    id="featured"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={
                                                        featured
                                                    }
                                                    onChange={(e) =>
                                                        setFeatured(
                                                            e.target
                                                                .checked
                                                        )
                                                    }
                                                />

                                                <label
                                                    htmlFor="featured"
                                                    className="form-check-label fw-semibold"
                                                >
                                                    Show as Featured Product
                                                </label>

                                            </div>


                                            <small className="text-muted ms-4">
                                                Featured products
                                                appear in the
                                                homepage featured
                                                section.
                                            </small>

                                        </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* ACTIONS */}
                                    {/* ================================= */}

                                    <div className="d-flex flex-column flex-sm-row gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg flex-grow-1"
                                            disabled={saving}
                                        >

                                            {saving ? (

                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    />

                                                    Saving Changes...
                                                </>

                                            ) : (

                                                "Save Changes"

                                            )}

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg"
                                            onClick={() =>
                                                navigate(
                                                    "/admin/products"
                                                )
                                            }
                                            disabled={saving}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AdminEditProduct;