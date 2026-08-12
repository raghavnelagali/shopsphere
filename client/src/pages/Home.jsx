import ProductCard from "../components/ProductCard";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getFeaturedProducts } from "../services/productService";


// ==========================================
// HERO BANNER IMAGES
// ==========================================

import mobileBanner from "../assets/banners/mobiles.png";
import laptopBanner from "../assets/banners/laptops.png";
import audioBanner from "../assets/banners/audios.png";



function Home() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // ==========================================
    // FETCH FEATURED PRODUCTS
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response =
                    await getFeaturedProducts();

                setProducts(
                    response.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to load products:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchProducts();

    }, []);


    // ==========================================
    // HERO BANNERS
    // ==========================================

    const banners = [

        {
            image: mobileBanner,
            alt: "Latest Smartphones",
            link: "/category/Mobiles",
        },

        {
            image: laptopBanner,
            alt: "Latest Laptops",
            link: "/category/Laptops",
        },

        {
            image: audioBanner,
            alt: "Premium Audio",
            link: "/category/Audio",
        },

    ];


    return (

        <div>


            {/* ================================= */}
            {/* HERO CAROUSEL */}
            {/* ================================= */}

           <section className="container-fluid px-0 px-md-4 pt-4">

    <div
        id="shopSphereHero"
        className="carousel slide overflow-hidden rounded-4"
        data-bs-ride="carousel"
        data-bs-interval="4000"
    >


                    {/* ================================= */}
                    {/* INDICATORS */}
                    {/* ================================= */}

                    <div className="carousel-indicators">

                        {banners.map(
                            (banner, index) => (

                                <button
                                    key={banner.image}
                                    type="button"
                                    data-bs-target="#shopSphereHero"
                                    data-bs-slide-to={index}
                                    className={
                                        index === 0
                                            ? "active"
                                            : ""
                                    }
                                    aria-current={
                                        index === 0
                                            ? "true"
                                            : undefined
                                    }
                                    aria-label={`Slide ${index + 1}`}
                                />

                            )
                        )}

                    </div>


                    {/* ================================= */}
                    {/* CAROUSEL BANNERS */}
                    {/* ================================= */}

                    <div className="carousel-inner">

                        {banners.map(
                            (banner, index) => (

                                <div
                                    key={banner.image}
                                    className={
                                        `carousel-item ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                >

                                    <Link
                                        to={banner.link}
                                    >

                                        <img
    src={banner.image}
    alt={banner.alt}
    className="d-block w-100"
    style={{
        width: "100%",
        height: "480px",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
    }}
/>

                                    </Link>

                                </div>

                            )
                        )}

                    </div>


                    {/* ================================= */}
                    {/* PREVIOUS BUTTON */}
                    {/* ================================= */}

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#shopSphereHero"
                        data-bs-slide="prev"
                    >

                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        />

                        <span className="visually-hidden">
                            Previous
                        </span>

                    </button>


                    {/* ================================= */}
                    {/* NEXT BUTTON */}
                    {/* ================================= */}

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#shopSphereHero"
                        data-bs-slide="next"
                    >

                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        />

                        <span className="visually-hidden">
                            Next
                        </span>

                    </button>

                </div>

            </section>


            {/* ================================= */}
            {/* CATEGORIES */}
            {/* ================================= */}

            <section className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Shop by Category
                        </h2>

                        <p className="text-muted mb-0">
                            Find exactly what you're looking for
                        </p>

                    </div>


                    <Link
                        to="/products"
                        className="text-primary fw-semibold text-decoration-none"
                    >
                        View All →
                    </Link>

                </div>


                <div className="row g-4">

                    <CategoryCard
                        icon="📱"
                        name="Mobiles"
                    />

                    <CategoryCard
                        icon="💻"
                        name="Laptops"
                    />

                    <CategoryCard
                        icon="🎧"
                        name="Audio"
                    />

                </div>

            </section>


            {/* ================================= */}
            {/* FEATURED PRODUCTS */}
            {/* ================================= */}

            <section className="container pb-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Featured Products
                        </h2>

                        <p className="text-muted mb-0">
                            Popular picks for you
                        </p>

                    </div>


                    <Link
                        to="/products"
                        className="btn btn-primary"
                    >
                        View All
                    </Link>

                </div>


                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="mt-2">
                            Loading products...
                        </p>

                    </div>

                ) : products.length === 0 ? (

                    <div className="text-center py-5">

                        <p className="text-muted">
                            No featured products available.
                        </p>

                    </div>

                ) : (

                    <div
    className="d-flex gap-3 overflow-auto pb-3"
    style={{
        scrollbarWidth: "thin",
    }}
>

    {products.map((product) => (

        <div
            key={product._id}
            style={{
                minWidth: "220px",
                maxWidth: "220px",
            }}
        >

            <ProductCard
                product={product}
            />

        </div>

    ))}

</div>

                )}

            </section>


            {/* ================================= */}
            {/* WHY SHOPSPHERE */}
            {/* ================================= */}

            <section className="bg-light py-5">

    <div className="container">

        <div className="text-center mb-5">

            <h2 className="fw-bold">
                Why ShopSphere?
            </h2>

            <p className="text-muted mb-0">
                A simple, secure and reliable way to shop electronics
            </p>

        </div>


        <div className="row g-4">


            {/* FAST DELIVERY */}

            <Feature
                icon="🚚"
                title="Fast Delivery"
                text="Get your products delivered quickly and safely."
            />


            {/* SECURE PAYMENTS */}

            <Feature
                icon="🔒"
                title="Secure Payments"
                text="Your payments are protected with secure payment processing."
            />


            {/* QUALITY */}

            <Feature
                icon="⭐"
                title="Quality Products"
                text="Shop genuine electronics from trusted brands."
            />


            {/* SUPPORT */}

            <Feature
                icon="💬"
                title="Customer Support"
                text="We're here to help whenever you need us."
            />

        </div>

    </div>

</section>

        </div>

    );

}


// ==========================================
// CATEGORY CARD
// ==========================================

function CategoryCard({
    icon,
    name,
}) {

    return (

        <div className="col-12 col-md-4">

            <Link
                to={`/category/${name}`}
                className="text-decoration-none text-dark"
            >

                <div
                    className="card border-0 shadow-sm text-center h-100"
                    style={{
                        transition:
                            "transform 0.2s",
                    }}
                >

                    <div className="card-body py-5">

                        <div className="display-2 mb-3">
                            {icon}
                        </div>

                        <h3 className="fw-bold">
                            {name}
                        </h3>

                        <p className="text-muted mb-0">
                            Explore {name}
                        </p>

                    </div>

                </div>

            </Link>

        </div>

    );

}


// ==========================================
// FEATURE
// ==========================================

function Feature({
    icon,
    title,
    text,
}) {

    return (

        <div className="col-12 col-sm-6 col-lg-3">

            <div
                className="card border-0 shadow-sm h-100 text-center"
            >

                <div className="card-body p-4">


                    {/* ICON */}

                    <div
                        className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
                        style={{
                            width: "70px",
                            height: "70px",
                            fontSize: "32px",
                        }}
                    >

                        {icon}

                    </div>


                    {/* TITLE */}

                    <h5 className="fw-bold mb-3">

                        {title}

                    </h5>


                    {/* DESCRIPTION */}

                    <p className="text-muted mb-0">

                        {text}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Home;