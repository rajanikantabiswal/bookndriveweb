import React, { Component, Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { getToken } from "./AuthUser";  
import { getUser } from "./AuthUser";
import {
    FaPowerOff,
    FaPhoneAlt,
    FaUserAlt,
} from "react-icons/fa";

import Logo from "../img/logo-main.png";
import globe from "../img/globe.png";
import clock from "../img/clock.png";
import "../css/header.css";
import TopHeader from './TopHeader';
import MenuIco from "../img/menu.svg";


let userData = getUser();
function Header() {
    const [isSHow, setIsShown] = useState(false);
    const ToggleMenu = () => {
        isSHow === true ? setIsShown(false) : setIsShown(true);
    }
    let LinkOne = "";
    let LinkTwo = "";
    if (userData) {
        LinkOne = (
            <Link to="/logout" className="nav-link">
            <FaPowerOff className="me-2"/> Logout{" "}
            </Link>
        );
        LinkTwo = (
            <Link to="/dashboard" className="nav-link">
            <FaUserAlt className="me-2" /> Dashboard{" "}
            </Link>
        );
    }else{
        LinkOne = (
            <Link to="/login" className="nav-link">
            <FaPowerOff className="me-2"/> Login{" "}
            </Link>
        );
        LinkTwo = (
            <Link to="/register" className="nav-link">
            <FaUserAlt className="me-2" /> Register{" "}
            </Link>
        );

    }


    return (
        <Fragment>

            <section className="rent-drive-header-top-area alls d-lg-block d-none">
                <Container >
                    <Row className='align-items-center  m-0 g-0'>
                        <Col>
                            <div className="header-top-left">
                                <Row>
                                    <Col>
                                        <Link to="/" className='logo-brand me-3'>
                                            <img src={Logo} alt="rent-drive" className='logo-top ' />
                                        </Link>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                        <Col className='d-none'>
                            {/* <Link className="text-dark" to="/login">Home</Link> */}

                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={ToggleMenu}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className={`collapse navbar-collapse ${isSHow == true ? 'show' : ''}`}>
                                    <ul className='navbar-nav'>
                                        <li> <Link to="/" className='logo-brand me-3'>Home</Link></li>





                                    </ul>

                                </div>
                            </nav>
                        </Col>
                        <Col>

                            <div className="header-top-right">

                                <TopHeader />

                                {/* <Link className="buttons" to="/host">
                                <FaUserAlt /> Become a Host
                            </Link> */}

                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

            <header className='mobile-header d-lg-none d-block rent-drive-header-top-area alls'>

                <nav className="navbar navbar-expand-lg position-relative">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={Logo} className="img-fluid" width={240} />
                        </Link>
                        <button className="navbar-toggler collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMainMenu" aria-controls="navbarMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <img src={MenuIco} className='menu-icon' alt="menu"/>
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarMainMenu">
                            <ul className="navbar-nav ms-auto mb-0 p-3">
                                    <li>{LinkOne}</li>
                                    <li>{LinkTwo}</li>
                                
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>

        </Fragment>
    );

};

export default Header;
