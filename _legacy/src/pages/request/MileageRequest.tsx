import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { MileageRequestTable } from "@/widget/request";

const MileageRequest = () => {
  return (
    <PageBoundary>
      <PageLayout index="신청 내역" title="마일리지 신청 내역">
        <MileageRequestTable />
      </PageLayout>
    </PageBoundary>
  );
};

export default MileageRequest;
