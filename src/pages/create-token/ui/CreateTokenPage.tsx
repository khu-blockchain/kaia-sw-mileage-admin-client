import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import CreateTokenForm from "./CreateTokenForm";

export default function CreateTokenPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="마일리지 토큰"
				title="마일리지 토큰 배포"
				description="아래의 정보를 입력하여 SW 마일리지 토큰으로 사용할 KIP-7 토큰을 생성하세요."
			>
				<CreateTokenForm />
			</PageLayout>
		</PageBoundary>
	);
}
