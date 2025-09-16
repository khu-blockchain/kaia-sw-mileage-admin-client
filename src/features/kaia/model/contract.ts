import { STUDENT_MANAGER_ABI } from "../config";

export enum ContractEnum {
	STUDENT_MANAGER = "studentManager",
}

const ContractParams = {
	[ContractEnum.STUDENT_MANAGER]: {
		abi: STUDENT_MANAGER_ABI,
	},
};

export default ContractParams;
