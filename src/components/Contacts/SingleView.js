import React, { useEffect, useState, useMemo } from "react";
import { ContactCardWrapper } from "./ContactCard.style";
import { useDispatch, useSelector } from "react-redux";
import actions from "@iso/redux/groupPermission/actions";
import actionsRole from "@iso/redux/role/actions";
import { Space, Table, Button, Checkbox } from "antd";
import BaseModal from "@iso/components/BaseModal/BaseModal";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import { ContinuousColorLegend } from "react-vis";
import { OptionTable } from "./const";
import BaseButton from "@iso/components/BaseButton/BaseButton";

export default function ({ contact, otherAttributes, type }) {
  if (!contact) return null;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { listPermissionByGroup, allPermission, statusUpdatePermissionByGroup, isLoading, listGroup, statusUpdateGroupByRole } = useSelector((state) => state.GroupPermission);
  const { listGroupByRole } = useSelector((state) => state.Role);

  useEffect(() => {
    type === "group" && contact && dispatch(actions.getListPermissionByGroup({ groupId: contact.id }));
    type === "ROLE_GROUP" && contact && dispatch(actionsRole.getListGroupByRole({ roleId: contact.id }));
  }, [type, contact]);

  useEffect(() => {
    statusUpdatePermissionByGroup && dispatch(actions.getListPermissionByGroup({ groupId: contact.id }));
    statusUpdateGroupByRole && dispatch(actionsRole.getListGroupByRole({ roleId: contact.id }));
  }, [statusUpdatePermissionByGroup, statusUpdateGroupByRole]);

  const name = contact?.roleName ? contact?.roleName : null;
  const groupName = contact?.groupName ? contact.groupName : null;

  const extraInfos = [];
  contact &&
    otherAttributes.forEach((attribute) => {
      const value = contact[attribute?.value];
      if (value) {
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{attribute.title}</p>
            {attribute?.value === "createdAt" ? <p className="isoInfoDetails">{new Date(value).toLocaleString()}</p> : <p className="isoInfoDetails">{value}</p>}
          </div>
        );
      }
    });

  if (type === "group") {
    const columns = [
      {
        title: "Permission key",
        dataIndex: "permissionKey",
        key: "permissionKey",
      },
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
    ];

    extraInfos.push(
      <div className="isoContactCardInfos" style={{ flexDirection: "column" }}>
        <div style={{ padding: "24px 0", display: "flex", alignItems: "center" }}>
          <b className="isoInfoLabel">List Permission &nbsp;</b>
          <Button location="GROUP_PERMISSION_UPDATE" type="primary" style={{ border: "none" }} onClick={() => setOpenModal(true)}>
            Update Permission
          </Button>
        </div>
        <div style={{ flex: 1, width: "100%" }}>
          <Table columns={columns} dataSource={listPermissionByGroup} pagination={false} />
        </div>
      </div>
    );
  }

  if (type === "ROLE_GROUP") {
    const columns = [
      {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];

    extraInfos.push(
      <div className="isoContactCardInfos" style={{ flexDirection: "column" }}>
        <div style={{ padding: "24px 0", display: "flex", alignItems: "center" }}>
          <b className="isoInfoLabel">List Group &nbsp;</b>
          <BaseButton type="primary" location="ROLE_GROUP_UPDATE" style={{ border: "none" }} onClick={() => setOpenModal(true)}>
            Update Role Group
          </BaseButton>
        </div>
        <div style={{ flex: 1, width: "100%" }}>
          <Table columns={columns} dataSource={listGroupByRole} pagination={false} />
        </div>
      </div>
    );
  }

  const listIdPermissionsByGroup = useMemo(() => {
    return listPermissionByGroup?.map((permission) => permission.id);
  }, [listPermissionByGroup, contact]);

  const listIdGroupByRole = useMemo(() => {
    return listGroupByRole?.map((group) => group.id);
  }, [listGroupByRole]);

  const handleChangeCheckboxPermission = (e) => {
    const index = listIdPermissionsByGroup.indexOf(e.target.value);

    if (e.target.checked) {
      listIdPermissionsByGroup.push(e.target.value);
    } else {
      listIdPermissionsByGroup.splice(index, 1);
    }

    // setSelectedPermission(listIdPermissionsByGroup);
  };

  const handleChangeCheckboxRoleGroup = (e) => {
    const index = listIdGroupByRole.indexOf(e.target.value);

    if (e.target.checked) {
      listIdGroupByRole.push(e.target.value);
    } else {
      listIdGroupByRole.splice(index, 1);
    }
  };

  const handleSubmitModal = () => {
    if (type === "group") {
      dispatch(
        actions.updatePermissionGroup({
          groupId: contact.id,
          permissionId: listIdPermissionsByGroup,
        })
      );
    } else {
      dispatch(
        actions.updateGroupByRole({
          roleId: contact.id,
          groupId: listIdGroupByRole,
        })
      );
    }
  };

  const columnPermissions =
    type === "group"
      ? OptionTable({
          onChange: handleChangeCheckboxPermission,
          listId: listIdPermissionsByGroup,
          type,
        })
      : OptionTable({
          onChange: handleChangeCheckboxRoleGroup,
          listId: listIdGroupByRole,
          type,
        });

  const checkRolePermission = useMemo(() => {
    if (type === "ROLE_GROUP") return listGroup;
    return allPermission;
  }, [type]);

  return (
    <ContactCardWrapper className="isoContactCard">
      <div className="isoContactCardHead">
        <div className="isoPersonImage">
          {contact?.roleName === "Admin" ? (
            <img alt="#" src="https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg" />
          ) : (
            <img alt="#" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThpUgC7dkHYV0KD26Ujw5u83EI43dOZqvABg&usqp=CAU" />
          )}
        </div>
        <h1 className="isoPersonName">{name || groupName}</h1>
      </div>
      <div className="isoContactInfoWrapper">
        <LazyLoadingSpin loading={isLoading}>{extraInfos}</LazyLoadingSpin>
      </div>
      <BaseModal open={openModal} setOpen={setOpenModal} onSubmit={handleSubmitModal} destroyOnClose={true} title="Update Permission By Group" okText="Update">
        <Table columns={columnPermissions} dataSource={checkRolePermission} pagination={false} />
      </BaseModal>
    </ContactCardWrapper>
  );
}
