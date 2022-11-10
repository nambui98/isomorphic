import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Menu from "@iso/components/uielements/menu";
import { sidebarPermission } from "./constSidebarPermission";
import { getToken } from "@iso/lib/helpers/utility";
const SubMenu = Menu.SubMenu;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(function SidebarMenu({ singleOption, submenuStyle, submenuColor, ...rest }) {
  let match = useRouteMatch();

  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon} />
            <span className="nav-text">{label}</span>
          </span>
        }
        {...rest}
      >
        {children.map((child) => {
          const linkTo = child.withoutDashboard ? `/${child.key}` : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link style={submenuColor} to={linkTo}>
                {child.label}
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }

  const getAccessPermission = getToken().get("permissions").split(",");

  return (
    <Menu.Item key={key} {...rest}>
      {key !== "update" ? (
        <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon} />
            <span className="nav-text">{label}</span>
          </span>
        </Link>
      ) : (
        <span className="isoMenuHolder" style={{ color: "white" }}>
          <i className={leftIcon} />
          <span className="nav-text">{label}</span>
        </span>
      )}
    </Menu.Item>
  );
});
