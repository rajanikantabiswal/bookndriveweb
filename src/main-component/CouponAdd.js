import React, { Component,Fragment } from "react";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from "../components/PanelSidebar";
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import config from "../config";


class VendorAddCar extends Component {

   constructor(props) {
      super(props)

      
      this.state = {
         car_name: '',
         model:'',
         variant: '',
         qty: '',
         sdate: '',
         edate: '',
         dis:''
             }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.token=getToken();
      this.https = https();

      
      this.state = {
        carArray: [],
        modalArray: [],
        varientArray:[]
      };

      this.Carlist = this.Carlist.bind(this)

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
         if(result.data.status === 0){ 
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
      if (name==='car_name') { this.CarModallist(value); }
      if (name==='model') { this.CarModalVariantlist(value); }

      if (name==='model') { this.modalPrice( event.target.selectedOptions[0].getAttribute('price') ); }
      
      
   }



   componentDidMount() {
      this.Carlist();
   }
  
   handleSubmit(event) {
   event.preventDefault();
    
      const formData= new FormData();
      formData.append('token',this.token);
      formData.append('make',this.state.car_name);
      formData.append('model',this.state.model);
      formData.append('variant',this.state.variant);
      formData.append('qty',this.state.qty);
      formData.append('sdate',this.state.sdate);
      formData.append('edate',this.state.edate);
      formData.append('dis',this.state.dis);
    


      axios.post(`${config.BASE_URL}/add_coupon`, formData).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
               const MySwal = withReactContent(Swal);
               MySwal.fire('Successfully Added');
           } else {
            const MySwal = withReactContent(Swal);
            MySwal.fire(result.data.message);
           }
      });

   }




   Carlist() {
      this.https.post('/car_list',{token:this.token}).then((result)=>{
         let status=result.data.status;
         if(status === 1){
            this.setState({
                  carArray: result.data.data,
                  modalArray: [],
                  varientArray:[]
                  
            });

            
         } else {
            this.setState({
               carArray: [],
               modalArray: [],
               varientArray:[]
               
         });

         }
      })
   }


   Vendorlist(){
      this.https.post('/vendor_list',{token:this.token}).then((result)=>{
         let status=result.data.status;
         if(status === 1){
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
    this.https.post('/model_list',{token:this.token,car_id:car_id}).then((result)=>{
        let status=result.data.status;
        if(status === 1){
            this.setState({
                modalArray: result.data.data,
                varientArray:[]
            });
        }
        else {
         this.setState({
            modalArray: [],
            varientArray:[]
            
      });

      }
    })
   }

   
   CarModalVariantlist(model_id) {
      this.https.post('/varient_list',{token:this.token,model_id:model_id}).then((result)=>{
          let status=result.data.status;
          if(status === 1){
              this.setState({
                  varientArray: result.data.data
              });
          }   else {
            this.setState({
               varientArray: []
               
         });
   
         }
      })
     }

   modalPrice(price){
     this.setState({
        modelprice: price
    });
   }
  

   render() {



      const listItems = this.state.carArray.map((val, key) =>{
          return (
            <option value={val.id}>{val.car_name}</option>
          )
      });

      const listItems2 = this.state.modalArray.map((val, key) =>{
        return (
          <option value={val.id}>{val.model}</option>
        )
    });



    const listItems3 = this.state.varientArray.map((val, key) =>{
      return (
         <option value={val.id}>{val.variant}</option>
      )
  });






      return (
        <Fragment>
        <Header />
     
        <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Add Coupon</h3>
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
                                <li> <Link to="/vendor-add-car">Add Coupon</Link> </li>
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
            <PanelSidebar/>
          </Col>
          <Col sm={6} md={8} lg={9}>
          <div className="tab-content-container">
            <p className="content-heading">ADD Coupon</p>
            <div className="tab-content">
              <div className="tab-pane active">
                <div className="profile-tab-container account-container">
                  <Form onSubmit={this.handleSubmit} id="account_form"  encType="multipart/form-data">
                    <div className="form-section-0">

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
                          
                          <Row className="w-100">

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
                             <Form.Label>Coupon Quantity</Form.Label>
                          </Col>
                          <Col md={4}>
                             <Form.Control
                                type="number"
                                name="qty"
                                value={this.state.qty}
                                onChange={this.handleChange}
                                
                             />
                          </Col>

                          </Row>

                   
                       </Form.Group>


                       <Form.Group className="mb-5">
                          
                          <Row className="w-100">
                         
                         

                          <Col md={2}>
                             <Form.Label>Start Date</Form.Label>
                          </Col>
                          <Col md={4}>
                          <Form.Control
                                type="date"
                                name="sdate"
                                value={this.state.sdate}
                                onChange={this.handleChange}
                                
                             />
                          </Col>
                          <Col md={2}>
                             <Form.Label>End Date</Form.Label>
                          </Col>
                          <Col md={4}>
                          <Form.Control
                                type="date"
                                name="edate"
                                value={this.state.edate}
                                onChange={this.handleChange}
                                
                             />
                          </Col>

                         

                          
                          
                          </Row>
                       </Form.Group>


                       <Form.Group className="mb-5">
                          
                          <Row className="w-100">
                         

                       <Col md={2}>
                             <Form.Label>Discount %</Form.Label>
                          </Col>
                          <Col md={4}>
                          <Form.Control
                                type="text"
                                name="dis"
                                value={this.state.dis}
                                onChange={this.handleChange}
                                
                             />
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

