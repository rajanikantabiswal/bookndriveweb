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
import config from "../../config";


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
                    <div className="car-card">
                        {/* Car Image with Badge */}
                        <div className="position-relative">
                            <Link to="/car-booking" className="d-block overflow-hidden" style={{ height: "200px" }}>
                                <img
                                    src={config.PUBLIC_URL + val.image}
                                    alt={`${val.car_name} ${val.model_name}`}
                                    className="img-fluid w-100 h-100 object-fit-contain"
                                />
                            </Link>
                            <span className="price-badge position-absolute badge rounded-pill px-3 py-2 top-0 end-0">
                                ₹{val.price}<small>/Hour</small>
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="card-body p-3">
                            {/* Car Title */}
                           
                            <Link to="/car-booking" className="text-decoration-none">
                                <h5 className="card-title fw-bold text-dark mb-3 text-truncate">
                                    {val.car_name} {val.model_name} {val.variant_name}
                                </h5>
                            </Link>

                            {/* Car Specs */}
                            <div className="row g-0 mb-3 spec-icons border-top border-bottom py-3">
                                <div className="col-4 text-center border-end">
                                    <img src={MilageIcon} className="mb-1" width={28} alt="Mileage" />
                                    <p className="mb-0 small">{val.avrage}</p>
                                </div>
                                <div className="col-4 text-center border-end">
                                    <img src={OilTypeIcon} className="mb-1" width={28} alt="Fuel Type" />
                                    <p className="mb-0 small">{val.fuel_type}</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img src={SettingIcon} className="mb-1" width={28} alt="Transmission" />
                                    <p className="mb-0 small">{val.transmission_type}</p>
                                </div>
                            </div>

                            {/* Features */}
                            {val.car_features && (
                                <div className="mb-3">
                                    <div className="d-flex flex-wrap gap-1">
                                        {val.car_features.split(',').slice(0, 4).map((feature, index) => (
                                            <span key={index} className="badge bg-light text-dark rounded-pill px-2 py-1">
                                                <i className="bi bi-check-circle-fill text-success me-1"></i>
                                                {feature.trim()}
                                            </span>
                                        ))}
                                        {val.car_features.split(',').length > 4 && (
                                            <span className="badge bg-light text-dark rounded-pill px-2 py-1">
                                                +{val.car_features.split(',').length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Footer */}
                        <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
                            <div className="d-grid gap-2">
                                <a
                                    href="#MainSearch"
                                    className="car-listing-btn"
                                >
                                    <i className="bi bi-calendar-check me-2"></i>Book Now
                                </a>
                                <Link
                                    to="/car-detail"
                                    onClick={(e) => localStorage.setItem('rent_id', val.id)}
                                    className="btn btn-outline-secondary rounded-pill"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        });



        return (

            <>
            <section>
                <div className="container py-5">
                    <div className="car-listing">
                        {listItems}
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/car-list" className="btn all-cars-btn rounded-pill px-4 py-2">
                            View All Cars
                        </Link>
                    </div>
                </div>
            </section>
            </>
        );
    }
}



export default NavigateWrapper;




