import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../img/icon1-red.png";
import img2 from "../../img/icon2-green.svg";
import img3 from "../../img/hospital-transport.png";
import img4 from "../../img/wedding-ceremony.png";
import img5 from "../../img/icon3-orange.svg";
import img6 from "../../img/luggege-transport.png";

import "../../css/Service.css";

const Service = () => {

    const settings = {
        dots: true,
        arrows: false,
        speed: 1200,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <section className="rent-drive-service-area section_70">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="site-heading">
                            <h2>How it Works</h2>
                            <p> We're thrilled to have you embark on on this tranformative journey with us. </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col lg={4}>
                                <div className="single-service">
                                    <div className="service-icon overflow-hidden">
                                        <img src={img1} alt="city trasport" className="" width={120}/>
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>1. Choose Location</h3>
                                        </Link>
                                        <p>
                                            Embark on journeys beyond city limits with BookNDrive! Experience the
                                            freedom of autonomous travel as our self-driving vehicles seamlessly take you on captivating
                                            adventures outside the city.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="single-service">
                                    <div className="service-icon">
                                        <img src={img2} alt="airport trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>2. Choose Pickup Date</h3>
                                        </Link>
                                        <p>
                                            Experience the future of transportation as our self-driving vehicles redefine
                                            travel, from city exploration to hassle-free airport transfers, promising unparalleled
                                            convenience and innovation in every journey.
                                        </p>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div className="single-service">
                                    <div className="service-icon">
                                        <img src={img5} alt="wedding trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>3. Find Your Car</h3>
                                        </Link>
                                        <p>
                                            Your Gateway to Autonomous Mobility and Unforgettable City Tours! Explore urban
                                            landscapes in a whole new way as our self-driving vehicles take you on guided tours filled
                                            with excitement and discovery.
                                        </p>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Service;
