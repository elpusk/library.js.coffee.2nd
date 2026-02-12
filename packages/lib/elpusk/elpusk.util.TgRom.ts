/**
 * TgRom - ROM 파일 관리 TypeScript 클래스
 * C++ DLL의 기능을 프론트엔드에서 사용 가능하도록 변환
 */

// 상수 정의
const MAX_ROMFILE_HEAD_ITEAM = 45;
const MAX_MODEL_NAME_SIZE = 30;
const MAX_RFU_SIZE = 128;
const MAX_SIZE_APP = 95443539; // version 1.1

// 타입 정의
export enum TypeResult {
    RESULT_SUCCESS = 0,
    RESULT_ERROR = 1,
    RESULT_ERROR_NOT_FOUND = 2,
    RESULT_ERROR_INVALID_PARAMETER = 3,
    RESULT_ERROR_SHORTER_THEN_EXPECTED = 4,
    RESULT_ERROR_NOT_LOADED_DLL = 5,
    RESULT_ERROR_NOT_OPEN_FILE = 6,
    RESULT_ERROR_GREATER_THEN_EXPECTED = 7,
    RESULT_ERROR_OVER_CAPACITY = 8
}

export enum MaskUpdateCondition {
    CONDITION_NO = 0x00000000,
    CONDITION_EQ = 0x00000001,  // equal
    CONDITION_NEQ = 0x00000002, // not equal
    CONDITION_GT = 0x00000004,  // greater than
    CONDITION_LT = 0x00000008   // less than
}

// ROM 파일 헤더 아이템 인터페이스
export interface RomFileHeadItem {
    dwSize: number;              // 펌웨어 데이터 크기
    dwOffset: number;            // 펌웨어 데이터 시작 오프셋
    sVersion: number[];          // 버전 [major, minor, bugfix, build]
    sModel: string;              // 디바이스 모델명
    dwUpdateCondition: number;   // 업데이트 조건
    sHash: Uint8Array;           // SHA256 해시 (32 bytes)
}

// ROM 파일 헤더 인터페이스
export interface RomFileHead {
    dwHeaderSize: number;         // 헤더 크기
    sFormatVersion: number[];     // 포맷 버전 [major, minor, bugfix, build]
    sRFU: Uint8Array;            // 예약 영역 (128 bytes)
    dwItem: number;              // 아이템 개수
    Item: RomFileHeadItem[];     // 아이템 배열
}

/**
 * TgRom 클래스
 * ROM 파일을 로드, 생성, 수정하는 기능을 제공
 */
export class TgRom {
    private romFileBuffer: ArrayBuffer | null = null;
    private header: RomFileHead | null = null;

    constructor() {
        this.header = null;
        this.romFileBuffer = null;
    }

    /**
     * ROM 파일 헤더 로드
     * @param romFile - ROM 파일 (File 또는 ArrayBuffer)
     * @param pHeader - 헤더를 저장할 객체
     * @returns TypeResult
     */
    public async tg_rom_load_header(
        romFile: File | ArrayBuffer,
        pHeader: RomFileHead
    ): Promise<TypeResult> {
        try {
            // 파일을 ArrayBuffer로 변환
            let buffer: ArrayBuffer;
            if (romFile instanceof File) {
                buffer = await this.readFileAsArrayBuffer(romFile);
            } else {
                buffer = romFile;
            }

            this.romFileBuffer = buffer;

            // 헤더 크기 검증
            const headerSize = 4 + 4 + MAX_RFU_SIZE + 4 + 
                              (MAX_ROMFILE_HEAD_ITEAM * this.getItemSize());
            
            if (buffer.byteLength < headerSize) {
                return TypeResult.RESULT_ERROR_SHORTER_THEN_EXPECTED;
            }

            // 헤더 파싱
            const dataView = new DataView(buffer);
            let offset = 0;

            // dwHeaderSize
            pHeader.dwHeaderSize = dataView.getUint32(offset, true);
            offset += 4;

            // sFormatVersion
            pHeader.sFormatVersion = [
                dataView.getUint8(offset++),
                dataView.getUint8(offset++),
                dataView.getUint8(offset++),
                dataView.getUint8(offset++)
            ];

            // sRFU
            pHeader.sRFU = new Uint8Array(buffer, offset, MAX_RFU_SIZE);
            offset += MAX_RFU_SIZE;

            // dwItem
            pHeader.dwItem = dataView.getUint32(offset, true);
            offset += 4;

            // Items
            pHeader.Item = [];
            for (let i = 0; i < MAX_ROMFILE_HEAD_ITEAM; i++) {
                const item = this.parseItem(buffer, offset);
                pHeader.Item.push(item);
                offset += this.getItemSize();
            }

            this.header = pHeader;
            return TypeResult.RESULT_SUCCESS;

        } catch (error) {
            console.error('Error loading header:', error);
            return TypeResult.RESULT_ERROR;
        }
    }

