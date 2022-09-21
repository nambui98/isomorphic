import React, { useRef, useEffect } from "react";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import JSONFormatter from "json-formatter-js";
import usePrevious from "@iso/lib/hooks/usePrevious";

export default function ({ contact, id }) {
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
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column" }}>
      <div className="isoContactCardHead" style={{ width: "100%" }}>
        <h1 className="isoPersonName">{id ? id : "No data"}</h1>
      </div>
      <div ref={refNodeTextarea} style={{ fontSize: "16px", padding: "30px" }} className="isoContactInfoWrapper"></div>
    </ContactCardWrapper>
  );
}
