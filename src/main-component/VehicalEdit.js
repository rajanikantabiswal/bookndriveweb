import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Alert,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import Form from "react-bootstrap/Form";
import { getToken,https } from "../components/AuthUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class VehicalEdit extends Component {

   constructor(props) {
      super(props) 

      this.car_image = React.createRef()
      this.state = { car_name: '' ,messages:'',description:''}

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

    imagestore = async () => {
        const id=localStorage.getItem("carEditId");
        const result =  await this.https.post('/data_with_id',{token:this.token,table:'cars',id:id});
       // result.data.data.city;
        this.setState({
            car_name: result.data.data.car_name,
            description: result.data.data.description
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

      const id=localStorage.getItem("carEditId");
      const formData = new FormData();
      formData.append('token',this.token);
      formData.append('car_name',this.state.car_name);
      formData.append('description',this.state.description);
     // formData.append('image', this.car_image.current.files[0], this.car_image.current.files[0].name);
     formData.append('id',id);

     this.https.post('/add_car', formData).then((result)=>{
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
                            <h3>Update Make</h3>
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
                                <li> <Link to="/add-car">Make</Link> </li>
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
                    <p className="content-heading">ADD MAKE</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-3">
                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Make Name</Form.Label>
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
                                    <Form.Label>Make Description</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>

                                <Col md={2} style={{display:'none'}}>
                                    <Form.Label>Make Image</Form.Label>
                                </Col>
                                <Col md={4} style={{display:'none'}}>
                                    <Form.Control type="file" accept="image/*" ref={this.car_image}  />
                                </Col>

                               
                                </Row>
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="">
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                                <Col md={2} ></Col>
                                <Col md={4} className="">
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

export default VehicalEdit;
