import type { ReactNode } from "react";
import type { DialogState } from "./api";

import React, { useState } from "react";

import { DialogContext } from "./api";
import { type ModalKey } from "./types";

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [dialogs, setDialogs] = useState<DialogState[]>([]);

	const openModal = <T extends Record<string, any>>(
		key: ModalKey,
		props: T,
		instanceId: string = "default",
	) => {
		setDialogs((prev) => [
			...prev.filter(
				(dialog) => !(dialog.key === key && dialog.instanceId === instanceId),
			),
			{ key, props, instanceId },
		]);
	};

	const closeModal = (key: ModalKey, instanceId: string = "default") => {
		setDialogs((prev) =>
			prev.filter(
				(dialog) => !(dialog.key === key && dialog.instanceId === instanceId),
			),
		);
	};

	const closeAllModals = () => {
		setDialogs([]);
	};

	const isModalOpen = (key: ModalKey, instanceId: string = "default") => {
		return dialogs.some(
			(dialog) => dialog.key === key && dialog.instanceId === instanceId,
		);
	};

	return (
		<DialogContext.Provider
			value={{
				dialogs,
				openModal,
				closeModal,
				closeAllModals,
				isModalOpen,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};
