import React, { useState, useRef } from "react";

import { Steps, Typography, Carousel } from "antd";

import NotiWrapper from "./Notification.styles";
import Content from "./Content";

import { Form, FastField, Formik, ErrorMessage } from "formik";
import BoxTitle from "@iso/components/utility/boxTitle";
import Button from "@iso/components/uielements/button";
import { AntInput, AntTextArea } from "@iso/components/ScrumBoard/AntFields";
import Attachment from "@iso/components/ScrumBoard/Attachment";
import { isRequired } from "@iso/components/ScrumBoard/ValidateFields";
import { Noti } from "./Content/Noti";
import { Target } from "./Content/Target";
import { Scheduling } from "./Content/Scheduling";
import { Additional } from "./Content/Additional";

const { Title, Text } = Typography;
const { Step } = Steps;

export default function TabNotification() {
  const [currentStep, setCurrentStep] = useState(0);
  const carouselRef = useRef();

  console.log("adsfhuisdhaf", currentStep);

  const handleClickNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      if (prev > 2) return 0;
      return (prev += 1);
    });
    carouselRef.current.next();
  };
  const handleClickPrev = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      console.log("adhfsadf", prev);
      if (prev < 1) return 3;
      return (prev -= 1);
    });
    carouselRef.current.prev();
  };

  const initialValues = {
    title: "",
    content: "",
    name: "",
    image: "",
  };

  const handleValidateFormLogin = (propsField) => {};

  const handleSubmitFormLogin = (values) => {
    console.log("adhufsadf", values);
  };

  const onChangeCarousel = (currentSlide) => {
    console.log("sdjfjsda", currentSlide);
  };

  return (
    <NotiWrapper>
      <Steps current={currentStep}>
        <Step title="Notification" />
        <Step title="Target" />
        <Step title="Scheduling" />
        <Step title="Additional options" />
      </Steps>
      <br></br>
      <Formik initialValues={initialValues} enableReinitialize validate={handleValidateFormLogin} onSubmit={handleSubmitFormLogin}>
        {({ values, handleSubmit, isSubmitting, handleReset, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}
            {/* <div style={{ display: "flex" }}> */}
            <Carousel afterChange={onChangeCarousel} ref={carouselRef}>
              <Noti currentStep={currentStep} />
              <Target currentStep={currentStep} />
              <Scheduling currentStep={currentStep} />
              <Additional currentStep={currentStep} />
            </Carousel>
            {/* </div> */}
            <div className="isoInputWrapper isoLeftRightComponent">
              {/* <Checkbox>
                      <BoxTitle subtitle="Remember me" />
                    </Checkbox> */}
              <Button type="primary" onClick={handleClickPrev}>
                <BoxTitle subtitle="Prev" primary />
              </Button>
              <Button type="primary" onClick={handleClickNext}>
                <BoxTitle subtitle="Next" primary />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </NotiWrapper>
  );
}
