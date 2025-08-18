import type { SignInRequest } from "@/shared/api";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/shared/api";
import { useAuthStore } from "@/shared/authorize";

export const useAdminSignIn = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);
			const { access_token, ...admin } = data;

			setAccessToken(access_token);

			return admin;
		},
	});
};
