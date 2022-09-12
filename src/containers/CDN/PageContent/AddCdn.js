import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";

import { Select } from "antd";

const { Option } = Select;

export default function ({ handleChangeTextarea, setVersionAdd, setPlatformAddVersion }) {
  const { listRole } = useSelector((state) => state.Role);

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <h1 className="isoPersonName">ADD CDN</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Version</p>
          <Input placeholder="account" onChange={(e) => setVersionAdd(e.target.value)} autoFocus />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Platform</p>
          <Select placeholder="Please enter platform" style={{ width: 200 }} onChange={setPlatformAddVersion}>
            <Option value="Android">Android</Option>
            <Option value="iOs">iOs</Option>
          </Select>
        </div>
        <div className="isoContactInfoWrapper">
          <p className="isoInfoLabel">Content</p>
          <textarea rows={20} onChange={handleChangeTextarea} />
        </div>
      </div>
    </ContactCardWrapper>
  );
}
