import React, { Component,Fragment } from 'react';
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
    FaPhoneAlt,
    FaUserAlt,
} from "react-icons/fa";

import Logo from "../img/Bookndrive_logo_white.png";
import globe from "../img/globe.png";
import clock from "../img/clock.png";
import "../css/header.css";
import TopHeader from './TopHeader';



class Header extends Component {
 
    render() {
  
    
    return (
        <Fragment>
    
    <header className="rent-drive-main-header-area bgs">
        <Container>
            
        <Row>
                <Col md={12} >
                    <div className="site-logo"  >
                        <Link to="/">
                            <img src={Logo} alt="rent-drive"  className='logo-top'/>
                        </Link>
                    </div>
                
                    <div className="header-action">
                        <Link to="/host">
                            <FaUserAlt /> Become a Host
                        </Link>
                    </div>
                </Col>
            </Row>
            
        </Container>
    </header>

           
           
        </Fragment>
    );
}
};

export default Header;
