import type { SignUpRequest } from "@/shared/api";

import { useMutation } from "@tanstack/react-query";

import { adminApi } from "@/shared/api";

export const useAdminSignUp = () => {
	return useMutation({
		mutationFn: async (request: SignUpRequest) => {
			const { data } = await adminApi.signUp(request);
			return data;
		},
	});
};
