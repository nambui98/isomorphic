import React from "react";
import { Button } from "antd";
import { getToken } from "@iso/lib/helpers/utility";

const accessPermissions = getToken().get("permissions");

const addressPage = {
  ROLE: "role",
};

export default function BaseButton({ type = "default", onClick = () => {}, children, location, ...rest }) {
  if (accessPermissions.split(",").includes(location)) {
    return (
      <Button type={type} onClick={onClick} {...rest}>
        {children}
      </Button>
    );
  }

  return null;
}
