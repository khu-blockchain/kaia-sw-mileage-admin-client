import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router";
import { useSetRecoilState } from "recoil";

import { adminState, mapAdmin } from "@entities/admin";
import { authApi } from "@/shared/api/auth";
import { accessTokenState } from "@/shared/authorize";

const useRefresh = () => {
	const setAdminState = useSetRecoilState(adminState);
	const setAccessTokenState = useSetRecoilState(accessTokenState);
  
	return useSuspenseQuery({
		queryKey: ["refresh"],
		queryFn: async () => {
			const { data } = await authApi.refreshToken();
			setAdminState(mapAdmin(data));
			setAccessTokenState(data.access_token);
			return mapAdmin(data);
		},
		retry: false,
	});
};

function AuthGuardInner() {
	useRefresh();
	return <Outlet />;
}

function AuthGuardFallback() {
	return <Navigate to="/sign-in" />;
}

export default function AuthGuard() {
	return (
		<Suspense fallback={<></>}>
			<ErrorBoundary FallbackComponent={() => <AuthGuardFallback />}>
				<AuthGuardInner />
			</ErrorBoundary>
		</Suspense>
	);
}
