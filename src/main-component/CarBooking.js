import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col, Alert, Button, Modal, Card ,Container} from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome, FaBarcode} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getToken,https,getUser } from "../components/AuthUser";
import Form from "react-bootstrap/Form";
import  "../css/CarDetail.css";
import { FaRupeeSign } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createProxyMiddleware } from 'http-proxy-middleware';

import SettingIcon from "../img/setting-cog.svg";
import OilTypelIcon from "../img/hybrid-car.svg";
import RoadIcon from "../img/road.svg";

//const MySwal = withReactContent(Swal);
//MySwal.fire(result.data.message);
import axios from 'axios';
import { SHA256 } from "crypto-js";

function NavigateWrapper() {
   const navigate = useNavigate(); 

   return <CarBooking navigate={navigate} />;
}


class CarBooking extends Component {

   constructor(props) {
      super()

      // this.checkLogin=checkLogin();
      this.token=getToken();
      this.https = https();
      this.userData = getUser();
      this.state = {
         showTooltip: false,
         suubmitvalue:'',
         attrs:false,
         submitbuttom:'',
         submitbuttom1:'',
         totalHours:'',
         totalRent:0,
         newRent:0,
         dis:0,
         dis2:0,
         name: '',
         mobile_number: '',
         email: '',
         address: '',
         to_address: localStorage.getItem('to_address'),
         from_address: localStorage.getItem('from'),
         toTime:'',
         fromTime:'',
         luggage:'',
         person:'',
         comment:localStorage.getItem('comment'),
         hours:'',
         days:'',
         gst:0,
         insurance_amount:0,
         insurance1:'0.00',
         insurance:'',
         ins:0,
         show: false,
         submitbuttom: 'text',
         suubmitvalue:'Submit',
         attrs:'true',
         paymentUrl: "",
         coupon:'',
         coupon_dis:{display:"none"},
         readOnly: false,

      };
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleChangep = this.handleChangep.bind(this)
      this.handleChanges= this.handleChanges.bind(this)
      this.handleCoupon= this.handleCoupon.bind(this)
      this.handleCoupons= this.handleCoupons.bind(this)
      
      this.imagestore = this.imagestore.bind(this);
      this.imagestore1 = this.imagestore1.bind(this);
      this.imagestore2 = this.imagestore2.bind(this);
      
      this.id = localStorage.getItem('rent_id')
      this.state = {
         carArray: [],
         carArray1: [],
         carArray2: []
     };
     
     
    }         
    
    
   

     handleChangep() {
    
      if (this.token) { } else {
        
        const MySwal = withReactContent(Swal);
        MySwal.fire('Please login/signup to book a car.');
        localStorage.setItem('booking_applay',1);
        const { navigate } = this.props;
        navigate("../login"); 
        return true;
      
     }
    }

     handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });


      
     }

     handleCoupons(event){

        this.https.post('/login_verify',{token:this.token}).then((result)=>{
            if(result.data.status === 0){ 
              const { navigate } = this.props;
              navigate("../login"); 
            }
        })
        let totalRent=this.state.totalRent;
        let newRentp = 0;
        let newRent =totalRent-newRentp;

        const total1=this.state.ins_amt+this.state.gst1+newRent;
        const total=total1.toFixed(2);

        const newRentp1=newRentp.toFixed(2);
        const newRent1=newRent.toFixed(2);

        this.setState({
          dis1: newRentp,
          dis: newRentp1,
          dis2:0,
          newRent1:newRent,
          tts:newRent,
          newRent:newRent1,
          coupon_dis:{display:"none"},
          total:total,
          total1:total1,
          coupon:'',
          readOnly: false,
      });

        const MySwal = withReactContent(Swal);
        MySwal.fire('Coupon removed');
     }


     handleCoupon(event){

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
        if(result.data.status === 0){ 
          const { navigate } = this.props;
          navigate("../logout"); 
        }
        })

      if(this.state.coupon==='' || this.state.coupon===undefined){
        const MySwal = withReactContent(Swal);
        MySwal.fire('You first Enter Coupon Code');
      }

      this.https.post('/apply_coupon_code',{token:this.token,coupon:this.state.coupon}).then((result)=>{
        let status=result.data.status; 
        let message=result.data.message; 
        if(status === 1){

         
          let totalRent=this.state.totalRent;
          let newRentp = totalRent/100*result.data.data.dis;
          let newRent =totalRent-newRentp;

          const total1=this.state.ins_amt+this.state.gst1+newRent;
          const total=total1.toFixed(2);

          const newRentp1=newRentp.toFixed(2);
          const newRent1=newRent.toFixed(2);
 
          this.setState({
            dis1: newRentp,
            dis: newRentp1,
            dis2:result.data.data.dis,
            newRent1:newRent,
            tts:newRent,
            newRent:newRent1,
            coupon_dis:{display:"block"},
            total:total,
            total1:total1,
            readOnly: !this.state.readOnly,
         });



          const MySwal = withReactContent(Swal);
          MySwal.fire(result.data.data.dis+' % Coupon discount applied');

        }  else {

          let totalRent=this.state.totalRent;
          let newRentp = 0;
          let newRent =totalRent-newRentp;

          const total1=this.state.ins_amt+this.state.gst1+newRent;
          const total=total1.toFixed(2);

          const newRentp1=newRentp.toFixed(2);
          const newRent1=newRent.toFixed(2);
 
          this.setState({
            dis1: newRentp,
            dis: newRentp1,
            dis2:0,
            newRent1:newRent,
            tts:newRent,
            newRent:newRent1,
            coupon_dis:{display:"none"},
            total:total,
            total1:total1,
            coupon:'',
            readOnly: false,
         });

          const MySwal = withReactContent(Swal);
          MySwal.fire(message);

        }


       
      })


     }

     handleChanges(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });




      if(value===true){      
       

  
        const xyz = this.state.hours===0 ? this.state.days : this.state.days+1;
         const insurance_amount1=this.state.insurance_amount*xyz;
         const insurance_amount=insurance_amount1.toFixed(2);
         let tts1=this.state.tts;
         let tts=tts1+insurance_amount1;
         const  gst1=this.state.gst1;
         const gst=gst1.toFixed(2);

         const total1=gst1+tts;
         const total=total1.toFixed(2);

         this.setState({
            insurance1: insurance_amount,
            ins_amt:insurance_amount1,
            total:total,
            total1:total1
         });

      } else {

         const insurance_amount1=0;
         const insurance_amount=insurance_amount1.toFixed(2);
         let tts1=this.state.tts;
         let tts=tts1+insurance_amount1;
         const  gst1=tts1/100*5;
         const gst=gst1.toFixed(2);

         const total1=this.state.gst1+tts;
         const total=total1.toFixed(2);

         this.setState({
            insurance1: insurance_amount,
            ins_amt:insurance_amount1,
            total:total,
            total1:total1
         }); 
      }

     

     }


    handleMouseEnter = () => {
      this.setState({ showTooltip: true });
    }
  
    handleMouseLeave = () => {
      this.setState({ showTooltip: false });
    }

     componentDidMount() {
      this.imagestore();
      this.imagestore1();
      this.imagestore2();
    }

  imagestore() {

  
      if (this.token) {

         
         this.setState({
            name: this.userData.name,
            mobile_number: this.userData.mobile_number,
            email: this.userData.email,
            address: this.userData.address
         });
      }

      const date1= localStorage.getItem("date");
      const myArray = date1.split(' - ');


      const formattedDate = myArray[0].toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
  
      const formattedDate2 = myArray[1].toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      
   

      this.https.post('/car_list_by_id',{token:this.token,id:this.id,date:date1.toUpperCase(),datetime:date1}).then((result)=>{
          let status=result.data.status; 
          if(status === 1){
      
            this.setState({
              fromTime:result.data.data[0].fromTime,
              toTime:result.data.data[0].toTimes
             });

              const tts=result.data.data[0].date1*result.data.data[0].price;

              const price =result.data.data[0].price;
              const insurance_amount =result.data.data[0].insurance_amount;
              const days=result.data.data[0].days;

              const insurance_amounts=insurance_amount;

               //const price1 =price.toFixed(2);
              const tts1=tts.toFixed(2);
          

              const  gst1=tts/100*5;
              const gst=gst1.toFixed(2);

              const total1=gst1+tts;
              const total=total1.toFixed(2);


              this.setState({
                  carArray: result.data.data,
                  totalHours:result.data.data[0].date1,
                  hours:result.data.data[0].hours,
                  days:result.data.data[0].days,
                  totalRent:tts1,
                  newRent:tts1,
                  dis:0,
                  dis2:0,
                  rate:price,
                  insurance_amount:insurance_amounts,
                  insurance1:'0.00',
                  ins_amt:0,
                  tts:tts,
                  gst:gst,
                  gst1:gst1,
                  total:total,
                  total1:total1,
                  coupon_dis:{display:"none"},
                  readOnly: false,
              });


              result.data.data.map((val, key) =>{

               let booking_status=val.booking_status;
             
         
              if(booking_status===1){
                 
                  this.setState({
                     submitbuttom: 'text',
                     suubmitvalue:'Booked',
                     attrs:'true'
                 });
                 
              } else {
                
                  this.setState({
                     submitbuttom: 'text',
                     suubmitvalue:'Book Car',
                     submitbuttom1: 'submit',
                     attrs:'true'
                 });
              }


              if (this.token) {
                this.setState({
                  submitbuttom: 'submit',
                  suubmitvalue:'Book Car',
                  submitbuttom1: 'submit'
                  
              });
              }

            })

              //alert(result.data.data[0].date1);

          }
      })
   


    

  }
 

  imagestore1() {
   this.https.post('/city_list', { token: this.token,type:1 }).then((result) => {
       let status = result.data.status;
       if (status === 1) {
           this.setState({
               carArray1: result.data.data
           });
       }

   })

}



