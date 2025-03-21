import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Img1 from "../img/about.png";
import "./About.css";
const About = () => {
    return (
        <section className="gauto-about-area section_70">
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className="about-left">
                            <h4>About</h4>
                            <h2>Welcome To Rent & Drive</h2>
                            <p>Horem Ipsum passages, and more recently with desktop publishing software like aldus pageMaker including versions of all the Rorem Ipsum generators</p>
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
