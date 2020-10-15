const defaults = {
  donor: "",
  message: "",
  amount: 0,
  duration: 0,
  donatorSocketId: "",
  subaddress: "",
  userName: "",
  displayName: "",
};

function from(options) {
  return Object.assign({}, options, defaults);
}

function setDonor(donor, donation) {
  return Object.assign({}, donation, { donor });
}

function setMessage(message, donation) {
  return Object.assign({}, donation, { message });
}

function setAmount(amount, donation) {
  return Object.assign({}, donation, { amount });
}

function setDuration(duration, donation) {
  return Object.assign({}, donation, { duration });
}

function setDonatorSocketId(donatorSocketId, donation) {
  return Object.assign({}, donation, { donatorSocketId });
}

function setSubaddress(subaddress, donation) {
  return Object.assign({}, donation, { subaddress });
}

function setUserName(userName, donation) {
  return Object.assign({}, donation, { userName });
}

function setDisplayName(displayName, donation) {
  return Object.assign({}, donation, { displayName });
}

export default {
  from,
  setDonor,
  setMessage,
  setAmount,
  setDuration,
  setDonatorSocketId,
  setSubaddress,
  setUserName,
  setDisplayName,
};
