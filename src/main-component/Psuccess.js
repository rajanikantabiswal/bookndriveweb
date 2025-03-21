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
      MySwal.fire('You have successfully booked your car. Enjoy the driving.');
      const { navigate } = this.props;
      navigate("../booking-list");
      window.location.replace('../booking-list');
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
  