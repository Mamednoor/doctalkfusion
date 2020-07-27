import React from "react";
import Accept from "../shares/accept.svg";
import Decline from "../shares/close.svg";

import { Link } from "react-router-dom"

import "./contact.css";

const ContactRequestContainer = (props) => {
  return (
    <div className="contact-container">
      <article className="contact-box">
        <article className="contact-icon">
            <img id={props.id} onClick={e => props.onDelete(e)} src={Decline} alt=''></img>
            <Link to={{ pathname: props.link }}>
              <img src={Accept} alt=''></img>
            </Link>
          </article>
          <article className="article-title">
            <h3>
              {props.firstname} {props.lastname}
            </h3>
            <h4>Object : {props.object}</h4>
            <h4>Message : </h4>
          </article>
          <article className="contactreq-message">
            <p>{props.message}</p>
          </article>
        </article>
    </div>
  );
};

export default ContactRequestContainer;
