import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import notification from "@iso/components/Notification";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { Select, Button } from "antd";

const { Option } = Select;

export default function ({ handleChangeTextarea, setVersionAdd, setPlatformAddVersion, valueAddCdn }) {
  return (
    <ContactCardWrapper className="isoContactCard" style={{ flexDirection: "column" }}>
      <div className="isoContactCardHead" style={{ width: "100%", marginBottom: "20px" }}>
        <h1 className="isoPersonName">ADD CDN</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Version</p>
          <Input placeholder="Version" onChange={(e) => setVersionAdd(e.target.value)} autoFocus isRequired />
        </div>
        <div className="isoContactCardInfos">
          <p className="isoInfoLabel">Platform</p>
          <Select placeholder="Please enter platform" style={{ width: 200 }} onChange={setPlatformAddVersion} isRequired>
            <Option value="Android">Android</Option>
            <Option value="iOs">iOs</Option>
          </Select>
        </div>
        <div className="isoContactInfoWrapper">
          <p className="isoInfoLabel" style={{ color: "#323332", fontWeight: 500 }}>
            Content
          </p>
          <Editor allowedModes={["tree", "code"]} value={{}} onChange={handleChangeTextarea} />
        </div>
      </div>
    </ContactCardWrapper>
  );
}
