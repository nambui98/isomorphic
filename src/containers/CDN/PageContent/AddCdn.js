import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import Input, { Textarea } from "@iso/components/uielements/input";
import { ContactCardWrapper } from "@iso/components/Contacts/ContactCard.style";
import notification from "@iso/components/Notification";

import { Select, Button } from "antd";

const { Option } = Select;

export default function ({ handleChangeTextarea, setVersionAdd, setPlatformAddVersion, valueAddCdn }) {
  const refTextArea = useRef();
  const [loading, setLoading] = useState(false);

  const handleFormatTextarea = () => {
    setLoading(true);
    try {
      let obj = JSON.parse(valueAddCdn);
      refTextArea.current.value = JSON.stringify(obj, undefined, 4);
    } catch (e) {
      notification("error", e.toString(), "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
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
          <p className="isoInfoLabel">Content</p>
          <textarea rows={20} onChange={handleChangeTextarea} ref={refTextArea} />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="default" onClick={handleFormatTextarea} loading={loading}>
            Format
          </Button>
        </div>
      </div>
    </ContactCardWrapper>
  );
}
