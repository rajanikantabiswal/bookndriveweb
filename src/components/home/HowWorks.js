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
                                    <b class="whtclrs ">Select & Book</b><br/>
                                    <span class="whtclr">Find your perfect ride.</span>
                                   </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img  alt="" className="img"  src={KeyImg}/></div>
                                    <div className="details"><br/>
                                    <b class="whtclrs ">Pickup & Go</b><br/>
                                    <span class="whtclr">Grab the keys & start.</span>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img alt="" className="img" src={DriverLessCarImg}/></div>
                                    <div className="details">
                                    <br/><b class="whtclrs ">Enjoy the Drive</b>
                                    <br/><span class="whtclr">Experience freedom.</span>
                                    </div>
                                    </Col>
                                <Col md={3}>
                                    <div className="imageload p-4"><img alt="" className="img" src={ReturnCarImg}/></div>
                                    <div className="details">
                                    <br/><b class="whtclrs ">Easy Return</b>
                                    <br/><span class="whtclr">Hand it back stress-free.</span>
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
