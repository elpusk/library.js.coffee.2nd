/**
 * @license MIT
 * Copyright (c) 2025 Elpusk.Co.,Ltd.
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

import * as elpusk_util_keyboard_const from "./elpusk.util.keyboard.const";


//maps ASCII to USB HID-key code.
//gASCToHIDKeyMap[i][j][k] ....... index i language map index, index j is ascii code.. editing 200 item
export const sASCToHIDKeyMap = [
    [	//xxx.English.Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],

    [	//xxx.Spanish.Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"33" ],//7 - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"31" ],//8 - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"34" ],//9 - Spanish
        // 2 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"35" ],//0 - Spanish
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 " - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 & - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//9 ' - Spanish
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 ( - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 ) - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//2 * - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 + - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 - - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 / - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 : - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ; - Spanish
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 < - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 = - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 > - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ? - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @ - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//1 [ - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 ] - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//4 ^ - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _ - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"2f" ],//6 ` - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"33" ],//3 [ - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"34" ],//5 ] - Spanish
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"35" ],//6 ~ - Spanish
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Danish.Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"32" ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,"64" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.French Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.German Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"32" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Italian Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Norwegian	Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"32" ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Swedish Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"32" ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.UK_English Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Israel Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_APOS_QUOT ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_PERIOD_GT ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_COMA___LT ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	//xxx.Turkey Table......
        //[ Modified key,HID key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//4 "
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//2 *
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//3 +
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"32" ],//4 ,
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//5 -
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//6 .
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_SLASH__QM ],//8 :
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"32" ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,"64" ],//0 <
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,"64" ],//2 >
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//4 @
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.HIDKEY_MOD_R_ALT,elpusk_util_keyboard_const.HIDKEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY____3_SHAR ],//4 ^
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_EQU__PLUS ],//5 _
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.HIDKEY_MOD__NONE,elpusk_util_keyboard_const.HIDKEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.HIDKEY_MOD_L_SFT,elpusk_util_keyboard_const.HIDKEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ]
];

/////////////////////////////////////////////////////////////////////////////
//maps ASCII to PS/2 set2 scan-code.
//gAsciiToPS2KeyTable[i][j][k] ....... index i language map index, index j is ascii code.. editing 200 item
export const sASCToPS2KeyMap = [
    [	// xxx.English PS2 keymap
        //[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Spanish PS2 keymap
        //[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"4c" ],//7 - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5d" ],//8 - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"52" ],//9 - Spanish
        // 2 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"0e" ],//0 - Spanish
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 " - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 & - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//9 ' - Spanish
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 ( - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 ) - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//2 * - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 + - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 - - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 / - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 : - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ; - Spanish
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 < - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 = - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//2 > - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ? - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @ - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//1 [ - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 ] - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//4 ^ - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _ - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"54" ],//6 ` - Spanish
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"4c" ],//3 [ - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"52" ],//5 ] - Spanish
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"0e" ],//6 ~ - Spanish
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Danish PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5D" ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,"61" ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.French PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.German PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5D" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Italian PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Norwegian PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5D" ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Swedish PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5D" ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.UK_English PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Israel PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_APOS_QUOT ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SEMI__COL ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_PERIOD_GT ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_COMA___LT ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ],
    [	// xxx.Turkey PS2 keymap		//[ control key key,general key ]
        // 0 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_BACKSPACE ],//8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_______TAB ],//9
        // 1 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____RETURN ],//3 ... CR
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 2 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ "00","00" ],//2
        [ "00","00" ],//3
        [ "00","00" ],//4
        [ "00","00" ],//5
        [ "00","00" ],//6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____ESCAPE ],//7
        [ "00","00" ],//8
        [ "00","00" ],//9
        // 3 ==================
        [ "00","00" ],//0
        [ "00","00" ],//1
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_____SPACE ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//3 !
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//4 "
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//5 #
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//6 $
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//7 %
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//8 &
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//9 '
        // 4 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//0 (
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//1 )
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//2 *
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//3 +
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"5D" ],//4 ,
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//5 -
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//6 .
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//7 /
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//8 0
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____1_EXCL ],//9 1
        // 5 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____2_QUOT ],//0 2
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//1 3
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____4_DOLL ],//2 4
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____5_PERC ],//3 5
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____6_CIRC ],//4 6
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____7_AMPE ],//5 7
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//6 8
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//7 9
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_SLASH__QM ],//8 :
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"5D" ],//9 ;
        // 6 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,"61" ],//0 <
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____0_R_PA ],//1 =
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,"61" ],//2 >
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//3 ?
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//4 @
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____a____A ],//5 A
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____b____B ],//6 B
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____c____C ],//7 C
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____d____D ],//8 D
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____e____E ],//9 E
        // 7 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____f____F ],//0 F
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____g____G ],//1 G
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____h____H ],//2 H
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____i____I ],//3 I
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____j____J ],//4 J
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____k____K ],//5 K
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____l____L ],//6 L
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____m____M ],//7 M
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____n____N ],//8 N
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____o____O ],//9 O
        // 8 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____p____P ],//0 P
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____q____Q ],//1 Q
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____r____R ],//2 R
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____s____S ],//3 S
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____t____T ],//4 T
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____u____U ],//5 U
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____v____V ],//6 V
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____w____W ],//7 W
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____x____X ],//8 X
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____y____Y ],//9 Y
        // 9 ==================
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____z____Z ],//0 Z
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____8_ASTE ],//1 [
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY_MIN_UNDER ],//2
        [ elpusk_util_keyboard_const.PS2KEY_____R_ALT,elpusk_util_keyboard_const.PS2KEY____9_L_PA ],//3 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY____3_SHAR ],//4 ^
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_EQU__PLUS ],//5 _
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 `
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____a____A ],//7 a
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____b____B ],//8 b
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____c____C ],//9 c
        // 10 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____d____D ],//0 d
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____e____E ],//1 e
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____f____F ],//2 f
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____g____G ],//3 g
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____h____H ],//4 h
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____i____I ],//5 i
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____j____J ],//6 j
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____k____K ],//7 k
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____l____L ],//8 l
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____m____M ],//9 m
        // 11 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____n____N ],//0 n
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____o____O ],//1 o
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____p____P ],//2 p
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____q____Q ],//3 q
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____r____R ],//4 r
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____s____S ],//5 s
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____t____T ],//6 t
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____u____U ],//7 u
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____v____V ],//8 v
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____w____W ],//9 w
        // 12 ==================
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____x____X ],//0 x
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____y____Y ],//1 y
        [ elpusk_util_keyboard_const.PS2KEY______NONE,elpusk_util_keyboard_const.PS2KEY____z____Z ],//2 z
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_LBT___LBR ],//3 {
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_BSLA_VBAR ],//4 |
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_RBT___RBR ],//5 ]
        [ elpusk_util_keyboard_const.PS2KEY_____L_SFT,elpusk_util_keyboard_const.PS2KEY_GRAV_TILD ],//6 ~
        [ "00","00" ],//7
        [ "00","00" ],//8
        [ "00","00" ]//9
    ]
];

/***
 * @description get hid key code from ASCII code.
 * @param {number} n_language - lanugage index : type_keyboard_language_index (0~10)
 * @param {number} n_ascii - ascii code : 0~127
 * @param {number} n_item - 0 : modifier code. 1 : Hid key code
 */
export function get_ascii_to_hid_key_map_value(n_language : number, n_ascii : number, n_item : number): string{
    return sASCToHIDKeyMap[n_language][n_ascii][n_item];
}
export function get_ascii_to_ps2_key_map_value(n_language : number, n_ascii : number, n_item : number) : string{
    return sASCToPS2KeyMap[n_language][n_ascii][n_item];
}

export function get_ascii_to_hid_key_map_string(n_language : number): string{
    var s_map = "";

    for( var i = 0; i<sASCToHIDKeyMap[n_language].length; i++  ){
        for( var j = 0; j<sASCToHIDKeyMap[n_language][i].length; j++ ){
            s_map += sASCToHIDKeyMap[n_language][i][j];
        }//end for
    }//end for
    return s_map;
}
export function get_ascii_to_ps2_key_map_string(n_language : number): string{
    var s_map = "";

    for( var i = 0; i<sASCToPS2KeyMap[n_language].length; i++  ){
        for( var j = 0; j<sASCToPS2KeyMap[n_language][i].length; j++ ){
            s_map += sASCToPS2KeyMap[n_language][i][j];
        }//end for
    }//end for
    return s_map;
}



