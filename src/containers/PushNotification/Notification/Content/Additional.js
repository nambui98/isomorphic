import React, { useRef, useEffect } from "react";
// import { Form, FastField, Formik } from "formik";
import { InputSearch, InputGroup, Textarea } from "@iso/components/uielements/input";
import { Col, Row, Typography, Input } from "antd";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
// import { AntInput } from "@iso/components/ScrumBoard/AntFields";

import { Form, FastField, Formik, useFormikContext } from "formik";
import { AntInput, AntTextArea, AntSelect, AntDatePicker } from "@iso/components/ScrumBoard/AntFields";

const { Title, Text } = Typography;
const { TextArea } = Input;

export function Additional({ currentStep }) {
  const { values } = useFormikContext();

  return (
    <div style={{ display: currentStep !== 3 ? "none" : "flex", alignItems: "end" }}>
      <FastField className="text-label-input" component={AntInput} hasFeedback value={values.time} name="time" type="number" placeholder="time" size="large" tasklabel={<Text>EXPIRES</Text>} />
      <div style={{ marginBottom: "1px" }}>
        <FastField component={AntSelect} className="text-label-input" defaultValue={values.expires} selectOptions={values.selectOptionsExpires} name="expires" placeholder="Expires" size="large" />
      </div>
    </div>
  );
}
