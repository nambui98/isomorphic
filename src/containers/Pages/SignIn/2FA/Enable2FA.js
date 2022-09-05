import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "@iso/components/uielements/input";
import authAction from "@iso/redux/auth/actions";
import PageHeader from "@iso/components/utility/pageHeader";
import QRCode from "react-google-qrcode";

import { Typography, Form, Button } from "antd";

const { loginEnable2FA } = authAction;

const { Text } = Typography;

export default function Enable2FA() {
  const initialValues = { textCode: "" };

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.Auth.error);
  const { qrcode, secretKey, action, refId } = useSelector((state) => state.Auth);

  const handleSubmitFormEnable = (props) => {
    const payload = { ...props, refId, secretKey, action };

    dispatch(loginEnable2FA(payload));
  };

  return (
    <Form onFinish={handleSubmitFormEnable} initialValues={initialValues}>
      <PageHeader>Enable 2FA</PageHeader>
      <Text>Please scan qrcode or enter secret key</Text>
      <div style={{ margin: "10px 0" }}>
        <QRCode data={qrcode} size={130} framed />
      </div>
      <Text>Secret Key &nbsp;</Text>
      <b>{secretKey}</b>
      <Form.Item name="textCode" rules={[{ required: true, message: "Please input your code!" }]} style={{ marginTop: "10px" }}>
        <Input autoFocus placeholder="code" />
      </Form.Item>
      <br />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Form.Item>
        <Button type="primary" className="btnEnable" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
