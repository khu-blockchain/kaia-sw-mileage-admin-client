import type { Address } from "viem";

import { useMemo } from "react";

import { useKaiaWallet } from "./useKaiaWallet";

export const useKaiaAccount = () => {
	const { provider } = useKaiaWallet();

	const currentAccount: Address | undefined = useMemo(
		() => provider?.selectedAddress,
		[provider],
	);

	return {
		currentAccount,
	};
};
