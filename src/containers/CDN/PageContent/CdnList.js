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

export default function AccountList(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { selectedId, deleteContact, changeContact } = props;

  function singleContact(key) {
    const handleActive = (device) => {
      return selectedId === device ? "active" : "";
    };
    const onChange = (device, key) => changeContact(device, key);
    return (
      <div key={key}>
        <h2 style={{ padding: 10, backgroundColor: "#c7c5c5" }}>{key}</h2>
        {props.data[key]?.map((device) => (
          <div key={device} className={`${handleActive(device)} isoSingleContact`} onClick={() => onChange(device, key)}>
            <h4>{device}</h4>
          </div>
        ))}
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
      <InputSearch placeholder="Search cdn" value={props.textSearch} onChange={onChange} className="isoSearchBar" />
      {props.data && Object.keys(props.data).length > 0 ? (
        <div className="isoContactList">
          <Scrollbar className="contactListScrollbar" style={{ height: "calc(100vh - 200px)" }}>
            {Object.keys(props.data).map((contact) => singleContact(contact))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">No Cdn</span>
      )}
    </ContactListWrapper>
  );
}
