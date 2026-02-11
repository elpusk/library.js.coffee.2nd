# System config 명령 구조

- 사용되는 모든 구조체는 1바이트 정렬
- 모든 int 의 크기는 4바이트.
- 모든 포인트(주소)의 크기는 4바이트.

## 사용되는 구조체

``` cpp
typedef struct tagTx_Data{
    unsigned int nOffset;//little-endian, 4바이트 크기
    unsigned int nSize;//little-endian, 4바이트 크기
    unsigned char sData[64-3-4-4];
}Tx_Data;

typedef struct tagMSR_TX_PACKET{
    unsigned char cCmd; // 주명령 코드. 항상 'A'
    unsigned char cSub; // 부명령 코드. 
    unsigned char cLen; // Data 필드에서 의미있는 데이터의 길이.(바이트 단위)
    Tx_Data Data;
}MSR_TX_PACKET;
```

``` cpp
typedef struct tagMSR_RX_PACKET{
    unsigned char cPreFix; // 응답을 나타내는 코드. 항상 'R'
    unsigned char cResult; // 명령 처리 결과를 나타내는 코드.
    unsigned char cLen; // sData 필드에서 의미있는 데이터의 길이.(바이트 단위)
    unsigned char sData[220-3];
}MSR_RX_PACKET;
```

## get 부명령

### get 부명령, PC 에서 장비로 송신

- MSR_TX_PACKET 의 크기는 항상 64 바이트.
- MSR_TX_PACKET 의 cCmd : 값은 항상 'A' 이며, System config 임을 나타냄.
- MSR_TX_PACKET 의 cSub : 값은 201, get 명령을 나타냄.  
- MSR_TX_PACKET 의 cLen : Data 필드의 nOffset 과 nSize 만 의미를 가지므로, 값은 항상 4+4
- MSR_TX_PACKET Data 의 nOffset : 장비로 부터 읽을 메모리의 시작 위치를 나타내는 4바이트 크기, little-endian 형식의 값.
- MSR_TX_PACKET Data 의 nSize : 장비로 부터 읽을 메모리의 크기를 나타내는 4바이트 크기, little-endian 형식의 값.
- MSR_TX_PACKET Data 의 sData : 이 경우에는 의미 없음.

### get 부명령, PC 에서 장비로 부터 수신 송신

- MSR_RX_PACKET 의 크기는 항상 220 바이트.
- MSR_RX_PACKET 의 cPreFix : 값은 'R' 이며, 응답을 나타내는 코드.
- MSR_RX_PACKET 의 cResult : 명령 처리 결과를 나타내는 코드로 값이 0xFF 이면 정상처리 그 외의 값은 에러 코드.
- MSR_RX_PACKET 의 cLen : MSR_RX_PACKET 의 sData 에서 의미 있는 데이터 길이.(바이트 단위)
- MSR_RX_PACKET 의 sData : 장비로 부터 읽은 메모리값을 저장.

## set 부명령

### set 부명령, PC 에서 장비로 송신

- MSR_TX_PACKET 의 크기는 항상 64 바이트.
- MSR_TX_PACKET 의 cCmd : 값은 항상 'A' 이며, System config 임을 나타냄.
- MSR_TX_PACKET 의 cSub : 값은 200, set 명령을 나타냄.  
- MSR_TX_PACKET 의 cLen : Data 필드에서 의미를 가지는 값의 크기.(바이트 단위)
- MSR_TX_PACKET Data 의 nOffset : 데이타를 저장 할 장비 메모리 시작 위치를 나타내는 4바이트 크기, little-endian 형식의 값.
- MSR_TX_PACKET Data 의 nSize : 장비에 저장할 데이타의 크기를 나타내는 4바이트 크기, little-endian 형식의 값.
- MSR_TX_PACKET Data 의 sData : nSize의 크기로 장비에 저장할 데이타.

### set 부명령, PC 에서 장비로 부터 수신 송신

- MSR_RX_PACKET 의 크기는 항상 220 바이트.
- MSR_RX_PACKET 의 cPreFix : 값은 'R' 이며, 응답을 나타내는 코드.
- MSR_RX_PACKET 의 cResult : 명령 처리 결과를 나타내는 코드. 값이 0xFF 이면 정상처리, 그 외의 값은 에러 코드.
- MSR_RX_PACKET 의 cLen : 이 경우는 항상 0.
- MSR_RX_PACKET 의 sData : 이 경우는 이 필드값은 무시.

## 장비에서 SYSINFO 구조체 읽기, 쓰기

### SYSINFO 구조체

- 장비의 주소 0번지에 이 구조체의 형식의 값이 위치함.

