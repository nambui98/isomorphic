export const initialValue = {
  title: "",
  content: "",
  name: "",
  image: "",
  device: "ALL",
  selectOptionsDevice: [
    {
      id: "ALL",
      name: "All",
    },
    {
      id: "Android",
      name: "Android",
    },
    {
      id: "IOS",
      name: "Ios",
    },
  ],
  segment: "ALL",
  selectOptionsSegment: [
    {
      id: "ALL",
      name: "All",
    },
    {
      id: "LIST_EMAIL",
      name: "Selected device",
    },
  ],
  email: "",
  channel: "ALL",
  selectOptionsChannel: [
    {
      id: "ALL",
      name: "All",
    },
    {
      id: "IN_APP",
      name: "In-App Messaging",
    },
    {
      id: "FIREBASE",
      name: "Firebase",
    },
  ],
  selectOptionsNotifyType: [
    {
      id: "NOW",
      name: "Now",
    },
    {
      id: "SCHEDULED",
      name: "Scheduled",
    },
  ],
  notifyType: "NOW",
  selectOptionsExpires: [
    {
      id: "hours",
      name: "Hours",
    },
    {
      id: "minutes",
      name: "Minute",
    },
    {
      id: "days",
      name: "Days",
    },
    {
      id: "months",
      name: "Months",
    },
  ],
  expires: "Hours",
};
