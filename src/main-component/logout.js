import React, { Component, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { logOut } from "../components/AuthUser";

function NavigateWrapper() {
    const navigate = useNavigate();

    return <VehicalList navigate={navigate} />;
}

class VehicalList extends Component {

   constructor(props) {
      super(props)

sessionStorage.removeItem('token');
sessionStorage.removeItem('user');
logOut();
      
    }

  

    render() {
    return (
        <Fragment>
        <section className="rent-drive-find-area ones main-search">
         
        </section>
        </Fragment>
      );
    }
  };
  
  export default NavigateWrapper;
  

