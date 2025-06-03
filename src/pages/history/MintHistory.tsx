import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { MintHistoryContent } from "@/widget/history";

const MintHistory = () => {
  return (
    <PageBoundary>
      <PageLayout index="지급 및 회수 내역" title="마일리지 지급">
        <MintHistoryContent />
      </PageLayout>
    </PageBoundary>
  );
};

export default MintHistory;
