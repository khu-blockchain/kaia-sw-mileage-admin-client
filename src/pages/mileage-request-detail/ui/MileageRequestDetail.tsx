import type { MileageFile } from "@entities/mileage";

import { useMemo } from "react";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useParams } from "react-router";

import { mileageQueries, mileageStatusParser } from "@entities/mileage";
import { mileagePointHistoryQueries } from "@entities/mileage-point-history";
import { MILEAGE_STATUS } from "@shared/api";
import { parseToFormattedDate } from "@shared/lib";
import { cn } from "@shared/lib/style";
import { sliceWalletAddress } from "@shared/lib/web3";

import ApproveMileageDialog from "./ApproveMileageDialog";
import ModifyMileageDialog from "./ModifyMileageDialog";
import RejectMileageDialog from "./RejectMileageDialog";

const MileageRequestDetail = () => {
	const { id: swMileageId } = useParams();
	const [mileageDetailData, mileagePointHistoryData] = useSuspenseQueries({
		queries: [
			{
				...mileageQueries.getMileageDetail(Number(swMileageId)),
			},
			{
				...mileagePointHistoryQueries.getMileagePointHistoryList({
					mileageId: Number(swMileageId),
          all: true,
					page: 1,
					limit: 1,
				}),
			},
		],
	});

	const mileageDetail = mileageDetailData.data;
	const mileagePointHistories = mileagePointHistoryData.data.data;

	const mileageFiles = useMemo(
		() => mileageDetail.mileageFiles,
		[mileageDetail],
	) as MileageFile[];

	const handleFileDownload = (fileUrl: string, fileName: string) => {
		// 새 탭에서 파일 URL 열기 (브라우저에서 자동으로 다운로드 처리)
		const link = document.createElement("a");
		link.href = `http://khunggum.khu.ac.kr${fileUrl}`;
		link.download = fileName;
		link.target = "_blank";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const detailContentMapper = useMemo(() => {
		return {
			student: {
				studentId: {
					label: "학번",
					value: mileageDetail.student?.studentId,
				},
				name: {
					label: "이름",
					value: mileageDetail.student?.name,
				},
				department: {
					label: "학과",
					value: mileageDetail.student?.department,
				},
				walletAddress: {
					label: "지갑 주소",
					value: sliceWalletAddress(
						mileageDetail.student?.walletAddress ?? "",
						6,
					),
				},
				email: {
					label: "이메일",
					value: mileageDetail.student?.email,
				},
			},
			document: {
				mileageActivityName: {
					label: "활동 분야",
					value: mileageDetail.mileageActivityName,
				},
				mileageCategoryName: {
					label: "비교과 활동",
					value: mileageDetail.mileageCategoryName,
				},
				createdAt: {
					label: "신청 일시",
					value: parseToFormattedDate(mileageDetail.createdAt.toISOString()),
				},
				mileageDescription: {
					label: "활동 내용",
					value: mileageDetail.mileageDescription,
				},
			},
			status: mileageDetail.status,
			comment: mileageDetail.adminComment ?? "-",
		};
	}, [mileageDetail]);
	return (
		<div className="flex flex-col gap-4">
			<div className="content-container">
				<div className="flex gap-6">
					<div className="flex flex-col gap-4 h-min w-50">
						<p className="text-xl font-semibold">기본 정보</p>
						<div className="flex flex-col gap-4">
							{Object.entries(detailContentMapper.student).map(
								([key, value]) => (
									<div key={key} className="grid gap-1">
										<p className="text-sm text-muted-foreground">
											{value.label}
										</p>
										<p className="text-sm text-body">{value.value}</p>
									</div>
								),
							)}
						</div>
					</div>
					<div className="flex flex-col flex-1 gap-4 w-full h-min border-l border-gray-200 pl-6">
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold">제출 정보</p>
							<p className="text-sm text-muted-foreground">
								제출 일자: {detailContentMapper.document.createdAt.value}
							</p>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">심사 결과</p>
								<MileageStatusAlert status={detailContentMapper.status} />
							</div>
							{detailContentMapper.status === MILEAGE_STATUS.REJECTED && (
								<div className="flex flex-col gap-1">
									<p className="text-sm text-muted-foreground">반려 사유</p>
									<p className="text-sm text-body break-all text-destructive">
										{detailContentMapper.comment}
									</p>
								</div>
							)}
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">활동 분야</p>
								<p className="text-sm text-body break-all">
									{detailContentMapper.document.mileageActivityName.value}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">비교과 활동</p>
								<p className="text-sm text-body break-all">
									{detailContentMapper.document.mileageCategoryName.value}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">활동 내용</p>
								<p className="text-sm text-body break-all">
									{detailContentMapper.document.mileageDescription.value}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">제출 파일</p>
								<div className="flex flex-col gap-1">
									{mileageFiles.length === 0 ? (
										<p className="text-sm font-semibold text-body break-all">
											제출 파일이 없습니다.
										</p>
									) : (
										mileageFiles.map((file) => (
											<div key={file.id} className="flex gap-1">
												<button
													onClick={() =>
														handleFileDownload(file.url, file.originalFileName)
													}
													className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all text-left cursor-pointer transition-colors"
												>
													{file.originalFileName}
												</button>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{mileageDetail.status === MILEAGE_STATUS.REVIEWING && (
				<div className="flex w-full justify-end items-center gap-4">
					<ApproveMileageDialog mileageDetail={mileageDetail} />
					<RejectMileageDialog mileageDetail={mileageDetail} />
				</div>
			)}
			{mileageDetail.status === MILEAGE_STATUS.APPROVED && (
				<div className="flex w-full justify-end items-center gap-4">
					<ModifyMileageDialog
						studentHash={mileageDetail.student?.studentHash ?? ""}
						walletAddress={mileageDetail.student?.walletAddress ?? ""}
						mileageId={mileageDetail.id}
						mileagePointHistories={mileagePointHistories}
					/>
				</div>
			)}
		</div>
	);
};

export default MileageRequestDetail;

function MileageStatusAlert({ status }: { status: MILEAGE_STATUS }) {
	const statusConfig = {
		[MILEAGE_STATUS.REVIEWING]: {
			text: mileageStatusParser(status).long_text,
			textColor: "text-pending",
		},
		[MILEAGE_STATUS.REJECTED]: {
			text: mileageStatusParser(status).long_text,
			textColor: "text-destructive",
		},
		[MILEAGE_STATUS.APPROVED]: {
			text: mileageStatusParser(status).long_text,
			textColor: "text-approved",
		},
	};

	const config = statusConfig[status];

	return (
		<div
			className={cn(
				"inline-flex items-center text-sm font-medium",
				config.textColor,
			)}
		>
			{config.text}
		</div>
	);
}
