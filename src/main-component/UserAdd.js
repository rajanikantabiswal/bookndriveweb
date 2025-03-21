import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//const MySwal = withReactContent(Swal);
//MySwal.fire(result.data.message);

class VehicalAdd extends Component {

   constructor(props) {
      super(props)

      this.car_image = React.createRef()
      
      this.state = { name: '' ,mobile_number:'',email:'',address:'',messages:'',account:'',ifsc:'',bank:'',role:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.token=getToken();
      this.https = https();
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

      
    }
  
    handleSubmit(event) {
      event.preventDefault();

      const formData= new FormData();
      formData.append('token',this.token);
      formData.append('name',this.state.name);
      formData.append('email',this.state.email);
      formData.append('mobile_number',this.state.mobile_number);
      formData.append('address',this.state.address);
      
     
      if(this.state.account===''){
        formData.append('account','');
      } else {
        formData.append('account',this.state.account);
      }

      if(this.state.ifsc===''){
        formData.append('ifsc','');
      } else {
        formData.append('ifsc',this.state.ifsc);
      }


      if(this.state.bank===''){
        formData.append('bank','');
      } else {
        formData.append('bank',this.state.bank);
      }

      if(this.state.role===''){
        formData.append('role','');
    
      } else {
        formData.append('role',this.state.role);
      }

      

      if(this.state.role===''  || this.state.address==='' || this.state.mobile_number==='' || this.state.email==='' || this.state.name===''){
        const MySwal = withReactContent(Swal);
        MySwal.fire('Please Feed Required Inputs');
      } else {
      this.https.post('/vendor_add', formData).then((result)=>{
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
   
    }
  

   
   render() {

   
    let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }

      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="User Add"
                pagesub="User Add"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>User Add</h3>
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
                                <li> <Link to="/add-user">User Add</Link> </li>
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
                    <p className="content-heading">User Add</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">
                                <Row className="w-100 ">
                                <Col md={2}>
                                    <Form.Label>Name  *</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Email *</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Phone *</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="mobile_number"
                                        value={this.state.mobile_number}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Address *</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                                </Row>
                                <Row className="w-100" style={{'display':'none' }}>
                                <Col md={2}>
                                    <Form.Label>Account No.</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="account"
                                        value={this.state.account}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>

                                <Col md={2}>
                                    <Form.Label>IFSC Code</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="ifsc"
                                        value={this.state.ifsc}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                                </Row>
                                <Row className="w-100">
                               
                                <Col md={2} style={{'display':'none' }}>
                                    <Form.Label>Bank Name</Form.Label>
                                </Col>
                                <Col md={4} style={{'display':'none' }}>
                                    <Form.Control
                                        type="text"
                                        name="bank"
                                        value={this.state.bank}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                            
                                <Col md={2}>
                                    <Form.Label>Role *</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <select
                                        type="text"
                                        name="role"
                                        value={this.state.role}
                                        onChange={this.handleChange}
                                        className="form-control"
                                     >
                                        <option value="">Select  Role</option>
                                        <option value="1">Super Admin</option>
                                        <option value='4'>Admin</option>
                                        </select>
                                </Col>

                                </Row>
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="">
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
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

export default VehicalAdd;
