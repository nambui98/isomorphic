import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { CheckOutlined, EditOutlined, BackwardOutlined, RollbackOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Button from "@iso/components/uielements/button";
import ContactList from "@iso/components/Contacts/ContactList";
import SingleContactView from "@iso/components/Contacts/SingleView";
import EditContactView from "@iso/components/Contacts/EditView";
import AddRoleView from "@iso/components/Contacts/AddRoleView";
import DeleteButton from "@iso/components/Contacts/DeleteButton";
import { otherAttributes } from "./data";
import IntlMessages from "@iso/components/utility/intlMessages";
import { ContactsWrapper } from "./Contacts.styles";
import Scrollbar from "@iso/components/utility/customScrollBar";
import actions from "@iso/redux/role/actions";
import actionsGroup from "@iso/redux/groupPermission/actions";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import BaseButton from "@iso/components/BaseButton/BaseButton";

const { changeContact, addContact, editContact, deleteContact, viewChange } = contactActions;

const { Content } = Layout;
export default function Contacts({ setTxtSearch, textSearch }) {
  const { editView, addRole } = useSelector((state) => state.Contacts);
  const { listRole, selectedId, statusAddRole, statusEditRole, isLoading } = useSelector((state) => state.Role);
  const dispatch = useDispatch();

  console.log("dsahfueiwqfhas", addRole);

  useEffect(() => {
    dispatch({
      type: actionsGroup.GET_LIST_GROUP,
    });
  }, []);

  useEffect(() => {
    (statusAddRole || statusEditRole) &&
      dispatch({
        type: actions.GET_ALL_ROLE,
        payload: {
          txtSearch: "",
          limit: 20,
          page: 1,
        },
      });
  }, [statusAddRole, statusEditRole]);

  const selectedContact = selectedId ? listRole.filter((contact) => contact.id === selectedId)[0] : null;

  console.log("kdasuiyerq", selectedContact);

  const onVIewChange = () => {
    dispatch(viewChange(!editView));
  };

  return (
    <ContactsWrapper className="isomorphicContacts" style={{ background: "none" }}>
      <div className="isoContactListBar">
        <LazyLoadingSpin loading={isLoading}>
          <ContactList
            textSearch={textSearch}
            setTxtSearch={setTxtSearch}
            data={listRole}
            selectedId={selectedId}
            changeContact={(id) => {
              dispatch(actions.changeIdRole(id));
              dispatch(changeContact());
            }}
            deleteContact={(e) => dispatch(deleteContact(e))}
          />
        </LazyLoadingSpin>
      </div>
      <Layout className="isoContactBoxWrapper">
        <Content className="isoContactBox">
          <div className="isoContactControl">
            <BaseButton type="dashboard" onClick={onVIewChange} location="ROLE_UPDATE">
              {!addRole ? selectedId ? editView ? <RollbackOutlined /> : <EditOutlined /> : null : null}
            </BaseButton>
            {/* <DeleteButton deleteContact={(id) => dispatch(deleteContact(id))} contact={selectedContact} /> */}
            <BaseButton location="ROLE_ADD_NEW" onClick={() => dispatch(addContact())} className="isoAddContactBtn" style={{ color: !!addRole ? "#1890ff" : "black" }}>
              Add Role
            </BaseButton>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addRole ? (
              <AddRoleView setTxtSearch={setTxtSearch} />
            ) : editView ? (
              <EditContactView setTxtSearch={setTxtSearch} contact={selectedContact} editContact={(contact) => dispatch(editContact(contact))} otherAttributes={otherAttributes} />
            ) : (
              <SingleContactView contact={selectedContact} otherAttributes={otherAttributes} type="ROLE_GROUP" />
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
