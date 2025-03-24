import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import img1 from "../../img/toyota-offer-2.png";
import BecomeAHostImg from "../../img/become_a_host.webp";
import BecomeAHostMobileImg from "../../img/become_a_host_mobile.webp";


import "../../css/Promo.css";

const Promo = () => {
    const onClick = (e) => {
        e.preventDefault();
    };

    return (

        <section className="become-a-host-area" >
            <Container>
                <Row className="align-items-center ">
                    <Col md="6">
                    <div className="promo-box-left">
                    <img src={BecomeAHostMobileImg} className="img-fluid become-a-host-img" alt="" />
                    </div>

                    </Col>
                    <Col md="6">
                        <div className="promo-box-right text-center">
                            <h3 className="">Do You Want To Earn With Us?<br/> So Don't Be Late.</h3>
                            <Link to="/host"  className="rent-drive-btn">
                            Become a Host
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    );
};

export default Promo;
