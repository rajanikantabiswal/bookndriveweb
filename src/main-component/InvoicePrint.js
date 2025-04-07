import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import "../css/BookingList.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https ,getUser} from "../components/AuthUser";
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
        
        this.state = {
            vendor:'#99',
          carArray: [],
          vendorArray:[]
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this)
        
      }
  
      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }
  
      imagestore() {
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

      

      handleClickDownload(id) {
        const { navigate } = this.props;
        localStorage.setItem("bidPrint", id);
        navigate("../invoice-print");
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
  
      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{
          i++;
          let sts='Paid';
          if(val.pay_status===1){ sts='Pending';}
          return (
              <tr key={key}>
                  <td>{i}.</td>
                  <td>{val.car_number}</td>
                  <td>{val.model_name}</td>
                  <td>{val.id}</td>
                  <td>{val.fromTime}</td>
                  <td>{val.from_address} To {val.to_address}</td>
                  <td>{val.rent}</td>
                  <td>{val.fromTime} To {val.toTime}</td>
                  <td>
                    <p class="bottoninfo" onClick={this.handleClickDownload.bind(this, val.id)}>Download</p>
                   
                    <p class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Payment</p>
                    
                    </td>
              </tr>
          )
      });

   
  
      return (
        <Fragment>
            <Header />
            <PageTitle
                pageTitle="My Account"
                pagesub="My Account"
            />
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
                <th>status</th>
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

