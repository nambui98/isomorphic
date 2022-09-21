import React from "react";
import { Link } from "react-router-dom";
import ImageCellView from "./ImageCell";
import DeleteCell from "./DeleteCell";
import EditableCell from "./EditableCell";
import FilterDropdown from "./FilterDropdown";
import { PlusSquareOutlined } from "@ant-design/icons";

const DateCell = (data) => <p>{new Date(data).toLocaleString()}</p>;
const ImageCell = (src) => <ImageCellView src={src} />;
const LinkCell = (type, id) => (
  <Link to={type === "notification" ? "/notification/update?id=" + id : ""}>
    <PlusSquareOutlined style={{ fontSize: "20px" }} />
  </Link>
);
const TextCell = (text, key) => {
  if (key === "status") {
    let background;

    switch (text) {
      case "PENDING":
        background = "rgb(246, 71, 68)";
        break;
      case "DRAFT":
        background = "rgb(68, 130, 255)";
        break;
      default:
        background = "rgb(0, 177, 106)";
    }
    return <p style={{ backgroundColor: background, color: "white", borderRadius: "2px", textAlign: "center" }}>{text || "..."}</p>;
  }
  return <p>{text || "..."}</p>;
};

export { DateCell, ImageCell, LinkCell, TextCell, EditableCell, DeleteCell, FilterDropdown };
