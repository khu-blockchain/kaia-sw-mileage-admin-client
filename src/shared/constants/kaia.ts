import {
  createPublicClient,
  createWalletClient,
  custom,
  rpcSchema,
} from "viem";
import { TransactionForSendRPC } from "caver-js";
import { kairos } from "viem/chains";

type KLAY_REQUEST_METHODS = [
  {
    Method: "klay_signTransaction";
    Parameters: [TransactionForSendRPC];
    //TODO: Define the return type
    ReturnType: any;
  }
];

const provider = window.klaytn;

const publicClient = createPublicClient({
  chain: kairos,
  transport: custom(window.klaytn!),
});

const walletClient = createWalletClient({
  chain: kairos,
  transport: custom(window.klaytn!),
  rpcSchema: rpcSchema<KLAY_REQUEST_METHODS>(),
}).extend((client) => ({
  async klaySignTransaction(transaction: TransactionForSendRPC) {
    return client.request({
      method: "klay_signTransaction",
      params: [transaction],
    });
  },
}));

const kaia = {
  wallet: walletClient,
  public: publicClient,
  browserProvider: provider,
};

export { kaia };
