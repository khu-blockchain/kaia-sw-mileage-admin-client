import type { Abi } from "@kaiachain/viem-ext";

import { TxType } from "@kaiachain/viem-ext";

type ABI = Abi;

const KaiaTxType = TxType;
const KAIROS_NETWORK_ID = 1001;

export type { ABI };
export { KaiaTxType, KAIROS_NETWORK_ID };
