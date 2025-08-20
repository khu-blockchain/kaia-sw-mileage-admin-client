import type { MileageToken } from "@shared/api";
import type { ContractAddress } from "@shared/lib/web3";

import { useSuspenseQuery } from "@tanstack/react-query";
import { CircleAlert, CircleCheck } from "lucide-react";

import { useStudentManager } from "@features/kaia";
import { mileageTokenQueries } from "@entities/mileage-token";
import { mileageTokenApi } from "@shared/api";
import { getToday, parseToFormattedDate } from "@shared/lib";
import { isSameAddress } from "@shared/lib/web3";
import {
	Alert,
	AlertDescription,
	AlertTitle,
	ContentContainer,
} from "@/shared/ui";

import TokenInfoTable from "./TokenInfoTable";

const ManageTokenContent = () => {
	const { call } = useStudentManager();
	const { data: swMileageTokenList } = useSuspenseQuery({
		queryKey: [...mileageTokenQueries.list()],
		queryFn: async () => {
			const { data } = await mileageTokenApi.getMileageTokenList();
			const activeTokenAddress = (await call(
				"mileageToken",
				[],
			)) as ContractAddress;
			return data.map((token) => ({
				...token,
				is_active: isSameAddress(token.contract_address, activeTokenAddress),
			}));
		},
	});

	const activeToken = swMileageTokenList.find((token) => token.is_active);

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
				<TokenInfoTable mileageTokenList={swMileageTokenList} />
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
