import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import actions from "@iso/redux/groupPermission/actions";
import { Select, Button } from "antd";

const { Option } = Select;

export default function () {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(
      actions.addGroupAction({
        groupName,
        description,
      })
    );
  };

  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column", textAlign: "center" }}>
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">ADD GROUP</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Group Name</p>
          <Input placeholder="name" onChange={(e) => setGroupName(e.target.value)} autoFocus />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Description</p>
          <Input placeholder="description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Button type="primary" style={{ padding: "0 20px", marginTop: "40px" }} onClick={handleClickAdd}>
            Add
          </Button>
        </div>
      </div>
    </ContactCardWrapper>
  );
}
