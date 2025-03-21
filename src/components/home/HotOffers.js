import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { FaCar, FaCogs, FaTachometerAlt } from "react-icons/fa";
//import { getToken,https } from "../AuthUser";
import { getToken, https } from "../AuthUser";
import "../../css/HotOffers.css";
import moment from "moment"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Settings from "react-multi-date-picker/plugins/settings";
import SettingIcon from "../../img/setting-cog.svg";
import OilTypelIcon from "../../img/hybrid-car.svg";
import RoadIcon from "../../img/road.svg";

function NavigateWrapper() {
    
    const navigate = useNavigate();

    return <HotOffers navigate={navigate} />;
   
}

class HotOffers extends Component {

    constructor(props) {
        super(props)
        this.token = getToken();
        this.https = https();

        this.state = {
            carArray: []
        };
        this.imagestore = this.imagestore.bind(this);

    }

    componentDidMount() {
        this.imagestore()
    }

    imagestore() {
        this.https.post('/vendor_car_list_guest', { token: '' }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
                this.setState({
                    carArray: result.data.data
                });
            }
        })

    }

    handleClick(id) {
        localStorage.setItem('rent_id', id)


        const date1 = new Date();
        const date2 = new Date();

        date2.setDate(date2.getDate() + 1);

        const formattedDate = date1.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        const formattedDate2 = date2.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });



        const date = formattedDate + ' - ' + formattedDate2;
        const dates = date.replace('/', '/', '');

        const { navigate } = this.props;
        localStorage.setItem("date", dates);
        window.location.replace('/car-booking');
    }


    handleClick1(id) {

        localStorage.setItem('rent_id', id)


        const date1 = new Date();
        const date2 = new Date();

        date2.setDate(date2.getDate() + 1);

        const formattedDate = date1.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        const formattedDate2 = date2.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });



        const date = formattedDate + ' - ' + formattedDate2;
        const dates = date.replace('/', '/', '');

        const { navigate } = this.props;
        localStorage.setItem("date", dates);
        window.location.replace('/car-detail');
    }

    handleClicks = () => {
        window.scroll({
            top: 350,
            left: 0,
            behavior: 'smooth'
        });
    };
    render() {

        const SettingsSlider = {
            dots: true,
            arrows: false,
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 5000,
            
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        infinite: true,
                        centerMode: false,
                    },
                },
            ],
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
                <>
                    <div className="slide">
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
                            
                            <ul className="fw-bold">
                                <li>
                                    <img src={RoadIcon} className="img-fluid" />
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
                                    <li>Audio input</li>
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
                                <div className="col-6"> 
                                    <h4>
                                        {val.price} <span>/ HOUR&nbsp;</span>
                                    </h4></div>
                                <div className="col-6">
                                {/* <Link
                                    onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                    to="/car-detail"
                                    className="btn btn-outline-danger d-none"
                                >
                                    Rent
                                </Link> */}
                                 <a href="#MainSearch" className="btn btn-outline-danger p-2 scrollto"> Book Car</a>
                                
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
                    </div>
                    
                    
                
               
                </>
            )
        });



        return (
            <section className="rent-drive-offers-area section_70">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="site-heading">
                                {/* <h4>Come With</h4> */}
                                <h2>Find Your Perfect Drive!</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="offer-tabs" >
                                <Tabs
                                    defaultActiveKey="all"
                                    transition={true}
                                    id="uncontrolled-tab-example"
                                >
                                    {/* All Brands Start */}
                                    <Tab eventKey="all" title="">
                                        <Slider {...SettingsSlider}>
                                            {listItems}
                                        </Slider>
                                    </Tab>
                                    {/* All Brands End */}
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}



export default NavigateWrapper;




