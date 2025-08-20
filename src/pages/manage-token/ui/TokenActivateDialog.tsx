import { useState } from "react";

import { toast } from "sonner";

import { useStudentManager } from "@features/kaia";
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

	const { encodeAbi, requestSignTransaction } = useStudentManager();

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
		const data = encodeAbi("changeMileageToken", [contractAddress]);

		const rawTransaction = await requestSignTransaction({ data });

		try {
			toast.promise(
				mutateAsync({
					mileageTokenId,
					rawTransaction,
				}),
				{
					loading: "토큰 활성화 중...",
					success: {
						message: "토큰이 활성화되었습니다.",
						description: "블록체인에 반영되는데 시간이 소요될 수 있습니다.",
					},
					error: "에러가 발생했습니다. 다시 시도해주세요.",
				},
			);
		} catch (error) {
			console.error(error);
		} finally {
			setOpen(false);
		}
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<div className="cursor-pointer">
					<Switch
						id="activate-token"
						onClick={(e) => handleOpen(e)}
						checked={isActive}
					/>
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
