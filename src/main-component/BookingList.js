import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/BookingList.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https } from "../components/AuthUser";
import Form from "react-bootstrap/Form";
import config from "../config";

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
            isLoading: false,
            vendor:'#99',
            messages:'',
            id:'',
            date1:'',
            date2:'',
          carArray: [],
          vendorArray:[]
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangep = this.handleChangep.bind(this)
        
      this.handleChange1 = this.handleChange1.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)


      localStorage.setItem('to_address','');
      localStorage.setItem('from','');
      localStorage.setItem('comment','');
        
      }
  
      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }
  
      imagestore() {


        this.https.post('/login_verify',{token:this.token}).then((result)=>{
            if(result.data.status === 0){ 
                const { navigate } = this.props;
                navigate("/logout");
            }
        })


          this.https.post('/user_booking_list',{token:this.token,vendor:this.state.vendor}).then((result)=>{
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

      handleClick(id) {

        const { navigate } = this.props;
        localStorage.setItem("bookingId", id);
        navigate("/edit-order");
        
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
            } else {

                this.setState({
                    carArray: []
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
   
        
         if(name==='date2' ){

        if(this.state.date1==='' ){

          
            this.setState({
                messages: 'Select start date first'
             });

        } else {

        
                this.https.post('/user_booking_list',{token:this.token,vendor:this.state.vendor,start:this.state.date1,end:this.state.date2}).then((result)=>{
                    let status=result.data.status; 
                    this.setState({
                        messages: result.data.message
                     });
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
      
       }
        
     }


     handleChangep(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        
        this.setState({
            [name]: value
         });
   
        
     

        
        this.https.post('/user_booking_list',{token:this.token,vendor:this.state.vendor,id:value}).then((result)=>{
            let status=result.data.status; 
            this.setState({
                messages: result.data.message
                });
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



     handleChange1(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
           [name]: value
        });
    
      }
    
    
      handleSubmit(event) {
        event.preventDefault();
    
        this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,type:'BList',vendor_id:this.state.vendor}).then((result)=>{
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
        const { isLoading } = this.state;
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

          
          let a=parseFloat(val.rent)-parseFloat(val.dis);	
          let b=a+parseFloat(val.ins_amt);
          let c=b+parseFloat(val.gst);
          let dis=parseFloat(val.dis2)


          if(dis>0){
            return (
                <tr key={key}>
                    <td data-label="S.No.">{i}.</td>
                    <td data-label="Regd No.">{val.car_number}</td>
                    <td data-label="Car Model"><img src={config.PUBLIC_URL+val.car_image} alt="offer 1" width="100"/></td>
                    <td data-label="Booking ID">BND{val.bid}{val.id}</td>
                    <td data-label="Booking Date">{val.fromTime}</td>
                    <td data-label="Location">{val.from_address} To {val.to_address}</td>
                    <td data-label="Booking Amount">
                      
                    <p>Rental Fee : {val.rent}</p>
  
                    <p>Discount {val.dis2} % : {val.dis}</p>
  
                    <p>Insurance Fee : {val.ins_amt}</p>
                    <p>Con. fee 5% : {val.gst}</p>
                    <p>Total Fee : {c}
                   
  
  
                    </p>
                      
                      
                      </td>
                    <td data-label="status">{val.fromTime} To {val.toTime}</td>
                    <td data-label="Action">
                    <button onClick={this.handleClickDownload.bind(this, val.id)} disabled={isLoading}>
                      {isLoading ? 'Downloading...' : 'Download'}
                      </button>
                      &nbsp;&nbsp;
                      <b className='bottoninfo' onClick={this.handleClick.bind(this, val.id)} >Edit</b>
                      </td>
                </tr>
            )

          } else {

            return (
                <tr key={key}>
                    <td data-label="S.No.">{i}.</td>
                    <td data-label="Regd No.">{val.car_number}</td>
                    <td data-label="Car Model"><img src={config.PUBLIC_URL+val.car_image} alt="offer 1" width="100"/></td>
                    <td data-label="Booking ID">BND{val.bid}{val.id}</td>
                    <td data-label="Booking Date">{val.fromTime}</td>
                    <td data-label="Location">{val.from_address} To {val.to_address}</td>
                    <td data-label="Booking Amount">
                      
                    <p>Rental Fee : {val.rent}</p>
  
                    <p>Insurance Fee : {val.ins_amt}</p>
                    <p>Con. fee 5% : {val.gst}</p>
                    <p>Total Fee : {c}
                   
  
  
                    </p>
                      
                      
                      </td>
                    <td data-label="status">{val.fromTime} To {val.toTime}</td>
                    <td data-label="Action">
                    <button onClick={this.handleClickDownload.bind(this, val.id)} disabled={isLoading}>
                      {isLoading ? 'Downloading...' : 'Download'}
                      </button>
                      &nbsp;&nbsp;
                      <b className='bottoninfo' onClick={this.handleClick.bind(this, val.id)} >Edit</b>
                      </td>
                </tr>
            )

          }
         
      });

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
                pageTitle="My Account"
                pagesub="My Account"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>BOOKING LIST</h3>
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
                                <li> <Link to="/booking-list">BOOKING LIST</Link> </li>
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
                        <p class="content-heading">BOOKINGS DETAILS</p>
                        <div class="tab-content">
                        <div class="tab-pane active">
                        {msg}
                        <Row className="w-100 mb-3 mt-3">
                        <Col md={2}></Col>
                       
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
                          

                           <Col md={6}>
                            <Row>
                            <Col md={5}>
                            <input type='date' className="form-control" name="date1" value={this.state.date1} onChange={this.handleChange} />
                            </Col>
                            <Col md={1}>To</Col>
                            <Col md={5}>
                            <input type='date' className="form-control " name="date2" value={this.state.date2} onChange={this.handleChange} />
                           </Col>

                            </Row>
                          </Col>
                           
               
                           </Row>

                           <center>
                        <Form onSubmit={this.handleSubmit} id="account_form">
                        <input type="text" placeholder="Enter Search value" 
                            value={this.state.searchData}
                            onChange={this.handleChange1}
                            name="searchData"
                           />
                        <button type="submit" style={{padding:'1px'}}>Serach</button>
                        </Form>
                        </center> 
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

