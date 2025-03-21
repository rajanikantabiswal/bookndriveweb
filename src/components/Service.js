import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../img/city-transport.png";
import img2 from "../img/airport-transport.png";
import img3 from "../img/hospital-transport.png";
import img4 from "../img/wedding-ceremony.png";
import img5 from "../img/hotel-transport.png";
import img6 from "../img/luggege-transport.png";

import "./Service.css";

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
        <section className="gauto-service-area section_70">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="site-heading">
                            <h4>See Our</h4>
                            <h2>Latest Servive</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Slider className="service-slider" {...settings}>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">01 </span>
                                    <div className="service-icon">
                                        <img src={img1} alt="city trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>City transfer</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">02 </span>
                                    <div className="service-icon">
                                        <img src={img2} alt="airport trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>Air transfer</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">03 </span>
                                    <div className="service-icon">
                                        <img src={img3} alt="hospital trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>Hospital Transfer</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">04 </span>
                                    <div className="service-icon">
                                        <img src={img4} alt="wedding trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>Wedding Ceremony</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">05 </span>
                                    <div className="service-icon">
                                        <img src={img5} alt="wedding trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3>City Tour</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-service">
                                    <span className="service-number">06 </span>
                                    <div className="service-icon">
                                        <img src={img6} alt="wedding trasport" />
                                    </div>
                                    <div className="service-text">
                                        <Link to="/service-single">
                                            <h3> Baggage transport</h3>
                                        </Link>
                                        <p>
                                            Risus commodo maecenas accumsan lacus vel facilisis. Dorem
                                            ipsum dolor consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Service;
