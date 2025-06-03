import { CommonErrorFallback } from "@/widget/_suspense";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">데이터를 불러오는 중...</p>
      </div>
    </div>
  );
};

const PageBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={CommonErrorFallback}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PageBoundary;
