function getLastName(userName) {
  if (!userName) return "User";
  const length = userName.split(" ").length;
  return userName.split(" ")[length - 1];
}
function getFormatDate(seconds = 0) {
  const date = new Date(seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-Vi");
  return formatDate;
}

export { getLastName, getFormatDate };
