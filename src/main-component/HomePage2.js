import React, { Fragment } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Hero from "../components/home/hero";
import FindCar from "../components/home/findcar";
import About from "../components/home/About";
import Service from "../components/home/Service";
import WhyChoose from "../components/home/WhyChoose";
import HowWorks from "../components/home/HowWorks";
import Promo from "../components/home/Promo";
import HotOffers from "../components/home/HotOffers";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <Fragment>
            <Header />
            <Hero />
            <FindCar />
            <About />
            <Service />
            <HowWorks/>
            <WhyChoose/>
            
            <Promo />
            <HotOffers />
            <Footer />
        </Fragment>
    );
};
export default HomePage;
