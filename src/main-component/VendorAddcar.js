import React, { Component, Fragment } from "react";
import { Row, Col, Alert, Container } from "react-bootstrap";
import { FaAngleRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from "../components/PanelSidebar";
import Form from "react-bootstrap/Form";
import { getToken, https } from "../components/AuthUser";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import config from "../config";


const CAR_FEATURES = [
   'Air Conditioning',
   'Power Windows',
   'Central Locking',
   'Airbags',
   'Music System',
   'Rear Parking Sensor',
   'Bluetooth',
   'USB Connectivity',
   'Leather Seats',
   'Touchscreen Infotainment',
   'GPS Navigation',
   'Keyless Entry'
];

class VendorAddCar extends Component {

   constructor(props) {
      super(props)

      this.car_image = React.createRef()
      this.owner_book = React.createRef()
      this.owner_book1 = React.createRef()
      this.owner_book2 = React.createRef()

      this.state = {
         setShow: false,
         message: '',
         messages: '',
         car_name: '',
         chechis_number: '',
         model: '',
         car_number: '',
         model_year: '',
         avrage: '',
         car_condition: '',
         color: '',
         modelprice: '',
         variant: '',
         vendor: '',
         file: '',
         file1: '',
         file2: '',
         file3: '',
         puc_valid_upto: '',
         registration_valid_upto: '',
         insurance_valid_upto: '',
         car_price: '',
         ceating_capacity: '',
         transmission_type: '',
         fuel_type: '',
         insurance_amount: '',
         security_deposit: '',
         car_features: [], // New state for multi-select features
         carArray: [],
         modalArray: [],
         varientArray: [],
         vendorArray: []
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleFeatureToggle = this.handleFeatureToggle.bind(this)
      this.token = getToken();
      this.https = https();




      this.Carlist = this.Carlist.bind(this)
      this.Vendorlist = this.Vendorlist.bind(this)

      this.https.post('/login_verify', { token: this.token }).then((result) => {
         if (result.data.status === 0) {
            window.location.replace('../logout');
            return true;
         }
      })
   }



   handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });

      if (target.name === 'file') { this.setState({ file: 1 }); }
      if (target.name === 'file1') { this.setState({ file1: 1 }); }
      if (target.name === 'file2') { this.setState({ file2: 1 }); }
      if (target.name === 'file3') { this.setState({ file3: 1 }); }

      if (name === 'car_name') { this.CarModallist(value); }
      if (name === 'model') { this.CarModalVariantlist(value); }




      if (name === 'model') { this.modalPrice(event.target.selectedOptions[0].getAttribute('price')); }


   }



   handleFileChange = (event) => {
      this.setState({
         selectedFile: event.target.files[0],
      });
   };

   handleFileChange1 = (event) => {
      this.setState({ file1: event.target.files[0] });
   };

   handleFileChange2 = (event) => {
      this.setState({ file2: event.target.files[0] });
   };


   handleFileChange3 = (event) => {
      this.setState({ file3: event.target.files[0] });
   };


   componentDidMount() {
      this.Carlist();
      this.Vendorlist();
   }

   handleFeatureToggle(feature) {
      this.setState(prevState => {
         const currentFeatures = prevState.car_features;
         const featureIndex = currentFeatures.indexOf(feature);

         if (featureIndex > -1) {
            // Remove feature if already exists
            return {
               car_features: currentFeatures.filter(f => f !== feature)
            };
         } else {
            // Add feature
            return {
               car_features: [...currentFeatures, feature]
            };
         }
      });
   }

   handleSubmit(event) {
      event.preventDefault();
      //var car_name = event.target.car_name.value;

      // const { selectedFile } = this.state;

      const formData = new FormData();
      formData.append('token', this.token);
      formData.append('car_id', this.state.car_name);
      formData.append('model_id', this.state.model);
      formData.append('variant_id', this.state.variant);
      formData.append('price', this.state.modelprice);
      formData.append('chechis_number', this.state.chechis_number);
      formData.append('car_number', this.state.car_number);
      formData.append('model_year', this.state.model_year);
      formData.append('avrage', this.state.avrage);
      formData.append('car_condition', this.state.car_condition);
      formData.append('color', this.state.color);
      formData.append('vendor', this.state.vendor);

      formData.append('ceating_capacity', this.state.ceating_capacity);
      formData.append('transmission_type', this.state.transmission_type);
      formData.append('fuel_type', this.state.fuel_type);
      formData.append('insurance_amount', this.state.insurance_amount);
      formData.append('security_deposit', this.state.security_deposit);

      formData.append('puc_valid_upto', this.state.puc_valid_upto);
      formData.append('registration_valid_upto', this.state.registration_valid_upto);
      formData.append('insurance_valid_upto', this.state.insurance_valid_upto);
      formData.append('car_price', this.state.car_price);
      formData.append('car_features', this.state.car_features.join(','));


      if (this.state.file === 1) {
         formData.append('image', this.car_image.current.files[0], this.car_image.current.files[0].na);
      }
      if (this.state.file1 === 1) {
         formData.append('image1', this.owner_book.current.files[0], this.owner_book.current.files[0].na);
      }
      if (this.state.file2 === 1) {
         formData.append('image2', this.owner_book1.current.files[0], this.owner_book1.current.files[0].na);
      }

      if (this.state.file3 === 1) {
         formData.append('image3', this.owner_book2.current.files[0], this.owner_book2.current.files[0].na);
      }

      //console.log(formData);

      // axios.post(`${config.BASE_URL}/add_vendor_car`, formData).then((result) => {
      //    let status = result.data.status;
      //    if (status === 1) {
      //       const MySwal = withReactContent(Swal);
      //       MySwal.fire('Successfully Added');
      //    } else {
      //       const MySwal = withReactContent(Swal);
      //       MySwal.fire(result.data.message);
      //    }
      // });

      this.https.post('/add_vendor_car', formData).then((result) => {
         let status = result.data.status;
         if (status === 1) {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Successfully Added');
         } else {
            const MySwal = withReactContent(Swal);
            MySwal.fire(result.data.message);
         }
      });

   }




   Carlist() {
      this.https.post('/car_list', { token: this.token }).then((result) => {
         let status = result.data.status;
         if (status === 1) {
            this.setState({
               carArray: result.data.data,
               modalArray: [],
               varientArray: []

            });


         } else {
            this.setState({
               carArray: [],
               modalArray: [],
               varientArray: []

            });

         }
      })
   }


   Vendorlist() {
      this.https.post('/vendor_list', { token: this.token }).then((result) => {
         let status = result.data.status;
         if (status === 1) {
            this.setState({
               vendorArray: result.data.data
            });
         } else {
            this.setState({
               vendorArray: []

            });

         }
      })
   }

   CarModallist(car_id) {
      this.https.post('/model_list', { token: this.token, car_id: car_id }).then((result) => {
         let status = result.data.status;
         if (status === 1) {
            this.setState({
               modalArray: result.data.data,
               varientArray: []
            });
         }
         else {
            this.setState({
               modalArray: [],
               varientArray: []

            });

         }
      })
   }


   CarModalVariantlist(model_id) {
      this.https.post('/varient_list', { token: this.token, model_id: model_id }).then((result) => {
         let status = result.data.status;
         if (status === 1) {
            this.setState({
               varientArray: result.data.data
            });
         } else {
            this.setState({
               varientArray: []

            });

         }
      })
   }

   modalPrice(price) {
      this.setState({
         modelprice: price
      });
   }


   render() {

      const listItems4 = this.state.vendorArray.map((val, key) => {
         return (
            <option value={val.id}>{val.name} ({val.mobile_number})</option>
         )
      });


      const listItems = this.state.carArray.map((val, key) => {
         return (
            <option value={val.id}>{val.car_name}</option>
         )
      });

      const listItems2 = this.state.modalArray.map((val, key) => {
         return (
            <option value={val.id}>{val.model}</option>
         )
      });



      const listItems3 = this.state.varientArray.map((val, key) => {
         return (
            <option value={val.id}>{val.variant}</option>
         )
      });





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
            pageTitle="Add Car"
            pagesub="Add Car"
        /> */}
            <section className="rent-drive-breadcromb-area section_70">
               <Container>
                  <Row>
                     <Header2 />
                     <Col md={12}>
                        <div className="breadcromb-box">
                           <h3>Add Car</h3>
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
                              <li> <Link to="/vendor-add-car">Add Car</Link> </li>
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
                              <p className="content-heading">ADD CAR</p>
                              <div className="tab-content">
                                 <div className="tab-pane active">
                                    <div className="profile-tab-container account-container">
                                       {msg}
                                       <Form onSubmit={this.handleSubmit} id="account_form" encType="multipart/form-data">
                                          <div className="form-section-0">


                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={4}></Col>

                                                   <Col md={4}>



                                                      <select
                                                         value={this.state.vendor}
                                                         onChange={this.handleChange}
                                                         name="vendor"

                                                         className="form-control"
                                                      >
                                                         <option value="">Select Vendor</option>
                                                         {listItems4}
                                                      </select>

                                                   </Col>


                                                </Row>

                                             </Form.Group>



                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Make</Form.Label>
                                                   </Col>
                                                   <Col md={4}>



                                                      <select
                                                         value={this.state.car_name}
                                                         onChange={this.handleChange}
                                                         name="car_name"

                                                         className="form-control"
                                                      >
                                                         <option value="">Select</option>
                                                         {listItems}
                                                      </select>

                                                   </Col>

                                                   <Col md={2}>
                                                      <Form.Label>Model</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <select
                                                         value={this.state.model}
                                                         onChange={this.handleChange}
                                                         name="model"

                                                         className="form-control"
                                                      >
                                                         <option value="">Select</option>
                                                         {listItems2}

                                                      </select>
                                                   </Col>

                                                </Row>

                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100 mb-5">

                                                   <Col md={2}>
                                                      <Form.Label>Variant</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <select
                                                         value={this.state.variant}
                                                         onChange={this.handleChange}
                                                         name="variant"

                                                         className="form-control"
                                                      >
                                                         <option value="">Select</option>
                                                         {listItems3}

                                                      </select>
                                                   </Col>

                                                   <Col md={2}>
                                                      <Form.Label>Chechis Number</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="chechis_number"
                                                         value={this.state.chechis_number}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>

                                                </Row>
                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Car Number</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="car_number"
                                                         value={this.state.car_number}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>

                                                   <Col md={2}>
                                                      <Form.Label>Model Year</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="model_year"
                                                         value={this.state.model_year}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>


                                                </Row>
                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100">


                                                   <Col md={2}>
                                                      <Form.Label>Car Average</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="avrage"
                                                         value={this.state.avrage}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>

                                                   <Col md={2}>
                                                      <Form.Label>Car Condition</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="car_condition"
                                                         value={this.state.car_condition}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>

                                                </Row>
                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={2}>
                                                      <Form.Label>Car Color</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="color"
                                                         value={this.state.color}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Vendor %</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="number"
                                                         name="price"
                                                         value={this.state.modelprice}
                                                         onChange={e => this.setState({ modelprice: e.target.value })}

                                                      />
                                                   </Col>




                                                </Row>
                                             </Form.Group>


                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={2}>
                                                      <Form.Label>Security Deposit</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="security_deposit"
                                                         value={this.state.security_deposit}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Insurance Amount</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="number"
                                                         name="insurance_amount"
                                                         value={this.state.insurance_amount}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>




                                                </Row>
                                             </Form.Group>


                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={2}>
                                                      <Form.Label>Fuel Type</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <select
                                                         name="fuel_type"
                                                         value={this.state.fuel_type}
                                                         onChange={this.handleChange}
                                                         className="form-control"
                                                      >
                                                         <option value="">Select</option>
                                                         <option value="Petrol">Petrol</option>
                                                         <option value="Diesel">Diesel</option>
                                                         <option value="EV">EV</option>
                                                      </select>
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Transmission Type</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <select

                                                         name="transmission_type"
                                                         value={this.state.transmission_type}
                                                         onChange={this.handleChange}
                                                         className="form-control"
                                                      >
                                                         <option value="">Select</option>
                                                         <option value="Automatic">Automatic</option>
                                                         <option value="Manual">Manual</option>

                                                      </select>
                                                   </Col>




                                                </Row>
                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={2}>
                                                      <Form.Label>Car Price</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="text"
                                                         name="car_price"
                                                         value={this.state.car_price}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>Insurance Valid Upto</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="date"
                                                         name="insurance_valid_upto"
                                                         value={this.state.insurance_valid_upto}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>

                                                   <Col md={2}>
                                                      <Form.Label>Seating Capacity *</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <select
                                                         name="ceating_capacity"
                                                         value={this.state.ceating_capacity}
                                                         onChange={this.handleChange}
                                                         className="form-control"
                                                      >

                                                         <option value="">Select</option>
                                                         <option value="8 Seater">8 Seater</option>
                                                         <option value="7 Seater">7 Seater</option>
                                                         <option value="6 Seater">6 Seater</option>
                                                         <option value="5 Seater">5 Seater</option>
                                                         <option value="4 Seater">4 Seater</option>
                                                         <option value="2 Seater">2 Seater</option>

                                                      </select>
                                                   </Col>




                                                </Row>
                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={2}>
                                                      <Form.Label>Registration Valid Upto</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="date"
                                                         name="registration_valid_upto"
                                                         value={this.state.registration_valid_upto}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>
                                                   <Col md={2}>
                                                      <Form.Label>PUC Valid Upto</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control
                                                         type="date"
                                                         name="puc_valid_upto"
                                                         value={this.state.puc_valid_upto}
                                                         onChange={this.handleChange}

                                                      />
                                                   </Col>




                                                </Row>
                                             </Form.Group>

                                             <Form.Group className="mb-5">

                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>PUC File</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control type="file" accept="image/*" name="file2" onChange={this.handleChange} ref={this.owner_book1} />
                                                   </Col>


                                                   <Col md={2}>
                                                      <Form.Label>Insurance File</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control type="file" accept="image/*" name="file3" onChange={this.handleChange} ref={this.owner_book2} />
                                                   </Col>
                                                </Row>
                                             </Form.Group>


                                             <Form.Group className="mb-5">

                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Car Image</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control type="file" accept="image/*" name="file" onChange={this.handleChange} ref={this.car_image} />
                                                   </Col>


                                                   <Col md={2}>
                                                      <Form.Label>RC Book</Form.Label>
                                                   </Col>
                                                   <Col md={4}>
                                                      <Form.Control type="file" accept="image/*" name="file1" onChange={this.handleChange} ref={this.owner_book} />
                                                   </Col>
                                                </Row>
                                             </Form.Group>
                                             <Form.Group className="mb-5">
                                                <Row className="w-100">
                                                   <Col md={2}>
                                                      <Form.Label>Car Features</Form.Label>
                                                   </Col>
                                                   <Col md={10}>
                                                      <div className="d-flex flex-wrap">
                                                         {CAR_FEATURES.map((feature) => (
                                                            <div key={feature} className="mr-3 mb-2">
                                                               <Form.Check
                                                                  type="checkbox"
                                                                  id={feature}
                                                                  label={feature}
                                                                  checked={this.state.car_features.includes(feature)}
                                                                  onChange={() => this.handleFeatureToggle(feature)}
                                                               />
                                                            </div>
                                                         ))}
                                                      </div>
                                                   </Col>
                                                </Row>
                                             </Form.Group>


                                             <Form.Group className="mb-5">

                                                <Row className="w-100">



                                                   <Col md={4} className="mx-auto">
                                                      <button type="submit" className="rent-drive-theme-btn">ADD NEW</button>
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

export default VendorAddCar;

