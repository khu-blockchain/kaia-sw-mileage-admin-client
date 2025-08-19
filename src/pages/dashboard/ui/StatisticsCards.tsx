import { useMemo } from "react";

import { useSuspenseQueries } from "@tanstack/react-query";
import { Clock, TrendingUp, Wallet } from "lucide-react";

import { mileageQueries } from "@entities/mileage";
import { walletLostQueries } from "@entities/wallet-lost";
import { MILEAGE_STATUS } from "@shared/api";

function StatisticsCards() {
	const [mileageList, walletLostList] = useSuspenseQueries({
		queries: [
			{
				...mileageQueries.getMileageList({
					page: 1,
					limit: 1,
					all: true,
				}),
			},
			{
				...walletLostQueries.getWalletLostList({
					page: 1,
					limit: 1,
					all: true,
				}),
			},
		],
	});

	const mileageListData = mileageList.data.data;
	const walletLostListData = walletLostList.data.data;

	const mileageStats = useMemo(() => {
		const total = mileageListData.length;
		const pending = mileageListData.filter(
			(item) => item.status === MILEAGE_STATUS.REVIEWING,
		).length;
		return { total, pending };
	}, [mileageListData]);

	const walletStats = useMemo(() => {
		const total = walletLostListData.length;
		return { total };
	}, [walletLostListData]);

	return (
		<>
			<StatCard
				title="전체 마일리지 신청"
				value={mileageStats.total}
				icon={<TrendingUp className="h-5 w-5" />}
				color="bg-blue-50 text-blue-600"
				iconColor="text-blue-600"
			/>
			<StatCard
				title="대기중인 신청"
				value={mileageStats.pending}
				icon={<Clock className="h-5 w-5" />}
				color="bg-yellow-50 text-yellow-600"
				iconColor="text-yellow-600"
			/>
			<StatCard
				title="지갑 분실 요청"
				value={walletStats.total}
				icon={<Wallet className="h-5 w-5" />}
				color="bg-purple-50 text-purple-600"
				iconColor="text-purple-600"
			/>
		</>
	);
}

function StatCard({
	title,
	value,
}: {
	title: string;
	value: number;
	icon: React.ReactNode;
	color: string;
	iconColor: string;
}) {
	return (
		<div className="bg-white rounded-md border p-4">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-gray-500">{title}</p>
					<p className="text-2xl font-bold text-gray-900">{value}</p>
				</div>
			</div>
		</div>
	);
}

export default StatisticsCards;
