import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function LazyLoadingSpin({ delay, className, style, children, loading, ...rest }) {
  return (
    <Spin
      delay={delay}
      loadingStyle={style}
      spinning={loading}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      }
    >
      {children}
    </Spin>
  );
}
