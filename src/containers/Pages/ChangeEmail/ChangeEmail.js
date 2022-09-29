import React from "react";
import { Link } from "react-router-dom";
// import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import ForgotPasswordStyleWrapper from "../ForgotPassword/ForgotPassword.styles";
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
  const { changeEmail } = authAction;

  const handleSubmitFormLogin = (props) => {
    const { email } = props;

    console.log("adsfioweur", email);

    dispatch(changeEmail({ email }));
  };

  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              {/* <IntlMessages id="BEFITTER" /> */}
              BEFITTER
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>Change Email Account</h3>
            <p>Please enter new email and confirm it.</p>
          </div>

          <div className="isoForgotPassForm">
            <Formik initialValues={{ email: "" }} onSubmit={handleSubmitFormLogin}>
              {({ values, isSubmitting }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <FastField
                      component={AntInput}
                      defaultValue={values.email}
                      name="email"
                      type="text"
                      placeholder="email"
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      size="large"
                    />
                  </div>

                  <div className="isoInputWrapper">
                    <Button htmlType="submit" type="primary">
                      <IntlMessages id="page.sendRequest" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}
