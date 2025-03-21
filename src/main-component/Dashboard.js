import React, { Fragment, Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col, Alert, Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff, FaCartPlus, FaUsers, FaUser, FaAngleRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import { getUser } from '../components/AuthUser';
import { getToken, https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Dashboard extends Component {

   constructor(props) {
      super(props)
      this.token = getToken();
      this.https = https();
      this.userData = getUser();

      this.state = { name: this.userData.name, mobile_number: this.userData.mobile_number, email: this.userData.email, address: this.userData.address, message: '',notify:0,notify2:0 };
      this.handleSubmit = this.handleSubmit.bind(this)
      this.imagestore = this.imagestore.bind(this);

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
         if(result.data.status === 0){ 
             window.location.replace('../logout'); 
           return true;
         }
        })

   }

   componentDidMount() {
      this.imagestore()
   }

   imagestore() {
      if (this.userData.role === 1) {



         this.https.post('/checkstatus', {
            token: this.token,
            type: 1
         }).then((result) => {
            let status = result.data.status;
            if (status === 1) {
               const MySwal = withReactContent(Swal);
               MySwal.fire(result.data.mesage);
            }
         })


       


      }
   }
   handleSubmit(event) {
      event.preventDefault();

     
      var address = event.target.address.value;

      this.https.post('/update_account', { token: this.token, address: address, }).then((result) => {
         let status = result.data.status;

         if (status === 1) {
            sessionStorage.setItem('user', JSON.stringify(result.data.data))
            this.setState({
               messages: 'Successfully Updated'
            });

         } else {
            this.setState({
               messages: result.data.message
            });
         }
      })
   }



   render() {

      let msg = '';
      if (this.state.messages) {
         msg = <Alert variant="success"  >
            {this.state.messages}
         </Alert>
      }

     

      return (
         <Fragment>
            <Header />
            
            {/* <PageTitle
            pageTitle="My Account"
            pagesub="My Account"
        /> */}
            <section className="rent-drive-breadcromb-area section_70">

               <Container>
                  <Row>
                  <Header2 />
                     <Col md={12}>
                        <div className="breadcromb-box">
                           <h3>My Profile</h3>
                           <ul>
                              <li>
                                 <FaHome />
                              </li>
                              <li>
                                 <Link to="/dashboard">Home</Link>
                              </li>
                              <li>
                                 <FaAngleRight />
                              </li>
                              <li>  <Link to="/dashboard">My Account</Link></li>
                           </ul>
                        </div>
                     </Col>
                  </Row>
               </Container>
            </section>
            <div>
               <div className="page page-profile">
                  <div className="profile-inner-container">

                     <Row>
                        <Col sm={6} md={4} lg={3}>
                           <PanelSidebar />
                        </Col>
                        <Col sm={6} md={8} lg={9}>
                           <div className="tab-content-container">
                              <p className="content-heading">MY PROFILE</p>
                              <div className="tab-content">
                                 <div className="tab-pane active">
                                    <div className="profile-tab-container account-container">
                                       {msg}
                                       <Form onSubmit={this.handleSubmit} id="account_form">
                                          <div className="form-section-0">
                                             <p className="account-heading">Account Details</p>
                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Email</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="email"
                                                         value={this.state.email}
                                                         name="email"
                                                         onChange={e => this.setState({ email: e.target.value })}
                                                         disabled
                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Mobile</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="mobile_number"
                                                         id="mobile_number"
                                                         value={this.state.mobile_number}

                                                         disabled />
                                                   </Col>
                                                </Row>
                                             </Form.Group>
                                          </div>
                                          <div className="form-section-0">
                                             <p className="account-heading">Personal Details</p>
                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Name</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         value={this.state.name}
                                                         name="name"
                                                         onChange={e => this.setState({ name: e.target.value })}
                                                         disabled
                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Address</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         id="address"
                                                         name="address"
                                                         value={this.state.address}
                                                         onChange={e => this.setState({ address: e.target.value })}

                                                      />
                                                   </Col>
                                                </Row>
                                             </Form.Group>
                                          </div>
                                          <div className="form-section">


                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={4} className="mx-auto">
                                                      <button type="submit" className="rent-drive-theme-btn">UPDATE</button>
                                                   </Col>
                                                </Row>
                                             </Form.Group>
                                          </div>
                                          <div className="err-msg"></div>
                                       </Form>
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

export default Dashboard;

