import React, { Fragment, useEffect } from "react";
import AllRoute from "./router";
import "./App.css";
import favicon from '../img/Bookndrive_logo.png';
import StickyContactButton from "../components/StickyContactButton";
import { Helmet } from "react-helmet-async";


const App = () => {


  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta name='keywords' content='self drive car rental Bhubaneswar, BookNDrive, car rental Bhubaneswar, rent a car Bhubaneswar, self drive cars Odisha, Bhubaneswar car hire, BookNDrive car booking, car rental service Bhubaneswar, affordable car rental Odisha, rent car online Bhubaneswar, self drive car booking, Bhubaneswar self drive rental, BookNDrive Odisha, book car without driver Bhubaneswar, car rental app Bhubaneswar' />
        <meta name="description" content="BookNDrive offers affordable and reliable self-drive car rentals in Bhubaneswar. Choose from a wide range of cars and enjoy hassle-free booking, 24/7 support, and doorstep delivery." />
        <title>BookNDrive</title>
      </Helmet>
      <AllRoute />
      <StickyContactButton />
    </Fragment>
  );
};

export default App;
