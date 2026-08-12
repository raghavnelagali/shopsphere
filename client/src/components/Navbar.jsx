import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");


    // ==========================================
    // CHECK ADMIN
    // ==========================================

    const isAdmin =
        user?.role === "admin";


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (e) => {

        e.preventDefault();

        const value = search.trim();

        if (!value) {
            return;
        }

        navigate(
            `/products?search=${encodeURIComponent(value)}`
        );

    };


    return (

        <nav className="navbar navbar-expand-lg shopsphere-navbar navbar-dark">

            <div className="container">


                {/* ================================= */}
                {/* LOGO */}
                {/* ================================= */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    ShopSphere
                </Link>


                {/* ================================= */}
                {/* MOBILE BUTTON */}
                {/* ================================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >


                    {/* ================================= */}
                    {/* SEARCH */}
                    {/* ================================= */}

                    <form
                        className="d-flex mx-lg-4 my-3 my-lg-0 flex-grow-1"
                        onSubmit={handleSearch}
                    >

                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search products, brands..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-light ms-2"
                            type="submit"
                        >
                            🔍
                        </button>

                    </form>


                    {/* ================================= */}
                    {/* LEFT LINKS */}
                    {/* ================================= */}

                    <ul className="navbar-nav me-lg-3">

                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Home
                            </Link>

                        </li>


                        {/* ADMIN */}

                        {isAuthenticated && isAdmin && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link fw-semibold"
                                    to="/admin"
                                >
                                    Admin
                                </Link>

                            </li>

                        )}

                    </ul>


                    {/* ================================= */}
                    {/* RIGHT LINKS */}
                    {/* ================================= */}

                    <ul className="navbar-nav">


                        {/* ================================= */}
                        {/* CART - NORMAL USER ONLY */}
                        {/* ================================= */}

                        {(!isAuthenticated || !isAdmin) && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/cart"
                                >
                                    🛒 Cart
                                </Link>

                            </li>

                        )}


                        {/* ================================= */}
                        {/* AUTHENTICATED USER */}
                        {/* ================================= */}

                        {isAuthenticated ? (

                            <>

                                {/* ================================= */}
                                {/* MY ORDERS - NORMAL USER ONLY */}
                                {/* ================================= */}

                                {!isAdmin && (

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/orders"
                                        >
                                            My Orders
                                        </Link>

                                    </li>

                                )}


                                {/* ================================= */}
                                {/* USER NAME */}
                                {/* ================================= */}

                                <li className="nav-item">

                                    <span className="nav-link">

                                        Hello, {user?.name}

                                    </span>

                                </li>


                                {/* ================================= */}
                                {/* LOGOUT */}
                                {/* ================================= */}

                                <li className="nav-item">

                                    <button
                                        className="btn btn-outline-light btn-sm mt-1"
                                        onClick={
                                            handleLogout
                                        }
                                    >
                                        Logout
                                    </button>

                                </li>

                            </>

                        ) : (

                            /* ================================= */
                            /* LOGIN */
                            /* ================================= */

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </Link>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;