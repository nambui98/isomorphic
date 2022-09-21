import { Card } from "antd";
import React from "react";
import { checkStatusNoti } from "@iso/containers/common";

import { PlusSquareOutlined } from "@ant-design/icons";

const CartList = ({ dataSource }) =>
  dataSource.map((item) => (
    <Card key={item.notify_id}>
      <p>
        <b>Name: </b>
        {item.name || "null"}
      </p>
      <p>
        <b>Title: </b>
        {item.title || "null"}
      </p>
      <p>
        <b>Content: </b>
        {item.content}
      </p>
      <p>
        <b>Channel: </b>
        {item.channel}
      </p>
      <p>
        <b>Status: </b>
        {item.status}
      </p>
      <p>
        <b>Noti Name: </b>
        {item.notify_type || "null"}
      </p>
      <p>
        <b>Segment: </b>
        {item.segment}
      </p>
      <p>
        <b>Os: </b>
        {item.os}
      </p>
      <p>
        <b>Created: </b>
        {new Date(item.created_at).toLocaleString()}
      </p>
      {checkStatusNoti(item) && (
        <p>
          <b>Action: </b>
          <a href={"/notification/update?id=" + item.notify_id}>
            <PlusSquareOutlined />
          </a>
        </p>
      )}
    </Card>
  ));

export default CartList;
