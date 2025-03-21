import React, { Component, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function NavigateWrapper() {
    const navigate = useNavigate();

    return <VehicalList navigate={navigate} />;
}

class VehicalList extends Component {

   constructor(props) {
      super(props)

      const MySwal = withReactContent(Swal);
      MySwal.fire('Invalid payment try again');
      const { navigate } = this.props;
      navigate("../car-booking");
      window.location.replace('../car-booking');
      
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
  