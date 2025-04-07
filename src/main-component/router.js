import React from "react";
import { BrowserRouter as Router, Route, Routes , Switch } from "react-router-dom";

import Logout from "./logout";
import Homepage from "./HomePage";
import Homepage2 from "./HomePage2";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Register from "../components/Register"; 
import LoginPages2 from "./LoginPages2";
import CarDetail from "./CarDetail";
import CarBooking from "./CarBooking";
import Dashboard from "./Dashboard";
import BookingList from "./BookingList";
import CancelOrder from "./CancelOrder";
import EditCancelOrder from "./EditCancelOrder";

import BookingLists from "./BookingLists";

import RefundCar from "./RefundCar";
import EditRefundCar from "./EditRefundCar";

import ReturnCar from "./ReturnCar";
import EditReturnCar from "./EditReturnCar";
import EditOrder from "./EditOrder";


import ServiceCar from "./ServiceCar";
import EditServiceCar from "./EditServiceCar";

                            


import BookingList1 from "./BookingList1";
import InvoicePrint from "./InvoicePrint";

import Verification from "./Verification";
import CoDriver from "./CoDriver";
import CarList from "./CarList";
import CityList from "./CityList";
import CityList1 from "./CityList1";
import CityEdit from "./CityEdit";
import OtpPage from "./Otp"
import OtpPages from "./Otps"
import VehicalAdd from "./VehicalAdd";
import VehicalList from "./VehicalList";
import AllCarList from "./AllCarList";

import VehicalList1 from "./VehicalList1";
import VehicalEdit from "./VehicalEdit";
import ModelAdd from "./ModelAdd";
import ModelList from "./ModelList";
import ModelList1 from "./ModelList1";
import ModelEdit from "./ModelEdit";
import VariantAdd from "./VariantAdd";
import VariantList from "./VariantList";
import VariantList1 from "./VariantList1";
import VariantEdit from "./VariantEdit";
import PayStatus from "./PayStatus";


import { getUser } from "../components/AuthUser";
import { getToken } from "../components/AuthUser";

import VendorList from "./VendorList";
import VendorList1 from "./VendorList1";
import VendorAdd from "./VendorAdd";
import VendorEdit from "./VendorEdit";

import UserList from "./UserList";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";

import HostList from "./HostList";
import VendorPayment from "./VendorPayment";



import CustomerList from "./CustomerList";
import VerifyCustomer from "./VerifyCustomer";


import VendorAddCar from "./VendorAddcar";
import VendorListCar from "./VendorListCar";
import VendorListCars from "./VendorListCar2";
import VendorListCar1 from "./VendorListCar1";

import VendorEditCar from "./VendorEditCar";
import CouponAdd from "./CouponAdd";
import CouponList from "./CouponList";

import CityAdd from "./CityAdd";
import Host from "./Host";
import Welcome from "./Welcome";




import Psuccess from "./Psuccess";
import Pexits from "./Pexits";
import Pinvalid from "./Pinvalid";
import Passbook from "./Passbook";
import OtpVerification from "./OtpVerification";

import BlogList from "./BlogList";
import BlogDetails from "./BlogDetails";


// import AuthUser from "../components/AuthUser";
// const baseUrl='http://localhost:3000';

