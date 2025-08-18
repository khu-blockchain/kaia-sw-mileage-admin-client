import { createContext, useContext } from "react";

import { type ModalKey } from "./types";

export interface DialogState {
	key: ModalKey;
	props: Record<string, any>;
	instanceId: string;
}

interface DialogContextType {
	dialogs: DialogState[];
	openModal: <T extends Record<string, any>>(
		key: ModalKey,
		props: T,
		instanceId?: string,
	) => void;
	closeModal: (key: ModalKey, instanceId?: string) => void;
	closeAllModals: () => void;
	isModalOpen: (key: ModalKey, instanceId?: string) => boolean;
}

// 제네릭 타입 안전한 모달 훅
export const DialogContext = createContext<DialogContextType | undefined>(
	undefined,
);

export const useDialog = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider");
	}
	return context;
};

export const useTypedModal = <T extends Record<string, any>>(key: ModalKey) => {
	const { openModal, closeModal, isModalOpen } = useDialog();

	return {
		open: (props: T, instanceId?: string) => openModal(key, props, instanceId),
		close: (instanceId?: string) => closeModal(key, instanceId),
		isOpen: (instanceId?: string) => isModalOpen(key, instanceId),
	};
};
