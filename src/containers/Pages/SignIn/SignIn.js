import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Form, Input } from "antd";

// import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import authAction from "@iso/redux/auth/actions";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import PageHeader from "@iso/components/utility/pageHeader";
// import Auth0 from "../../Authentication/Auth0/Auth0";
// import { signInWithGoogle, signInWithFacebook } from "@iso/lib/firebase/firebase.authentication.util";
import SignInStyleWrapper from "./SignIn.styles";

import Enable2FA from "./2FA/Enable2FA";
import LoginOtp from "./2FA/LoginOtp";

const { Text } = Typography;

const { login2FA } = authAction;

export default function SignIn() {
  const initialValues = { email: "", password: "" };

  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.isAuthenticated);
  const errorMessage = useSelector((state) => state.Auth.error);
  const checkAction = useSelector((state) => state.Auth.action);

  console.log("skadfjuiewry", isLoggedIn);

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  let { from } = { from: { pathname: "/dashboard" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleSubmit = (props) => {
    dispatch(login2FA({ email: props.email, password: props.password }));
  };

  const actionCheckRoundLogin = () => {
    switch (checkAction) {
      case "ENABLE_2FA":
        return <Enable2FA />;

      case "VERIFY_OTP_LOGIN":
        return <LoginOtp />;
      default:
        return (
          <Form initialValues={initialValues} onFinish={handleSubmit}>
            <PageHeader>Login Account</PageHeader>
            <Text>Please enter account and password</Text>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your account!" }]} style={{ margin: "10px 0" }}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Account" style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item>{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}</Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        );
    }
  };

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">BEFITTER</Link>
          </div>

          <div className="isoSignInForm">{actionCheckRoundLogin()}</div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
