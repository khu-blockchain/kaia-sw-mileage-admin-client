# Kaia SW Mileage Admin Client

## 개요

경희대학교 SW 마일리지 관리자 웹 클라이언트. Kaia 블록체인(Kairos 테스트넷) 기반 마일리지 토큰 관리 시스템.

## Tech Stack

- React 19 + TypeScript 5.8 + Vite 7
- 상태: Zustand (auth), React Query (서버 상태)
- 폼: React Hook Form + Zod 4
- HTTP: Ky (fetch wrapper)
- UI: Radix UI + Tailwind CSS 4 + shadcn/ui
- 블록체인: @kaiachain/viem-ext + viem (Kairos 테스트넷, chainId: 1001)
- 패키지 매니저: pnpm

## 프로젝트 구조 (FSD)

```
src/
├── app/          # 엔트리, 프로바이더, 라우터, 가드, 레이아웃
├── pages/        # 12개 페이지 (dashboard, sign-in, manage-student 등)
├── widgets/      # page-boundary, page-layout
├── features/     # kaia (블록체인 훅, 컨트랙트, UI)
├── entities/     # mileage, student, mileage-token 등 (쿼리, 파서)
└── shared/       # api, authorize, config, lib, ui, assets
```

## 주요 스크립트

```bash
pnpm dev          # 개발 서버
pnpm build        # tsc + vite build
pnpm lint         # ESLint
```

## Import 별칭

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`, `@` → `src/`

FSD 레이어 규칙: 상위 레이어만 하위 레이어를 import 가능 (Steiger로 검증)

## API 구조

- `shared/api/client.ts`: `apiClient` (비인증), `authClient` (토큰 주입 + 401 리프레시)
- `shared/api/route.ts`: baseURL → `http://khunggum.khu.ac.kr:8080/api/v1/`
- `shared/api/middleware.ts`: beforeRequest(토큰 주입), afterResponse(401 → 리프레시 → 재시도)
- 각 도메인별 모듈: `api.ts`(HTTP), `types.ts`(응답 타입), `dto.ts`(요청/응답 DTO)
- Entity 레이어에서 React Query 통합: `entities/*/api/queries.ts`

## 인증 흐름

1. `POST /auth/login/admin` → access_token 반환
2. Zustand `useAuthStore`에 토큰 저장
3. `authClient` middleware가 매 요청에 Bearer 토큰 주입
4. 401 → `authApi.refreshToken()` → 토큰 갱신 → 실패 시 `/sign-in` 리다이렉트

### 가드

- `InitGuard`: Kaia 지갑 설치 + Kairos 네트워크 연결 확인
- `AuthGuard`: Suspense + ErrorBoundary로 토큰 리프레시

## 블록체인 통합 (features/kaia)

### 훅 체인

```
useKaiaWallet()    → window.klaytn 감지, 네트워크 전환
useKaiaAccount()   → 현재 계정 추적, accountsChanged 리스닝
useKaiaClient()    → publicClient(읽기), walletClient(쓰기) 생성
useKaiaContract()  → call(읽기), encodeAbi(인코딩), requestSignTransaction(서명)
```

### 컨트랙트

- StudentManager: `VITE_STUDENT_MANAGER_CONTRACT_ADDRESS`
- SwMileageToken: ABI만 config에 정의
- 트랜잭션: FeeDelegatedSmartContractExecution (수수료 위임)

## 환경 변수

```
VITE_STUDENT_MANAGER_CONTRACT_ADDRESS=0x...
VITE_NETWORK_RPC_URL=<Kairos RPC>
```

`import.meta.env.VITE_*`로 접근

## 코드 컨벤션

- 페이지: `PascalCase.page.tsx`
- 훅: `use*` prefix
- API: 도메인별 모듈 (api.ts, types.ts, dto.ts, queries.ts)
- ESLint: `no-explicit-any` off, `no-unused-vars` off
- Prettier: useTabs, trailing commas all, double quotes
- Import 정렬: types → React → third-party → FSD 레이어 순

## 테스트

테스트 프레임워크 미설정
