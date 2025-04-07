import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Alert,Container } from "react-bootstrap";
import { FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import config from "../config";


function NavigateWrapper() {
    const navigate = useNavigate();

    return <VehicalAdd navigate={navigate} />;
}
class VehicalAdd extends Component {

   constructor(props) {
      super(props)
      this.state = { photo:1,idcard:1,license:1,profile:'',messages:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.token=getToken();
      this.https = https();
      this.imagestore = this.imagestore.bind(this);
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
      const id=localStorage.getItem("verifyCustomer");
         this.https.post('/update_status',{
            token:this.token,
            table:'customers',
            id:id,
            profile:this.state.profile,
            book:5
        
        }).then((result)=>{
           
           const MySwal = withReactContent(Swal);
            MySwal.fire('Successfuly Updated');

          window.location.replace('list-customer');
        })

 
   
    }


    imagestore = async () => {
        const id=localStorage.getItem("verifyCustomer");
        const result =  await this.https.post('/customer_list_id',{token:this.token,id:id});
    
        const img1=config.PUBLIC_URL+result.data.data.license;
        const img2=config.PUBLIC_URL+result.data.data.idcard;
        const img3=config.PUBLIC_URL+result.data.data.photo;
   
     
       this.setState({
           id: id,
           name: result.data.data.name,
           email: result.data.data.email,
           phone: result.data.data.phone,
           profile: result.data.data.profile,
           mobile_number: result.data.data.mobile_number,
           address: result.data.data.address,
           license: img1,
           idcard: img2,
           photo: img3,

        });

    
     };
  
 
   render() {
    
    let display={};

    if(this.state.rstatus){
      
        display={display:'none'};

    }
  


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
                pageTitle="Verify Customer"
                pagesub="Verify Customer"
            /> */}

<section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Verify Customer</h3>
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
                                <li>  <Link to="/verification">Verify Customer</Link></li>
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
                    <p className="content-heading">Verify Customer</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Customer Name</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.name}
                                      readonly
                                    />
                                 </Col>
                                <Col md={2}>
                                    <Form.Label>Email</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.email}
                                      readonly
                                    />
                                
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Phone</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.mobile_number}
                                      readonly
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Address</Form.Label>
                                </Col>
                                <Col md={4}>
                                    
                                   
                                    <Form.Control
                                      value={this.state.address}
                                      readonly
                                    />
                                </Col>
                            
                               
                                </Row>

                                </Form.Group>

                                <Form.Group className="mb-5">
                                <Row className="w-100 mb-5">
                                <Col md={1}></Col>
                                <Col md={3}>
                                 <a href={this.state.photo} target="_blank"><img src={this.state.license}/></a>
                                </Col>

                                <Col md={1}></Col>
                                <Col md={3}>
                                 <a href={this.state.photo} target="_blank"><img src={this.state.idcard}/></a>
                                </Col>


                                <Col md={1}></Col>
                                <Col md={3}>
                                 <a href={this.state.photo} target="_blank"><img src={this.state.photo}/></a>
                                </Col>
                               </Row>
                               </Form.Group>
                            </div>
                        
                            <div className="" style={display}>
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                                <Col md={4} className="mx-auto">
                                <select
                                        name="profile"
                                      value={this.state.profile}
                                      className="form-control"
                                      onChange={this.handleChange}
                                    >

                                    <option value=''>Select Profile Status</option>
                                    <option value='0'>Not Verified</option>
                                    <option value='1'>Update</option>
                                    <option value='2'>Verified</option>
                                        </select>
                                </Col>
                                <Col md={4} className="mx-auto">
                                    <button type="submit" className="rent-drive-theme-btn ">Update Now</button>
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

export default NavigateWrapper;
