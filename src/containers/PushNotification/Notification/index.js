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
  };

  return _.omit(newdata, ["image", "email", "device", "expires", "time", "selectOptionsChannel", "selectOptionsDevice", "selectOptionsExpires", "selectOptionsNotifyType", "selectOptionsSegment"]);
};

export default function TabNotification() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { idSave } = useSelector((state) => state.Noti);

  console.log("sdoifieqwhfa", idSave);

  const handleClickNext = (e) => {
    e.preventDefault();
    carouselRef.current.next();
    setCurrentStep((prev) => {
      if (prev > 2) return 0;
      return (prev += 1);
    });
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    carouselRef.current.prev();
    setCurrentStep((prev) => {
      if (prev < 1) return 3;
      return (prev -= 1);
    });
  };

  const handleSubmitFormLogin = (values) => {
    dispatch(actions.sendNoti(transitionData(values)));
  };

  const afterChangeCarousel = (currentSlide) => {
    setLoading(false);
  };
  const beforeChangeCarousel = (from, to) => {
    setLoading(true);
  };

  const handleSave = (value) => {
    if (!value.content) return openNotificationWithIcon("error", "Error", "invalid content");

    dispatch(actions.draftNoti({ ...transitionData(value), id: idSave }));
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
      <Formik initialValues={initialValue} enableReinitialize onSubmit={handleSubmitFormLogin} innerRef={formikRef}>
        {({ values, handleSubmit, isSubmitting, handleReset, errors, touched, isValidating }) => (
          <Form>
            <Carousel dots={false} beforeChange={beforeChangeCarousel} afterChange={afterChangeCarousel} ref={carouselRef}>
              <Noti currentStep={currentStep} />
              <Target currentStep={currentStep} formikRef={formikRef} />
              <Scheduling currentStep={currentStep} />
              <Additional currentStep={currentStep} />
            </Carousel>
            <div className="isoInputWrapper isoLeftRightComponent">
              <Button type="default" onClick={handleClickPrev} disabled={loading}>
                Prev
              </Button>

              <Button type="primary" onClick={() => handleSave(values)} disabled={currentStep !== 3}>
                <BoxTitle subtitle="Save" primary />
              </Button>
              <Button type="primary" htmlType="submit" disabled={currentStep !== 3}>
                <BoxTitle subtitle="Send" primary />
              </Button>

              <Button type="default" onClick={handleClickNext} disabled={loading}>
                Next
              </Button>
            </div>
            {isSubmitting && errors.content && openNotificationWithIcon("error", "Error", "invalid content")}
          </Form>
        )}
      </Formik>
    </NotiWrapper>
  );
}
