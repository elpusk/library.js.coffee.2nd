/**
 * CPP_SYSINFO 구조체 관리 클래스
 * - CPP_SYSINFO 읽기/쓰기 명령 생성
 * - CPP_MSR_RX_PACKET 응답 파싱
 * - CPP_SYSINFO 구조체 변환
 */

/**
 * CPP_MSR_RX_PACKET 구조체 정의
 */
export interface CPP_MSR_RX_PACKET {
  cPreFix: number;      // 'R' (0x52)
  cResult: number;      // 0xFF = 정상, 그 외 = 에러
  cLen: number;         // sData의 유효 데이터 길이
  sData: number[];      // 실제 데이터 (최대 217바이트)
}

/**
 * CPP_SYSINFO 구조체 인터페이스
 */
export interface CPP_SYSINFO {//953
  cBlank: number[];                          // 4 bytes
  dwSize: number;                            // 4 bytes
  sStrucVer: number[];                       // 4 bytes
  sName: string;                             // 16 bytes
  sSysVer: number[];                         // 4 bytes
  ModeBL: number;                            // 1 byte
  ModeAP: number;                            // 1 byte
  sSN: number[];                             // 8 bytes
  Interface: number;                         // 1 byte
  nBuzzerFrequency: number;                  // 4 bytes
  nNormalWDT: number;                        // 4 bytes
  nBootRunTime: number;                      // 4 bytes
  Uart: CPP_UARTINFO;                            // 8 bytes --- 63
  ContainerInfoMsrObj: CPP_CONTAINER_INFO_MSR_OBJ; // 108 bytes.  
  InfoMsr: CPP_INFO_MSR_OBJ[];                   // 561 bytes (187 * 3).  187*3=561
  InfoIButton: CPP_INFO_PRE_POST_OBJ;            // 60 bytes
  InfoUart: CPP_INFO_PRE_POST_OBJ;               // 60 bytes
  RemoveItemTag: CPP_REMOVE_IBUTTON_TAG;         // 41 bytes
  InfoIButtonRemove: CPP_INFO_PRE_POST_OBJ;      // 60 bytes
}

export interface CPP_UARTINFO {
  nCom: number;      // 4 bytes
  nBaud: number;     // 4 bytes
}

export interface CPP_MSR_TAG {
  cSize: number;     // 1 byte
  sTag: number[];    // 14 bytes
}

export interface CPP_INFO_PRE_POST_OBJ {//60
  TagPre: CPP_MSR_TAG;          // 15 bytes
  TagPost: CPP_MSR_TAG;         // 15 bytes
  GlobalPrefix: CPP_MSR_TAG;    // 15 bytes
  GlobalPostfix: CPP_MSR_TAG;   // 15 bytes
}

export interface CPP_REMOVE_IBUTTON_TAG {
  cSize: number;     // 1 byte
  sTag: number[];    // 40 bytes
}

export interface CPP_MSR_MAP_TABLE {
  nMappingTableIndex: number;  // 4 bytes
  nNumMapTableItem: number;    // 4 bytes
}

export interface CPP_INFO_MSR_OBJ {//187 bytes
  cEnableTrack: number;          // 1 byte
  cSupportNum: number;           // 1 byte
  cActiveCombination: number;    // 1 byte
  cMaxSize: number[];            // 3 bytes
  cBitSize: number[];            // 3 bytes
  cDataMask: number[];           // 3 bytes
  bUseParity: number[];          // 3 bytes
  cParityType: number[];         // 3 bytes
  cSTX_L: number[];              // 3 bytes
  cETX_L: number[];              // 3 bytes
  bUseErrorCorrect: number[];    // 3 bytes
  cECMType: number[];            // 3 bytes
  cRDirect: number[];            // 3 bytes
  nBufSize: number;              // 4 bytes
  cAddValue: number[];           // 3 bytes
  bEnableEncryption: number;     // 1 byte
  sMasterKey: number[];          // 16 bytes
  sChangeKey: number[];          // 16 bytes
  PrivatePrefix: CPP_MSR_TAG[];      // 45 bytes (15 * 3)
  PrivatePostfix: CPP_MSR_TAG[];     // 45 bytes (15 * 3)
  KeyMap: CPP_MSR_MAP_TABLE[];       // 24 bytes (8 * 3)
}

