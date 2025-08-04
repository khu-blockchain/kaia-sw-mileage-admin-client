import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { MileageRequestDetailContent } from "@/widget/request";

const MileageRequestDetail = () => {
  return (
    <PageBoundary>
      <PageLayout index="신청 내역" title="신청 내역 상세">
        <div className="flex flex-col gap-6">
          <MileageRequestDetailContent />
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default MileageRequestDetail;
