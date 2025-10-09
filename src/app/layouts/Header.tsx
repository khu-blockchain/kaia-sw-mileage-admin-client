import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

import { KaiaButton, useKaiaAccount, useKaiaWallet } from "@features/kaia";
import { authApi } from "@shared/api";
import { KaiaIcon } from "@shared/assets";
import { useAuthStore } from "@shared/authorize";
import { sliceWalletAddress } from "@shared/lib/web3";
import { Button } from "@shared/ui";

export function Header() {
	const navigate = useNavigate();
	const { reset } = useAuthStore();

	const { currentAccount } = useKaiaAccount();
	const { connectKaiaWallet } = useKaiaWallet();

	const { mutate } = useMutation({
		mutationFn: async () => {
			await authApi.logout();
			reset();
			window.location.reload();
		},
	});

	return (
		<header className="sticky top-0 z-50 flex flex-row justify-between items-center w-full min-w-[1200px] px-8 py-5 bg-white border-b border-slate-20">
			<img
				src="https://swedu.khu.ac.kr/images/logo_swedu.png"
				alt="logo"
				onClick={() => navigate("/")}
				className="h-8 object-contain cursor-pointer"
			/>
			<div className="flex flex-row items-center gap-2">
				{!currentAccount ? (
					<KaiaButton.SmallButton onClick={() => connectKaiaWallet()} />
				) : (
					<div className="flex flex-row items-center h-8 gap-1 border border-kaia rounded-full py-1 pl-1 pr-2">
						<img src={KaiaIcon} alt="logo" className="w-6" />
						<span className="text-xs text-kaia font-bold">
							{sliceWalletAddress(currentAccount)}
						</span>
					</div>
				)}
				<Button variant="ghost" size="icon" style={{ width: "32px", height: "32px" }} onClick={() => mutate()}>
					<LogOut className="w-4 h-4 text-body" />
				</Button>
			</div>
		</header>
	);
}
