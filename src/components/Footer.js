import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaHeart,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaSkype,
    FaPaperPlane,
} from "react-icons/fa";

import logo from "../img/Bookndrive_logo_white.png";

import "../css/Footer.css";

const Footer = () => {
    const onClick = (e) => {
        e.preventDefault();
    };

    const cssdesign = {
        color: 'white'
    }

    return (
        <footer className="rent-drive-footer-area">
            <div className="footer-top-area">
                <Container>
                    <Row>
                        <Col lg={3}>
                            <div className="single-footer">
                                <div className="footer-logo">
                                    <Link to="/">
                                        <img src={logo} alt="footer-logo" className="logo-footer"/>
                                    </Link>
                                </div>

                                <div className="single-footer newsletter_box">
                                    <h3>Newsletter</h3>
                                    <form >
                                        <input type="email" placeholder="Email Address" />
                                        <button type="submit">
                                            <FaPaperPlane />
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </Col>
                        <Col lg={3}>
                        <div className="footer-address">
                                <h3>Quick Links</h3>
                                <p>
                                <Link to="/home" style={cssdesign}>
                                    Home
                                </Link>
                                </p> 
                                <p>
                                <Link to="/" style={cssdesign}>
                                    About
                                </Link>
                                </p>
                                <p>
                                <Link to="/" style={cssdesign}>
                                    Service
                                </Link>
                                </p>
                                <p>
                                <Link to="/" style={cssdesign}>
                                    Contact
                                </Link>
                                </p>

                            </div>

                        </Col>
                        <Col lg={3}>

                            <div className="footer-address">
                                <h3>Our Services</h3>
                                <p>
                                <Link to="/" onClick={onClick} style={cssdesign}>
                                    Wedding Ceremony
                                </Link>
                                </p> 
                                <p>
                                <Link to="/" onClick={onClick} style={cssdesign}>
                                    City Transfer
                                </Link>
                                </p>
                                <p>
                                <Link to="/" onClick={onClick} style={cssdesign}>
                                    Airport Drop
                                </Link>
                                </p>
                                <p>
                                <Link to="/" onClick={onClick} style={cssdesign}>
                                    Tour Events
                                </Link>
                                </p>
                            </div>

                        </Col>
                        <Col lg={3}>

                            <div className="footer-address">
                                <h3>Head Office</h3>
                                <p>
                                First Floor Plot  No 2170/4071, <span>Ravitalkies Road Bhubaneshwar 751002 Odisha</span>
                                </p>
                                <p>Phone: 8455888889 
                                <br/>Email: info@bookndrive.in
                                <br/>Office Time: 9AM- 4PM</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom-area">
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className="copyright">
                                <p>
                                All Rights Reserved @ JetSmart IT Services LLP.
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            
                        </Col>
                    </Row>
                </Container>
            </div>

        </footer>


      

    );
};

export default Footer;
