import type { Mileage } from "@shared/api";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { encodePacked, keccak256 } from "viem";

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
	Button,
	Separator,
	Textarea,
} from "@/shared/ui";

import { useRejectMileage } from "../api";

type RejectMileageDialogProps = {
	mileageDetail: Mileage;
};

function RejectMileageDialog({ mileageDetail }: RejectMileageDialogProps) {
	const [open, setOpen] = useState(false);
	const [reason, setReason] = useState("");

	const { mutateAsync } = useRejectMileage();

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const handleConfirm = async () => {
		const reasonHash = keccak256(encodePacked(["string"], [reason]));

		const data = encodeContractExecutionABI(
			STUDENT_MANAGER_ABI,
			"approveDocument",
			[mileageDetail.doc_index, 0, reasonHash],
		);

		const rawTransaction = await kaia.wallet.signTransaction({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			from: kaia.browserProvider.selectedAddress,
			data: data,
			value: "0x0",
			gas: "0x4C4B40",
		});

		toast.promise(
			mutateAsync({
				id: mileageDetail.id,
				adminComment: reason,
				rawTransaction,
			}),
			{
				loading: "반려 중...",
				success: () => {
					setOpen(false);
					return "신청이 반려되었습니다.";
				},
				error: "에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
			},
		);
	};

	useEffect(() => {
		if (open) {
			setReason("");
		}
	}, [open]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="destructiveOutline" className="w-20">
					반려
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>SW 마일리지 반려</AlertDialogTitle>
					<AlertDialogDescription className="whitespace-pre-wrap">
						{
							"SW 마일리지 신청을 반려합니다.\n하단에 반려 사유를 작성해주세요. 반려 사유는 학생이 확인할 수 있습니다."
						}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<div>
					<Textarea
						className="w-full min-h-[80px] border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="반려 사유를 입력하세요."
						value={reason}
						onChange={(e) => setReason(e.target.value)}
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						취소
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default RejectMileageDialog;
