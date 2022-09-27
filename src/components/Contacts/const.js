import React from "react";
import { Space, Table, Button, Checkbox } from "antd";

export const OptionTable = ({ onChange, listId }) => {
  return [
    {
      title: "Permission Name",
      dataIndex: "permissionName",
      key: "permissionName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox key={record.id} onChange={onChange} value={record.id} defaultChecked={listId.includes(record.id)} />
        </Space>
      ),
    },
  ];
};
