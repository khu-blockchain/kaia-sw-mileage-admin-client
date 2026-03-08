import type { APIPromise } from "../types";
import type {
	ActivateMileageTokenRequest,
	ActivateMileageTokenResponse,
	CreateMileageTokenRequest,
	CreateMileageTokenResponse,
	GetMileageTokenListResponse,
	PauseMileageRequest,
	PauseMileageResponse,
	UnpauseMileageRequest,
  UnpauseMileageResponse,
} from "./dto";

import { MileageTokenServer } from "../route";

export const mileageTokenApi = {
	createMileageToken: (
		request: CreateMileageTokenRequest,
	): APIPromise<CreateMileageTokenResponse> =>
		MileageTokenServer.post("", {
			json: request,
		}).json(),

	getMileageTokenList: (): APIPromise<GetMileageTokenListResponse> =>
		MileageTokenServer.get("").json(),

	activateMileageToken: (
		request: ActivateMileageTokenRequest,
	): APIPromise<ActivateMileageTokenResponse> =>
		MileageTokenServer.post(`${request.mileageTokenId}/activate`, {
			json: {
				rawTransaction: request.rawTransaction,
			},
		}).json(),

	pauseMileage: (request: PauseMileageRequest): APIPromise<PauseMileageResponse> =>
		MileageTokenServer.post("pause", {
			json: {
				rawTransaction: request.rawTransaction,
			},
		}).json(),

	unpauseMileage: (request: UnpauseMileageRequest): APIPromise<UnpauseMileageResponse> =>
		MileageTokenServer.post("unpause", {
			json: {
				rawTransaction: request.rawTransaction,
			},
		}).json(),
};
