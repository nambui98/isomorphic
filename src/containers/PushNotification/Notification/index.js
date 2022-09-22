import React, { useState, useRef } from "react";
import _ from "lodash";

import { useSelector, useDispatch } from "react-redux";

import { Steps, Typography, Carousel } from "antd";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";

import NotiWrapper from "./Notification.styles";
import Content from "./Content";

import { Form, FastField, Formik, ErrorMessage } from "formik";
import BoxTitle from "@iso/components/utility/boxTitle";
import Button from "@iso/components/uielements/button";
import { Noti } from "./Content/Noti";
import { Target } from "./Content/Target";
import { Scheduling } from "./Content/Scheduling";
import { Additional } from "./Content/Additional";
import { initialValue } from "./const";
import actions from "@iso/redux/notification/actions";
import { calculatorTtl } from "@iso/containers/common";

const { Title, Text } = Typography;
const { Step } = Steps;

const transitionData = (values) => {
  console.log("skadjfxzvjkdaf", values);
  let convertSchedule;
  if (values?.scheduled) {
    convertSchedule = values.scheduled.format("YYYY-MM-DD HH:mm:ss");
  }
  const newdata = {
    ...values,
    toEmail: values?.email.split(", "),
    extraData: {
      messageType: "SYSTEM_MANUAL",
      detail: {
        image: values.image,
        ttl: calculatorTtl(values.expires, values.time),
      },
    },
    os: values.device,
    scheduled: convertSchedule,
    content: values.content.trim(),
  };

  return _.omit(newdata, ["image", "email", "device", "expires", "time", "selectOptionsChannel", "selectOptionsDevice", "selectOptionsExpires", "selectOptionsNotifyType", "selectOptionsSegment"]);
};

export default function TabNotification() {
  const [currentStep, setCurrentStep] = useState(0);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { idSave } = useSelector((state) => state.Noti);

  const handleClickNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      return (prev += 1);
    });
  };

  const handleSendNoti = (values, isValidating) => {
    if (!values.content.trim()) {
      openNotificationWithIcon("error", "Error", "invalid content");
      formikRef.current.handleSubmit();
      return setCurrentStep(0);
    }
    dispatch(actions.sendNoti(transitionData(values)));
  };

  const handleSave = (value) => {
    if (!value.content.trim()) {
      openNotificationWithIcon("error", "Error", "invalid content");
      formikRef.current.handleSubmit();
      return setCurrentStep(0);
    }
    dispatch(actions.draftNoti({ ...transitionData(value), id: idSave }));
  };

  const handleValidateFormLogin = (propsField) => {
    const errors = {};
    if (!propsField.content.trim()) {
      errors.content = "Required";
    }
    return errors;
  };

  return (
    <NotiWrapper>
      <Steps current={currentStep}>
        <Step title="Notification" onClick={() => setCurrentStep(0)} style={{ cursor: "pointer" }} />
        <Step title="Target" onClick={() => setCurrentStep(1)} style={{ cursor: "pointer" }} />
        <Step title="Scheduling" onClick={() => setCurrentStep(2)} style={{ cursor: "pointer" }} />
        <Step title="Additional options" onClick={() => setCurrentStep(3)} style={{ cursor: "pointer" }} />
      </Steps>
      <br></br>
      <Formik validate={handleValidateFormLogin} initialValues={initialValue} enableReinitialize innerRef={formikRef}>
        {({ values, handleSubmit, isSubmitting, handleReset, errors, touched, isValidating }) => {
          console.log("ksjfksafa", values);
          return (
            <Form>
              <div style={{ height: "500px", minHeight: "500px" }}>
                <Noti currentStep={currentStep} />
                <Target currentStep={currentStep} formikRef={formikRef} />
                <Scheduling currentStep={currentStep} />
                <Additional currentStep={currentStep} />
              </div>
              <div className="isoInputWrapper isoLeftRightComponent" style={{ display: "flex", justifyContent: currentStep > 2 ? "center" : "end" }}>
                <Button type="default" onClick={() => handleSave(values)} className={currentStep !== 3 ? "disabled-button" : "button-primary"}>
                  Save
                </Button>
                <Button type="default" onClick={() => handleSendNoti(values, isValidating)} className={currentStep !== 3 ? "disabled-button" : "button-primary"}>
                  Send
                </Button>

                <Button type="default" onClick={handleClickNext} className={currentStep > 2 ? "disabled-button" : "button-primary"}>
                  Next
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </NotiWrapper>
  );
}
