import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import img1 from "../img/toyota-offer-2.png";

import "./Promo.css";

const Promo = () => {
    const onClick = (e) => {
        e.preventDefault();
    };

    return (
        <section className="gauto-promo-area">
            <Container>
                <Row className="align-items-center">
                    <Col md="6">
                        <div className="promo-box-left">
                            <img src={img1} alt="promo car" />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="promo-box-right">
                            <h3>Do You Want To Earn With Us? So Don't Be Late.</h3>
                            <Link to="/" onClick={onClick} className="gauto-btn">
                            Become a Drive
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Promo;