    /**
     * 업데이트 가능한 아이템 인덱스 검색
     * @param pHeader - ROM 파일 헤더
     * @param sModel - 모델명 (문자열 또는 Uint8Array)
     * @param cMajor - 메이저 버전
     * @param cMinor - 마이너 버전
     * @param cBugFix - 버그픽스 버전
     * @param cBuild - 빌드 버전
     * @returns 아이템 인덱스 (찾지 못하면 -1)
     */
    public tg_rom_get_updatable_item_index(
        pHeader: RomFileHead,
        sModel: string | Uint8Array,
        cMajor: number,
        cMinor: number,
        cBugFix: number,
        cBuild: number
    ): number {
        if (!pHeader || !sModel) {
            return -1;
        }

        if (pHeader.dwItem === 0 || pHeader.dwItem > MAX_ROMFILE_HEAD_ITEAM) {
            return -1;
        }

        const modelStr = typeof sModel === 'string' ? sModel : 
                        new TextDecoder().decode(sModel);

        // 모델명 검색
        let nIndex = -1;
        for (let i = 0; i < pHeader.dwItem; i++) {
            if (pHeader.Item[i].sModel === modelStr) {
                nIndex = i;
                break;
            }
        }

        if (nIndex === -1) {
            return -1;
        }

        // 업데이트 조건 확인
        const item = pHeader.Item[nIndex];
        const dwCondition = item.dwUpdateCondition;
        let bConditionOK = false;

        // 메이저 버전 비교
        if (item.sVersion[0] > cMajor) {
            if ((dwCondition & MaskUpdateCondition.CONDITION_GT) ||
                (dwCondition & MaskUpdateCondition.CONDITION_NEQ)) {
                bConditionOK = true;
            }
        } else if (item.sVersion[0] < cMajor) {
            if ((dwCondition & MaskUpdateCondition.CONDITION_LT) ||
                (dwCondition & MaskUpdateCondition.CONDITION_NEQ)) {
                bConditionOK = true;
            }
        } else {
            // 메이저 버전이 같을 때
            if (dwCondition & MaskUpdateCondition.CONDITION_EQ) {
                if (item.sVersion[1] === cMinor &&
                    item.sVersion[2] === cBugFix &&
                    item.sVersion[3] === cBuild) {
                    bConditionOK = true;
                }
            }
        }

        // 마이너/버그픽스/빌드 버전 비교
        const sRomVer = [item.sVersion[1], item.sVersion[2], item.sVersion[3]];
        const sGivenVer = [cMinor, cBugFix, cBuild];
        
        let nVer = 0;
        while (!bConditionOK && nVer < 3) {
            if (sRomVer[nVer] > sGivenVer[nVer]) {
                if ((dwCondition & MaskUpdateCondition.CONDITION_GT) ||
                    (dwCondition & MaskUpdateCondition.CONDITION_NEQ)) {
                    bConditionOK = true;
                }
            } else if (sRomVer[nVer] < sGivenVer[nVer]) {
                if ((dwCondition & MaskUpdateCondition.CONDITION_LT) ||
                    (dwCondition & MaskUpdateCondition.CONDITION_NEQ)) {
                    bConditionOK = true;
                }
            }
            nVer++;
        }

        return bConditionOK ? nIndex : -1;
    }

