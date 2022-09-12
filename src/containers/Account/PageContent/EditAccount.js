import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import notification from "@iso/components/Notification";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import { useSelector, useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import actions from "@iso/redux/account/actions";
import { Select } from "antd";

const { Option } = Select;

export default function ({ contact, otherAttributes, editContact, setRoleId }) {
  if (!contact) return null;
  const dispatch = useDispatch();

  const { disabledView, resetPasswordView, changeRoleView, activeView } = useSelector((state) => state.Account);
  const { listRole } = useSelector((state) => state.Role);

  console.log("kfjasdhfads", contact);

  const name = contact.account ? contact.account : "No Account";

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
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} readOnly />
            </div>
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
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input placeholder={`${attribute.title}`} value={value} onChange={handleEditContact} readOnly />
            </div>
          );
        }
        if (attribute.value === "roleName") {
          const handleChangeRole = (roleId) => {
            setRoleId(roleId);
          };
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Select defaultValue={contact.roleId} style={{ width: 120 }} onChange={handleChangeRole}>
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

  return (
    <div>
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <h1 className="isoPersonName">{name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{renderInfo()}</div>
      </ContactCardWrapper>
      <div style={{ padding: 30, marginTop: 60 }}>
        <Button onClick={() => dispatch({ type: actions.ACTIVE_VIEW })} type={activeView ? "primary" : "default"}>
          Active
        </Button>
        <Button type={disabledView ? "primary" : "default"} onClick={() => dispatch({ type: actions.DISABLE_VIEW })}>
          Disabled
        </Button>
        <Button type={resetPasswordView ? "primary" : "default"} onClick={() => dispatch({ type: actions.RESET_PASSWORD_VIEW })}>
          Reset Password
        </Button>
        <Button type={changeRoleView ? "primary" : "default"} onClick={() => dispatch({ type: actions.CHANGE_ROLE })}>
          Change Role
        </Button>
      </div>
    </div>
  );
}
