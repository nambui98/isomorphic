import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@iso/components/uielements/button";
import AddCountWrapper from "./AddAccount.styles";
import { AntInput, AntSelect } from "@iso/components/ScrumBoard/AntFields";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";
import withConnect from "./withConnect";

// formik
import { Form, FastField, Formik, Field } from "formik";

function AddAccount({ listRole, getAllRole, addAccount }) {
  useEffect(() => {
    getAllRole();
  }, []);

  const handleSubmitFormLogin = (props) => {
    return addAccount({ account: props.account, email: props.email, roleId: props.roleId });
  };

  const selectOptions = listRole.map((role) => ({ id: role.id, name: role.roleName }));

  return (
    <AddCountWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">BEFITTER</Link>
          </div>

          <div className="isoFormHeadText">
            <h3>Add Acount</h3>
            <p>Enter new account and confirm it.</p>
          </div>

          <div className="isoResetPassForm">
            <Formik enableReinitialize initialValues={{ account: "", email: "", roleId: selectOptions[1]?.id, selectOptions }} onSubmit={handleSubmitFormLogin}>
              {({ values, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="isoInputWrapper">
                    <FastField
                      component={AntInput}
                      defaultValue={values.account}
                      name="account"
                      type="text"
                      placeholder="account"
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      size="large"
                    />

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
                    <Field
                      component={AntSelect}
                      name="roleId"
                      defaultValue={values.roleId}
                      label="Choose permisions"
                      placeholder="Select"
                      selectOptions={values.selectOptions}
                      validate={isRequired}
                      // submitCount={submitCount}
                      hasFeedback
                      // dropdownClassName="project-category"
                      size="large"
                    />
                  </div>

                  <div className="isoInputWrapper">
                    <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                      Add
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AddCountWrapper>
  );
}

export default withConnect(AddAccount);
