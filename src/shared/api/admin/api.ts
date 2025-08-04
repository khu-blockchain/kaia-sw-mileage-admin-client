import type { APIPromise } from "../types";
import type {
	SignUpRequest,
	SignUpResponse,
	UpdateEmailRequest,
	UpdateEmailResponse,
} from "./dto";

import { AdminServer } from "../route";

export const adminApi = {
	signUp: (request: SignUpRequest): APIPromise<SignUpResponse> =>
		AdminServer.post("", {
			json: request,
		}).json(),

	updateEmail: (request: UpdateEmailRequest): APIPromise<UpdateEmailResponse> =>
		AdminServer.put("email", {
			json: request,
		}).json(),
};
