import React, { lazy } from "react";
import PageHeader from "@iso/components/utility/pageHeader";
import TabNotification from "./Notification/index";
import Report from "./Report";
import basicStyle from "@iso/assets/styles/constants";

import { Tabs, Row, Col } from "antd";

const LayoutWrapper = lazy(() => import("@iso/components/utility/layoutWrapper"));

const { TabPane } = Tabs;

export default function PushNotification() {
  const { rowStyle, colStyle, gutter } = basicStyle;

  const style = {
    ...rowStyle,
    justifyContent: "center",
  };

  const onChange = (key) => {
    console.log("dsahuiehf", key);
  };

  return (
    <LayoutWrapper className="isoMapPage">
      <PageHeader>Push Notification</PageHeader>
      <Row style={style} gutter={gutter} justify="start">
        <Col md={12} xs={24} style={colStyle}>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Notification" key="notification">
              <TabNotification />
            </TabPane>
            <TabPane tab="Report" key="report">
              <Report />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
