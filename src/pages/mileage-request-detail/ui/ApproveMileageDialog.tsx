import type { Mileage, MileageActivity } from "@shared/api";

import { useState } from "react";

import { toast } from "sonner";

import {
	ContractEnum,
	STUDENT_MANAGER_CONTRACT_ADDRESS,
	useKaiaContract,
} from "@features/kaia";
import { mileageActivityPointTypeParser } from "@entities/mileage-rubric";
import { POINT_TYPE } from "@shared/api";
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
} from "@/shared/ui";

import { useApproveMileage } from "../api";

type ApproveMileageDialogProps = {
	mileageDetail: Mileage;
	mileageActivity: MileageActivity;
};

function ApproveMileageDialog({
	mileageDetail,
	mileageActivity,
}: ApproveMileageDialogProps) {
	const [open, setOpen] = useState(false);
	const [extraScore, setExtraScore] = useState("");
	const { encodeAbi, requestSignTransaction } = useKaiaContract();

	const { mutateAsync } = useApproveMileage();

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const calculateAmount = (
		mileageActivity: MileageActivity,
		extraScore: number,
	) => {
		if (mileageActivity.point_type === POINT_TYPE.FIXED) {
			return mileageActivity.fixed_point;
		}
		return extraScore;
	};

	const handleConfirm = async () => {
		if (isNaN(Number(extraScore))) {
			toast.error("부가 마일리지 점수는 숫자로 입력해주세요.");
			return;
		}

		const amount = calculateAmount(mileageActivity, Number(extraScore));

		const data = encodeAbi({
			method: "approveDocument",
			contractType: ContractEnum.STUDENT_MANAGER,
			args: [
				mileageDetail.doc_index,
				amount,
				"0x0000000000000000000000000000000000000000000000000000000000000000",
			],
		});

		const rawTransaction = await requestSignTransaction({
			contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
			data,
		});

		toast.promise(
			mutateAsync({
				id: mileageDetail.id,
				mileagePoint: amount,
				rawTransaction,
			}),
			{
				loading: "승인 중...",
				success: () => {
					setOpen(false);
					return {
						message: "신청이 승인되었습니다.",
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

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="default" className="w-20">
					승인
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>SW 마일리지 승인</AlertDialogTitle>
					<AlertDialogDescription className="whitespace-pre-wrap">
						{
							"SW 마일리지 신청을 승인합니다.\n책정된 기본 점수 이외에 부가 점수를 부여해야 할 경우, 하단의 추가 마일리지 영역에 입력해주세요."
						}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<Label className="text-sm text-muted-foreground">학생 이름</Label>
						<span className="font-semibold text-sm">
							{mileageDetail.student?.name}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<Label className="text-sm text-muted-foreground">학번</Label>
						<span className="font-semibold text-sm">
							{mileageDetail.student?.student_id}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<Label className="text-sm text-muted-foreground">활동 분야</Label>
						<span className="font-semibold text-sm">
							{mileageDetail.mileage_category_name}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<Label className="text-sm text-muted-foreground">비교과 활동</Label>
						<span className="font-semibold text-sm">
							{mileageDetail.mileage_activity_name}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<Label className="text-sm text-muted-foreground">배점 방식</Label>
						<Label className="font-semibold text-sm">
							{mileageActivityPointTypeParser(mileageActivity.point_type)}
						</Label>
					</div>
					{mileageActivity.point_type === POINT_TYPE.FIXED && (
						<div className="flex items-center justify-between">
							<Label className="text-sm text-muted-foreground">지급 수량</Label>
							<span className="font-semibold text-sm">
								{mileageActivity.fixed_point ?? 0}
							</span>
						</div>
					)}
					{mileageActivity.point_type === POINT_TYPE.OPTIONAL && (
						<div className="flex items-center justify-between gap-6">
							<Label
								htmlFor="extra-mileage"
								className="text-sm text-muted-foreground text-nowrap"
							>
								지급 수량
							</Label>
							<Input
								id="extra-mileage"
								type="text"
								className="w-55 text-right border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="지급할 마일리지 수량을 입력하세요."
								value={extraScore}
								onChange={(e) => setExtraScore(e.target.value)}
							/>
						</div>
					)}
				</div>
				<Separator />
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						취소
					</AlertDialogCancel>
					<Button variant="default" onClick={handleConfirm}>
						확인
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ApproveMileageDialog;
