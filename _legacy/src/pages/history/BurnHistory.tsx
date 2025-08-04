import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { BurnHistoryContent } from "@/widget/history";

const BurnHistory = () => {
  return (
    <PageBoundary>
      <PageLayout index="지급 및 회수 내역" title="마일리지 회수">
        <BurnHistoryContent />
      </PageLayout>
    </PageBoundary>
  );
};

export default BurnHistory;
