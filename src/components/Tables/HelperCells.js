import React from "react";
import ImageCellView from "./ImageCell";
import DeleteCell from "./DeleteCell";
import EditableCell from "./EditableCell";
import FilterDropdown from "./FilterDropdown";

const DateCell = (data) => <p>{new Date(data).toLocaleString()}</p>;
const ImageCell = (src) => <ImageCellView src={src} />;
const LinkCell = (type, id) => <a href={type === "notification" ? "/notification/update?id=" + id : ""}>+</a>;
const TextCell = (text) => <p>{text || "..."}</p>;

export { DateCell, ImageCell, LinkCell, TextCell, EditableCell, DeleteCell, FilterDropdown };