``` cpp

typedef struct tagUARTINFO{
    unsigned int nCom;//the com-port number
    unsigned int nBaud;//uart baud rate
}UARTINFO;

typedef struct tagMSR_TAG{
    unsigned char cSize;//the number of data of sTag
    unsigned char sTag[14];
}MSR_TAG;

typedef struct tagINFO_PRE_POST_OBJ{
    MSR_TAG TagPre;
    MSR_TAG TagPost;

    MSR_TAG GlobalPrefix;
    MSR_TAG GlobalPostfix;
}INFO_PRE_POST_OBJ;

typedef struct tagREMOVE_IBUTTON_TAG{
    unsigned char cSize;//the number of data of sTag
    unsigned char sTag[40];
}REMOVE_IBUTTON_TAG;

typedef struct tagMSR_MAP_TABLE{
    unsigned int nMappingTableIndex;
    unsigned int nNumMapTableItem;//the numnber of pMappingTable' item
}MSR_MAP_TABLE;

typedef struct tagINFO_MSR_OBJ{
    unsigned char cEnableTrack;
    unsigned char cSupportNum;
    unsigned char cActiveCombination;
    unsigned char cMaxSize[3];
    unsigned char cBitSize[3];
    unsigned char cDataMask[3];
    unsigned char bUseParity[3];
    unsigned char cParityType[3];
    unsigned char cSTX_L[3];
    unsigned char cETX_L[3];
    unsigned char bUseErrorCorrect[3];
    unsigned char cECMType[3];
    unsigned char cRDirect[3];
    unsigned int nBufSize;
    unsigned char cAddValue[3];
    unsigned char bEnableEncryption;
    unsigned char sMasterKey[16];
    unsigned char sChangeKey[16];

    MSR_TAG PrivatePrefix[3];
    MSR_TAG PrivatePostfix[3];
    MSR_MAP_TABLE KeyMap[3];
}INFO_MSR_OBJ, *PINFO_MSR_OBJ,*LPINFO_MSR_OBJ;

typedef struct tagCONTAINER_INFO_MSR_OBJ{
    PINFO_MSR_OBJ pInfoMsrObj[3];
    unsigned int nCpdSysTickMin;
    unsigned int nCpdSysTickMax;
    unsigned int nGlobalTagCondition;
    unsigned int nNumItem;
    unsigned int nOrderObject[3];
    MSR_MAP_TABLE KeyMap;
    MSR_TAG TagPre;
    MSR_TAG TagPost;
    MSR_TAG GlobalPrefix;
    MSR_TAG GlobalPostfix;
}CONTAINER_INFO_MSR_OBJ;

typedef struct tagSYSINFO{
    unsigned char cBlank[4];
    unsigned int dwSize;//the size of this structure = sizeof(SYSINFO)
    unsigned char sStrucVer[4];// this structure version.
    unsigned char sName[16];//the name of system
    unsigned char sSysVer[4];//the version of system
    unsigned char ModeBL;//the current boot loader system mode
    unsigned char ModeAP;//the current application system mode
    unsigned char sSN[8];//serial number
    unsigned char Interface;//the current active interface.
    unsigned int nBuzzerFrequency;//buzzer frequency(Hz)
    unsigned int nNormalWDT;
    unsigned int nBootRunTime;

    UARTINFO Uart;//the current uart set

    CONTAINER_INFO_MSR_OBJ ContainerInfoMsrObj;//msr info container

    INFO_MSR_OBJ InfoMsr[3];//msr info

    INFO_PRE_POST_OBJ InfoIButton;//i-button pre/postfix tag.

    INFO_PRE_POST_OBJ InfoUart;// uart pre/postfix information.

    REMOVE_IBUTTON_TAG RemoveItemTag;// i-button remove key
    INFO_PRE_POST_OBJ InfoIButtonRemove;// i-button remove key pre/postfix tag.

}SYSINFO;
```

### 이미 존재하는 코드들

``` ts
  /**
   * @private
   * @function _generate_config_get
   * @description get 부명령을 생성하여, 장비에 전송할 명령큐에 추가. 생성된 명령은 16진수를 표시하는 문자열. (중요)하나의 명령으로 읽을수 있는 최대 크기는 217 바이트.
   * @param {string[]} queue_s_tx - 생성된 명령이 저장될 명령큐
   * @param {number} n_offset - 읽어올 장비 매모리 시작 오프셋
   * @param {number} n_size - 읽어올 데이터의 크기 (바이트 단위)
   * @returns {boolean} 생성 성공 여부
   */
  function _generate_config_get(
    queue_s_tx: string[],
    n_offset: number,
    n_size: number,
  ): boolean;

  /**
   * @private
   * @function _generate_config_set
   * @description set 부명령을 생성하여, 장비에 전송할 명령큐에 추가. 생성된 명령은 16진수를 표시하는 문자열. (중요)하나의 명령으로 쓸수 있는 최대 크기는 53 바이트.
   * @param {string[]} queue_s_tx - 생성된 명령이 저장될 명령큐
   * @param {number} n_offset - 시스템 장비 매모리 시작 오프셋
   * @param {number} n_size - 설정할 데이터의 바이트 크기
   * @param {string} s_setting_data - 설정할 데이터 (구분자 없는 16진수를 표시하는 문자열)
   * @returns {boolean} 생성 성공 여부
   */
  function _generate_config_set(
    queue_s_tx: string[],
    n_offset: number,
    n_size: number,
    s_setting_data: string,
  ): boolean;

```

