import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/HowWorks.css";
import CarRentalImg from "../../img/car-rental.png";
import KeyImg from "../../img/key.png";
import DriverLessCarImg from "../../img/driverless-car.png";
import ReturnCarImg from "../../img/return-car.png";

const HowWorks = () => {
   

    return (
        <section className="rent-drive-promo-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="site-heading">
                            <h3 className="site-heading-title">How It Works</h3>
                            <hr className="hr-tag"></hr>
                            <br/>
                        </div>
                   
                            <Row>
                                <Col className="" md={3}>
                                    <div className="imageload p-4"><img alt="" className="img"  src={CarRentalImg}/></div>
                                    <div className="details"><br/>
                                    <b class="whtclrs ">Selfdrive Rent A Car.</b><br/>
                                    <span class="whtclr">Just select your Duration, Location and Car. All on the site! It's all super easy.</span>
                                   </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img  alt="" className="img"  src={KeyImg}/></div>
                                    <div className="details"><br/>
                                    <b class="whtclrs ">Delivery</b><br/>
                                    <span class="whtclr">We Deliver your selected rental car at your Door Step Across Pune or You can visit us at our nearest rental location.</span>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img alt="" className="img" src={DriverLessCarImg}/></div>
                                    <div className="details">
                                    <br/><b class="whtclrs ">Drive Anywhere, Anytime</b>
                                    <br/><span class="whtclr">Enjoy the freedom to self drive your rental car from Pune to any destination across INDIA with out limits.</span>
                                    </div>
                                    </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img alt="" className="img" src={ReturnCarImg}/></div>
                                    <div className="details">
                                    <br/><b class="whtclrs ">Return</b>
                                    <br/><span class="whtclr">Get your rental car back to your location, we will pick it up or You can return it at our nearest rental location across available cities.</span>
                                   </div>
                                </Col>
                            </Row>
                      
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HowWorks;
