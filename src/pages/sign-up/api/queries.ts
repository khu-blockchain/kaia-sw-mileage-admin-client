import type { SignUpRequest } from "@/shared/api/admin";

import { useMutation } from "@tanstack/react-query";

import { mapAdmin } from "@entities/admin";
import { adminApi } from "@/shared/api/admin";

export const useAdminSignUp = () => {
	return useMutation({
		mutationFn: async (request: SignUpRequest) => {
			const { data } = await adminApi.signUp(request);

			return mapAdmin(data);
		},
	});
};
