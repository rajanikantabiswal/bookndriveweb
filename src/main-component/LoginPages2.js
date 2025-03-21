import React, { Fragment,useState } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import AuthUser,{ logOut } from "../components/AuthUser";
import { Link,useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaLock, FaUser } from "react-icons/fa";


import "../css/Login.css";

const LoginPages = () => {
    logOut();
    const {http} = AuthUser();
    const [mobile_number, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = (event) => {
        event.preventDefault();
        http.post('/mobile_verifys1',{mobile_number:mobile_number,password:password}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                sessionStorage.setItem('token',JSON.stringify(result.data.token))
                sessionStorage.setItem('user',JSON.stringify(result.data))
                //navigate('/dashboard')
                window.location.replace('./');
            } else {
                alert(result.data.message);
            }
        })
    }

    const onClick = (e) => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <Header />
            <PageTitle
                pageTitle="Login/Signup"
                pagesub="Login/Signup"
            />
            <section className="rent-drive-login-area section_70">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="login-boxs">
                                <div className="login-page-heading">
                                    <FaKey />
                                    <h3>Admin</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                <div className="account-form-group">
                                    <input 
                                    type="text" 
                                    placeholder="UserID"
                                    value={mobile_number}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                    <FaUser />
                                </div>
                                <div className="account-form-group">
                                    <input 
                                    type="text" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FaLock />
                                </div>
                                <div className="remember-row">
                                    <p className="lost-pass">
                                        <Link to="/" onClick={onClick}>
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

    
};

export default LoginPages;

