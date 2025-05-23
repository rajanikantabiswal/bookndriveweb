import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row,Col,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome, FaCogs, FaTachometerAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { getToken,https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import config from "../config";

class VehicalAdd extends Component {

   constructor(props) {
      super(props)

      this.car_image = React.createRef()
      
      this.state = { car_name: '',city: '',message:'',type:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.token=getToken();
      this.https = https();
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

    // imagestore() {
    //     const id=localStorage.getItem("cityEditId");
    //     this.https.post('/data_with_id',{token:this.token,table:'cities',id:id}).then((result)=>{
            
    //         const dd=result.json();
    //         console.log('kps',dd.data.city);

    //     })

        
         
    // }


    imagestore = async () => {
        const id=localStorage.getItem("cityEditId");
        const result =  await this.https.post('/data_with_id',{token:this.token,table:'cities',id:id});
       // result.data.data.city;
        this.setState({
            car_name: result.data.data.city,
            type: result.data.data.type
         });
         
      };


  

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });

      
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const id=localStorage.getItem("cityEditId");
      const formData= new FormData();
      formData.append('token',this.token);
      formData.append('city',this.state.car_name);
      formData.append('id',id);
      

      axios.post(`${config.BASE_URL}/add_city`, formData).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
              
                 const MySwal = withReactContent(Swal);
                 MySwal.fire('Successfully Updated');
                 
            } else {
         
                 const MySwal = withReactContent(Swal);
                 MySwal.fire(result.data.message);
            }
      });
   
    }
  

   render() {

    
     

 

      return (
        <Fragment>
            <Header />
            
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Pickup/Drop Address</h3>
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
                                <li> <Link to="/my-list-car">Pickup/Drop Address</Link> </li>
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
                    <p className="content-heading">Pickup/Drop Address</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                       
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">
                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Address</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="car_name"
                                        value={this.state.car_name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            
                                <Col md={2}>
                              <Form.Label>Type</Form.Label>
                           </Col>
                           <Col md={4}>

                            

                           <select 
                           value={this.state.type}
                           onChange={this.handleChange}
                           name="type"
                           required
                           className="form-control"
                           >
                           <option value="1">Pickup Address</option>
                           <option value="2">Drop Address</option>
                          
                           </select>

                           </Col>
                               
                                </Row>
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="flot-left">
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                                <Col md={4} className="mx-auto">
                                    <button type="submit" className="rent-drive-theme-btn">Update</button>
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

export default VehicalAdd;
