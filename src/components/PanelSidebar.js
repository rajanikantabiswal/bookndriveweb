import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaCog,
  FaPowerOff,
  FaCartPlus,
  FaUsers,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { getUser } from "./AuthUser";
import "./Promo.css";
import "../css/PanelSidebar.css";


let userData = getUser();
class PanelSidebar extends Component {
  constructor(props) {
    super(props);
    this.sidebarRef = React.createRef();
    this.buttonRef = React.createRef();
    this.state = {
      isMenuOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.sidebarRef.current &&
      !this.sidebarRef.current.contains(event.target) &&
      !this.buttonRef.current.contains(event.target)
    ) {
      this.setState({ isMenuOpen: false });
    }
  };

  openSideMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const menuStatus = this.state.isMenuOpen
      ? "SideBarMob open"
      : "SideBarMob hidden";

    if (userData.role === 1) {
      const role = "Super Admin";
      return (
        <div className="sidebarArea">
          <div className="SideBarMob-header">
            <div className="row">
              <div className="col">
                <h2>Menu</h2>
              </div>
              <div className="col side-btn">
                <button
                  className="btn btn-dark"
                  ref={this.buttonRef}
                  onClick={this.openSideMenu}
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
          <div ref={this.sidebarRef} className={menuStatus}>
            <div className="sidebar ">
              <div class="user-basic-info">
                <div class="user-icon"></div>
                <p class="user-name">{userData.name}</p>
                <p class="user-phone-number">{userData.mobile_number}</p>
                <p>{role}</p>
              </div>
            </div>

            <div class="sidebar">
              <Link to="/dashboard">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaCog />
                  </i>
                  &nbsp;&nbsp;Dashboard
                </div>
              </Link>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaCar />
                  </i>
                  &nbsp;&nbsp; Pickup/Drop Adress{" "}
                </a>
                <div class="dropdown-content">
                  <Link to="/add-city">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Add Adress
                    </div>
                  </Link>
                  <Link to="/list-city-active">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Adress List
                    </div>
                  </Link>
                  {/* <Link to="/list-city-dactive">
          <div class="tab-item">
            <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Adress
          </div>
        </Link> */}
                </div>
              </div>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp; User
                </a>
                <div class="dropdown-content">
                  <Link to="/add-user">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Add User
                    </div>
                  </Link>
                  <Link to="/list-user">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; User List
                    </div>
                  </Link>
                </div>
              </div>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaCar />
                  </i>
                  &nbsp;&nbsp; Make
                </a>
                <div class="dropdown-content">
                  <Link to="/add-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Add Make
                    </div>
                  </Link>
                  <Link to="/list-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Make List
                    </div>
                  </Link>
                  {/* <Link to="/list-car-dactive">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Make List
                  </div>
                </Link> */}
                </div>
              </div>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaCar />
                  </i>
                  &nbsp;&nbsp; Model
                </a>
                <div class="dropdown-content">
                  <Link to="/add-model">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Add Model
                    </div>
                  </Link>
                  <Link to="/list-model">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Model List
                    </div>
                  </Link>
                  {/*         
        <Link to="/list-model-dactive">
          <div class="tab-item">
            <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Model List
          </div>
        </Link> */}
                </div>
              </div>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaCar />
                  </i>
                  &nbsp;&nbsp; Variant
                </a>
                <div class="dropdown-content">
                  <Link to="/add-variant">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Add Variant
                    </div>
                  </Link>
                  <Link to="/list-variant">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Variant List
                    </div>
                  </Link>

                  {/* <Link to="/list-variant-dactive">
                  <div class="tab-item">
                  <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Variant List
                  </div>
                </Link> */}
                </div>
              </div>
              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp; Vendor
                </a>
                <div class="dropdown-content">
                  <Link to="/add-vendor">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Add Vendor
                    </div>
                  </Link>
                  <Link to="/list-vendor">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Vendor List
                    </div>
                  </Link>

                  {/* <Link to="/list-vendor-dactive">
                  <div class="tab-item">
                  <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaUsers /></i>&nbsp;&nbsp; Dactive Variant List
                  </div>
                </Link> */}
                </div>
              </div>

              {/* <Link to="/all-car">
            <div class="tab-item tab-active">
              <i class="material-icons side-menu-icon"><FaCar /></i>&nbsp;&nbsp;All Car
            </div>
            </Link> */}

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaCar />
                  </i>
                  &nbsp;&nbsp; Car Master
                </a>
                <div class="dropdown-content">
                  <Link to="/vendor-add-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Add Car
                    </div>
                  </Link>
                  <Link to="/all-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Car List
                    </div>
                  </Link>
                  <Link to="/refund-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Refund Car
                    </div>
                  </Link>

                  <Link to="/return-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Return Car
                    </div>
                  </Link>

                  <Link to="/service-car">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaCar />
                      </i>
                      &nbsp;&nbsp; Service Car
                    </div>
                  </Link>

                  {/* <Link to="/vendor-list-car-dactive">
                  <div class="tab-item">
                  <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Car List
                  </div>
                </Link> */}
                </div>
              </div>

              <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp; Coupon Master
                </a>
                <div class="dropdown-content">
                  <Link to="/add-Coupon">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Add Coupon
                    </div>
                  </Link>
                  <Link to="/list-Coupon">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Coupon List
                    </div>
                  </Link>
                </div>
              </div>
              <Link to="/list-customer">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp;Customer
                </div>
              </Link>
              <Link to="/hostlist">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp;Host List
                </div>
              </Link>
              <Link to="/booking-list">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaCartPlus />
                  </i>
                  &nbsp;&nbsp;Bookings
                </div>
              </Link>
              <Link to="/cancel-order">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaCartPlus />
                  </i>
                  &nbsp;&nbsp;Cancel Request
                </div>
              </Link>
              <Link to="/logout">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaPowerOff />
                  </i>
                  &nbsp;&nbsp;Logout
                </div>
              </Link>

              <div class="margintop"></div>
            </div>
          </div>
        </div>
      );
    }

