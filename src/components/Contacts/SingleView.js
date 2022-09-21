import React from "react";
import { ContactCardWrapper } from "./ContactCard.style";

export default function ({ contact, otherAttributes }) {
  if (!contact) return null;
  const name = contact?.roleName ? contact?.roleName : "No Name";
  const extraInfos = [];
  contact &&
    otherAttributes.forEach((attribute) => {
      const value = contact[attribute?.value];
      if (value) {
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{attribute.title}</p>
            {attribute?.value === "createdAt" ? <p className="isoInfoDetails">{new Date(value).toLocaleString()}</p> : <p className="isoInfoDetails">{value}</p>}
          </div>
        );
      }
    });
  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <div className="isoPersonImage">
          {contact?.roleName === "Admin" ? (
            <img alt="#" src="https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg" />
          ) : (
            <img alt="#" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpUgC7dkHYV0KD26Ujw5u83EI43dOZqvABg&usqp=CAU" />
          )}
        </div>
        <h1 className="isoPersonName">{name}</h1>
      </div>
      <div className="isoContactInfoWrapper">{extraInfos}</div>
    </ContactCardWrapper>
  );
}
