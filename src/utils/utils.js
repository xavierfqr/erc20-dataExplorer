export const shortenAddress = (account) => {
  return `${account.substring(0, 5)}...${account.substring(account.length - 4)}`;
};
