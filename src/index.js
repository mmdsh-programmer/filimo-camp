import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/nowruz"> 
      <App />
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
