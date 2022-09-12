export function checkStatusNoti(noti) {
  return noti["status"] === "DRAFT" || noti["status"] === "PENDING";
}

export const calculatorTtl = (expiresSession, expiresTime) => {
  let ttl = 0;
  switch (expiresSession) {
    case "hours":
      ttl = expiresTime * 60 * 60 * 1000;
      break;
    case "minutes":
      ttl = expiresTime * 60 * 1000;
      break;
    case "days":
      ttl = expiresTime * 24 * 60 * 60 * 1000;
      break;
    case "months":
      ttl = expiresTime * 60 * 24 * 60 * 30 * 1000;
      break;
    default:
      break;
  }

  return ttl;
};
