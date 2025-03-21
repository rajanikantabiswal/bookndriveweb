import React, { Component,Fragment } from "react";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from "../components/PanelSidebar";
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class VendorAddCar extends Component {

   constructor(props) {
      super(props)

      this.car_image = React.createRef()
      this.state = { setShow:false,message:'',car_name: '', model:'', varient:'', slab1:'', slab2:'', slab3:''}

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.token=getToken();
      this.https = https();

      
      this.state = {
        carArray: [],
        modalArray: []
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

      
      
      
   }

   componentDidMount() {
      this.Carlist();
   }
  
   handleSubmit(event) {
   event.preventDefault();
      //var car_name = event.target.car_name.value;
      const formData= new FormData();
      formData.append('token',this.token);
      formData.append('car_id',this.state.car_name);
      formData.append('model_id',this.state.model);
      formData.append('variant',this.state.variant);
      formData.append('slab1',this.state.slab1);
      formData.append('slab2',this.state.slab2);
      formData.append('slab3',this.state.slab3);

      this.https.post('/add_varient', formData).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
               const MySwal = withReactContent(Swal);
               MySwal.fire('Successfuly Updated');
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
                  carArray: result.data.data
                  
            });

            
         }
      })
   }

   CarModallist(car_id) {
    this.https.post('/model_list',{token:this.token,car_id:car_id}).then((result)=>{
        let status=result.data.status;
        if(status === 1){
            this.setState({
                modalArray: result.data.data
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
          <option value={val.id}> {val.model}</option>
        )
    });

      
      let msg='';
      if(this.state.message){
          msg=<Alert variant="success"  >
         {this.state.message}
      </Alert>
      }
      

      return (
        <Fragment>
        <Header />
        {/* <PageTitle
            pageTitle="Add Variant"
            pagesub="Add Variant"
        /> */}
        <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Add Variant</h3>
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
                                <li> <Link to="/add-variant">Add Variant</Link> </li>
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
            <p className="content-heading">ADD VARIANT</p>
            <div className="tab-content">
              <div className="tab-pane active">
                <div className="profile-tab-container account-container">
                   {msg}
                  <Form onSubmit={this.handleSubmit} id="account_form">
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
                           required
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
                           required
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
                             <Form.Control
                                type="text"
                                name="variant"
                                value={this.state.variant}
                                onChange={this.handleChange}
                                required
                             />
                          </Col>

                          <Col md={2}>
                             <Form.Label>Slab-1 Upto 12H</Form.Label>
                          </Col>
                          <Col md={4}>
                             <Form.Control
                                type="text"
                                name="slab1"
                                value={this.state.slab1}
                                onChange={this.handleChange}
                              
                             />
                          </Col>
                 
                          </Row>
                       </Form.Group>

                       <Form.Group className="mb-5">
                          
                          <Row className="w-100">
                         
                          <Col md={2}>
                             <Form.Label>Slab-2 Upto 24H</Form.Label>
                          </Col>
                          <Col md={4}>
                             <Form.Control
                                type="text"
                                name="slab2"
                                value={this.state.slab2}
                                onChange={this.handleChange}
                               
                             />
                          </Col>

                          <Col md={2}>
                             <Form.Label>Slab-3 More than 24H</Form.Label>
                          </Col>
                          <Col md={4}>
                             <Form.Control
                                type="text"
                                name="slab3"
                                value={this.state.slab3}
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

