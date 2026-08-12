import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";


function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const navigate = useNavigate();

    const { login } = useAuth();


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response =
                await loginUser(
                    email,
                    password
                );


            login(
                response.user,
                response.token
            );


            // ADMIN → ADMIN DASHBOARD
            if (response.user.role === "admin") {

                navigate("/admin");

            } else {

                // USER → HOME
                navigate("/");

            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="bg-light min-vh-100 d-flex align-items-center">

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-7 col-lg-5">


                        {/* ================================= */}
                        {/* LOGIN CARD */}
                        {/* ================================= */}

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-md-5">


                                {/* ================================= */}
                                {/* BRAND */}
                                {/* ================================= */}

                                <div className="text-center mb-4">

                                    <Link
                                        to="/"
                                        className="text-decoration-none"
                                    >

                                        <div
                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                            style={{
                                                width: "64px",
                                                height: "64px",
                                            }}
                                        >

                                            <span className="fs-3 fw-bold">
                                                S
                                            </span>

                                        </div>


                                        <h2 className="fw-bold text-primary mb-1">
                                            ShopSphere
                                        </h2>

                                    </Link>


                                    <h4 className="fw-bold mt-3 mb-2">
                                        Welcome Back
                                    </h4>


                                    <p className="text-muted mb-0">
                                        Login to continue shopping
                                    </p>

                                </div>


                                {/* ================================= */}
                                {/* ERROR */}
                                {/* ================================= */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >

                                        <strong>
                                            Login failed
                                        </strong>

                                        <div className="small mt-1">
                                            {error}
                                        </div>

                                    </div>

                                )}


                                {/* ================================= */}
                                {/* FORM */}
                                {/* ================================= */}

                                <form
                                    onSubmit={handleSubmit}
                                >


                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold"
                                        >
                                            Email Address
                                        </label>


                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                            autoComplete="email"
                                            required
                                        />

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="password"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>


                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            autoComplete="current-password"
                                            required
                                        />

                                    </div>


                                    {/* LOGIN BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                />

                                                Logging in...
                                            </>

                                        ) : (

                                            "Login"

                                        )}

                                    </button>

                                </form>


                                {/* ================================= */}
                                {/* REGISTER */}
                                {/* ================================= */}

                                <div className="text-center mt-4">

                                    <p className="text-muted mb-0">

                                        Don't have an account?{" "}

                                        <Link
                                            to="/register"
                                            className="text-primary fw-semibold text-decoration-none"
                                        >
                                            Create Account
                                        </Link>

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* BACK TO SHOP */}
                        {/* ================================= */}

                        <div className="text-center mt-3">

                            <Link
                                to="/"
                                className="text-muted text-decoration-none"
                            >
                                ← Back to ShopSphere
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Login;