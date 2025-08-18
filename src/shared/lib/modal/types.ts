// 제네릭 모달 시스템 - 타입을 미리 정의하지 않고 사용처에서 유추
export type ModalKey = string;

// 모달 props는 제네릭으로 처리
export type ModalProps<T = Record<string, any>> = T;

// 모달 컴포넌트의 기본 props 타입
export interface BaseModalProps {
  modalKey: ModalKey;
  onClose?: () => void;
}

// 모달 컴포넌트 타입
export type ModalComponent<T = Record<string, any>> = React.ComponentType<
  T & BaseModalProps
>;