export interface CPP_CONTAINER_INFO_MSR_OBJ {//108 bytes
  pInfoMsrObj: number[];         // 12 bytes (4 * 3) - 포인터는 주소값만 저장
  nCpdSysTickMin: number;        // 4 bytes
  nCpdSysTickMax: number;        // 4 bytes
  nGlobalTagCondition: number;   // 4 bytes
  nNumItem: number;              // 4 bytes
  nOrderObject: number[];        // 12 bytes (4 * 3)
  KeyMap: CPP_MSR_MAP_TABLE;         // 8 bytes
  TagPre: CPP_MSR_TAG;               // 15 bytes
  TagPost: CPP_MSR_TAG;              // 15 bytes
  GlobalPrefix: CPP_MSR_TAG;         // 15 bytes
  GlobalPostfix: CPP_MSR_TAG;        // 15 bytes
}

/**
 * CPP_SYSINFO 관리 클래스
 */
export class Lpu237SysInfoManager {
  // 상수
  public static readonly SYSINFO_SIZE = 953;
  public static readonly SYSINFO_OFFSET = 0;
  public static readonly MAX_GET_SIZE = 217;
  public static readonly MAX_SET_SIZE = 53;
  public static readonly RX_PACKET_SIZE = 220;
  public static readonly PREFIX_R = 0x52;
  public static readonly RESULT_OK = 0xFF;

  /**
   * 기존 명령 생성 함수들 (외부에서 주입)
   */
  private _generate_config_get: (
    queue_s_tx: string[],
    n_offset: number,
    n_size: number
  ) => boolean;

  private _generate_config_set: (
    queue_s_tx: string[],
    n_offset: number,
    n_size: number,
    s_setting_data: string
  ) => boolean;

  /**
   * 생성자
   */
  constructor(
    generate_config_get: (queue_s_tx: string[], n_offset: number, n_size: number) => boolean,
    generate_config_set: (queue_s_tx: string[], n_offset: number, n_size: number, s_setting_data: string) => boolean
  ) {
    this._generate_config_get = generate_config_get;
    this._generate_config_set = generate_config_set;
  }

  /**
   * CPP_SYSINFO 구조체 전체를 읽는 명령들을 생성
   */
  public generateReadCommands(queue_s_tx: string[]): boolean {
    try {
      let offset = Lpu237SysInfoManager.SYSINFO_OFFSET;
      let remaining_size = Lpu237SysInfoManager.SYSINFO_SIZE;

      while (remaining_size > 0) {
        const read_size = Math.min(remaining_size, Lpu237SysInfoManager.MAX_GET_SIZE);
        
        const success = this._generate_config_get(queue_s_tx, offset, read_size);
        if (!success) {
          console.error(`Failed to generate get command at offset ${offset}`);
          return false;
        }

        offset += read_size;
        remaining_size -= read_size;
      }

      console.log(`Successfully generated ${queue_s_tx.length} read commands for CPP_SYSINFO (${Lpu237SysInfoManager.SYSINFO_SIZE} bytes)`);
      return true;
    } catch (error) {
      console.error('Error generating read CPP_SYSINFO commands:', error);
      return false;
    }
  }

  /**
   * CPP_SYSINFO 구조체 전체를 쓰는 명령들을 생성
   */
  public generateWriteCommands(queue_s_tx: string[], s_sysinfo_data: string): boolean {
    try {
      const expected_length = Lpu237SysInfoManager.SYSINFO_SIZE * 2;
      if (s_sysinfo_data.length !== expected_length) {
        console.error(
          `Invalid CPP_SYSINFO data length: expected ${expected_length}, got ${s_sysinfo_data.length}`
        );
        return false;
      }

      let offset = Lpu237SysInfoManager.SYSINFO_OFFSET;
      let data_offset = 0;
      let remaining_size = Lpu237SysInfoManager.SYSINFO_SIZE;

      while (remaining_size > 0) {
        const write_size = Math.min(remaining_size, Lpu237SysInfoManager.MAX_SET_SIZE);
        const data_length = write_size * 2;

        const chunk_data = s_sysinfo_data.substring(
          data_offset,
          data_offset + data_length
        );

        const success = this._generate_config_set(
          queue_s_tx,
          offset,
          write_size,
          chunk_data
        );

        if (!success) {
          console.error(`Failed to generate set command at offset ${offset}`);
          return false;
        }

        offset += write_size;
        data_offset += data_length;
        remaining_size -= write_size;
      }

      console.log(`Successfully generated ${queue_s_tx.length} write commands for CPP_SYSINFO (${Lpu237SysInfoManager.SYSINFO_SIZE} bytes)`);
      return true;
    } catch (error) {
      console.error('Error generating write CPP_SYSINFO commands:', error);
      return false;
    }
  }

