import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/HowWorks.css";

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
                                    <div className="imageload"><img alt="" className="img"  src="https://selfdrive.in/admin/serviceImages/1542882019hw_work_icon1.png"/></div>
                                    <div className="details"><br/>
                                    <b class="whtclrs ">Selfdrive Rent A Car.</b><br/>
                                    <span class="whtclr">Just select your Duration, Location and Car. All on the site! It's all super easy.</span>
                                   </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload"><img  alt="" className="img"  src="https://selfdrive.in/admin/serviceImages/1542882712delivery_icon.png"/></div>
                                    <div className="details"><br/>
                                    <b class="whtclrs ">Delivery</b><br/>
                                    <span class="whtclr">We Deliver your selected rental car at your Door Step Across Pune or You can visit us at our nearest rental location.</span>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="imageload"><img alt="" className="img" src="https://selfdrive.in/admin/serviceImages/1542883064hw_work_icon3.png"/></div>
                                    <div className="details">
                                    <br/><b class="whtclrs ">Drive Anywhere, Anytime</b>
                                    <br/><span class="whtclr">Enjoy the freedom to self drive your rental car from Pune to any destination across INDIA with out limits.</span>
                                    </div>
                                    </Col>
                                <Col md={3}>
                                    <div className="imageload"><img alt="" className="img" src="https://selfdrive.in/admin/serviceImages/1542883349return.png"/></div>
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
