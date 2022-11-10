import React from "react";
// import { Form, FastField, Formik } from "formik";
import { InputSearch, InputGroup, Textarea } from "@iso/components/uielements/input";
import { Col, Row, Typography, Input } from "antd";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
// import { AntInput } from "@iso/components/ScrumBoard/AntFields";

import { Form, FastField, Formik, useFormikContext } from "formik";
import { AntInput, AntTextArea } from "@iso/components/ScrumBoard/AntFields";
import Attachment from "@iso/components/ScrumBoard/Attachment";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";

const { Title, Text } = Typography;
const { TextArea } = Input;

export function Noti({ currentStep }) {
  const { values, submitForm } = useFormikContext();

  return (
    <div style={{ display: currentStep !== 0 && "none" }}>
      <FastField component={AntInput} defaultValue={values.title} className="text-label-input" name="title" type="text" placeholder="title" hasFeedback size="large" tasklabel={<Text>Title</Text>} />

      <FastField
        component={AntTextArea}
        name="content"
        defaultValue={values.content}
        type="text"
        placeholder="content"
        validate={isRequired}
        hasFeedback
        rows={3}
        size="large"
        tasklabel={<Text>Content (*)</Text>}
        className="ant-input-lg text-label-input"
      />

      <FastField component={AntInput} className="text-label-input" defaultValue={values.image} name="image" type="text" placeholder="url" hasFeedback size="large" tasklabel={<Text>Image</Text>} />

      <FastField component={AntInput} className="text-label-input" name="name" defaultValue={values.name} type="text" placeholder="name" hasFeedback size="large" tasklabel={<Text>Noti Name</Text>} />
    </div>
  );
}
