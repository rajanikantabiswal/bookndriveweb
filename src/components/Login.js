import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";

import "./Login.css";

const Login = () => {
    const SubmitHandler = (e) => {
        e.preventDefault();
    };

    const onClick = (e) => {
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
                                <h3>Drive with us</h3>
                            </div>
                            <form onSubmit={SubmitHandler}>
                                <div className="account-form-group">
                                    <input
                                        type="text"
                                        placeholder="Mobile Number"
                                        name="mobile"
                                    />
                                    <FaUser />
                                </div>
                                
                                <div className="remember-row">
                                    <p className="lost-pass">
                                        <Link to="/" onClick={onClick}>
                                            Forgot Password?
                                        </Link>
                                    </p>
                                    <p className="checkbox remember">
                                        <input
                                            className="checkbox-spin"
                                            type="checkbox"
                                            id="Freelance"
                                        />
                                        <label htmlFor="Freelance">
                                            <span />
                                            Keep Me Signed In
                                        </label>
                                    </p>
                                </div>
                                <p>
                                    <button type="submit" className="gauto-theme-btn">
                                        Continue
                                    </button>
                                </p>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
