import React, { Fragment,useState } from "react";

import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";
import AuthUser from "../components/AuthUser";
import "../css/Login.css";

const OtpPages = () => {
    const {http,setToken} = AuthUser();
    const [otp, setName] = useState("");
    //const navigate = useNavigate();

     


    const handleSubmit = (event) => {
        event.preventDefault();
        const mobile_number=localStorage.getItem('mobile_number');

        http.post('/otp_verifys',{mobile_number:mobile_number,otp:otp}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
             
                setToken(result.data,result.data.token);
                localStorage.removeItem('mobile_number');
                localStorage.removeItem('userData');
                
            } else {
                alert('Invalid User details and OTP');
            }

        })

  
       
        
    }


    return (
        <Fragment>
            <Header />
            <PageTitle
                pageTitle="Verify OTP"
                pagesub="OTP"
            />
            <section className="rent-drive-login-area section_70">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="login-boxs">
                                <div className="login-page-heading">
                                    <FaKey />
                                    <h3>Continue with us</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                <div className="account-form-group">
                                    <input 
                                    type="text" 
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                    <FaUser />
                                </div>
                            
                                <p>
                                    <button type="submit" className="rent-drive-theme-btn" >Verify OTP</button>
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

    
};

export default OtpPages;

