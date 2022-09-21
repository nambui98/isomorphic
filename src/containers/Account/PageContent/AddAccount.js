import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";

import { Select } from "antd";

const { Option } = Select;

export default function ({ setNewAccount, setNewEmail, setNewRole }) {
  const { listRole } = useSelector((state) => state.Role);

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">ADD ACCOUNT</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Account</p>
          <Input placeholder="account" onChange={(e) => setNewAccount(e.target.value)} autoFocus />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Email</p>
          <Input placeholder="email" onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Role Name</p>
          <Select placeholder="Please enter role name" style={{ width: 200 }} onChange={setNewRole}>
            {listRole?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.roleName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </ContactCardWrapper>
  );
}