imagestore2() {
   this.https.post('/city_list', { token: this.token,type:2 }).then((result) => {
       let status = result.data.status;
       if (status === 1) {
           this.setState({
               carArray2: result.data.data
           });
       }

   })

}



initiatePayment = async () => {
  
 

  this.https.post('/access_payment',{token:this.token}).then((result)=>{
    let status=result.data.status; 
    if(status === 1){
    console.log('Payment successful', result.data.data);
    
      const res= JSON.parse(result.data.data);
      
      window.location.replace(res.data.instrumentResponse.redirectInfo.url);
      //console.log('successful', res.data.instrumentResponse.redirectInfo.url);
    } else {

      const MySwal = withReactContent(Swal);
      MySwal.fire('Login again Token expired');
    }
  });

};

     handleSubmit(event) {
      event.preventDefault();
   
     
      
      var name = event.target.name.value;
      var email = event.target.email.value;
      var from_address = event.target.from_address.value;
      var mobile_number = event.target.mobile_number.value;

      if (this.token) { } else {
        
        const MySwal = withReactContent(Swal);
        MySwal.fire('Please login/signup to book a car.');
        const { navigate } = this.props;
        navigate("../login"); 
        return true;
      localStorage.setItem('name',name);
      localStorage.setItem('email',email);
      localStorage.setItem('address',from_address);
      localStorage.setItem('mobile_number',mobile_number);
      localStorage.setItem('booking_applay',1);
      }

    
      var to_address = event.target.to_address.value;

      if(to_address===''){


      }


      var fromTime = event.target.fromTime.value;
      var toTime = event.target.toTime.value;
      var person = event.target.person.value;
      var luggage = event.target.luggage.value;
      var comment = event.target.comment.value;
      var rent_id=localStorage.getItem('rent_id')
      const date1= localStorage.getItem("date");

      this.https.post('/access_payment',{
      //this.https.post('/create_order',{
         token:this.token,
         name: name,
         email:email,
         mobile_number:mobile_number,
         from_address:from_address,
         to_address:to_address,
         fromTime:fromTime,
         toTime:toTime,
         person:person,
         total_in_hours:this.state.totalHours,
         rent:this.state.totalRent,
         rate:this.state.rate,
         newRent:this.state.newRent,
         dis:this.state.dis,
         dis2:this.state.dis2,
         coupon:this.state.coupon,
         insurance:this.state.insurance,
         days:this.state.days,
         hours:this.state.hours,
         ins_amt:this.state.ins_amt,
         gst:this.state.gst1,
         total:this.state.total1,
         luggage:luggage,
         comment:comment,
         car_id:rent_id,
         date1:date1
      }).then((result)=>{
         let status=result.data.status; 
      
       

         if(status === 1){
          //You have successfully booked your car. Enjoy the driving.
         // const MySwal = withReactContent(Swal);
          //MySwal.fire('You have successfully booked your car. Enjoy the driving.');
          //const { navigate } = this.props;
         // navigate("../booking-list");

         const res= JSON.parse(result.data.data);
      
         window.location.replace(res.data.instrumentResponse.redirectInfo.url);

        } else {
   
         localStorage.setItem('to_address',this.state.to_address);
         localStorage.setItem('comment',this.state.comment);

       
         const MySwal = withReactContent(Swal);

         if(result.data.message!='Please login for access'){
          MySwal.fire(result.data.message);
         }

         if(result.data.message==='Please login for access'){
            localStorage.setItem('filter',1)
            const { navigate } = this.props;

            this.https.post('/checkuser', {mobile_number:mobile_number }).then((result) => {
              let status = result.data.status;
              if (status === 1) {
                MySwal.fire(result.data.message);
                navigate("../login"); 
              } else{
                MySwal.fire('Please Register');
                navigate("../register");
              }
       
          })
         }
         

        }


     })
   }

   handleClose = () => {
      this.setState({ show: false });
    }
  
    handleShow = () => {
      this.setState({ show: true });
    }



   

    // handlePayment(id) {
    //   const merchantId = 'BOOKNONLINE';
    //   const apiKey = 'e3f84bd4-f2e9-4ba0-bae9-07aec00e3010';
    //   const redirectUrl = 'http://localhost:3000/car-booking';
    //   const amount = 100; // Replace with the amount to be paid

    //   axios.post(
    //     'https://api.phonepe.com/v3/debit/transaction',
    //     {
    //       merchantId,
    //       transactionAmount: amount, // Additional parameters if required by the API
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${apiKey}`,
    //       },
    //     }
    //   ).then((response) => {
    //     alert('ok');
    //    // window.location.href = response.data.url;
    //    console.log(response);
    //   });

   

    // }     

  
     render() {

      const { text, children } = this.props;
      const { showTooltip } = this.state;
      const { coupon_dis } = this.state;
      const { readonly } = this.state;
      
      //if (this.userData) {
      
      let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }
      
      const listItems = this.state.carArray.map((val, key) =>{

         let booking_status=val.booking_status;
       


         return (
           
               <div className="car-booking-right ">

                  <Row>
                     <Col>
                        <Row className="align-items-center">
                           
                           <div className="col-lg-7">
                            <div className="car-booking-image">
                                <img src={'http://127.0.0.1:8000/'+val.image} className="border-0" alt="car"/>
                            
                            </div>
                         
                           </div>
                           <div className="col-lg-5">
                          
                           <Row>
                        <div className="col-lg-12">
                                <FaCar className="me-2" />  Model : {val.model_year}
                           </div>

                           <div className="col-lg-12">
                            <img src={OilTypelIcon} className="me-2" width={18} />  Car Type : {val.transmission_type}
                           </div>

                       
                        

                           <div className="col-lg-12">
                            <img src={RoadIcon} className="me-2" width={18} />  Average : {val.avrage}{" "}kmpl
                           </div>

                           <div className="col-lg-12">
                           <FaBarcode className="me-2" /> Car No : {val.car_number}
                           </div>
                        </Row>
                        
                           </div>
                           <div className="col-lg-12 mt-2">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="car-name"><h5>{val.car_name}&nbsp;{val.model_name}&nbsp;{val.variant_name}</h5></div>
                                </div>
                                <div className="col-lg-4">
                                <div className="price-rent">
                                  <h4> <FaRupeeSign />{val.price}<span>/ HOUR</span></h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                            <div class="description-container">
                                        <p><strong>Experience the Maruti Celerio ZXI</strong></p>
                            <p>Discover the perfect companion for your urban adventures with the Maruti Celerio ZXI. This compact hatchback is engineered to elevate your driving experience, offering a seamless blend of convenience and performance.</p>
                            <p><strong>Efficiency &amp; Performance</strong> Efficiency takes center stage with the Celerio ZXI’s responsive and fuel-efficient engine. Whether navigating city streets or cruising along highways, its nimble handling and impressive mileage ensure a smooth and economical ride.</p>
                            <p>&nbsp;</p>
                                        </div>
                            </div>
                        </Row>
                       
                     </Col>
                  </Row>



               </div>
         
         )
    });
    
    const divStyle = {
      display:'none'
    };


    const listItems1 = this.state.carArray1.map((val, key) => {
     
      const from=localStorage.getItem('from');

      if(from===val.city){
      return (

        <option value={val.city} selected>{val.city}</option>

    )
      } else {
        return (

          <option value={val.city} >{val.city}</option>

      )

      }

      
  });

  const listItems2 = this.state.carArray2.map((val, key) => {
  
    const to_address=localStorage.getItem('to_address');

    if(to_address===val.city){
     return (

       <option value={val.city} selected>{val.city}</option>

   )
     } else {
       return (

         <option value={val.city} >{val.city}</option>

     )
       }
});



    return (
      <Fragment>
        <Header />
    
         <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Car Booking</h3>
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
                                <li> <Link to="/dashboard">Car Booking</Link> </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className="rent-drive-booking-form section_70">
          <div className="container">
            <Form onSubmit={this.handleSubmit} id="account_form">
              <div className="row">
                <div className="col-lg-8">
                  <div>
                    {listItems}
                  </div>
                  <div className="booking-form-left bg-light p-3">
                    {msg}
                    <div className="single-booking">
                      <h3>Personal Information</h3>
                      <div className="row">
                        <div className="col-md-6 mt-2">
                          <p>

                          <label><b>Full Name</b></label>
                            <input
                              type="text"
                              value={this.state.name}
                              name="name"
                              onChange={this.handleChange}
                              placeholder={"Your Full Name"}
                              className="form-control mt-2"
                            />
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                          <label><b>Email ID</b></label>
                            <input
                              className="form-control mt-2"
                              type="email"
                              value={this.state.email}
                              name="email"
                              onChange={this.handleChange}
                              placeholder={"Your Email Address"}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                          <label><b>Phone Number</b></label>
                            <input
                              className="form-control mt-2"
                              type="tel"
                              name="mobile_number"
                              id="mobile_number"
                              value={this.state.mobile_number}
                              onChange={this.handleChange}
                              placeholder={"Your Phone Number"}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="single-booking">
                      <h3>Booking Details</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            {/* <input
                              type="text"
                              className="form-control"
                              value={localStorage.getItem("from")}
                              name="from_address"
                              onChange={this.handleChange}
                              placeholder={"From Location"}
                            /> */}
                            <label><b>Pick Location</b></label>
                             <select
                              name="from_address"
                              className="form-control city mt-2"
                              value={this.state.from_address}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Pick Location</option>
                              {listItems1}
                            </select>
                          </p>
                        </div>

                        <div className="col-md-6">
                          {/* <p><input 
                                    type="text" 
                                    className="form-control"
                                    value={this.state.to_address}
                                    name="to_address"
                                    onChange={this.handleChange}
                                     
                                    placeholder={"To Address"}
                                    /></p> */}

                          <p>
                          <label><b>Drop Location</b></label>
                            <select
                              name="to_address"
                              className="form-control city mt-2"
                              value={this.state.to_address}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Drop Location</option>
                              {listItems2}
                            </select>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                        <label><b>From Date/Time</b></label>
                          <input
                            type="text"
                            format="DD/MM/YYYY HH:mm:ss"
                            style={{ height: 43 }}
                            className="form-control rangedate mt-2"
                            placeholder="From Date/Time"
                            value={this.state.fromTime}
                            name="fromTime"
                            onChange={this.handleChange}
                            readOnly={true}
                          />
                        </div>
                        <div className="col-md-6">
                        <label><b>To Date/Time</b></label>
                          <input
                            type="text"
                            format="DD/MM/YYYY HH:mm:ss"
                            style={{ height: 43 }}
                            className="form-control rangedate mt-2"
                            placeholder="To Date/Time"
                            value={this.state.toTime}
                            name="toTime"
                            onChange={this.handleChange}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="row mt-3" style={divStyle}>
                        <div className="col-md-6">
                          <p>
                            <select
                              className="form-control mt-2"
                              value={this.state.person}
                              onChange={this.handleChange}
                              name="person"
                            >
                              <option data-display="Select" value="1 person">
                                1 person
                              </option>
                              <option value="2 person">2 Person</option>
                              <option value="3 person">3 Person</option>
                              <option value="4 person">4 Person</option>
                              <option value="5-10 person">5-10 Person</option>
                            </select>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <select
                              value={this.state.luggage}
                              onChange={this.handleChange}
                              name="luggage"
                              className="form-control mt-2"
                            >
                              <option data-display="Select" value="1 Luggage">
                                1 Luggage
                              </option>
                              <option value="2 Luggage">2 Luggage</option>
                              <option value="3 Luggage">3 Luggage</option>
                              <option value="4(+) Luggage">4(+) Luggage</option>
                            </select>
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <p>
                          <label><b>Visiting Location</b></label>
                            <textarea
                              onChange={this.handleChange}
                              name="comment"
                              className="form-control mt-2"
                              value={this.state.comment}
                              placeholder="Write down the name of the location you will be visiting "
                              
                            >
                              {localStorage.getItem('comment')==='undefined'?'':localStorage.getItem('comment')}
                            </textarea>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <Card className="booking-right">
                    <Card.Header>
                      <h4 className="card-title">Book Details (Payment)</h4>
                    </Card.Header>
                    <Card.Body className="kps">
                      <div className="rent-drive-payment clearfix ">
                        {/* {listItems} */}
                        <Row>
                          <Col lg={12}>
                          <div class="input-group mb-3">
                              <input 
                              value={this.state.coupon}
                              onChange={this.handleChanges}
                              readOnly={this.state.readOnly}
                              name="coupon"  placeholder="Enter Coupon Code"
                              type="text" 
                              class="form-control shadow-none rounded-0"
                              aria-label="Reccouponipient" 
                              aria-describedby="coupon2" />
                              <div class="input-group-append">
                                <button class="btn btn-danger rounded-0 shadow-none" onClick={this.handleCoupon} type="button">Apply</button>
                              </div>
                          </div>
                          </Col>
                          
                          <Col lg={12} style={coupon_dis}>
                            <b style={{'font-size':'12px'}}>Coupon Discount {this.state.dis2}% <a onClick={this.handleCoupons} style={{'background-color':'red','color':'white','padding':'3px','font-size':'8px','border-radius':'10%','cursor': 'pointer'}}>Remove</a></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <b>
                              DURATION: {this.state.days} days{" "}
                              {this.state.hours} Hours
                            </b>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <b>TOTAL RENT: INR {this.state.totalRent}/-</b>
                          </Col>
                        </Row>

                        <Row style={coupon_dis}>
                          <Col lg={12}>
                            <b>DISCOUNT: INR {this.state.dis}/-</b>
                          </Col>
                        </Row>

                        <Row style={coupon_dis}>
                          <Col lg={12}>
                            <b>NEW RENT: INR {this.state.newRent}/-</b>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={12}>
                            <div className="line"></div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={8}>
                            <b>OPT FOR INSURANCE:</b>
                          </Col>
                          <Col xs={4} className="text-end">
                            <input
                              style={{ border: "1px solid blue" }}
                              value={this.state.insurance}
                              onChange={this.handleChanges}
                              name="insurance"
                              type="checkbox"
                              role="switch"
                            />
                          </Col>
                          <Col xs={12}>
                            <small>
                              (We will not charge you for minor damage happens to
                              car if incurance is opted)
                            </small>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <div className="line"></div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <b>INSURANCE: INR {this.state.insurance1}/-</b>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                           
                            <b>CONVENIENCE FEE: INR {this.state.gst}/-</b>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col lg={12}>
                            <b>TOTAL: INR {this.state.total}/-</b>
                          </Col>
                        </Row>
                        <Row className="text-center">
                          <Col lg={12}>
                            <input
                              readOnly={this.state.attrs}
                              type={this.state.submitbuttom}
                              style={{ width: 250 }}
                              className="rent-drive-theme-btn"
                              value={this.state.suubmitvalue}
                              onClick={this.handleChangep}
                            />

                            <div>
                        
                            </div>


                         
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Form>
          </div>
        </section>
        <Footer />
      </Fragment>
    );

//} else {
 //  window.location.replace('./');
   // const { navigate } = this.props;
   // navigate("../login");
//}

    }
}

export default NavigateWrapper;