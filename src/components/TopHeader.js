import { getToken } from "./AuthUser";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "./AuthUser";
import "../css/header.css";
import {
  FaPowerOff,
  FaSignInAlt,
  FaUserAlt,
} from "react-icons/fa";

let userData = getUser();
class TopHeader extends Component {
  render() {
    let token = getToken();
    
    let dashboard = "";
    let logBtn="";
    let logBtn2="";

    if (userData) {
      logBtn = (
        <Link to="/logout" className="btn btn-dark d-flex align-items-center">
          <FaPowerOff className="me-2"/> Logout{" "}
        </Link>
      );
      dashboard = (
        <Link to="/dashboard" className="btn btn-dark d-flex align-items-center">
          <FaUserAlt className="me-2" /> Dashboard{" "}
        </Link>
      );
      if (userData.role === 1) {
      logBtn2='Welcome   '+userData.name+'    ';
      } 
  
    return (
      <>
      
        <div className="btn d-none d-md-inline-block">{logBtn2}</div>
        {dashboard}
        {logBtn}
        
        
        </> 
    );
    } else {
      let logBtn = (
        <Link className="btn btn-dark me-2" to="/login">
          <FaSignInAlt /> Login{" "}
        </Link>
        
      );
  
      let logBtn2 = (
        <Link className="btn btn-theme btn-danger" to="/register">
          <FaSignInAlt /> Signup{" "}
        </Link>
        
      );
  
      return (
        <>
        
          {logBtn}
          {logBtn2}
          
          </> 
      );
    }
  }
}

export default TopHeader;
