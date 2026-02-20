import React, { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
  onKeyPress: (key: string, modifiers: { shift: boolean; ctrl: boolean; alt: boolean }) => void;
  language?: string; // e.g. "USA English", "German", ...
}

// ─────────────────────────────────────────────────────────────────────────────
// simple-keyboard 특수 버튼 → getHidCodeByLabel 이 기대하는 레이블
// ─────────────────────────────────────────────────────────────────────────────
const SKB_TO_LABEL: Record<string, string> = {
  '{bksp}'  : 'Bksp',
  '{tab}'   : 'Tab',
  '{enter}' : 'Enter',
  '{lock}'  : 'Caps',
  '{space}' : 'Space',
  '{esc}'   : 'Esc',
  '{f1}'    : 'F1',  '{f2}'  : 'F2',  '{f3}'  : 'F3',
  '{f4}'    : 'F4',  '{f5}'  : 'F5',  '{f6}'  : 'F6',
  '{f7}'    : 'F7',  '{f8}'  : 'F8',  '{f9}'  : 'F9',
  '{f10}'   : 'F10', '{f11}' : 'F11', '{f12}' : 'F12',
};

// ─────────────────────────────────────────────────────────────────────────────
// 언어별 키보드 레이아웃 정의
//
// simple-keyboard layout 의 각 행은 공백으로 구분된 버튼 이름 문자열입니다.
// 기호가 공백을 포함하는 경우는 없으므로 그대로 사용 가능합니다.
//
// 구조:
//   default: 일반(비-shift) 레이아웃
//   shift:   Shift 누른 상태 레이아웃
//
// 행 순서:
//   [0] F키 행      (모든 언어 공통)
//   [1] 숫자행
//   [2] QWERTY행 (일부 언어는 QWERTZ, AZERTY)
//   [3] ASDF행
//   [4] ZXCV행
//   [5] 하단행      (모든 언어 공통)
//
// ※ 기호에 공백이 들어가면 simple-keyboard 가 별도 버튼으로 인식하므로
//    반드시 공백 없는 단일 문자/문자열을 사용해야 합니다.
// ─────────────────────────────────────────────────────────────────────────────

const F_ROW    = '{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}';
const BOTTOM   = '{ctrl} {alt} {space} {alt} {ctrl}';

type LangLayout = { default: string[]; shift: string[] };

// 공통 display 이름 (언어 무관 특수 버튼)
export const DISPLAY: Record<string, string> = {
  '{bksp}'  : 'Bksp',
  '{tab}'   : 'Tab',
  '{enter}' : 'Enter',
  '{lock}'  : 'Caps',
  '{space}' : 'Space',
  '{esc}'   : 'Esc',
  '{shift}' : 'Shift',
  '{ctrl}'  : 'Ctrl',
  '{alt}'   : 'Alt',
  '{f1}'    : 'F1',  '{f2}'  : 'F2',  '{f3}'  : 'F3',
  '{f4}'    : 'F4',  '{f5}'  : 'F5',  '{f6}'  : 'F6',
  '{f7}'    : 'F7',  '{f8}'  : 'F8',  '{f9}'  : 'F9',
  '{f10}'   : 'F10', '{f11}' : 'F11', '{f12}' : 'F12',
  // 언어별 특수문자도 그대로 표시하므로 추가 display 불필요
};

// ── US English (index 0) ─────────────────────────────────────────────────────
const LAYOUT_EN: LangLayout = {
  default: [
    F_ROW,
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M < > ? {shift}',
    BOTTOM,
  ],
};

