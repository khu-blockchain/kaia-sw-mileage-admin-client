import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { studentQueries } from "@entities/student/api/queries";
import { BANK_CODE } from "@shared/config";
import { ContentContainer, Separator } from "@shared/ui";

export default function StudentInfo() {
	const { id: studentId } = useParams();
	const { data } = useSuspenseQuery(
		studentQueries.getStudentDetail(Number(studentId)),
	);

	const studentInfo = useMemo(() => {
		return {
			name: {
				label: "이름",
				value: data.name,
			},
			studentId: {
				label: "학번",
				value: data.studentId,
			},
			department: {
				label: "학과",
				value: data.department,
			},
			email: {
				label: "이메일",
				value: data.email,
			},
			walletAddress: {
				label: "지갑 주소",
				value: data.walletAddress,
			},
			bankCode: {
				label: "은행",
				value: BANK_CODE[data.bankCode],
			},
			bankAccountNumber: {
				label: "계좌 번호",
				value: data.bankAccountNumber,
			},
		};
	}, [data]);

	return (
		<ContentContainer title="학생 정보">
			<div className="grid grid-cols-2 gap-4">
				{Object.entries(studentInfo).map(([key, value]) => (
					<div className="flex flex-col gap-2" key={key}>
						<span className="text-sm text-gray-500">{value.label}</span>
						<span className="text-sm">{value.value}</span>
						<Separator />
					</div>
				))}
			</div>
		</ContentContainer>
	);
}
