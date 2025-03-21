import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container } from "react-bootstrap";
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
      
      this.state = { car_number:'',customer_name:'',booking_date:'',return_date:'',booking_time:'',refunded_by_name:'',date:'',time:'',recieve:'',chalan:'',reason:'',allok:'',rstatus:'',messages:'',cancel_amount:0,cancel:2,disnone: 0}
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

      if(value==='Offline'){ 

        this.setState({
            disnone: 1
         });
      } 

      if(value==='Online'){ 

        this.setState({
            disnone: 0
         });
      }
    }
  
    handleSubmit(event) {
      event.preventDefault();
      
      
     
         this.https.post('/update_status',{
            token:this.token,
            table:'vendorcars',
            id:this.state.id,
            book:69,
            cancel_amount:this.state.cancel_amount,
            cancel:this.state.cancel,
            d_amount:this.state.d_amount,
            why:this.state.why,
            mode:this.state.mode,
            txnid:this.state.txnid
        }).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
            const MySwal = withReactContent(Swal);
            MySwal.fire('Process Complete');
            this.imagestore()
            } else{
                let message=result.data.message; 
                const MySwal = withReactContent(Swal);
                MySwal.fire(message);

            }
        })

 
   
    }


    imagestore = async () => {
        const id=localStorage.getItem("bookingId");
        const result =  await this.https.post('/user_booking_list',{token:this.token,id:id,return:1});
    
       const orderid= 'BND'+result.data.data.bid+result.data.data.id;
      
       this.setState({
           orderid: orderid,
           id: id,
           date: result.data.data.rdate,
           time: result.data.data.rtime,
           recieve: result.data.data.recieve,
           chalan: result.data.data.chalan,
           reason: result.data.data.reason,
           allok:result.data.data.allok,
           rstatus:result.data.data.rstatus,
           car_number: result.data.data.car_number,
           customer_name: result.data.data.customer_name,
           booking_date: result.data.data.booking_date,
           return_date: result.data.data.return_date,
           booking_time: result.data.data.booking_time,
           refunded_by_name: result.data.data.refunded_by_name,
           cancel: result.data.data.cancel,
           cancel_amount :result.data.data.cancel_amount,
           d_amount:result.data.data.d_amount,
           why:result.data.data.why,
           mode:result.data.data.mode,
           txnid:result.data.data.txnid,
           disnone:result.data.data.mode==='Online'?0:1
        });

    
     };
  
 
   render() {
    
  

    const dis = {'display':'none'};
    const dis1 = {'display':'block'};
    const display = this.state.cancel === 3 ? dis : dis1;

    const { disnone } = this.state;
    const disnones = disnone === 0 ? dis1 : dis;

   
      return (
        <Fragment>
            <Header />
           
             <section className="rent-drive-breadcromb-area section_70">

<Container>
   <Row>
   <Header2 />
      <Col md={12}>
         <div className="breadcromb-box">
            <h3>Process Cancelation</h3>
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
               <li>  <Link to="/dashboard">Process Cancelation</Link></li>
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
                    <p className="content-heading">Process Cancelation</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                     
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
                               
                                <Col md={2}>
                                    <Form.Label>Refund Amount</Form.Label>
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Control
                                      type="text"
                                      name="cancel_amount"
                                      value={this.state.cancel_amount}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>
                               
                                </Row>



                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Diduction Amount</Form.Label>
                                </Col>
                                <Col md={4}>
                                <Form.Control
                                      type="text"
                                      name="d_amount"
                                      value={this.state.d_amount}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>
                               
                                <Col md={2}>
                                    <Form.Label>Why Diducted</Form.Label>
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Control
                                      type="text"
                                      name="why"
                                      value={this.state.why}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>
                               
                                </Row>



                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Refunded Mode</Form.Label>
                                </Col>
                                <Col md={4}>
                                <select
                                      type="text"
                                      name="mode"
                                      value={this.state.mode}
                                      onChange={this.handleChange}
                                      className="form-control"
                                >
                                    <option value="">Select Mode</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                                     </Col>
                               
                                <Col md={2} style={disnones}>
                                    <Form.Label>Txn ID</Form.Label>
                                </Col>
                                <Col md={4} style={disnones}>
                                    
                                    <Form.Control
                                      type="text"
                                      name="txnid"
                                      value={this.state.txnid}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>


                                     
                               
                                </Row>


                                <Row className="w-100 mb-5">
                                <Col md={2}>
                                    <Form.Label>Refund Initiated</Form.Label>
                                </Col>
                                <Col md={4}>
                                    <select
                                        type="text"
                                        name="cancel"
                                        value={this.state.cancel}
                                        onChange={this.handleChange}
                                        className="form-control"
                                     >
                                        <option value="2">Yes</option>
                                        <option value='1'>No</option>
                                        </select>
                                </Col>
                                </Row>

                                
                                </Form.Group>

                                
                            </div>
                        
                            <div className="" style={display}>
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
                                <Col md={4} className="mx-auto">
                                    <button type="submit" className="rent-drive-theme-btn ">Cancel Booking</button>
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
