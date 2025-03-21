import React, { Fragment ,useEffect} from "react";
import AllRoute from "./router";
import "./App.css";
import favicon from '../img/Bookndrive_logo.png';

const App = () => {
  

  useEffect(() => {
    document.title = 'Book N Drive';
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, []);

  return (
    <Fragment>
      
      <AllRoute />
    </Fragment>
  );
};

export default App;
