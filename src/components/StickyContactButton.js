import { FaWhatsapp, FaPhone } from "react-icons/fa";
import React from "react";

const StickyContactButton = () => {
  return (
    <div className="position-fixed d-flex flex-column" 
      style={{ right: "0px", bottom: "50px", zIndex: 1000 }}
    >
      <a href="https://wa.me/+918455888889" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="contact-icon btn btn-success d-flex align-items-center justify-content-center shadow mb-2"
      >
        <FaWhatsapp size={18} />
      </a>
      <a
        href="tel:+918455888889" // Replace with your phone number
        className="contact-icon btn btn-primary d-flex align-items-center justify-content-center shadow"
      >
        <FaPhone size={18} />
      </a>
    </div>
  );
};

export default StickyContactButton;
