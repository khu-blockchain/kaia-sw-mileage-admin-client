const sliceWalletAddress = (address: string, digits = 4) =>
  address.slice(0, digits) + "..." + address.slice(-digits);

const isSameAddress = (address1: string, address2: string) =>
  address1.toLowerCase() === address2.toLowerCase();

export { isSameAddress, sliceWalletAddress };
