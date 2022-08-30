import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import authAction from "@iso/redux/auth/actions";
import PageHeader from "@iso/components/utility/pageHeader";

import { Typography, Form } from "antd";

const { login } = authAction;

const { Text } = Typography;

export default function LoginOtp() {
  const initialValues = { textCode: "" };

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.Auth.error);
  const { action, refId } = useSelector((state) => state.Auth);

  const handleSubmitFormLoginOtp = (value) => {
    const newPayload = { ...value, refId, action };

    dispatch(login(newPayload));
  };

  return (
    <Form onFinish={handleSubmitFormLoginOtp} initialValues={initialValues}>
      <PageHeader>Login Otp</PageHeader>
      <Text>Enter your code</Text>
      <br />

      <Form.Item name="textCode" rules={[{ required: true, message: "Please input your code!" }]} style={{ marginTop: "10px" }}>
        <Input placeholder="your code" autoFocus />
      </Form.Item>
      <br />
      {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}
      <Form.Item>
        <Button type="primary" className="btnLogin" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
