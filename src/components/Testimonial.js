import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../img/testimonial.jpg";
import img2 from "../img/testimonial-2.jpg";
import "../css/Testimonial.css";



const Testimonial = () => {

    const settings = {
        dots: true,
        arrows: false,
        speed: 1200,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
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
        <section className="gauto-testimonial-area testi-after-box-right py-5">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="site-heading">
                            <h2>testimonial</h2>
                            <p className="text-light mb-4">Lorem ipsum lloresf jipsumde of Testimonial and google reviews.</p>
                        </div>
                    </Col>
                </Row>
                <Slider className="testimonial-slider " {...settings}>
                            <div className="slide">
                                <div className="single-testimonial">
                                    <div className="testimonial-text">
                                        <p>
                                            "Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusm tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            adipisicing elit."
                                        </p>
                                        <div className="testimonial-meta">
                                            <div className="client-image">
                                                <img src={img1} alt="testimonial" />
                                            </div>
                                            <div className="client-info">
                                                <h3>Marco Ghaly</h3>
                                                <p>customer</p>
                                            </div>
                                        </div>
                                        <FaQuoteRight />
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-testimonial">
                                    <div className="testimonial-text">
                                        <p>
                                            "Forem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusm tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            adipisicing elit."
                                        </p>
                                        <div className="testimonial-meta">
                                            <div className="client-image">
                                                <img src={img2} alt="testimonial" />
                                            </div>
                                            <div className="client-info">
                                                <h3>Sherief Arafa</h3>
                                                <p>customer</p>
                                            </div>
                                        </div>
                                        <FaQuoteRight />
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-testimonial">
                                    <div className="testimonial-text">
                                        <p>
                                            "Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusm tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            adipisicing elit."
                                        </p>
                                        <div className="testimonial-meta">
                                            <div className="client-image">
                                                <img src={img1} alt="testimonial" />
                                            </div>
                                            <div className="client-info">
                                                <h3>Marco Ghaly</h3>
                                                <p>customer</p>
                                            </div>
                                        </div>
                                        <FaQuoteRight />
                                    </div>
                                </div>
                            </div>
                            <div className="slide">
                                <div className="single-testimonial">
                                    <div className="testimonial-text">
                                        <p>
                                            "Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusm tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            adipisicing elit."
                                        </p>
                                        <div className="testimonial-meta">
                                            <div className="client-image">
                                                <img src={img1} alt="testimonial" />
                                            </div>
                                            <div className="client-info">
                                                <h3>Marco Ghaly</h3>
                                                <p>customer</p>
                                            </div>
                                        </div>
                                        <FaQuoteRight />
                                    </div>
                                </div>
                            </div>
                        </Slider>   
            </Container>
        </section>
    );
};

export default Testimonial;
