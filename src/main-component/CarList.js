import React, { Fragment, Component, useState } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import FindCar from "../components/home/findcars";
import { Link } from "react-router-dom";
import Faq from "../components/home/Faq";
import SettingIcon from "../img/setting-cog.svg";
import OilTypelIcon from "../img/hybrid-car.svg";
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
            isOpenSidebar: false
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
    }

    imagestore() {
        // const from= localStorage.setItem("from",from);
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
            // localStorage.setItem("from",from);
            // localStorage.setItem("date",date);
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
            

            return (
                <Col lg={4}>
                    <div className="single-offers">
                        <div className="offer-image">
                            <Link to="/car-booking">
                                <img src={'http://127.0.0.1:8000/public/' + val.image} alt="offer 1" />
                            </Link>
                        </div>
                        <div className="offer-text pt-3">
                            <Link to="/car-booking">
                                <h3>{val.car_name}&nbsp;{val.model_name}&nbsp;{val.variant_name}</h3>
                            </Link>
                            
                            <ul className="fw-bold">
                                <li>
                                    <img src={MilageIcon} className="img-fluid" />
                                    {val.avrage} 
                                    
                                </li>
                                <li>
                                    <img src={OilTypelIcon} className="img-fluid" />
                                    {val.model_year}
                                </li>
                                <li>
                                    <img src={SettingIcon} className="img-fluid" />
                                     
                                     {val.transmission_type}
                                </li>
                               
                            </ul>
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
                                        {val.price} <span>/ HOUR&nbsp;</span>
                                    </h4></div>
                                <div className="col-5">
                                <Link
                                    onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                    to="/car-detail"
                                    className="btn btn-outline-danger"
                                >
                                    Rent
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
                {/* <PageTitle
            pageTitle="Car List"
            pagesub="car List"
        /> */}
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
                                                {/* <FindCar /> */}
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