  /**
   * 16진수 문자열로부터 CPP_MSR_RX_PACKET 파싱
   */
  private parseRxPacket(s_response: string): CPP_MSR_RX_PACKET | null {
    try {
      const expected_length = Lpu237SysInfoManager.RX_PACKET_SIZE * 2;
      if (s_response.length !== expected_length) {
        console.error(`Invalid response length: expected ${expected_length}, got ${s_response.length}`);
        return null;
      }

      const cPreFix = parseInt(s_response.substring(0, 2), 16);
      const cResult = parseInt(s_response.substring(2, 4), 16);
      const cLen = parseInt(s_response.substring(4, 6), 16);

      if (cPreFix !== Lpu237SysInfoManager.PREFIX_R) {
        console.error(`Invalid prefix: expected 0x52, got 0x${cPreFix.toString(16)}`);
        return null;
      }

      if (cResult !== Lpu237SysInfoManager.RESULT_OK) {
        console.error(`Command failed with error code: 0x${cResult.toString(16)}`);
        return null;
      }

      const sData: number[] = [];
      for (let i = 0; i < cLen; i++) {
        const offset = 6 + (i * 2);
        sData.push(parseInt(s_response.substring(offset, offset + 2), 16));
      }

      return { cPreFix, cResult, cLen, sData };
    } catch (error) {
      console.error('Error parsing RX packet:', error);
      return null;
    }
  }

  /**
   * 여러 CPP_MSR_RX_PACKET 응답들을 병합하여 완전한 바이트 배열 생성
   */
  private mergeResponses(responses: string[]): number[] | null {
    try {
      const merged_data: number[] = [];

      for (let i = 0; i < responses.length; i++) {
        const packet = this.parseRxPacket(responses[i]);
        
        if (!packet) {
          console.error(`Failed to parse response ${i + 1}/${responses.length}`);
          return null;
        }

        merged_data.push(...packet.sData);
        console.log(`Merged packet ${i + 1}/${responses.length}: ${packet.cLen} bytes`);
      }

      console.log(`Total merged data size: ${merged_data.length} bytes`);

      if (merged_data.length !== Lpu237SysInfoManager.SYSINFO_SIZE) {
        console.warn(`Warning: Expected ${Lpu237SysInfoManager.SYSINFO_SIZE} bytes, got ${merged_data.length} bytes`);
      }

      return merged_data;
    } catch (error) {
      console.error('Error merging responses:', error);
      return null;
    }
  }

  /**
   * 바이트 배열에서 little-endian 4바이트 unsigned int 읽기
   */
  private readUint32LE(data: number[], offset: number): number {
    return (
      data[offset] |
      (data[offset + 1] << 8) |
      (data[offset + 2] << 16) |
      (data[offset + 3] << 24)
    ) >>> 0;
  }

  /**
   * 바이트 배열에서 지정된 길이만큼 읽기
   */
  private readBytes(data: number[], offset: number, length: number): number[] {
    return data.slice(offset, offset + length);
  }

  /**
   * 바이트 배열에서 문자열 읽기 (null-terminated)
   */
  private readString(data: number[], offset: number, max_length: number): string {
    const bytes = data.slice(offset, offset + max_length);
    const null_index = bytes.indexOf(0);
    const valid_bytes = null_index >= 0 ? bytes.slice(0, null_index) : bytes;
    return String.fromCharCode(...valid_bytes);
  }

  /**
   * CPP_MSR_TAG 구조체 파싱
   */
  private parseMsrTag(data: number[], offset: number): { tag: CPP_MSR_TAG; next_offset: number } {
    const cSize = data[offset];
    const sTag = this.readBytes(data, offset + 1, 14);
    
    return {
      tag: { cSize, sTag },
      next_offset: offset + 15
    };
  }

