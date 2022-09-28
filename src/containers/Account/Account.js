import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { RollbackOutlined, EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Button from "@iso/components/uielements/button";
import AccountList from "./PageContent/AccountList";
import SingleContactView from "@iso/components/Contacts/SingleView";
import EditAccountView from "./PageContent/EditAccount";
import AddAccountView from "./PageContent/AddAccount";
import { otherAttributes } from "./const";
import { ContactsWrapper } from "./Account.styles";
import Scrollbar from "@iso/components/utility/customScrollBar";
import actions from "@iso/redux/account/actions";
import actionRole from "@iso/redux/role/actions";
import { useEffect } from "react";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import BaseButton from "@iso/components/BaseButton/BaseButton";

const { editContact, deleteContact } = contactActions;

const { Content } = Layout;
export default function Account() {
  const { listRole } = useSelector((state) => state.Role);
  const { listAccount, isLoading, idAccount, success, statusChangeRole, statusDisableAccount, addAccount, editView, activeAccountRequest } = useSelector((state) => state.Account);

  const dispatch = useDispatch();
  const [textSearch, setTxtSearch] = useState("");
  console.log("dsakewiurqo", idAccount);
  useEffect(() => {
    dispatch({
      type: actions.GET_LIST_ACCOUNT,
      payload: {
        txtSearch: "",
        limit: 20,
        page: 1,
      },
    });
  }, []);

  useEffect(() => {
    (activeAccountRequest || statusDisableAccount || statusChangeRole || success) &&
      dispatch({
        type: actions.GET_LIST_ACCOUNT,
        payload: {
          txtSearch: "",
          limit: 20,
          page: 1,
        },
      });
  }, [activeAccountRequest, statusDisableAccount, statusChangeRole, success]);

  useEffect(() => {
    if (listRole.length > 0) return listRole;

    dispatch({
      type: actionRole.GET_ALL_ROLE,
      payload: {
        txtSearch: "",
        limit: 20,
        page: 1,
      },
    });
  }, [dispatch, listRole]);

  const selectedAccount = useMemo(() => {
    return idAccount ? listAccount.filter((contact) => contact.id === idAccount)[0] : null;
  }, [idAccount, listAccount]);

  const onVIewChange = () => {
    dispatch(actions.viewChange(!editView));
  };

  return (
    <ContactsWrapper className="isomorphicContacts" style={{ background: "none" }}>
      <div className="isoContactListBar">
        <LazyLoadingSpin loading={isLoading}>
          <AccountList
            textSearch={textSearch}
            setTxtSearch={setTxtSearch}
            data={listAccount}
            selectedId={idAccount}
            changeContact={(id) => {
              dispatch(actions.changeIdAccount(id));
              dispatch({ type: actions.CHANGE_ACCOUNT });
            }}
            deleteContact={(e) => dispatch(deleteContact(e))}
          />
        </LazyLoadingSpin>
      </div>
      <Layout className="isoContactBoxWrapper">
        <Content className="isoContactBox">
          <div className="isoContactControl">
            <BaseButton location="ACCOUNT_UPDATE" type="default" onClick={onVIewChange}>
              {!addAccount ? selectedAccount ? editView ? <RollbackOutlined /> : <EditOutlined /> : null : null}
            </BaseButton>

            <BaseButton
              location="ACCOUNT_ADD_NEW"
              onClick={() => dispatch({ type: actions.ADD_ACCOUNT_ACTION })}
              className="isoAddContactBtn"
              style={{ color: addAccount ? "rgb(24, 144, 255)" : "black" }}
            >
              Add Account
            </BaseButton>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addAccount ? (
              <AddAccountView setTxtSearch={setTxtSearch} />
            ) : editView ? (
              <EditAccountView setTxtSearch={setTxtSearch} contact={selectedAccount} editContact={(contact) => dispatch(editContact(contact))} otherAttributes={otherAttributes} />
            ) : (
              <SingleContactView contact={selectedAccount} otherAttributes={otherAttributes} />
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
