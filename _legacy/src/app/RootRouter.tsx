import SignIn from "@/pages/auth/SignIn";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "@/pages/auth/SignUp";
import MainLayout from "../widget/_frgment/MainLayout";
import CreateTokenPage from "@/pages/token/CreateToken";
import ManageToken from "@/pages/token/ManageToken";
import ManageStudent from "@/pages/student/ManageStudent";
import { MintHistory, BurnHistory } from "@/pages/history";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Auth, Init } from "@/app/RouteGuard";
import { MileageRequest, MileageRequestDetail } from "@/pages/request";
import ManageWalletLost from "@/pages/wallet-lost/ManageWalletLost";

const RootRouter = () => {
  return (
    <Routes>
      <Route element={<Init />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route element={<Auth />}>
        <Route element={<MainLayout />}>
          <Route index path={"/"} element={<Dashboard />} />
          <Route path="create-token" element={<CreateTokenPage />} />
          <Route path="manage-token" element={<ManageToken />} />
          <Route path="student" element={<ManageStudent />} />
          <Route path="request">
            <Route index element={<MileageRequest />} />
            <Route path=":id" element={<MileageRequestDetail />} />
          </Route>
          <Route path="mint-history" element={<MintHistory />} />
          <Route path="burn-history" element={<BurnHistory />} />
          <Route path="wallet-change" element={<ManageWalletLost />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