  /**
   * CPP_INFO_PRE_POST_OBJ 구조체 파싱
   */
  private parseInfoPrePostObj(
    data: number[],
    offset: number
  ): { obj: CPP_INFO_PRE_POST_OBJ; next_offset: number } {
    let current_offset = offset;

    const tagPre_result = this.parseMsrTag(data, current_offset);
    current_offset = tagPre_result.next_offset;

    const tagPost_result = this.parseMsrTag(data, current_offset);
    current_offset = tagPost_result.next_offset;

    const globalPrefix_result = this.parseMsrTag(data, current_offset);
    current_offset = globalPrefix_result.next_offset;

    const globalPostfix_result = this.parseMsrTag(data, current_offset);
    current_offset = globalPostfix_result.next_offset;

    return {
      obj: {
        TagPre: tagPre_result.tag,
        TagPost: tagPost_result.tag,
        GlobalPrefix: globalPrefix_result.tag,
        GlobalPostfix: globalPostfix_result.tag
      },
      next_offset: current_offset
    };
  }

  /**
   * CPP_MSR_MAP_TABLE 구조체 파싱
   */
  private parseMsrMapTable(
    data: number[],
    offset: number
  ): { table: CPP_MSR_MAP_TABLE; next_offset: number } {
    const nMappingTableIndex = this.readUint32LE(data, offset);
    const nNumMapTableItem = this.readUint32LE(data, offset + 4);

    return {
      table: { nMappingTableIndex, nNumMapTableItem },
      next_offset: offset + 8
    };
  }

  /**
   * CPP_INFO_MSR_OBJ 구조체 파싱
   */
  private parseInfoMsrObj(
    data: number[],
    offset: number
  ): { obj: CPP_INFO_MSR_OBJ; next_offset: number } {
    let current_offset = offset;

    const cEnableTrack = data[current_offset++];
    const cSupportNum = data[current_offset++];
    const cActiveCombination = data[current_offset++];
    const cMaxSize = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cBitSize = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cDataMask = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const bUseParity = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cParityType = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cSTX_L = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cETX_L = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const bUseErrorCorrect = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cECMType = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const cRDirect = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const nBufSize = this.readUint32LE(data, current_offset);
    current_offset += 4;
    const cAddValue = this.readBytes(data, current_offset, 3);
    current_offset += 3;
    const bEnableEncryption = data[current_offset++];
    const sMasterKey = this.readBytes(data, current_offset, 16);
    current_offset += 16;
    const sChangeKey = this.readBytes(data, current_offset, 16);
    current_offset += 16;

    const PrivatePrefix: CPP_MSR_TAG[] = [];
    for (let i = 0; i < 3; i++) {
      const result = this.parseMsrTag(data, current_offset);
      PrivatePrefix.push(result.tag);
      current_offset = result.next_offset;
    }

    const PrivatePostfix: CPP_MSR_TAG[] = [];
    for (let i = 0; i < 3; i++) {
      const result = this.parseMsrTag(data, current_offset);
      PrivatePostfix.push(result.tag);
      current_offset = result.next_offset;
    }

    const KeyMap: CPP_MSR_MAP_TABLE[] = [];
    for (let i = 0; i < 3; i++) {
      const result = this.parseMsrMapTable(data, current_offset);
      KeyMap.push(result.table);
      current_offset = result.next_offset;
    }

    return {
      obj: {
        cEnableTrack,
        cSupportNum,
        cActiveCombination,
        cMaxSize,
        cBitSize,
        cDataMask,
        bUseParity,
        cParityType,
        cSTX_L,
        cETX_L,
        bUseErrorCorrect,
        cECMType,
        cRDirect,
        nBufSize,
        cAddValue,
        bEnableEncryption,
        sMasterKey,
        sChangeKey,
        PrivatePrefix,
        PrivatePostfix,
        KeyMap
      },
      next_offset: current_offset
    };
  }

