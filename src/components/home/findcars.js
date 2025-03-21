import React, { Component, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { Container, Row, Col, FormControl, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../css/header.css";
import { https } from "../../components/AuthUser";
import moment from "moment"
import $ from "jquery";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function NavigateWrapper() {
  const navigate = useNavigate();

  return <FindCar navigate={navigate} />;
}

class FindCar extends Component {

  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    let end = moment(start).add(30, "days").subtract(1, "seconds");
    this.car_image = React.createRef()

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateChange2 = this.handleDateChange2.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const selectedDate=localStorage.getItem("formattedDate");

    const modifiedDate = new Date(selectedDate);
    modifiedDate.setHours(modifiedDate.getHours());
    modifiedDate.setMinutes(modifiedDate.getMinutes());
    modifiedDate.setSeconds(modifiedDate.getSeconds());


    const selectedDate2=localStorage.getItem("formattedDate2");

    const modifiedDates = new Date(selectedDate2);
    modifiedDates.setHours(modifiedDates.getHours());
    modifiedDates.setMinutes(modifiedDates.getMinutes());
    modifiedDates.setSeconds(modifiedDates.getSeconds());



    this.state = {
      messages: "",
      selectedDate: modifiedDate,
      selectedDate2: modifiedDates,
      start: start,
      end: end,
      city: "",
      from: "",
      date: "",
      date1: "",
      carArray: [],
    };
    this.imagestore = this.imagestore.bind(this);
    this.https = https();

    this.applyCallback = this.applyCallback.bind(this);

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
  


  componentDidMount() {
    this.imagestore()
  }

  imagestore() {
    this.https.post('/city_list', { token: this.token, type: 1 }).then((result) => {
      let status = result.data.status;
      if (status === 1) {
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

  handleChange1(event) {
    const value = event.valueText;

    this.setState({
      date: value
    });


  }

  handleSubmit(event) {
    event.preventDefault();

    



    if (this.state.selectedDate2 != null && this.state.selectedDate2 != '' && this.state.selectedDate != null && this.state.selectedDate != '') {
       

        const date1 = new Date(this.state.selectedDate);
        const date2 = new Date(this.state.selectedDate2);
    
    
        const formattedDate = date1.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
    
        const formattedDate2 = date2.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
     
    
        const formattedDate1 = date1.toLocaleString('en-GB', formattedDate).replace(/,/, '');
        const formattedDate22 = date2.toLocaleString('en-GB', formattedDate2).replace(/,/, '');
    
        const date = formattedDate1 + ' - ' + formattedDate22;

  
        localStorage.setItem("from", this.state.from);
        localStorage.setItem("date", date);
       
        
        const { navigate } = this.props;
        navigate('../car-list');
        window.location.replace('../car-list');

    } else {

      const MySwal = withReactContent(Swal);
      MySwal.fire('Please Select Required fields');
    }


  }


  applyCallback(startDate, endDate) {

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);


    const formattedDate = date1.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const formattedDate2 = date2.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });



    const dates = formattedDate + ' - ' + formattedDate2;

    this.setState({
      start: startDate,
      end: endDate,
      date: dates
    }
    )
  }





  render() {



    const { selectedDate } = this.state;
    const { selectedDate2 } = this.state;

    var i = 0;
    const listItems = this.state.carArray.map((val, key) => {
      i++;

      return (

        <option value={val.city}>{val.city}</option>

      )
    });


    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));

    let local = {
      "format": "DD-MM-YYYY HH:mm",
      "sundayFirst": true
    }
    let maxDate = moment(start).add(60, "days")


    let msg = '';
    if (this.state.messages) {
      msg = <Alert variant="success"  >
        {this.state.messages}
      </Alert>
    }

    $(document).ready(function () {
      var startmin = "<br><select id='starttime'><option value='00:00 AM'>00:00 AM</option><option value='00:30 AM'>00:30 AM</option><option value='01:00 AM'>01:00 AM</option><option value='01:30 AM'>01:30 AM</option><option value='02:00 AM'>02:00 AM</option><option value='02:30 AM'>02:30 AM</option><option value='03:00 AM'>03:00 AM</option><option value='03:30 AM'>03:30 AM</option><option value='04:00 AM'>04:00 AM</option><option value='04:30 AM'>04:30 AM</option><option value='05:00 AM'>05:00 AM</option><option value='05:30 AM'>05:30 AM</option><option value='06:00 AM'>06:00 AM</option><option value='06:30 AM'>06:30 AM</option><option value='07:00 AM'>07:00 AM</option><option value='07:30 AM'>07:30 AM</option><option value='08:00 AM'>08:00 AM</option><option value='08:30 AM'>08:30 AM</option><option value='09:00 AM'>09:00 AM</option><option value='09:30 AM'>09:30 AM</option><option value='10:00 AM'>10:00 AM</option><option value='10:30 AM'>10:30 AM</option><option value='11:00 AM'>11:00 AM</option><option value='11:30 AM'>11:30 AM</option><option value='12:00 PM'>12:00 PM</option><option value='12:30 PM'>12:30 PM</option><option value='00:00 PM'>00:00 PM</option><option value='00:30 PM'>00:30 PM</option><option value='01:00 PM'>01:00 PM</option><option value='01:30 PM'>01:30 PM</option><option value='02:00 PM'>02:00 PM</option><option value='02:30 PM'>02:30 PM</option><option value='03:00 PM'>03:00 PM</option><option value='03:30 PM'>03:30 PM</option><option value='04:00 PM'>04:00 PM</option><option value='04:30 PM'>04:30 PM</option><option value='05:00 PM'>05:00 PM</option><option value='05:30 PM'>05:30 PM</option><option value='06:00 PM'>06:00 PM</option><option value='06:30 PM'>06:30 PM</option><option value='07:00 PM'>07:00 PM</option><option value='07:30 PM'>07:30 PM</option><option value='08:00 PM'>08:00 PM</option><option value='08:30 PM'>08:30 PM</option><option value='09:00 PM'>09:00 PM</option><option value='09:30 PM'>09:30 PM</option><option value='10:00 PM'>10:00 PM</option><option value='10:30 PM'>10:30 PM</option><option value='11:00 PM'>11:00 PM</option><option value='11:30 PM'>11:30 PM</option></select>";
      var endmin = "<br><select id='endtime'><option value='00:00 AM'>00:00 AM</option><option value='00:30 AM'>00:30 AM</option><option value='01:00 AM'>01:00 AM</option><option value='01:30 AM'>01:30 AM</option><option value='02:00 AM'>02:00 AM</option><option value='02:30 AM'>02:30 AM</option><option value='03:00 AM'>03:00 AM</option><option value='03:30 AM'>03:30 AM</option><option value='04:00 AM'>04:00 AM</option><option value='04:30 AM'>04:30 AM</option><option value='05:00 AM'>05:00 AM</option><option value='05:30 AM'>05:30 AM</option><option value='06:00 AM'>06:00 AM</option><option value='06:30 AM'>06:30 AM</option><option value='07:00 AM'>07:00 AM</option><option value='07:30 AM'>07:30 AM</option><option value='08:00 AM'>08:00 AM</option><option value='08:30 AM'>08:30 AM</option><option value='09:00 AM'>09:00 AM</option><option value='09:30 AM'>09:30 AM</option><option value='10:00 AM'>10:00 AM</option><option value='10:30 AM'>10:30 AM</option><option value='11:00 AM'>11:00 AM</option><option value='11:30 AM'>11:30 AM</option><option value='12:00 PM'>12:00 PM</option><option value='12:30 PM'>12:30 PM</option><option value='00:00 PM'>00:00 PM</option><option value='00:30 PM'>00:30 PM</option><option value='01:00 PM'>01:00 PM</option><option value='01:30 PM'>01:30 PM</option><option value='02:00 PM'>02:00 PM</option><option value='02:30 PM'>02:30 PM</option><option value='03:00 PM'>03:00 PM</option><option value='03:30 PM'>03:30 PM</option><option value='04:00 PM'>04:00 PM</option><option value='04:30 PM'>04:30 PM</option><option value='05:00 PM'>05:00 PM</option><option value='05:30 PM'>05:30 PM</option><option value='06:00 PM'>06:00 PM</option><option value='06:30 PM'>06:30 PM</option><option value='07:00 PM'>07:00 PM</option><option value='07:30 PM'>07:30 PM</option><option value='08:00 PM'>08:00 PM</option><option value='08:30 PM'>08:30 PM</option><option value='09:00 PM'>09:00 PM</option><option value='09:30 PM'>09:30 PM</option><option value='10:00 PM'>10:00 PM</option><option value='10:30 PM'>10:30 PM</option><option value='11:00 PM'>11:00 PM</option><option value='11:30 PM'>11:30 PM</option></select>";
      // $('.timeSelectContainer').css('display','none')
      //$('.fromDateHourContainer .timeContainer').html(startmin);
      /// $('.fromDateHourContainer').find('.timeContainer').html(startmin);
      //$(".calendarCell").click(function () {
      // alert('ok');
      //})

    });


    return (
      <Fragment>
     
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form" className="p-0">
                         <div className="form-group mb-2">
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
                                  selectedDate ? selectedDate : "From Date/Time"
                                }
                                className="form-control"
                                
                              />
                            </div>
                              
                              
                               <div className="form-group mb-2">
                              <DatePicker
                                selected={selectedDate2}
                                onChange={this.handleDateChange2}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="d/M/Y H:mm"
                                timeCaption="Time"
                                maxDate={maxDate}
                                minDate={new Date()}
                                placeholderText={
                                  selectedDate2 ? selectedDate2 : "To Date/Time"
                                }
                                className="form-control sdate"
                              />
                             
                            </div>
                         <div className="form-group">
                                <button
                                
                                  type="submit"
                                  className="rent-drive-themes-btn"
                                >
                                  Find Car
                                </button>
                            </div> 
                        </Form>
  

      </Fragment>
    );
  }
};

export default NavigateWrapper;
