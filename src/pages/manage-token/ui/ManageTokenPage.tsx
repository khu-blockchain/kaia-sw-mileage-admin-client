import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { useKaiaWallet } from "@features/kaia";

import ManageTokenContent from "./ManageTokenContent";

export default function ManageTokenPage() {
	const { connectKaiaWallet } = useKaiaWallet();
	connectKaiaWallet();
	return (
		<PageBoundary>
			<PageLayout
				index="마일리지 토큰"
				title="토큰 관리"
				description="생성된 SW Mileage 토큰 목록입니다."
			>
				<ManageTokenContent />
			</PageLayout>
		</PageBoundary>
	);
}
