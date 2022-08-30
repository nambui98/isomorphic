import React from "react";
import { Link } from "react-router-dom";
// import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import ForgotPasswordStyleWrapper from "./ForgotPassword.styles";
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
  const { forgotPassword } = authAction;

  const handleValidateFormLogin = (propsField) => {
    // const errors = {};
    // if (!propsField.email) {
    //   errors.email = "Required";
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(propsField.email)) {
    //   errors.email = "Invalid email address";
    // }
    // return errors;
  };

  const handleSubmitFormLogin = (props) => {
    const { email } = props;

    dispatch(forgotPassword({ email }));
  };

  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="BEFITTER" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.forgetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
          </div>

          <div className="isoForgotPassForm">
            <Formik initialValues={{ email: "" }} validate={handleValidateFormLogin} onSubmit={handleSubmitFormLogin}>
              {({ values, isSubmitting }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <FastField
                      component={AntInput}
                      defaultValue={values.email}
                      name="email"
                      type="text"
                      placeholder="@versehub.io"
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      size="large"
                    />
                  </div>

                  <div className="isoInputWrapper">
                    <Button htmlType="submit" type="primary" disabled={isSubmitting}>
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
