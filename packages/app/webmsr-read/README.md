# webmsr-read

마그네틱 카드 읽기 WebApp (TypeScript + React + pnpm + Vite)

## 개요

LPU237 장비로부터 마그네틱 카드(MSR) 데이터를 읽는 WebApp입니다.  
`@elpusk/lib` (coffee framework 2nd) 라이브러리를 사용합니다.

## 구조

```
webmsr-read/
├── index.html
├── index.tsx          # React 진입점
├── App.tsx            # 루트 컴포넌트
├── types.ts           # 타입 정의
├── handlers.ts        # 비즈니스 로직 (cf2 라이브러리 사용)
├── components/
│   ├── Header.tsx     # 상단 헤더 (서버/장비 상태 표시)
│   ├── Footer.tsx     # 하단 푸터
│   ├── ControlPanel.tsx  # 장비 연결 / 카드 읽기 제어
│   ├── CardHistory.tsx   # 읽은 카드 데이터 기록
│   └── LogPanel.tsx      # 로그 패널
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 실행

```bash
pnpm install
pnpm dev
```

## 동작 순서 (develop-msr-read-app.md 기준)

1. system event handler 설정
2. cf2 클라이언트 session 생성 (`wss://localhost:443`)
3. MSR device path 선택 (`hid#vid_134b&pid_0206&mi_01`, 끝이 `&msr`)
4. `lpu237` 객체 생성
5. `ctl_lpu237` 객체 생성
6. 장비 open (`open_with_promise`)
7. 기본 정보 읽기 (`load_basic_info_from_device_with_promise`)
8. 카드 읽기 대기 (`read_card_from_device_with_callback(true, ...)`)
9. 카드 읽기 취소 (`read_card_from_device_with_callback(false, ...)`)
10. 장비 close → disconnect
