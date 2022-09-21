import React, { useState, useRef } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Select, Divider, Input, Space, Button } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
// actions
import actions from "@iso/redux/notification/actions";

// react-redux
import { useDispatch } from "react-redux";

const { Option } = Select;

const dataOptions = {
  channel: {
    selectedValue: {},
    options: ["ALL", "IN_APP", "FIREBASE"],
  },
  notifyType: {
    selectedValue: {},
    options: ["SCHEDULED", "NOW"],
  },
  segment: {
    selectedValue: {},
    options: ["LIST_EMAIL", "ALL"],
  },
};

export default function SearchListMessage({ setPages }) {
  const [items, setItems] = useState(["DRAFT", "PENDING"]);
  const [name, setName] = useState(null);

  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState(null);
  const [listSelect, setListSelect] = useState({
    segment: null,
    notifyType: null,
    channel: null,
  });

  const { width } = useWindowSize();

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    name && setItems([...items, name]);
    setName("");
  };

  const renderSelect = () => {
    return Object.keys(dataOptions).map((item, index) => (
      <Select
        key={item}
        value={listSelect[item]}
        style={{
          width: 200,
        }}
        placeholder={`${item}`}
        onChange={onChangeItems}
        autoClearSearchValue
        selectOnClose
        allowClear
        onClear={() => {
          listSelect[item] = null;
        }}
      >
        {dataOptions[item]["options"].map((option) => (
          <Option key={option} value={option} name={item}>
            {option}
          </Option>
        ))}
      </Select>
    ));
  };

  const onChangeItems = (v, item) => {
    setListSelect((state) => {
      return { ...state, [item?.name]: item?.value };
    });
  };

  const handleSearch = () => {
    dispatch(
      actions.searchListNotification({
        ...listSelect,
        title,
        status,
      })
    );
    // setStatus(null);
    // setTitle(null);
    // setListSelect({ segment: null, notifyType: null, channel: null });
    setPages(1);
  };

  return (
    <div style={{ height: width < 400 ? 250 : 32, display: "flex", justifyContent: "space-around", marginBottom: "34px", flexDirection: width < 400 ? "column" : "row", alignItems: "center" }}>
      <div>
        <Input placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} allowClear />
      </div>
      {renderSelect()}
      <Select
        style={{
          width: width < 400 ? 200 : 240,
        }}
        allowClear
        onChange={(v) => setStatus(v)}
        placeholder="status"
        value={status}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input placeholder="Enter status" ref={inputRef} value={name} onChange={onNameChange} />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
      >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
      <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
