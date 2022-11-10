import React, { useEffect, useState } from "react";
import Contacts from "../Contacts/Contacts";
import { useDispatch } from "react-redux";
import actions from "@iso/redux/role/actions";

export default function Role() {
  const dispatch = useDispatch();
  const [textSearch, setTxtSearch] = useState("");

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_ROLE,
      payload: {
        txtSearch: "",
        limit: 20,
        page: 1,
      },
    });
  }, []);

  return <Contacts textSearch={textSearch} setTxtSearch={setTxtSearch} />;
}