    if (userData.role === 4) {
      const role = "Admin";
      return (
        <div className="sidebarArea">
          <div className="SideBarMob-header">
            <div className="row">
              <div className="col">
                <h2>Menu</h2>
              </div>
              <div className="col side-btn">
                <button
                  className="btn btn-dark"
                  ref={this.buttonRef}
                  onClick={this.openSideMenu}
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
          <div ref={this.sidebarRef} className={menuStatus}>
          <div className="sidebar ">
            <div class="user-basic-info">
              <div class="user-icon"></div>
              <p class="user-name">{userData.name}</p>
              <p class="user-phone-number">{userData.mobile_number}</p>
              <p>{role}</p>
            </div>
          </div>

          <div class="sidebar">
            <Link to="/dashboard">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaCog />
                </i>
                &nbsp;&nbsp;Dashboard
              </div>
            </Link>

            <div class="dropdown">
              <a href="javascript:void(0)" class="dropdown-btn">
                <i class="material-icons side-menu-icon">
                  <FaUsers />
                </i>
                &nbsp;&nbsp; Vendor
              </a>
              <div class="dropdown-content">
                <Link to="/add-vendor">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaUsers />
                    </i>
                    &nbsp;&nbsp; Add Vendor
                  </div>
                </Link>
                <Link to="/list-vendor">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaUsers />
                    </i>
                    &nbsp;&nbsp; Vendor List
                  </div>
                </Link>

                {/* <Link to="/list-vendor-dactive">
          <div class="tab-item">
           <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaUsers /></i>&nbsp;&nbsp; Dactive Variant List
          </div>
        </Link> */}
              </div>
            </div>

            <div class="dropdown">
              <a href="javascript:void(0)" class="dropdown-btn">
                <i class="material-icons side-menu-icon">
                  <FaCar />
                </i>
                &nbsp;&nbsp; Car Master
              </a>
              <div class="dropdown-content">
                <Link to="/vendor-add-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaCar />
                    </i>
                    &nbsp;&nbsp; Add Car
                  </div>
                </Link>
                <Link to="/all-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaCar />
                    </i>
                    &nbsp;&nbsp; Car List
                  </div>
                </Link>
                <Link to="/refund-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaCar />
                    </i>
                    &nbsp;&nbsp; Refund Car
                  </div>
                </Link>

                <Link to="/return-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaCar />
                    </i>
                    &nbsp;&nbsp; Return Car
                  </div>
                </Link>

                <Link to="/service-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      &nbsp;&nbsp;
                      <FaCar />
                    </i>
                    &nbsp;&nbsp; Service Car
                  </div>
                </Link>

                {/* <Link to="/vendor-list-car-dactive">
          <div class="tab-item">
           <i class="material-icons side-menu-icon">&nbsp;&nbsp;<FaCar /></i>&nbsp;&nbsp; Dactive Car List
          </div>
        </Link> */}
              </div>
            </div>

            <div class="dropdown">
                <a href="javascript:void(0)" class="dropdown-btn">
                  <i class="material-icons side-menu-icon">
                    <FaUsers />
                  </i>
                  &nbsp;&nbsp; Coupon Master
                </a>
                <div class="dropdown-content">
                  <Link to="/add-Coupon">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Add Coupon
                    </div>
                  </Link>
                  <Link to="/list-Coupon">
                    <div class="tab-item">
                      <i class="material-icons side-menu-icon">
                        &nbsp;&nbsp;
                        <FaUsers />
                      </i>
                      &nbsp;&nbsp; Coupon List
                    </div>
                  </Link>
                </div>
              </div>

            <Link to="/list-customer">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaUsers />
                </i>
                &nbsp;&nbsp;Customer
              </div>
            </Link>
            <Link to="/hostlist">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaUsers />
                </i>
                &nbsp;&nbsp;Host List
              </div>
            </Link>
            <Link to="/booking-list">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaCartPlus />
                </i>
                &nbsp;&nbsp;Bookings
              </div>
            </Link>

            <Link to="/cancel-order">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaCartPlus />
                </i>
                &nbsp;&nbsp;Cancel Request
              </div>
            </Link>

            <Link to="/logout">
              <div class="tab-item tab-active">
                <i class="material-icons side-menu-icon">
                  <FaPowerOff />
                </i>
                &nbsp;&nbsp;Logout
              </div>
            </Link>

            <div class="margintop"></div>
          </div>
        </div>
        </div>
      );
    }

