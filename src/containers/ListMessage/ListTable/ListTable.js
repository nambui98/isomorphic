import React from "react";
import { Table } from "antd";

import { columnNoti } from "../config";

export default function ListTable({ dataSource }) {
  return <Table dataSource={dataSource} columns={columnNoti} pagination={false} />;
}
