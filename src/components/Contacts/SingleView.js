import React, { useEffect, useState } from "react";
import { ContactCardWrapper } from "./ContactCard.style";
import { useDispatch, useSelector } from "react-redux";
import actions from "@iso/redux/groupPermission/actions";
import { Space, Table, Tag } from "antd";

export default function ({ contact, otherAttributes, type }) {
  if (!contact) return null;
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { listPermissionByGroup } = useSelector((state) => state.GroupPermission);

  useEffect(() => {
    type === "group" && contact && dispatch(actions.getListPermissionByGroup({ groupId: contact.id }));
  }, [type, contact]);

  console.log("dksafjksdaf", listPermissionByGroup);
  const name = contact?.roleName ? contact?.roleName : null;
  const groupName = contact?.groupName ? contact.groupName : null;
  console.log("sadkjfsadf", groupName);
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

  if (type === "group" && listPermissionByGroup?.length) {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
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
    extraInfos.push(<Table columns={columns} dataSource={listPermissionByGroup} />);
  }

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
      <div className="isoContactInfoWrapper">{extraInfos}</div>
    </ContactCardWrapper>
  );
}
