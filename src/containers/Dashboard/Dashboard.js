import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import appActions from "@iso/redux/app/actions";
import ThemeSwitcher from "@iso/containers/ThemeSwitcher/ThemeSwitcher";
import siteConfig from "@iso/config/site.config";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";

import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "70px 0 0",
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard({ chooseSidebarOptions }) {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar chooseSidebarOptions={chooseSidebarOptions} />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            {/* <Footer style={styles.footer}>{siteConfig.footerText}</Footer> */}
            <Footer style={styles.footer}>Befitter @ 2022 Created by RedQ, Inc</Footer>
          </Layout>
        </Layout>
        <ThemeSwitcher />
      </Layout>
    </DashboardContainer>
  );
}
