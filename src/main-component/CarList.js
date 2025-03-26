import React, { Fragment, Component, useState } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import FindCar from "../components/home/findcars";
import { Link } from "react-router-dom";
import Faq from "../components/home/Faq";
import SettingIcon from "../img/setting-cog.svg";
import OilTypeIcon from "../img/hybrid-car.svg";
import RoadIcon from "../img/road.svg";
import MilageIcon from "../img/milage.png";

import "../css/CarList.css";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Row, Col, Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff, FaCartPlus, FaUsers, FaUser, FaAngleRight, FaHome, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { getToken, https } from "../components/AuthUser";



class CarList extends Component {

    constructor(props) {
        super(props)
        this.token = getToken();
        this.https = https();

        this.state = {
            carArray: [],
            carArray1: [],
            isOpenSidebar: false,
            selectedDateRange: null
        };
        this.imagestore = this.imagestore.bind(this);
        this.imagestore1 = this.imagestore1.bind(this);

    }

    toggleSidebar = () => {
        this.setState({ isOpenSidebar: !this.state.isOpenSidebar });
    };

    componentDidMount() {
        this.imagestore();
        this.imagestore1();
        // Get the selected date range from localStorage
        const selectedDate = localStorage.getItem("date");
        this.setState({ selectedDateRange: selectedDate });
    }

    // Calculate total hours between two dates
    calculateTotalHours(dateRangeString) {
        if (!dateRangeString) return 0;

        // Split the date range string
        const [fromDateStr, toDateStr] = dateRangeString.split(' - ');

        // Create Date objects
        const fromDate = new Date(this.parseDateString(fromDateStr));
        const toDate = new Date(this.parseDateString(toDateStr));

        // Calculate time difference in hours
        const timeDiff = Math.abs(toDate - fromDate);
        const totalHours = timeDiff / (1000 * 60 * 60);

        return Math.ceil(totalHours);
    }

    // Helper method to parse date string from local format
    parseDateString(dateStr) {
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
    }

    imagestore() {
        const date1 = localStorage.getItem("date");
        let x = 1;
        this.https.post('/vendor_car_list_guest', { token: '', date: date1 }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                let x = 2;
                this.setState({
                    carArray: result.data.data,
                    x: x
                });
            }
        })
    }

    handleClick(id) {
        let x = 1;
        const date1 = localStorage.getItem("date");

        this.https.post('/vendor_car_list_guest', { token: '', date: date1, model: id }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                let x = 2;
                this.setState({
                    carArray: result.data.data,
                    x: x
                });
            }
        })
    }

    imagestore1() {
        this.https.post('/model_list', { token: this.token, car_id1: '' }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                this.setState({
                    carArray1: result.data.data
                });
            }
        })
    }

    render() {
        const SubmitHandler = (e) => {
            e.preventDefault();
        };

        const listItems = this.state.carArray.map((val, key) => {
            let booking_status = val.booking_status;
            let suubmitvalue;
            let suubmitvalue1;
            let action;
            if (booking_status === 1) {
                suubmitvalue = { 'display': 'none' }
                suubmitvalue1 = {
                    'text-align': 'center',
                    'background': 'gray none repeat scroll 0 0',
                    'position': 'relative',
                    'z-index': '1',
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
            const totalHours = this.calculateTotalHours(this.state.selectedDateRange);
            const estimatedTotal = totalHours * parseFloat(val.price);

            return (
                <Col lg={4}>
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
                                    <li>Audio input as</li>
                                    <li>Bluetooth</li>
                                    <li>Heated seats</li>
                                    <li>Pay at Pick-Up</li>
                                    <li>Budget Car</li>
                                    <li>Budget Car</li>
                                    <li>Chilled AC</li>
                                    <li>Automatic</li>
                                    <li>Free cancellation</li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    <h4>
                                        ₹{val.price}<span>/Hour&nbsp;</span>
                                    </h4>
                                    {this.state.selectedDateRange && (
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

        const bts = this.state.x === 1 ? '' : listItems

        const listItems1 = this.state.carArray1.map((val, key) => {
            return (
                <li><a onClick={this.handleClick.bind(this, val.id)} >{val.model}<span></span></a></li>
            )
        });

        const d = this.state.carArray1;
        const total = d.lenght;

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
                            <button className={` open-close-sidebar border-danger d-lg-none d-block ${this.state.isOpenSidebar ? 'fixedTop' : ''}`} onClick={this.toggleSidebar}>
                                {` ${this.state.isOpenSidebar ? 'CLOSE' : 'FILTER'}`}
                            </button>

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
                                    <div className={`filter-sidebar  ${this.state.isOpenSidebar ? 'mobile-sticky' : 'filter-d'}`}>
                                        <div className="car-list-left">
                                            <div className="sidebar-widget ">
                                                <div className="box">
                                                    <h3 className="text-uppercase">Booking Time</h3>
                                                    <FindCar />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="car-list-left mt-3 ">
                                            <div className="sidebar-widget">
                                                <div className="box">
                                                    <h3>All Brands</h3>
                                                    <ul className="service-menu p-0">
                                                        <li className="active"><a onClick={this.handleClick.bind(this, 0)}>All Brands<span>{total}</span></a></li>
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
    }
}

export default CarList;