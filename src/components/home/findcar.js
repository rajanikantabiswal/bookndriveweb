import React, { Component, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../css/header.css";
import { https } from "../../components/AuthUser";
import moment from "moment";
import $ from "jquery";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Import third-party libraries for the custom overlay
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function NavigateWrapper() {
  const navigate = useNavigate();
  return <FindCar navigate={navigate} />;
}

class FindCar extends Component {
  constructor(props) {
    super(props);
    this.https = https();
    let now = new Date();
    // Use existing default date range (start and end) values
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    let end = moment(start).add(4, "days").subtract(1, "seconds");

    this.state = {
      messages: "",
      // These two properties are used by other pages.
      selectedDate: null,
      selectedDate2: null,
      // Keep the default values separately.
      start: start.toDate(),
      end: end.toDate(),
      city: "",
      from: "",
      date: "",
      date1: "",
      carArray: [],
      // Show/hide for our new date range overlay
      showRangePicker: false,
      // Temporary values for the overlay.
      tempStartDate: start.toDate(),
      tempEndDate: end.toDate(),
      tempStartTime: this.getStartTime(), // 6:00 PM
      tempEndTime: this.getEndTime(),   // 12:00 PM
      // Calendar view state (we keep both states; nextMonth is computed separately for display)
      currentMonth: new Date(2025, 2, 1), // March 2025
      nextMonth: new Date(2025, 3, 1),      // April 2025
    };

    // Bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imagestore = this.imagestore.bind(this);

    // Bind overlay methods
    this.toggleRangePicker = this.toggleRangePicker.bind(this);
    this.resetRangePicker = this.resetRangePicker.bind(this);
    // Use a single onChange for the calendar range selection
    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.onSliderChangeStart = this.onSliderChangeStart.bind(this);
    this.onSliderChangeEnd = this.onSliderChangeEnd.bind(this);
    this.handleRangeContinue = this.handleRangeContinue.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.isTileSelected = this.isTileSelected.bind(this);
    this.isTileInRange = this.isTileInRange.bind(this);
  }

  componentDidMount() {
    this.imagestore();
    $(document).ready(function () {
      // Existing jQuery snippets if needed...
    });
  }

  getStartTime = () => {
    const now = new Date();
    let minutes = now.getMinutes();
    let hour = now.getHours();
  
    // If current minutes > 0, move to the next hour
    let startHour = minutes > 0 ? hour + 1 : hour;
    
    // If the next hour is 24 (midnight), reset to 0
    return startHour % 24;
  };
  
  getEndTime = () => {
    let startHour = this.getStartTime(); // Get the valid start time
    let endHour = (startHour + 12) % 24; // 12-hour gap
  
    return endHour;
  };

  imagestore() {
    this.https.post("/city_list", { token: this.token, type: 1 }).then((result) => {
      let status = result.data.status;
      if (status === 1) {
        this.setState({
          carArray: result.data.data,
        });
      }
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // Main form submission: uses selectedDate and selectedDate2 values.
  handleSubmit(event) {
    event.preventDefault();
    const { from, selectedDate, selectedDate2 } = this.state;
    if (!from) {
      const MySwal = withReactContent(Swal);
      MySwal.fire("Please Select Pickup Address");
      return;
    }
    if (!selectedDate || !selectedDate2) {
      const MySwal = withReactContent(Swal);
      MySwal.fire("Please Select a Date Range");
      return;
    }

    // Format the range for storage (using your formatting logic)
    const formattedStart = new Date(selectedDate).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    
    const formattedEnd = new Date(selectedDate2).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const dateRange = formattedStart + " - " + formattedEnd;
    localStorage.setItem("from", from);
    localStorage.setItem("date", dateRange);
    localStorage.setItem("formattedDate", selectedDate);
    localStorage.setItem("formattedDate2", selectedDate2)
    
    const { navigate } = this.props;
    navigate("../car-list");
  }

  /* ===== Custom Range Picker Methods ===== */
  toggleRangePicker() {
    this.setState((prevState) => ({
      showRangePicker: !prevState.showRangePicker,
      // Reset the calendar view if needed (keeping currentMonth and nextMonth)
      currentMonth: new Date(2025, 2, 1),
      nextMonth: new Date(2025, 3, 1),
    }));
  }

  // Reset the overlay values to defaults (using state.start and state.end)
  resetRangePicker() {
    const now = new Date();
    const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    const end = moment(start).add(4, "days").subtract(1, "seconds");

    this.setState({
      tempStartDate: start.toDate(),
      tempEndDate: end.toDate(),
      tempStartTime: 18,
      tempEndTime: 12,
    });
  }

  /**
   * Single onChange handler for the calendar.
   * With selectRange={true}, value is either a single Date or an array [startDate, endDate].
   */
  onCalendarChange(value) {
    if (Array.isArray(value)) {
      // When the user selects a range, value will be [startDate, endDate].
      // If end is not yet defined, set both to the same date.
      if (value[1]) {
        this.setState({
          tempStartDate: value[0],
          tempEndDate: value[1],
        });
      } else {
        this.setState({
          tempStartDate: value[0],
          tempEndDate: value[0],
        });
      }
    } else {
      // Single date selection so far.
      this.setState({
        tempStartDate: value,
        tempEndDate: value,
      });
    }
  }

  onSliderChangeStart(value) {
    const today = new Date();
    const selectedDate = this.state.tempStartDate;
    if (selectedDate.getDate() === today.getDate()) {
      if (value < this.getStartTime()) {
        this.setState({ tempStartTime: this.getStartTime() });
        return;
      }
    }
    this.setState({ tempStartTime: value });
    
  }

  onSliderChangeEnd(value) {
    this.setState({ tempEndTime: value });
  }

  // Disable past dates.
  disablePreviousDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Navigation for calendar months.
  handlePrevMonth() {
    this.setState((prevState) => {
      const newCurrentMonth = new Date(prevState.currentMonth);
      newCurrentMonth.setMonth(newCurrentMonth.getMonth() - 1);
      return {
        currentMonth: newCurrentMonth,
        nextMonth: new Date(newCurrentMonth.getFullYear(), newCurrentMonth.getMonth() + 1, 1),
      };
    });
  }

  handleNextMonth() {
    this.setState((prevState) => {
      const newCurrentMonth = new Date(prevState.currentMonth);
      newCurrentMonth.setMonth(newCurrentMonth.getMonth() + 1);
      return {
        currentMonth: newCurrentMonth,
        nextMonth: new Date(newCurrentMonth.getFullYear(), newCurrentMonth.getMonth() + 1, 1),
      };
    });
  }

  // Custom tile styling functions.
  isTileSelected(date) {
    const { tempStartDate, tempEndDate } = this.state;
    const isSameDay = (d1, d2) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    return isSameDay(date, tempStartDate) || isSameDay(date, tempEndDate);
  }

  isTileInRange(date) {
    const { tempStartDate, tempEndDate } = this.state;
    return date > tempStartDate && date < tempEndDate;
  }

  // On clicking CONTINUE, update the actual selectedDate values.
  handleRangeContinue() {
    const { tempStartDate, tempEndDate, tempStartTime, tempEndTime } = this.state;
    if (!tempStartDate || !tempEndDate) {
      const MySwal = withReactContent(Swal);
      MySwal.fire("Please select a valid date range");
      return;
    }
    let newSelectedDate = new Date(tempStartDate);
    newSelectedDate.setHours(tempStartTime, 0, 0, 0);

    const newSelectedDate2 = new Date(tempEndDate);
    newSelectedDate2.setHours(tempEndTime, 0, 0, 0);
    // Save to the existing state properties used by other pages.
    this.setState({
      selectedDate: newSelectedDate,
      selectedDate2: newSelectedDate2,
      showRangePicker: false,
    });
  }

  // Helper: Format a date with an hour value to "MMM D, YYYY h:00 AM/PM"
  formatDateTime(dateObj, hour24) {
    const datePart = moment(dateObj).format("MMM D, YYYY");
    let suffix = "AM";
    let displayHour = hour24;
    if (hour24 === 0) {
      displayHour = 12;
    } else if (hour24 === 12) {
      suffix = "PM";
    } else if (hour24 > 12) {
      displayHour = hour24 - 12;
      suffix = "PM";
    }
    return `${datePart} ${displayHour}:00 ${suffix}`;
  }

  // Utility to show slider value in 12-hour format.
  formatHour(hour24) {
    let suffix = "AM";
    let displayHour = hour24;
    if (hour24 === 0) {
      displayHour = 12;
    } else if (hour24 === 12) {
      suffix = "PM";
    } else if (hour24 > 12) {
      displayHour = hour24 - 12;
      suffix = "PM";
    }
    return `${displayHour}:00 ${suffix}`;
  }

  render() {
    const {
      messages,
      city,
      from,
      carArray,
      selectedDate,
      selectedDate2,
      showRangePicker,
      tempStartDate,
      tempEndDate,
      tempStartTime,
      tempEndTime,
      currentMonth,
      nextMonth,
    } = this.state;

    let msg = "";
    if (messages) {
      msg = <Alert variant="success">{messages}</Alert>;
    }

    // Pickup address list items.
    const listItems = carArray.map((val) => (
      <option key={val.city} value={val.city}>
        {val.city}
      </option>
    ));

    // Format displayed date range text if available.
    let displayRange = "";
    if (selectedDate && selectedDate2) {
      displayRange =
        this.formatDateTime(selectedDate, selectedDate.getHours()) +
        " - " +
        this.formatDateTime(selectedDate2, selectedDate2.getHours());
    }

    // Custom tile class name function for highlighting selected dates.
    const tileClassName = ({ date, view }) => {
      if (view === "month") {
        if (this.isTileSelected(date)) {
          return "selected-date";
        }
        if (this.isTileInRange(date)) {
          return "range-date";
        }
      }
      return null;
    };

    // Labels for the two months.
    const currentMonthName = moment(currentMonth).format("MMMM 'YY");
    const nextMonthName = moment(nextMonth).format("MMMM 'YY");

    return (
      <Fragment>
        <section className="rent-drive-find-area ones main-search" id="MainSearch">
          <Container className="g-0">
            <Row className="m-0">
              <Col md={12}>
                <div className="find-box rounded">
                  <Row className="align-items-center">
                    <Col md={12}>
                      <div className="find-form">
                        {msg}
                        <Form onSubmit={this.handleSubmit} id="account_form">
                          <Row className="g-3">
                            {/* City */}
                            <Col lg={3}>
                              <div className="form-group">
                                <label htmlFor="city">City</label>
                                <select
                                  name="city"
                                  className="form-control"
                                  value={city}
                                  onChange={this.handleChange}
                                >
                                  <option value="Bhubaneswar">Bhubaneswar</option>
                                </select>
                              </div>
                            </Col>

                            {/* Pickup Address */}
                            <Col lg={3}>
                              <div className="form-group">
                                <label htmlFor="from">Pickup Address</label>
                                <select
                                  name="from"
                                  className="form-control"
                                  value={from}
                                  onChange={this.handleChange}
                                >
                                  <option value="">Select Pickup Address</option>
                                  {listItems}
                                </select>
                              </div>
                            </Col>

                            {/* Single Date Range Input */}
                            <Col lg={4}>
                              <div className="form-group">
                                <label>Date Range</label>
                                <div className="d-flex">
                                  <input
                                    type="text"
                                    className="form-control"
                                    readOnly
                                    placeholder="Select date & time range"
                                    value={displayRange}
                                    onClick={this.toggleRangePicker}
                                    style={{ marginRight: "5px" }}
                                  />
                                </div>
                              </div>
                            </Col>

                            {/* Find Car Button */}
                            <Col lg={2}>
                              <div className="form-group">
                                <label htmlFor="submit">&nbsp;</label>
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

          {/* Custom Date/Time Range Picker Overlay */}
          {showRangePicker && (
            <div className="range-picker-modal">
              <div className="range-picker-backdrop" onClick={this.toggleRangePicker} />
              <div className="range-picker-content">
                {/* Header: shows selected range + RESET */}
                <div className="range-picker-header">
                  <div className="range-picker-dates">
                    <span className="date-icon">📅</span>{" "}
                    {this.formatDateTime(tempStartDate, tempStartTime)} -{" "}
                    {this.formatDateTime(tempEndDate, tempEndTime)}
                  </div>
                  <button type="button" className="range-picker-reset" onClick={this.resetRangePicker}>
                    RESET
                  </button>
                </div>

                {/* Calendar Navigation */}
                <div className="calendar-navigation">
                  <button className="calendar-nav-btn" onClick={this.handlePrevMonth}>
                    <span>‹</span>
                  </button>
                  <div className="calendar-months">
                    <span className="calendar-month-title">{currentMonthName}</span>
                    <span className="calendar-month-title">{nextMonthName}</span>
                  </div>
                  <button className="calendar-nav-btn" onClick={this.handleNextMonth}>
                    <span>›</span>
                  </button>
                </div>

                {/* Single Calendar with double view and range selection */}
                <div className="range-picker-calendars">
                  <Calendar
                    onChange={this.onCalendarChange}
                    selectRange={true}
                    value={[tempStartDate, tempEndDate]}
                    activeStartDate={currentMonth}
                    showNavigation={false} // Use custom navigation
                    minDetail="month"
                    tileClassName={tileClassName}
                    tileDisabled={this.disablePreviousDates}
                    showNeighboringMonth={false}
                    formatShortWeekday={(locale, date) => moment(date).format("ddd").charAt(0)}
                    showDoubleView={true}
                  />
                </div>

                {/* Time selection section */}
                <div className="range-picker-time-label">
                  Select the start time & end time
                </div>

                {/* Time sliders */}
                <div className="range-picker-sliders">
                  <div className="slider-group">
                    <div className="slider-label">Start Time</div>
                    <div className="slider-with-value">
                      <Slider
                        min={0}
                        max={23}
                        value={tempStartTime}
                        onChange={this.onSliderChangeStart}
                        railStyle={{ backgroundColor: "#e9e9e9", height: 6 }}
                        trackStyle={{ backgroundColor: "#028858", height: 6 }}
                        handleStyle={{
                          borderColor: "#028858",
                          backgroundColor: "#fff",
                          height: 20,
                          width: 20,
                          marginTop: -7,
                        }}
                      />
                      <div className="slider-value">{this.formatHour(tempStartTime)}</div>
                    </div>
                  </div>
                  <div className="slider-group">
                    <div className="slider-label">End Time</div>
                    <div className="slider-with-value">
                      <Slider
                        min={0}
                        max={23}
                        value={tempEndTime}
                        onChange={this.onSliderChangeEnd}
                        railStyle={{ backgroundColor: "#e9e9e9", height: 6 }}
                        trackStyle={{ backgroundColor: "#028858", height: 6 }}
                        handleStyle={{
                          borderColor: "#028858",
                          backgroundColor: "#fff",
                          height: 20,
                          width: 20,
                          marginTop: -7,
                        }}
                      />
                      <div className="slider-value">{this.formatHour(tempEndTime)}</div>
                    </div>
                  </div>
                </div>

                {/* Continue button */}
                <button className="range-picker-continue" onClick={this.handleRangeContinue}>
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </section>
      </Fragment>
    );
  }
}

export default NavigateWrapper;
