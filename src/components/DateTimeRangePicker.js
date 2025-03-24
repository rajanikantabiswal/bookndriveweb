import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import moment from "moment";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

// TimePicker component for selecting hours
const TimePicker = ({ value, onChange, label }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const formatTime = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${ampm}`;
  };
  
  return (
    <div className="time-picker-container">
      <div className="time-picker-label">{label}</div>
      <div className="time-picker-value">{formatTime(value)}</div>
      <input 
        type="range" 
        min="0" 
        max="23" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="time-slider"
      />
    </div>
  );
};

// Calendar component
const Calendar = ({ 
  month, 
  year, 
  selectedStartDate, 
  selectedEndDate, 
  onDateSelect, 
  minDate 
}) => {
  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  // Generate calendar days
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  // Helper function to check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear();
  };
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const isStartDate = selectedStartDate && 
      date.getDate() === selectedStartDate.getDate() && 
      date.getMonth() === selectedStartDate.getMonth() && 
      date.getFullYear() === selectedStartDate.getFullYear();
      
    const isEndDate = selectedEndDate && 
      date.getDate() === selectedEndDate.getDate() && 
      date.getMonth() === selectedEndDate.getMonth() && 
      date.getFullYear() === selectedEndDate.getFullYear();
      
    const isInRange = selectedStartDate && selectedEndDate && 
      date > selectedStartDate && date < selectedEndDate;
    
    // Check if today or before today (both disabled)
    const isTodayOrBefore = isToday(date) || date < new Date(new Date().setHours(0, 0, 0, 0));
    const isDisabled = isTodayOrBefore;
    
    const classNames = [
      "calendar-day",
      isStartDate ? "start-date" : "",
      isEndDate ? "end-date" : "",
      isInRange ? "in-range" : "",
      isDisabled ? "disabled" : "",
      isToday(date) ? "today" : ""
    ].filter(Boolean).join(" ");
    
    days.push(
      <div 
        key={i} 
        className={classNames}
        onClick={() => !isDisabled && onDateSelect(date)}
      >
        {i}
      </div>
    );
  }
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month-year">
          {moment(new Date(year, month)).format('MMMM YYYY')}
        </div>
      </div>
      <div className="weekdays">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="calendar-days">
        {days}
      </div>
    </div>
  );
};

// Main DateTimeRangePicker component
const DateTimeRangePicker = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  
  // State
  const [city, setCity] = useState("Bhubaneswar");
  const [pickupAddress, setPickupAddress] = useState("");
  const [carArray, setCarArray] = useState([]);
  const [messages, setMessages] = useState("");
  
  // Get tomorrow's date for default start date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  
  // Get date 8 days from now for default end date
  const getDefaultEndDate = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 8);
    return endDate;
  };
  
  // Date state
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [nextMonth, setNextMonth] = useState((new Date().getMonth() + 1) % 12);
  const [nextMonthYear, setNextMonthYear] = useState(
    new Date().getMonth() === 11 ? new Date().getFullYear() + 1 : new Date().getFullYear()
  );
  
  const [selectedStartDate, setSelectedStartDate] = useState(getTomorrowDate());
  const [selectedEndDate, setSelectedEndDate] = useState(getDefaultEndDate());
  const [startTime, setStartTime] = useState(10); // 10 AM
  const [endTime, setEndTime] = useState(10); // 10 AM
  
  const [selectionStep, setSelectionStep] = useState("start"); // "start" or "end"
  
  // Load city data
  useEffect(() => {
    // Mocked data - in real application you would fetch this
    setCarArray([
      { city: "Bhubaneswar Airport" },
      { city: "Bhubaneswar Railway Station" },
      { city: "Bhubaneswar Bus Station" },
      { city: "Bhubaneswar City Center" }
    ]);
  }, []);
  
  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      setNextMonth(0);
      setNextMonthYear(currentYear);
    } else {
      setCurrentMonth(currentMonth - 1);
      setNextMonth((currentMonth - 1 + 1) % 12);
      if (currentMonth - 1 === 11) {
        setNextMonthYear(currentYear + 1);
      } else {
        setNextMonthYear(currentYear);
      }
    }
  };
  
  // Navigate to next month
  const nextMonthHandler = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      setNextMonth(1);
      setNextMonthYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
      setNextMonth((currentMonth + 2) % 12);
      if (currentMonth + 1 === 11) {
        setNextMonthYear(currentYear + 1);
      } else {
        setNextMonthYear(currentYear);
      }
    }
  };
  
  // Handle date selection
  const handleDateSelect = (date) => {
    // Update the selected date with the current time
    const updatedDate = new Date(date);
    
    if (selectionStep === "start") {
      updatedDate.setHours(startTime, 0, 0);
      setSelectedStartDate(updatedDate);
      setSelectionStep("end");
    } else {
      // Ensure end date is after start date
      if (date < selectedStartDate) {
        MySwal.fire('End date must be after start date');
        return;
      }
      
      // Calculate hours difference
      updatedDate.setHours(endTime, 0, 0);
      const hoursDifference = (updatedDate - selectedStartDate) / (1000 * 60 * 60);
      
      if (hoursDifference < 12) {
        MySwal.fire('Minimum booking duration should be 12 hours');
        return;
      }
      
      setSelectedEndDate(updatedDate);
      setSelectionStep("start");
      setShowCalendar(false);
    }
  };
  
  // Reset the date and time selection
  const handleReset = () => {
    setSelectedStartDate(getTomorrowDate());
    setSelectedEndDate(getDefaultEndDate());
    setStartTime(10);
    setEndTime(10);
    setSelectionStep("start");
  };
  
  // Update time and check constraints
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDateCopy = new Date(selectedStartDate);
      startDateCopy.setHours(startTime, 0, 0);
      
      const endDateCopy = new Date(selectedEndDate);
      endDateCopy.setHours(endTime, 0, 0);
      
      const hoursDifference = (endDateCopy - startDateCopy) / (1000 * 60 * 60);
      
      if (hoursDifference < 12) {
        MySwal.fire('Minimum booking duration should be 12 hours');
        
        // Reset end time to ensure minimum 12 hours
        const newEndTime = new Date(startDateCopy);
        newEndTime.setHours(newEndTime.getHours() + 12);
        setEndTime(newEndTime.getHours());
      }
    }
  }, [startTime, endTime, selectedStartDate, selectedEndDate]);
  
  // Format display date
  const formatDisplayDate = (date, time) => {
    if (!date) return "";
    const displayDate = new Date(date);
    displayDate.setHours(time, 0, 0);
    return moment(displayDate).format("DD MMM'YY, h:mm A");
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!pickupAddress) {
      MySwal.fire('Please select a pickup address');
      return;
    }
    
    // Create date strings
    const formattedStartDate = formatDisplayDate(selectedStartDate, startTime);
    const formattedEndDate = formatDisplayDate(selectedEndDate, endTime);
    const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
    
    // Save to localStorage (as in original code)
    localStorage.setItem("from", pickupAddress);
    localStorage.setItem("date", dateRange);
    localStorage.setItem("formattedDate", new Date(selectedStartDate).setHours(startTime, 0, 0));
    localStorage.setItem("formattedDate2", new Date(selectedEndDate).setHours(endTime, 0, 0));
    
    // Navigate to car list page
    navigate('../car-list');
  };
  
  return (
    <section className="rent-drive-find-area ones main-search" id="MainSearch">
      <Container className="g-0">
        <Row className="m-0">
          <Col md={12}>
            <div className="find-box rounded">
              <Row className="align-items-center">
                <Col md={12}>
                  <div className="find-form">
                    {messages && (
                      <Alert variant="success">{messages}</Alert>
                    )}
                    <Form onSubmit={handleSubmit} id="account_form">
                      <Row className="g-3">
                        <Col lg={3}>
                          <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select
                              name="city"
                              className="form-control"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            >
                              <option value="Bhubaneswar">Bhubaneswar</option>
                            </select>
                          </div>
                        </Col>
                        
                        <Col lg={3}>
                          <div className="form-group">
                            <label htmlFor="pickup">Pickup Address</label>
                            <select
                              name="pickup"
                              className="form-control"
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                            >
                              <option value="">Select Pickup Address</option>
                              {carArray.map((item, index) => (
                                <option key={index} value={item.city}>
                                  {item.city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        
                        <Col lg={4}>
                          <div className="form-group">
                            <label>Date and Time Range</label>
                            <div 
                              className="date-range-display form-control"
                              onClick={() => setShowCalendar(!showCalendar)}
                            >
                              {formatDisplayDate(selectedStartDate, startTime)} - {formatDisplayDate(selectedEndDate, endTime)}
                            </div>
                            
                            {showCalendar && (
                              <div className="calendar-container">
                                <div className="calendar-header-controls">
                                  <div className="date-summary">
                                    <div className="date-summary-item">
                                      <span className="date-label">From:</span> 
                                      <span className="date-value">{formatDisplayDate(selectedStartDate, startTime)}</span>
                                    </div>
                                    <div className="date-summary-item">
                                      <span className="date-label">To:</span>
                                      <span className="date-value">{formatDisplayDate(selectedEndDate, endTime)}</span>
                                    </div>
                                  </div>
                                  <button 
                                    type="button" 
                                    className="btn btn-outline-secondary reset-btn"
                                    onClick={handleReset}
                                  >
                                    Reset
                                  </button>
                                </div>
                                
                                <div className="calendar-navigation">
                                  <button type="button" onClick={prevMonth} className="nav-btn">
                                    &lt;
                                  </button>
                                  <button type="button" onClick={nextMonthHandler} className="nav-btn">
                                    &gt;
                                  </button>
                                </div>
                                
                                <div className="calendars-wrapper">
                                  <Calendar
                                    month={currentMonth}
                                    year={currentYear}
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateSelect={handleDateSelect}
                                    minDate={new Date()}
                                  />
                                  <Calendar
                                    month={nextMonth}
                                    year={nextMonthYear}
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateSelect={handleDateSelect}
                                    minDate={new Date()}
                                  />
                                </div>
                                
                                <div className="time-pickers-container">
                                  <div className="time-selection">
                                    <h4>Select the start time & end time</h4>
                                    <TimePicker 
                                      value={startTime} 
                                      onChange={setStartTime} 
                                      label="Start Time" 
                                    />
                                    <div className="time-display">
                                      {startTime % 12 === 0 ? '12' : startTime % 12}:00 {startTime >= 12 ? 'PM' : 'AM'}
                                    </div>
                                    
                                    <TimePicker 
                                      value={endTime} 
                                      onChange={setEndTime} 
                                      label="End Time" 
                                    />
                                    <div className="time-display">
                                      {endTime % 12 === 0 ? '12' : endTime % 12}:00 {endTime >= 12 ? 'PM' : 'AM'}
                                    </div>
                                  </div>
                                  
                                  <button 
                                    type="button" 
                                    className="btn btn-success continue-btn"
                                    onClick={() => setShowCalendar(false)}
                                  >
                                    CONTINUE
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </Col>
                        
                        <Col lg={2}>
                          <div className="form-group">
                            <label>&nbsp;</label>
                            <button
                              type="submit"
                              className="btn btn-theme btn-danger d-block w-100"
                            >
                              Find Car
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx>{`
        .calendar-container {
          position: absolute;
          z-index: 1000;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 20px;
          width: 700px;
          margin-top: 10px;
        }
        
        .calendar-header-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .date-summary {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .date-summary-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .date-label {
          font-weight: bold;
          width: 40px;
        }
        
        .date-value {
          color: #16854a;
        }
        
        .reset-btn {
          padding: 5px 15px;
          font-size: 14px;
        }
        
        .calendars-wrapper {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .calendar {
          flex: 1;
        }
        
        .calendar-header {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        
        .calendar-day {
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .calendar-day:hover {
          background-color: #f0f0f0;
        }
        
        .calendar-day.empty {
          cursor: default;
        }
        
        .calendar-day.start-date, .calendar-day.end-date {
          background-color: #16854a;
          color: white;
        }
        
        .calendar-day.in-range {
          background-color: #e6f7ee;
        }
        
        .calendar-day.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
        
        .calendar-day.today {
          border: 1px solid #16854a;
        }
        
        .time-pickers-container {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        
        .time-selection h4 {
          font-size: 16px;
          margin-bottom: 20px;
        }
        
        .time-picker-container {
          margin-bottom: 20px;
        }
        
        .time-slider {
          width: 100%;
          height: 6px;
        }
        
        .calendar-navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .nav-btn {
          background: none;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .continue-btn {
          margin-top: 20px;
          width: 100%;
          padding: 10px;
          background-color: #16854a;
        }
        
        .date-range-display {
          cursor: pointer;
        }
        
        .time-display {
          text-align: right;
          font-weight: bold;
          margin-top: 5px;
        }
      `}</style>
    </section>
  );
};

export default DateTimeRangePicker;