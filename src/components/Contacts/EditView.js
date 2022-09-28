import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "../uielements/input";
import Upload from "../uielements/upload";
import notification from "../Notification";
import { ContactCardWrapper } from "./ContactCard.style";
import "./upload.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import actions from "@iso/redux/role/actions";

export default function ({ contact, otherAttributes, editContact, setTxtSearch }) {
  if (!contact) return null;
  const dispatch = useDispatch();
  const { addRole } = useSelector((state) => state.Contacts);
  const name = contact.roleName ? contact.roleName : "No Name";
  const extraInfos = [];

  [...otherAttributes].forEach((attribute) => {
    const value = contact[attribute.value];
    const handleEditContact = (event) => {
      contact[attribute.value] = event.target.value;
      editContact(contact);
    };
    if (attribute.value === "note") {
    } else if (attribute.value !== "id") {
      extraInfos.push(
        <div className="isoContactCardInfos" key={attribute.value}>
          <p className="isoInfoLabel">{`${attribute.title}`}</p>
          <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} />
        </div>
      );
    }
  });

  const handleClickUpdateRole = () => {
    console.log("sdkfieruq");
    dispatch(
      actions.editRole({
        id: contact.id,
        roleKey: contact.roleKey,
        roleName: contact.roleName,
      })
    );
    setTxtSearch("");
  };

  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", alignItems: "center" }}>
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">
          Edit Role Name: &nbsp;<span style={{ color: "#1890ff" }}>{name}</span>
        </h1>
      </div>
      <div className="isoContactInfoWrapper">{extraInfos}</div>
      <Button type="primary" style={{ marginTop: "40px" }} onClick={handleClickUpdateRole}>
        Update
      </Button>
    </ContactCardWrapper>
  );
}
