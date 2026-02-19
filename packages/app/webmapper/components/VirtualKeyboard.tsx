import React, { useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
  onKeyPress: (key: string, modifiers: { shift: boolean; ctrl: boolean; alt: boolean }) => void;
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

// shift 레이아웃 기호 → base 키 역산 테이블
// HID_REVERSE_MAP 은 base 키(예: '-', '=')만 알고 있으므로
// shift 레이아웃에서 눌린 기호는 base 키로 변환해서 전달해야 함
const SHIFT_SYMBOL_TO_BASE: Record<string, string> = {
  '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
  '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
  '_': '-', '+': '=', '~': '`',
  '{': '[', '}': ']', '|': '\\',
  ':': ';', '"': "'",
  '<': ',', '>': '.', '?': '/',
};

// ─────────────────────────────────────────────────────────────────────────────
// 키보드 레이아웃 정의
// ─────────────────────────────────────────────────────────────────────────────
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
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [shift, setShift] = useState(false);
  const [ctrl,  setCtrl]  = useState(false);
  const [alt,   setAlt]   = useState(false);

  const keyboardRef = useRef<any>(null);

  // modifier 버튼 활성 강조 (buttonTheme prop)
  const buttonTheme = [
    ...(shift ? [{ class: 'skb-active', buttons: '{shift}' }] : []),
    ...(ctrl  ? [{ class: 'skb-active', buttons: '{ctrl}'  }] : []),
    ...(alt   ? [{ class: 'skb-active', buttons: '{alt}'   }] : []),
  ];

  const handleKeyPress = (button: string) => {
    // ── Modifier 토글 ─────────────────────────────────────────────────────
    if (button === '{shift}') { setShift(prev => !prev); return; }
    if (button === '{ctrl}')  { setCtrl(prev  => !prev); return; }
    if (button === '{alt}')   { setAlt(prev   => !prev); return; }
    if (button === '{lock}')  { return; } // CapsLock 미지원

    // ── 레이블 결정 ───────────────────────────────────────────────────────
    let label: string;
    if (SKB_TO_LABEL[button]) {
      // 특수 버튼(Esc, F1~F12, Bksp, …)
      label = SKB_TO_LABEL[button];
    } else if (shift && SHIFT_SYMBOL_TO_BASE[button]) {
      // shift 레이아웃 기호 → base 키로 역산 (HID 코드 룩업을 위해)
      label = SHIFT_SYMBOL_TO_BASE[button];
    } else {
      // 일반 문자: 대소문자 모두 getHidCodeByLabel 에서 무시하므로 그대로 전달
      label = button;
    }

    onKeyPress(label, { shift, ctrl, alt });

    // Shift 는 단발성(one-shot): 일반 키 입력 후 해제
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
        /* simple-keyboard 테마 조정 */
        .vkb-theme.hg-theme-default {
          background: #cbd5e1;
          border-radius: 8px;
          padding: 8px;
          font-family: inherit;
        }
        .vkb-theme .hg-button {
          height: 38px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 5px;
          box-shadow: 0 2px 0 #94a3b8;
          background: #fff;
          color: #334155;
        }
        .vkb-theme .hg-button:active {
          box-shadow: none;
          transform: translateY(2px);
        }
        /* F 키 행 작게 */
        .vkb-theme .hg-row:first-child .hg-button {
          height: 30px;
          font-size: 10px;
          min-width: 36px;
          max-width: 48px;
        }
        /* Space 키 넓게 */
        .vkb-theme .hg-button[data-skbtn="{space}"] {
          flex-grow: 5;
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
