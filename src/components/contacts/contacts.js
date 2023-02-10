import React from "react";

import Contactcard from "../contactcard/contactcard";
import "./contacts.css";

const Contactlist = ({ contacts, avatar, delMultiple, edit, del, select, show }) => {
  return (
    <div className="contactlist">
      <div className="contactlist__header">
        <h2 className="contactlist__header-title">CONTACTS</h2>
        <button
          className="contactlist__header-deletemultiple-btn"
          onClick={delMultiple}
        ></button>
      </div>
      <div className="contactlist__underline"></div>
      {contacts.length < 1 ? (
        <h4 className="contactlist__empty">
          You do not have any contacts. Click on the add button to add a new
          contact.
        </h4>
      ) : (
        <div className="contactlist__container">
          {contacts.map((contact, i) => {
            return (
              <Contactcard
                key={i}
                contacts={contacts}
avatar={avatar}
                edit={edit}
                del={del}
                select={select}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Contactlist;
