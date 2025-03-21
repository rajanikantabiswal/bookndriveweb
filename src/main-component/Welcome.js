import React, { Fragment,Component,useRef } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import AuthUser,{ logOut,https } from "../components/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col,Alert } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";
import "../css/Login.css";
import LoginPages from "./LoginPages2";
import ReCAPTCHA from "react-google-recaptcha"
import $ from "jquery";
import refresh from  "../img/refresh.png"
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function NavigateWrapper() {
    const navigate = useNavigate();

    return <LoginPage navigate={navigate} />;
}
class LoginPage extends Component {

   constructor(props) {
      super(props)
      this.state = {mobile_number:localStorage.getItem('mobile_number'),messages:'',checkbox:false, capchaimg:'',capchatext:'',capchastatus:1,captcha:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.imagestore = this.imagestore.bind(this);
      this.handleChange1 = this.handleChange1.bind(this)
      this.https = https();
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
     
      var name = localStorage.getItem('name') ? localStorage.getItem('name') : '';
      var email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
      var address = localStorage.getItem('address') ? localStorage.getItem('address') : '';


      this.https.post('/mobile_verify',{mobile_number:this.state.mobile_number,name:name,email:email,address:address,checkbox:this.state.checkbox,capchatext:this.state.capchatext,captcha:this.state.captcha}).then((result)=>{
          let status=result.data.status; 
          if(status === 1){
              localStorage.setItem('userData', result.data.otp);
              localStorage.setItem('mobile_number', this.state.mobile_number);
              const { navigate } = this.props;
              navigate('../otp');
          } else {

            const MySwal = withReactContent(Swal);
            MySwal.fire(result.data.message);
          }


      })
     
 
   
    }


    refreshImage = (event) => {
        
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let string = '';
      
        for (let i = 0; i < 6; i++) {
          string += characters[Math.floor(Math.random() * characters.length)];
        }
        
       
        const url = 'https://loanshopy.finance/finance/Captcha/captca?text='+string;
        this.setState({
            capchaimg: url,
            capchatext:string
        })

      };


    componentDidMount() {
        this.imagestore()
    }

    imagestore() {
     
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let string = '';
      
        for (let i = 0; i < 6; i++) {
          string += characters[Math.floor(Math.random() * characters.length)];
        }
        
       
        const url = 'https://loanshopy.finance/finance/Captcha/captca?text='+string;
        this.setState({
            capchaimg: url,
            capchatext:string
        })
    }


    handleChange1(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            captcha: value
         });

        
  
        if(value.length==6){

          const sts= this.state.capchatext===value ? true : false;
          if(sts===false) {
            
            this.setState({
                capchastatus:2
            }) 

          } else {
            this.setState({
                capchastatus:3
            }) 
          }

          


        }
  
        
      }
 
   render() {

    let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }


    let style = {};
    if (this.state.capchastatus === 2) {
      style = {
        border: '1px solid red',
      };
    } else if (this.state.capchastatus === 3) {
      style = {
        border: '1px solid green',
      };
    }
 
      return (
        <Fragment>
        <Header />
       
        <section className="rent-drive-login-area section_70">
            <Container>
                <Row>
                <Col md={3}></Col>
                    <Col md={6}>
                        <div className="">

                            <div className="login-page-heading">
                                <h5>Thank you for showing intrest for sharing your car with us. We will contact you soon.</h5>
                            </div>
                           
                       
                            

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Footer />
    </Fragment>
    )
   }
 }

export default NavigateWrapper;

