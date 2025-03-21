import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container,Table  } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/BookingList.css";
import "../css/datatable.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https ,getUser} from "../components/AuthUser";
import $ from "jquery";
import   'datatables.net';
import Form from "react-bootstrap/Form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let userData=getUser();

function NavigateWrapper() {
    const navigate = useNavigate();
    return <BookingList1 navigate={navigate} />;
}

class BookingList1 extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        this.inputRef = React.createRef();

        this.state = {
            isLoading: false,
            vendor:'#99',
            carArray: [],
            vendorArray:[],
            searchData:'',
            show: false,
            cancelId:''
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
      }

    
     
      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }
  
      imagestore() {

        this.https.post('/login_verify',{token:this.token}).then((result)=>{
            if(result.data.status === 0){ 
              const { navigate } = this.props;
              navigate("../logout"); 
              return true;
            }
           })

          this.https.post('/user_booking_list',{token:this.token,vendor:userData.id}).then((result)=>{
              let status=result.data.status; 
              if(status === 1){
                  this.setState({
                      carArray: result.data.data
                  });
              }


             

          })
          
      }

      handleClickEdit(id) {
        const { navigate } = this.props;
        localStorage.setItem("bid", id);
        navigate("../pay-status");
      }

      handleClickCancel() {
        this.setState({ show: false });
        this.https.post('/update_status',{token:this.token,table:'orders',id:this.state.cancelId,cancel:1,book:65}).then((result)=>{
           
            if(result.data.status === 1){
                const MySwal = withReactContent(Swal);
                MySwal.fire('You have initiated the cancelation process and get notified once it get the aproval from admin.');
             }
             this.imagestore();
        })
      }
      

      handleClickDownload(id) {
       
        this.https.post('/invoice',{id:id}).then((result)=>{
            const url=result.data.data;
            const link = document.createElement('a');
            link.href = url;
            link.download = id+'.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            
          
        })
  
      }


      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({
           [name]: value
        });
      };

  
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
        this.setState({ vendor: event.target.value });
       
        this.https.post('/user_booking_list',{token:this.token,vendor:event.target.value}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
        };

       
          
        handleSubmit(event) {
            event.preventDefault();
      
            this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,type:'customerBooking'}).then((result)=>{
                let status=result.data.status; 
                if(status === 1){
                    this.setState({
                        carArray: result.data.data
                    });
                } else {

                    this.setState({
                        carArray: []
                    });
                }
  
            })
         
          }

        
     
          handleClose = () => {
            this.setState({
                cancelId: ''
            });
            this.setState({ show: false });
          };
        
          handleShow = (id) => {
  
            this.setState({
                cancelId: id
            });
            
           this.setState({ show: true });
          };
  
     render() {


       
      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{ 
          i++; 
          let sts='Paid';
          if(val.pay_status===1){ sts='Pending';}
          const bts = val.cancel === 0 ? 'bottonsuccess' : val.cancel === 1 ? 'bottoninfo' :  'bottoninfo' ;
          const title = val.cancel === 0 ? 'Cancel-Booking?' : val.cancel === 1 ? 'Pending': 'Canceled';

          const dis = {'display':'none'};
          const dis1 = {'display':'block'};
          const dis2 = val.cancel === 0 ? dis1 : val.cancel === 1 ? dis : dis;
          const dis6 = val.cancel === 0 ? dis : val.cancel === 1 ? dis1 : dis1;

          return (
              <tr key={key}>
                  <td data-label="S.No.">{i}.</td>
                  <td data-label="Regd No.">{val.car_number}</td>
                  <td data-label="Car Model">{val.model_name}</td>
                  <td data-label="Booking ID">{val.id}</td>
                  <td data-label="Booking Date">{val.fromTime}</td>
                  <td data-label="Location">{val.from_address} To {val.to_address}</td>
                  <td data-label="Booking Amount">{val.rent}</td>
                  <td data-label="status">{val.fromTime} To {val.toTime}</td>
                  <td data-label="Cancel Booking"> 
                    {/* <b style={dis2} className={bts} onClick={this.handleClickCancel.bind(this, val.id)} >{title}</b> */}
                    <b style={dis2} className={bts} onClick={this.handleShow.bind(this, val.id)} >{title}</b>
                    
                    
                    
                    <b style={dis6} >{title}</b>
                    </td>
                  <td data-label="Action">
                   
                    <button onClick={this.handleClickDownload.bind(this, val.id)} disabled={isLoading}>
                    {isLoading ? 'Downloading...' : 'Download'}
                    </button>

                    

                    {/* <p class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Payment</p> */}
                    
                    </td>

                    
              </tr>
          )
          
      });

      const { isLoading } = this.state;
      const { show } = this.state;
      
       
     
  
  
      return (
        <Fragment>

<>
     

        <Modal show={show} onHide={this.handleClose}>
      <center>
          <Modal.Body>
            <h4>You really want to cancel your order?</h4>
            <Button variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button variant="success" onClick={this.handleClickCancel.bind(this, this.state.cancelId)}>
              Yes
            </Button>
          </Modal.Body>
          
           
         
          </center>
        </Modal>
      </>
            <Header />
            {/* <PageTitle
                pageTitle="Home"
                pagesub="My Booking"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>My Booking</h3>
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
                                <li>  <Link to="/booking-list">My Booking</Link></li>
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
                        <p class="content-heading">MY BOOKINGS</p>
                        <div class="tab-content">
                        <div class="tab-pane active">

             
                        <center>
                        <Form onSubmit={this.handleSubmit} id="account_form">
                        <input type="text" placeholder="Enter Search value" 
                            value={this.state.searchData}
                            onChange={this.handleChange}
                            name="searchData"
                           />
                        <button type="submit" style={{padding:'1px'}}>Serach</button>
                        </Form>
                        </center>
                            
                    
                      
                        <Table striped bordered hover >
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Regd No.</th>
                <th>Car Model</th>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Booking Amount</th>
                <th>status</th>
                <th>Cancel Booking</th>
                <th>Action</th>
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

export default NavigateWrapper;

