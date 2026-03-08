import type { APIPromise } from "../types";
import type { SignUpRequest, SignUpResponse } from "./dto";

import { AdminServer } from "../route";

export const adminApi = {
	signUp: (request: SignUpRequest): APIPromise<SignUpResponse> =>
		AdminServer.post("", {
			json: request,
		}).json(),
};
