import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Alert,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../css/Verification.css";
import PanelSidebar from '../components/PanelSidebar';
import verify_icon from "../img/verify_profile.png";
import { getToken,https,getUser } from "../components/AuthUser";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


let userData=getUser();
function NavigateWrapper() {
    const navigate = useNavigate();

    return <Verification navigate={navigate} />;
}

class Verification extends Component {
  
    constructor(props) {
        super(props)
  
        this.owner_book = React.createRef()
        this.owner_book1 = React.createRef()
        this.owner_book2 = React.createRef()
  
        
        this.state = { 
            id:userData.id,
            messages:'',
            file1:'' ,
            file2:'',
            file3:'',
            profile:'',
            dl:'',
            idcard:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.token=getToken();
        this.https = https();
        this.imagestore = this.imagestore.bind(this);
      }

      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({[name]: value});
  
        if (target.name==='file1') { this.setState({file1: 1}); }
        if (target.name==='file2') { this.setState({file2: 1}); }
        if (target.name==='file3') { this.setState({file3: 1}); }
  
        
     }
    
      handleSubmit(event) {
        event.preventDefault();
      
        const formData= new FormData();

        formData.append('token',this.token);
        formData.append('id',this.state.id);
        formData.append('dl',this.state.dl);
        formData.append('idcard',this.state.idcard);

        if(this.state.file1===1){
           
            formData.append('image1',this.owner_book.current.files[0],this.owner_book.current.files[0].na);
         }
         if(this.state.file2===1){
            formData.append('image2',this.owner_book1.current.files[0],this.owner_book1.current.files[0].na);
         }
   
         if(this.state.file3===1){
            formData.append('image3',this.owner_book2.current.files[0],this.owner_book2.current.files[0].na);
         }
       
         axios.post("http://127.0.0.1:8000/verify_customer", formData).then((result)=>{
  
         const MySwal = withReactContent(Swal);
          MySwal.fire('Request Success');

              const { navigate } = this.props;
             window.location.replace('/verification');
          })
  
   
     
      }
  
      componentDidMount() {
        this.imagestore();
     }
  
      imagestore = async () => {
          
          const result =  await this.https.post('/customer_list_id',{token:this.token,id:this.state.id});
      
         this.setState({
            profile: result.data.data.profile,
            license: result.data.data.license,
            idcard: result.data.data.idcard,
            photo: result.data.data.photo
          });
  
    
       };


   render() {

    let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }


    
    let bts1;
    let bts2;
    let bts3;
    let bts4;
    let bts5;
    let bts9;
    let bts6='http://127.0.0.1:8000/'+this.state.license;
    let bts7='http://127.0.0.1:8000/'+this.state.idcard;
    let bts8='http://127.0.0.1:8000/'+this.state.photo;

   
    if (this.state.profile === 0) {
        bts1={display:'block'};
        bts2={display:'none',width:'100px'};
        bts3={display:'none',width:'20px'};
        bts4={display:'none',width:'100%'};
        bts5={display:'none',width:'100%'};
        bts9={display:'none',width:'100%'};
    } else if (this.state.profile === 1) {
        bts1={display:'none',width:'100%'};
        bts2={display:'block',width:'100px'};
        bts3={display:'none',width:'20px'};
        bts4={display:'block',width:'100%'};
        bts5={display:'none',width:'100%'};
        bts9={display:'block',width:'100%'};
    } else  {
        bts1={display:'none',width:'100%'};
        bts2={display:'block',width:'100px'};
        bts3={display:'block',width:'20px'};
        bts4={display:'none',width:'100%'};
        bts5={display:'block',width:'100%'};
        bts9={display:'block',width:'100%'};
    } 


      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="PROFILE VERIFICATION"
                pagesub="PROFILE VERIFICATION"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>PROFILE VERIFICATION</h3>
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
                                <li>  <Link to="/verification">PROFILE VERIFICATION</Link></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
            <div>
            <div class="page page-profile">
                <div class="profile-inner-container">
                <Row>
                <Col sm={6} md={4} lg={3}>
                    <PanelSidebar/>
                </Col>
                <Col sm={6} md={8} lg={9}>
                    <div className="tab-content-container">
                    <p class="content-heading">PROFILE VERIFICATION</p>
                    <div class="tab-content">
                    <div class="tab-pane active">
                    <section  class="profile-verification-status">
            <div  class="top-section">
                <div  class="hero-image"><img  src={verify_icon} alt="verification-icon" /></div>
                <div  class="heading">Verify Profile Now</div>
                <div  class="sub-heading">Only few steps left to complete. Upload remaining documents to continue using BookNDrive.</div>
            </div>
            {msg}
            <Form onSubmit={this.handleSubmit} id="account_form">
            <div  class="verificatoin-steps">
                <div  class="heading">VERIFY PROFILE IN 3 SIMPLE STEPS</div>
                <div  class="steps">
                    
