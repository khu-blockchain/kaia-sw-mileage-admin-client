import { Outlet } from "react-router";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

function MainLayout() {
	return (
		<div className="flex flex-col w-full">
			<Header />
			<div className="flex w-full min-w-[1200px] bg-background-gray">
				<Sidebar />
				<main className="relative flex flex-1 flex-col w-full px-10 py-16">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default MainLayout;
