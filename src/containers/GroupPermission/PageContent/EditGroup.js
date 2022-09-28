import React, { useState } from "react";
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

  const { deleteGroup, updateGroup, addPermission, allPermission, listPermissionByGroup } = useSelector((state) => state.GroupPermission);

  console.log("dkajfhjsadhfjas", allPermission);
  console.log("sdajkxzjkdhsafasd", listPermissionByGroup);

  const name = contact?.groupName ? contact.groupName : "No Group Name";

  const handleChangeAction = (action) => {
    console.log("sidajfeiur", action);

    switch (action) {
      case "updateGroup":
        dispatch({ type: actions.ACTIVE_VIEW });
        break;
      case "deleteGroup":
        dispatch({ type: actions.DELETE_GROUP });
        break;

      default:
        break;
    }
  };

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
    } else if (addPermission) {
      const children = [];

      const handleChangeAllPermission = (permissions) => {
        dispatch(actions.allPermissionSelected(permissions));
      };

      allPermission.forEach((permission) => {
        children.push(<Option key={permission?.id}>{permission?.permissionName}</Option>);
      });
      return (
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          defaultValue={listPermissionByGroup.map((permissionByGroup) => permissionByGroup.id)}
          onChange={handleChangeAllPermission}
        >
          {children}
        </Select>
      );
    }

    extraInfos.push(
      <div className="isoContactCardInfos" key="xyz">
        <p className="isoInfoLabel">Action</p>
        <Select
          placeholder="Select a action"
          defaultValue="updateGroup"
          style={{
            width: 160,
          }}
          onChange={handleChangeAction}
        >
          <Option value="updateGroup">Active</Option>
          <Option value="deleteGroup">Delete</Option>
        </Select>
      </div>
    );

    return extraInfos;
  };

  const handleClickSumit = () => {
    if (updateGroup) {
      dispatch(
        actions.updateGroup({
          ...contact,
        })
      );
    } else if (deleteGroup) {
      // dispatch(actions.editRole(selectedAccount));
      dispatch(
        actions.deleteGroup({
          groupId: contact.id,
        })
      );
    }
  };

  return (
    <div>
      <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", alignItems: "center" }}>
        <div className="isoContactCardHead">
          <h1 className="isoPersonName">
            Update Group Permission: &nbsp;<span style={{ color: "rgb(24, 144, 255)" }}>{name}</span>
          </h1>
        </div>
        <div className="isoContactInfoWrapper">{renderInfo()}</div>
      </ContactCardWrapper>
      <div style={{ padding: 30, marginTop: 60, textAlign: "center" }}>
        <Button type="primary" style={{ padding: "0 20px" }} onClick={handleClickSumit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
