import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";
import AuthUser from "../components/AuthUser";
import "../css/Login.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpVerification = () => {
  const { http, setToken } = AuthUser();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    // Retrieve phone number from local storage
    let storedPhone = "+91" + localStorage.getItem('mobile_number');


    if (!storedPhone) {
      alert('No phone number found. Please register first.');
      return;
    }
    setPhone(storedPhone);

    // Ensure the recaptcha container exists
    if (!document.getElementById('recaptcha')) {
      const recaptchaContainer = document.createElement('div');
      recaptchaContainer.id = 'recaptcha';
      document.body.appendChild(recaptchaContainer);
    }

    // Initialize RecaptchaVerifier
    const verifier = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        console.log('Recaptcha solved');
      },
      'expired-callback': () => {
        console.log('Recaptcha expired');
      }
    });

    setRecaptchaVerifier(verifier);

    // Automatically send OTP when component mounts
    if (storedPhone && verifier) {
      sendOtp(storedPhone, verifier);
    }

    // Cleanup
    return () => {
      verifier.clear();
    };
  }, []);


  const handleOtpChange = (event) => {
    const otpCode = event.target.value;
    // Only allow numeric input
    const numericOtp = otpCode.replace(/\D/g, '');
    setOtp(numericOtp);
  };

  const sendOtp = (phoneNumber, verifier) => {
    signInWithPhoneNumber(auth, phoneNumber, verifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP Sent Successfully');
      })
      .catch((error) => {
        console.error('OTP Send Error:', error);

        // Detailed error handling
        switch (error.code) {
          case 'auth/invalid-phone-number':
            alert('Invalid phone number format');
            break;
          case 'auth/quota-exceeded':
            alert('SMS quota exceeded. Try again later.');
            break;
          case 'auth/missing-phone-number':
            alert('Please enter a phone number');
            break;
          default:
            alert('Failed to send OTP. Please try again.');
        }
      });
  }

  const verifyOtp = (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Reset any previous errors

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      const confirmationResult = window.confirmationResult;

      if (!confirmationResult) {
        setError('No confirmation result found. Please request a new OTP.');
        return;
      }

      confirmationResult.confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log('User signed in:', user);

          http.post('/otp_verify', { mobile_number: localStorage.getItem('mobile_number') }).then((result) => {
            let status = result.data.status;

            if (status === 1) {

              setToken(result.data, result.data.token);
              localStorage.removeItem('mobile_number');
              localStorage.removeItem('userData');
              localStorage.removeItem('name');
              localStorage.removeItem('email');
              localStorage.removeItem('address');
              localStorage.removeItem('mobile_number');

              let booking_applay = localStorage.getItem('booking_applay') ? localStorage.getItem('booking_applay') : 0;

              let role = result.data.role;
              const main_url = role === 3 ? '/home' : '/dashboard'
              const url = booking_applay === 0 ? main_url : '/car-booking'

              localStorage.removeItem('booking_applay');
              window.location.replace(url);

              //navigate('./dashboard')

            } else {
              // alert('Invalid User details and OTP');
              const MySwal = withReactContent(Swal);
              MySwal.fire('Invalid OTP');
            }

          })
        })
        .catch((error) => {
          console.error('OTP Verification Error:', error);

          // Detailed error handling
          const errorMessages = {
            'auth/invalid-verification-code': 'Invalid OTP. Please try again.',
            'auth/code-expired': 'OTP has expired. Request a new one.',
            'default': 'Verification failed. Please try again.'
          };

          const errorMessage = errorMessages[error.code] || errorMessages['default'];
          setError(errorMessage);
        });
    } catch (err) {
      console.error('Unexpected error during OTP verification:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

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
            <Header2 />
            <Col md={12}>
              <div className="login-boxs">
                <div className="login-page-heading">
                  <FaKey />
                  <h3>Continue with us </h3>
                </div>
                <form onSubmit={verifyOtp}>
                  <div className="account-form-group">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp} onChange={handleOtpChange}
                      maxLength={6}

                    />
                    <FaUser />
                  </div>

                  <p>
                    <button type="submit" className="rent-drive-theme-btn" >Verify OTP</button>
                  </p>

                </form>
                y
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
}

export default OtpVerification;