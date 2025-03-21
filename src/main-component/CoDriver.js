import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col } from "react-bootstrap";
import "../css/Co-Driver.css";
import PanelSidebar from '../components/PanelSidebar';


class CoDriver extends Component {
  
   render() {
      return (
        <Fragment>
            <Header />
            <PageTitle
                pageTitle="My Account"
                pagesub="My Account"
            />
    <div>
      <div class="page page-profile">
        <div class="profile-inner-container">
          <Row>
          <Col sm={6} md={4} lg={3}>
            <PanelSidebar/>
          </Col>
          <Col sm={6} md={8} lg={9}>
            <div className="tab-content-container">
            <p class="content-heading">CO-DRIVERS</p>
            <div class="tab-content">
              <div class="tab-pane active">
                <div class="profile-tab-container account-container">
                
                </div>
              </div>
            </div>
            </div>
          </Col>
          </Row>
        </div>
      </div>
    </div>
    <Footer />
        </Fragment>
    )
   }
 }

export default CoDriver;

