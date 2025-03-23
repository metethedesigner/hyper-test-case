import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//React Router
import { BrowserRouter as Router } from "react-router-dom";

// Redux Import İşlemleri
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <div className="container h-8 mx-auto p-4">
          <App />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
