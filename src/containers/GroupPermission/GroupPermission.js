import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
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

const { Content } = Layout;
export default function GroupPermission() {
  const { listRole } = useSelector((state) => state.Role);
  const { listAccount, idAccount, statusChangeRole, statusDisableAccount, addAccount, activeAccountRequest, disabledView, resetPasswordView, changeRoleView, activeView } = useSelector(
    (state) => state.Account
  );

  const {
    listGroup,
    idGroup,
    isLoading,
    editView,
    updateGroup,
    addGroup,
    deleteGroup,
    addGroupRequest: { statusAddGroup },
  } = useSelector((state) => state.GroupPermission);

  console.log("ksadfjaskdf");

  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch({
      type: actions.GET_LIST_GROUP,
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

  console.log("asdkfdsafasdf", selectedGroup);

  const onVIewChange = () => {
    if (!editView) {
      dispatch(actions.viewChange(!editView));
    } else {
      if (addGroup) {
        dispatch(
          actions.addGroupAction({
            groupName,
            description,
          })
        );
      } else {
        if (updateGroup) {
          console.log("dsakfjsdahfas", selectedGroup);
          dispatch(
            actions.updateGroup({
              ...selectedGroup,
            })
          );
        } else if (deleteGroup) {
          console.log("dsafsdafsdfsad", selectedGroup.id);
          dispatch(
            actions.deleteGroup({
              groupId: selectedGroup.id,
            })
          );
        }
      }
    }
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
            <Button type="primary" onClick={onVIewChange}>
              {editView || addGroup ? <CheckOutlined /> : selectedGroup ? <EditOutlined /> : ""}
            </Button>

            <Button onClick={() => dispatch({ type: actions.ADD_GROUP_ACTION })} className="isoAddContactBtn" type="default">
              Add Group
            </Button>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addGroup ? (
              <AddGroup setDescription={setDescription} setGroupName={setGroupName} />
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
