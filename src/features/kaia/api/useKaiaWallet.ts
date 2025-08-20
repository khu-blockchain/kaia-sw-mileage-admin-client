import { useMemo } from "react";

export const useKaiaWallet = () => {
	const provider = window.klaytn;
	const isInstalled = useMemo(() => !!provider, [provider]);

	const switchToKairosNetwork = async () => {
		try {
			await provider.request({
				method: "wallet_switchKlaytnChain",
				params: [{ chainId: "0x3e9" }],
			});
		} catch (error) {
			console.error(error);
		}
	};

	const connectKaiaWallet = async () => {
		await provider.enable();
	};

	return {
		provider,
		isInstalled,
		switchToKairosNetwork,
		connectKaiaWallet,
	};
};
