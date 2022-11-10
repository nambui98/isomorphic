import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { RollbackOutlined, EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Button from "@iso/components/uielements/button";
import GroupListPermission from "./PageContent/GroupListPermission";
import SingleContactView from "@iso/components/Contacts/SingleView";
import EditGroup from "./PageContent/EditGroup";
import AddGroup from "./PageContent/AddGroup";
import { otherAttributes } from "./const";
import { GroupPermissionWrapper } from "./GroupPermission.styles";
import Scrollbar from "@iso/components/utility/customScrollBar";
import actions from "@iso/redux/groupPermission/actions";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import BaseButton from "@iso/components/BaseButton/BaseButton";

const { Content } = Layout;

export default function GroupPermission() {
  const {
    listGroup,
    idGroup,
    isLoading,
    editView,
    updateGroup,
    addGroup,
    deleteGroup,
    addGroupRequest: { statusAddGroup },
    selectedPermission,
    addPermission,
  } = useSelector((state) => state.GroupPermission);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actions.GET_LIST_GROUP,
    });

    dispatch({
      type: actions.GET_LIST_PERMISSIONS,
    });
  }, []);

  useEffect(() => {
    statusAddGroup &&
      dispatch({
        type: actions.GET_LIST_GROUP,
      });
  }, [statusAddGroup]);

  const selectedGroup = useMemo(() => {
    return idGroup ? listGroup.filter((group) => group.id === idGroup)[0] : null;
  }, [idGroup, listGroup]);

  const onVIewChange = () => {
    dispatch(actions.viewChange(!editView));
  };

  return (
    <GroupPermissionWrapper className="isomorphicContacts" style={{ background: "none" }}>
      <div className="isoContactListBar">
        <LazyLoadingSpin loading={isLoading}>
          <GroupListPermission
            data={listGroup}
            selectedId={idGroup}
            changeContact={(id) => {
              dispatch(actions.changeIdGroup(id));
              dispatch({ type: actions.CHANGE_GROUP });
            }}
          />
        </LazyLoadingSpin>
      </div>
      <Layout className="isoContactBoxWrapper">
        <Content className="isoContactBox">
          <div className="isoContactControl">
            <BaseButton type="primary" onClick={onVIewChange} location="GROUP_UPDATE">
              {!addGroup ? selectedGroup ? editView ? <RollbackOutlined /> : <EditOutlined /> : null : null}
            </BaseButton>

            <BaseButton
              location="GROUP_ADD"
              onClick={() => dispatch({ type: actions.ADD_GROUP_ACTION })}
              className="isoAddContactBtn"
              type="default"
              style={{ color: !!addGroup ? "#1890ff" : "black" }}
            >
              Add Group
            </BaseButton>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addGroup ? (
              <AddGroup />
            ) : editView ? (
              <EditGroup contact={selectedGroup} editContact={(contact) => dispatch(actions.editContact(contact))} otherAttributes={otherAttributes} />
            ) : (
              <SingleContactView contact={selectedGroup} otherAttributes={otherAttributes} type="group" />
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </GroupPermissionWrapper>
  );
}
