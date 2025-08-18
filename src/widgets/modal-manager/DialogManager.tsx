import React, { Suspense } from "react";

import {
	fallbackModal,
	getModalComponent,
	useDialog,  
} from "@/shared/lib/modal";

export const DialogManager: React.FC = () => {
	const { dialogs } = useDialog();

	return (
		<>
			{dialogs.map(({ key, props, instanceId }) => {
				const ModalComponent = getModalComponent(key) || fallbackModal;

				return (
					<Suspense key={`${key}-${instanceId}`} fallback={null}>
						<ModalComponent modalKey={key} {...props} />
					</Suspense>
				);
			})}
		</>
	);
};
