import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
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



function NavigateWrapper() {
    const navigate = useNavigate();

    return <VehicalAdd navigate={navigate} />;
}
class VehicalAdd extends Component {

   constructor(props) {
      super(props)


      this.car_image = React.createRef()
      
      this.state = { car_number:'',vendor_name:'',last_service:'',next_service:'',odo_meter:'',puc_expiry:'',insurance_expiry:'',vendor_inform:'',vendor_inform_date:''}
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
     
         this.https.post('/update_status',{
            token:this.token,
            table:'car_servive',
            id:this.state.id,
            book:4,
            last_service:this.state.last_service,
            next_service:this.state.next_service,
            odo_meter:this.state.odo_meter,
            puc_expiry:this.state.puc_expiry,
            insurance_expiry:this.state.insurance_expiry,
            vendor_inform:this.state.vendor_inform,
            vendor_inform_date:this.state.vendor_inform_date
        
        }).then((result)=>{
            const MySwal = withReactContent(Swal);
            MySwal.fire('Successfully Updated');
            const { navigate } = this.props;
            navigate("../edit-service");
        })

 
   
    }


    imagestore = async () => {
        const id=localStorage.getItem("serviceId");
        const result =  await this.https.post('/vendor_car_list',{token:this.token,id:id,vendor_id:''});
    
       this.setState({
           id: id,
           car_number:result.data.data.car_number,
           vendor_name:result.data.data.vendor_name,
           last_service:result.data.data.last_service,
           next_service:result.data.data.next_service,
           odo_meter:result.data.data.odo_meter,
           puc_expiry:result.data.data.puc_valid_upto,
           insurance_expiry:result.data.data.insurance_valid_upto,
           vendor_inform:result.data.data.vendor_inform,
           vendor_inform_date:result.data.data.vendor_inform_date
        });

    
     };
  
 
   render() {
    
    let display={};

    if(this.state.rstatus){
      
        display={};

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
          

<section className="rent-drive-breadcromb-area section_70">

<Container>
   <Row>
   <Header2 />
      <Col md={12}>
         <div className="breadcromb-box">
            <h3>Car Service</h3>
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
               <li>  <Link to="/dashboard">Car Service</Link></li>
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
                    <p className="content-heading">Car Service</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Car No</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.car_number}
                                      readonly
                                    />
                                 </Col>
                                <Col md={2}>
                                    <Form.Label>Vendor Name</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.vendor_name}
                                      readonly
                                    />
                                
                                </Col>
                            
                               
                                </Row>



                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Last Service Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="date"
                                        name="last_service"
                                        value={this.state.last_service}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Next Service Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="date"
                                        name="next_service"
                                        value={this.state.next_service}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                
                               
                                </Row>
                                
                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>ODO Meter</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                        type="text"
                                        name="odo_meter"
                                        value={this.state.odo_meter}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                               
                                <Col md={2}> 
                                    <Form.Label>PUC Expiry</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="date"
                                        name="puc_expiry"
                                        value={this.state.puc_expiry}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Insurance Expiry</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                        type="date"
                                        name="insurance_expiry"
                                        value={this.state.insurance_expiry}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                
                                <Col md={2}> 
                                    <Form.Label>Vendor Inform</Form.Label>
                                </Col>
                                <Col md={4}>
                                <select
                                        type="text"
                                        name="vendor_inform"
                                        value={this.state.vendor_inform}
                                        onChange={this.handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="" >Select</option>
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>
                                        </select>
                                </Col>
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Vendor Inform Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                        type="date"
                                        name="vendor_inform_date"
                                        value={this.state.vendor_inform_date}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                
                                </Row>

                               
                                
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="" style={display}>
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
                                <Col md={4} className="mx-auto">
                                    <button type="submit" className="rent-drive-theme-btn ">UPDATE</button>
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
