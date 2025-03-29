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
import OilTypeIcon from "../../img/hybrid-car.svg";
import RoadIcon from "../../img/road.svg";
import MilageIcon from "../../img/milage.png";

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
            arrows: true,  // Enable arrows
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            
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
        
        // Custom Previous Arrow Component
        function CustomPrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div
                    className={`${className} custom-prev-arrow`}
                    style={{ ...style, display: "block", background: "gray" }}
                    onClick={onClick}
                />
            );
        }
        
        // Custom Next Arrow Component
        function CustomNextArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div
                    className={`${className} custom-next-arrow`}
                    style={{ ...style, display: "block", background: "gray" }}
                    onClick={onClick}
                />
            );
        }
        const listItems = this.state.carArray.slice(0, 8).map((val, key) => {

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
                    <div className="single-offers px-2 col-md-4 col-lg-3">
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
                                <div className="col-6"> 
                                    <h4>
                                    ₹{val.price}<span>/Hour&nbsp;</span>
                                    </h4></div>
                                <div className="col-6">
                                {/* <Link
                                    onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                    to="/car-detail"
                                    className="btn btn-outline-danger d-none"
                                >
                                    Rent
                                </Link> */}
                                 <a href="#MainSearch" className="btn btn-outline-danger px-4 py-2 scrollto"> Book</a>
                                
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
                    <div className="row">
                        {listItems}
                    </div>
                </Container>
            </section>
        );
    }
}



export default NavigateWrapper;




