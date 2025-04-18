import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../img/slider-1.jpg";
import hero2 from "../img/slider-2.jpg";

import "./hero.css";

const Hero = () => {

    const onClick = (e) => {
        e.preventDefault();
    };

    const settings = {
        dots: false,
        arrows: false,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true,
    };

    return (
        <section className="gauto-slider-area fix">
            <Slider {...settings}>
                <div className="slide">
                    <div
                        className=" gauto-main-slide"
                        style={{ backgroundImage: `url(${hero1})` }}
                    >
                        <div className="gauto-main-caption">
                            <div className="gauto-caption-cell">
                                <Container>
                                    <Row>
                                        <Col md={6}>
                                            <div className="slider-text">
                                                <p>for rent </p>
                                                <h2>Reserved Now & Get <span>50% Off</span> </h2>
                                                <Link to="/" onClick={onClick} className="gauto-btn">
                                                    Researve Now
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div
                        className=" gauto-main-slide"
                        style={{ backgroundImage: `url(${hero2})` }}
                    >

                        <div className="gauto-main-caption">
                            <div className="gauto-caption-cell">
                                <Container>
                                    <Row>
                                        <Col md={6}>
                                            <div className="slider-text">
                                                <p>for rent </p>
                                                <h2>Reserved Now & Get <span>50% Off</span> </h2>
                                                <Link to="/" onClick={onClick} className="gauto-btn">
                                                    Researve Now
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </section>
    );
};

export default Hero;
