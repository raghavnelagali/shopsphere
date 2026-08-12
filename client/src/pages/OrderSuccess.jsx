import { Link, useParams } from "react-router-dom";


function OrderSuccess() {

    const { id } = useParams();


    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body text-center p-4 p-md-5">


                                {/* ================================= */}
                                {/* SUCCESS ICON */}
                                {/* ================================= */}

                                <div
                                    className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}
                                >

                                    <span
                                        className="display-4 text-success"
                                    >
                                        ✓
                                    </span>

                                </div>


                                {/* ================================= */}
                                {/* TITLE */}
                                {/* ================================= */}

                                <h1 className="fw-bold mb-3">

                                    Order Placed Successfully!

                                </h1>


                                <p className="text-muted mb-4">

                                    🎉 Thank you for shopping
                                    with ShopSphere.

                                    <br />

                                    Your payment was successful
                                    and your order has been placed.

                                </p>


                                {/* ================================= */}
                                {/* ORDER ID */}
                                {/* ================================= */}

                                <div
                                    className="bg-light rounded p-3 mb-4"
                                >

                                    <p className="text-muted small mb-1">
                                        Order ID
                                    </p>

                                    <p className="fw-semibold mb-0 text-break">
                                        #{id}
                                    </p>

                                </div>


                                {/* ================================= */}
                                {/* PAYMENT STATUS */}
                                {/* ================================= */}

                                <div className="alert alert-success text-start">

                                    <div className="d-flex">

                                        <span className="me-2">
                                            ✓
                                        </span>

                                        <div>

                                            <strong>
                                                Payment Successful
                                            </strong>

                                            <div className="small mt-1">
                                                Your payment has been
                                                verified successfully.
                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* ================================= */}
                                {/* BUTTONS */}
                                {/* ================================= */}

                                <div className="d-grid gap-2 mt-4">

                                    <Link
                                        to="/orders"
                                        className="btn btn-primary btn-lg"
                                    >
                                        View My Orders
                                    </Link>


                                    <Link
                                        to="/products"
                                        className="btn btn-outline-primary btn-lg"
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>


                                {/* ================================= */}
                                {/* FOOTER MESSAGE */}
                                {/* ================================= */}

                                <p className="text-muted small mt-4 mb-0">

                                    You can track your order from
                                    the My Orders section.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default OrderSuccess;