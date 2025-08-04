import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import WalletLostTable from "@/widget/walletLost/WalletLostTable";

const ManageWalletLost = () => {
  return (
    <PageBoundary>
      <PageLayout index="지갑 변경 요청" title="지갑 변경 요청 목록">
        <div className="flex flex-col gap-6">
          <WalletLostTable />
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default ManageWalletLost;
