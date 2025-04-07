import React, { Fragment,Component,useRef } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import AuthUser,{ https,getToken } from "../components/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col,Alert } from "react-bootstrap";
import { FaKey, FaUser,FaAngleRight,FaHome } from "react-icons/fa";
import "../css/Login.css";
import LoginPages from "./LoginPages2";
import ReCAPTCHA from "react-google-recaptcha"
import $ from "jquery";
import refresh from  "../img/refresh.png"
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import config from "../config";

function NavigateWrapper() {
    const navigate = useNavigate();

    return <LoginPage navigate={navigate} />;
}
class LoginPage extends Component {

   constructor(props) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      super(props)
      this.state = {mobile_number:localStorage.getItem('mobile_number'),messages:'',checkbox:false, capchaimg:'',capchatext:'',capchastatus:1,captcha:''}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.imagestore = this.imagestore.bind(this);
      this.handleChange1 = this.handleChange1.bind(this)
      this.https = https();
      this.token=getToken();
     
    
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


      this.https.post('/mobile_verify',{mobile_number:this.state.mobile_number,name:name,email:email,address:address,checkbox:this.state.checkbox,capchatext:this.state.capchatext,captcha:this.state.captcha,type:1}).then((result)=>{
          let status=result.data.status; 
          if(status === 1){
              localStorage.setItem('userData', result.data.otp);
              localStorage.setItem('mobile_number', this.state.mobile_number);
              const { navigate } = this.props;
              
              navigate('../otp');
          } else {

            const MySwal = withReactContent(Swal);
            MySwal.fire(result.data.message);

            if(result.data.message==='you are not registered with us. Please signup'){
              const { navigate } = this.props;
              navigate('../register');

            }
          }


      })
     
 
   
    }


    refreshImage = (event) => {
        
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let string = '';
      
        for (let i = 0; i < 6; i++) {
          string += characters[Math.floor(Math.random() * characters.length)];
        }
        
       
        const url = `${config.PUBLIC_URL}capcha.php?text=`+string;
        this.setState({
            capchaimg: url,
            capchatext:string
        })

      };


    componentDidMount() {
        window.scrollTo(0, 0);
        this.imagestore()
    }

    imagestore() {

      
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let string = '';
      
        for (let i = 0; i < 6; i++) {
          string += characters[Math.floor(Math.random() * characters.length)];
        }
        
       
        const url = `${config.PUBLIC_URL}capcha.php?text=`+string;
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
          <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Login</h3>
                            <ul>
                                <li>
                                    <FaHome />
                                </li>
                                <li>
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li>
                                    <FaAngleRight />
                                </li>
                                <li> <Link to="/list-user">Login</Link> </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className="rent-drive-login-area section_70">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="login-boxs">
                            <div className="login-page-heading">
                                <FaKey />
                                <h3>Continue with us</h3>
                            </div>
                            {msg}
                            <form onSubmit={this.handleSubmit}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="mobile_number"
                                placeholder="Mobile Number"
                                value={this.state.mobile_number}
                                onChange={this.handleChange}
                                />
                                <FaUser />
                            </div>
                            {/* <div className="remember-row">
                                <p className="lost-pass">
                                    <Link to="/" >
                                        Forgot Password?
                                    </Link>
                                </p>
                                <p className="checkbox remember">
                                    <input
                                        className="checkbox-spin"
                                        type="checkbox"
                                        id="Freelance"
                                    />
                                    <label htmlFor="Freelance">
                                        <span />
                                        Keep Me Signed In
                                    </label>
                                </p>
                            </div> */}
                            <div classnName="d-flex">
                            <div class="form-group mb-3">
                                    <div id="udpcaptcha">
                                        <p><input name="captcha" type="text" id="captcha" tabindex="3"
                                            title="Enter Captcha"
                                            className="input form-control mb20"   style={style} onKeyUp={this.handleChange1} placeholder="Enter Text Below"/></p>
                                    
                                        

                                         
                                           <div class="d-flex justify-content-between align-items-center">
                                             <label>
                                              <span id="captcha_image_span">
                                                  <img class="captcha-reload"  src={this.state.capchaimg} />
                                              </span>
                                              </label>
                                              <div id="extra_div">
                                              </div>
                                              <div class="icon_wrapper" onClick={this.refreshImage}>
                                             <img src={refresh} style={{width:'30px',pointer:'cursor'}}/>
                                              </div>
                                           </div>
                                         
                                            
                                    </div>
                                </div>

                            </div>
                            

                      
                            
                          
                            <p>
                                <button type="submit" className="rent-drive-theme-btn" >Continue</button>
                            </p>
                            
                            </form>

                            

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

