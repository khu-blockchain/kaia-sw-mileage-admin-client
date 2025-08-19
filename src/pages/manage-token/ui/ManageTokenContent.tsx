import type { MileageToken } from "@shared/api";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { CircleAlert, CircleCheck } from "lucide-react";

import { mileageTokenQueries } from "@entities/mileage-token";
import {
	Alert,
	AlertDescription,
	AlertTitle,
	ContentContainer,
} from "@/shared/ui";

import TokenInfoTable from "./TokenInfoTable";
import { getToday, parseToFormattedDate } from "@shared/lib";

const ManageTokenContent = () => {
	const { data } = useSuspenseQuery(mileageTokenQueries.list());

	const activeToken = useMemo(
		() => data.find((token) => token.is_active),
		[data],
	);
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				{!activeToken && <NoActiveTokenAlert />}
				{activeToken && <ActiveTokenAlert activeToken={activeToken} />}
			</div>
			<ContentContainer
				title="토큰 목록"
				description="생성된 토큰 목록입니다. 운영 학기에 맞는 마일리지 토큰을 활성화 하세요."
			>
				<TokenInfoTable mileageTokenList={data} />
			</ContentContainer>
		</div>
	);
};

export default ManageTokenContent;

function NoActiveTokenAlert() {
	return (
		<Alert>
			<CircleAlert className="h-4 w-4 color-body" />
			<AlertTitle>활성화된 마일리지 토큰이 없습니다.</AlertTitle>
			<AlertDescription>
				새로운 마일리지 토큰을 생성하거나 생성된 마일리지 토큰을 활성화해
				주세요.
			</AlertDescription>
		</Alert>
	);
}

function ActiveTokenAlert({ activeToken }: { activeToken: MileageToken }) {
	return (
		<Alert>
			<CircleCheck color="var(--approved)" className="h-4 w-4" />
			<AlertTitle>
				{parseToFormattedDate(getToday().toString())} 기준 활성화 토큰 :{" "}
				{activeToken.name}
			</AlertTitle>
			<AlertDescription>
				<div className="flex justify-start items-center gap-4">
					<div className="flex flex-col gap-1/2">
						<p className="text-sm text-body">{activeToken.description}</p>
					</div>
				</div>
			</AlertDescription>
		</Alert>
	);
}
