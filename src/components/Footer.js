import React from "react";
import { FaWhatsapp, FaPhone, FaInstagram } from "react-icons/fa";
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
        color: 'white',
        padding: '10px',
        textDecoration: 'none',
        transition: '0.3s',
        cursor: 'pointer',
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
                                    <h3>We are Available in</h3>
                                    <div className="footer-social-icon">
                                        <a href="https://www.facebook.com/BooknDrive.in/" target="_blank"  style={cssdesign}>
                                            <FaFacebookF />
                                        </a>
                                        <a href="https://www.linkedin.com/showcase/book-n-drive/" target="_blank" style={cssdesign}>
                                            <FaLinkedinIn />
                                        </a>
                                        <a href="https://www.instagram.com/bookndrive.in/" target="_blank"  style={cssdesign}>
                                            <FaInstagram />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col lg={3}>
                        <div className="footer-address">
                                <h3>Quick Links</h3>
                                <p>
                                <Link to="/blogs" style={cssdesign}>
                                    Blogs
                                </Link>
                                </p> 
                                <p>
                                <Link to="/host" style={cssdesign}>
                                    Become a Host
                                </Link>
                                </p>
                                
                                

                            </div>

                        </Col>
                        <Col lg={3}>

                            <div className="footer-address">
                                <h3>Pages</h3>
                                <p>
                                <Link to="/terms-and-conditions"  style={cssdesign}>
                                    Terms & Conditions
                                </Link>
                                </p> 
                                <p>
                                <Link to="/refund-policy"  style={cssdesign}>
                                    Refund Policy
                                </Link>
                                </p>
                                <p>
                                <Link to="/privacy-policy"  style={cssdesign}>
                                    Privacy policy
                                </Link>
                                </p>
                            </div>

                        </Col>
                        <Col lg={3}>

                            <div className="footer-address">
                                <h3>Head Office</h3>
                                <p>#2170/4071, <span>Ravi Talkies Road, Bhubaneswar-751002, Odisha</span>
                                </p>
                                <p>Phone: 8455888889 
                                <br/>Email: info@bookndrive.in
                                <br/>Office Time: 24 x 7 Available</p>
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
