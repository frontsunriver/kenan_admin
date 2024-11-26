import crypto from "crypto";

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp && timestamp == undefined && timestamp == "") {
    return "";
  }
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const findUniqueValues = (array1, array2) => {
  const combined = [...array1, ...array2];
  const uniqueValues = combined.filter((item, index) => {
    return (
      combined.indexOf(item) === index &&
      !(array1.includes(item) && array2.includes(item))
    );
  });
  return uniqueValues;
};

export const checkUrlExists = (userInfo, url) => {
  if (userInfo && userInfo["roles"]) {
    return userInfo["roles"].some((permission) => permission.url === url);
  } else {
    return false;
  }
};

export const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};
