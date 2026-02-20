import React, { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
  onKeyPress: (key: string, modifiers: { shift: boolean; ctrl: boolean; alt: boolean }) => void;
}

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

const SHIFT_SYMBOL_TO_BASE: Record<string, string> = {
  '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
  '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
  '_': '-', '+': '=', '~': '`',
  '{': '[', '}': ']', '|': '\\',
  ':': ';', '"': "'",
  '<': ',', '>': '.', '?': '/',
};

const LAYOUT = {
  default: [
    '{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    '{tab} q w e r t y u i o p [ ] \\',
    '{lock} a s d f g h j k l ; \' {enter}',
    '{shift} z x c v b n m , . / {shift}',
    '{ctrl} {alt} {space} {alt} {ctrl}',
  ],
  shift: [
    '{esc} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M < > ? {shift}',
    '{ctrl} {alt} {space} {alt} {ctrl}',
  ],
};

const DISPLAY: Record<string, string> = {
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
};

// ─────────────────────────────────────────────────────────────────────────────
// 행별 flex 단위 설계 (기준: F1행 = 13키 × flex:1 = 합계 13)
//
// 행0 F행  : {esc}×1  f1~f12×12                          → 13×1       = 13
// 행1 숫자행: `~=  12키×1  {bksp}×1                       → 13×1       = 13
// 행2 Tab행 : {tab}×1.5  q~\  11키×1  [×1  ]×1           → 1.5+11+1+1 ≈ 14.5
//             → {tab}을 0.5, [  ]  \를 1로 하면 총 0.5+11+1+1+1=14.5
//             실제: tab=1.5, 나머지 11개=1, [=1, ]=1, \=1 → 합=15.5 (비례로 맞춤)
//             simple-keyboard flex 로 조정: tab=1.5, []=\=1 → 전체 비율로 자동
// 행3 Caps행: {lock}×1.75  a~'  10키×1  {enter}×2.25
// 행4 Shift행: {shift}×2.25  z~/ 10키×1  {shift}×2.25
// 행5 하단행 : {ctrl}×1.5  {alt}×1.5  {space}×5.5  {alt}×1.5  {ctrl}×1.5
//
// ※ simple-keyboard 는 buttonAttributes 로 style 을 주입해 flex 를 제어합니다.
// ─────────────────────────────────────────────────────────────────────────────
const BUTTON_ATTRIBUTES = [
  // 숫자행 Bksp
  { attribute: 'style', value: 'flex:1.5',   buttons: '{bksp}' },
  // Tab행
  { attribute: 'style', value: 'flex:1.5',   buttons: '{tab}'  },
  // Caps / Enter
  { attribute: 'style', value: 'flex:1.75',  buttons: '{lock}' },
  { attribute: 'style', value: 'flex:2.25',  buttons: '{enter}'},
  // Shift (양쪽)
  { attribute: 'style', value: 'flex:2.25',  buttons: '{shift}'},
  // 하단행
  { attribute: 'style', value: 'flex:1.5',   buttons: '{ctrl}' },
  { attribute: 'style', value: 'flex:1.5',   buttons: '{alt}'  },
  { attribute: 'style', value: 'flex:5.5',   buttons: '{space}'},
];

// ─────────────────────────────────────────────────────────────────────────────
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [shift, setShift] = useState(false);
  const [ctrl,  setCtrl]  = useState(false);
  const [alt,   setAlt]   = useState(false);

  const keyboardRef = useRef<any>(null);

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
    } else if (shift && SHIFT_SYMBOL_TO_BASE[button]) {
      label = SHIFT_SYMBOL_TO_BASE[button];
    } else {
      label = button;
    }

    onKeyPress(label, { shift, ctrl, alt });
    if (shift) setShift(false);
  };

  return (
    <div className="vkb-wrapper">
      {/* modifier 상태 표시 */}
      <div className="vkb-status">
        <span className={shift ? 'vkb-badge active' : 'vkb-badge'}>Shift</span>
        <span className={ctrl  ? 'vkb-badge active' : 'vkb-badge'}>Ctrl</span>
        <span className={alt   ? 'vkb-badge active' : 'vkb-badge'}>Alt</span>
      </div>

      <Keyboard
        keyboardRef={(r: any) => { keyboardRef.current = r; }}
        layoutName={shift ? 'shift' : 'default'}
        layout={LAYOUT}
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

        /* ── simple-keyboard 컨테이너 ── */
        .vkb-theme.hg-theme-default {
          background: #cbd5e1;
          border-radius: 8px;
          padding: 8px;
          font-family: inherit;
          /* 키보드 전체 폭을 컨테이너에 꽉 채움 */
          width: 100%;
          box-sizing: border-box;
        }

        /* 각 행을 꽉 채우고 키들이 flex로 폭을 나눔 */
        .vkb-theme .hg-row {
          display: flex;
          width: 100%;
          box-sizing: border-box;
        }

        /* 모든 버튼 기본: flex:1, 최소 폭 제거 */
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

        /* F키 행(첫 번째 행): 높이·폰트 작게 */
        .vkb-theme .hg-row:first-child .hg-button {
          height: 30px;
          font-size: 10px;
        }

        /* modifier 활성 버튼 강조 */
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
