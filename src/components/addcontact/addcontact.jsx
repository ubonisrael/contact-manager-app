import React, { useState, useRef } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { IoIosClose } from 'react-icons/io'

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

const Addcontact = ({ close, avatar, updateAvatar, submit }) => {
  const [details, setDetails] = useState({
    firstname: "",
    midname: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    description: "",
  });

  const [error, setError] = useState({ firstname: "", phone: "", email: "" });

  const firstRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  //function that handles submitting the form ?? passed down from app
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.firstname.trim()) {
      showError("firstname");
      firstRef.current.style.outline = "solid red";
      firstRef.current.focus();
      return;
    } else if (!details.phone.trim()) {
      showError("phone");
      phoneRef.current.style.outline = "solid red";
      phoneRef.current.focus();
      return;
    } else if (!emailRegex.test(details.email) && details.email.trim()) {
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
    setDetails({ ...details, firstname: e.target.value });
    if (error.firstname) {
      firstRef.current.style.outline = "none";
      setError({ ...error, firstname: "" });
    }
  };
  const handlePhone = (e) => {
    setDetails({ ...details, phone: e.target.value });
    if (error.phone) {
      phoneRef.current.style.outline = "none";
      setError({ ...error, phone: "" });
    }
  };
  const handleEmail = (e) => {
    setDetails({ ...details, email: e.target.value });
    if (error.email) {
      emailRef.current.style.outline = "none";
      setError({ ...error, email: "" });
    }
  };

  //other inputs

  const handleMidname = (e) => {
    setDetails({ ...details, midname: e.target.value });
  };

  const handleSurname = (e) => {
    setDetails({ ...details, surname: e.target.value });
  };

  const handleAddress = (e) => {
    setDetails({ ...details, address: e.target.value });
  };

  return (
    <div className="addcontact">
      <div className="addcontact__container">
        <button className="addcontact__container-closebtn" onClick={close}>
          <FaTimes />
        </button>
        <form className="addcontact__form">
          <div className="addcontact__form__header">
            <h2>Add Contact</h2>
          </div>
          <div className="addcontact__form__details-image-container">
            {avatar ? (
              <img
                src={avatar}
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
                className={
                  field.name === "desc"
                    ? "addcontact__form__details-container addcontact__form__details-container-desc"
                    : field.name === "address"
                    ? "addcontact__form__details-container addcontact__form__details-container-address"
                    : "addcontact__form__details-container"
                }
              >
                <label
                  htmlFor={field.name}
                  className="addcontact__form__details-label"
                >
                  {field.label} :
                </label>
                {field.name === "desc" ? (
                  <textarea id="desc" className=" desc" maxLength='50'></textarea>
                ) : field.name === "gender" ? (
                  <select name="gender" id="gender" className="gender">
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
                        : field.name === "midname"
                        ? handleMidname
                        : field.name === "surname"
                        ? handleSurname
                        : field.name === "phone"
                        ? handlePhone
                        : field.name === "email"
                        ? handleEmail
                        : handleAddress
                    }
                    value={
                      field.name === "firstname"
                        ? details.firstname
                        : field.name === "midname"
                        ? details.midname
                        : field.name === "surname"
                        ? details.surname
                        : field.name === "phone"
                        ? details.phone
                        : field.name === "email"
                        ? details.email
                        : details.address
                    }
                  />
                )}
                {field.name === "firstname" && error.firstname ? (
                  <span className="error">{error.firstname}</span>
                ) : field.name === "phone" && error.phone ? (
                  <span className="error">{error.phone}</span>
                ) : field.name === "email" && error.email ? (
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
