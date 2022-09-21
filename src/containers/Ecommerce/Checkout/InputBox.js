import React, { useMemo } from "react";
import Input from "@iso/components/uielements/input";
import { Textarea } from "@iso/components/uielements/input";
import { InputBoxWrapper } from "./Checkout.styles";
import { Form, Select } from "antd";

// const { TextArea } = Input;

export default function ({ label, placeholder, important, name, type, options, onChange }) {
  const childrenNode = useMemo(() => {
    let childrenElement;
    switch (type) {
      case "textarea":
        childrenElement = (
          <Form.Item noStyle name={name}>
            <Textarea style={{ height: 90 }} />
          </Form.Item>
        );
        break;
      case "select":
        childrenElement = (
          <Form.Item noStyle name={name}>
            <Select options={options} onChange={onChange} />
          </Form.Item>
        );
        break;
      default:
        childrenElement = (
          <Form.Item noStyle name={name}>
            <Input size="large" placeholder={placeholder} type={type} />
          </Form.Item>
        );
    }

    return childrenElement;
  }, [type]);

  return (
    <InputBoxWrapper className="isoInputBox">
      <label>
        {label}
        {important ? <span className="asterisk">*</span> : null}
      </label>
      {childrenNode}
    </InputBoxWrapper>
  );
}
