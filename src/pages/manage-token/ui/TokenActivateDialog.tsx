import { useState } from "react";

import { toast } from "sonner";

import { STUDENT_MANAGER_ABI } from "@shared/config";
import { encodeContractExecutionABI, kaia, KaiaTxType } from "@shared/lib/web3";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Switch,
} from "@/shared/ui";

import { useActivateMileageToken } from "../api";

interface TokenActivationDialogProps {
	isActive: boolean;
	contractAddress: string;
	mileageTokenId: number;
}

export function TokenActivationDialog({
	isActive,
	contractAddress,
	mileageTokenId,
}: TokenActivationDialogProps) {
	const [open, setOpen] = useState(false);

	const { mutateAsync } = useActivateMileageToken();

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isActive) {
			toast.error("이미 활성화된 토큰입니다.");
			return;
		}
		setOpen(true);
	};

	const handleActivateToken = async () => {
		const data = encodeContractExecutionABI(
			STUDENT_MANAGER_ABI,
			"changeMileageToken",
			[contractAddress],
		);

		const rawTransaction = await kaia.wallet.signTransaction({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			from: kaia.browserProvider.selectedAddress,
			data: data,
			value: "0x0",
			gas: "0x4C4B40",
		});

		try {
			await mutateAsync({
				mileageTokenId,
				rawTransaction,
			});
			toast.success("토큰이 활성화되었습니다.");
			setOpen(false);
		} catch (error) {
			toast.error("토큰 활성화에 실패했습니다.");
			console.error(error);
		}
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<div className="cursor-pointer">
					<Switch id="activate-token" checked={isActive} />
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>이 토큰을 활성화 하시겠어요?</AlertDialogTitle>
					<AlertDialogDescription className="break-keep">
						선택한 토큰이 활성화 상태로 변경되며, 활성화 중이었던 토큰은
						비활성화 상태로 전환됩니다.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<AlertDialogAction onClick={handleActivateToken}>
						활성화
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default TokenActivationDialog;
