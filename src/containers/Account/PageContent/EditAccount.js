import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import notification from "@iso/components/Notification";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import { useSelector, useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import actions from "@iso/redux/account/actions";
import { Select } from "antd";

const { Option } = Select;

export default function ({ contact, otherAttributes, editContact, setTxtSearch }) {
  if (!contact) return null;
  const [roleId, setRoleId] = useState("");
  const dispatch = useDispatch();

  const { disabledView, resetPasswordView, changeRoleView, activeView } = useSelector((state) => state.Account);
  const { listRole } = useSelector((state) => state.Role);

  const name = contact.account ? contact.account : "No Account";

  const handleChangeAction = (action) => {
    switch (action) {
      case "activeView":
        dispatch({ type: actions.ACTIVE_VIEW });
        break;
      case "disabledView":
        dispatch({ type: actions.DISABLE_VIEW });
        break;
      case "resetPasswordView":
        dispatch({ type: actions.RESET_PASSWORD_VIEW });
        break;
      case "changeRoleView":
        dispatch({ type: actions.CHANGE_ROLE });
        break;
      default:
        break;
    }
  };

  const renderInfo = () => {
    const extraInfos = [];

    if (activeView || disabledView || resetPasswordView) {
      [...otherAttributes].forEach((attribute) => {
        const value = contact[attribute.value];
        const handleEditContact = (event) => {
          contact[attribute.value] = event.target.value;
          editContact(contact);
        };

        if (attribute.value === "account") {
          extraInfos.push(
            <>
              <div className="isoContactCardInfos" key={attribute.value}>
                <p className="isoInfoLabel">{`${attribute.title}`}</p>
                <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} readOnly />
              </div>
              <div className="isoContactCardInfos" key="123">
                <p className="isoInfoLabel">Choose action</p>
                <Select
                  placeholder="Select a action"
                  defaultValue="activeView"
                  style={{
                    width: 180,
                  }}
                  onChange={handleChangeAction}
                >
                  <Option value="activeView">Active</Option>
                  <Option value="disabledView">Disabled</Option>
                  <Option value="resetPasswordView">Reset Pw</Option>
                  <Option value="changeRoleView">Change Role</Option>
                </Select>
              </div>
            </>
          );
        }
      });
    } else if (changeRoleView) {
      [...otherAttributes].forEach((attribute) => {
        const value = contact[attribute.value];
        const handleEditContact = (event) => {
          contact[attribute.value] = event.target.value;
          editContact(contact);
        };

        if (attribute.value === "account") {
          extraInfos.push(
            <>
              <div className="isoContactCardInfos" key={attribute.value}>
                <p className="isoInfoLabel">{`${attribute.title}`}</p>
                <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} readOnly />
              </div>
              <div className="isoContactCardInfos" key="123">
                <p className="isoInfoLabel">Choose action</p>
                <Select
                  placeholder="Select a action"
                  defaultValue="activeView"
                  style={{
                    width: 180,
                  }}
                  onChange={handleChangeAction}
                >
                  <Option value="activeView">Active</Option>
                  <Option value="disabledView">Disabled</Option>
                  <Option value="resetPasswordView">Reset Pw</Option>
                  <Option value="changeRoleView">Change Role</Option>
                </Select>
              </div>
            </>
          );
        }

        if (attribute.value === "roleName") {
          const handleChangeRole = (roleId) => {
            setRoleId(roleId);
          };
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Select defaultValue={contact.roleId} style={{ width: 180 }} onChange={handleChangeRole}>
                {listRole?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.roleName}
                  </Option>
                ))}
              </Select>
            </div>
          );
        }
      });
    }

    return extraInfos;
  };

  const handleClickUpdateAccount = () => {
    if (activeView) {
      dispatch(
        actions.activeAccount({
          account: contact.account,
        })
      );
    } else if (disabledView) {
      // dispatch(actions.editRole(selectedAccount));
      dispatch(
        actions.disabledAccount({
          account: contact.account,
        })
      );
    } else if (resetPasswordView) {
      dispatch(
        actions.resetAccount({
          account: contact.account,
        })
      );
    } else if (changeRoleView) {
      if (!roleId) return;
      dispatch(
        actions.changeRoleAccount({
          account: contact.account,
          roleId,
        })
      );
    }
    setTxtSearch("");
  };

  return (
    <div>
      <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", alignItems: "center" }}>
        <div className="isoContactCardHead">
          <h1 className="isoPersonName">
            Update Account Name: &nbsp;<span style={{ color: "rgb(24, 144, 255)" }}>{name}</span>
          </h1>
        </div>
        <div className="isoContactInfoWrapper">{renderInfo()}</div>
      </ContactCardWrapper>
      <div style={{ padding: 30, marginTop: 60, textAlign: "center" }}>
        <Button style={{ marginRight: "10px" }} type="primary" onClick={handleClickUpdateAccount}>
          Update
        </Button>
      </div>
    </div>
  );
}