    /**
     * 특정 인덱스의 아이템 정보 가져오기
     * @param pHeader - ROM 파일 헤더
     * @param nIndex - 아이템 인덱스
     * @param pItem - 아이템을 저장할 객체
     * @returns TypeResult
     */
    public tg_rom_get_item(
        pHeader: RomFileHead,
        nIndex: number,
        pItem: RomFileHeadItem
    ): TypeResult {
        if (!pHeader || nIndex < 0 || 
            nIndex >= MAX_ROMFILE_HEAD_ITEAM || !pItem) {
            return TypeResult.RESULT_ERROR_INVALID_PARAMETER;
        }

        if (nIndex >= pHeader.dwItem) {
            return TypeResult.RESULT_ERROR_INVALID_PARAMETER;
        }

        // 아이템 복사
        Object.assign(pItem, pHeader.Item[nIndex]);

        return TypeResult.RESULT_SUCCESS;
    }

    /**
     * 아이템의 바이너리 데이터 읽기
     * @param sRead - 읽은 데이터를 저장할 배열
     * @param dwRead - 읽을 크기
     * @param dwOffset - 읽기 시작 오프셋
     * @param pItem - 아이템 정보
     * @param romFile - ROM 파일 (File 또는 ArrayBuffer)
     * @returns 실제로 읽은 바이트 수
     */
    public async tg_rom_readBinary_of_item(
        sRead: Uint8Array,
        dwRead: number,
        dwOffset: number,
        pItem: RomFileHeadItem,
        romFile: File | ArrayBuffer
    ): Promise<number> {
        if (!pItem || !romFile || !sRead || dwRead === 0) {
            return 0;
        }

        try {
            // 파일을 ArrayBuffer로 변환
            let buffer: ArrayBuffer;
            if (romFile instanceof File) {
                buffer = await this.readFileAsArrayBuffer(romFile);
            } else {
                buffer = romFile;
            }

            // 읽을 위치 계산
            const startPos = pItem.dwOffset + dwOffset;
            const endPos = Math.min(startPos + dwRead, buffer.byteLength);
            const actualRead = endPos - startPos;

            if (actualRead <= 0) {
                return 0;
            }

            // 데이터 복사
            const sourceData = new Uint8Array(buffer, startPos, actualRead);
            sRead.set(sourceData);

            return actualRead;

        } catch (error) {
            console.error('Error reading binary:', error);
            return 0;
        }
    }

    /**
     * 새로운 ROM 파일 헤더 생성
     * @returns 생성된 헤더의 ArrayBuffer
     */
    public tg_rom_create_header(): ArrayBuffer {
        const headerSize = 4 + 4 + MAX_RFU_SIZE + 4 + 
                          (MAX_ROMFILE_HEAD_ITEAM * this.getItemSize());
        
        const buffer = new ArrayBuffer(headerSize);
        const dataView = new DataView(buffer);
        let offset = 0;

        // dwHeaderSize
        dataView.setUint32(offset, headerSize, true);
        offset += 4;

        // sFormatVersion [1, 1, 0, 0]
        dataView.setUint8(offset++, 1);
        dataView.setUint8(offset++, 1);
        dataView.setUint8(offset++, 0);
        dataView.setUint8(offset++, 0);

        // sRFU (128 bytes) - 0으로 초기화
        offset += MAX_RFU_SIZE;

        // dwItem
        dataView.setUint32(offset, 0, true);
        offset += 4;

        // Items - 0으로 초기화 (이미 ArrayBuffer가 0으로 초기화됨)

        this.romFileBuffer = buffer;

        return buffer;
    }

    /**
     * ROM 파일에 아이템 추가
     * @param romFile - 기존 ROM 파일 (ArrayBuffer)
     * @param binFile - 추가할 바이너리 파일 (File 또는 ArrayBuffer)
     * @param cMajor - 메이저 버전
     * @param cMinor - 마이너 버전
     * @param cBugFix - 버그픽스 버전
     * @param cBuild - 빌드 버전
     * @param sModel - 모델명
     * @param dwUpdateCondition - 업데이트 조건
     * @returns 새로운 ROM 파일의 ArrayBuffer와 결과
     */
    public async tg_rom_add_item(
        romFile: ArrayBuffer,
        binFile: File | ArrayBuffer,
        cMajor: number,
        cMinor: number,
        cBugFix: number,
        cBuild: number,
        sModel: string,
        dwUpdateCondition: number
    ): Promise<{ result: TypeResult; data?: ArrayBuffer }> {
        try {
            // 헤더 로드
            const header: RomFileHead = {
                dwHeaderSize: 0,
                sFormatVersion: [],
                sRFU: new Uint8Array(0),
                dwItem: 0,
                Item: []
            };

            const loadResult = await this.tg_rom_load_header(romFile, header);
            if (loadResult !== TypeResult.RESULT_SUCCESS) {
                return { result: loadResult };
            }

            // 용량 체크
            if (header.dwItem >= MAX_ROMFILE_HEAD_ITEAM) {
                return { result: TypeResult.RESULT_ERROR_OVER_CAPACITY };
            }

            // 바이너리 파일 로드
            let binBuffer: ArrayBuffer;
            if (binFile instanceof File) {
                binBuffer = await this.readFileAsArrayBuffer(binFile);
            } else {
                binBuffer = binFile;
            }

            if (binBuffer.byteLength > MAX_SIZE_APP) {
                return { result: TypeResult.RESULT_ERROR_GREATER_THEN_EXPECTED };
            }

            // 모델명 길이 체크
            if (sModel.length > MAX_MODEL_NAME_SIZE) {
                return { result: TypeResult.RESULT_ERROR_GREATER_THEN_EXPECTED };
            }

            // 새로운 아이템 생성
            const newItem: RomFileHeadItem = {
                dwSize: binBuffer.byteLength,
                dwOffset: romFile.byteLength,
                sVersion: [cMajor, cMinor, cBugFix, cBuild],
                sModel: sModel,
                dwUpdateCondition: dwUpdateCondition,
                sHash: new Uint8Array(32)
            };

            // SHA256 해시 계산 (첫 번째 블록은 XOR 처리)
            const hash = await this.calculateSHA256WithXOR(binBuffer);
            newItem.sHash = hash;

            // 새로운 ROM 파일 생성
            header.Item[header.dwItem] = newItem;
            header.dwItem++;

            // 헤더 + 기존 데이터 + 새 바이너리 결합
            const newRomSize = romFile.byteLength + binBuffer.byteLength;
            const newRomBuffer = new ArrayBuffer(newRomSize);
            const newRomView = new Uint8Array(newRomBuffer);

            // 기존 ROM 파일 복사
            newRomView.set(new Uint8Array(romFile));

            // 새 바이너리 추가
            newRomView.set(new Uint8Array(binBuffer), romFile.byteLength);

            // 헤더 업데이트
            this.updateHeader(newRomBuffer, header);

            return {
                result: TypeResult.RESULT_SUCCESS,
                data: newRomBuffer
            };

        } catch (error) {
            console.error('Error adding item:', error);
            return { result: TypeResult.RESULT_ERROR };
        }
    }

    // ========== Private Helper Methods ==========

    /**
     * File 객체를 ArrayBuffer로 변환
     */
    private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 아이템 크기 계산
     */
    private getItemSize(): number {
        return 4 + 4 + 4 + (MAX_MODEL_NAME_SIZE + 1) + 4 + 128;
    }

