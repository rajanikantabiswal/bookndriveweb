import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/BookingList.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https,getUser } from "../components/AuthUser";
import withReactContent from 'sweetalert2-react-content';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
let userData=getUser();
class BookingList extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        
        this.state = {
            vendor:userData.id,
        show: false,
          carArray: [],
          vendorArray:[],
          totals:0,
          disnone: 1
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

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

      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }

    
  
      imagestore() {
        const vendor=localStorage.getItem("vendorPayId");
        this.https.post('/user_payment_list',{token:this.token,user_id:vendor}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
                
            }
        })
          
      }

      handleClose = () => {
        this.setState({ show: false });
      };



      handleClick(id) {

        this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id,book:2}).then((result)=>{
            this.imagestore();
        })
        
      }
  
      Vendorlist(){
        this.https.post('/vendor_list',{token:this.token}).then((result)=>{
           let status=result.data.status;
           if(status === 1){
               this.setState({
                 vendorArray: result.data.data
               });
           }
       })
     }
      
      handleFileChange = (event) => {
      
        this.https.post('/user_payment_list',{token:this.token,user_id:this.state.vendor}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
                
            }
        })
        };


        handleShow = () => {

            this.setState({ show: true });
    
           
    
    
          };
     
      
          
          handleSubmit(event) {
            event.preventDefault();
    
            const vendor=localStorage.getItem("vendorPayId");
           
           
               this.https.post('/vendorPay',{
                  token:this.token,
                  vendor:vendor,
                  amount:this.state.amount,
                  mode:this.state.mode,
                  desc:this.state.desc,
                  txnid:this.state.txnid
              
              }).then((result)=>{
      
                let status = result.data.status;
                let message = result.data.message;
    
                if (status === 1) {
                const MySwal = withReactContent(Swal);
                MySwal.fire('Payment Success');
                this.setState({ show: false });
                this.imagestore();
                } else {
    
                    const MySwal = withReactContent(Swal);
                    MySwal.fire(message);
                }
      
                   
              })
      
       
         
          }
      
  
     render() {
  
        const listItems4 = this.state.vendorArray.map((val, key) =>{
            return (
              <option value={val.id}>{val.name} ({val.mobile_number})</option>
            )
        });  

      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{
          i++;
  
          return (
              <tr key={key}>
                  <td data-label="S.No.">{i}.</td>
                  <td data-label="Date">{val.created_at}</td>
                  <td data-label="Description">{val.note}</td>
                  <td data-label="Pre Balance">{val.pre_amt}</td>
                  <td data-label="Amount">{val.amt}</td>
                  <td data-label="Balane">{val.balance}</td>
              </tr>
          )
      });

      const { show } = this.state; 
      const dis = {'display':'none'};
    const dis1 = {'display':'block'};

    const { disnone } = this.state;
    const disnones = disnone === 0 ? dis1 : dis;
  
      return (

     
        
        <Fragment>

            
<>
     

     <Modal show={show} onHide={this.handleClose}>
        <center>
            <Modal.Body>
            <Form onSubmit={this.handleSubmit} id="account_form">
                            <div className="form-section-0">
                            
                                <Form.Group className="mb-5">
<center><h4>Vendor Payment</h4></center>
                                <Row className="w-100 mb-5">
                              
                              


                                 <Row className="w-100 mb-5">
                              
                                <Col md={6}>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                      type="text"
                                      name="amount"
                                      value={this.state.amount}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>
                               
                               
                                <Col md={6}>
                                <Form.Label>Desc.</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="desc"
                                      value={this.state.desc}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>
                               
                                </Row>



                                <Row className="w-100 mb-5">
                              
                                <Col md={6}>
                                <Form.Label>Pay Mode</Form.Label>
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
                               
                                <Col md={6} style={disnones}>
                                <Form.Label>Txn ID</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="txnid"
                                      value={this.state.txnid}
                                      onChange={this.handleChange}
                                      className="form-control"
                                    />
                                     </Col>


                                     
                               
                                </Row>
                                </Row>
                                </Form.Group>

                                
                            </div>
                            <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="success" onClick={this.handleSubmit}>
                Paynow
              </Button>
                            <div className="err-msg"></div>
                        </Form>
             
            </Modal.Body>
            </center>
          </Modal>
        </>
            <Header />
            {/* <PageTitle
                pageTitle="My Account"
                pagesub="My Account"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Passbook</h3>
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
                                <li> <Link to="/my-passbook">Passbook</Link> </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
                <div>
                <div class="page page-profile">
                    <div class="profile-inner-container">
                    <Row>
                    <Col sm={6} md={4} lg={3}>
                        <PanelSidebar/>
                    </Col>
                    <Col sm={6} md={8} lg={9}>
                        <div className="tab-content-container">
                        <p class="content-heading">PASSBOOK   <a onClick={this.handleShow.bind(this, 1)} className="rent-drive-theme-btn ">Pay Now</a></p>
                        <div class="tab-content">
                        <div class="tab-pane active">

                        
                        <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Description</th>
                <th>Pre Balance</th>
                <th>Amount</th>
                <th>Balane</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
                </tbody>
            </Table>
           
                        </div>
                        </div>
                        </div>
                    </Col>
                    </Row>
                    </div>
                </div>
                </div>
            <Footer/>
        </Fragment>
    )
   }
 }

export default BookingList;

