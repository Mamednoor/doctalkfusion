import React, {useState } from "react";
import axios from 'axios'
import "./register.css";

function Medecin() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [profession, setProfession] = useState("");
  const [professionCode, setProfessionCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => { // ajouter les doc_ au req 
  axios.post('http://localhost:7500/doctor', {doc_city: city, doc_email: email, doc_firstname: firstname, doc_lastname: lastname,doc_password: password, doc_profession: profession, doc_professionnal_code: professionCode})
  return e.preventDefault()
}

  return (
    <div className="register-medecin-container">
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
          name="profession"
          value={profession}
          placeholder="Profession"
          onChange={(e) => setProfession(e.target.value)}
        />
        <input
          type="text"
          name="professionCode"
          value={professionCode}
          placeholder="Profession Code"
          onChange={(e) => setProfessionCode(e.target.value)}
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
        <button type='submit' className="register-button-sign" onClick={e => handleClick(e)}>Sign Up</button>
      </form>
    </div>
  );
}

export default Medecin;
