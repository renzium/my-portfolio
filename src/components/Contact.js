import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="Contact" id="ct">
      <h1 className="contact-title">Contact</h1>
      <p className="p-centered">Have a question or want to work together?</p>
      <div className="modal">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Enter Email" name="user_mail" />
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Your Message"
          />
          <input type="submit" />
        </form>
      </div>
      
          
    </div>
  );
};
export default Contact;
