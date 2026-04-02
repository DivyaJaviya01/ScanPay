// Shared OTP Database for communication between user and cashier
export const OTP_DATABASE = {};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const addOTPTodatabase = (otp, cart) => {
  OTP_DATABASE[otp] = {
    cart: cart,
    timestamp: new Date(),
    approved: false
  };
  return otp;
};

export const getOrderByOTP = (otp) => {
  return OTP_DATABASE[otp];
};

export const approveOrder = (otp) => {
  if (OTP_DATABASE[otp]) {
    OTP_DATABASE[otp].approved = true;
    OTP_DATABASE[otp].approvedAt = new Date();
    return true;
  }
  return false;
};

export const rejectOrder = (otp) => {
  if (OTP_DATABASE[otp]) {
    delete OTP_DATABASE[otp];
    return true;
  }
  return false;
};
