import React, { useRef } from "react";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import { Button } from "antd";
import notification from "@iso/components/Notification";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

export default function ({ contact, editContact, id }) {
  if (!contact) return null;
  const refNode = useRef();

  console.log("kldsjfjhsdafa", id);

  const title = contact?.content.title ? contact.content.title : "No Title";

  const handleChangeEditor = (values) => {
    console.log("sadfsdf", values);
    editContact(values);
  };

  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column" }}>
      <div className="isoContactCardHead" style={{ marginBottom: "15px", width: "100%" }}>
        <h1 className="isoPersonName">{`Edit ${id}`}</h1>
      </div>
      <div className="isoContactInfoWrapper" ref={refNode}>
        <Editor allowedModes={["tree", "code"]} value={contact?.content} onChange={handleChangeEditor} />
      </div>
    </ContactCardWrapper>
  );
}
