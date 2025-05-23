import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class VehicalAdd extends Component {

   constructor(props) {
      super(props)

      this.car_image = React.createRef()
      
      this.state = { name: '' ,mobile_number:'',email:'',address:'',messages:'',account:'',ifsc:'',bank:''}
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
        this.imagestore();
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
      const id=localStorage.getItem("vendorEditId");
      const formData= new FormData();
      formData.append('token',this.token);
      formData.append('name',this.state.name);
      formData.append('email',this.state.email);
      formData.append('mobile_number',this.state.mobile_number);
      formData.append('address',this.state.address);
      formData.append('account',this.state.account);
      formData.append('ifsc',this.state.ifsc);
      formData.append('bank',this.state.bank);
      formData.append('id',id);
      

      this.https.post('/vendor_add', formData).then((result)=>{
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


    imagestore = async () => {
        const id=localStorage.getItem("vendorEditId");
        const result =  await this.https.post('/data_with_id',{token:this.token,table:'customers',id:id});
    
      
      
      // result.data.data.city;
       this.setState({
           name: result.data.data.name,
           email: result.data.data.email,
           mobile_number: result.data.data.mobile_number,
           address: result.data.data.address,
           account: result.data.data.account,
           ifsc: result.data.data.ifsc,
           bank: result.data.data.bank
        });
    
     };
  

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
                pageTitle="Vendor Update"
                pagesub="Vendor Update"
            /> */}

<section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Vendor Update</h3>
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
                                <li> <Link to="/vendor-add-car">Vendor Update</Link> </li>
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
                    <p className="content-heading">Vendor Update</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">
                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Name</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Email</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Phone</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="mobile_number"
                                        value={this.state.mobile_number}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Address</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100">
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
                                <Col md={2}>
                                    <Form.Label>Bank Name</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="bank"
                                        value={this.state.bank}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>
                            
                               
                                </Row>
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="">
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
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

export default VehicalAdd;
