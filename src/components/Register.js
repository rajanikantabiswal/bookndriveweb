import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaLock, FaUser, FaRegEnvelope } from "react-icons/fa";

// import "./Register.css";

const Register = () => {

    const SubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <section className="gauto-login-area section_70">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="login-box">
                            <div className="login-page-heading">
                                <FaKey />
                                <h3>Sign Up</h3>
                            </div>
                            <form onSubmit={SubmitHandler}>
                                <div className="account-form-group">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                    />
                                    <FaUser />
                                </div>
                                <div className="account-form-group">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="username"
                                    />
                                    <FaRegEnvelope />
                                </div>
                                <div className="account-form-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <FaLock />
                                </div>
                                <div className="account-form-group">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="password"
                                    />
                                    <FaLock />
                                </div>
                                <div className="remember-row">
                                    <p className="checkbox remember signup">
                                        <input
                                            className="checkbox-spin"
                                            type="checkbox"
                                            id="Freelance"
                                        />
                                        <label htmlFor="Freelance">
                                            <span />
                                            Terms and Conditions
                                        </label>
                                    </p>
                                </div>
                                <p>
                                    <button type="submit" className="gauto-theme-btn">
                                        Register Now
                                    </button>
                                </p>
                            </form>
                            <div className="login-sign-up">
                                <Link to="/login">Already have an account?</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;
