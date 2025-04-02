import { FaWhatsapp, FaPhone } from "react-icons/fa";
import React from "react";

const StickyContactButton = () => {
  return (
    <div className="position-fixed d-flex flex-column gap-2" 
      style={{ right: "10px", bottom: "50px", zIndex: 1000 }}
    >
      <a href="https://wa.me/+918455888889" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success d-flex align-items-center justify-content-center rounded-circle p-3 shadow"
        style={{ width: "50px", height: "50px" }}
      >
        <FaWhatsapp size={24} />
      </a>
      <a
        href="tel:+918455888889" // Replace with your phone number
        className="btn btn-primary d-flex align-items-center justify-content-center rounded-circle p-3 shadow"
        style={{ width: "50px", height: "50px" }}
      >
        <FaPhone size={24} />
      </a>
    </div>
  );
};

export default StickyContactButton;
