import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { CreateTokenForm } from "@/widget/token";

const CreateToken = () => {
  return (
    <PageBoundary>
      <PageLayout index="마일리지 토큰" title="마일리지 토큰 배포">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-body">
              아래의 정보를 입력하여 SW 마일리지 토큰으로 사용할 KIP-7 토큰을
              생성하세요.
            </p>
          </div>
          <CreateTokenForm />
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default CreateToken;
