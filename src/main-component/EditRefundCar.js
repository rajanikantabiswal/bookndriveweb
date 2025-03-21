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
      
      this.state = { car_number:'',customer_name:'',booking_date:'',return_date:'',booking_time:'',refunded_by_name:'',date:'',time:'',amount:'',damount:'',why:'',messages:''}
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
            table:'vendorcars',
            id:this.state.id,
            book:2,
            date:this.state.date,
            time:this.state.time,
            amount:this.state.amount,
            damount:this.state.damount,
            why:this.state.why
        
        }).then((result)=>{

           
             const MySwal = withReactContent(Swal);
             MySwal.fire('Successfully Refund');

             this.imagestore();
        })

 
   
    }


    imagestore = async () => {
        const id=localStorage.getItem("refundorderId");
        const result =  await this.https.post('/user_booking_list',{token:this.token,id:id});
    
       const orderid= 'BND'+result.data.data.bid+result.data.data.id;
      
   
     
       this.setState({
           orderid: orderid,
           id: id,
           date: result.data.data.rdate,
           time: result.data.data.rtime,
           amount: result.data.data.ramount,
           damount: result.data.data.damount,
           why: result.data.data.why,
           rstatus:result.data.data.rstatus,
           car_number: result.data.data.car_number,
           customer_name: result.data.data.customer_name,
           booking_date: result.data.data.booking_date,
           return_date: result.data.data.return_date,
           booking_time: result.data.data.booking_time,
           refunded_by_name: result.data.data.refunded_by_name
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
           
                 <section className="rent-drive-breadcromb-area section_70">

<Container>
   <Row>
   <Header2 />
      <Col md={12}>
         <div className="breadcromb-box">
            <h3>Booking Refund</h3>
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
               <li>  <Link to="/dashboard">Booking Refund</Link></li>
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
                    <p className="content-heading">Booking Refund</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Booking No</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.orderid}
                                      readonly
                                    />
                                 </Col>
                                <Col md={2}>
                                    <Form.Label>Car Number</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.car_number}
                                      readonly
                                    />
                                
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Customer Name</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      value={this.state.customer_name}
                                      readonly
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Booking Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                    
                                   
                                    <Form.Control
                                      value={this.state.booking_date}
                                      readonly
                                    />
                                </Col>
                            
                               
                                </Row>

                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Return Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                     <Form.Control
                                      value={this.state.return_date}
                                      readonly
                                    /></Col>
                               
                                <Col md={2} style={{'display':'none'}}>
                                    <Form.Label>Recieved By</Form.Label>
                                </Col>
                                <Col md={4} style={{'display':'none'}}>
                                    
                                    <Form.Control
                                      value={this.state.refunded_by_name}
                                      readonly
                                    />
                                     </Col>
                               
                                </Row>


                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Actual Return Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Actual Return Time</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="time"
                                        name="time"
                                        value={this.state.time}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                
                               
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Refunded Amount</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="amount"
                                        value={this.state.amount}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Deduction Amount</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="damount"
                                        value={this.state.damount}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                
                            
                               
                                </Row>

                                <Row className="w-100">
                                <Col md={2}>
                                    <Form.Label>Why Deducted</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="why"
                                        value={this.state.why}
                                        onChange={this.handleChange}
                                        
                                    />
                                </Col>

                               
                                </Row>
                                
                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="" style={display}>
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
                                <Col md={4} className="mx-auto">
                                    <button type="submit" className="rent-drive-theme-btn ">Save</button>
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
