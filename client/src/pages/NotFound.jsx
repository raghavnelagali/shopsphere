import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="bg-light min-vh-100 d-flex align-items-center">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm text-center">

                            <div className="card-body p-5">

                                {/* ICON */}

                                <div
                                    className="display-1 mb-3"
                                >
                                    🔍
                                </div>


                                {/* 404 */}

                                <h1 className="display-3 fw-bold text-primary">
                                    404
                                </h1>


                                {/* TITLE */}

                                <h2 className="fw-bold mt-3">
                                    Page Not Found
                                </h2>


                                {/* DESCRIPTION */}

                                <p className="text-muted mt-3 mb-4">

                                    Sorry, the page you're looking
                                    for doesn't exist or may have
                                    been moved.

                                </p>


                                {/* ACTIONS */}

                                <div className="d-flex justify-content-center gap-2 flex-wrap">

                                    <Link
                                        to="/"
                                        className="btn btn-primary"
                                    >
                                        ← Back to Home
                                    </Link>


                                    <Link
                                        to="/products"
                                        className="btn btn-outline-primary"
                                    >
                                        Browse Products
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default NotFound;