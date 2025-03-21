import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../css/faq.css';
const Faq = () => {

    return (
        <section id="faq" className="faq bg-light py-5">
        <div className="container">

          <div className="site-heading">
            <h2>Frequently Asked Questions</h2>
            <p className="pb-3">Frequently Asked Questions (FAQs) are a valuable resource for a company that provides car rent services. We can help address common inquiries from potential clients and provide information about our services, processes, and policies.</p>
          </div>
          <div className="faq-list p-0">
            <ul id="faq-list">
              <li className="">
                <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-1" aria-expanded="false">
                  What services do you offer?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/> </svg></a>
                <div id="faq-list-1" className="collapse" data-bs-parent="#faq-list">
                  <div className="faq-body ">
                    <div className="row g-2">
                      <div className="col-lg-12">
                        <ul className="list-under-faq">
                          <li>
                            <p className="text-dark">Provide an overview of the car rent services your company offers, such as car design, development, e-commerce solutions, mobile app development, SEO, etc.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="">
                <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-2" aria-expanded="false">
                  How can I request a quote or estimate?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/> </svg></a>
                <div id="faq-list-2" className="collapse" data-bs-parent="#faq-list">
                  <div className="faq-body ">
                    <div className="row g-2">
                      <div className="col-lg-12">
                        <ul className="list-under-faq">
                          <li>
                            <p className="text-dark">Explain the process for clients to request a quote or estimate for their project, including whether it's done online, through a contact form, or via a consultation.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="">
                <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-4" aria-expanded="false">
                  How much does car rent cost?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/> </svg></a>
                <div id="faq-list-4" className="collapse" data-bs-parent="#faq-list">
                  <div className="faq-body ">
                    <div className="row g-2">
                      <div className="col-lg-12">
                        <ul className="list-under-faq">
                          <li>
                            <p className="text-dark">Explain that pricing varies based on project specifics, and provide a range or starting prices for common services. Encourage potential clients to request a personalized quote.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="">
                <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-6" aria-expanded="false">
                  Can you redesign an existing car?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/> </svg>
                  
                  </a>
                <div id="faq-list-6" className="collapse" data-bs-parent="#faq-list">
                  <div className="faq-body ">
                    <div className="row g-2">
                      <div className="col-lg-12">
                        <ul className="list-under-faq">
                          <li>
                            <p className="text-dark">Describe your capabilities for car redesign and improvement. Mention whether you work with existing platforms or build from scratch.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="">
                <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-7" aria-expanded="false">
                  What platforms or technologies do you use?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/> </svg></a>
                <div id="faq-list-7" className="collapse" data-bs-parent="#faq-list">
                  <div className="faq-body ">
                    <div className="row g-2">
                      <div className="col-lg-12">
                        <ul className="list-under-faq">
                          <li>
                            <p className="text-dark">List the technologies, content management systems, and programming languages your company specializes in or commonly uses for car rent.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
       
        </div>
      </section>
    );
};

export default Faq;