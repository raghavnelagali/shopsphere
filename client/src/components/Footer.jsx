import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

    return (

        <footer className="shopsphere-footer text-light mt-5">

            <div className="container py-5">

                <div className="row">

                    {/* BRAND */}

                    <div className="col-md-4 mb-4">

                        <h3 className="fw-bold">
                            ShopSphere
                        </h3>

                        <p className="text-secondary">
                            Your modern online shopping
                            destination for quality
                            products at great prices.
                        </p>

                    </div>


                    {/* QUICK LINKS */}

                    <div className="col-md-2 mb-4">

                        <h5>
                            Quick Links
                        </h5>

                        <ul className="list-unstyled">

                            <li>
                                <Link
                                    className="text-light text-decoration-none"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-light text-decoration-none"
                                    to="/products"
                                >
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-light text-decoration-none"
                                    to="/cart"
                                >
                                    Cart
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* CUSTOMER */}

                    <div className="col-md-2 mb-4">

                        <h5>
                            Customer
                        </h5>

                        <ul className="list-unstyled">

                            <li>
                                <Link
                                    className="text-light text-decoration-none"
                                    to="/orders"
                                >
                                    My Orders
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-light text-decoration-none"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* CONTACT */}

                    <div className="col-md-4 mb-4">

                        <h5>
                            Contact Us
                        </h5>

                        <p className="text-secondary mb-1">
                            support@shopsphere.com
                        </p>

                        <p className="text-secondary mb-1">
                            +91 98765 43210
                        </p>

                        <p className="text-secondary">
                            India
                        </p>

                    </div>

                </div>

            </div>


            {/* COPYRIGHT */}

            <div className="border-top border-secondary">

                <div className="container py-3 text-center">

                    <small className="text-secondary">

                        © {new Date().getFullYear()}
                        {" "}
                        ShopSphere.
                        All rights reserved.

                    </small>

                </div>

            </div>

        </footer>
    );
}

export default Footer;