import React, { Component,Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { https } from "../../components/AuthUser";
import {
    FaPhoneAlt,
    FaUserAlt,
} from "react-icons/fa";

function NavigateWrapper() {
    const navigate = useNavigate();
  
    return <FindCar1 navigate={navigate} />;
  }

class FindCar1 extends Component {
 
    constructor(props) {
        super(props);
        
        this.car_image = React.createRef()
        this.state = { city: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            carArray: []
        };

        this.imagestore = this.imagestore.bind(this);
        this.https = https();
      }

      componentDidMount() {
        this.imagestore()
    }

    imagestore() {
        this.https.post('/city_list',{token:this.token}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
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
    
      handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem("city",this.state.city);
        const d=true;
       
        if(this.state.city==null ||  this.state.city==''    ){ const d=false; alert('Please Select City'); }
      

        if(d==true){
            const { navigate } = this.props;
            navigate('../search');
            
        }
      
     
      }

     
      
    render() {
  
        var i = 0;
        const listItems = this.state.carArray.map((val, key) =>{
            i++;
    
            return (
             
                    <option value={val.city}>{val.city}</option>
                  
            )
        });


    return (
        <Fragment>
           <section className="rent-drive-find-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="find-box">
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <div className="find-text">
                                        <h3>Search Your Best<br/> Cars Here.</h3>
                                    </div>
                                </Col>
                                <Col md={2}></Col>
                                <Col md={6}>
                                    <div className="find-form">
                                        <Form onSubmit={this.handleSubmit} id="account_form">
                                            <Row>
                                                <Col md={6}>
                                                    <p>
                                                   
                                                        <select
                                                            type="text"
                                                            name="city"
                                                            placeholder="From Address"
                                                            className="form-control city"
                                                            value={this.state.city}
                                                            onChange={this.handleChange}
                                                            >
                                                            <option value="">Select City</option>
                                                            <option value="Bhubaneswar">Bhubaneswar</option>
                                                           

                                                        </select>
                                                    </p>
                                                </Col>
                                                
                                                </Row><Row>
                                                <Col md={6}>
                                                    <p>
                                                        <button type="submit" className="rent-drive-theme-btn">
                                                            Find Car
                                                        </button>
                                                    </p>
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
           </section>
        </Fragment>
    );
}
};

export default NavigateWrapper;
