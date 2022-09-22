import React, { useRef, useEffect } from "react";
// import { Form, FastField, Formik } from "formik";
import { InputSearch, InputGroup, Textarea } from "@iso/components/uielements/input";
import { Col, Row, Typography, Input } from "antd";
import Box from "@iso/components/utility/box";
import ContentHolder from "@iso/components/utility/contentHolder";
// import { AntInput } from "@iso/components/ScrumBoard/AntFields";

import { Form, FastField, Formik, useFormikContext } from "formik";
import { AntInput, AntTextArea, AntSelect, AntDatePicker } from "@iso/components/ScrumBoard/AntFields";
import Attachment from "@iso/components/ScrumBoard/Attachment";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";

const { Title, Text } = Typography;
const { TextArea } = Input;

export function Scheduling({ currentStep }) {
  const { values, submitForm } = useFormikContext();
  const refSchedule = useRef();

  console.log("sadfhudsahf", { values, currentStep });

  useEffect(() => {
    if (values.notifyType === "SCHEDULED") refSchedule.current.style.display = "";
    else refSchedule.current.style.display = "none";
  }, [values.notifyType]);

  return (
    <div style={{ display: currentStep !== 2 && "none" }}>
      <FastField
        component={AntSelect}
        defaultValue={values.notifyType}
        selectOptions={values.selectOptionsNotifyType}
        name="notifyType"
        placeholder="notifyType"
        size="large"
        hasFeedback
        tasklabel={<Text>Notify Type (*)</Text>}
        className="ant-select-selector text-label-input"
      />

      <div ref={refSchedule} style={{ display: values.notifyType === "SCHEDULED" ? "" : "none" }}>
        <FastField component={AntDatePicker} className="text-label-input" name="scheduled" tasklabel={<Text>Scheduled: </Text>} defaultValue={values.scheduled} format="YYYY-MM-DD HH:mm:ss" showTime />
      </div>
    </div>
  );
}