const AllRoute = () => {

    let token=getToken(); 
    
    let basename = '';
    //let basename = '/drive_frontend';

    if(token){
        let user=getUser(); 
        //console.log(user);
        //For Admin
        //alert(user.role)
        if(user.role===1){
            return (
                <div>
                    <Router basename={basename}>
                        <Routes>
                            <Route exact path='/' element={<Homepage />} />
                            <Route path='/home' element={<Homepage />} />
                            <Route path='/search' element={<Homepage2 />} />
                            <Route path='/car-list'  element={<CarList />} />
                            <Route path='/car-detail' element={<CarDetail />} />
                            <Route path='/car-booking'  element={<CarBooking />} />
                            <Route path='/login'  element={<LoginPage />} />
                            {/* <Route path='/otp' element={<OtpPage />} /> */}
                            <Route path='/otp' element={<OtpVerification />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/booking-list'  element={<BookingList />} />

                            <Route path='/verification'  element={<Verification />} />
                            <Route path='/co-driver'  element={<CoDriver />} />
                            <Route path='/logout'  element={<Logout />} />
                            <Route path="add-car" element={<VehicalAdd />} />
                            <Route path="list-car" element={<VehicalList />} />
                            <Route path="all-car" element={<AllCarList />} />
                            <Route path="list-car-dactive" element={<VehicalList1 />} />
                            <Route path="edit-car" element={<VehicalEdit />} />
                            
                            <Route path="/add-model" element={<ModelAdd />} />
                            <Route path="/list-model" element={<ModelList />} />
                            <Route path="/list-model-dactive" element={<ModelList1 />} />
                            <Route path="/edit-model" element={<ModelEdit />} />


                            <Route path="/add-variant" element={<VariantAdd />} />
                            <Route path="/list-variant" element={<VariantList />} />
                            <Route path="/list-variant-dactive" element={<VariantList1 />} />
                            <Route path="/edit-variant" element={<VariantEdit />} />


                            <Route path="/list-vendor" element={<VendorList />} />
                            <Route path="/add-vendor" element={<VendorAdd />} />
                            <Route path="/edit-vendor" element={<VendorEdit />} />
                            <Route path="/vendor-payment" element={<VendorPayment />} />
                           

                            <Route path="/list-user" element={<UserList />} />
                            <Route path="/add-user" element={<UserAdd />} />
                            <Route path="/edit-user" element={<UserEdit />} />
                            <Route path="/add-city" element={<CityAdd />} />
                            <Route path="/list-city-dactive" element={<CityList1 />} />
                            <Route path="/list-city-active" element={<CityList />} />
                            <Route path="/city-edit" element={<CityEdit />} />
                            <Route path="/list-customer" element={<CustomerList />} />
                            <Route path="/verify-customer" element={<VerifyCustomer />} />


                            <Route path="/add-Coupon" element={<CouponAdd />} />
                            <Route path="/list-Coupon" element={< CouponList/>} />

                            
                            <Route path="*" element={<Homepage />} />
                            <Route path="refund-car" element={<RefundCar />} />
                            <Route path="edit-refund" element={<EditRefundCar />} />
                            <Route path="return-car" element={<ReturnCar />} />
                            <Route path="edit-return" element={<EditReturnCar />} />
                            <Route path="edit-order" element={<EditOrder />} />
                            <Route path="service-car" element={<ServiceCar />} />
                            <Route path="edit-service" element={<EditServiceCar />} />
                            <Route path='/vendor-add-car'  element={<VendorAddCar />} />
                            <Route path='/vendor-list-car'  element={<VendorListCars />} />
                            <Route path='/vendor-list-car-dactive'  element={<VendorListCar1 />} />
                            <Route path='/edit-vendor-car'  element={<VendorEditCar />} />
                            <Route path='/cancel-order'  element={<CancelOrder />} />
                            <Route path='/edit-order-cancel'  element={<EditCancelOrder />} />
                            
                            <Route path="*" element={<Homepage />} />
                            <Route path='/host'  element={<Host />} />
                            <Route path='/welcome'  element={<Welcome />} />
                            <Route path='/hostlist'  element={<HostList />} />
                            <Route path='/payment-success'  element={<Psuccess />} />
                            <Route path='/payment-exits'  element={<Pexits />} />
                            <Route path='/payment-invalid'  element={<Pinvalid />} />
                            <Route path='/my-passbook'  element={<Passbook />} />
                            <Route path='/blogs'  element={<BlogList />} />
                            <Route path="/blogs/:slug" element={<BlogDetails />} />


                            

                        </Routes>
                    </Router>
                </div>
            );
        }



        if(user.role===4){
            return (
                <div>
                    <Router basename={basename}>
                        <Routes>
                            <Route exact path='/' element={<Homepage />} />
                            <Route path='/home' element={<Homepage />} />
                            <Route path='/search' element={<Homepage2 />} />
                            <Route path='/car-list'  element={<CarList />} />
                            <Route path='/car-detail' element={<CarDetail />} />
                            <Route path='/car-booking'  element={<CarBooking />} />
                            <Route path='/login'  element={<LoginPage />} />
                            {/* <Route path='/otp' element={<OtpPage />} /> */}
                            <Route path='/otp' element={<OtpVerification />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/booking-list'  element={<BookingList />} />
                            <Route path='/cancel-order'  element={<CancelOrder />} />
                            <Route path='/edit-order-cancel'  element={<EditCancelOrder />} />
                            <Route path="refund-car" element={<RefundCar />} />
                            <Route path="edit-refund" element={<EditRefundCar />} />

                            <Route path="return-car" element={<ReturnCar />} />
                            <Route path="edit-return" element={<EditReturnCar />} />
                            <Route path="edit-order" element={<EditOrder />} />
                            <Route path="service-car" element={<ServiceCar />} />
                            <Route path="edit-service" element={<EditServiceCar />} />

                            <Route path='/verification'  element={<Verification />} />
                            <Route path='/co-driver'  element={<CoDriver />} />
                            <Route path='/logout'  element={<Logout />} />
                            <Route path="/list-vendor" element={<VendorList />} />
                            <Route path="/add-vendor" element={<VendorAdd />} />
                            <Route path="/edit-vendor" element={<VendorEdit />} />
                            <Route path="/list-vendor-dactive" element={<VendorList1 />} />
                            <Route path="/vendor-payment" element={<VendorPayment />} />
                            <Route path='/vendor-add-car'  element={<VendorAddCar />} />
                            <Route path='/vendor-list-car'  element={<VendorListCar />} />
                            <Route path='/vendor-list-car-dactive'  element={<VendorListCar1 />} />
                            <Route path='/edit-vendor-car'  element={<VendorEditCar />} />
                            <Route path="all-car" element={<AllCarList />} />
                            <Route path="/list-customer" element={<CustomerList />} />
                            <Route path="*" element={<Homepage />} />
                            <Route path='/host'  element={<Host />} />
                            <Route path='/welcome'  element={<Welcome />} />
                            <Route path='/hostlist'  element={<HostList />} />
                            <Route path='/payment-success'  element={<Psuccess />} />
                            <Route path='/payment-exits'  element={<Pexits />} />
                            <Route path='/payment-invalid'  element={<Pinvalid />} />
                            <Route path='/my-passbook'  element={<Passbook />} />
                            <Route path='/blogs'  element={<BlogList />} />
                            <Route path="/blogs/:slug" element={<BlogDetails />} />
                        </Routes>
                    </Router>
                </div>
            );
        }

        //For Vendor
        if(user.role===2){
            return (
                <div>
                    <Router basename={basename}>
                        <Routes>
                            <Route exact path='/' element={<Homepage />} />
                            <Route path='/home' element={<Homepage />} />
                             <Route path='/car-list'  element={<CarList />} />
                            <Route path='/car-detail' element={<CarDetail />} />
                            <Route path='/car-booking'  element={<CarBooking />} />
                            <Route path='/login'  element={<LoginPage />} />
                            {/* <Route path='/otp' element={<OtpPage />} /> */}
                            <Route path='/otp' element={<OtpVerification />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/my-booking-list'  element={<BookingLists />} />
                            <Route path='/verification'  element={<Verification />} />
                            <Route path='/co-driver'  element={<CoDriver />} />
                            <Route path='/logout'  element={<Logout />} />
                            {/* <Route path='/vendor-add-car'  element={<VendorAddCar />} /> */}
                            {/* <Route path='/vendor-list-car'  element={<VendorListCar />} />  */}
                            <Route path='/my-list-car'  element={<VendorListCars />} />
                            
                            <Route path='/welcome'  element={<Welcome />} />
                            <Route path="*" element={<Homepage />} />
                            <Route path='/host'  element={<Host />} />
                            <Route path='/payment-success'  element={<Psuccess />} />
                            <Route path='/payment-exits'  element={<Pexits />} />
                            <Route path='/payment-invalid'  element={<Pinvalid />} />
                            <Route path='/my-passbook'  element={<Passbook />} />
                            <Route path='/blogs'  element={<BlogList />} />
                            <Route path="/blogs/:slug" element={<BlogDetails />} />
                        </Routes>
                    </Router>
                </div>
            );
        }

        //For Customer
        if(user.role===3){
            return (
                <div>
                    <Router basename={basename}>
                        <Routes>
                            <Route exact path='/' element={<Homepage />} />
                            <Route path='/home' element={<Homepage />} />
                            <Route path='/search' element={<Homepage2 />} />
                            <Route path='/car-list'  element={<CarList />} />
                            <Route path='/car-detail' element={<CarDetail />} />
                            <Route path='/car-booking'  element={<CarBooking />} />
                            <Route path='/login'  element={<LoginPage />} />
                            {/* <Route path='/otp' element={<OtpPage />} /> */}
                            <Route path='/otp' element={<OtpVerification />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/booking-list'  element={<BookingList1 />} />
                            <Route path='/invoice-print'  element={<InvoicePrint />} />
                            
                            <Route path='/verification'  element={<Verification />} />
                            <Route path='/co-driver'  element={<CoDriver />} />
                            <Route path='/pay-status'  element={<PayStatus />} />
                            <Route path='/logout'  element={<Logout />} />
                            <Route path="*" element={<Homepage />} />
                            <Route path='/host'  element={<Host />} />
                            <Route path='/welcome'  element={<Welcome />} />
                            <Route path='/payment-success'  element={<Psuccess />} />
                            <Route path='/payment-exits'  element={<Pexits />} />
                            <Route path='/payment-invalid'  element={<Pinvalid />} />
                            <Route path='/my-passbook'  element={<Passbook />} />
                            <Route path='/blogs'  element={<BlogList />} />
                            <Route path="/blogs/:slug" element={<BlogDetails />} />


                        </Routes>
                    </Router>
                </div>
            );
        }

        
       
    } else {
        //For Guest
        return (
            <div>
                <Router basename={basename}>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/home' element={<Homepage />} />
                        <Route path='/search' element={<Homepage2 />} />
                        <Route path='/car-list'  element={<CarList />} />
                        <Route path='/car-detail' element={<CarDetail />} />
                        <Route path='/car-booking'  element={<CarBooking />} />
                        <Route path='/login'  element={<LoginPage />} />
                        {/* <Route path='/otp' element={<OtpPage />} /> */}
                        <Route path='/otp' element={<OtpVerification />} />
                        <Route path='/otps' element={<OtpPages />} />
                        <Route path="*" element={<Homepage />} />
                        <Route path='/register'  element={<SignUpPage />} />
                        <Route path='/mpanel'  element={<LoginPages2 />} />
                        <Route path='/host'  element={<Host />} />
                        <Route path='/welcome'  element={<Welcome />} />
                        <Route path='/payment-success'  element={<Psuccess />} />
                        <Route path='/payment-exits'  element={<Pexits />} />
                        <Route path='/payment-invalid'  element={<Pinvalid />} />
                        <Route path='/blogs'  element={<BlogList />} />
                        <Route path="/blogs/:slug" element={<BlogDetails />} />

                    </Routes>
                </Router>
            </div>
        );
    }


};

export default AllRoute;
