import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import FindCar from "../components/home/findcar";
import { Link } from "react-router-dom";
import Faq from "../components/home/Faq";
import SettingIcon from "../img/setting-cog.svg";
import OilTypeIcon from "../img/hybrid-car.svg";
import RoadIcon from "../img/road.svg";
import MilageIcon from "../img/milage.png";

import "../css/CarList.css";

import { Row, Col, Container } from "react-bootstrap";
import { getToken, https } from "../components/AuthUser";

const CarList = () => {
    const token = getToken();
    const httpClient = https();

    const [carArray, setCarArray] = useState([]);
    const [carArray1, setCarArray1] = useState([]);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [x, setX] = useState(1);

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    // Calculate total hours between two dates
    const calculateTotalHours = () => {
        const fromDate = new Date(localStorage.getItem("formattedDate"));
        const toDate = new Date(localStorage.getItem("formattedDate2"));

        // Calculate time difference in hours
        const timeDiff = Math.abs(toDate - fromDate);
        const totalHours = timeDiff / (1000 * 60 * 60);

        return Math.ceil(totalHours);
    };

    // Helper method to parse date string from local format
    const parseDateString = (dateStr) => {
        // Expected format: DD/MM/YYYY H:mm AM/PM
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/');
        const [time, period] = timePart.split(' ');
        const [hours, minutes] = time.split(':');

        // Convert to 24-hour format
        let convertedHours = parseInt(hours);
        if (period === 'PM' && convertedHours !== 12) {
            convertedHours += 12;
        }
        if (period === 'AM' && convertedHours === 12) {
            convertedHours = 0;
        }

        return `${year}-${month}-${day}T${convertedHours.toString().padStart(2, '0')}:${minutes}:00`;
    };

    const imagestore = () => {
        const date1 = localStorage.getItem("date");
        httpClient.post('/vendor_car_list_guest', { token: '', date: date1 }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                setCarArray(result.data.data);
                setX(2);
            }
        });
    };

    const handleClick = (id) => {
        const date1 = localStorage.getItem("date");

        httpClient.post('/vendor_car_list_guest', { token: '', date: date1, model: id }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                setCarArray(result.data.data);
                setX(2);
            }
        });
    };

    const imagestore1 = () => {
        httpClient.post('/model_list', { token: token, car_id1: '' }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                setCarArray1(result.data.data);
            }
        });
    };

    useEffect(() => {
        imagestore();
        imagestore1();
        // Get the selected date range from localStorage
        const selectedDate = localStorage.getItem("date");
        setSelectedDateRange(selectedDate);
    }, []);

    const SubmitHandler = (e) => {
        e.preventDefault();
    };

    const listItems = carArray.map((val, key) => {
        let booking_status = val.booking_status;
        let suubmitvalue;
        let suubmitvalue1;

        if (booking_status === 1) {
            suubmitvalue = { 'display': 'none' }
            suubmitvalue1 = {
                'textAlign': 'center',
                'background': 'gray none repeat scroll 0 0',
                'position': 'relative',
                'zIndex': '1',
                'overflow': 'hidden',
                'width': '100%',
                'margin': '25px auto 0',
                'transition': 'all 0.4s ease 0s',
                'display': 'block'
            }
        } else {
            suubmitvalue = { 'display': 'block' }
            suubmitvalue1 = { 'display': 'none' }
        }

        // Calculate total hours and estimated price
        const totalHours = calculateTotalHours();
        const estimatedTotal = totalHours * parseFloat(val.price);

        return (
            <Col lg={4} key={key}>
                <div className="single-offers px-2">
                    <div className="offer-image">
                        <Link to="/car-booking">
                            <img src={'http://127.0.0.1:8000/' + val.image} alt="offer 1" />
                        </Link>
                    </div>
                    <div className="offer-text">
                        <Link to="/car-booking">
                            <h3>{val.car_name}&nbsp;{val.model_name}&nbsp;{val.variant_name}</h3>
                        </Link>

                        <div className="row g-3">
                            <div className="col-4 d-flex flex-column align-items-center">
                                <img src={MilageIcon} className="img-fluid me-2" width={"40"} alt="Mileage" />
                                <span>{val.avrage}</span>
                            </div>
                            <div className="col-4 d-flex flex-column align-items-center">
                                <img src={OilTypeIcon} className="img-fluid me-2" width={"40"} alt="Fuel Type" />
                                <span>{val.fuel_type}</span>
                            </div>
                            <div className="col-4 d-flex flex-column align-items-center">
                                <img src={SettingIcon} className="img-fluid me-2" width={"40"} alt="Transmission" />
                                <span>{val.transmission_type}</span>
                            </div>
                        </div>
                        <div className="feature-box">
                            <ul className="car-detail-list">
                                {val.car_features ? val.car_features.split(',').map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                )):''}
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <h4>
                                    ₹{val.price}<span>/Hour&nbsp;</span>
                                </h4>
                                {selectedDateRange && (
                                    <p className="text-muted">
                                        ₹{estimatedTotal.toFixed(2)}
                                        <small> ({totalHours} hrs)</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-5">
                                <Link
                                    onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                    to="/car-detail"
                                    className="btn btn-outline-danger"
                                >
                                    Book
                                </Link>
                            </div>
                        </div>

                        <div className="offer-action d-none" style={suubmitvalue}>
                            <Link
                                onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                to="/car-booking"
                                className="offer-btn-1"
                            >
                                Book Car
                            </Link>
                            <Link
                                onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                to="/car-detail"
                                className="offer-btn-2"
                            >
                                details
                            </Link>
                        </div>
                        <div className="offer-action" style={suubmitvalue1}>
                            <Link
                                className="offer-btn-1"
                            >
                                Booked
                            </Link>
                            <Link
                                onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                to="/car-detail"
                                className="offer-btn-2"
                            >
                                details
                            </Link>
                        </div>
                    </div>
                </div>
            </Col>
        )
    });

    const bts = x === 1 ? '' : listItems;

    const listItems1 = carArray1.map((val, key) => {
        return (
            <li key={key}><a onClick={() => handleClick(val.id)}>{val.model}<span></span></a></li>
        )
    });

    const total = carArray1.length;

    return (
        <Fragment>
            <Header />
            <section className="rent-drive-breadcromb-area section_70">
                <Container>
                    <Row>
                        <Header2 />
                        <Col md={12}>
                            <div className="breadcromb-box">
                                <h3>Car List</h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div>
                <section className="rent-drive-car-listing section_70">
                    <div className="container">
                        <button 
                            className={`open-close-sidebar border-danger d-lg-none d-block ${isOpenSidebar ? 'fixedTop' : ''}`} 
                            onClick={toggleSidebar}
                        >
                            {isOpenSidebar ? 'CLOSE' : 'FILTER'}
                        </button>

                        <div>
                            <FindCar />
                        </div>

                        <div className="row">
                            <div className="col-lg-9">
                                <div className="car-listing-right">
                                    <div className="car-grid-list">
                                        <div className="row">
                                            {bts}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={`filter-sidebar  ${isOpenSidebar ? 'mobile-sticky' : 'filter-d'}`}>
                                    <div className="car-list-left mt-3 ">
                                        <div className="sidebar-widget">
                                            <div className="box">
                                                <h3>All Brands</h3>
                                                <ul className="service-menu p-0">
                                                    <li className="active"><a onClick={() => handleClick(0)}>All Brands<span>{total}</span></a></li>
                                                    {listItems1}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car-list-left mt-3">
                                        <div className="sidebar-widget">
                                            <div className="box">
                                                <h3>Seats</h3>
                                                <ul className="service-menu p-0">
                                                    <li><a>4 Seater</a></li>
                                                    <li><a>5 Seater</a></li>
                                                    <li><a>7 Seater</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car-list-left mt-3">
                                        <div className="sidebar-widget">
                                            <div className="box">
                                                <h3>Transmission</h3>
                                                <ul className="service-menu p-0">
                                                    <li><a>Automatic</a></li>
                                                    <li><a>Manual</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car-list-left mt-3">
                                        <div className="sidebar-widget">
                                            <div className="box">
                                                <h3>Car Type</h3>
                                                <ul className="service-menu p-0">
                                                    <li><a>Hatchback</a></li>
                                                    <li><a>Scedan</a></li>
                                                    <li><a>CSUV</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Faq />
            </div>
            <Footer />
        </Fragment>
    );
};

export default CarList;