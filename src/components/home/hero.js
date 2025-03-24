import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../../img/home_banner.webp";
import hero2 from "../../img/banner-2.jpg";
import TopHeader from '../../components/TopHeader';
import Logo from "../../img/Bookndrive_logo_white.png";
import CartopRightBlack from "../../img/car-top-right-black.svg";
import {
    FaPhoneAlt,
    FaUserAlt,
} from "react-icons/fa";

import "../../css/hero.css";

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
        <section className="rent-drive-slider-area fix rent-drive-main">
            <Slider {...settings}>
                <div className="slide">
                    <div
                        className="rent-drive-main-slide"                        
                    >
                        <div className="rent-drive-main-caption">

                            <Container className="mt-1">
                                <Row className="align-items-center h-100">


                                    <Col md={6} className="font-slidwe">

                                        <div className="pt-5 pt-lg-0">
                                            <span className="p-2 rounded bg-light mb-2 d-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up-fill text-theme me-1 " viewBox="0 0 16 16"> <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" /> </svg>
                                                Unlimited KMs, Zero Extra Charges.</span>
                                            <div>
                                                <span className="hero-title-1">Your Journey Starts in a Click </span>
                                                <span className="hero-title-2">Just Book-n-Drive!</span>
                                            </div>
                                            {/* <p className="mt-4">Embark on journeys beyond city limits with BookNDrive! Experience the freedom of autonomous travel as our self-driving vehicles seamlessly take you on captivating adventures outside the city.</p>
                                            <Link to="/" onClick={onClick} className="rent-drive-btn">
                                                Book Now
                                            </Link> */}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        {/* <img src={CartopRightBlack} className="img-fluid w-100" /> */}
                                    </Col>
                                </Row>
                            </Container>

                        </div>
                    </div>
                </div>
                {/* <div className="slide">
                    <div
                        className=" rent-drive-main-slide"
                        style={{ backgroundImage: `url(${hero2})` }}
                    >

                    <div className="rent-drive-main-caption">
                          
                        <Container className="cont">
                            <Row className="align-items-center h-100">
                           
                                <Col md={7} className="font-slidwe">
                                    
                                <div>
                                            <span className="p-2 rounded bg-light mb-2 d-inline-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up-fill text-theme me-1 " viewBox="0 0 16 16"> <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/> </svg>
                                                100% Trusted car rental platform in the world.</span>
                                            <div> 
                                                <span className="hero-title-1">Find Your Best </span>
                                                <span className="hero-title-2">Dream Control for Rental</span>
                                            </div>
                                            <p className="mt-4">Embark on journeys beyond city limits with BookNDrive! Experience the freedom of autonomous travel as our self-driving vehicles seamlessly take you on captivating adventures outside the city.</p>
                                            <Link to="/" onClick={onClick} className="rent-drive-btn">
                                                Book Now
                                            </Link>
                                         </div>
                                        
                                
                                </Col>
                            </Row>
                        </Container>
                  </div>
                    </div>
                </div> */}
            </Slider>
        </section>
    );
};

export default Hero;
