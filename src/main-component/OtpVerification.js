import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpVerification = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
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
    const otpCode = event.target.value;
    setOtp(otpCode);

    if (otpCode.length === 6) {
      const confirmationResult = window.confirmationResult;

      confirmationResult.confirm(otpCode)
        .then((result) => {
          const user = result.user;
          console.log('User signed in:', user);
          localStorage.removeItem('mobile_number');
                localStorage.removeItem('userData');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('address');
                localStorage.removeItem('mobile_number');

                let booking_applay = localStorage.getItem('booking_applay') ? localStorage.getItem('booking_applay') : 0;
                
                const main_url = '/home';
                const url= booking_applay === 0 ? main_url : '/car-booking';

                localStorage.removeItem('booking_applay');
                window.location.replace(url);
        })
        .catch((error) => {
          console.error('OTP Verification Error:', error);

          // Detailed error handling
          switch (error.code) {
            case 'auth/invalid-verification-code':
              alert('Invalid OTP. Please try again.');
              break;
            case 'auth/code-expired':
              alert('OTP has expired. Request a new one.');
              break;
            default:
              alert('Verification failed. Please try again.');
          }
        });
    }
  }

  return (
    <div className='app__container'>
      <Card sx={{ width: '300px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography sx={{ padding: '20px' }} variant='h5' component='div'>
            Verifying {phone}
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            label='6-Digit OTP'
            value={otp}
            onChange={verifyOtp}
            margin="normal"
            inputProps={{ maxLength: 6 }}
          />
        </CardContent>
      </Card>
      <div id="recaptcha"></div>
    </div>
  );
}

export default OtpVerification;