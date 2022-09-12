import React, { useRef, useEffect } from "react";
import { Col, Row, Typography, Input, Button, message, Upload } from "antd";
import { Form, FastField, Field, Formik, useFormikContext } from "formik";
import { AntInput, AntTextArea, AntSelect } from "@iso/components/ScrumBoard/AntFields";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";
import UploadFileCsv from "@iso/components/Upload";

const { Title, Text } = Typography;

export function Target({ currentStep, formikRef }) {
  const refTextarea = useRef();

  const { values, submitForm } = useFormikContext();

  useEffect(() => {
    if (values.segment === "LIST_EMAIL") refTextarea.current.style.display = "";
    else refTextarea.current.style.display = "none";
  }, [values.segment]);

  console.log("ewhfuasdhfas", values);

  const handleChangeSegment = (value) => {
    console.log("oiewuhfsadf", values);
  };

  return (
    <div style={{ width: "99%" }}>
      <FastField
        component={AntSelect}
        name="device"
        defaultValue={values.device}
        selectOptions={values.selectOptionsDevice}
        placeholder="select"
        validate={isRequired}
        hasFeedback
        // size="large"
        tasklabel={<Text>Device (*)</Text>}
      />
      <FastField
        component={AntSelect}
        name="segment"
        defaultValue={values.segment}
        selectOptions={values.selectOptionsSegment}
        placeholder="select"
        validate={isRequired}
        hasFeedback
        // size="large"
        tasklabel={<Text>User segment (*)</Text>}
        onChange={handleChangeSegment}
      />
      <div ref={refTextarea} style={{ display: values.segment === "LIST_EMAIL" ? "" : "none" }}>
        <Field component={AntTextArea} name="email" defaultValue={values.email} placeholder="Email" type="text" rows={3} />
        <UploadFileCsv formikRef={formikRef} />
      </div>

      <FastField
        component={AntSelect}
        name="channel"
        defaultValue={values.channel}
        selectOptions={values.selectOptionsChannel}
        placeholder="select"
        validate={isRequired}
        hasFeedback
        tasklabel={<Text>Channel (*)</Text>}
      />
    </div>
  );
}
