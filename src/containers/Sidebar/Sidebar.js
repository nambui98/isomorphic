import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { options, optionsNoti, publicOptions } from "./options";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Menu from "@iso/components/uielements/menu";
import IntlMessages from "@iso/components/utility/intlMessages";
import appActions from "@iso/redux/app/actions";
import Logo from "@iso/components/utility/logo";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";
import { getToken } from "@iso/lib/helpers/utility";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } = appActions;

export default function Sidebar({ chooseSidebarOptions }) {
  const dispatch = useDispatch();
  const { view, openKeys, collapsed, openDrawer, current, height } = useSelector((state) => state.App);
  const customizedTheme = useSelector((state) => state.ThemeSwitcher.sidebarTheme);
  const getAccessPermission = getToken().get("permissions").split(",");

  function handleClick(e) {
    if (e.key === "update") return;
    dispatch(changeCurrent([e.key]));
    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find((key) => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find((key) => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline";
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  const chooseOptions = useMemo(() => {
    let newOptions;

    switch (chooseSidebarOptions) {
      case "notification":
        newOptions = optionsNoti;
        break;
      default:
        newOptions = options;
        break;
    }

    return newOptions;
  }, [chooseSidebarOptions]);

  return (
    <SidebarWrapper>
      <Sider trigger={null} collapsible={true} collapsed={isCollapsed} width={240} className="isomorphicSidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={styling}>
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu onClick={handleClick} theme="dark" className="isoDashboardMenu" mode={mode} openKeys={isCollapsed ? [] : openKeys} selectedKeys={current} onOpenChange={onOpenChange}>
            {chooseOptions.map((singleOption) => {
              if (getAccessPermission.includes(singleOption?.type)) {
                return <SidebarMenu key={singleOption.key} type={singleOption?.type} submenuStyle={submenuStyle} submenuColor={submenuColor} singleOption={singleOption} />;
              }
            })}
            {chooseOptions.length > 1 &&
              publicOptions.map((singleOption) => <SidebarMenu key={singleOption.key} type={singleOption?.type} submenuStyle={submenuStyle} submenuColor={submenuColor} singleOption={singleOption} />)}
            {/* Demo Menu */}
            {/* <SubMenu
              key="sub1"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-android-options" />
                  <span className="nav-text">
                    <IntlMessages id="sidebar.menuLevels" />
                  </span>
                </span>
              }
            >
              <MenuItemGroup key="g1" title={<IntlMessages id="sidebar.item1" />}>
                <Menu.Item style={submenuStyle} key="1">
                  <IntlMessages id="sidebar.option1" />
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="2">
                  <IntlMessages id="sidebar.option2" />
                </Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup key="g2" title={<IntlMessages id="sidebar.item2" />}>
                <Menu.Item style={submenuStyle} key="3">
                  <IntlMessages id="sidebar.option3" />
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="4">
                  <IntlMessages id="sidebar.option4" />
                </Menu.Item>
              </MenuItemGroup>
            </SubMenu> */}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
