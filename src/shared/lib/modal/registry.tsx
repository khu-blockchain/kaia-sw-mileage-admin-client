import { lazy } from 'react';
import { type ModalKey, type ModalComponent } from './types';

// Modal Registry - 동적으로 관리
export const modalRegistry = new Map<ModalKey, ModalComponent>();

// Modal 등록 함수
export function registerModal<T extends Record<string, any>>(
  key: ModalKey,
  component: ModalComponent<T>
): void {
  modalRegistry.set(key, component as ModalComponent);
}

// Modal 컴포넌트 가져오기 함수
export function getModalComponent(key: ModalKey): ModalComponent | null {
  return modalRegistry.get(key) || null;
}

// 개발용 폴백 모달 (등록되지 않은 모달에 대한 기본 처리)
const createFallbackModal = () => 
  lazy(() => Promise.resolve({ 
    default: ({ modalKey, ...props }: any) => (
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
        <h3>모달을 찾을 수 없습니다</h3>
        <p>Modal Key: {modalKey}</p>
        <p>registerModal('{modalKey}', YourModalComponent)로 등록해주세요</p>
        <details>
          <summary>전달된 Props</summary>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </details>
      </div>
    )
  }));

export const fallbackModal = createFallbackModal();