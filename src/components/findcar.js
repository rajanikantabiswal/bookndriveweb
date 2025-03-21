import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FindCar = () => {
    const SubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <section className="gauto-find-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="find-box">
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <div className="find-text">
                                        <h3>Search Your Best Cars Here.</h3>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="find-form">
                                        <form onSubmit={SubmitHandler}>
                                            <Row>
                                                <Col md={4}>
                                                    <p>
                                                        <input
                                                            type="text"
                                                            placeholder="From Address"
                                                        />
                                                    </p>
                                                </Col>
                                                <Col md={4}>
                                                    <p>
                                                        <input type="text" placeholder="To Address" />
                                                    </p>
                                                </Col>
                                                <Col md={4}>
                                                    <p>
                                                        <select className="form-control" placeholder="Select">
                                                            <option>Ac Car</option>
                                                            <option>Non Ac Car</option>
                                                        </select>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <p>
                                                        <input type={Date} id="datepicker" name="journey_date" />
                                                    </p>
                                                </Col>
                                                <Col md={4}>
                                                    <p>
                                                        <input type={TimeRanges} name="journey_time" id="timepicker" placeholder="Journey Time" />
                                                        
                                                    </p>
                                                </Col>
                                                <Col md={4}>
                                                    <p>
                                                        <button type="submit" className="gauto-theme-btn">
                                                            Find Car
                                                        </button>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FindCar;