// ── Spanish (index 1) ────────────────────────────────────────────────────────
// Spanish keyboard (ES): º 1 2 3 4 5 6 7 8 9 0 ' ¡  |  q w e r t y u i o p ` + ç
// Simplified to printable ASCII-range keys for HID mapping purposes
const LAYOUT_ES: LangLayout = {
  default: [
    F_ROW,
    'º 1 2 3 4 5 6 7 8 9 0 \' ¡ {bksp}',
    '{tab} q w e r t y u i o p ` + ç',
    '{lock} a s d f g h j k l ñ \' {enter}',
    '{shift} z x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    'ª ! " · $ % & / ( ) = ? ¿ {bksp}',
    '{tab} Q W E R T Y U I O P ^ * Ç',
    '{lock} A S D F G H J K L Ñ " {enter}',
    '{shift} Z X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── Danish (index 2) ─────────────────────────────────────────────────────────
const LAYOUT_DA: LangLayout = {
  default: [
    F_ROW,
    '½ 1 2 3 4 5 6 7 8 9 0 + \' {bksp}',
    '{tab} q w e r t y u i o p å ¨ \'',
    '{lock} a s d f g h j k l æ ø {enter}',
    '{shift} z x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '§ ! " # $ % & / ( ) = ? ` {bksp}',
    '{tab} Q W E R T Y U I O P Å ^ *',
    '{lock} A S D F G H J K L Æ Ø {enter}',
    '{shift} Z X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── French AZERTY (index 3) ──────────────────────────────────────────────────
const LAYOUT_FR: LangLayout = {
  default: [
    F_ROW,
    '² & é " \' ( - è _ ç à ) = {bksp}',
    '{tab} a z e r t y u i o p ^ $ *',
    '{lock} q s d f g h j k l m ù {enter}',
    '{shift} w x c v b n , ; : ! {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '~ 1 2 3 4 5 6 7 8 9 0 ° + {bksp}',
    '{tab} A Z E R T Y U I O P ¨ £ µ',
    '{lock} Q S D F G H J K L M % {enter}',
    '{shift} W X C V B N ? . / § {shift}',
    BOTTOM,
  ],
};

// ── German QWERTZ (index 4) ──────────────────────────────────────────────────
const LAYOUT_DE: LangLayout = {
  default: [
    F_ROW,
    '^ 1 2 3 4 5 6 7 8 9 0 ß \' {bksp}',
    '{tab} q w e r t z u i o p ü + #',
    '{lock} a s d f g h j k l ö ä {enter}',
    '{shift} y x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '° ! " § $ % & / ( ) = ? ` {bksp}',
    '{tab} Q W E R T Z U I O P Ü * \'',
    '{lock} A S D F G H J K L Ö Ä {enter}',
    '{shift} Y X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── Italian (index 5) ────────────────────────────────────────────────────────
const LAYOUT_IT: LangLayout = {
  default: [
    F_ROW,
    '\\ 1 2 3 4 5 6 7 8 9 0 \' ì {bksp}',
    '{tab} q w e r t y u i o p è + ù',
    '{lock} a s d f g h j k l ò à {enter}',
    '{shift} z x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '| ! " £ $ % & / ( ) = ? ^ {bksp}',
    '{tab} Q W E R T Y U I O P é * §',
    '{lock} A S D F G H J K L ç ° {enter}',
    '{shift} Z X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── Norwegian (index 6) ──────────────────────────────────────────────────────
const LAYOUT_NO: LangLayout = {
  default: [
    F_ROW,
    '| 1 2 3 4 5 6 7 8 9 0 + \\ {bksp}',
    '{tab} q w e r t y u i o p å ¨ \'',
    '{lock} a s d f g h j k l ø æ {enter}',
    '{shift} z x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '§ ! " # $ % & / ( ) = ? ` {bksp}',
    '{tab} Q W E R T Y U I O P Å ^ *',
    '{lock} A S D F G H J K L Ø Æ {enter}',
    '{shift} Z X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── Swedish (index 7) ────────────────────────────────────────────────────────
const LAYOUT_SV: LangLayout = {
  default: [
    F_ROW,
    '§ 1 2 3 4 5 6 7 8 9 0 + \' {bksp}',
    '{tab} q w e r t y u i o p å ¨ \'',
    '{lock} a s d f g h j k l ö ä {enter}',
    '{shift} z x c v b n m , . - {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '½ ! " # $ % & / ( ) = ? ` {bksp}',
    '{tab} Q W E R T Y U I O P Å ^ *',
    '{lock} A S D F G H J K L Ö Ä {enter}',
    '{shift} Z X C V B N M ; : _ {shift}',
    BOTTOM,
  ],
};

// ── UK English (index 8) ─────────────────────────────────────────────────────
const LAYOUT_UK: LangLayout = {
  default: [
    F_ROW,
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] #',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} \\ z x c v b n m , . / {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '¬ ! " £ $ % ^ & * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } ~',
    '{lock} A S D F G H J K L : @ {enter}',
    '{shift} | Z X C V B N M < > ? {shift}',
    BOTTOM,
  ],
};

// ── Hebrew (index 9) ─────────────────────────────────────────────────────────
// Hebrew keyboard: 히브리어 문자는 alt/shift 레이어에 배치
// default 레이아웃은 영어와 동일, shift 에서 히브리어 문자 표시
const LAYOUT_HE: LangLayout = {
  default: [
    F_ROW,
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} / \' ק ר א ט ו ן ם פ [ ] \\',
    '{lock} ש ד ג כ ע י ח ל ך ף , {enter}',
    '{shift} ז ס ב ה נ מ צ ת ץ . {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M < > ? {shift}',
    BOTTOM,
  ],
};

// ── Turkiye (index 10) ───────────────────────────────────────────────────────
const LAYOUT_TR: LangLayout = {
  default: [
    F_ROW,
    '" 1 2 3 4 5 6 7 8 9 0 * - {bksp}',
    '{tab} q w e r t y u ı o p ğ ü \\',
    '{lock} a s d f g h j k l ş i {enter}',
    '{shift} z x c v b n m ö ç . {shift}',
    BOTTOM,
  ],
  shift: [
    F_ROW,
    'é ! \' ^ + % & / ( ) = ? _ {bksp}',
    '{tab} Q W E R T Y U I O P Ğ Ü |',
    '{lock} A S D F G H J K L Ş İ {enter}',
    '{shift} Z X C V B N M Ö Ç : {shift}',
    BOTTOM,
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 언어 문자열 → 레이아웃 맵
// lpu237.GetLanguageStringList() 가 반환하는 문자열과 일치해야 함
// ─────────────────────────────────────────────────────────────────────────────
const LANG_LAYOUT_MAP: Record<string, LangLayout> = {
  'USA English' : LAYOUT_EN,
  'Spanish'     : LAYOUT_ES,
  'Danish'      : LAYOUT_DA,
  'French'      : LAYOUT_FR,
  'German'      : LAYOUT_DE,
  'Italian'     : LAYOUT_IT,
  'Norwegian'   : LAYOUT_NO,
  'Swedish'     : LAYOUT_SV,
  'UK English'  : LAYOUT_UK,
  'Herbrew'     : LAYOUT_HE, // lpu237 내부 오타 그대로 맞춤
  'Turkiye'     : LAYOUT_TR,
};

// ─────────────────────────────────────────────────────────────────────────────
// shift 레이아웃의 기호 → base 키 역산 테이블 (US English 기준)
// 비-US 언어는 기호 위치가 달라지므로 언어별로 별도 역산 테이블을 정의합니다.
// ─────────────────────────────────────────────────────────────────────────────
type ShiftMap = Record<string, string>;

// 각 언어의 shift 레이아웃에서 눌린 기호 → 해당 키의 default 문자
// getHidCodeByLabel 은 US HID 코드 기준이므로,
// 비-US 언어에서는 shift 기호도 그대로 label 로 전달합니다.
// (handlers.ts 의 HID_REVERSE_MAP 에 없으면 "00" 반환 — 이는 기존 동작과 동일)
const SHIFT_TO_BASE_EN: ShiftMap = {
  '!':'1','@':'2','#':'3','$':'4','%':'5',
  '^':'6','&':'7','*':'8','(':'9',')':'0',
  '_':'-','+':'=','~':'`',
  '{':'[','}':']','|':'\\',
  ':':';','"':"'",
  '<':',','>':'.','?':'/',
};

// 독일어: shift 기호 → default 기호
const SHIFT_TO_BASE_DE: ShiftMap = {
  '!':'1','"':'2','§':'3','$':'4','%':'5','&':'6',
  '/':'7','(':'8',')':'9','=':'0','?':'ß','`':"'",
  "'": '#',
  ';':',',':':'.',
  '_':'-',
};

// 프랑스어: shift 기호 → default
const SHIFT_TO_BASE_FR: ShiftMap = {
  '1':'&','2':'é','3':'"',"4":"'","5":'(','6':'-',
  '7':'è','8':'_','9':'ç','0':'à','°':')','+':"=",
  '?':',','.'  :';','/':':','!':'!',
  '%':'ù','µ':'*',
};

// 스페인어
const SHIFT_TO_BASE_ES: ShiftMap = {
  '!':'1','"':'2','·':'3','$':'4','%':'5','&':'6',
  '/':'7','(':'8',')':'9','=':'0','?':"'",'¿':'¡',
  ';':',',':':'.',
  '_':'-',
};

// 기타 언어: 기본적으로 EN 역산 테이블 사용 (대부분 숫자행 shift 는 EN과 동일)
const LANG_SHIFT_MAP: Record<string, ShiftMap> = {
  'USA English' : SHIFT_TO_BASE_EN,
  'UK English'  : SHIFT_TO_BASE_EN,
  'Spanish'     : SHIFT_TO_BASE_ES,
  'Danish'      : SHIFT_TO_BASE_EN,
  'French'      : SHIFT_TO_BASE_FR,
  'German'      : SHIFT_TO_BASE_DE,
  'Italian'     : SHIFT_TO_BASE_EN,
  'Norwegian'   : SHIFT_TO_BASE_EN,
  'Swedish'     : SHIFT_TO_BASE_EN,
  'Herbrew'     : SHIFT_TO_BASE_EN,
  'Turkiye'     : SHIFT_TO_BASE_EN,
};

const BUTTON_ATTRIBUTES = [
  { attribute: 'style', value: 'flex:1.5',  buttons: '{bksp}'  },
  { attribute: 'style', value: 'flex:1.5',  buttons: '{tab}'   },
  { attribute: 'style', value: 'flex:1.75', buttons: '{lock}'  },
  { attribute: 'style', value: 'flex:2.25', buttons: '{enter}' },
  { attribute: 'style', value: 'flex:2.25', buttons: '{shift}' },
  { attribute: 'style', value: 'flex:1.5',  buttons: '{ctrl}'  },
  { attribute: 'style', value: 'flex:1.5',  buttons: '{alt}'   },
  { attribute: 'style', value: 'flex:5.5',  buttons: '{space}' },
];

// ─────────────────────────────────────────────────────────────────────────────
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, language = 'USA English' }) => {
  const [shift, setShift] = useState(false);
  const [ctrl,  setCtrl]  = useState(false);
  const [alt,   setAlt]   = useState(false);

  const keyboardRef = useRef<any>(null);

  // 언어에 맞는 레이아웃 선택 (없으면 영어 fallback)
  const layout     = LANG_LAYOUT_MAP[language] ?? LAYOUT_EN;
  const shiftMap   = LANG_SHIFT_MAP[language]  ?? SHIFT_TO_BASE_EN;

  const buttonTheme = [
    ...(shift ? [{ class: 'skb-active', buttons: '{shift}' }] : []),
    ...(ctrl  ? [{ class: 'skb-active', buttons: '{ctrl}'  }] : []),
    ...(alt   ? [{ class: 'skb-active', buttons: '{alt}'   }] : []),
  ];

  const handleKeyPress = (button: string) => {
    if (button === '{shift}') { setShift(prev => !prev); return; }
    if (button === '{ctrl}')  { setCtrl(prev  => !prev); return; }
    if (button === '{alt}')   { setAlt(prev   => !prev); return; }
    if (button === '{lock}')  { return; }

    let label: string;
    if (SKB_TO_LABEL[button]) {
      label = SKB_TO_LABEL[button];
    } else if (shift && shiftMap[button]) {
      // shift 레이아웃 기호 → base 키로 역산
      label = shiftMap[button];
    } else {
      label = button;
    }

    onKeyPress(label, { shift, ctrl, alt });
    if (shift) setShift(false);
  };

  return (
    <div className="vkb-wrapper">
      {/* modifier + 언어 표시 */}
      <div className="vkb-status">
        <span className={shift ? 'vkb-badge active' : 'vkb-badge'}>Shift</span>
        <span className={ctrl  ? 'vkb-badge active' : 'vkb-badge'}>Ctrl</span>
        <span className={alt   ? 'vkb-badge active' : 'vkb-badge'}>Alt</span>
        <span className="vkb-badge lang">{language}</span>
      </div>

      <Keyboard
        keyboardRef={(r: any) => { keyboardRef.current = r; }}
        layoutName={shift ? 'shift' : 'default'}
        layout={layout}
        display={DISPLAY}
        onKeyPress={handleKeyPress}
        buttonTheme={buttonTheme}
        buttonAttributes={BUTTON_ATTRIBUTES}
        physicalKeyboardHighlight={false}
        mergeDisplay={true}
        theme="hg-theme-default vkb-theme"
      />

      <style>{`
        .vkb-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }
        .vkb-status {
          display: flex;
          gap: 8px;
          padding: 2px 4px;
          align-items: center;
        }
        .vkb-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
          background: #e2e8f0;
          color: #94a3b8;
          transition: background 0.15s, color 0.15s;
        }
        .vkb-badge.active {
          background: #3b82f6;
          color: #fff;
        }
        .vkb-badge.lang {
          background: #f1f5f9;
          color: #475569;
          margin-left: auto;
          border: 1px solid #e2e8f0;
        }
        .vkb-theme.hg-theme-default {
          background: #cbd5e1;
          border-radius: 8px;
          padding: 8px;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }
        .vkb-theme .hg-row {
          display: flex;
          width: 100%;
          box-sizing: border-box;
        }
        .vkb-theme .hg-button {
          flex: 1;
          min-width: 0 !important;
          height: 38px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 5px;
          box-shadow: 0 2px 0 #94a3b8;
          background: #fff;
          color: #334155;
          box-sizing: border-box;
        }
        .vkb-theme .hg-button:active {
          box-shadow: none;
          transform: translateY(2px);
        }
        .vkb-theme .hg-row:first-child .hg-button {
          height: 30px;
          font-size: 10px;
        }
        .vkb-theme .hg-button.skb-active {
          background: #bfdbfe;
          color: #1d4ed8;
          box-shadow: 0 2px 0 #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default VirtualKeyboard;
