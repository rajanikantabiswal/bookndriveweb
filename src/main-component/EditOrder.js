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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";


function NavigateWrapper() {
    const navigate = useNavigate();

    return <VehicalAdd navigate={navigate} />;
}
class VehicalAdd extends Component {

   constructor(props) {
      super(props)

      let now = new Date();
      let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
      let end = moment(start).add(30, "days").subtract(1, "seconds");
      this.car_image = React.createRef()
      
      this.state = { 
        car_number:'',
        customer_name:'',
        booking_date:'',
        return_date:'',
        booking_time:'',
        refunded_by_name:'',
        date:'',
        time:'',
        recieve:'',
        chalan:'',
        reason:'',
        allok:'',
        rstatus:'',
        messages:'',
        show: false,
        fromdate:'',
        fromtime:'',
        selectedDate: null,
        selectedDate2: null,
        types: null,
        type1: {'display':'none'},
        type2: {'display':'none'},
        mins:new Date()
    }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleDateChange2 = this.handleDateChange2.bind(this);
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
  

  
  // Handle date selection
  handleDateChange(date) {


    const date1 = new Date(date);
    const date2 = new Date();

    const year1 = date1.getFullYear();
    const month1 = date1.getMonth()+1;
    const day1 = date1.getDate();
    const hours1 = date1.getHours(); 

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth()+1;
    const day2 = date2.getDate();
    const hours2 = date2.getHours(); 

   
    const ab1=year1+month1+day1;
    const ab2=year2+month2+day2;

    this.setState({
      selectedDate2: null,
    });

    // if (this.state.selectedDate2!=null && this.state.selectedDate2 < date) {

    //   alert('ok');
    //   const MySwal = withReactContent(Swal);
    //   MySwal.fire('Invalid Selected From-date');

    //   localStorage.setItem("formattedDate", '');
      
    //   this.setState({
    //     selectedDate: null,
    //   });

      

    // } else {


     
      if(ab1===ab2 && hours1===0){

        
       
        const ndate=year1+'-'+month1+'-'+day1+' '+hours2+':00:00';
        const date12 = new Date(ndate);
        
        localStorage.setItem("formattedDate", date12);

        const todayselected = new Date(date12);
        todayselected.setHours(todayselected.getHours() + 12);

        localStorage.setItem("formattedDate2", todayselected);

        this.setState({
          selectedDate: date12,
          selectedDate2: todayselected,
        });
      } else {
        
        
        if(ab1===ab2){
       
          if(hours2<=hours1){

            localStorage.setItem("formattedDate", date);
        
            const todayselected = new Date(date);
            todayselected.setHours(todayselected.getHours() + 12);
            localStorage.setItem("formattedDate2", todayselected);
            this.setState({
              selectedDate: date,
              selectedDate2: todayselected,
            });
           
          } else {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Invalid From Time');
          }
        } else {

          if(hours1===0){
          const ndate=year1+'-'+month1+'-'+day1+' 01:00:00';
          const date12 = new Date(ndate);
          localStorage.setItem("formattedDate", date12);
        
          const todayselected = new Date(date12);
          todayselected.setHours(todayselected.getHours() + 12);
          localStorage.setItem("formattedDate2", todayselected);
          this.setState({
            selectedDate: date12,
            selectedDate2: todayselected,
          });
          } else {
            const date12 = new Date(date);
            localStorage.setItem("formattedDate", date12);
        
            const todayselected = new Date(date12);
            todayselected.setHours(todayselected.getHours() + 12);
            localStorage.setItem("formattedDate2", todayselected);
            this.setState({
              selectedDate: date12,
              selectedDate2: todayselected,
            });
          }
         

       

        }
    
    

      }
    // }
    
    //selectedDate

    
   
   
  }

// Handle date selection
handleDateChange2(date) {

  const date1 = new Date(this.state.selectedDate);
  const date2 = new Date(date);
  
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();
 
  
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();
 
 

  date2.setMonth(date2.getMonth() + 1);
  const month211 = date2.getMonth();

  const month21 = date2.getMonth();
  const hours11 = date2.getHours(); 

  if (year1 === year2 && month1 === month2 && day1 === day2) {
      

   
    const date1 = new Date(date);
    const date2 = new Date();

    const year1 = date1.getFullYear();
    const month1 = date1.getMonth()+1;
    const day1 = date1.getDate();
    const hours1 = date1.getHours(); 

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();
    const hours2 = date2.getHours(); 

    const ab1=year1+month1+day1;
    const ab2=year2+month211+day2;

    date2.setHours(date2.getHours() + 12);
    const hours11 = date2.getHours(); 

    
    if(ab1===ab2 && hours1===0){

   
     
      const ndate=year1+'-'+month1+'-'+day1+' '+hours11+':00:00';
      const date12 = new Date(ndate);

      const date26=new Date(this.state.selectedDate);
      const timeDifferenceMs = date12 - date26;
      const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

      if(hoursDifference<12){
        const MySwal = withReactContent(Swal);
       // MySwal.fire('Invalid Selected To-Date');

      } else {

        localStorage.setItem("formattedDate2", date12);

        this.setState({
          selectedDate2: date12,
        });
      }
     
    
    } else {
     
      const date1 = new Date(this.state.selectedDate);
      const hours11 = date1.getHours(); 

      const date2 = new Date(date);
      const hours12 = date2.getHours(); 

      if(ab1===ab2){

        if(hours11>hours12  || hours11===hours12){
          const MySwal = withReactContent(Swal);
          MySwal.fire('Minimum booking hour should be 12 hours');
  
        } else {
  
  
          const date27 = new Date(date);
          const date26=new Date(this.state.selectedDate);
          const timeDifferenceMs = date27 - date26;
          const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
          if(hoursDifference<12){
            const MySwal = withReactContent(Swal);
            MySwal.fire('Minimum booking hour should be 12 hours');
  
          } else {
  
            localStorage.setItem("formattedDate2", date);
        
            this.setState({
              selectedDate2: date,
            });
          }
  
        }
      } else {

        const date27 = new Date(date);
        const date26=new Date(this.state.selectedDate);
        const timeDifferenceMs = date27 - date26;
        const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
        if(hoursDifference<12){
          const MySwal = withReactContent(Swal);
          MySwal.fire('Minimum booking hour should be 12 hours');

        } else {

          localStorage.setItem("formattedDate2", date);
      
          this.setState({
            selectedDate2: date,
          });
        }

      }
      




    }



  } else if (year1 > year2 || (year1 === year2 && month1 > month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
    const MySwal = withReactContent(Swal);
    MySwal.fire('Invalid Selected To-date');
  } else {

    const date1 = new Date(date);
    const date2 = new Date();

    const year1 = date1.getFullYear();
    const month1 = date1.getMonth()+1;
    const day1 = date1.getDate();
    const hours1 = date1.getHours(); 

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();
    const hours2 = date2.getHours(); 

    const ab1=year1+month1+day1;
    const ab2=year2+month2+day2;

    date2.setHours(date2.getHours() + 1);
    const hours11 = date2.getHours(); 
    if(ab1===ab1 && hours1===0){
       
     
      
      const ndate=year1+'-'+month1+'-'+day1+' '+hours11+':00:00';
      const date12 = new Date(ndate);

      const date26=new Date(this.state.selectedDate);
      const timeDifferenceMs = date12 - date26;
      const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

        if(hoursDifference<12){
          const MySwal = withReactContent(Swal);
          MySwal.fire('Invalid Selected To-Date');

        } else {
        localStorage.setItem("formattedDate2", date12);

        this.setState({
          selectedDate2: date12,
        });
      }
    } else {

     
     
      const date1 = new Date(this.state.selectedDate);
      const hours11 = date1.getHours(); 

      const date2 = new Date(date);
      const hours12 = date2.getHours(); 

     
      const date26=new Date(this.state.selectedDate);
      const timeDifferenceMs = date2 - date26;
      const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

        if(hoursDifference<12){
          const MySwal = withReactContent(Swal);
          MySwal.fire('Invalid Selected To-Date');

        } else {
          localStorage.setItem("formattedDate2", date);
      
          this.setState({
            selectedDate2: date,
          });
        }



    }
  }
  
    


 
}
    handleSubmit() {

        this.setState({ show: false });
        
         this.https.post('/update_status',{
            token:this.token,
            table:'vendorcars',
            id:this.state.id,
            book:6,
            date1:this.state.selectedDate,
            date2:this.state.selectedDate2,
            type:this.state.type
        }).then((result)=>{

            let status = result.data.status;
            let message = result.data.message;

            if (status === 1) {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Updated Success');
            
          this.imagestore()
            } else {

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
           edate: result.data.data.edate,
           booking_time: result.data.data.booking_time,
           refunded_by_name: result.data.data.refunded_by_name,
           comment: result.data.data.comment
        });

    
     };
  

     
     handleClose = () => {
        this.setState({ show: false });
      };
      
      handleShows = (id) => {
       
           if(id===1){
            const sss=new Date();
            this.setState({ type1: {'display':'block'},type2: {'display':'block'},types:id,mins:sss });
           } else {
            const sss=new Date(this.state.edate);
            this.setState({ type1: {'display':'none'},type2: {'display':'block'},types:id,mins:sss  });
           }
      }

      handleShow = () => {

        this.setState({ show: true });



       

        if(this.state.selectedDate2==='' || this.state.selectedDate2===null){
            this.handleClose();
            this.setState({ show: false });
            const MySwal = withReactContent(Swal);
            MySwal.fire('To Date/Time is required');
        }

        
        if(this.state.selectedDate==='' || this.state.selectedDate===null && this.state.types==1){
            this.handleClose();
            this.setState({ show: false });
            const MySwal = withReactContent(Swal);
            MySwal.fire('From Date/Time is required');
        }
     
        if(this.state.types==='' || this.state.types===null){
            this.handleClose();
            this.setState({ show: false });
            const MySwal = withReactContent(Swal);
            MySwal.fire('Please Select Type of Action');
        }


      };
 
   render() {
   
    let display={};


    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));

    let local = {
      "format": "DD-MM-YYYY HH:mm",
      "sundayFirst": true
    }
    let maxDate = moment(start).add(60, "days")

    if(this.state.rstatus){
      
        display={display:'none'};

    }



    let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }

    const { show } = this.state;

    const { selectedDate } = this.state;
    const { selectedDate2,type1,type2,types,mins} = this.state;

    
    const typesname=types===1?'re-schedule':'Extend Booking';

      return (
        <Fragment>

<>
     

<Modal show={show} onHide={this.handleClose}>
   <center>
       <Modal.Body>
         <h5>Do you want to {typesname} the booking? Make sure to check the car availability before {typesname}</h5>
         <Button variant="secondary" onClick={this.handleClose}>
           No
         </Button>
         <Button variant="success" onClick={this.handleSubmit}>
           Yes
         </Button>
       </Modal.Body>
       </center>
     </Modal>
   </>


            <Header />
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
            <div className="page page-profile">
                <div className="profile-inner-container">
                <Row>
                <Col sm={6} md={4} lg={3}>
                    <PanelSidebar/>
                </Col>
                <Col sm={6} md={8} lg={9}>
                <div className="tab-content-container">
                    <p className="content-heading">Edit Order</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                        <div className="profile-tab-container account-container">
                        {msg}
                        <Form id="account_form">
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
                                    <Form.Label>From Date</Form.Label>
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
                                    <Form.Label>To Date</Form.Label>
                                </Col>
                                <Col md={4}>
                                     <Form.Control
                                      value={this.state.return_date}
                                      readonly
                                    /></Col>
                               
                                <Col md={2}>
                                    <Form.Label>Updated By</Form.Label>
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Control
                                      value={this.state.refunded_by_name}
                                      readonly
                                    />
                                     </Col>
                               
                                </Row>

                                <Row className="w-100 mb-5">
                                <Col md={12}>
                                <p>Type of Action</p>
                                </Col>
                                <Col md={12}>
                                    <input  type="radio" value="1" onClick={this.handleShows.bind(this, 1)} name="type" /> &nbsp;Re-Schedule &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="2" onClick={this.handleShows.bind(this, 2)}name="type"/> &nbsp;Extend Booking
                                </Col>
                                </Row>
                                <Row className="w-100 mb-5">
                                <Col md={2} style={type1}>
                                    <Form.Label>New from Date/Time</Form.Label>
                                </Col>
                                <Col md={4} style={type1}>
                                <DatePicker
                                selected={selectedDate}
                                onChange={this.handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="d/M/Y H:mm"
                                timeCaption="Time"
                                maxDate={maxDate}
                                minDate={new Date()}
                                placeholderText={
                                  selectedDate ? selectedDate : "Pick-up Date"
                                }
                                className="form-control"
                              />
                                </Col>
                                <Col md={2} style={type2} >
                                    <Form.Label>New To Date/Time</Form.Label>
                                </Col>
                                <Col md={4} style={type2} >
                                    <DatePicker
                                selected={selectedDate2}
                                onChange={this.handleDateChange2}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="d/M/Y H:mm"
                                timeCaption="Time"
                                maxDate={maxDate}
                                minDate={mins}
                                placeholderText={
                                  selectedDate2 ? selectedDate2 : "Drop-off Date"
                                }
                                className="form-control"
                              />
                                </Col>
                                
                               
                                </Row>
                              
                                <Row className="w-100 mb-5">       
                                <Col md={12}>
                                    <Form.Label>Write down the name of the location where visiting</Form.Label>
                                </Col>
                                <div className="col-md-12">
                          <p>
                            <textarea
                              onChange={this.handleChange}
                              name="comment"
                              className="form-control"
                              value={this.state.comment}
                              placeholder="Write down the name of the location you will be visiting "
                              required
                            >
                              {localStorage.getItem('comment')}
                            </textarea>
                          </p>
                        </div>
                        </Row>     
                                </Form.Group>

                                
                            </div>
                        
                            <div className="" style={display}>
                        
                            
                                <Form.Group className="mb-5">
                                <Row className="">
                              
                                <Col md={4} className="mx-auto">
                                    <a onClick={this.handleShow.bind(this, 1)} className="rent-drive-theme-btn ">Update</a>
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
