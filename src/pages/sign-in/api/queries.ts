import type { SignInRequest } from "@/shared/api/auth";

import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { adminState, mapAdmin } from "@entities/admin";
import { authApi } from "@/shared/api/auth";
import { accessTokenState } from "@/shared/authorize/store";

export const useAdminSignIn = () => {
	const setAccessToken = useSetRecoilState(accessTokenState);
	const setAdmin = useSetRecoilState(adminState);

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);
			const { access_token, ...admin } = data;

			setAccessToken(access_token);
			setAdmin(mapAdmin(admin));

			return mapAdmin(admin);
		},
	});
};
