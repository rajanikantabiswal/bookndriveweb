import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";

import "./Help.css";

const Help = () => {

    return (
        <section className="gauto-call-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="call-box">
                            <div className="call-box-inner">
                                <h2>Help</h2>
                                <p>
                                    Labore dolore magna aliqua ipsum veniam quis nostrud
                                    exercitation voluptate velit cillum dolore feu fugiat nulla
                                    excepteur sint occaecat sed ipsum cupidatat proident culpa
                                    exercitation ullamco laboris aliquik.
                                </p>
                                <div className="call-number">
                                    <div className="call-icon">
                                        <FaPhoneAlt />
                                    </div>
                                    <div className="call-text">
                                        <p>need_any_help</p>
                                        <h4>
                                            <a href="tel:4315292093">(431) 529 2093</a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Help;
