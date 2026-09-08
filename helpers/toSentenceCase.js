const toSentenceCase = (str) => {
  if (!str) return "";
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
};

export default toSentenceCase;
