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
        <meta name='keywords' content='BookNDrive' />
        <meta name='description' content='BookNDrive' />
        <title>BookNDrive</title>
      </Helmet>
      <AllRoute />
      <StickyContactButton />
    </Fragment>
  );
};

export default App;
