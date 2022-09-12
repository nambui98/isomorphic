import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import PageHeader from "@iso/components/utility/pageHeader";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { calculatorTtl } from "@iso/containers/common";
import UploadFileCsv from "@iso/components/Upload";

import useQuery from "@iso/lib/hooks/useQuery";

import { Button, Select, Form, Input, DatePicker } from "antd";

import actions from "@iso/redux/notification/actions";

const { TextArea } = Input;
const { Option } = Select;

export default function UpdateNoti() {
  const [form] = Form.useForm();
  let query = useQuery();
  const dispatch = useDispatch();

  const { noti } = useSelector((state) => state.Noti);
  const refEmail = useRef();
  const refSchedule = useRef();

  console.log("dskafiewq", noti);
  console.log("asdnfjnjvkxczv", noti?.title);

  const id = query.get("id");

  useEffect(() => {
    dispatch(actions.getNoti({ id }));
  }, [id]);

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
    console.log("oweriqwr", refEmail.current);
    if (segment === "LIST_EMAIL") {
      refEmail.current.style.display = "";
    } else {
      refEmail.current.style.display = "none";
    }
  };

  const onFinish = (items) => {
    console.log("saduewyqr", items);
    let newTtl = 0;
    if (items.expires.expiresTime) {
      newTtl = calculatorTtl(items.expires.expiresSession, items.expires.expiresTime);
    }

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
      toEmail: items.email?.split(", "),
    };

    console.log("sodifuewqfasf", newValue);

    const finalData = _.omit(newValue, ["expires", "image", "email"]);

    dispatch(actions.saveNotification(finalData));
  };

  return (
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
            value: noti?.notifyType,
          },
          {
            name: ["os"],
            value: noti?.os,
          },
          {
            name: ["image"],
            value: noti?.image,
          },
          {
            name: ["email"],
            value: noti?.toEmail,
          },
          {
            name: ["scheduled"],
            value: noti?.scheduled ? moment(noti?.scheduled) : "",
          },
          {
            name: ["expires"],
            value: {
              expiresTime: noti?.detail?.ttl,
              expiresSession: "minutes",
            },
          },
        ]}
      >
        <Form.Item name="id">
          <Input type="hidden" />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <TextArea style={{ height: 90 }} />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Input />
        </Form.Item>

        <Form.Item label="Channel" name="channel">
          <Select options={optionChannel} />
        </Form.Item>
        <Form.Item label="Segment" name="segment">
          <Select options={optionSegment} onChange={handleChangeSegment} />
        </Form.Item>
        <div ref={refEmail} style={{ display: noti.segment === "LIST_EMAIL" ? "" : "none" }}>
          <Form.Item label="Email" name="email">
            <TextArea style={{ height: 90, marginBottom: "20px" }} />
          </Form.Item>
          <Form.Item name="upload" label="Upload">
            <UploadFileCsv formikRef={form} />
          </Form.Item>
        </div>

        <Form.Item label="NotifyType" name="notifyType">
          <Select options={optionNotifyType} onChange={handelChangeSelect} />
        </Form.Item>

        <div style={{ display: noti.notifyType === "SCHEDULED" ? "" : "none" }} ref={refSchedule}>
          <Form.Item label="Scheduled" name="scheduled">
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
        </div>

        <Form.Item label="Os" name="os">
          <Select options={optionOs} />
        </Form.Item>

        <Form.Item label="Expires" name="expires">
          <TimeInputPick />
        </Form.Item>
        <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: 8, lg: 8, md: { span: 16, offset: 8 } }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </LayoutWrapper>
  );
}
