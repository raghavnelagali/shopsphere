import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";


function AdminUsers() {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH USERS
    // ==========================================

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get("/users");

                setUsers(
                    response.data.data || []
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load users"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchUsers();

    }, []);


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
                    Loading users...
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


    // ==========================================
    // USER COUNTS
    // ==========================================

    const adminCount =
        users.filter(
            (user) =>
                user.role === "admin"
        ).length;

    const customerCount =
        users.filter(
            (user) =>
                user.role !== "admin"
        ).length;


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
                            Users
                        </h1>

                        <p className="text-muted mb-0">
                            Manage and view registered
                            ShopSphere users.
                        </p>

                    </div>


                    <Link
                        to="/admin"
                        className="btn btn-outline-secondary mt-3 mt-md-0"
                    >
                        ← Dashboard
                    </Link>

                </div>


                {/* ================================= */}
                {/* SUMMARY CARDS */}
                {/* ================================= */}

                <div className="row g-3 mb-4">


                    {/* TOTAL USERS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            👥
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Total Users
                                        </small>

                                        <h3 className="fw-bold mb-0">
                                            {users.length}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* CUSTOMERS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            👤
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Customers
                                        </small>

                                        <h3 className="fw-bold mb-0">
                                            {customerCount}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ADMINS */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-3 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >

                                        <span className="fs-3">
                                            🛡️
                                        </span>

                                    </div>


                                    <div>

                                        <small className="text-muted">
                                            Administrators
                                        </small>

                                        <h3 className="fw-bold mb-0">
                                            {adminCount}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* USERS TABLE */}
                {/* ================================= */}

                <div className="card border-0 shadow-sm overflow-hidden">


                    {/* TABLE HEADER */}

                    <div className="card-header bg-white border-0 p-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Registered Users
                                </h5>

                                <small className="text-muted">
                                    ShopSphere account list
                                </small>

                            </div>


                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                {users.length}

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
                                            User
                                        </th>

                                        <th className="py-3">
                                            Email
                                        </th>

                                        <th className="py-3">
                                            Role
                                        </th>

                                        <th className="py-3">
                                            Joined
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-5"
                                            >

                                                <div className="d-flex flex-column align-items-center">

                                                    <div
                                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                        }}
                                                    >

                                                        <span className="fs-2">
                                                            👥
                                                        </span>

                                                    </div>


                                                    <h5 className="fw-bold">
                                                        No users yet
                                                    </h5>


                                                    <p className="text-muted mb-0">
                                                        Registered users
                                                        will appear here.
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        users.map(
                                            (user) => (

                                                <tr
                                                    key={
                                                        user._id
                                                    }
                                                >


                                                    {/* USER */}

                                                    <td className="px-4">

                                                        <div className="d-flex align-items-center">

                                                            <div
                                                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0"
                                                                style={{
                                                                    width: "45px",
                                                                    height: "45px",
                                                                }}
                                                            >

                                                                {user.name
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase() ||
                                                                    "U"}

                                                            </div>


                                                            <div className="ms-3">

                                                                <div className="fw-semibold">

                                                                    {
                                                                        user.name
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
                                                                        user._id
                                                                    }

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* EMAIL */}

                                                    <td>

                                                        <span className="text-muted">

                                                            {
                                                                user.email
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ROLE */}

                                                    <td>

                                                        {user.role ===
                                                        "admin" ? (

                                                            <span className="badge text-bg-primary">

                                                                🛡️ Admin

                                                            </span>

                                                        ) : (

                                                            <span className="badge text-bg-secondary">

                                                                Customer

                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* JOINED */}

                                                    <td>

                                                        <span className="fw-semibold">

                                                            {user.createdAt
                                                                ? new Date(
                                                                    user.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-IN"
                                                                )
                                                                : "N/A"}

                                                        </span>

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
                {/* FOOTER */}
                {/* ================================= */}

                {users.length > 0 && (

                    <div className="d-flex justify-content-between align-items-center mt-3">

                        <small className="text-muted">
                            Showing {users.length} registered users
                        </small>


                        <Link
                            to="/admin"
                            className="btn btn-sm btn-outline-primary"
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                )}

            </div>

        </div>

    );

}


export default AdminUsers;