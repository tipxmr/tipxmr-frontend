const defaults = {
  donor: "",
  message: "",
  amount: 0,
  duration: 0,
  donorSocketId: "",
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

function setDonorSocketId(donorSocketId, donation) {
  return Object.assign({}, donation, { donorSocketId });
}

export default {
  from,
  setDonor,
  setMessage,
  setAmount,
  setDuration,
  setDonorSocketId,
};