                <Row className="w-100">
                   
                    <Col md={3}> 
                    <div  class="text">1 &nbsp;&nbsp; Upload Driving License</div>
                    </Col>
                    <Col md={4} >
                   
                    <Form.Control style={bts1} type="file" accept="image/*" name="file1" onChange={this.handleChange} ref={this.owner_book} required />
                    <Form.Control style={bts1} type="text" placeholder="DL Number" name="dl" value={this.state.dl} onChange={this.handleChange} required/>
                    <a href={bts6} style={bts9} target='_blank'><img style={bts2} src={bts6} /></a> 
                    </Col>
                </Row>
                </div>
                <div  class="steps">

                <Row className="w-100">
                    
                    <Col md={5}> 
                    <div  class="text">2 &nbsp;&nbsp;Upload Aadhar Card / Voter ID / Passport</div>
                    </Col>
                    <Col md={4}  >
                  
                    <Form.Control style={bts1} type="file" accept="image/*" name="file2" onChange={this.handleChange} ref={this.owner_book1}  required/>
                    <Form.Control style={bts1} type="text" placeholder="ID Number" name="idcard" value={this.state.idcard} onChange={this.handleChange} required/>
                    <a href={bts7} style={bts9} target='_blank'><img style={bts2} src={bts7} /></a> 
                  
                    </Col>
                </Row>
                    
                   
                </div>
                <div  class="steps">
                    <Row className="w-100">
                       
                        <Col md={2}> 
                        <div  class="text">3 &nbsp;&nbsp;Photo</div>
                        </Col>
                        <Col md={4} >
                      
                        <Form.Control style={bts1} type="file" accept="image/*" name="file3" onChange={this.handleChange} ref={this.owner_book2}  required/>
                     
                        <a href={bts8} style={bts9} target='_blank'><img style={bts2} src={bts8} /></a> 
                        </Col>
                    </Row>
                </div>
            </div>
            <div  class="floating-cta button-wrapper">
                <div  class="heading">
                    By continuing, you agree to applicable 
                    <a  href="/privacy-policy">T&amp;Cs</a>
                </div>
                <Row className='mb-3'>
                <Col xs="3"></Col>
                    <Col xs="6">
                      <button  type="submit"  style={bts1} class="rent-drive-theme-btn">Verify Profile Now</button>
                     
                      
                        </Col>
                </Row>

                
            </div>
            </Form>
            <Row className='mb-3'>
                <Col xs="3"></Col>
                    <Col xs="6">
            <button  type="button" style={bts4} class="rent-drive-theme-btn">Pending</button>
            <button  type="button"  style={bts5} class="rent-drive-theme-btn">Verifyed</button>
            </Col>
                </Row>
        </section>
                    </div>
                    </div>
                    </div>
                </Col>
                </Row>
                </div>
            </div>
            </div>
            <Footer />
        </Fragment>
    )
   }
 }

export default NavigateWrapper;

