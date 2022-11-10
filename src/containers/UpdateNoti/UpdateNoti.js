import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import CardWrapper, { Box, StatusTag } from "@iso/containers/Invoice/Invoice.styles";
import PageHeader from "@iso/components/utility/pageHeader";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { calculatorTtl } from "@iso/containers/common";
import UploadFileCsv from "@iso/components/Upload";
import { convertObject } from "../common";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import { BillingFormWrapper, InputBoxWrapper } from "@iso/containers/Ecommerce/Checkout/Checkout.styles";
import InputBox from "@iso/containers/Ecommerce/Checkout/InputBox";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import useQuery from "@iso/lib/hooks/useQuery";

import { Button, Select, Form, Input, DatePicker } from "antd";

import actions from "@iso/redux/notification/actions";

const { TextArea } = Input;
const { Option } = Select;

export default function UpdateNoti() {
  const [form] = Form.useForm();
  let query = useQuery();
  const dispatch = useDispatch();

  const { noti, loadingGetNoti, statusSave } = useSelector((state) => state.Noti);
  const refEmail = useRef();
  const refSchedule = useRef();

  const id = query.get("id");

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getNoti({ id }));
  }, [id]);

  useEffect(() => {
    statusSave && dispatch(actions.getNoti({ id }));
  }, [statusSave]);

  const optionSegment = [
    { label: "ALL", value: "ALL" },
    { label: "LIST_EMAIL", value: "LIST_EMAIL" },
    // { label: "MORE", value: "MORE" },
  ];

  const optionChannel = [
    { label: "ALL", value: "ALL" },
    { label: "IN_APP", value: "IN_APP" },
    { label: "FIREBASE", value: "FIREBASE" },
  ];

  const optionNotifyType = [
    { label: "NOW", value: "NOW" },
    { label: "SCHEDULED", value: "SCHEDULED" },
  ];

  const optionOs = [
    { label: "ALL", value: "ALL" },
    { label: "IOS", value: "IOS" },
    { label: "ANDROID", value: "ANDROID" },
  ];

  const TimeInputPick = ({ value = {}, onChange }) => {
    const [expiresTime, setExpiresTime] = useState((value.expiresTime && Math.floor(value.expiresTime / 1000 / 60)) || "");
    const [expiresSession, setExpiresSession] = useState(value.expiresSession);

    const triggerChange = (changedValue) => {
      // eslint-disable-next-line no-unused-expressions
      onChange?.({
        expiresTime,
        expiresSession,
        ...value,
        ...changedValue,
      });
    };

    const onNumberChange = (e) => {
      const newNumber = parseInt(e.target.value || "0", 10);

      if (Number.isNaN(expiresTime)) {
        return;
      }

      if (!("expiresTime" in value)) {
        setExpiresTime(newNumber);
      }

      triggerChange({
        expiresTime: newNumber,
      });
    };

    const onCurrencyChange = (newCurrency) => {
      if (!("expiresSession" in value)) {
        setExpiresSession(newCurrency);
      }

      triggerChange({
        expiresSession: newCurrency,
      });
    };

    return (
      <span>
        <Input
          type="text"
          value={value.expiresTime || expiresTime}
          onChange={onNumberChange}
          style={{
            width: 100,
          }}
        />
        <Select
          value={value.expiresSession || expiresSession}
          style={{
            width: 120,
            margin: "0 8px",
          }}
          onChange={onCurrencyChange}
        >
          <Option value="hours">Hours</Option>
          <Option value="minutes">Minutes</Option>
          <Option value="days">Days</Option>
          <Option value="months">Months</Option>
        </Select>
      </span>
    );
  };

  const handelChangeSelect = (select) => {
    if (select === "SCHEDULED") {
      refSchedule.current.style.display = "";
    } else {
      refSchedule.current.style.display = "none";
    }
  };

  const handleChangeSegment = (segment) => {
    if (segment === "LIST_EMAIL") {
      refEmail.current.style.display = "";
    } else {
      refEmail.current.style.display = "none";
    }
  };

  const onFinish = (items) => {
    // debugger;
    let newTtl = 0;
    if (items.expires.expiresTime) {
      newTtl = calculatorTtl(items.expires.expiresSession, items.expires.expiresTime);
    }

    const checkTypeEmail = (email) => {
      if (typeof email === "object") {
        return items.email;
      }

      return items.email.split(", ");
    };

    const newValue = {
      ...items,
      scheduled: items["scheduled"] && items["scheduled"].format("YYYY-MM-DD HH:mm:ss"),
      extraData: {
        messageType: "SYSTEM_MANUAL",
        detail: {
          image: items["image"],
          ttl: newTtl,
        },
      },
      toEmail: items?.email && checkTypeEmail(items.email),
      content: items.content.trim(),
    };

    if (!newValue.content.trim()) {
      return openNotificationWithIcon("error", "Error", "invalid content");
    }

    const finalData = _.omit(newValue, ["expires", "image", "email"]);
    dispatch(actions.saveNotification(finalData));
  };

  const handleSendDraft = () => {
    try {
      noti.extraData = JSON.parse(noti.extra_data);
      noti.scheduled = moment(noti?.scheduled).format("YYYY-MM-DD HH:mm:ss");
    } catch (err) {
      console.log("error parse json::", err);
    }

    const newData = { ...noti, notifyType: noti.notify_type };
    const finalData = _.omit(newData, ["notify_id", "created_at", "is_read", "status", "notify_type", "extra_data"]);

    dispatch(actions.sendNoti(finalData));
  };

  return (
    <LazyLoadingSpin loading={loadingGetNoti}>
      <LayoutWrapper style={{ height: "100%" }}>
        <PageHeader>Update Notification</PageHeader>
        <Form
          form={form}
          style={{ width: "100%" }}
          name="basic"
          labelCol={{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }}
          onFinish={onFinish}
          fields={[
            {
              name: ["id"],
              value: noti?.notify_id,
            },
            {
              name: ["name"],
              value: noti?.name,
            },
            {
              name: ["title"],
              value: noti?.title,
            },
            {
              name: ["content"],
              value: noti?.content,
            },
            {
              name: ["channel"],
              value: noti?.channel,
            },
            {
              name: ["segment"],
              value: noti?.segment,
            },
            {
              name: ["notifyType"],
              value: noti?.notify_type,
            },
            {
              name: ["os"],
              value: noti?.os,
            },
            {
              name: ["image"],
              value: convertObject(noti?.extra_data) && convertObject(noti?.extra_data)?.detail?.image,
            },
            {
              name: ["email"],
              value: noti?.to_email,
            },
            {
              name: ["scheduled"],
              value: noti?.scheduled ? moment(noti?.scheduled) : "",
            },
            {
              name: ["expires"],
              value: {
                expiresTime: convertObject(noti?.extra_data) && convertObject(noti?.extra_data)?.detail?.ttl && parseInt(Number(convertObject(noti?.extra_data)?.detail?.ttl) / 1000 / 60),
                expiresSession: "minutes",
              },
            },
          ]}
        >
          <BillingFormWrapper className="isoBillingForm" style={{ margin: "0 auto" }}>
            <h3 style={{ color: "rgb(111 181 247)" }}>Notification</h3>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
            <div className="isoInputFieldset">
              <InputBox label="Name" name="name" />
              <InputBox label="Title" name="title" />
            </div>
            <div className="isoInputFieldset">
              <InputBox label="Content" name="content" type="textarea" important />
            </div>
            <div className="isoInputFieldset">
              <InputBox label="Image" name="image" />
            </div>
            <h3 style={{ borderTop: "1px solid #d2d3d5", paddingTop: "10px", marginBottom: "32px", color: "rgb(111 181 247)" }}>Target</h3>
            <div className="isoInputFieldset">
              <InputBox label="Channel" name="channel" type="select" important options={optionChannel} />
              <InputBox label="Os" name="os" type="select" important options={optionOs} />
              <InputBox label="Segment" name="segment" type="select" important options={optionSegment} onChange={handleChangeSegment} />
            </div>
            <div ref={refEmail} style={{ display: noti.segment === "LIST_EMAIL" ? "" : "none" }}>
              <div className="isoInputFieldset">
                <InputBox label="Email" name="email" type="textarea" />
              </div>
              <Form.Item name="upload" label="Upload">
                <UploadFileCsv formikRef={form} />
              </Form.Item>
            </div>
            <h3 style={{ borderTop: "1px solid #d2d3d5", paddingTop: "10px", marginBottom: "32px", color: "rgb(111 181 247)" }}>Scheduling</h3>
            <div className="isoInputFieldset">
              <InputBox label="NotifyType" name="notifyType" type="select" important options={optionNotifyType} onChange={handelChangeSelect} />
            </div>
            <div style={{ display: noti.notify_type === "SCHEDULED" ? "" : "none", paddingTop: "10px", marginBottom: "16px" }} ref={refSchedule}>
              <Form.Item label="Scheduled" name="scheduled">
                <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
              </Form.Item>
            </div>
            <h3 style={{ borderTop: "1px solid #d2d3d5", paddingTop: "10px", marginBottom: "32px", color: "rgb(111 181 247)" }}>Additional options</h3>
            <label style={{ width: "100%", color: "#323332", fontWeight: "500" }}>Expires</label>
            <Form.Item noStyle label="Expires" name="expires">
              <TimeInputPick />
            </Form.Item>
            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: 8, lg: 8, md: { span: 16, offset: 8 } }}>
              <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
                Save
              </Button>
              <Button type="primary" style={{ marginTop: 20, marginLeft: 20, display: noti?.status !== "DRAFT" && "none" }} onClick={handleSendDraft}>
                Send Draft
              </Button>
            </Form.Item>
          </BillingFormWrapper>
        </Form>
      </LayoutWrapper>
    </LazyLoadingSpin>
  );
}
