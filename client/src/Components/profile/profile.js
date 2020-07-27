import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Modal from "react-modal";

import Modify from "../../Assets/modify.png";

import "./profile.css";
import Axios from "axios";

const customStyles = {
  content: {
    padding: "0",
    height: "25em",
    marginTop: "90px",
  },
};
const Profile = () => {
  const [modalIsOpen, setModOpen] = useState(false);
  const [currrentUser, setCurrrentUser] = useState([]);


  useEffect(() => {
    const isDoctor = localStorage.getItem('isDoctor')
    const idDoc = localStorage.getItem('doctor')
    const idPatient = localStorage.getItem('patient')
    if (isDoctor === 'true') {
      Axios.get(`http://localhost:7500/doctors/${idDoc}`)
        .then(res => setCurrrentUser(res.data))
    } else {
      Axios.get(`http://localhost:7500/patients/${idPatient}`)
        .then(res => setCurrrentUser(res.data))
    }
  }, [])
  return (

    <div className="container">
      <Header title="Profile" />
      <article className="profile-box">
        <p className="profile-box-p">My informations</p>
        <article className="profile-detail">
          <article className="profile-contain-desc">
            <article className="profile-title">
              <h4 className="profile-title-desc">{currrentUser[0] && currrentUser[0].pa_firstname || currrentUser[0] && currrentUser[0].doc_firstname} {currrentUser[0] && currrentUser[0].pa_lastname || currrentUser[0] && currrentUser[0].doc_lastname}</h4>
              <p className="profile-desc">{currrentUser[0] && currrentUser[0].city}</p>
              <p className="profile-desc">{currrentUser[0] && currrentUser[0].pa_mail || currrentUser[0] && currrentUser[0].doc_email}</p>
              <p className="profile-desc">*********</p>
            </article>
            <div className="profile-edit-icon">
            </div>
          </article>
          <div className="profile-button-mod">
            <button onClick={() => setModOpen(true)}>Modify</button>
            <img onClick={() => setModOpen(true)} src={Modify} />
          </div>
        </article>

        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={() => setModOpen(false)}
        >
          <div>
            <div>
              <div className="profile-button-close">
                <h2>Modify my informations</h2>
                <button onClick={() => setModOpen(false)}>X</button>
              </div>

            </div>

            <form classname="profile-form">
              <h4 className="modal-title">Lastname Firstname</h4>
              <label className="profile-label">
                <input></input>
              </label>
              <h4 className="modal-title">City</h4>
              <label className="profile-label">
                <input></input>
              </label>
              <h4 className="modal-title">Email</h4>
              <label className="profile-label">
                <input></input>
              </label>
              <h4 className="modal-title">Password</h4>
              <label className="profile-label">
                <input></input>
              </label>
            </form>
          </div>
          <div className="profile-button-register">
            <button onClick={() => setModOpen(false)}>ENREGISTRER</button>
          </div>
        </Modal>
      </article>
    </div>
  );
};

export default Profile;
