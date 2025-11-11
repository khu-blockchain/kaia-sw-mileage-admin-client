import { Navigate, Route, Routes } from "react-router";

import { ManagePointHistoriesPage } from "@pages/manage-point-histories";
import { ManageRubricPage } from "@pages/manage-rubric";
import { ManageStudentDetailPage } from "@pages/manage-student-detail";
import { MileageRequestPage } from "@pages/mileage-request";
import { MileageRequestDetailPage } from "@pages/mileage-request-detail";
import { CreateTokenPage } from "@/pages/create-token";
import { DashboardPage } from "@/pages/dashboard";
import { ManageStudentPage } from "@/pages/manage-student";
import { ManageTokenPage } from "@/pages/manage-token";
import { SignInPage } from "@/pages/sign-in";
import { WalletLostRequestPage } from "@/pages/wallet-lost-request";

import { AuthGuard, InitGuard } from "../guards";
import { MainLayout } from "../layouts";

export default function RootRouter() {
	return (
		<Routes>
			<Route element={<InitGuard />}>
				<Route path="sign-in" element={<SignInPage />} />
				{/* <Route path="sign-up" element={<SignUpPage />} /> */}
			</Route>
			<Route element={<AuthGuard />}>
				<Route element={<MainLayout />}>
					<Route index path={"/"} element={<DashboardPage />} />
					<Route path="create-token" element={<CreateTokenPage />} />
					<Route path="manage-token" element={<ManageTokenPage />} />
					<Route path="manage-rubric" element={<ManageRubricPage />} />
					<Route path="student" element={<ManageStudentPage />} />
					<Route path="student/:id" element={<ManageStudentDetailPage />} />
					<Route path="request">
						<Route index element={<MileageRequestPage />} />
						<Route path=":id" element={<MileageRequestDetailPage />} />
					</Route>
					<Route
						path="point-histories"
						element={<ManagePointHistoriesPage />}
					/>
					<Route path="wallet-change" element={<WalletLostRequestPage />} />
				</Route>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Route>
		</Routes>
	);
}
