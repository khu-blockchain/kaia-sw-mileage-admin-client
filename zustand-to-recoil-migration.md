# Zustand에서 Recoil로 마이그레이션 가이드

## 현재 Zustand Store 구조

현재 `src/shared/authorize/store.ts`에는 다음과 같은 Zustand store가 있습니다:

```typescript
interface State {
  accessToken: string | null;
}

interface Actions {
  actions: {
    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
    getAccessToken: () => string | null;
  };
}

export const useAuthStore = create<State & Actions>((set, get) => ({
  accessToken: null,
  actions: {
    setAccessToken: (token: string) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null }),
    getAccessToken: () => get().accessToken,
  },
}));
```

## Recoil로 마이그레이션

### 1. Recoil Atom 생성

`src/shared/authorize/store.ts`를 다음과 같이 변경:

```typescript
import { atom } from 'recoil';

export const accessTokenState = atom<string | null>({
  key: 'accessToken',
  default: null,
});
```

### 2. Recoil Selector 생성 (필요한 경우)

복잡한 로직이 필요하다면 selector 사용:

```typescript
import { atom, selector } from 'recoil';

export const accessTokenState = atom<string | null>({
  key: 'accessToken',
  default: null,
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticated',
  get: ({ get }) => {
    const token = get(accessTokenState);
    return token !== null;
  },
});
```

### 3. 커스텀 훅 생성

기존 Zustand의 actions와 유사한 인터페이스 제공:

```typescript
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState } from './store';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const actions = {
    setAccessToken: (token: string) => setAccessToken(token),
    clearAccessToken: () => setAccessToken(null),
    getAccessToken: () => accessToken,
  };

  return { accessToken, actions };
};
```

### 4. index.ts 업데이트

```typescript
export { accessTokenState, isAuthenticatedSelector } from './store';
export { useAuth } from './hooks';
```

## middleware.ts 변경사항

현재 `src/shared/api/middleware.ts`의 변경이 필요한 부분:

### 현재 코드:
```typescript
import { useAuthStore } from "../authorize";

function beforeRequest(request: Request) {
  const token = useAuthStore.getState().actions.getAccessToken();
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
}

async function afterResponse(request: Request, options: Options, response: Response) {
  if (response.status === 401) {
    try {
      const { data } = await authApi.refreshToken();
      const { access_token } = data;
      useAuthStore.getState().actions.setAccessToken(access_token.token);
      // ... 나머지 코드
    } catch (error) {
      useAuthStore.getState().actions.clearAccessToken();
      // ... 나머지 코드
    }
  }
  return response;
}
```

### Recoil로 변경된 코드:

Recoil은 React 컴포넌트 외부에서 직접 사용하기 어려우므로, 다음과 같은 접근이 필요합니다:

#### 방법 1: useRecoilCallback으로 직접 접근

`src/shared/api/middleware.ts`에서 `useRecoilCallback`을 사용해 직접 snapshot에 접근:

```typescript
import type { Options } from "ky";
import ky from "ky";
import { useRecoilCallback } from 'recoil';

import { accessTokenState } from "../authorize";
import { authApi } from "./auth";

// 글로벌 스냅샷 접근 함수들을 저장할 변수
let getTokenFromSnapshot: (() => string | null) | null = null;
let setTokenInState: ((token: string | null) => void) | null = null;

// React 컴포넌트에서 이 훅를 호출해서 스냅샷 접근 함수들 초기화
export function useInitializeAuth() {
  getTokenFromSnapshot = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(accessTokenState).contents;
  }, []);

  setTokenInState = useRecoilCallback(({ set }) => (token: string | null) => {
    set(accessTokenState, token);
  }, []);
}

function beforeRequest(request: Request) {
  const token = getTokenFromSnapshot?.();
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
}

async function afterResponse(request: Request, options: Options, response: Response) {
  if (response.status === 401) {
    try {
      const { data } = await authApi.refreshToken();
      const { access_token } = data;
      setTokenInState?.(access_token.token);
      if (access_token.token) {
        request.headers.set("Authorization", `Bearer ${access_token.token}`);
        return ky(request);
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
      setTokenInState?.(null);
      console.error("Token refresh failed:", error);
    }
  }
  return response;
}

export { beforeRequest, afterResponse };
```

그리고 앱의 어딘가에서 훅 호출:

```typescript
// App.tsx나 root 컴포넌트에서
import { useInitializeAuth } from './shared/api/middleware';

function App() {
  // 인증 스냅샷 접근 함수들 초기화
  useInitializeAuth();
  
  return (
    <RecoilRoot>
      {/* 앱 컴포넌트들 */}
    </RecoilRoot>
  );
}
```

#### 방법 2: 글로벌 스토어 패턴 유지

Recoil과 함께 간단한 글로벌 객체 사용:

```typescript
// src/shared/authorize/store.ts
import { atom } from 'recoil';

// Recoil atom
export const accessTokenState = atom<string | null>({
  key: 'accessToken',
  default: null,
});

// 글로벌 접근을 위한 객체
class AuthStore {
  private token: string | null = null;

  setAccessToken(token: string) {
    this.token = token;
  }

  clearAccessToken() {
    this.token = null;
  }

  getAccessToken() {
    return this.token;
  }
}

export const authStore = new AuthStore();
```

그리고 커스텀 훅에서 동기화:

```typescript
export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    authStore.setAccessToken(accessToken || '');
  }, [accessToken]);

  const actions = {
    setAccessToken: (token: string) => {
      setAccessToken(token);
      authStore.setAccessToken(token);
    },
    clearAccessToken: () => {
      setAccessToken(null);
      authStore.clearAccessToken();
    },
    getAccessToken: () => accessToken,
  };

  return { accessToken, actions };
};
```

## 권장사항

1. **방법 1 (recoil-nexus 사용)**이 더 깔끔하지만 추가 의존성이 필요
2. **방법 2 (글로벌 스토어 패턴)**은 기존 코드 변경을 최소화하면서 Recoil 도입 가능
3. 만약 middleware에서만 토큰을 사용한다면, Zustand를 유지하고 다른 부분만 Recoil로 마이그레이션하는 것도 고려

## 설치 필요 패키지

```bash
# Recoil 설치
npm install recoil
```

## RecoilRoot 설정

앱의 최상위에 RecoilRoot 추가:

```typescript
import { RecoilRoot } from 'recoil';
import { useInitializeAuth } from './shared/api/middleware';

function App() {
  // 인증 스냅샷 접근 함수들 초기화 (방법 1 사용하는 경우)
  useInitializeAuth();
  
  return (
    <RecoilRoot>
      {/* 앱 컴포넌트들 */}
    </RecoilRoot>
  );
}
```




