export const shortenAddress = (address = "") => {
  if (!address || typeof address !== "string") return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};