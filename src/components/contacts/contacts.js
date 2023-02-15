import React, {memo} from "react";

import Contactcard from "../contactcard/contactcard";
import "./contacts.css";
import { FcDeleteDatabase } from "react-icons/fc";

const Contactlist = ({ contacts, delMultiple, edit, del, select, selected }) => {

  return (
    <div className="contactlist">
      <div className="contactlist__header">
        <h2 className="contactlist__header-title">CONTACTS</h2>
        <button
          className="contactlist__header-deletemultiple-btn"
          onClick={delMultiple}
          disabled={selected ? false : true}
        >
          <FcDeleteDatabase />
        </button>
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
                contact={contact}
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

export default memo(Contactlist);
