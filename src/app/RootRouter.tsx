import SignIn from "@/pages/auth/SignIn";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "@/pages/auth/SignUp";
import MainLayout from "../widget/_frgment/MainLayout";
import CreateTokenPage from "@/pages/token/CreateToken";
import ManageToken from "@/pages/token/ManageToken";
import ManageStudent from "@/pages/student/ManageStudent";
import { MintHistory, BurnHistory } from "@/pages/history";
import WalletChange from "@/pages/wallet-change/WalletChange";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Auth, Init } from "@/app/RouteGuard";
import { MileageRequest, MileageRequestDetail } from "@/pages/request";

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
          <Route path="wallet-change" element={<WalletChange />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
      {/* <Route element={<Auth />}>
        <Route element={<MainLayout />}>
          <Route index path={'/'} element={<SwMileageInfo />} />
          <Route path={'token/*'}>
            <Route path={'manage'} element={<SwMileageTokenManage />} />
            <Route path={'create'} element={<SwMileageTokenCreate />} />
          </Route>
          <Route path={'list/*'}>
            <Route index element={<ManageSwMileageList />} />
            <Route path={':id'} element={<ManageSwMileageDetail />} />
          </Route>
          <Route path={'mint/*'}>
            <Route path={'execute'} element={<MintSwMileageExecute />} />
            <Route path={'history'} element={<MintSwMileageHistory />} />
          </Route>
          <Route path={'burn/*'}>
            <Route path={'execute'} element={<BurnSwMileageExecute />} />
            <Route path={'history'} element={<BurnSwMileageHistory />} />
          </Route>
          <Route index path={'student'} element={<ManageStudent />} />
          <Route path={"rank"} element={<Rank />} />
          <Route path={"info"} element={<Info />} />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default RootRouter;
