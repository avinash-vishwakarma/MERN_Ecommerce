const genrateOtp = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

export default genrateOtp;
