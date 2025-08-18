import { BrowserRouter } from "react-router";
import { RecoilRoot } from "recoil";

import { DialogProvider } from "@shared/lib/modal";
import { RecoilProvider } from "@shared/lib/recoil";
import { Toaster } from "@shared/ui/sonner";
import { DialogManager } from "@/widgets/modal-manager";

import { QueryProvider } from "./providers";
import { RootRouter } from "./routes";

function App() {
	return (
		<RecoilRoot>
			<RecoilProvider />
			<QueryProvider>
				<DialogProvider>
					<Toaster />
					<BrowserRouter>
						<RootRouter />
					</BrowserRouter>
					<DialogManager />
				</DialogProvider>
			</QueryProvider>
		</RecoilRoot>
	);
}

export default App;
