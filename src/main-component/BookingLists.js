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
let userData=getUser();
class BookingList extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        
        this.state = {
            vendor:userData.id,
          carArray: [],
          vendorArray:[],
          totals:0
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this)
        
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
       
          this.https.post('/user_booking_list',{token:this.token,vendor:this.state.vendor}).then((result)=>{
              let status=result.data.status; 
              if(status === 1){
                  this.setState({
                      carArray: result.data.data,
                      totals:result.data.totalCom
                  });

                 
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
     
       
      
  
     render() {
  
        const listItems4 = this.state.vendorArray.map((val, key) =>{
            return (
              <option value={val.id}>{val.name} ({val.mobile_number})</option>
            )
        });  

      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{
          i++;
  
          const sts= val.pay_status === 1 ? 'Pending' : 'Paid'
          const bts1= val.status === 0 ? 'bottonsuccess' : 'bottoninfo'
          const title1= val.status === 0 ? 'Refunded' : 'RefundNow'


          return (
              <tr key={key}>
                  <td data-label="S.No.">{i}.</td>
                 
                  <td data-label="Regd No.">{val.car_number}</td>
                  <td data-label="Car Model">{val.model_name}</td>
                  <td data-label="Booking ID">BND{val.bid}{val.id}</td>
                  <td data-label="Booking Date">{val.fromTime}</td>
                  <td data-label="Location">{val.from_address} To {val.to_address}</td>
                  <td data-label="Booking Amount">{val.rent}</td>
                  <td data-label="Comission">{val.com}</td>
                  <td data-label="Paid">{val.paid}</td>
                  <td data-label="Paid date">{val.crreated_at}</td>
                  <td data-label="Paid By">{val.customer_name}</td>
                  <td data-label="status">{val.fromTime} To {val.toTime}</td>
                  <td data-label="Downloads">
                    --
                    {/* &nbsp;&nbsp;
                    <b className={bts1} onClick={this.handleClick.bind(this, val.id)} >{title1}</b> */}
                    </td>
              </tr>
          )
      });

       
  
      return (

     
        
        <Fragment>
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
                            <h3>Booking List</h3>
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
                                <li> <Link to="/my-booking-list">Booking List</Link> </li>
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
                        <p class="content-heading">BOOKINGS LIST</p>
                        <div class="tab-content">
                        <div class="tab-pane active">

                        
                        <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                {/* <th>Car Image</th> */}
                <th>Regd No.</th>
                <th>Car Model</th>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Booking Amount</th>
                <th>Comission</th>
                <th>Paid</th>
                <th>Paid date</th>
                <th>Paid By</th>
                <th>status</th>
                <th>Downloads</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
                </tbody>
            </Table>
            <center>Total : {this.state.totals}</center>
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

