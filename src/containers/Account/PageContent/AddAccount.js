import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import actions from "@iso/redux/account/actions";
import { Select, Button } from "antd";

const { Option } = Select;

export default function ({ setTxtSearch }) {
  const { listRole } = useSelector((state) => state.Role);
  const [email, setNewEmail] = useState("");
  const [account, setNewAccount] = useState("");
  const [role, setNewRole] = useState("");

  const dispatch = useDispatch();

  const handleAddNewAccount = () => {
    dispatch(
      actions.addAccountAction({
        account,
        email,
        roleId: role,
      })
    );
    setTxtSearch("");
  };

  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", alignItems: "center" }}>
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">ADD NEW ACCOUNT</h1>
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
      <Button type="primary" style={{ padding: "0 20px", marginTop: "40px" }} onClick={handleAddNewAccount}>
        Add
      </Button>
    </ContactCardWrapper>
  );
}
