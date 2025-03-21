import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Img1 from "../../img/about.png";
import "../../css/About.css";
const About = () => {
    return (
        <section className="rent-drive-about-area section_70">
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className="about-left">
                            <h4>About</h4>
                            <h2>Welcome To Book N Drive</h2>
                            <p>At BookNDrive, we're propelling the future of transportation by bringing cutting-edge self-driving technology to your doorstep. We're thrilled to have you embark on on this tranformative journey with us. Whether you're a tech enthusiast, an advocate for safar roads, or just someone excited about the possibilities of tomorrow's commute, you're in the right place.</p>
                            <div className="about-list">
                                <ul>
                                    <li>
                                        <span>
                                            <FaCheck />
                                        </span>
                                        We are a trusted name
                                    </li>
                                    <li>
                                        <span>
                                            <FaCheck />
                                        </span>
                                        we deal in have all brands
                                    </li>
                                    <li>
                                        <span>
                                            <FaCheck />
                                        </span>
                                        have a larger stock of vehicles
                                    </li>
                                    <li>
                                        <span>
                                            <FaCheck />
                                        </span>
                                        we are at worldwide locations
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="about-right">
                            <img src={Img1} alt="car" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default About;