  /**
   * CPP_CONTAINER_INFO_MSR_OBJ 구조체 파싱
   */
  private parseContainerInfoMsrObj(
    data: number[],
    offset: number
  ): { obj: CPP_CONTAINER_INFO_MSR_OBJ; next_offset: number } {
    let current_offset = offset;

    const pInfoMsrObj: number[] = [];
    for (let i = 0; i < 3; i++) {
      pInfoMsrObj.push(this.readUint32LE(data, current_offset));
      current_offset += 4;
    }

    const nCpdSysTickMin = this.readUint32LE(data, current_offset);
    current_offset += 4;
    const nCpdSysTickMax = this.readUint32LE(data, current_offset);
    current_offset += 4;
    const nGlobalTagCondition = this.readUint32LE(data, current_offset);
    current_offset += 4;
    const nNumItem = this.readUint32LE(data, current_offset);
    current_offset += 4;

    const nOrderObject: number[] = [];
    for (let i = 0; i < 3; i++) {
      nOrderObject.push(this.readUint32LE(data, current_offset));
      current_offset += 4;
    }

    const keyMap_result = this.parseMsrMapTable(data, current_offset);
    current_offset = keyMap_result.next_offset;

    const tagPre_result = this.parseMsrTag(data, current_offset);
    current_offset = tagPre_result.next_offset;

    const tagPost_result = this.parseMsrTag(data, current_offset);
    current_offset = tagPost_result.next_offset;

    const globalPrefix_result = this.parseMsrTag(data, current_offset);
    current_offset = globalPrefix_result.next_offset;

    const globalPostfix_result = this.parseMsrTag(data, current_offset);
    current_offset = globalPostfix_result.next_offset;

    return {
      obj: {
        pInfoMsrObj,
        nCpdSysTickMin,
        nCpdSysTickMax,
        nGlobalTagCondition,
        nNumItem,
        nOrderObject,
        KeyMap: keyMap_result.table,
        TagPre: tagPre_result.tag,
        TagPost: tagPost_result.tag,
        GlobalPrefix: globalPrefix_result.tag,
        GlobalPostfix: globalPostfix_result.tag
      },
      next_offset: current_offset
    };
  }

  /**
   * 바이트 배열을 CPP_SYSINFO 구조체로 파싱
   */
  private parseSysInfo(data: number[]): CPP_SYSINFO | null {
    try {
      if (data.length < Lpu237SysInfoManager.SYSINFO_SIZE) {
        console.error(`Insufficient data: expected ${Lpu237SysInfoManager.SYSINFO_SIZE} bytes, got ${data.length}`);
        return null;
      }

      let offset = 0;

      const cBlank = this.readBytes(data, offset, 4);
      offset += 4;

      const dwSize = this.readUint32LE(data, offset);
      offset += 4;

      const sStrucVer = this.readBytes(data, offset, 4);
      offset += 4;

      const sName = this.readString(data, offset, 16).trimEnd();
      offset += 16;

      const sSysVer = this.readBytes(data, offset, 4);
      offset += 4;

      const ModeBL = data[offset++];
      const ModeAP = data[offset++];

      const sSN = this.readBytes(data, offset, 8);
      offset += 8;

      const Interface = data[offset++];

      const nBuzzerFrequency = this.readUint32LE(data, offset);
      offset += 4;

      const nNormalWDT = this.readUint32LE(data, offset);
      offset += 4;

      const nBootRunTime = this.readUint32LE(data, offset);
      offset += 4;

      const Uart: CPP_UARTINFO = {
        nCom: this.readUint32LE(data, offset),
        nBaud: this.readUint32LE(data, offset + 4)
      };
      offset += 8;

      const container_result = this.parseContainerInfoMsrObj(data, offset);
      offset = container_result.next_offset;

      const InfoMsr: CPP_INFO_MSR_OBJ[] = [];
      for (let i = 0; i < 3; i++) {
        const result = this.parseInfoMsrObj(data, offset);
        InfoMsr.push(result.obj);
        offset = result.next_offset;
      }

      const ibutton_result = this.parseInfoPrePostObj(data, offset);
      offset = ibutton_result.next_offset;

      const uart_result = this.parseInfoPrePostObj(data, offset);
      offset = uart_result.next_offset;

      const RemoveItemTag: CPP_REMOVE_IBUTTON_TAG = {
        cSize: data[offset],
        sTag: this.readBytes(data, offset + 1, 40)
      };
      offset += 41;

      const ibutton_remove_result = this.parseInfoPrePostObj(data, offset);
      offset = ibutton_remove_result.next_offset;

      console.log(`Parsed CPP_SYSINFO structure, final offset: ${offset}`);

      return {
        cBlank,
        dwSize,
        sStrucVer,
        sName,
        sSysVer,
        ModeBL,
        ModeAP,
        sSN,
        Interface,
        nBuzzerFrequency,
        nNormalWDT,
        nBootRunTime,
        Uart,
        ContainerInfoMsrObj: container_result.obj,
        InfoMsr,
        InfoIButton: ibutton_result.obj,
        InfoUart: uart_result.obj,
        RemoveItemTag,
        InfoIButtonRemove: ibutton_remove_result.obj
      };
    } catch (error) {
      console.error('Error parsing CPP_SYSINFO:', error);
      return null;
    }
  }

