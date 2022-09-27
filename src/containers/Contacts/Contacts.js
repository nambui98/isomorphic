import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
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

const { changeContact, addContact, editContact, deleteContact, viewChange } = contactActions;

const { Content } = Layout;
export default function Contacts({ setTxtSearch, textSearch }) {
  const { editView, contacts, addRole } = useSelector((state) => state.Contacts);
  const { listRole, selectedId, statusAddRole, statusEditRole, isLoading } = useSelector((state) => state.Role);
  const dispatch = useDispatch();
  const [nameRole, setRoleName] = useState("");
  const [keyRole, setKeyRole] = useState("");

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
    if (!editView) {
      dispatch(viewChange(!editView));
    } else {
      if (addRole) {
        dispatch(
          actions.addRoleName({
            roleKey: keyRole,
            roleName: nameRole,
          })
        );
      } else {
        dispatch(actions.editRole(selectedContact));
      }

      setTxtSearch("");
    }
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
            <Button type="default" onClick={onVIewChange}>
              {editView || addRole ? <CheckOutlined /> : selectedContact ? <EditOutlined /> : ""}
            </Button>

            {/* <DeleteButton deleteContact={(id) => dispatch(deleteContact(id))} contact={selectedContact} /> */}
            <Button type="primary" onClick={() => dispatch(addContact())} className="isoAddContactBtn">
              Add Role
            </Button>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addRole ? (
              <AddRoleView setKeyRole={setKeyRole} setRoleName={setRoleName} />
            ) : editView ? (
              <EditContactView contact={selectedContact} editContact={(contact) => dispatch(editContact(contact))} otherAttributes={otherAttributes} />
            ) : (
              <SingleContactView contact={selectedContact} otherAttributes={otherAttributes} type="ROLE_GROUP" />
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
