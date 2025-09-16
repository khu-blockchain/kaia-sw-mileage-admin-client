import type { Hex } from "@kaiachain/viem-ext";
import type { MileagePointHistory } from "@shared/api";

import { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	ContractEnum,
	STUDENT_MANAGER_CONTRACT_ADDRESS,
	useKaiaContract,
} from "@features/kaia";
import { mileagePointHistoryQueries } from "@entities/mileage-point-history";
import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Input,
	Label,
	Separator,
	Textarea,
} from "@/shared/ui";

import { useBurnMileage, useMintMileage } from "../api";

type ModifyMileageDialogProps = {
	studentHash: string;
	walletAddress: string;
	mileageId: number;
	mileagePointHistories: MileagePointHistory[];
};

function ModifyMileageDialog({
	studentHash,
	walletAddress,
	mileageId,
	mileagePointHistories,
}: ModifyMileageDialogProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");

	const { mutateAsync: mutateBurn } = useBurnMileage();
	const { mutateAsync: mutateMint } = useMintMileage();

	const { encodeAbi, requestSignTransaction } = useKaiaContract();

	const totalAmount = useMemo(() => {
		return mileagePointHistories.reduce((acc, curr) => {
			if (
				curr.type === MILEAGE_POINT_HISTORY_TYPE.MILEAGE_APPROVED ||
				curr.type === MILEAGE_POINT_HISTORY_TYPE.MILEAGE_MINTED
			) {
				return acc + curr.mileage_point;
			}
			return acc - curr.mileage_point;
		}, 0);
	}, [mileagePointHistories]);

	const handleOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await queryClient.prefetchQuery(
			mileagePointHistoryQueries.getMileagePointHistoryList({
				mileageId,
				all: true,
				page: 1,
				limit: 1,
			}),
		);

		setOpen(true);
	};

	const encodeMint = (
		studentHash: string,
		walletAddress: string,
		amount: number,
	) => {
		return encodeAbi({
			method: "mint",
			contractType: ContractEnum.STUDENT_MANAGER,
			args: [studentHash, walletAddress, amount],
		});
	};

	const encodeBurn = (
		studentHash: string,
		walletAddress: string,
		amount: number,
	): Hex => {
		return encodeAbi({
			method: "burnFrom",
			contractType: ContractEnum.STUDENT_MANAGER,
			args: [studentHash, walletAddress, amount],
		});
	};

	const handleModify = async () => {
		if (isNaN(Number(amount))) {
			toast.error("마일리지 수량은 숫자로 입력해주세요.");
			return;
		}
		const diff = Number(amount) - totalAmount;
		if (diff === 0) {
			toast.error("변경할 수량이 없습니다.");
			return;
		}
		if (diff < 0) {
			return handleBurn(Math.abs(diff));
		}
		return handleMint(diff);
	};

	const handleMint = async (amount: number) => {
		const encodeData = encodeMint(studentHash, walletAddress, amount);
		const rawTransaction = await requestSignTransaction({
			contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
			data: encodeData,
		});
		toast.promise(
			mutateMint({
				id: mileageId,
				mileagePoint: amount,
				note,
				rawTransaction,
			}),
			{
				loading: "마일리지 추가 지급 중...",
				success: () => {
					setOpen(false);
					return {
						message: "마일리지 추가 지급이 완료되었습니다.",
						description: "블록체인에 기록되는데 시간이 소요될 수 있습니다.",
					};
				},
				error: (error) => {
					return {
						message: "에러가 발생했습니다.",
						description: `${error.message}`,
					};
				},
			},
		);
	};

	const handleBurn = async (amount: number) => {
		const encodeData = encodeBurn(studentHash, walletAddress, amount);
		const rawTransaction = await requestSignTransaction({
			contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
			data: encodeData,
		});
		toast.promise(
			mutateBurn({
				id: mileageId,
				mileagePoint: amount,
				note,
				rawTransaction,
			}),
			{
				loading: "마일리지 회수 중...",
				success: () => {
					setOpen(false);
					return {
						message: "마일리지 회수가 완료되었습니다.",
						description: "블록체인에 기록되는데 시간이 소요될 수 있습니다.",
					};
				},
				error: (error) => {
					return {
						message: "에러가 발생했습니다.",
						description: `${error.message}`,
					};
				},
			},
		);
	};

	useEffect(() => {
		if (open) {
			setAmount("");
		}
	}, [open]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="default">지급 수량 변경</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>마일리지 지급 수량 변경</AlertDialogTitle>
					<AlertDialogDescription className="whitespace-pre-wrap break-keep">
						{
							"학생이 현재 마일리지 신청을 통해 최종적으로 지급받을 토큰의 수량을 입력해주세요."
						}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-4 bg-gray-200 p-3 rounded-md">
						<div className="flex items-center justify-between">
							<span className="text-xs text-body whitespace-pre-wrap break-keep text-nowrap">
								{`현재 마일리지 신청을 통해 학생에게 누적 지급된 토큰은 `}
								<strong>{totalAmount.toLocaleString()}개</strong>
								{` 입니다.\n학생이 이 마일리지 신청을 통해 최종적으로 지급받을 토큰의 수량을 입력해주세요.\n\nex) 만약 120개의 토큰을 지급받아야 하지만 누적 지급 수량이 100개라면 120을 입력해주세요.`}
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="extra-mileage"
							className="text-sm text-muted-foreground text-nowrap"
						>
							최종 반영 수량
						</Label>
						<Input
							id="extra-mileage"
							type="text"
							className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="최종적으로 반영할 마일리지 수량을 입력하세요."
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="note"
							className="text-sm text-muted-foreground text-nowrap"
						>
							비고
						</Label>
						<Textarea
							id="note"
							className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="비고를 입력하세요."
							value={note}
							onChange={(e) => setNote(e.target.value)}
						/>
					</div>
				</div>
				<Separator />
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						취소
					</AlertDialogCancel>
					<Button variant="default" onClick={handleModify}>
						확인
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ModifyMileageDialog;
