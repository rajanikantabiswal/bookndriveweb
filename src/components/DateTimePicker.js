import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DateTimeRangePicker = () => {
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [startTime, setStartTime] = useState('9:00 AM');
  const [endTime, setEndTime] = useState('5:00 PM');
  const [startTimeValue, setStartTimeValue] = useState(540); // 9:00 AM in minutes
  const [endTimeValue, setEndTimeValue] = useState(1020); // 5:00 PM in minutes
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [calendarDates, setCalendarDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [startTimeTooltip, setStartTimeTooltip] = useState('');
  const [endTimeTooltip, setEndTimeTooltip] = useState('');
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);
  
  // Total minutes in a day (24 hours * 60 minutes)
  const totalMinutes = 24 * 60;
  
  // Refs for tooltip positioning
  const startSliderRef = useRef(null);
  const endSliderRef = useRef(null);
  
  // Initialize calendar on component mount and when month/year changes
  useEffect(() => {
    generateCalendarDates(currentMonth, currentYear);
  }, [currentMonth, currentYear]);
  
  // Generate calendar dates for the current month view
  const generateCalendarDates = (month, year) => {
    const dates = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get previous month's days to fill the first row
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      dates.push({
        date: prevMonthDays - i,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false
      });
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        date: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Calculate how many days from next month are needed to complete the calendar
    const remainingDays = 42 - dates.length; // 6 rows of 7 days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        date: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false
      });
    }
    
    setCalendarDates(dates);
  };
  
  // Navigate to previous month
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (year, month, date) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  };
  
  // Handle calendar date selection
  const handleDateSelect = (year, month, date) => {
    const selectedDate = formatDate(year, month, date);
    
    if (!fromDate || isSelectingEndDate) {
      // If no start date or explicitly selecting end date
      if (!fromDate) {
        setFromDate(selectedDate);
        setToDate('');
        setIsSelectingEndDate(true);
      } else {
        // Ensure end date is after start date
        if (selectedDate >= fromDate) {
          setToDate(selectedDate);
          setIsSelectingEndDate(false);
        } else {
          // If selected date is before from date, swap them
          setToDate(fromDate);
          setFromDate(selectedDate);
          setIsSelectingEndDate(false);
        }
      }
    } else {
      // Start new selection
      setFromDate(selectedDate);
      setToDate('');
      setIsSelectingEndDate(true);
    }
  };
  
  // Convert minutes to formatted time string (12-hour format with AM/PM)
  const formatTimeFromMinutes = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = Math.floor(minutes % 60);
    const isPM = hour >= 12;
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    
    // Round minute to nearest 30
    const roundedMinute = Math.round(minute / 30) * 30;
    const formattedMinute = roundedMinute === 60 ? 0 : roundedMinute;
    
    // Adjust hour if minutes were rounded up to next hour
    const adjustedHour = formattedMinute === 0 && roundedMinute === 60 
      ? (displayHour % 12) + 1 
      : displayHour;
    
    return `${adjustedHour}:${formattedMinute === 0 ? '00' : formattedMinute} ${isPM ? 'PM' : 'AM'}`;
  };
  
  // Handle start time slider change - now independent from end time
  const handleStartTimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setStartTimeValue(value);
    setStartTime(formatTimeFromMinutes(value));
    setStartTimeTooltip(formatTimeFromMinutes(value));
  };
  
  // Handle end time slider change - now independent from start time
  const handleEndTimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEndTimeValue(value);
    setEndTime(formatTimeFromMinutes(value));
    setEndTimeTooltip(formatTimeFromMinutes(value));
  };
  
  // Handle start time slider mouse events for tooltip
  const handleStartTimeMouseDown = (e) => {
    setShowStartTooltip(true);
    const value = parseInt(e.target.value, 10);
    setStartTimeTooltip(formatTimeFromMinutes(value));
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle end time slider mouse events for tooltip
  const handleEndTimeMouseDown = (e) => {
    setShowEndTooltip(true);
    const value = parseInt(e.target.value, 10);
    setEndTimeTooltip(formatTimeFromMinutes(value));
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle mouse up to hide tooltips
  const handleMouseUp = () => {
    setShowStartTooltip(false);
    setShowEndTooltip(false);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Generate time ticks for the slider (every 3 hours)
  const generateTimeTicks = () => {
    const ticks = [];
    for (let hour = 0; hour < 24; hour += 3) {
      const isPM = hour >= 12;
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      ticks.push(
        <div 
          key={hour} 
          className="position-absolute text-secondary" 
          style={{ 
            left: `${(hour * 60 / totalMinutes) * 100}%`, 
            top: '20px',
            transform: 'translateX(-50%)',
            fontSize: '0.7rem'
          }}
        >
          {`${displayHour}${isPM ? 'pm' : 'am'}`}
        </div>
      );
    }
    return ticks;
  };
  
  // Apply the selected date and time range
  const applySelection = () => {
    if (fromDate) {
      let formattedRange = '';
      
      if (toDate) {
        formattedRange = `${fromDate} ${startTime} - ${toDate} ${endTime}`;
      } else {
        formattedRange = `${fromDate} ${startTime} - ${endTime}`;
      }
      
      setSelectedDateRange(formattedRange);
      setShowModal(false);
    }
  };
  
  // Month names array
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Day names array
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Determine if a date is within the selected range
  const isDateInRange = (year, month, date) => {
    const currentDate = formatDate(year, month, date);
    return (fromDate && toDate) && (currentDate >= fromDate && currentDate <= toDate);
  };
  
  // Check if date is the start date
  const isStartDate = (year, month, date) => {
    const currentDate = formatDate(year, month, date);
    return currentDate === fromDate;
  };
  
  // Check if date is the end date
  const isEndDate = (year, month, date) => {
    const currentDate = formatDate(year, month, date);
    return currentDate === toDate;
  };
  
  // Reset the modal state
  const resetModal = () => {
    setFromDate('');
    setToDate('');
    setIsSelectingEndDate(false);
  };
  
  // CSS Styles
  const themeStyles = {
    mainColor: '#dc3545', // red
    secondaryColor: '#000', // black
    lightColor: '#fff', // white
    bgLight: '#f8f9fa',
    bgDark: '#212529'
  };
  
  // Calculate tooltip position based on slider value
  const calculateTooltipPosition = (value) => {
    return `${(value / (totalMinutes - 30)) * 100}%`;
  };
  
  return (
    <div className="container mt-4">
      {/* Date Time Field */}
      <div className="form-group">
        <label htmlFor="dateTimeRange" className="form-label">Date & Time Range:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="dateTimeRange"
            placeholder="Select date and time range"
            value={selectedDateRange}
            readOnly
            onClick={() => setShowModal(true)}
          />
          <button 
            className="btn btn-outline-danger" 
            type="button"
            onClick={() => setShowModal(true)}
            style={{ borderColor: themeStyles.mainColor }}
          >
            <i className="bi bi-calendar"></i>
          </button>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: themeStyles.mainColor, color: themeStyles.lightColor }}>
                <h5 className="modal-title">Select Date & Time Range</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                  style={{ filter: 'invert(1) brightness(200%)' }} // Make the close button white
                ></button>
              </div>
              <div className="modal-body">
                {/* Date Selection */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Select Date Range</h6>
                    <div className="btn-group">
                      <button 
                        className="btn btn-sm" 
                        onClick={previousMonth}
                        style={{ 
                          backgroundColor: themeStyles.lightColor, 
                          borderColor: themeStyles.mainColor,
                          color: themeStyles.mainColor
                        }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <span className="btn btn-sm disabled"
                        style={{ 
                          borderColor: themeStyles.mainColor,
                          backgroundColor: themeStyles.lightColor,
                          color: themeStyles.secondaryColor
                        }}
                      >
                        {monthNames[currentMonth]} {currentYear}
                      </span>
                      <button 
                        className="btn btn-sm" 
                        onClick={nextMonth}
                        style={{ 
                          backgroundColor: themeStyles.lightColor, 
                          borderColor: themeStyles.mainColor,
                          color: themeStyles.mainColor
                        }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Calendar */}
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                      <table className="table table-bordered table-calendar mb-0">
                        <thead style={{ backgroundColor: themeStyles.secondaryColor, color: themeStyles.lightColor }}>
                          <tr>
                            {dayNames.map((day, index) => (
                              <th key={index} className="text-center py-1">
                                <small>{day}</small>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array(6).fill().map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {Array(7).fill().map((_, colIndex) => {
                                const dateIndex = rowIndex * 7 + colIndex;
                                const dateObj = calendarDates[dateIndex];
                                if (!dateObj) return <td key={colIndex}></td>;
                                
                                const isInRange = isDateInRange(dateObj.year, dateObj.month, dateObj.date);
                                const isStart = isStartDate(dateObj.year, dateObj.month, dateObj.date);
                                const isEnd = isEndDate(dateObj.year, dateObj.month, dateObj.date);
                                
                                let cellStyle = {};
                                let cellClasses = "text-center py-1";
                                
                                if (!dateObj.isCurrentMonth) {
                                  cellClasses += " text-muted";
                                }
                                
                                if (isInRange) {
                                  cellStyle.backgroundColor = '#ffebee'; // Light red background
                                }
                                
                                if (isStart || isEnd) {
                                  cellStyle.backgroundColor = themeStyles.mainColor;
                                  cellStyle.color = themeStyles.lightColor;
                                  cellStyle.fontWeight = 'bold';
                                  // Add stronger highlight with a border
                                  cellStyle.border = '2px solid ' + themeStyles.secondaryColor;
                                }
                                
                                return (
                                  <td 
                                    key={colIndex} 
                                    className={cellClasses}
                                    onClick={() => handleDateSelect(dateObj.year, dateObj.month, dateObj.date)}
                                    style={{ 
                                      ...cellStyle,
                                      cursor: 'pointer',
                                      padding: '8px 0'
                                    }}
                                  >
                                    {dateObj.date}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="mt-2 d-flex justify-content-between">
                    <small style={{ color: themeStyles.secondaryColor }}>
                      {fromDate && !toDate ? 
                        'Now select end date' : 
                        fromDate && toDate ? 
                          `Selected: ${fromDate} to ${toDate}` : 
                          'Select start date'}
                    </small>
                    {(fromDate || toDate) && (
                      <button 
                        className="btn btn-sm"
                        onClick={resetModal}
                        style={{ color: themeStyles.mainColor, padding: '0px 5px' }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Time Range Selection */}
                <div className="card border-0 shadow-sm mt-3">
                  <div className="card-header" style={{ backgroundColor: themeStyles.secondaryColor, color: themeStyles.lightColor }}>
                    <h6 className="mb-0">Select Time Range</h6>
                  </div>
                  <div className="card-body">
                    {/* Start Time Slider */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="startTimeSlider" className="form-label">
                          Start Time:
                        </label>
                        <span className="badge" style={{ backgroundColor: themeStyles.mainColor }}>{startTime}</span>
                      </div>
                      <div className="position-relative mb-3" style={{ height: '45px' }} ref={startSliderRef}>
                        <input
                          type="range"
                          className="form-range"
                          id="startTimeSlider"
                          min="0"
                          max={totalMinutes - 30}
                          step="30"
                          value={startTimeValue}
                          onChange={handleStartTimeChange}
                          onMouseDown={handleStartTimeMouseDown}
                          style={{ 
                            accentColor: themeStyles.mainColor,
                            color: themeStyles.mainColor
                          }}
                        />
                        {generateTimeTicks()}
                        
                        {/* Start Time Tooltip */}
                        {showStartTooltip && (
                          <div 
                            className="position-absolute py-1 px-2 rounded"
                            style={{
                              left: calculateTooltipPosition(startTimeValue),
                              top: '-35px',
                              transform: 'translateX(-50%)',
                              backgroundColor: themeStyles.mainColor,
                              color: themeStyles.lightColor,
                              fontSize: '0.8rem',
                              zIndex: 10,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {startTimeTooltip}
                            <div 
                              style={{
                                position: 'absolute',
                                bottom: '-5px',
                                left: '50%',
                                marginLeft: '-5px',
                                borderWidth: '5px',
                                borderStyle: 'solid',
                                borderColor: `${themeStyles.mainColor} transparent transparent transparent`
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* End Time Slider */}
                    <div>
                      <div className="d-flex justify-content-between">
                        <label htmlFor="endTimeSlider" className="form-label">
                          End Time:
                        </label>
                        <span className="badge" style={{ backgroundColor: themeStyles.mainColor }}>{endTime}</span>
                      </div>
                      <div className="position-relative mb-2" style={{ height: '45px' }} ref={endSliderRef}>
                        <input
                          type="range"
                          className="form-range"
                          id="endTimeSlider"
                          min="0"
                          max={totalMinutes - 30}
                          step="30"
                          value={endTimeValue}
                          onChange={handleEndTimeChange}
                          onMouseDown={handleEndTimeMouseDown}
                          style={{ 
                            accentColor: themeStyles.mainColor,
                            color: themeStyles.mainColor
                          }}
                        />
                        {generateTimeTicks()}
                        
                        {/* End Time Tooltip */}
                        {showEndTooltip && (
                          <div 
                            className="position-absolute py-1 px-2 rounded"
                            style={{
                              left: calculateTooltipPosition(endTimeValue),
                              top: '-35px',
                              transform: 'translateX(-50%)',
                              backgroundColor: themeStyles.mainColor,
                              color: themeStyles.lightColor,
                              fontSize: '0.8rem',
                              zIndex: 10,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {endTimeTooltip}
                            <div 
                              style={{
                                position: 'absolute',
                                bottom: '-5px',
                                left: '50%',
                                marginLeft: '-5px',
                                borderWidth: '5px',
                                borderStyle: 'solid',
                                borderColor: `${themeStyles.mainColor} transparent transparent transparent`
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn" 
                  onClick={() => setShowModal(false)}
                  style={{ 
                    backgroundColor: themeStyles.lightColor, 
                    color: themeStyles.secondaryColor,
                    borderColor: themeStyles.secondaryColor
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={applySelection}
                  disabled={!fromDate}
                  style={{ 
                    backgroundColor: themeStyles.mainColor, 
                    color: themeStyles.lightColor,
                    borderColor: themeStyles.mainColor,
                    opacity: !fromDate ? 0.65 : 1
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeRangePicker;