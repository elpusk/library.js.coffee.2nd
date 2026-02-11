# TgRom TypeScript Class

processig by Claude

C++ DLL로 작성된 ROM 파일 관리 기능을 프론트엔드에서 사용할 수 있도록 TypeScript로 변환한 클래스입니다.

## 주요 기능

- ROM 파일 헤더 로드 및 파싱
- 업데이트 가능한 펌웨어 아이템 검색
- 아이템 바이너리 데이터 읽기
- 새 ROM 파일 생성
- ROM 파일에 펌웨어 아이템 추가

## 파일 구조

```
TgRom.ts        - 메인 클래스 파일
examples.ts     - 사용 예제
README.md       - 이 문서
```

## 설치 및 사용

### 1. 프로젝트에 포함

```typescript
import { TgRom, TypeResult, MaskUpdateCondition } from './TgRom';
```

### 2. 인스턴스 생성

```typescript
const tgRom = new TgRom();
```

## API 문서

### Public Methods

#### tg_rom_load_header()

ROM 파일의 헤더를 로드합니다.

```typescript
async tg_rom_load_header(
    romFile: File | ArrayBuffer,
    pHeader: RomFileHead
): Promise<TypeResult>
```

**Parameters:**
- `romFile`: ROM 파일 (File 객체 또는 ArrayBuffer)
- `pHeader`: 헤더 정보를 저장할 객체

**Returns:**
- `TypeResult`: 작업 결과 (성공: RESULT_SUCCESS)

**Example:**
```typescript
const header: RomFileHead = {
    dwHeaderSize: 0,
    sFormatVersion: [],
    sRFU: new Uint8Array(0),
    dwItem: 0,
    Item: []
};

const result = await tgRom.tg_rom_load_header(romFile, header);
if (result === TypeResult.RESULT_SUCCESS) {
    console.log(`아이템 개수: ${header.dwItem}`);
}
```

---

#### tg_rom_get_updatable_item_index()

주어진 모델과 버전에 대해 업데이트 가능한 아이템을 검색합니다.

```typescript
tg_rom_get_updatable_item_index(
    pHeader: RomFileHead,
    sModel: string | Uint8Array,
    cMajor: number,
    cMinor: number,
    cBugFix: number,
    cBuild: number
): number
```

**Parameters:**
- `pHeader`: ROM 파일 헤더
- `sModel`: 디바이스 모델명
- `cMajor`: 현재 메이저 버전
- `cMinor`: 현재 마이너 버전
- `cBugFix`: 현재 버그픽스 버전
- `cBuild`: 현재 빌드 버전

**Returns:**
- `number`: 아이템 인덱스 (찾지 못하면 -1)

**Example:**
```typescript
const itemIndex = tgRom.tg_rom_get_updatable_item_index(
    header,
    'MY_DEVICE',
    1, 0, 0, 0  // 현재 버전: 1.0.0.0
);

if (itemIndex >= 0) {
    console.log(`업데이트 가능한 펌웨어 발견: 인덱스 ${itemIndex}`);
}
```

---

#### tg_rom_get_item()

특정 인덱스의 아이템 정보를 가져옵니다.

```typescript
tg_rom_get_item(
    pHeader: RomFileHead,
    nIndex: number,
    pItem: RomFileHeadItem
): TypeResult
```

**Parameters:**
- `pHeader`: ROM 파일 헤더
- `nIndex`: 아이템 인덱스 (0부터 시작)
- `pItem`: 아이템 정보를 저장할 객체

**Returns:**
- `TypeResult`: 작업 결과

**Example:**
```typescript
const item: RomFileHeadItem = {
    dwSize: 0,
    dwOffset: 0,
    sVersion: [],
    sModel: '',
    dwUpdateCondition: 0,
    sHash: new Uint8Array(32)
};

const result = tgRom.tg_rom_get_item(header, 0, item);
if (result === TypeResult.RESULT_SUCCESS) {
    console.log(`모델: ${item.sModel}, 버전: ${item.sVersion.join('.')}`);
}
```

---

#### tg_rom_readBinary_of_item()

아이템의 바이너리 데이터를 읽습니다.

```typescript
async tg_rom_readBinary_of_item(
    sRead: Uint8Array,
    dwRead: number,
    dwOffset: number,
    pItem: RomFileHeadItem,
    romFile: File | ArrayBuffer
): Promise<number>
```

**Parameters:**
- `sRead`: 읽은 데이터를 저장할 Uint8Array
- `dwRead`: 읽을 바이트 수
- `dwOffset`: 아이템 내에서의 읽기 시작 오프셋
- `pItem`: 아이템 정보
- `romFile`: ROM 파일

**Returns:**
- `number`: 실제로 읽은 바이트 수

**Example:**
```typescript
const buffer = new Uint8Array(4096);
const bytesRead = await tgRom.tg_rom_readBinary_of_item(
    buffer,
    4096,
    0,
    item,
    romFile
);

console.log(`${bytesRead} bytes 읽음`);
```

---

#### tg_rom_create_header()

새로운 ROM 파일 헤더를 생성합니다.

```typescript
tg_rom_create_header(): ArrayBuffer
```

**Returns:**
- `ArrayBuffer`: 생성된 ROM 파일 헤더

**Example:**
```typescript
const newRomBuffer = tgRom.tg_rom_create_header();

// Blob으로 변환하여 다운로드
const blob = new Blob([newRomBuffer]);
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'new_rom.rom';
a.click();
```

---

#### tg_rom_add_item()

ROM 파일에 새로운 펌웨어 아이템을 추가합니다.

```typescript
async tg_rom_add_item(
    romFile: ArrayBuffer,
    binFile: File | ArrayBuffer,
    cMajor: number,
    cMinor: number,
    cBugFix: number,
    cBuild: number,
    sModel: string,
    dwUpdateCondition: number
): Promise<{ result: TypeResult; data?: ArrayBuffer }>
```

**Parameters:**
- `romFile`: 기존 ROM 파일 (ArrayBuffer)
- `binFile`: 추가할 바이너리 파일
- `cMajor`: 메이저 버전
- `cMinor`: 마이너 버전
- `cBugFix`: 버그픽스 버전
- `cBuild`: 빌드 버전
- `sModel`: 디바이스 모델명 (최대 30자)
- `dwUpdateCondition`: 업데이트 조건 (MaskUpdateCondition)

**Returns:**
- `result`: 작업 결과
- `data`: 업데이트된 ROM 파일 (성공 시)

**Example:**
```typescript
const romBuffer = await romFile.arrayBuffer();

const result = await tgRom.tg_rom_add_item(
    romBuffer,
    binFile,
    1, 2, 0, 1,  // 버전 1.2.0.1
    'DEVICE_MODEL_V2',
    MaskUpdateCondition.CONDITION_GT | MaskUpdateCondition.CONDITION_EQ
);

if (result.result === TypeResult.RESULT_SUCCESS && result.data) {
    // 새 ROM 파일 다운로드
    const blob = new Blob([result.data]);
    const url = URL.createObjectURL(blob);
    // ... 다운로드 처리
}
```

## 타입 정의

### TypeResult (Enum)

작업 결과를 나타내는 열거형입니다.

```typescript
enum TypeResult {
    RESULT_SUCCESS = 0,                      // 성공
    RESULT_ERROR = 1,                        // 일반 오류
    RESULT_ERROR_NOT_FOUND = 2,             // 파일을 찾을 수 없음
    RESULT_ERROR_INVALID_PARAMETER = 3,     // 잘못된 파라미터
    RESULT_ERROR_SHORTER_THEN_EXPECTED = 4, // 예상보다 짧은 파일
    RESULT_ERROR_NOT_LOADED_DLL = 5,        // DLL 로드 실패
    RESULT_ERROR_NOT_OPEN_FILE = 6,         // 파일 열기 실패
    RESULT_ERROR_GREATER_THEN_EXPECTED = 7, // 예상보다 큰 파일
    RESULT_ERROR_OVER_CAPACITY = 8          // 용량 초과
}
```

### MaskUpdateCondition (Enum)

업데이트 조건을 나타내는 비트 마스크입니다.

```typescript
enum MaskUpdateCondition {
    CONDITION_NO = 0x00000000,   // 조건 없음
    CONDITION_EQ = 0x00000001,   // 같음
    CONDITION_NEQ = 0x00000002,  // 같지 않음
    CONDITION_GT = 0x00000004,   // 큼
    CONDITION_LT = 0x00000008    // 작음
}
```

**사용 예:**
```typescript
// 버전이 크거나 같으면 업데이트
const condition = MaskUpdateCondition.CONDITION_GT | MaskUpdateCondition.CONDITION_EQ;
```

### RomFileHeadItem (Interface)

ROM 파일 내 개별 펌웨어 아이템 정보입니다.

```typescript
interface RomFileHeadItem {
    dwSize: number;              // 펌웨어 데이터 크기
    dwOffset: number;            // 파일 내 시작 오프셋
    sVersion: number[];          // 버전 [major, minor, bugfix, build]
    sModel: string;              // 디바이스 모델명
    dwUpdateCondition: number;   // 업데이트 조건
    sHash: Uint8Array;           // SHA256 해시 (32 bytes)
}
```

### RomFileHead (Interface)

ROM 파일 헤더 정보입니다.

```typescript
interface RomFileHead {
    dwHeaderSize: number;         // 헤더 크기
    sFormatVersion: number[];     // 포맷 버전 [major, minor, bugfix, build]
    sRFU: Uint8Array;            // 예약 영역 (128 bytes)
    dwItem: number;              // 아이템 개수
    Item: RomFileHeadItem[];     // 아이템 배열 (최대 45개)
}
```

## 제약사항

- 최대 아이템 개수: 45개
- 최대 모델명 길이: 30자
- 최대 펌웨어 크기: 약 95MB (95,443,539 bytes)
- ROM 파일 포맷 버전: 1.1.0.0

## 주요 특징

### 1. 크로스 플랫폼 호환성
- C++ DLL의 Windows/Linux 의존성을 제거
- 순수 TypeScript로 구현되어 모든 브라우저에서 동작

### 2. 비동기 처리
- 파일 읽기/쓰기는 비동기(async/await) 방식
- 대용량 파일 처리 시 UI 블로킹 방지

### 3. SHA256 해시
- Web Crypto API를 사용한 SHA256 해시 계산
- C++ 구현과 동일한 XOR 처리 적용

### 4. 타입 안전성
- TypeScript의 타입 시스템 활용
- 인터페이스와 열거형으로 명확한 API 정의

## 브라우저 지원

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+

(Web Crypto API와 FileReader API 지원 필요)

## 예제

자세한 사용 예제는 `examples.ts` 파일을 참조하세요.

### 간단한 사용 예제

```typescript
import { TgRom, TypeResult, RomFileHead } from './TgRom';

async function processRomFile(file: File) {
    const tgRom = new TgRom();
    
    // 1. 헤더 로드
    const header: RomFileHead = {
        dwHeaderSize: 0,
        sFormatVersion: [],
        sRFU: new Uint8Array(0),
        dwItem: 0,
        Item: []
    };
    
    const result = await tgRom.tg_rom_load_header(file, header);
    
    if (result === TypeResult.RESULT_SUCCESS) {
        console.log(`ROM 파일 정보:`);
        console.log(`- 포맷 버전: ${header.sFormatVersion.join('.')}`);
        console.log(`- 아이템 개수: ${header.dwItem}`);
        
        // 2. 각 아이템 출력
        for (let i = 0; i < header.dwItem; i++) {
            const item = header.Item[i];
            console.log(`\n[${i}] ${item.sModel}`);
            console.log(`    버전: ${item.sVersion.join('.')}`);
            console.log(`    크기: ${item.dwSize} bytes`);
        }
        
        // 3. 업데이트 가능 여부 확인
        const updateIndex = tgRom.tg_rom_get_updatable_item_index(
            header,
            'MY_DEVICE',
            1, 0, 0, 0
        );
        
        if (updateIndex >= 0) {
            console.log(`\n업데이트 가능: ${header.Item[updateIndex].sModel}`);
        }
    }
}
```

## 라이센스

이 코드는 원본 C++ DLL의 기능을 TypeScript로 포팅한 것입니다.

## 참고사항

- 이 클래스는 프론트엔드(브라우저)에서 동작하도록 설계되었습니다
- Node.js 환경에서 사용하려면 일부 수정이 필요할 수 있습니다
- 대용량 파일 처리 시 메모리 사용량에 유의하세요

## 문제 해결

### Q: "파일을 읽을 수 없습니다" 오류
A: 파일이 올바른 ROM 파일 형식인지 확인하세요. 최소 헤더 크기를 충족해야 합니다.

### Q: "용량 초과" 오류
A: 펌웨어 크기가 약 95MB를 초과하는지 확인하세요.

### Q: 업데이트 가능한 아이템을 찾을 수 없음
A: 모델명이 정확히 일치하는지, 업데이트 조건이 올바른지 확인하세요.

## 추가 개발 예정

- [ ] 진행률 콜백 추가
- [ ] 청크 단위 대용량 파일 처리
- [ ] 검증 기능 강화
- [ ] Worker를 사용한 백그라운드 처리

## 변경 이력

### v1.0.0 (2025-02-12)
- 초기 릴리스
- C++ DLL 기능을 TypeScript로 완전 포팅
- dllmain.h의 모든 public 함수 구현