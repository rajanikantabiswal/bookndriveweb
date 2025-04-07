import React, { useEffect } from "react";

const Payment = () => {
    useEffect(() => {
        // Dynamically load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            console.log("Razorpay script loaded");
        };
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        const response = await fetch(`${config.PUBLIC_URL}api/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1 }) // Amount in INR
        });

        const order = await response.json();

        const options = {
            key: "rzp_live_HerJr5bJcTgGBd",
            amount: order.amount,
            currency: "INR",
            name: "Your Company",
            description: "Test Payment",
            order_id: order.id,
            handler: async function (paymentResponse) {
                console.log("Payment Response:", paymentResponse);
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;

                if (!razorpay_order_id) {
                    alert("razorpay_order_id is missing!");
                    return;
                }
                // Send payment response to backend for verification
                const verifyResponse = await fetch(`${config.PUBLIC_URL}api/verify-payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      razorpay_payment_id,
                      razorpay_order_id,
                      razorpay_signature
                    })
                  });

                  const verifyResult = await verifyResponse.json();
                  console.log("Verification Result:", verifyResult);
                  alert(verifyResult.status);
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    //   const verifyPayment = async (paymentData) => {
    //     const response = await fetch(`${config.PUBLIC_URL}api/verify-payment`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(paymentData)
    //     });

    //     const result = await response.json();
    //     alert(result.status);
    //   };

    return <button type="button" onClick={handlePayment}>Pay Now</button>;
};

export default Payment;
