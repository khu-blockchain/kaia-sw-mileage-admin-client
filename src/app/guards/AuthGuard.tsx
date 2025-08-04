import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";
import { useSetRecoilState } from "recoil";

import { adminState, mapAdmin } from "@entities/admin";
import { authApi } from "@/shared/api/auth";

const useRefresh = () => {
	const setAdminState = useSetRecoilState(adminState);

	return useSuspenseQuery({
		queryKey: ["refresh"],
		queryFn: async () => {
			const { data } = await authApi.refreshToken();
			setAdminState(mapAdmin(data));
		},
		retry: false,
	});
};

function AuthGuardInner() {
	useRefresh();
	return <Outlet />;
}

export default function AuthGuard() {
	return (
		<Suspense fallback={<></>}>
			<ErrorBoundary FallbackComponent={() => <>error</>}>
				<AuthGuardInner />
			</ErrorBoundary>
		</Suspense>
	);
}
