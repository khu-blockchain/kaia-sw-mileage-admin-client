import { useState } from "react";

import { toast } from "sonner";

import {
	ContractEnum,
	STUDENT_MANAGER_CONTRACT_ADDRESS,
	useKaiaContract,
} from "@features/kaia";
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

import { usePauseMileage, useUnpauseMileage } from "../api";

interface ManagerPausedDialogProps {
	isPaused: boolean;
}

export function ManagerPausedDialog({ isPaused }: ManagerPausedDialogProps) {
	const [open, setOpen] = useState(false);

	const { encodeAbi, requestSignTransaction } = useKaiaContract();

	const { mutateAsync: pauseMileage } = usePauseMileage();
	const { mutateAsync: unpauseMileage } = useUnpauseMileage();

	const handlePause = async () => {
		const data = encodeAbi({
			method: "pause",
			contractType: ContractEnum.STUDENT_MANAGER,
			args: [],
		});
		const rawTransaction = await requestSignTransaction({
			contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
			data,
		});
		try {
			toast.promise(
				pauseMileage({
					rawTransaction,
				}),
				{
					loading: "시스템 일시정지 중...",
					success: {
						message: "시스템이 일시정지되었습니다.",
						description: "블록체인에 반영되는데 시간이 소요될 수 있습니다.",
					},
					error: (error) => {
						return `${error.message}`;
					},
				},
			);
		} catch (error) {
			console.error(error);
		} finally {
			setOpen(false);
		}
	};

	const handleUnpause = async () => {
		const data = encodeAbi({
			method: "unpause",
			contractType: ContractEnum.STUDENT_MANAGER,
			args: [],
		});
		const rawTransaction = await requestSignTransaction({
			contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
			data,
		});
		try {
			toast.promise(
				unpauseMileage({
					rawTransaction,
				}),
				{
					loading: "시스템 재시작 중...",
					success: {
						message: "시스템이 재시작되었습니다.",
						description: "블록체인에 반영되는데 시간이 소요될 수 있습니다.",
					},
					error: (error) => {
						return `${error.message}`;
					},
				},
			);
		} catch (error) {
			console.error(error);
		} finally {
			setOpen(false);
		}
	};

	const handleSwitchPaused = async () => {
		if (isPaused) {
			return await handleUnpause();
		}
		return await handlePause();
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<div className="flex gap-2 items-center cursor-pointer">
					<span className="text-xs text-destructive">마일리지 시스템 제어</span>
					<Switch
						id="switch-paused"
						checked={!isPaused}
						onChange={() => {
							setOpen(true);
						}}
					/>
				</div>
			</AlertDialogTrigger>
			{!isPaused && (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>시스템을 일시정지 하시겠어요?</AlertDialogTitle>
						<AlertDialogDescription className="break-keep">
							시스템이 일시정지되며, 마일리지 신청을 받을 수 없습니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction onClick={handleSwitchPaused}>
							일시정지
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			)}
			{isPaused && (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>시스템을 재시작 하시겠어요?</AlertDialogTitle>
						<AlertDialogDescription className="break-keep">
							시스템이 재시작되며, 마일리지 신청을 받을 수 있습니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<AlertDialogAction onClick={handleSwitchPaused}>
							재시작
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			)}
		</AlertDialog>
	);
}

export default ManagerPausedDialog;