    /**
     * ArrayBuffer에서 아이템 파싱
     */
    private parseItem(buffer: ArrayBuffer, offset: number): RomFileHeadItem {
        const dataView = new DataView(buffer);
        let pos = offset;

        const item: RomFileHeadItem = {
            dwSize: dataView.getUint32(pos, true),
            dwOffset: dataView.getUint32(pos + 4, true),
            sVersion: [
                dataView.getUint8(pos + 8),
                dataView.getUint8(pos + 9),
                dataView.getUint8(pos + 10),
                dataView.getUint8(pos + 11)
            ],
            sModel: '',
            dwUpdateCondition: dataView.getUint32(pos + 12 + MAX_MODEL_NAME_SIZE + 1, true),
            sHash: new Uint8Array(buffer, pos + 12 + MAX_MODEL_NAME_SIZE + 1 + 4, 32)
        };

        // 모델명 파싱
        const modelBytes = new Uint8Array(buffer, pos + 12, MAX_MODEL_NAME_SIZE + 1);
        const nullIndex = modelBytes.indexOf(0);
        const modelData = nullIndex >= 0 ? modelBytes.slice(0, nullIndex) : modelBytes;
        item.sModel = new TextDecoder().decode(modelData);

        return item;
    }

    /**
     * SHA256 해시 계산 (첫 번째 블록 XOR 처리 포함)
     */
    private async calculateSHA256WithXOR(buffer: ArrayBuffer): Promise<Uint8Array> {
        // 첫 번째 4KB 블록 XOR 처리
        const BUF_LEN = 4 * 1024;
        const data = new Uint8Array(buffer);
        const processedData = new Uint8Array(data);

        if (data.length > 0) {
            const firstBlockLen = Math.min(BUF_LEN, data.length);
            for (let j = 0; j < firstBlockLen; j++) {
                if (j % 2 === 0) {
                    processedData[j] = data[j] ^ 0xC0;
                } else {
                    processedData[j] = data[j] ^ 0xFF;
                }
            }
        }

        // SHA256 해시 계산
        const hashBuffer = await crypto.subtle.digest('SHA-256', processedData);
        return new Uint8Array(hashBuffer);
    }

    /**
     * 버퍼에 헤더 업데이트
     */
    private updateHeader(buffer: ArrayBuffer, header: RomFileHead): void {
        const dataView = new DataView(buffer);
        let offset = 0;

        // dwHeaderSize
        dataView.setUint32(offset, header.dwHeaderSize, true);
        offset += 4;

        // sFormatVersion
        dataView.setUint8(offset++, header.sFormatVersion[0]);
        dataView.setUint8(offset++, header.sFormatVersion[1]);
        dataView.setUint8(offset++, header.sFormatVersion[2]);
        dataView.setUint8(offset++, header.sFormatVersion[3]);

        // sRFU
        offset += MAX_RFU_SIZE;

        // dwItem
        dataView.setUint32(offset, header.dwItem, true);
        offset += 4;

        // Items
        for (let i = 0; i < header.dwItem; i++) {
            this.writeItem(buffer, offset, header.Item[i]);
            offset += this.getItemSize();
        }
    }

    /**
     * 버퍼에 아이템 쓰기
     */
    private writeItem(buffer: ArrayBuffer, offset: number, item: RomFileHeadItem): void {
        const dataView = new DataView(buffer);
        const uint8View = new Uint8Array(buffer);
        let pos = offset;

        // dwSize
        dataView.setUint32(pos, item.dwSize, true);
        pos += 4;

        // dwOffset
        dataView.setUint32(pos, item.dwOffset, true);
        pos += 4;

        // sVersion
        dataView.setUint8(pos++, item.sVersion[0]);
        dataView.setUint8(pos++, item.sVersion[1]);
        dataView.setUint8(pos++, item.sVersion[2]);
        dataView.setUint8(pos++, item.sVersion[3]);

        // sModel
        const encoder = new TextEncoder();
        const modelBytes = encoder.encode(item.sModel);
        uint8View.set(modelBytes, pos);
        pos += MAX_MODEL_NAME_SIZE + 1;

        // dwUpdateCondition
        dataView.setUint32(pos, item.dwUpdateCondition, true);
        pos += 4;

        // sHash
        uint8View.set(item.sHash, pos);
    }
}