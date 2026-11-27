import { useMemo } from "react";

import { withWalletRequestToast } from "../lib";

export const useKaiaWallet = () => {
	const provider = window.klaytn;
	const isInstalled = useMemo(() => !!provider, [provider]);

	const currentNetwork = useMemo(() => {
		return provider?.networkVersion;
	}, [provider]);

	const switchToKairosNetwork = async () => {
		try {
			return await withWalletRequestToast(() =>
				provider.request({
					method: "wallet_switchKlaytnChain",
					params: [{ chainId: "0x3e9" }],
				}),
			);
		} catch (error) {
			console.error(error);
		}
	};

	const connectKaiaWallet = async () => {
		await withWalletRequestToast(() => provider.enable());
	};

  

	return {
		provider,
		isInstalled,
		currentNetwork,
		switchToKairosNetwork,
		connectKaiaWallet,
	};
};
