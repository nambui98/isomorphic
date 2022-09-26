import React from "react";
// import IntlMessages from "../utility/intlMessages";
import { InputSearch } from "@iso/components/uielements/input";
// import DeleteButton from "./DeleteButton";
import { ContactListWrapper } from "@iso/components/Contacts/ContactList.style";
import Scrollbar from "@iso/components/utility/customScrollBar";
import { useIntl } from "react-intl";
import useDebounce from "@iso/lib/hooks/useDebounce";
import { useDispatch } from "react-redux";
import actions from "@iso/redux/account/actions";

export default function GroupListPermission(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { selectedId, deleteContact, changeContact } = props;

  console.log("iewojfsadfas", selectedId);

  function singleContact(contact) {
    const activeClass = selectedId === contact.id ? "active" : "";
    const onChange = () => changeContact(contact.id);
    return (
      <div key={contact.id} className={`${activeClass} isoSingleContact`} onClick={onChange}>
        {/* <div className="isoAvatar">
          {contact.avatar ? <img alt="#" src={contact.avatar} /> : ''}
        </div> */}
        <div className="isoContactName">
          <h3>{contact.account ? contact.account : "No Account"}</h3>
        </div>
      </div>
    );
  }

  function onChange(event) {
    props.setTxtSearch(event.target.value);
  }

  useDebounce(
    () => {
      dispatch({
        type: actions.GET_LIST_ACCOUNT,
        payload: {
          txtSearch: props.textSearch,
          limit: 20,
          page: 1,
        },
      });
    },
    500,
    [props.textSearch]
  );

  return (
    <ContactListWrapper className="isoContactListWrapper">
      <InputSearch placeholder="Search account" value={props.textSearch} onChange={onChange} className="isoSearchBar" />
      {props.data && props.data.length > 0 ? (
        <div className="isoContactList">
          <Scrollbar className="contactListScrollbar" style={{ height: "calc(100vh - 200px)" }}>
            {props.data.map((contact) => singleContact(contact))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">No Account</span>
      )}
    </ContactListWrapper>
  );
}
