import { useNavigate } from "react-router";

import { ConnectButton, useConnect } from "@features/connect-wallet";
import { KaiaIcon } from "@shared/assets";
import { sliceWalletAddress } from "@shared/lib/web3";

export function Header() {
	const navigate = useNavigate();

	const { walletAddress } = useConnect();

	return (
		<header className="sticky top-0 z-50 flex flex-row justify-between items-center w-full min-w-[1200px] px-8 py-5 bg-white border-b border-slate-20">
			<img
				src="https://swedu.khu.ac.kr/images/logo_swedu.png"
				alt="logo"
				onClick={() => navigate("/")}
				className="h-8 object-contain cursor-pointer"
			/>
			{walletAddress === "" ? (
				<ConnectButton.SmallButton />
			) : (
				<div className="flex flex-row items-center h-8 gap-1 border border-kaia rounded-full py-1 pl-1 pr-2">
					<img src={KaiaIcon} alt="logo" className="w-6" />
					<span className="text-xs text-kaia font-bold">
						{sliceWalletAddress(walletAddress)}
					</span>
				</div>
			)}
		</header>
	);
}
