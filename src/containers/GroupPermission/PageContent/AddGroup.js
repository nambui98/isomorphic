import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";

import { Select } from "antd";

const { Option } = Select;

export default function ({ setGroupName, setDescription }) {
  return (
    <ContactCardWrapper className="isoContactCard">
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
      </div>
    </ContactCardWrapper>
  );
}
