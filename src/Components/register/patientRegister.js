import React, { useState } from "react";
import axios from 'axios'
import "./register.css";

function Patient() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => { // ajouter les doc_ au req 
    axios.post('http://localhost:7500/login', {pa_city: city,  pa_firstname: firstname, pa_lastname: lastname,pa_mail: email,pa_password: password})
    return e.preventDefault()
  }

  return (
    <div className="register-patient-container">
      <form className="register-form">
      <input
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          value={firstname}
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="city"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className="register-button-sign" onClick={e => handleClick(e)}>Sign In</button>
      </form>
    </div>
  );
}

export default Patient;
