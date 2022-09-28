import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "../uielements/input";
import { ContactCardWrapper } from "./ContactCard.style";
import "./upload.css";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import actions from "@iso/redux/role/actions";

export default function ({ setTxtSearch }) {
  const [nameRole, setRoleName] = useState("");
  const [keyRole, setKeyRole] = useState("");
  const dispatch = useDispatch();

  const handleAddRole = () => {
    dispatch(
      actions.addRoleName({
        roleKey: keyRole,
        roleName: nameRole,
      })
    );
    setTxtSearch("");
  };

  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", alignItems: "center" }}>
      <div className="isoContactCardHead">
        <h1 className="isoPersonName" style={{ marginBottom: "40px" }}>
          ADD NEW ROLE
        </h1>
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
      <Button type="primary" style={{ marginTop: "40px", padding: "0 25px" }} onClick={handleAddRole}>
        Add
      </Button>
    </ContactCardWrapper>
  );
}
