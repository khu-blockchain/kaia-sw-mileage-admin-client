import { STUDENT_MANAGER_ABI } from "./abi";

export enum ContractEnum {
	STUDENT_MANAGER = "studentManager",
}

const ContractParams = {
	[ContractEnum.STUDENT_MANAGER]: {
		address: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
		abi: STUDENT_MANAGER_ABI,
	},
};

export default ContractParams;