  /**
   * 응답 배열을 처리하여 CPP_SYSINFO 구조체로 변환
   */
  public parseResponses(responses: string[]): CPP_SYSINFO | null {
    const merged_data = this.mergeResponses(responses);
    if (!merged_data) {
      console.error('Failed to merge responses');
      return null;
    }

    const sysinfo = this.parseSysInfo(merged_data);
    if (!sysinfo) {
      console.error('Failed to parse CPP_SYSINFO');
      return null;
    }

    return sysinfo;
  }

  /**
   * CPP_SYSINFO 구조체를 16진수 문자열로 변환 (쓰기 명령용)
   */
  public sysinfoToHexString(sysinfo: CPP_SYSINFO): string {
    const bytes: number[] = [];

    // cBlank[4]
    bytes.push(...sysinfo.cBlank);

    // dwSize
    bytes.push(
      sysinfo.dwSize & 0xFF,
      (sysinfo.dwSize >> 8) & 0xFF,
      (sysinfo.dwSize >> 16) & 0xFF,
      (sysinfo.dwSize >> 24) & 0xFF
    );

    // sStrucVer[4]
    bytes.push(...sysinfo.sStrucVer);

    // sName[16]
    const name_bytes = new Array(16).fill(0);
    for (let i = 0; i < Math.min(sysinfo.sName.length, 16); i++) {
      name_bytes[i] = sysinfo.sName.charCodeAt(i);
    }
    bytes.push(...name_bytes);

    // sSysVer[4]
    bytes.push(...sysinfo.sSysVer);

    // ModeBL, ModeAP
    bytes.push(sysinfo.ModeBL, sysinfo.ModeAP);

    // sSN[8]
    bytes.push(...sysinfo.sSN);

    // Interface
    bytes.push(sysinfo.Interface);

    // nBuzzerFrequency
    bytes.push(
      sysinfo.nBuzzerFrequency & 0xFF,
      (sysinfo.nBuzzerFrequency >> 8) & 0xFF,
      (sysinfo.nBuzzerFrequency >> 16) & 0xFF,
      (sysinfo.nBuzzerFrequency >> 24) & 0xFF
    );

    // nNormalWDT
    bytes.push(
      sysinfo.nNormalWDT & 0xFF,
      (sysinfo.nNormalWDT >> 8) & 0xFF,
      (sysinfo.nNormalWDT >> 16) & 0xFF,
      (sysinfo.nNormalWDT >> 24) & 0xFF
    );

    // nBootRunTime
    bytes.push(
      sysinfo.nBootRunTime & 0xFF,
      (sysinfo.nBootRunTime >> 8) & 0xFF,
      (sysinfo.nBootRunTime >> 16) & 0xFF,
      (sysinfo.nBootRunTime >> 24) & 0xFF
    );

    // CPP_UARTINFO
    bytes.push(
      sysinfo.Uart.nCom & 0xFF,
      (sysinfo.Uart.nCom >> 8) & 0xFF,
      (sysinfo.Uart.nCom >> 16) & 0xFF,
      (sysinfo.Uart.nCom >> 24) & 0xFF
    );
    bytes.push(
      sysinfo.Uart.nBaud & 0xFF,
      (sysinfo.Uart.nBaud >> 8) & 0xFF,
      (sysinfo.Uart.nBaud >> 16) & 0xFF,
      (sysinfo.Uart.nBaud >> 24) & 0xFF
    );

    // 나머지 구조체들도 동일한 방식으로 직렬화
    // (여기서는 간략화를 위해 생략, 실제로는 모든 필드를 변환해야 함)
    // TODO: 나머지 필드 구현

    // 16진수 문자열로 변환
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Static 메서드: 상수 접근
   */
  public static getSysInfoSize(): number {
    return Lpu237SysInfoManager.SYSINFO_SIZE;
  }

  public static getSysInfoOffset(): number {
    return Lpu237SysInfoManager.SYSINFO_OFFSET;
  }

  public static getMaxGetSize(): number {
    return Lpu237SysInfoManager.MAX_GET_SIZE;
  }

  public static getMaxSetSize(): number {
    return Lpu237SysInfoManager.MAX_SET_SIZE;
  }
}

// 기존 함수 선언
declare function _generate_config_get(
  queue_s_tx: string[],
  n_offset: number,
  n_size: number
): boolean;

declare function _generate_config_set(
  queue_s_tx: string[],
  n_offset: number,
  n_size: number,
  s_setting_data: string
): boolean;