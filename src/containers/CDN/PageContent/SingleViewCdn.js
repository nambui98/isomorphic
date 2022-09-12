import React, { useRef, useEffect } from "react";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import JSONFormatter from "json-formatter-js";
import usePrevious from "@iso/lib/hooks/usePrevious";

export default function ({ contact }) {
  if (!contact) return <h3 style={{ textAlign: "center" }}>No data</h3>;

  const refNodeTextarea = useRef();

  useEffect(() => {
    const formatObj = new JSONFormatter(contact?.content);
    let newDiv;
    if (refNodeTextarea.current) {
      newDiv = document.createElement("div");
      refNodeTextarea.current.appendChild(newDiv);
      newDiv.appendChild(formatObj.render());
    }

    return () => {
      refNodeTextarea.current && refNodeTextarea.current.removeChild(newDiv);
    };
  }, [contact, refNodeTextarea]);

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <div className="isoPersonImage">
          <img alt="#" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpUgC7dkHYV0KD26Ujw5u83EI43dOZqvABg&usqp=CAU" />
        </div>
        <h1 className="isoPersonName">{contact?.content?.title ? contact.content.title : "No data"}</h1>
      </div>
      <div ref={refNodeTextarea} className="isoContactInfoWrapper"></div>
    </ContactCardWrapper>
  );
}
