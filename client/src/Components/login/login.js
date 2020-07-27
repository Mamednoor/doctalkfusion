import React, { useState } from "react";
import axios from "axios";
import Logo from "../shares/dokitalk.png";
import "./login.css";
import { Link, useHistory } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("");
  const history = useHistory();
  const handleClick = (e) => {
    if (active === 'doctor') {
      axios.post("http://localhost:7500/login/doctor", {
        doc_email: email,
        do_password: password,
      }).then(res => {
        if(res.status !== 401){
          console.log(res.data)
          localStorage.clear();
          localStorage.setItem('doctor', res.data.id)
          localStorage.setItem('isDoctor', true)
          history.push('/favori')
        }else{
          history.push('/')
        } 
      })
    } 
    if(active === 'patient') {
      axios.post("http://localhost:7500/login/patient", {
        pa_mail: email,
        pa_password: password,
      }).then(res => {
        if(res.status !== 401){
          localStorage.clear();
          localStorage.setItem('patient', res.data.id)
          localStorage.setItem('isDoctor', false)
          history.push('/search')
        }else{
          history.push('/')
        } 
      })
    }
    return e.preventDefault();
  }
  return (
    <div className="login-container">
      <div className="login-div-img">
        <img alt="logo" src={Logo}></img>
      </div>
      <form className="login-form">
        <div className="radio-container">
          <input
            type="button"
            id="patient"
            name="drone"
            value="Patient"
            onClick={(e) => setActive(e.target.id)}
          />

          <input
            type="button"
            id="doctor"
            name="doctor"
            value="Doctor"
            onClick={(e) => setActive(e.target.id)}
          />
        </div>

        <label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="name"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link className="login-link" to="/register">
          <p className="login-link-title">First time? Click here!</p>
        </Link>

        <button type="submit" className="login-button-sign" onClick={(e) => handleClick(e)}>
          <p>Sign Up</p>
        </button>
      </form>
    </div>
  );
}

export default Login;
