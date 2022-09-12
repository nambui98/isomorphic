import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "../uielements/input";
import { ContactCardWrapper } from "./ContactCard.style";
import "./upload.css";

export default function ({ setRoleName, setKeyRole }) {
  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">ADD NEW ROLE</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Role Key</p>
          <Input placeholder="Role Key" onChange={(e) => setKeyRole(e.target.value)} />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Role Name</p>
          <Input placeholder="Role Name" onChange={(e) => setRoleName(e.target.value)} />
        </div>
      </div>
    </ContactCardWrapper>
  );
}
