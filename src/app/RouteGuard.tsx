import { useAdminStore } from "@/features/admin";
import { useRefresh } from "@/features/auth";
import { removeLocalStorageData } from "@/shared/utils";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate, Navigate } from "react-router";

const Init = () => {
  //로그인이 완료된 사용자는 진입 할 수 없음.
  //TODO: 의도한대로 동작하지 않음
  const { getAdmin } = useAdminStore((state) => state.actions);
  if (getAdmin().admin_id !== "") {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};


const Auth = () => {
  const { getAdmin } = useAdminStore((state) => state.actions);
  if (getAdmin().admin_id !== "") {
    return <Outlet />;
  }
  return (
    <ErrorBoundary FallbackComponent={AuthBoundary}>
      <Suspense fallback={<></>}>
        <AuthGuard />
      </Suspense>
    </ErrorBoundary>
  );
};

const AuthBoundary = () => {
  const navigate = useNavigate();

  const handleInvalidRefreshToken = () => {
    removeLocalStorageData("refresh-token");
    removeLocalStorageData("refresh-expires");
    navigate("sign-in");
  };
  useEffect(() => {
    handleInvalidRefreshToken();
  }, []);

  return <></>;
};

const AuthGuard = () => {
  useRefresh();
  return <Outlet />;
};


export {
  Auth,
  Init
}
