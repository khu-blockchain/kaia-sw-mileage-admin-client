import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

import { mileageTokenQueries } from "@entities/mileage-token";
import { parseToFormattedDate } from "@shared/lib";
import { Button } from "@shared/ui";

export default function ActiveTokenSection() {
	const navigate = useNavigate();
	const { data: swMileageTokenList } = useSuspenseQuery(
		mileageTokenQueries.getList(),
	);

	const activeToken = useMemo(
		() => swMileageTokenList.find((token) => token.is_active),
		[swMileageTokenList],
	);

	return (
		<div className="bg-white rounded-md border p-4 h-fit">
			<div className="flex items-center justify-between gap-3 mb-4">
				<div className="flex items-center">
					<h2 className="text-lg font-semibold text-body">활성화된 토큰</h2>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="w-20 h-8 text-sm"
					onClick={() => navigate("/admin/manage-token")}
				>
					토큰 관리
				</Button>
			</div>

			{!activeToken ? (
				<div className="text-center py-8">
					<p className="text-gray-500 text-sm mb-4">
						활성화된 마일리지 토큰이 없습니다.
					</p>
				</div>
			) : (
				<div className="space-y-4">
					<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-md border border-blue-200">
						<div className="flex items-center gap-2 mb-2">
							<CheckCircle className="h-4 w-4 text-blue-600" />
							<span className="text-sm font-medium text-blue-800">
								활성 상태
							</span>
						</div>
						<h3 className="font-bold text-lg text-blue-900">
							{activeToken.name}
						</h3>
						<p className="text-blue-700 text-sm">{activeToken.symbol}</p>
					</div>

					<div className="space-y-3">
						<div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
							<span className="text-sm text-gray-600 break-keep">생성일</span>
							<span className="text-sm font-medium">
								{parseToFormattedDate(activeToken.created_at)}
							</span>
						</div>
						<div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
							<span className="text-sm text-gray-600 break-keep">설명</span>
							<span className="text-sm font-medium break-keep">
								{activeToken.description || "설명 없음"}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
