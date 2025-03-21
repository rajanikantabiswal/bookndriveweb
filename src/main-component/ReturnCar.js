import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
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
import { getToken,https } from "../components/AuthUser";
import Form from "react-bootstrap/Form";

function NavigateWrapper() {
    const navigate = useNavigate();

    return <BookingList navigate={navigate} />;
}

class BookingList extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        
        this.state = {
            vendor:'#99',
          carArray: [],
          vendorArray:[],
          searchData:''
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
  
      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }
  
      imagestore() {
          this.https.post('/user_booking_list',{token:this.token,vendor:this.state.vendor}).then((result)=>{
              let status=result.data.status; 
              if(status === 1){
                  this.setState({
                      carArray: result.data.data
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

        // this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id,book:2}).then((result)=>{
        //     this.imagestore();
        // })
        
      }

      handleClickEdit(id) {
        const { navigate } = this.props;
        localStorage.setItem("returnorderId", id);
        navigate("../edit-return");
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
        
            this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,type:'ReturnCarList',vendor_id:this.state.vendor}).then((result)=>{
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
          const bts1= val.refunded_by_name === '' ? 'bottoninfo':'bottonsuccess'
          const title1= val.refunded_by_name === '' ?   'Return':'Returned'

            return (
                <tr key={key}>
                    <td data-label="S.No.">{i}.</td>
                    <td data-label="Booking ID">BND{val.bid}{val.id}</td>
                    <td data-label="Car Number">{val.car_number}</td>
                    <td data-label="Customer Name">{val.customer_name}</td>
                    <td data-label="Booking Date/Time">{val.booking_date}</td>
                    <td data-label="Return Date/Time">{val.return_date}</td>
                    <td data-label="Recieved By">{val.refunded_by_name}</td>
                    <td data-label="Action">
                        &nbsp;&nbsp;
                        <b className={bts1} onClick={this.handleClickEdit.bind(this, val.id)} >{title1}</b></td>
                </tr>
            )
         
      });

   
  
      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="Car Return"
                pagesub="Car Return"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Car Return</h3>
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
                                <li> <Link to="/return-car">Car Return</Link> </li>
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
                        <p class="content-heading">Car Return</p>
                        <div class="tab-content">
                        <div class="tab-pane active">

                        <Row className="w-100 mb-3 mt-3">
                           <Col md={4}></Col>
                         
                           <Col md={4}>

                            

                           <select 
                           value={this.state.vendor}
                           onChange={this.handleFileChange}
                           name="vendor"
                           required
                           className="form-control"
                           >
                           <option selected value="#99">Select Vendor</option>
                           <option value="">All Booking</option>
                           {listItems4}
                           </select>

                           </Col>
                        

                           </Row>
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
                        <Table striped bordered hover>
                    <thead>
                <tr>
                  <th>S.No.</th>
                  <td>Booking ID</td>
                  <td>Car Number</td>
                  <td>Customer Name</td>
                  <td>Booking Date/Time</td>
                  <td>Return Date/Time</td>
                  <td>Recieved By</td>
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

