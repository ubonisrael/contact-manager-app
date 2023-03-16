import React, { memo, useRef, useState } from "react";

import "./contactcard.css";
import { FaUserCircle } from "react-icons/fa";
import { TbTriangle, TbTriangleInverted } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Contactcard = ({ contact, edit, del, select }) => {
  const [dropped, setDrop] = useState(false)
  const cardRef = useRef();
  const dropdownRef = useRef();

  //Function that handles the event when the card is clicked
  const handleSelect = (index) => {
    cardRef.current.classList.toggle("selected");
    select(index);
  };

  //Function that handles the event when the dropdown button is clicked
  const handleDropdown = (e) => {
    e.stopPropagation();
    setDrop(prev => !prev)
    dropdownRef.current.classList.toggle("dropped");
  };

  return (
    <div
      ref={cardRef}
      className="contactcard"
      onClick={() => handleSelect(contact.ID)}
    >
      <div className="contactcard__container">
      <div className="contactcard__avatarcontainer">
        {contact.avatar ? (
          <img
            className="contactcard__avatarcontainer__img"
            src={contact.avatar}
            alt="avatar"
          />
        ) : (
          <div className="contactcard__avatarcontainer-icon">
            <FaUserCircle />
          </div>
        )}
      </div>
      <div className="contactcard__details">
        <h4 className="contactcard__details-names">
          {contact.firstname} {contact.midname} {contact.surname}
        </h4>
        <h4 className="contactcard__details-phone">{contact.telephone}</h4>
        <div className="contactcard__details-btns-container">
          <button className="contactcard__details-btn" onClick={handleDropdown}>
            { dropped ? <TbTriangle /> : <TbTriangleInverted />}
          </button>
          <button
            className="contactcard__details-btn"
            onClick={(e) => {
              e.stopPropagation();
              edit(contact.ID);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="contactcard__details-btn"
            onClick={(e) => {
              e.stopPropagation();
              del(contact.ID);
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      
      </div>
      <div ref={dropdownRef} className="contactcard__details__other">
          <div className="contactcard__details-underline"></div>
          <p className="contactcard__details__other-item">Email: {contact.email ? contact.email : 'Email address not available.'}</p>
          <p className="contactcard__details__other-item">Gender: {contact.gender}</p>
          <p className="contactcard__details__other-item">Address: {contact.address ? contact.description : 'Address not available.'}</p>
          <p className="contactcard__details__other-item">Description: {contact.description ? contact.description : 'No description available.'}</p>
        </div>
    </div>
  );
};

export default memo(Contactcard);
