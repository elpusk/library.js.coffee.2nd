
/**
 * @license MIT
 * Copyright (c) 2020 Elpusk.Co.,Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
        export const FOR_CVT_MAX_ASCII_CODE = 130;		//covertable maximmum of ascii-code.

        export const SUPPORT_KB_MAP	=	11;
        
        export const HIDKEY_MAP_NUMBER	=		SUPPORT_KB_MAP;	//the number of map table
        export const PS2KEY_MAP_NUMBER	=		SUPPORT_KB_MAP;	//the number of map table
        
        /////////////////////////////////////////////////////
        //definition of key code.......  for USB keyboard
        //USA.......(default definition)
        
        // HID MODIFIERS KEYS
        export const HIDKEY_MOD__NONE			="00";//none modifier
        export const HIDKEY_MOD_L_CTL			="01";//left control
        export const HIDKEY_MOD_L_SFT			="02";//left shift
        export const HIDKEY_MOD_L_ALT			="04";//left alt
        export const HIDKEY_MOD_L_GUI			="08";//left windows key
        export const HIDKEY_MOD_R_CTL			="10";//right control
        export const HIDKEY_MOD_R_SFT			="20";//right shift
        export const HIDKEY_MOD_R_ALT			="40";//right alt
        export const HIDKEY_MOD_R_GUI			="80";//right windows key
        
        
        export const HIDKEY____a____A			="04";// a A
        export const HIDKEY____b____B			="05";// b B
        export const HIDKEY____c____C			="06";// c C
        export const HIDKEY____d____D			="07";// d D
        export const HIDKEY____e____E			="08";// e E
        export const HIDKEY____f____F			="09";// f F
        export const HIDKEY____g____G			="0a";// g G
        export const HIDKEY____h____H			="0b";// h H
        export const HIDKEY____i____I			="0c";// i I
        export const HIDKEY____j____J			="0d";// j J
        export const HIDKEY____k____K			="0e";// k K
        export const HIDKEY____l____L			="0f";// l L
        export const HIDKEY____m____M			="10";// m M
        export const HIDKEY____n____N			="11";// n N
        export const HIDKEY____o____O			="12";// o O
        export const HIDKEY____p____P			="13";// p P
        export const HIDKEY____q____Q			="14";// q Q
        export const HIDKEY____r____R			="15";// r R
        export const HIDKEY____s____S			="16";// s S
        export const HIDKEY____t____T			="17";// t T
        export const HIDKEY____u____U			="18";// u U
        export const HIDKEY____v____V			="19";// v V
        export const HIDKEY____w____W			="1a";// w W
        export const HIDKEY____x____X			="1b";// x X
        export const HIDKEY____y____Y			="1c";// y Y
        export const HIDKEY____z____Z			="1d";// z Z
        export const HIDKEY____1_EXCL			="1e";// 1 ! Exclamation point
        export const HIDKEY____2_QUOT			="1f";// 2 @ Quotation mark
        export const HIDKEY____3_SHAR			="20";// 3 # Sharp
        export const HIDKEY____4_DOLL			="21";// 4 $ Dollar sign
        export const HIDKEY____5_PERC			="22";// 5 % Percent sign
        export const HIDKEY____6_CIRC			="23";// 6 ^ Circumflex
        export const HIDKEY____7_AMPE			="24";// 7 & ampersand
        export const HIDKEY____8_ASTE			="25";// 8 * asterisk
        export const HIDKEY____9_L_PA			="26";// 9 ( left parenthesis
        export const HIDKEY____0_R_PA			="27";// 0 ) right parenthesis
        export const HIDKEY____RETURN			="28";// Return
        export const HIDKEY____ESCAPE			="29";// Escape
        export const HIDKEY_BACKSPACE			="2a";// Backspace
        export const HIDKEY_______TAB			="2b";// Tab
        export const HIDKEY_____SPACE			="2c";// Space
        export const HIDKEY_MIN_UNDER			="2d";// - _ underline
        export const HIDKEY_EQU__PLUS			="2e";// = +
        
        
        export const HIDKEY_LBT___LBR			="2f";// [ { left bracket,left brace
        export const HIDKEY_RBT___RBR			="30";// ] } right bracket,right brace
        export const HIDKEY_BSLA_VBAR			="31";// \ | back slash, vertical bar 
        export const HIDKEY_SEMI__COL			="33";// ; : semicolon, colon 
        export const HIDKEY_APOS_QUOT			="34";// ' " apostrophe, Double Quotation
        export const HIDKEY_GRAV_TILD			="35";// ` ~ Grave, Tilde
        export const HIDKEY_COMA___LT			="36";// , < comma, less then sign
        export const HIDKEY_PERIOD_GT			="37";// . > period, greater then sign
        export const HIDKEY_SLASH__QM			="38";// / ? slash
        export const HIDKEY__CAPSLOCK			="39";//Caps Lock
        export const HIDKEY________F1			="3a";//F1
        export const HIDKEY________F2			="3b";//F2
        export const HIDKEY________F3			="3c";//F3
        export const HIDKEY________F4			="3d";//F4
        export const HIDKEY________F5			="3e";//F5
        export const HIDKEY________F6			="3f";//F6
        export const HIDKEY________F7			="40";//F7
        export const HIDKEY________F8			="41";//F8
        export const HIDKEY________F9			="42";//F19
        export const HIDKEY_______F10			="43";//F10
        export const HIDKEY_______F11			="44";//F11
        export const HIDKEY_______F12			="45";//F12
        export const HIDKEY_PRINT_SCR			="46";//Print Screen
        export const HIDKEY_SCROLLLOC			="47";//Scroll Lock
        export const HIDKEY_____BREAK			="48";//Break (Ctrl-Pause)
        export const HIDKEY____INSERT			="49";//Insert
        export const HIDKEY______HOME			="4a";//Home
        export const HIDKEY____PAGEUP			="4b";//Page Up
        export const HIDKEY____DELETE			="4c";//Delete
        export const HIDKEY_______END			="4d";//End
        export const HIDKEY__PAGEDOWN			="4e";//Page Down
        
        export const HIDKEY_ARROW___R			="4f";//Right Arrow
        export const HIDKEY_ARROW___L			="50";//Left Arrow
        export const HIDKEY_ARROW___D			="51";//Down Arrow
        export const HIDKEY_ARROW___U			="52";//Up Arrow
        
        export const HIDKEY_KPAD__DIV			="54";//Keypad /
        export const HIDKEY_KPAD__MUL			="55";//Keypad *
        export const HIDKEY_KPAD_MINU			="56";//Keypad -
        export const HIDKEY_KPAD_PLUS			="57";//Keypad +
        export const HIDKEY_KEYPAD_EN	        ="58";//Keypad Enter
        
        export const HIDKEY_KEYPAD__1            ="59";//Keypad 1 End
        export const HIDKEY_KEYPAD__2            ="5a";//Keypad 2 Down
        export const HIDKEY_KEYPAD__3            ="5b";//Keypad 3 PageDn
        export const HIDKEY_KEYPAD__4            ="5c";//Keypad 4 Left
        export const HIDKEY_KEYPAD__5            ="5d";//Keypad 5
        export const HIDKEY_KEYPAD__6            ="5e";//Keypad 6 Right
        export const HIDKEY_KEYPAD__7            ="5f";//Keypad 7 Home
        export const HIDKEY_KEYPAD__8            ="60";//Keypad 8 Up
        export const HIDKEY_KEYPAD__9            ="61";//Keypad 9 PageUp
        export const HIDKEY_KEYPAD__0            ="62";//Keypad 0 Insert
        export const HIDKEY_KPAD__DOT			="63";//Keypad . Delete
        
        
        
        /////////////////////////////////////////////////////
        //definition of key code.......  for PS/2 keyboard scancode set2
        //make code only, break code is ="f0,make-code
        //USA.......(default definition)
        
        export const PS2_BREAK_PRFIXCODE			="f0";
        
        //control key
        export const PS2KEY______NONE			="00";
        export const PS2KEY_____L_CTL			="14";
        export const PS2KEY_____L_SFT			="12";
        export const PS2KEY_____L_ALT			="11";
        
        //export const PS2KEY_____R_CTL			"="E0 ="14
        export const PS2KEY_____R_CTL			="F4";	//using you must parsing data to ="E0 ="14
        export const PS2KEY_____R_SFT			="59";
        export const PS2KEY_____R_ALT			="F1";	//using you must parsing data to ="E0 ="11
        //export const PS2KEY_____R_ALT			="E0 ="11
        
        //general key
        export const PS2KEY____a____A			="1c";// a A
        export const PS2KEY____b____B			="32";// b B
        export const PS2KEY____c____C			="21";// c C
        export const PS2KEY____d____D			="23";// d D
        export const PS2KEY____e____E			="24";// e E
        export const PS2KEY____f____F			="2b";// f F
        export const PS2KEY____g____G			="34";// g G
        export const PS2KEY____h____H			="33";// h H
        export const PS2KEY____i____I			="43";// i I
        export const PS2KEY____j____J			="3b";// j J
        export const PS2KEY____k____K			="42";// k K
        export const PS2KEY____l____L			="4b";// l L
        export const PS2KEY____m____M			="3a";// m M
        export const PS2KEY____n____N			="31";// n N
        export const PS2KEY____o____O			="44";// o O
        export const PS2KEY____p____P			="4d";// p P
        export const PS2KEY____q____Q			="15";// q Q
        export const PS2KEY____r____R			="2d";// r R
        export const PS2KEY____s____S			="1b";// s S
        export const PS2KEY____t____T			="2c";// t T
        export const PS2KEY____u____U			="3c";// u U
        export const PS2KEY____v____V			="2a";// v V
        export const PS2KEY____w____W			="1d";// w W
        export const PS2KEY____x____X			="22";// x X
        export const PS2KEY____y____Y			="35";// y Y
        export const PS2KEY____z____Z			="1a";// z Z
        export const PS2KEY____1_EXCL			="16";// 1 ! Exclamation point
        export const PS2KEY____2_QUOT			="1e";// 2 @ Quotation mark
        export const PS2KEY____3_SHAR			="26";// 3 # Sharp
        export const PS2KEY____4_DOLL			="25";// 4 $ Dollar sign
        export const PS2KEY____5_PERC			="2e";// 5 % Percent sign
        export const PS2KEY____6_CIRC			="36";// 6 ^ Circumflex
        export const PS2KEY____7_AMPE			="3d";// 7 & ampersand
        export const PS2KEY____8_ASTE			="3e";// 8 * asterisk
        export const PS2KEY____9_L_PA			="46";// 9 ( left parenthesis
        export const PS2KEY____0_R_PA			="45";// 0 ) right parenthesis
        export const PS2KEY____RETURN			="5a";// Return
        export const PS2KEY____ESCAPE			="76";// Escape
        export const PS2KEY_BACKSPACE			="66";// Backspace
        export const PS2KEY_______TAB			="0d";// Tab
        export const PS2KEY_____SPACE			="29";// Space
        export const PS2KEY_MIN_UNDER			="4e";// - _ underline
        export const PS2KEY_EQU__PLUS			="55";// = +
        
        
        export const PS2KEY_LBT___LBR			="54";// [ { left bracket,left brace
        export const PS2KEY_RBT___RBR			="5b";// ] } right bracket,right brace
        export const PS2KEY_BSLA_VBAR			="5d";// \ | back slash, vertical bar 
        export const PS2KEY_SEMI__COL			="4c";// ; : semicolon, colon 
        export const PS2KEY_APOS_QUOT			="52";// ' " apostrophe, Quotation mark
        export const PS2KEY_GRAV_TILD			="0e";// ` ~ Grave, Tilde
        export const PS2KEY_COMA___LT			="41";// , < comma, less then sign
        export const PS2KEY_PERIOD_GT			="49";// . > period, greater then sign
        export const PS2KEY_SLASH__QM			="4a";// / ? slash
        export const PS2KEY__CAPSLOCK			="58";//Caps Lock
        export const PS2KEY________F1			="05";//F1
        export const PS2KEY________F2			="06";//F2
        export const PS2KEY________F3			="04";//F3
        export const PS2KEY________F4			="0c";//F4
        export const PS2KEY________F5			="03";//F5
        export const PS2KEY________F6			="0b";//F6
        export const PS2KEY________F7			="83";//F7
        export const PS2KEY________F8			="0a";//F8
        export const PS2KEY________F9			="01";//F9
        export const PS2KEY_______F10			="09";//F10
        export const PS2KEY_______F11			="78";//F11
        export const PS2KEY_______F12			="07";//F12
        //export const PS2KEY_PRINT_SCR			//Print Screen
        export const PS2KEY_SCROLLLOC			="7e";//Scroll Lock
        //export const PS2KEY_____BREAK			//Break (Ctrl-Pause)
        //export const PS2KEY____INSERT			//Insert
        //export const PS2KEY______HOME			//Home
        //export const PS2KEY____PAGEUP			//Page Up
        //export const PS2KEY____DELETE			//Delete
        //export const PS2KEY_______END			//End
        //export const PS2KEY__PAGEDOWN			//Page Down
        
        //export const PS2KEY_ARROW___R			//Right Arrow
        //export const PS2KEY_ARROW___L			//Left Arrow
        //export const PS2KEY_ARROW___D			//Down Arrow
        //export const PS2KEY_ARROW___U			//Up Arrow
        
        //export const PS2KEY_KPAD__DIV			//Keypad /
        export const PS2KEY_KPAD__MUL			="7c";//Keypad *
        export const PS2KEY_KPAD_MINU			="7b";//Keypad -
        export const PS2KEY_KPAD_PLUS			="79";//Keypad +
        //export const PS2KEY_KEYPAD_EN	        //Keypad Enter
        
        export const PS2KEY_KEYPAD__1            ="69";//Keypad 1 End
        export const PS2KEY_KEYPAD__2            ="72";//Keypad 2 Down
        export const PS2KEY_KEYPAD__3            ="7a";//Keypad 3 PageDn
        export const PS2KEY_KEYPAD__4            ="6b";//Keypad 4 Left
        export const PS2KEY_KEYPAD__5            ="73";//Keypad 5
        export const PS2KEY_KEYPAD__6            ="74";//Keypad 6 Right
        export const PS2KEY_KEYPAD__7            ="6c";//Keypad 7 Home
        export const PS2KEY_KEYPAD__8            ="75";//Keypad 8 Up
        export const PS2KEY_KEYPAD__9            ="7d";//Keypad 9 PageUp
        export const PS2KEY_KEYPAD__0            ="70";//Keypad 0 Insert
        export const PS2KEY_KPAD__DOT			="71";//Keypad . Delete
        
        /*
        ;=============================
        ;PC to Keyboard Command Set
        ;=============================
        */
        export const PS2_CMD_RESET				="ff";
        export const PS2_CMD_RESEND				="fe";
        export const PS2_CMD_SCANSET3_0			="f7";
        export const PS2_CMD_SCANSET3_1			="f8";
        export const PS2_CMD_SCANSET3_2			="f9";
        export const PS2_CMD_SCANSET3_3			="fa";
        export const PS2_CMD_SCANSET3_4			="fb";
        export const PS2_CMD_SCANSET3_5			="fc";
        export const PS2_CMD_SCANSET3_6			="fd";
        export const PS2_CMD_SETDEFAULT			="f6";
        export const PS2_CMD_DEFAULTDISABLE		="f5";
        export const PS2_CMD_ENABLE				="f4";
        export const PS2_CMD_SETTYPEMATICRATE	="f3";
        export const PS2_CMD_IDBYTEREQUEST		="f2";
        export const PS2_CMD_INVAILD				="f1";
        export const PS2_CMD_SETSCANSET			="f0";
        export const PS2_CMD_INVAILD0			="ef";
        export const PS2_CMD_ECHO				="ee";
        export const PS2_CMD_INDICATORCONTROL	="ed";
        
        /*
        ;=============================
        ;Keyboard to PC Command Set
        ;=============================
        */
        export const PS2_RSP_ACK					="fa";
        export const PS2_RSP_OVERRUN1			="ff";	//Mark fifo as full for Scan Set1
        export const PS2_RSP_OVERRUN23			="ff";	//Mark fifo as full for Scan Set2,3
        export const PS2_RSP_DIAGNOSTICFAILURE	="fc";
        export const PS2_RSP_BREAKCODEPREFIX		="f0";
        export const PS2_RSP_DIAGCOMPLETION		="aa";
        
        export const PS2_KEYBOARD_ID_XX			="ab";
        export const PS2_KEYBOARD_ID_YY			="83";
        
        export const PS2_KEYBOARD_CUR_SCODE		="02";	//the currentm scan-code of keyboard
        
        export const PS2_SCAN2_BREAK_PREFIX		="f0";	//the prefix code of scancode-set2 
        
        
