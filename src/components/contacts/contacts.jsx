import React, {memo} from "react";

import Contactcard from "../contactcard/contactcard";
import "./contacts.css";
import { FcDeleteDatabase } from "react-icons/fc";

const Contactlist = ({ contacts, delMultiple, edit, del, select, selected, search }) => {

  const searchRegex = new RegExp(search, 'gi')

  const filteredContacts = contacts.filter(contact => {
    const contactname = `${contact.firstname} ${contact.midname} ${contact.surname}`
    if (searchRegex.test(contactname)) {
      return true
    }
  })

  return (
    <div className="contactlist">
      <div className="contactlist__header">
        <h2 className="contactlist__header-title">CONTACTS</h2>
        {selected.length > 0 ? <button
          className="contactlist__header-deletemultiple-btn"
          onClick={delMultiple}
        >
          <FcDeleteDatabase />
        </button> : null}
      </div>
      <div className="contactlist__underline"></div>
      {contacts.length < 1 ? (
        <h4 className="contactlist__empty">
          You do not have any contacts. Click on the add button to add a new
          contact.
        </h4>
      ) : (contacts.length > 0 && search) ?
      (
        <div className="contactlist__container">
          {filteredContacts.length > 0 ? (filteredContacts.map((contact, i) => {
            return (
              <Contactcard
                key={contact.telephone+i}
                contact={contact}
                edit={edit}
                del={del}
                select={select}
              />
            )
          })) : <p className="contactlist__container-empty-search-msg">Sorry, nothing matches your search</p>}
        </div>
      ) : (
        <div className="contactlist__container">
          {contacts.map((contact, i) => {
            return (
              <Contactcard
                key={contact.telephone+i}
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
