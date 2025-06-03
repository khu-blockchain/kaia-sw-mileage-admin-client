import { TransactionForSendRPC } from "caver-js";
import { Abi, ContractConstructorArgs, ContractFunctionArgs, Hex, Address } from "viem";

type Transaction = TransactionForSendRPC;
type ABI = Abi;
type Bytecode = Hex;
type ConstructorArgs = ContractConstructorArgs;
type FunctionArgs = ContractFunctionArgs;
type ContractAddress = Address;
type EOA = Address;

export type { Transaction, ABI, Bytecode, ConstructorArgs, FunctionArgs, ContractAddress, EOA };
