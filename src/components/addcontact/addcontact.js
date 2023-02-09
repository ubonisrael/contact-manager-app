import React, { useState, useRef } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";

import "./addcontact.css";

const formFields = [
  { label: "First Name", name: "firstname" },
  { label: "Middle Name", name: "midname" },
  { label: "Surname", name: "surname" },
  { label: "Telephone", name: "phone" },
  { label: "Email", name: "email" },
  { label: "Gender", name: "gender" },
  { label: "Address", name: "address" },
  { label: "Description", name: "desc" },
];

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const Addcontact = ({ show, avatar, updateAvatar, submit }) => {
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");

  const [error, setError] = useState({ firstname: "", phone: "", email: "" });

  const firstRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  //function that handles submitting the form ?? passed down from app
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname.trim()) {
      showError("firstname");
      firstRef.current.style.outline = "solid red";
      firstRef.current.focus();
      return;
    } else if (!phone.trim()) {
      showError("phone");
      phoneRef.current.style.outline = "solid red";
      phoneRef.current.focus();
      return;
    } else if (emailRegex.test(email) && email.trim()) {
      showError("email");
      emailRef.current.style.outline = "solid red";
      emailRef.current.focus();
      return;
    }
    submit();
  };

  //handles error logging
  const showError = (props) => {
    switch (props) {
      case "firstname":
        setError({ ...error, firstname: "Please fill in the first name" });
        break;
      case "phone":
        setError({ ...error, phone: "Please fill in the phone number" });
        break;
      case "email":
        setError({
          ...error,
          email: "Please fill in a valid email address e.g you@example.com",
        });
        break;
      default:
    }
  };

  // functions that handle input change forms
  const handleFirstname = (e) => {
    setFirstname(e.target.value);
    if (error.firstname) {
      setError({ ...error, firstname: "" });
    }
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    if (error.phone) {
      setError({ ...error, phone: "" });
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (error.email) {
      setError({ ...error, email: "" });
    }
  };
  //other inputs
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="addcontact">
      <div className="addcontact__container">
        <button className="addcontact__container-closebtn" onClick={show}>
          <FaTimes />
        </button>
        <form className="addcontact__form">
          <div className="addcontact__form__header">
            <h2>Add Contact</h2>
          </div>
          <div className="addcontact__form__details-image-container">
            {avatar ? (
              <img
                src=""
                alt="avatar"
                className="addcontact__form__details-image"
              />
            ) : (
              <span className="addcontact__form__details-avatar-icon">
                <FaUserCircle />
              </span>
            )}
            <label
              htmlFor="avatar"
              className="addcontact__form__details-avatar-label"
            >
              Select Contact Image
            </label>
            <input
              type="file"
              id="avatar"
              className="addcontact__form__details-avatar-picker"
              onChange={updateAvatar}
              name="avatar"
              accept="image/*"
            />
          </div>
          {formFields.map((field, i) => {
            return (
              <div
                key={field.name + i}
                className="addcontact__form__details-container"
              >
                <label
                  htmlFor={field.name}
                  className="addcontact__form__details-label"
                >
                  {field.label} :
                </label>
                {field.name === "desc" ? (
                  <textarea
                    id="desc"
                    className="addcontact__form__details-input desc"
                  ></textarea>
                ) : field.name === "gender" ? (
                  <select name="gender" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    ref={
                      field.name === "firstname"
                        ? firstRef
                        : field.name === "phone"
                        ? phoneRef
                        : field.name === "email"
                        ? emailRef
                        : null
                    }
                    id={field.name}
                    className="addcontact__form__details-input"
                    type={field.name === "phone" ? "number" : "text"}
                    onChange={
                      field.name === "firstname"
                        ? handleFirstname
                        : field.name === "phone"
                        ? handlePhone
                        : field.name === "email"
                        ? handleEmail
                        : handleInput
                    }
                    value={
                      field.name === "firstname"
                        ? firstname
                        : field.name === "phone"
                        ? phone
                        : field.name === "email"
                        ? email
                        : input
                    }
                  />
                )}
                {field.name === "firstname" ? (
                  <span className="error">{error.firstname}</span>
                ) : field.name === "phone" ? (
                  <span className="error">{error.phone}</span>
                ) : field.name === "email" ? (
                  <span className="error">{error.email}</span>
                ) : null}
              </div>
            );
          })}
          <button
            type="submit"
            className="addcontact__form-btn"
            onClick={handleSubmit}
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcontact;
