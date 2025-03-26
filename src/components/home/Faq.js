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
                How does BookNDrive work?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-1" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">BookNDrive allows you to rent a self-drive car easily. Just select your preferred car, choose your rental duration, complete the booking, and pick up the car or opt for doorstep delivery.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="">
              <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-2" aria-expanded="false">
                What documents are required to rent a car?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-2" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">You need a valid driving license, an Aadhar card or Passport for identity verification.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="">
              <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-3" aria-expanded="false">
                Are there any hidden charges?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-3" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">No, BookNDrive ensures transparent pricing. The rental cost includes basic insurance, taxes, and service fees. Any additional charges (fuel, tolls, late returns) will be clearly mentioned before booking.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-4" aria-expanded="false">
                Can I take the car to another city?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-4" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">Yes, intercity travel is allowed. However, you must inform us in advance, and additional charges may apply based on location and duration.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="">
              <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-5" aria-expanded="false">
                Is fuel included in the rental price?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-5" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">No, fuel is not included. The car will be provided with a certain fuel level, and you must return it with the same level or pay the difference.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <a data-bs-toggle="collapse" className="collapse collapsed" data-bs-target="#faq-list-6" aria-expanded="false">
                Can I cancel or modify my booking?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down icon-show" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up icon-close" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg></a>
              <div id="faq-list-6" className="collapse" data-bs-parent="#faq-list">
                <div className="faq-body ">
                  <div className="row g-2">
                    <div className="col-lg-12">
                      <ul className="list-under-faq">
                        <li>
                          <p className="text-dark">Yes, cancellations and modifications are possible. Charges may apply based on the timing of your request. Refer to our cancellation policy for details.</p>
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