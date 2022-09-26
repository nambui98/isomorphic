import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import notification from "@iso/components/Notification";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import { useSelector, useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import actions from "@iso/redux/groupPermission/actions";
import { Select } from "antd";

const { Option } = Select;

export default function ({ contact, otherAttributes, editContact }) {
  if (!contact) return null;
  const dispatch = useDispatch();

  const { deleteGroup, updateGroup } = useSelector((state) => state.GroupPermission);

  const name = contact?.groupName ? contact.groupName : "No Group Name";

  const renderInfo = () => {
    const extraInfos = [];

    if (updateGroup) {
      [...otherAttributes].forEach((attribute) => {
        const value = contact[attribute.value];
        const handleEditContact = (event) => {
          contact[attribute.value] = event.target.value;
          console.log("sadkfjsad", contact);
          editContact(contact);
        };

        if (attribute.value !== "id") {
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} />
            </div>
          );
        }
      });
    } else if (deleteGroup) {
      [...otherAttributes].forEach((attribute) => {
        const value = contact[attribute.value];

        if (attribute.value === "id") {
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input placeholder={`${attribute.title}`} value={value} readOnly />
            </div>
          );
        }
      });
    }

    return extraInfos;
  };

  return (
    <div>
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <h1 className="isoPersonName">{name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{renderInfo()}</div>
      </ContactCardWrapper>
      <div style={{ padding: 30, marginTop: 60, textAlign: "center" }}>
        <Button onClick={() => dispatch({ type: actions.ACTIVE_VIEW })} type={updateGroup ? "primary" : "default"}>
          Update
        </Button>
        <Button style={{ margin: "0 10px" }} type={deleteGroup ? "primary" : "default"} onClick={() => dispatch({ type: actions.DELETE_GROUP })}>
          Add Permissions
        </Button>
        <Button style={{ margin: "0 10px" }} type={deleteGroup ? "primary" : "default"} onClick={() => dispatch({ type: actions.DELETE_GROUP })}>
          Delete
        </Button>
      </div>
    </div>
  );
}
