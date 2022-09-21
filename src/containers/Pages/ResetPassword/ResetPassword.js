import React from "react";
import { Link } from "react-router-dom";
// import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import ResetPasswordStyleWrapper from "./ResetPassword.styles";
import { AntInput } from "@iso/components/ScrumBoard/AntFields";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";

// redux
import { useSelector, useDispatch } from "react-redux";

// actions
import authAction from "@iso/redux/auth/actions";

// formik
import { Form, FastField, Formik } from "formik";

export default function () {
  const dispatch = useDispatch();
  const { resetPassword } = authAction;

  const handleSubmitFormLogin = (props) => {
    dispatch(resetPassword(props));
  };

  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              {/* <IntlMessages id="BEFITTER" /> */}
              BEFITTER
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>Change Password</h3>
            <p>
              <IntlMessages id="page.resetPassDescription" />
            </p>
          </div>

          <div className="isoResetPassForm">
            <Formik initialValues={{ password: "", newPassword: "" }} onSubmit={handleSubmitFormLogin}>
              {({ values, isSubmitting }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <FastField
                      component={AntInput}
                      defaultValue={values.password}
                      name="password"
                      type="password"
                      placeholder="password"
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      size="large"
                    />

                    <FastField
                      component={AntInput}
                      defaultValue={values.newPassword}
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      size="large"
                    />
                  </div>

                  <div className="isoInputWrapper">
                    <Button htmlType="submit" type="primary">
                      <IntlMessages id="page.resetPassSave" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}
