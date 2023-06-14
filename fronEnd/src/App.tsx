import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { Form } from "./components/Form";
import Payment from "./components/Payment";
import "./App.css";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  axios.defaults.baseURL = "http://127.0.0.1:3000";

  const [data, setData] = useState();
  const [admin, setAdmin] = useState("");

  const [logged, setLogged] = useState<boolean>(false);
  console.log(data);

  return (
    <div>
      <Navbar setLogged={setLogged} logged={logged} admin={admin} />
      <Routes>
        <Route path="/" element={<Login setAdmin={setAdmin} setData={setData} data={data} setLogged={setLogged} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/payment" element={<Payment data={data} />} />
        <Route path="/Devotee/dashboard" element={<UserDashboard userData={data} />} />
      </Routes>
    </div>
  );
};

export default App;
