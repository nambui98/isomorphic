import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
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

const { editContact, deleteContact } = contactActions;

const { Content } = Layout;
export default function Account() {
  const { listRole } = useSelector((state) => state.Role);
  const { listAccount, isLoading, idAccount, statusChangeRole, statusDisableAccount, addAccount, editView, activeAccountRequest, disabledView, resetPasswordView, changeRoleView, activeView } =
    useSelector((state) => state.Account);

  const dispatch = useDispatch();
  const [email, setNewEmail] = useState("");
  const [account, setNewAccount] = useState("");
  const [role, setNewRole] = useState("");
  const [textSearch, setTxtSearch] = useState("");

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
    (activeAccountRequest || statusDisableAccount || statusChangeRole) &&
      dispatch({
        type: actions.GET_LIST_ACCOUNT,
        payload: {
          txtSearch: "",
          limit: 20,
          page: 1,
        },
      });
  }, [activeAccountRequest, statusDisableAccount, statusChangeRole]);

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
  const [roleId, setRoleId] = useState("");

  const onVIewChange = () => {
    if (!editView) {
      dispatch(actions.viewChange(!editView));
    } else {
      if (addAccount) {
        dispatch(
          actions.addAccountAction({
            account,
            email,
            roleId: role,
          })
        );
      } else {
        if (activeView) {
          dispatch(
            actions.activeAccount({
              account: selectedAccount.account,
            })
          );
        } else if (disabledView) {
          // dispatch(actions.editRole(selectedAccount));
          dispatch(
            actions.disabledAccount({
              account: selectedAccount.account,
            })
          );
        } else if (resetPasswordView) {
          dispatch(
            actions.resetAccount({
              account: selectedAccount.account,
            })
          );
        } else if (changeRoleView) {
          if (!roleId) return;
          dispatch(
            actions.changeRoleAccount({
              account: selectedAccount.account,
              roleId,
            })
          );
        }
      }
      setTxtSearch("");
    }
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
            <Button type="default" onClick={onVIewChange}>
              {editView || addAccount ? <CheckOutlined /> : selectedAccount ? <EditOutlined /> : ""}
            </Button>

            <Button type="primary" onClick={() => dispatch({ type: actions.ADD_ACCOUNT_ACTION })} className="isoAddContactBtn">
              Add Account
            </Button>
          </div>

          <Scrollbar className="contactBoxScrollbar">
            {addAccount ? (
              <AddAccountView setNewAccount={setNewAccount} setNewEmail={setNewEmail} setNewRole={setNewRole} />
            ) : editView ? (
              <EditAccountView setRoleId={setRoleId} contact={selectedAccount} editContact={(contact) => dispatch(editContact(contact))} otherAttributes={otherAttributes} />
            ) : (
              <SingleContactView contact={selectedAccount} otherAttributes={otherAttributes} />
            )}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
