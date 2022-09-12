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

  console.log("sadfhudsahf", { values, currentStep });

  return (
    <div style={{ width: "99%" }}>
      <FastField
        component={AntInput}
        defaultValue={values.title}
        name="title"
        type="text"
        placeholder="title"
        // validate={isRequired}
        // submitCount={submitCount}
        hasFeedback
        size="large"
        // label={<Text>hello</Text>}
        tasklabel={<Text>Title</Text>}
      />

      <FastField
        component={AntTextArea}
        name="content"
        defaultValue={values.content}
        type="text"
        placeholder="content"
        validate={isRequired}
        // submitCount={submitCount}
        hasFeedback
        rows={3}
        size="large"
        tasklabel={<Text>Content (*)</Text>}
      />

      <FastField component={AntInput} defaultValue={values.image} name="image" type="text" placeholder="url" size="large" tasklabel={<Text>Image</Text>} />

      <FastField
        component={AntInput}
        name="name"
        defaultValue={values.name}
        type="text"
        placeholder="name"
        // validate={isRequired}
        // submitCount={submitCount}
        hasFeedback
        size="large"
        tasklabel={<Text>Noti Name</Text>}
      />
    </div>
  );
}
