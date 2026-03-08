import { POINT_TYPE } from "@shared/api";

export const mileageActivityPointTypeParser = (type: POINT_TYPE) => {
	switch (type) {
		case POINT_TYPE.FIXED:
			return "고정 배점";
		case POINT_TYPE.OPTIONAL:
			return "별도 책정";
	}
};