    if (userData.role === 2) {
      const role = "Vendor";
      return (
        <div className="sidebarArea">
          <div className="SideBarMob-header">
            <div className="row">
              <div className="col">
                <h2>Menu</h2>
              </div>
              <div className="col side-btn">
                <button
                  className="btn btn-dark"
                  ref={this.buttonRef}
                  onClick={this.openSideMenu}
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
          <div ref={this.sidebarRef} className={menuStatus}>
          <div className="sidebar ">
            <div class="user-basic-info">
              <div class="user-icon"></div>
              <p class="user-name">{userData.name}</p>
              <p class="user-phone-number">{userData.mobile_number}</p>
              <p>{role}</p>
            </div>

            <ul class="profile-tabs">
              <li>
                <Link to="/dashboard">
                  <div class="tab-item tab-active">
                    <i class="material-icons side-menu-icon">
                      <FaCog />
                    </i>
                    <div class="tab-selection-indicator side-menu-icon"></div>
                    <span role="tab" class="tab-text">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/my-list-car">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      <FaCar />
                    </i>
                    <div class="tab-selection-indicator side-menu-icon"></div>
                    <span role="tab" class="tab-text ">
                      Car List
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/my-booking-list">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      <FaCartPlus />
                    </i>
                    <div class="tab-selection-indicator side-menu-icon"></div>
                    <span role="tab" class="tab-text ">
                      My Bookings
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/my-passbook">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      <FaBars />
                    </i>
                    <div class="tab-selection-indicator side-menu-icon"></div>
                    <span role="tab" class="tab-text ">
                      My Passbook
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/logout">
                  <div class="tab-item">
                    <i class="material-icons side-menu-icon">
                      <FaPowerOff />
                    </i>
                    <div class="tab-selection-indicator side-menu-icon"></div>
                    <span role="tab" class="tab-text">
                      Logout
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
      );
    }

    if (userData.role === 3) {
      return (
        <div className="sidebarArea">
          <div className="SideBarMob-header">
            <div className="row">
              <div className="col">
                <h2>Menu</h2>
              </div>
              <div className="col side-btn">
                <button
                  className="btn btn-dark"
                  ref={this.buttonRef}
                  onClick={this.openSideMenu}
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
          <div ref={this.sidebarRef} className={menuStatus}>
          <div className="sidebar ">
            <div class="user-basic-info">
              <div class="user-icon"></div>
              <p class="user-name">{userData.name}</p>
              <p class="user-phone-number">{userData.mobile_number}</p>
            </div>

            <div class="sidebar">
              <Link to="/dashboard">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaCog />
                  </i>
                  &nbsp;&nbsp;My Profile
                </div>
              </Link>
              <Link to="/booking-list">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaCartPlus />
                  </i>
                  &nbsp;&nbsp;Booking
                </div>
              </Link>
              <Link to="/verification">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaUser />
                  </i>
                  &nbsp;&nbsp;Profile Verification
                </div>
              </Link>

              <Link to="/logout">
                <div class="tab-item tab-active">
                  <i class="material-icons side-menu-icon">
                    <FaPowerOff />
                  </i>
                  &nbsp;&nbsp;Logout
                </div>
              </Link>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default PanelSidebar;
