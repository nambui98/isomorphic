import { renderCell } from "../Tables/AntTables/configs";

export const columnNoti = [
  {
    title: "Name",
    key: "name",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "TextCell", "name"),
  },
  {
    title: "Title",
    key: "title",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "TextCell", "title"),
  },
  {
    title: "Content",
    key: "content",
    width: "1%",
    render: (object) => renderCell(object, "TextCell", "content"),
  },
  {
    title: "Channel",
    key: "channel",
    width: "1%",
    render: (object) => renderCell(object, "TextCell", "channel"),
  },
  {
    title: "Status",
    key: "status",
    width: "1%",
    render: (object) => renderCell(object, "TextCell", "status"),
  },
  {
    title: "Notify Type",
    key: "notifyType",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "TextCell", "notifyType"),
  },
  {
    title: "Segment",
    key: "segment",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "TextCell", "segment"),
  },
  {
    title: "Os",
    key: "os",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "TextCell", "os"),
  },
  {
    title: "Created At",
    key: "created_at",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "DateCell", "created_at"),
  },
  {
    title: "Action",
    key: "action",
    width: "1%",
    // className: "isoImageCell",
    render: (object) => renderCell(object, "LinkCell", "notify_id", "notification"),
  },
];
