export const sliceWalletAddress = (address: string) =>
	address.slice(0, 5) + "..." + address.slice(-3);

export const isSameAddress = (address1: string, address2: string) =>
	address1.toLowerCase() === address2.toLowerCase();
