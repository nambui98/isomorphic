import React, { useRef } from "react";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import { Button } from "antd";
import notification from "@iso/components/Notification";

export default function ({ contact, editContact }) {
  if (!contact) return null;
  const refNode = useRef();

  const title = contact?.content.title ? contact.content.title : "No Title";

  const handleFormatTextarea = () => {
    const textareaNode = refNode.current.getElementsByTagName("textarea")[0];
    try {
      let obj = JSON.parse(textareaNode.value);
      textareaNode.value = JSON.stringify(obj, undefined, 4);
    } catch (e) {
      notification("error", e.toString(), "");
    }
  };

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">{title}</h1>
      </div>
      <div className="isoContactInfoWrapper" ref={refNode}>
        <textarea rows={30} defaultValue={JSON.stringify(contact, undefined, 4)} onChange={editContact} />
        <div style={{ marginTop: 10 }}>
          <Button type="default" onClick={handleFormatTextarea}>
            Format
          </Button>
        </div>
      </div>
    </ContactCardWrapper>
  );
}
