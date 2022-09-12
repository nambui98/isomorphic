import React, { useRef } from "react";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";

export default function ({ contact, editContact }) {
  if (!contact) return null;
  const refNode = useRef();

  const title = contact?.content.title ? contact.content.title : "No Title";

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">{title}</h1>
      </div>
      <div className="isoContactInfoWrapper" ref={refNode}>
        <textarea rows={30} defaultValue={JSON.stringify(contact, undefined, 4)} onChange={editContact} />
      </div>
    </ContactCardWrapper>
  );
}
