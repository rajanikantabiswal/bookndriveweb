import React, { Fragment,Component,useRef } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import AuthUser,{ https } from "../components/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col ,Alert,Container} from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";

import "../css/Login.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function NavigateWrapper() {
    const navigate = useNavigate();

    return <LoginPage navigate={navigate} />;
}
class LoginPage extends Component {

   constructor(props) {
      super(props)
      this.state = {name:'',mobile:'',make:'', model:'',varient:'',date:''}
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
     
    

      this.https.post('/add_host',{
        name:this.state.name,
        mobile:this.state.mobile,
        make:this.state.make,
         model:this.state.model,
         varient:this.state.varient,
         date:this.state.date
    }).then((result)=>{
          let status=result.data.status; 
          if(status === 1){
            const { navigate } = this.props;
            navigate('../welcome');
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
     
        <section className="rent-drive-breadcromb-area section_70">

<Container>
   <Row>
   <Header2 />
      <Col md={12}>
         <div className="breadcromb-box">
            <h3>Become a Host</h3>
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
               <li>  <Link to="/dashboard">Become a Host</Link></li>
            </ul>
         </div>
      </Col>
   </Row>
</Container>
</section>
        <section className="rent-drive-login-area section_70">
            <Container>
                <Row>
                <Col md={3}></Col>
                    <Col md={6}>
                        <div className="">
                           
                           
                            <form onSubmit={this.handleSubmit}>
                            <Row>
                            <Col md={4}>Your Name : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="name"
                                placeholder="Your Name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>Contact Number : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="mobile"
                                placeholder="Contact Number"
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>Car Make : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="make"
                                placeholder="Car Make"
                                value={this.state.make}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>Car Model : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="model"
                                placeholder="Car Model"
                                value={this.state.model}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>Car Varient : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="text" 
                                name="varient"
                                placeholder="Car Varient"
                                value={this.state.varient}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col md={4}>Car Purchaged Date : </Col>
                            <Col md={8}>
                            <div className="account-form-group">
                                <input 
                                type="date" 
                                name="date"
                                value={this.state.date}
                                onChange={this.handleChange}
                                />
                            </div>
                            </Col>
                            </Row>
                          
                       

                            <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                            <p>
                                <button type="submit" className="rent-drive-theme-btn" >Submit</button>
                            </p>  
                                 </Col>
                                 </Row>
                            
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

