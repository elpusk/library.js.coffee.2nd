/**
 * @file elpusk.device.usb.hid.lpu237.ts
 * @license MIT
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
 * 
 * @author developer 00000006
 * @copyright (c) 2026 Elpusk.Co.,Ltd.
 * @version 1.15
 * @description elpusk lpu237 device protocol layer library.
 * <br />   2020.4.10 - release 1.0. 
 * <br />   2020.5.12 - release 1.1. 
 * <br />   2020.6.0  - release 1.2.
 * <br />               add this._b_opos_mode and it's getter.
 * <br />               add this._b_config_mode and it's getter.
 * <br />   2020.6.12 - release 1.3.
 * <br />               add generate_run_bootloader() method.
 * <br />   2020.7.14 - release 1.4
 *                    - support ganymede v5.13. support multi-combination. 
 *                    - support callisto v3.21. support multi-combination. 
 * <br />   2020.7.15 - release 1.5
 *                    - fix _generate_set_etxl() missing code.
 * <br />   2020.7.16 - release 1.6
 *                    - support ISO1 ignore mode.
 *                    - support ISO3 ignore mode.
 *                    - support colon ignore mode.
 * <br />   2020.7.17 - release 1.7
 *                    - support system parameter table view.
 *                    - bugfix always displayed even parity.
 * <br />   2020.10.08 -release 1.8
 *                    - support lpu237 hid bootloader.
 * <br />   2020.10.13 -release 1.9
 *                     - support buzzer frequency input on xml setting file.
 * <br />   2022.03.21 -release 1.10
 *                     - support mmd1100 reset interval.( support from firmware ganymede 5.16)
 *                     - fix bug in _get_key_symbol_string_by_hid_key_code_number()
 * <br />   2022.03.29 - release 1.11.0
 *                     - fix bug get_string_html_table() and get_string().
 * <br />   2022.03.29 - release 1.12.0
 *                     - add setting of track order parameter.
 * <br />   2022.03.31 - release 1.12.2
 *                     - fix get_mmd1100_reset_interval_string() bug.(mssing 48)
 * <br />   2022.03.31 - release 1.12.3
 *                     - fix LPU-208D function string MSR & i-button -> MSR & SCR
 * <br />   2022.11.04 - release 1.13
 *                     - add ibutton remove tag and remove pre/posfix. expanded structure to version 4.0 
 * <br />   2025.11.26 - release 1.14
 *                     - add get_type_string() public method.
 * <br />   2026.01.19 - release 1.15
 *                     - add setter public method.
*/

import { hid } from "./elpusk.device.usb.hid";
import * as elpusk_util_keyboard_const from "./elpusk.util.keyboard.const";
import * as elpusk_util_keyboard_map from "./elpusk.util.keyboard.map";
import { util } from "./elpusk.util";

/**
 * enum for changed paramemter type.
 * @private 
 * @readonly
 * @enum {number}
 */
enum _type_change_parameter {
    cp_GlobalPrePostfixSendCondition = 0,//.
    //
    cp_Blank_4bytes = 1,//.
    //
    cp_EnableiButton = 2, //not used. BTC model only.
    cp_Interface = 3,//.
    cp_BuzzerFrequency = 4,//.
    cp_BootRunTime = 5,//not used
    cp_Language = 6,//.
    cp_EnableISO1 = 7,
    cp_EnableISO2 = 8,
    cp_EnableISO3 = 9,
    cp_Direction1 = 10,
    cp_Direction2 = 11,
    cp_Direction3 = 12,
    cp_GlobalPrefix = 13,//.
    cp_GlobalPostfix = 14,//.
    //
    cp_ISO1_NumberCombi = 15,
    cp_ISO2_NumberCombi = 16,
    cp_ISO3_NumberCombi = 17,

    cp_ISO1_Combi0_MaxSize = 18,
    cp_ISO1_Combi1_MaxSize = 19,
    cp_ISO1_Combi2_MaxSize = 20,
    cp_ISO2_Combi0_MaxSize = 21,
    cp_ISO2_Combi1_MaxSize = 22,
    cp_ISO2_Combi2_MaxSize = 23,
    cp_ISO3_Combi0_MaxSize = 24,
    cp_ISO3_Combi1_MaxSize = 25,
    cp_ISO3_Combi2_MaxSize = 26,
    //
    cp_ISO1_Combi0_BitSize = 27,
    cp_ISO1_Combi1_BitSize = 28,
    cp_ISO1_Combi2_BitSize = 29,
    cp_ISO2_Combi0_BitSize = 30,
    cp_ISO2_Combi1_BitSize = 31,
    cp_ISO2_Combi2_BitSize = 32,
    cp_ISO3_Combi0_BitSize = 33,
    cp_ISO3_Combi1_BitSize = 34,
    cp_ISO3_Combi2_BitSize = 35,

    cp_ISO1_Combi0_DataMask = 36,
    cp_ISO1_Combi1_DataMask = 37,
    cp_ISO1_Combi2_DataMask = 38,
    cp_ISO2_Combi0_DataMask = 39,
    cp_ISO2_Combi1_DataMask = 40,
    cp_ISO2_Combi2_DataMask = 41,
    cp_ISO3_Combi0_DataMask = 42,
    cp_ISO3_Combi1_DataMask = 43,
    cp_ISO3_Combi2_DataMask = 44,

    cp_ISO1_Combi0_UseParity = 45,
    cp_ISO1_Combi1_UseParity = 46,
    cp_ISO1_Combi2_UseParity = 47,
    cp_ISO2_Combi0_UseParity = 48,
    cp_ISO2_Combi1_UseParity = 49,
    cp_ISO2_Combi2_UseParity = 50,
    cp_ISO3_Combi0_UseParity = 51,
    cp_ISO3_Combi1_UseParity = 52,
    cp_ISO3_Combi2_UseParity = 53,

    cp_ISO1_Combi0_ParityType = 54,
    cp_ISO1_Combi1_ParityType = 55,
    cp_ISO1_Combi2_ParityType = 56,
    cp_ISO2_Combi0_ParityType = 57,
    cp_ISO2_Combi1_ParityType = 58,
    cp_ISO2_Combi2_ParityType = 59,
    cp_ISO3_Combi0_ParityType = 60,
    cp_ISO3_Combi1_ParityType = 61,
    cp_ISO3_Combi2_ParityType = 62,

    cp_ISO1_Combi0_STX_L = 63,
    cp_ISO1_Combi1_STX_L = 64,
    cp_ISO1_Combi2_STX_L = 65,
    cp_ISO2_Combi0_STX_L = 66,
    cp_ISO2_Combi1_STX_L = 67,
    cp_ISO2_Combi2_STX_L = 68,
    cp_ISO3_Combi0_STX_L = 69,
    cp_ISO3_Combi1_STX_L = 70,
    cp_ISO3_Combi2_STX_L = 71,

    cp_ISO1_Combi0_ETX_L = 72,
    cp_ISO1_Combi1_ETX_L = 73,
    cp_ISO1_Combi2_ETX_L = 74,
    cp_ISO2_Combi0_ETX_L = 75,
    cp_ISO2_Combi1_ETX_L = 76,
    cp_ISO2_Combi2_ETX_L = 77,
    cp_ISO3_Combi0_ETX_L = 78,
    cp_ISO3_Combi1_ETX_L = 79,
    cp_ISO3_Combi2_ETX_L = 80,

    cp_ISO1_Combi0_UseErrorCorrect = 81,
    cp_ISO1_Combi1_UseErrorCorrect = 82,
    cp_ISO1_Combi2_UseErrorCorrect = 83,
    cp_ISO2_Combi0_UseErrorCorrect = 84,
    cp_ISO2_Combi1_UseErrorCorrect = 85,
    cp_ISO2_Combi2_UseErrorCorrect = 86,
    cp_ISO3_Combi0_UseErrorCorrect = 87,
    cp_ISO3_Combi1_UseErrorCorrect = 88,
    cp_ISO3_Combi2_UseErrorCorrect = 89,

    cp_ISO1_Combi0_ECMType = 90,
    cp_ISO1_Combi1_ECMType = 91,
    cp_ISO1_Combi2_ECMType = 92,
    cp_ISO2_Combi0_ECMType = 93,
    cp_ISO2_Combi1_ECMType = 94,
    cp_ISO2_Combi2_ECMType = 95,
    cp_ISO3_Combi0_ECMType = 96,
    cp_ISO3_Combi1_ECMType = 97,
    cp_ISO3_Combi2_ECMType = 98,

    cp_ISO1_Combi0_AddValue = 99,
    cp_ISO1_Combi1_AddValue = 100,
    cp_ISO1_Combi2_AddValue = 101,
    cp_ISO2_Combi0_AddValue = 102,
    cp_ISO2_Combi1_AddValue = 103,
    cp_ISO2_Combi2_AddValue = 104,
    cp_ISO3_Combi0_AddValue = 105,
    cp_ISO3_Combi1_AddValue = 106,
    cp_ISO3_Combi2_AddValue = 107,
    //
    cp_PrivatePrefix10 = 108,
    cp_PrivatePrefix11 = 109,
    cp_PrivatePrefix12 = 110,
    cp_PrivatePrefix20 = 111,
    cp_PrivatePrefix21 = 112,
    cp_PrivatePrefix22 = 113,
    cp_PrivatePrefix30 = 114,
    cp_PrivatePrefix31 = 115,
    cp_PrivatePrefix32 = 116,

    cp_PrivatePostfix10 = 117,
    cp_PrivatePostfix11 = 118,
    cp_PrivatePostfix12 = 119,
    cp_PrivatePostfix20 = 120,
    cp_PrivatePostfix21 = 121,
    cp_PrivatePostfix22 = 122,
    cp_PrivatePostfix30 = 123,
    cp_PrivatePostfix31 = 124,
    cp_PrivatePostfix32 = 125,
    //
    cp_Prefix_iButton = 126,
    cp_Postfix_iButton = 127,
    cp_Prefix_Uart = 128,
    cp_Postfix_Uart = 129,
    cp_BtcConfigData = 130,
    //
    cp_TrackOrder = 131,//.
    cp_iButton_Remove = 132,
    cp_Prefix_iButton_Remove = 133,
    cp_Postfix_iButton_Remove = 134,
}

/**
 * enum for changed paramemter type.
 * @private 
 * @readonly
 * @enum {number}
 */

enum _type_generated_tx_type {
    gt_read_uid = 0,
    gt_change_authkey = 1,
    gt_change_status = 2,
    gt_change_sn = 3,
    gt_enter_config = 4,
    gt_leave_config = 5,
    gt_apply = 6,
    gt_goto_boot = 7,
    gt_enter_opos = 8,
    gt_leave_opos = 9,
    gt_support_mmd1000 = 10,
    gt_type_ibutton = 11,
    gt_type_device = 12,

    // get config series
    gt_get_version = 13,
    gt_get_name = 14,
    gt_get_global_prepostfix_send_condition = 15,
    gt_get_blank_4byets = 16,

    gt_get_interface = 17,
    gt_get_language = 18,
    gt_get_buzzer_count = 19,
    gt_get_boot_run_time = 20,
    gt_get_enable_iso1 = 21,
    gt_get_enable_iso2 = 22,
    gt_get_enable_iso3 = 23,
    gt_get_direction1 = 24,
    gt_get_direction2 = 25,
    gt_get_direction3 = 26,
    gt_get_global_prefix = 27,
    gt_get_global_postfix = 28,

    gt_get_iso1_number_combi = 29,
    gt_get_iso2_number_combi = 30,
    gt_get_iso3_number_combi = 31,

    gt_get_iso1_Combi0_MaxSize = 32,
    gt_get_iso1_Combi1_MaxSize = 33,
    gt_get_iso1_Combi2_MaxSize = 34,
    gt_get_iso2_Combi0_MaxSize = 35,
    gt_get_iso2_Combi1_MaxSize = 36,
    gt_get_iso2_Combi2_MaxSize = 37,
    gt_get_iso3_Combi0_MaxSize = 38,
    gt_get_iso3_Combi1_MaxSize = 39,
    gt_get_iso3_Combi2_MaxSize = 40,

    gt_get_iso1_Combi0_BitSize = 41,
    gt_get_iso1_Combi1_BitSize = 42,
    gt_get_iso1_Combi2_BitSize = 43,
    gt_get_iso2_Combi0_BitSize = 44,
    gt_get_iso2_Combi1_BitSize = 45,
    gt_get_iso2_Combi2_BitSize = 46,
    gt_get_iso3_Combi0_BitSize = 47,
    gt_get_iso3_Combi1_BitSize = 48,
    gt_get_iso3_Combi2_BitSize = 49,

    gt_get_iso1_Combi0_DataMask = 50,
    gt_get_iso1_Combi1_DataMask = 51,
    gt_get_iso1_Combi2_DataMask = 52,
    gt_get_iso2_Combi0_DataMask = 53,
    gt_get_iso2_Combi1_DataMask = 54,
    gt_get_iso2_Combi2_DataMask = 55,
    gt_get_iso3_Combi0_DataMask = 56,
    gt_get_iso3_Combi1_DataMask = 57,
    gt_get_iso3_Combi2_DataMask = 58,

    gt_get_iso1_Combi0_UseParity = 59,
    gt_get_iso1_Combi1_UseParity = 60,
    gt_get_iso1_Combi2_UseParity = 61,
    gt_get_iso2_Combi0_UseParity = 62,
    gt_get_iso2_Combi1_UseParity = 63,
    gt_get_iso2_Combi2_UseParity = 64,
    gt_get_iso3_Combi0_UseParity = 65,
    gt_get_iso3_Combi1_UseParity = 66,
    gt_get_iso3_Combi2_UseParity = 67,

    gt_get_iso1_Combi0_ParityType = 68,
    gt_get_iso1_Combi1_ParityType = 69,
    gt_get_iso1_Combi2_ParityType = 70,
    gt_get_iso2_Combi0_ParityType = 71,
    gt_get_iso2_Combi1_ParityType = 72,
    gt_get_iso2_Combi2_ParityType = 73,
    gt_get_iso3_Combi0_ParityType = 74,
    gt_get_iso3_Combi1_ParityType = 75,
    gt_get_iso3_Combi2_ParityType = 76,

    gt_get_iso1_Combi0_STX_L = 77,
    gt_get_iso1_Combi1_STX_L = 78,
    gt_get_iso1_Combi2_STX_L = 79,
    gt_get_iso2_Combi0_STX_L = 80,
    gt_get_iso2_Combi1_STX_L = 81,
    gt_get_iso2_Combi2_STX_L = 82,
    gt_get_iso3_Combi0_STX_L = 83,
    gt_get_iso3_Combi1_STX_L = 84,
    gt_get_iso3_Combi2_STX_L = 85,

    gt_get_iso1_Combi0_ETX_L = 86,
    gt_get_iso1_Combi1_ETX_L = 87,
    gt_get_iso1_Combi2_ETX_L = 88,
    gt_get_iso2_Combi0_ETX_L = 89,
    gt_get_iso2_Combi1_ETX_L = 90,
    gt_get_iso2_Combi2_ETX_L = 91,
    gt_get_iso3_Combi0_ETX_L = 92,
    gt_get_iso3_Combi1_ETX_L = 93,
    gt_get_iso3_Combi2_ETX_L = 94,

    gt_get_iso1_Combi0_UseErrorCorrect = 95,
    gt_get_iso1_Combi1_UseErrorCorrect = 96,
    gt_get_iso1_Combi2_UseErrorCorrect = 97,
    gt_get_iso2_Combi0_UseErrorCorrect = 98,
    gt_get_iso2_Combi1_UseErrorCorrect = 99,
    gt_get_iso2_Combi2_UseErrorCorrect = 100,
    gt_get_iso3_Combi0_UseErrorCorrect = 101,
    gt_get_iso3_Combi1_UseErrorCorrect = 102,
    gt_get_iso3_Combi2_UseErrorCorrect = 103,

    gt_get_iso1_Combi0_ECMType = 104,
    gt_get_iso1_Combi1_ECMType = 105,
    gt_get_iso1_Combi2_ECMType = 106,
    gt_get_iso2_Combi0_ECMType = 107,
    gt_get_iso2_Combi1_ECMType = 108,
    gt_get_iso2_Combi2_ECMType = 109,
    gt_get_iso3_Combi0_ECMType = 110,
    gt_get_iso3_Combi1_ECMType = 111,
    gt_get_iso3_Combi2_ECMType = 112,

    gt_get_iso1_Combi0_AddValue = 113,
    gt_get_iso1_Combi1_AddValue = 114,
    gt_get_iso1_Combi2_AddValue = 115,
    gt_get_iso2_Combi0_AddValue = 116,
    gt_get_iso2_Combi1_AddValue = 117,
    gt_get_iso2_Combi2_AddValue = 118,
    gt_get_iso3_Combi0_AddValue = 119,
    gt_get_iso3_Combi1_AddValue = 120,
    gt_get_iso3_Combi2_AddValue = 121,

    gt_get_private_prefix10 = 122,
    gt_get_private_prefix11 = 123,
    gt_get_private_prefix12 = 124,
    gt_get_private_prefix20 = 125,
    gt_get_private_prefix21 = 126,
    gt_get_private_prefix22 = 127,
    gt_get_private_prefix30 = 128,
    gt_get_private_prefix31 = 129,
    gt_get_private_prefix32 = 130,

    gt_get_private_postfix10 = 131,
    gt_get_private_postfix11 = 132,
    gt_get_private_postfix12 = 133,
    gt_get_private_postfix20 = 134,
    gt_get_private_postfix21 = 135,
    gt_get_private_postfix22 = 136,
    gt_get_private_postfix30 = 137,
    gt_get_private_postfix31 = 138,
    gt_get_private_postfix32 = 139,

    gt_get_prefix_ibutton = 140,
    gt_get_postfix_ibutton = 141,
    gt_get_prefix_uart = 142,
    gt_get_postfix_uart = 143,
    gt_get_track_order = 144,

    // set config series
    gt_set_global_prepostfix_send_condition = 145,
    gt_set_blank_4byets = 146,

    gt_set_interface = 147,
    gt_set_language = 148,
    get_set_keymap = 149,
    gt_set_buzzer_count = 150,
    gt_set_enable_iso1 = 151,
    gt_set_enable_iso2 = 152,
    gt_set_enable_iso3 = 153,
    gt_set_direction1 = 154,
    gt_set_direction2 = 155,
    gt_set_direction3 = 156,
    gt_set_global_prefix = 157,
    gt_set_global_postfix = 158,

    gt_set_iso1_number_combi = 159,
    gt_set_iso2_number_combi = 160,
    gt_set_iso3_number_combi = 161,

    gt_set_iso1_Combi0_MaxSize = 162,
    gt_set_iso1_Combi1_MaxSize = 163,
    gt_set_iso1_Combi2_MaxSize = 164,
    gt_set_iso2_Combi0_MaxSize = 165,
    gt_set_iso2_Combi1_MaxSize = 166,
    gt_set_iso2_Combi2_MaxSize = 167,
    gt_set_iso3_Combi0_MaxSize = 168,
    gt_set_iso3_Combi1_MaxSize = 169,
    gt_set_iso3_Combi2_MaxSize = 170,

    gt_set_iso1_Combi0_BitSize = 171,
    gt_set_iso1_Combi1_BitSize = 172,
    gt_set_iso1_Combi2_BitSize = 173,
    gt_set_iso2_Combi0_BitSize = 174,
    gt_set_iso2_Combi1_BitSize = 175,
    gt_set_iso2_Combi2_BitSize = 176,
    gt_set_iso3_Combi0_BitSize = 177,
    gt_set_iso3_Combi1_BitSize = 178,
    gt_set_iso3_Combi2_BitSize = 179,

    gt_set_iso1_Combi0_DataMask = 180,
    gt_set_iso1_Combi1_DataMask = 181,
    gt_set_iso1_Combi2_DataMask = 182,
    gt_set_iso2_Combi0_DataMask = 183,
    gt_set_iso2_Combi1_DataMask = 184,
    gt_set_iso2_Combi2_DataMask = 185,
    gt_set_iso3_Combi0_DataMask = 186,
    gt_set_iso3_Combi1_DataMask = 187,
    gt_set_iso3_Combi2_DataMask = 188,

    gt_set_iso1_Combi0_UseParity = 189,
    gt_set_iso1_Combi1_UseParity = 190,
    gt_set_iso1_Combi2_UseParity = 191,
    gt_set_iso2_Combi0_UseParity = 192,
    gt_set_iso2_Combi1_UseParity = 193,
    gt_set_iso2_Combi2_UseParity = 194,
    gt_set_iso3_Combi0_UseParity = 195,
    gt_set_iso3_Combi1_UseParity = 196,
    gt_set_iso3_Combi2_UseParity = 197,

    gt_set_iso1_Combi0_ParityType = 198,
    gt_set_iso1_Combi1_ParityType = 199,
    gt_set_iso1_Combi2_ParityType = 200,
    gt_set_iso2_Combi0_ParityType = 201,
    gt_set_iso2_Combi1_ParityType = 202,
    gt_set_iso2_Combi2_ParityType = 203,
    gt_set_iso3_Combi0_ParityType = 204,
    gt_set_iso3_Combi1_ParityType = 205,
    gt_set_iso3_Combi2_ParityType = 206,

    gt_set_iso1_Combi0_STX_L = 207,
    gt_set_iso1_Combi1_STX_L = 208,
    gt_set_iso1_Combi2_STX_L = 209,
    gt_set_iso2_Combi0_STX_L = 210,
    gt_set_iso2_Combi1_STX_L = 211,
    gt_set_iso2_Combi2_STX_L = 212,
    gt_set_iso3_Combi0_STX_L = 213,
    gt_set_iso3_Combi1_STX_L = 214,
    gt_set_iso3_Combi2_STX_L = 215,

    gt_set_iso1_Combi0_ETX_L = 216,
    gt_set_iso1_Combi1_ETX_L = 217,
    gt_set_iso1_Combi2_ETX_L = 218,
    gt_set_iso2_Combi0_ETX_L = 219,
    gt_set_iso2_Combi1_ETX_L = 220,
    gt_set_iso2_Combi2_ETX_L = 221,
    gt_set_iso3_Combi0_ETX_L = 222,
    gt_set_iso3_Combi1_ETX_L = 223,
    gt_set_iso3_Combi2_ETX_L = 224,

    gt_set_iso1_Combi0_UseErrorCorrect = 225,
    gt_set_iso1_Combi1_UseErrorCorrect = 226,
    gt_set_iso1_Combi2_UseErrorCorrect = 227,
    gt_set_iso2_Combi0_UseErrorCorrect = 228,
    gt_set_iso2_Combi1_UseErrorCorrect = 229,
    gt_set_iso2_Combi2_UseErrorCorrect = 230,
    gt_set_iso3_Combi0_UseErrorCorrect = 231,
    gt_set_iso3_Combi1_UseErrorCorrect = 232,
    gt_set_iso3_Combi2_UseErrorCorrect = 233,

    gt_set_iso1_Combi0_ECMType = 234,
    gt_set_iso1_Combi1_ECMType = 235,
    gt_set_iso1_Combi2_ECMType = 236,
    gt_set_iso2_Combi0_ECMType = 237,
    gt_set_iso2_Combi1_ECMType = 238,
    gt_set_iso2_Combi2_ECMType = 239,
    gt_set_iso3_Combi0_ECMType = 240,
    gt_set_iso3_Combi1_ECMType = 241,
    gt_set_iso3_Combi2_ECMType = 242,

    gt_set_iso1_Combi0_AddValue = 243,
    gt_set_iso1_Combi1_AddValue = 244,
    gt_set_iso1_Combi2_AddValue = 245,
    gt_set_iso2_Combi0_AddValue = 246,
    gt_set_iso2_Combi1_AddValue = 247,
    gt_set_iso2_Combi2_AddValue = 248,
    gt_set_iso3_Combi0_AddValue = 249,
    gt_set_iso3_Combi1_AddValue = 250,
    gt_set_iso3_Combi2_AddValue = 251,

    gt_set_private_prefix10 = 252,
    gt_set_private_prefix11 = 253,
    gt_set_private_prefix12 = 254,
    gt_set_private_prefix20 = 255,
    gt_set_private_prefix21 = 256,
    gt_set_private_prefix22 = 257,
    gt_set_private_prefix30 = 258,
    gt_set_private_prefix31 = 259,
    gt_set_private_prefix32 = 260,

    gt_set_private_postfix10 = 261,
    gt_set_private_postfix11 = 262,
    gt_set_private_postfix12 = 263,
    gt_set_private_postfix20 = 264,
    gt_set_private_postfix21 = 265,
    gt_set_private_postfix22 = 266,
    gt_set_private_postfix30 = 267,
    gt_set_private_postfix31 = 268,
    gt_set_private_postfix32 = 269,

    gt_set_prefix_ibutton = 270,
    gt_set_postfix_ibutton = 271,
    gt_set_prefix_uart = 272,
    gt_set_postfix_uart = 273,
    gt_set_track_order = 274,

    gt_get_version_structure = 275,
    gt_get_ibutton_remove = 276,
    gt_get_prefix_ibutton_remove = 277,
    gt_get_postfix_ibutton_remove = 278,

    gt_set_ibutton_remove = 279,
    gt_set_prefix_ibutton_remove = 280,
    gt_set_postfix_ibutton_remove = 281,
}

/**
 * the offset value of system parameters. generated by tools_gen_lpu237_data.exe
 * @private
 * @readonly
 * @constant {number}
 * @description 
 */
const _type_system_offset = {
    SYS_OFFSET_VERSION: 28,
    SYS_OFFSET_VERSION_STRUCTURE: 8,
    SYS_OFFSET_NAME: 12,
    SYS_OFFSET_G_TAG_CONDITION: 83,
    SYS_OFFSET_CONTAINER_TRACK_ORDER: 91,
    SYS_OFFSET_BLANK_4BYTES: 0,
    SYS_OFFSET_INTERFACE: 42,
    SYS_OFFSET_KEYMAP: 103,
    SYS_OFFSET_BUZZER_FREQ: 43,
    SYS_OFFSET_BOOT_RUN_TIME: 51,
    SYS_OFFSET_ENABLE_TRACK: [171, 359, 547],
    SYS_OFFSET_DIRECTION: [201, 389, 577], //zero combination only
    SYS_OFFSET_G_PRE: 141,
    SYS_OFFSET_G_POST: 156,
    SYS_OFFSET_COMBINATION: [172, 360, 548],
    SYS_OFFSET_ACTIVE_COMBI: [173, 361, 549],
    SYS_OFFSET_MAX_SIZE: [
        [174, 175, 176],
        [361, 362, 363],
        [548, 549, 550]
    ],
    SYS_OFFSET_BIT_SIZE: [
        [177, 178, 179],
        [364, 365, 366],
        [551, 552, 553]
    ],
    SYS_OFFSET_DATA_MASK: [
        [180, 181, 182],
        [367, 368, 369],
        [554, 555, 556]
    ],
    SYS_OFFSET_USE_PARITY: [
        [183, 184, 185],
        [370, 371, 372],
        [557, 558, 559]
    ],
    SYS_OFFSET_PARITY_TYPE: [
        [186, 187, 188],
        [373, 374, 375],
        [560, 561, 562]
    ],
    SYS_OFFSET_STXL: [
        [189, 190, 191],
        [376, 377, 378],
        [563, 564, 565]
    ],
    SYS_OFFSET_ETXL: [
        [192, 193, 194],
        [379, 380, 381],
        [566, 567, 568]
    ],
    SYS_OFFSET_USE_ERROR_CORRECT: [
        [195, 196, 197],
        [382, 383, 384],
        [569, 570, 571]
    ],
    SYS_OFFSET_ECM_TYPE: [
        [198, 199, 200],
        [385, 386, 387],
        [572, 573, 574]
    ],
    SYS_OFFSET_ADD_VALUE: [
        [208, 209, 210],
        [395, 396, 397],
        [582, 583, 584]
    ],
    SYS_OFFSET_P_PRE: [
        [244, 259, 274],
        [431, 446, 461],
        [618, 633, 648]
    ],
    SYS_OFFSET_P_POST: [
        [289, 304, 319],
        [476, 491, 506],
        [663, 678, 693]
    ],
    SYS_OFFSET_IBUTTON_G_PRE: 762,
    SYS_OFFSET_IBUTTON_G_POST: 777,
    SYS_OFFSET_UART_G_PRE: 822,
    SYS_OFFSET_UART_G_POST: 837,
    SYS_OFFSET_CONTAINER_MAP_INDEX: 103,
    SYS_OFFSET_INFOMSR_MAP_INDEX: [334, 521, 708],
    SYS_OFFSET_IBUTTON_REMOVE: 852,
    SYS_OFFSET_IBUTTON_G_PRE_REMOVE: 923,
    SYS_OFFSET_IBUTTON_G_POST_REMOVE: 938,
} as const;

/**
 * the size value of system parameters.
 * generated by tools_gen_lpu237_data.exe
 * @private
 * @readonly
 * @constant {number}
 */
const _type_system_size = {
    SYS_SIZE_VERSION: 4,
    SYS_SIZE_VERSION_STRUCTURE: 4,
    SYS_SIZE_NAME: 16,
    SYS_SIZE_G_TAG_CONDITION: 4,
    SYS_SIZE_CONTAINER_TRACK_ORDER: 12,
    SYS_SIZE_BLANK_4BYTES: 4,
    SYS_SIZE_INTERFACE: 1,
    SYS_SIZE_KEYMAP: 4,
    SYS_SIZE_BUZZER_FREQ: 4,
    SYS_SIZE_BOOT_RUN_TIME: 4,
    SYS_SIZE_ENABLE_TRACK: [1, 1, 1],
    SYS_SIZE_DIRECTION: [1, 1, 1],
    SYS_SIZE_G_PRE: 15,
    SYS_SIZE_G_POST: 15,
    SYS_SIZE_COMBINATION: [1, 1, 1],
    SYS_SIZE_ACTIVE_COMBI: [1, 1, 1],
    SYS_SIZE_MAX_SIZE: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_BIT_SIZE: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_DATA_MASK: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_USE_PARITY: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_PARITY_TYPE: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_STXL: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_ETXL: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_USE_ERROR_CORRECT: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_ECM_TYPE: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_ADD_VALUE: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    SYS_SIZE_P_PRE: [
        [15, 15, 15],
        [15, 15, 15],
        [15, 15, 15]
    ],
    SYS_SIZE_P_POST: [
        [15, 15, 15],
        [15, 15, 15],
        [15, 15, 15]
    ],
    SYS_SIZE_IBUTTON_G_PRE: 15,
    SYS_SIZE_IBUTTON_G_POST: 15,
    SYS_SIZE_UART_G_PRE: 15,
    SYS_SIZE_UART_G_POST: 15,
    SYS_SIZE_CONTAINER_MAP_INDEX: 4,
    SYS_SIZE_INFOMSR_MAP_INDEX: [4, 4, 4],
    SYS_SIZE_IBUTTON_REMOVE: 41,
    SYS_SIZE_IBUTTON_G_PRE_REMOVE: 15,
    SYS_SIZE_IBUTTON_G_POST_REMOVE: 15
} as const;

enum _type_format {
    ef_decimal = 0,
    ef_heximal = 1,
    ef_ascii = 2
}

/** 
 * the definition of request data in data field.
 * @private 
 * @readonly
 * @enum {string}
*/
enum _type_cmd {
    REQ_CHANGE_AUTH_KEY = "43",
    REQ_CHANGE_EN_KEY = "4b",

    REQ_CHANGE_STATUS = "4d",
    REQ_CHANGE_SN = "53",
    REQ_CONFIG = "41",
    REQ_APPLY = "42",

    REQ_ENTER_CS = "58",
    REQ_LEAVE_CS = "59",

    REQ_GOTO_BOOT = "47",

    REQ_ENTER_OPOS = "49",
    REQ_LEAVE_OPOS = "4a",

    REQ_IS_STANDARD = "44",
    REQ_IS_ONLY_IBUTTON = "57",
    REQ_GET_ID = "55",
    REQ_IS_MMD1000 = "4e"
}

/** * @description the definition of config request type
 */
enum _type_system_request_config {
    request_config_set = 200,
    request_config_get = 201
}

/** * @description the definition of device manufacturer
 */
enum _type_manufacturer {
    mf_elpusk = 0,
    mf_btc = 1
}

/** * @description Error detail structure
 */
interface ErrorDetail {
    name: string;
    message: string;
}

/** * @description error code to error message map.
 */
const _error_name_message: readonly ErrorDetail[] = [
    { name: 'en_e_parameter', message: "invalid parameter" } // 원본의 'invalied' 오타를 'invalid'로 교정했습니다.
] as const;

/**
 * @description 장치 기능(Functionality)의 정의
 */
export enum type_function {
    fun_none = 0,
    fun_msr = 1,
    fun_msr_ibutton = 2,
    fun_ibutton = 3
}

/**
 * @readonly
 * @description 마그네틱 카드 읽기 방향 정의
 */
export enum type_direction {
    /** 양방향 읽기 (순방향 및 역방향) */
    dir_bidectional = 0,
    /** 순방향 읽기 전용 */
    dir_forward = 1,
    /** 역방향 읽기 전용 */
    dir_backward = 2
}


/**
 * @description the definition of device interface
 */
export enum type_system_interface {
    system_interface_usb_keyboard = 0,      // system interface is USB keyboard.
    system_interface_usb_msr = 1,           // system interface is USB MSR(generic HID interface).
    system_interface_uart = 10,             // system interface is uart.
    system_interface_ps2_stand_alone = 20,  // system interface is PS2 stand along mode.
    system_interface_ps2_bypass = 21,       // system interface is bypass mode.
    system_interface_by_hw_setting = 100    // system interface is determined by HW Dip switch
}

/** 
 * @description the definition of device language map index
 */
export enum type_keyboard_language_index {
    language_map_index_english = 0,    // U.S English
    language_map_index_spanish = 1,
    language_map_index_danish = 2,
    language_map_index_french = 3,
    language_map_index_german = 4,
    language_map_index_italian = 5,
    language_map_index_norwegian = 6,
    language_map_index_swedish = 7,
    language_map_index_uk_english = 8,
    language_map_index_israel = 9,
    language_map_index_turkey = 10
}

/** 
 * @readonly
 * @enum {number}
 * @description the definition of parity bit type
 */
export enum type_parity {
    parity_even = 0,    // even parity
    parity_odd = 1      // odd parity
}


/**
 * @readonly
 * @enum {number}
 * @description the definition of error correction type
 */
export enum type_error_correct {
    /** Longitudinal Redundancy Check */
    error_correct_lrc = 0,
    /** Inversion LRC */
    error_correct_inv_lrc = 1,
    /** Cyclic Redundancy Check */
    error_correct_crc = 2
}

/** * @private 
 * @readonly
 * @description the definition of ISO7811 magnetic card track number
 */
enum _type_msr_track_Numer {
    iso1_track = 0,
    iso2_track = 1,
    iso3_track = 2,
    iso_global = 10
}

/** * @private 
 * @readonly
 * @description the definition of i-button reading mode.
 */
enum _type_ibutton_mode {
    ibutton_none = 0x02,
    ibutton_zeros = 0x00,
    ibutton_f12 = 0x01,
    ibutton_zeros7 = 0x04,
    ibutton_addmit = 0x08
}



export class lpu237 extends hid {

    private readonly _const_min_size_request_header: number = 3;
    private readonly _const_min_size_response_header: number = 3;
    private readonly _const_the_number_of_track: number = 3;
    private static readonly _const_the_number_of_combination: number = 3;
    private readonly _const_the_size_of_name: number = 16;
    private readonly _const_the_size_of_uid: number = 4 * 4;
    private readonly _const_the_size_of_system_blank: number = 4;
    private readonly _const_the_number_of_frequency: number = 22;
    private readonly _const_the_number_of_support_language: number = 11;	//the number of supported language.
    private readonly _const_max_size_tag_byte: number = 14;
    private readonly _const_max_size_tag_key: number = this._const_max_size_tag_byte / 2;

    private readonly _const_max_size_tag_remove_byte: number = 40;
    private readonly _const_max_size_tag_remove_key: number = this._const_max_size_tag_remove_byte / 2;

    private readonly _const_address_system_hid_key_map_offset: number = 0x400;	//size 1K
    private readonly _const_address_system_ps2_key_map_offset: number = 0x800;	//size 1K
    private readonly _const_default_buzzer_count_old: number = 25000; //at less then callisto 3.15, ganymede 5.7.
    private readonly _const_default_buzzer_count: number = 26000;    // default buzzer count of plus generator.
    private readonly _const_default_buzzer_count_for_wiznova_board: number = 16000;	// default buzzer count. ganymede.
    private readonly _const_default_buzzer_count_for_off: number = 5000;    // default buzzer count of plus generator for buzzer off status.

    // 내부 큐 및 모드 상태
    private _deque_generated_tx: number[] = [];
    private _dequeu_s_tx: string[] = [];
    private _dequeu_s_rx: string[] = [];
    private _b_config_mode: boolean = false;
    private _b_opos_mode: boolean = false;
    private _set_change_parameter: _type_change_parameter[] = []; // 타입에 따라 구체화 필요

    // 장치 정보
    private _b_global_pre_postfix_send_condition: boolean = false; //default - any track success - send global tag
    private _n_manufacture: number = _type_manufacturer.mf_elpusk;
    private _s_uid: string | null = null;
    private _n_device_function: number = type_function.fun_none;
    private _version: number[] = [0, 0, 0, 0];
    private _version_structure: number[] = [0, 0, 0, 0];
    private _b_is_hid_boot: boolean = false;
    private _b_removed_key_map_table: boolean = false;

    // 장치 타입 파라미터
    private _b_device_is_mmd1000: boolean = false;
    private _b_device_is_ibutton_only: boolean = false;
    private _b_device_is_standard: boolean = false;

    // 시스템 인터페이스 및 언어
    private _n_interface: number = type_system_interface.system_interface_usb_keyboard;
    private _dw_buzzer_count: number = this._const_default_buzzer_count;
    private _dw_boot_run_time: number = 15000;
    private _n_language_index: number = type_keyboard_language_index.language_map_index_english;

    // MSR 공통 설정
    private _b_enable_iso: boolean[] = [true, true, true];
    private _n_direction: number[] = [type_direction.dir_bidectional, type_direction.dir_bidectional, type_direction.dir_bidectional];
    private _n_order: number[] = [0, 1, 2];
    private _s_global_prefix: string | null = null;
    private _s_global_postfix: string | null = null;

    // MSR 트랙별 조합(Combination 0~2) 설정 - 3x3 행렬 구조
    private _n_number_combination: number[] = [1, 1, 1];
    private _n_max_size: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _n_bit_size: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _c_data_mask: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _b_use_parity: boolean[][] = [[true, true, true], [true, true, true], [true, true, true]];
    private _n_parity_type: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _c_stxl: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _c_etxl: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _b_use_ecm: boolean[][] = [[true, true, true], [true, true, true], [true, true, true]];
    private _n_ecm_type: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _n_add_value: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private _s_private_prefix: (string | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
    private _s_private_postfix: (string | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];

    // iButton 관련 설정
    private _s_prefix_ibutton: string | null = null;
    private _s_postfix_ibutton: string | null = null;
    private _s_ibutton_remove: string | null = null;
    private _s_prefix_ibutton_remove: string | null = null;
    private _s_postfix_ibutton_remove: string | null = null;

    // 시스템 예약/기타 설정 (cBlank)
    private _c_blank: number[] = [0, 0, 0, 0];

    // UART 및 기타
    private _s_prefix_uart: string | null = null;
    private _s_postfix_uart: string | null = null;
    private _token_format: number = _type_format.ef_decimal;
    private _s_name: string | null = null;

    // 실시간 데이터 상태 (MSR)
    private _array_s_card_data: string[] = ["", "", ""];
    private _array_n_card_error_code: number[] = [0, 0, 0];

    // 실시간 데이터 상태 (iButton)
    private _s_ibutton_data: string = "";
    private _n_ibutton_error_code: number = 0;
    private _b_ignore_ibutton_data: boolean = true;


    private _DIRECTION_MAP: Record<string, number> = {
    'Bidirectional': type_direction.dir_bidectional,
    'Forward': type_direction.dir_forward,
    'Backward': type_direction.dir_backward
    };    

    ////////////////////////////////////////
    // setter
    public set_global_pre_postfix_send_condition = (b_all_track_good:boolean): void =>{
        if( this._b_global_pre_postfix_send_condition !== b_all_track_good ){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_GlobalPrePostfixSendCondition );
            this._b_global_pre_postfix_send_condition = b_all_track_good;
        }
    }

    public set_interface = (n_inf : type_system_interface):void => {
        if(this._n_interface !== n_inf){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Interface );
            this._n_interface = n_inf;
        }
    }

    public set_buzzer_count = (dw_buzzer_count:number): void => {
        if(this._dw_buzzer_count !== dw_buzzer_count){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_BuzzerFrequency );
            this._dw_buzzer_count = dw_buzzer_count;
        }
    }

    public set_boot_run_time = (dw_boot_run_time:number):void => {
        if( this._dw_boot_run_time !== dw_boot_run_time ){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_BootRunTime );
            this._dw_boot_run_time = dw_boot_run_time;
        }
    }

    public set_language_index = (n_language_index:type_keyboard_language_index):void => {
        if(this._n_language_index !== n_language_index){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Language );
            this._n_language_index = n_language_index;
        }
    }

    public set_enable_iso = (n_track :number,b_enable_iso:boolean):void => {
        if(n_track>=0 && n_track<=2){
            if( this._b_enable_iso[n_track] !== b_enable_iso ){
                util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_EnableISO1+n_track );
                this._b_enable_iso[n_track] = b_enable_iso;
            }
        }
    }

    public set_direction = (n_track :number,n_direction : type_direction):void => {
        if(n_track>=0 && n_track<=2){
            if( this._n_direction[n_track] !== n_direction){
                util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Direction1+n_track );
                this._n_direction[n_track] = n_direction;
            }
        }
    }

    public set_direction_by_string = (n_track :number,s_direction : string):void => {
        if(n_track>=0 && n_track<=2){
            // s_direction 유효성 검사: _DIRECTION_MAP의 키인지 확인
            const validDirectionKeys = Object.keys(this._DIRECTION_MAP);
            if (validDirectionKeys.includes(s_direction)) {            
                let t = this._DIRECTION_MAP[s_direction];

                if( this._n_direction[n_track] !== t){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Direction1+n_track );
                    this._n_direction[n_track] = t;
                }
            }
        }
    }

    public set_order = (ar_order:number[]): void => {
        if(ar_order.length === 3){
            for (let i = 0; i < ar_order.length; i++) {
                if (this._n_order[i] !== ar_order[i]){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_TrackOrder );
                    this._n_order[i] = ar_order[i];
                }
            }
        }
    }

    public set_global_prefix = (s_tag: string | null):void => {
        if(this._s_global_prefix !== s_tag){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_GlobalPrefix );
            this._s_global_prefix = s_tag;
        }
    }

    public set_global_postfix = (s_tag: string | null):void => {
        if( this._s_global_postfix !== s_tag ){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_GlobalPostfix );
            this._s_global_postfix = s_tag;
        }
    }

    public set_number_combination = (n_track :number,n_number_combination : number):void => {
        if(n_track>=0 && n_track<=2){
            if( this._n_number_combination[n_track] !== n_number_combination ){
                util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_NumberCombi+n_track );
                this._n_number_combination[n_track] = n_number_combination;
            }
        }
    }

    public set_msr_max_size = (n_track :number,n_combi :number,n_max_size:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._n_max_size[n_track][n_combi] !== n_max_size){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_MaxSize+ n_track*3+n_combi);
                    this._n_max_size[n_track][n_combi] = n_max_size;
                }
            }
        }
    }

    public set_msr_bit_size = (n_track :number,n_combi :number,n_bit_size:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if(this._n_bit_size[n_track][n_combi] !== n_bit_size){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_BitSize+ n_track*3+n_combi);
                    this._n_bit_size[n_track][n_combi] = n_bit_size;
                }
            }
        }
    }

    public set_msr_data_mask = (n_track :number,n_combi :number,c_data_mask:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._c_data_mask[n_track][n_combi] !== c_data_mask ){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_DataMask+ n_track*3+n_combi);
                    this._c_data_mask[n_track][n_combi] = c_data_mask;
                }
            }
        }
    }

    public set_msr_use_parity = (n_track :number,n_combi :number,b_use_parity:boolean):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._b_use_parity[n_track][n_combi] !== b_use_parity ){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_UseParity+ n_track*3+n_combi);
                    this._b_use_parity[n_track][n_combi] = b_use_parity;
                }
            }
        }
    }

    public set_msr_parity_type = (n_track :number,n_combi :number,pt:type_parity):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._n_parity_type[n_track][n_combi] !== pt ){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_ParityType+ n_track*3+n_combi);
                    this._n_parity_type[n_track][n_combi] = pt;
                }
            }
        }
    }

    public set_msr_stxl = (n_track :number,n_combi :number,c_stxl:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._c_stxl[n_track][n_combi] !== c_stxl){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_STX_L+ n_track*3+n_combi);
                    this._c_stxl[n_track][n_combi] = c_stxl;
                }
            }
        }
    }

    public set_msr_etxl = (n_track :number,n_combi :number,c_etxl:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if(this._c_etxl[n_track][n_combi] !== c_etxl){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_ETX_L+ n_track*3+n_combi);
                    this._c_etxl[n_track][n_combi] = c_etxl;
                }
            }
        }
    }

    public set_msr_use_ecm = (n_track :number,n_combi :number,b_use_ecm:boolean):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if(this._b_use_ecm[n_track][n_combi] !== b_use_ecm){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_UseErrorCorrect+ n_track*3+n_combi);
                    this._b_use_ecm[n_track][n_combi] = b_use_ecm;
                }
            }
        }
    }

    public set_msr_ecm_type = (n_track :number,n_combi :number,et:type_error_correct):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if(this._n_ecm_type[n_track][n_combi] !== et){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_ECMType+ n_track*3+n_combi);
                    this._n_ecm_type[n_track][n_combi] = et;
                }
            }
        }
    }

    public set_msr_add_value = (n_track :number,n_combi :number,n_add_value:number):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._n_add_value[n_track][n_combi] !== n_add_value){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_ISO1_Combi0_AddValue+ n_track*3+n_combi);
                    this._n_add_value[n_track][n_combi] = n_add_value;
                }
            }
        }
    }

    public set_msr_private_prefix = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if( this._s_private_prefix[n_track][n_combi] !== s_tag){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_PrivatePrefix10+ n_track*3+n_combi);
                    this._s_private_prefix[n_track][n_combi] = s_tag;
                }
            }
        }
    }

    public set_msr_private_postfix = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if(n_track>=0 && n_track<=2){
            if(n_combi>=0 && n_combi<=2){
                if(this._s_private_postfix[n_track][n_combi] !== s_tag){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_PrivatePostfix10+ n_track*3+n_combi);
                    this._s_private_postfix[n_track][n_combi] = s_tag;
                }
            }
        }
    }

    public set_prefix_ibutton = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if( this._s_prefix_ibutton !== s_tag){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Prefix_iButton);
            this._s_prefix_ibutton = s_tag;
        }
    }

    public set_postfix_ibutton = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if(this._s_postfix_ibutton !== s_tag){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Postfix_iButton);
            this._s_postfix_ibutton = s_tag;
        }
    }

    public set_ibutton_remove = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if( this._s_ibutton_remove !== s_tag){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_iButton_Remove);
            this._s_ibutton_remove = s_tag;
        }
    }

    public set_prefix_ibutton_remove = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if( this._s_prefix_ibutton_remove !== s_tag ){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Prefix_iButton_Remove);
            this._s_prefix_ibutton_remove = s_tag;
        }
    }

    public set_postfix_ibutton_remove = (n_track :number, n_combi :number, s_tag:string|null ):void => {
        if(this._s_postfix_ibutton_remove !== s_tag){
            util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Postfix_iButton_Remove);
            this._s_postfix_ibutton_remove = s_tag;
        }
    }

    public set_blank = (ar_blank:number[]):void => {
        if(ar_blank.length === 4 ){
            for (let i = 0; i < ar_blank.length; i++) {
                if( this._c_blank[i] !== ar_blank[i] ){
                    util.insert_to_set( this._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                    this._c_blank[i] = ar_blank[i];
                }
            }
        }
    }


    /** * @description get error message with error name
     * @param errorName error name
     * @returns error message or empty string if none error.
     */
    private _get_error_message = (errorName?: string): string => {
        if (!errorName) {
            return "";
        }
        const errorEntry = _error_name_message.find(err => err.name === errorName);
        return errorEntry ? errorEntry.message : "";
    };

    /**
     * @description 에러 이름을 기반으로 Error 객체를 생성합니다.
     * @param name 에러 이름 (예: 'en_e_parameter')
     * @returns 설정된 name과 message를 가진 Error 객체
     */
    private _get_error_object = (name: string): Error => {
        // 1. 이전에 정의한 함수를 통해 메시지를 가져옵니다.
        const message = this._get_error_message(name);

        // 2. Error 객체를 생성합니다.
        const error = new Error(message);

        // 3. Error 객체의 name 속성을 인자로 받은 이름으로 설정합니다.
        error.name = name;

        return error;
    };

    /**
     * @description 키 심볼 문자열을 기반으로 HID Modifier 16진수 문자열을 반환합니다.
     * @param keySymbol "c"(Control), "s"(Shift), "a"(Alt)의 조합 (예: "cs", "sa")
     * @returns 2자리 16진수 문자열 (예: "03", "00")
     */
    private _get_hid_modifier_code_hex_string_by_key_symbol = (keySymbol: string): string | null => {
        // 1. 유효성 검사
        if (typeof keySymbol !== 'string') {
            return null;
        }

        if (keySymbol.length === 0) {
            return "00";
        }

        // 2. 비트 마스크 연산
        let modifier = 0;

        // Left Control: 0x01 (2^0)
        if (keySymbol.includes("c")) {
            modifier |= 0x01;
        }
        // Left Shift: 0x02 (2^1)
        if (keySymbol.includes("s")) {
            modifier |= 0x02;
        }
        // Left Alt: 0x04 (2^2)
        if (keySymbol.includes("a")) {
            modifier |= 0x04;
        }

        // 3. 2자리 16진수 문자열로 변환 (앞에 0 채우기)
        // 원본의 "0" + n.toString(16) 방식보다 안전한 padStart를 사용합니다.
        return modifier.toString(16).padStart(2, '0');
    };

    /**
     * @description HID Modifier 숫자를 해석하여 해당하는 키 심볼 문자열을 반환합니다.
     * @param hidModifierCode HID Modifier 상태를 나타내는 숫자 (0~255)
     * @returns 조합된 심볼 문자열 (예: "left_shiftleft_control")
     */
    private _get_key_symbol_string_by_hid_modifier_code_number = (hidModifierCode: number): string => {
        // 1. 유효성 검사
        if (typeof hidModifierCode !== 'number') {
            return "";
        }

        let symbols: string[] = [];

        // 2. 비트 플래그 확인 (비트 연산)
        // Left Shift (Bit 1, 0x02)
        if (hidModifierCode & 0x02) {
            symbols.push("left_shift");
        }

        // Left Control (Bit 0, 0x01)
        if (hidModifierCode & 0x01) {
            symbols.push("left_control");
        }

        // Left Alt (Bit 2, 0x04)
        if (hidModifierCode & 0x04) {
            symbols.push("left_alt");
        }

        // 3. 배열을 문자열로 결합
        // 원본처럼 딱 붙여서 출력하려면 join("")을 사용합니다.
        return symbols.join("");
    };


    /**
     * @description 키 심볼 또는 0x가 포함된 hex 문자열을 HID 키코드(hex string)로 변환합니다.
     * @param keySymbol 키 심볼 (예: "f1", "enter", "a", "0x04")
     * @returns 2자리 hex 문자열 (예: "04"), 실패 시 null
     */
    private _get_hid_key_code_hex_string_by_key_symbol = (keySymbol: string): string | null => {
        // 1. 기본 유효성 검사
        if (typeof keySymbol !== 'string') return null;
        if (keySymbol.length === 0) return "00";

        // 2. 0x00 형식의 직접적인 hex string 처리
        if (keySymbol.startsWith("0x")) {
            if (keySymbol.length !== 4) return null;

            const hexPart = keySymbol.substring(2);
            const hexPattern = /^[0-9A-Fa-f]{2}$/; // 정확히 2자리 16진수인지 검사

            return hexPattern.test(hexPart) ? hexPart : null;
        }

        // 3. 키 심볼 매핑 테이블 (유지보수가 훨씬 쉬워집니다)
        // elpusk_util_keyboard_const 값이 미리 정의되어 있어야 합니다.
        const keyMap: Record<string, string> = {
            "f1": elpusk_util_keyboard_const.HIDKEY________F1,
            "f2": elpusk_util_keyboard_const.HIDKEY________F2,
            "f3": elpusk_util_keyboard_const.HIDKEY________F3,
            "f4": elpusk_util_keyboard_const.HIDKEY________F4,
            "f5": elpusk_util_keyboard_const.HIDKEY________F5,
            "f6": elpusk_util_keyboard_const.HIDKEY________F6,
            "f7": elpusk_util_keyboard_const.HIDKEY________F7,
            "f8": elpusk_util_keyboard_const.HIDKEY________F8,
            "f9": elpusk_util_keyboard_const.HIDKEY________F9,
            "f10": elpusk_util_keyboard_const.HIDKEY_______F10,
            "f11": elpusk_util_keyboard_const.HIDKEY_______F11,
            "f12": elpusk_util_keyboard_const.HIDKEY_______F12,
            "esc": elpusk_util_keyboard_const.HIDKEY____ESCAPE,
            "space": elpusk_util_keyboard_const.HIDKEY_____SPACE,
            "tab": elpusk_util_keyboard_const.HIDKEY_______TAB,
            "bs": elpusk_util_keyboard_const.HIDKEY_BACKSPACE,
            "del": elpusk_util_keyboard_const.HIDKEY____DELETE,
            "enter": elpusk_util_keyboard_const.HIDKEY____RETURN,
            // 알파벳
            "a": elpusk_util_keyboard_const.HIDKEY____a____A,
            "b": elpusk_util_keyboard_const.HIDKEY____b____B,
            "c": elpusk_util_keyboard_const.HIDKEY____c____C,
            "d": elpusk_util_keyboard_const.HIDKEY____d____D,
            "e": elpusk_util_keyboard_const.HIDKEY____e____E,
            "f": elpusk_util_keyboard_const.HIDKEY____f____F,
            "g": elpusk_util_keyboard_const.HIDKEY____g____G,
            "h": elpusk_util_keyboard_const.HIDKEY____h____H,
            "i": elpusk_util_keyboard_const.HIDKEY____i____I,
            "j": elpusk_util_keyboard_const.HIDKEY____j____J,
            "k": elpusk_util_keyboard_const.HIDKEY____k____K,
            "l": elpusk_util_keyboard_const.HIDKEY____l____L,
            "m": elpusk_util_keyboard_const.HIDKEY____m____M,
            "n": elpusk_util_keyboard_const.HIDKEY____n____N,
            "o": elpusk_util_keyboard_const.HIDKEY____o____O,
            "p": elpusk_util_keyboard_const.HIDKEY____p____P,
            "q": elpusk_util_keyboard_const.HIDKEY____q____Q,
            "r": elpusk_util_keyboard_const.HIDKEY____r____R,
            "s": elpusk_util_keyboard_const.HIDKEY____s____S,
            "t": elpusk_util_keyboard_const.HIDKEY____t____T,
            "u": elpusk_util_keyboard_const.HIDKEY____u____U,
            "v": elpusk_util_keyboard_const.HIDKEY____v____V,
            "w": elpusk_util_keyboard_const.HIDKEY____w____W,
            "x": elpusk_util_keyboard_const.HIDKEY____x____X,
            "y": elpusk_util_keyboard_const.HIDKEY____y____Y,
            "z": elpusk_util_keyboard_const.HIDKEY____z____Z,
            // 숫자 및 특수문자
            "1": elpusk_util_keyboard_const.HIDKEY____1_EXCL,
            "2": elpusk_util_keyboard_const.HIDKEY____2_QUOT,
            "3": elpusk_util_keyboard_const.HIDKEY____3_SHAR,
            "4": elpusk_util_keyboard_const.HIDKEY____4_DOLL,
            "5": elpusk_util_keyboard_const.HIDKEY____5_PERC,
            "6": elpusk_util_keyboard_const.HIDKEY____6_CIRC,
            "7": elpusk_util_keyboard_const.HIDKEY____7_AMPE,
            "8": elpusk_util_keyboard_const.HIDKEY____8_ASTE,
            "9": elpusk_util_keyboard_const.HIDKEY____9_L_PA,
            "0": elpusk_util_keyboard_const.HIDKEY____0_R_PA,
            "-": elpusk_util_keyboard_const.HIDKEY_MIN_UNDER,
            "=": elpusk_util_keyboard_const.HIDKEY_EQU__PLUS,
            "[": elpusk_util_keyboard_const.HIDKEY_LBT___LBR,
            "]": elpusk_util_keyboard_const.HIDKEY_RBT___RBR,
            "\\": elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR,
            ";": elpusk_util_keyboard_const.HIDKEY_SEMI__COL,
            "'": elpusk_util_keyboard_const.HIDKEY_APOS_QUOT,
            ",": elpusk_util_keyboard_const.HIDKEY_COMA___LT,
            ".": elpusk_util_keyboard_const.HIDKEY_PERIOD_GT,
            "/": elpusk_util_keyboard_const.HIDKEY_SLASH__QM,
            "`": elpusk_util_keyboard_const.HIDKEY_GRAV_TILD,
        };

        // 4. 매핑된 결과 반환 (없으면 null)
        return keyMap[keySymbol] || null;
    };

    /**
     * @description HID 키코드 숫자를 기반으로 키 심볼 문자열을 가져옵니다.
     * @param hidKeyCode HID 키코드 숫자 (예: 0x04)
     * @returns 키 심볼 (예: "a", "enter"), 찾지 못할 경우 빈 문자열 ""
     */
    private _get_key_symbol_string_by_hid_key_code_number = (hidKeyCode: number): string => {
        // 1. 유효성 검사
        if (typeof hidKeyCode !== 'number') return "";

        // 2. 숫자를 2자리 16진수 문자열로 변환 (기존 elpusk 유틸리티 활용 또는 직접 구현)
        // 예: 4 -> "04", 40 -> "28"
        const hexString = hidKeyCode.toString(16).padStart(2, '0').toLowerCase();

        // 3. 역매핑 테이블 생성 (Key와 Value를 뒤집음)
        // 이 작업은 함수 밖에서 한 번만 수행하도록 설정하는 것이 성능상 좋습니다.
        const reverseKeyMap: Record<string, string> = {
            [elpusk_util_keyboard_const.HIDKEY________F1]: "f1",
            [elpusk_util_keyboard_const.HIDKEY________F2]: "f2",
            [elpusk_util_keyboard_const.HIDKEY________F3]: "f3",
            [elpusk_util_keyboard_const.HIDKEY________F4]: "f4",
            [elpusk_util_keyboard_const.HIDKEY________F5]: "f5",
            [elpusk_util_keyboard_const.HIDKEY________F6]: "f6",
            [elpusk_util_keyboard_const.HIDKEY________F7]: "f7",
            [elpusk_util_keyboard_const.HIDKEY________F8]: "f8",
            [elpusk_util_keyboard_const.HIDKEY________F9]: "f9",
            [elpusk_util_keyboard_const.HIDKEY_______F10]: "f10",
            [elpusk_util_keyboard_const.HIDKEY_______F11]: "f11",
            [elpusk_util_keyboard_const.HIDKEY_______F12]: "f12",
            [elpusk_util_keyboard_const.HIDKEY____ESCAPE]: "esc",
            [elpusk_util_keyboard_const.HIDKEY_____SPACE]: "space",
            [elpusk_util_keyboard_const.HIDKEY_______TAB]: "tab",
            [elpusk_util_keyboard_const.HIDKEY_BACKSPACE]: "bs",
            [elpusk_util_keyboard_const.HIDKEY____DELETE]: "del",
            [elpusk_util_keyboard_const.HIDKEY____RETURN]: "enter",
            [elpusk_util_keyboard_const.HIDKEY____a____A]: "a",
            [elpusk_util_keyboard_const.HIDKEY____b____B]: "b",
            [elpusk_util_keyboard_const.HIDKEY____c____C]: "c",
            [elpusk_util_keyboard_const.HIDKEY____d____D]: "d",
            [elpusk_util_keyboard_const.HIDKEY____e____E]: "e",
            [elpusk_util_keyboard_const.HIDKEY____f____F]: "f",
            [elpusk_util_keyboard_const.HIDKEY____g____G]: "g",
            [elpusk_util_keyboard_const.HIDKEY____h____H]: "h",
            [elpusk_util_keyboard_const.HIDKEY____i____I]: "i",
            [elpusk_util_keyboard_const.HIDKEY____j____J]: "j",
            [elpusk_util_keyboard_const.HIDKEY____k____K]: "k",
            [elpusk_util_keyboard_const.HIDKEY____l____L]: "l",
            [elpusk_util_keyboard_const.HIDKEY____m____M]: "m",
            [elpusk_util_keyboard_const.HIDKEY____n____N]: "n",
            [elpusk_util_keyboard_const.HIDKEY____o____O]: "o",
            [elpusk_util_keyboard_const.HIDKEY____p____P]: "p",
            [elpusk_util_keyboard_const.HIDKEY____q____Q]: "q",
            [elpusk_util_keyboard_const.HIDKEY____r____R]: "r",
            [elpusk_util_keyboard_const.HIDKEY____s____S]: "s",
            [elpusk_util_keyboard_const.HIDKEY____t____T]: "t",
            [elpusk_util_keyboard_const.HIDKEY____u____U]: "u",
            [elpusk_util_keyboard_const.HIDKEY____v____V]: "v",
            [elpusk_util_keyboard_const.HIDKEY____w____W]: "w",
            [elpusk_util_keyboard_const.HIDKEY____x____X]: "x",
            [elpusk_util_keyboard_const.HIDKEY____y____Y]: "y",
            [elpusk_util_keyboard_const.HIDKEY____z____Z]: "z",
            [elpusk_util_keyboard_const.HIDKEY____1_EXCL]: "1",
            [elpusk_util_keyboard_const.HIDKEY____2_QUOT]: "2",
            [elpusk_util_keyboard_const.HIDKEY____3_SHAR]: "3",
            [elpusk_util_keyboard_const.HIDKEY____4_DOLL]: "4",
            [elpusk_util_keyboard_const.HIDKEY____5_PERC]: "5",
            [elpusk_util_keyboard_const.HIDKEY____6_CIRC]: "6",
            [elpusk_util_keyboard_const.HIDKEY____7_AMPE]: "7",
            [elpusk_util_keyboard_const.HIDKEY____8_ASTE]: "8",
            [elpusk_util_keyboard_const.HIDKEY____9_L_PA]: "9",
            [elpusk_util_keyboard_const.HIDKEY____0_R_PA]: "0",
            [elpusk_util_keyboard_const.HIDKEY_MIN_UNDER]: "-",
            [elpusk_util_keyboard_const.HIDKEY_EQU__PLUS]: "=",
            [elpusk_util_keyboard_const.HIDKEY_LBT___LBR]: "[",
            [elpusk_util_keyboard_const.HIDKEY_RBT___RBR]: "]",
            [elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR]: "\\",
            [elpusk_util_keyboard_const.HIDKEY_SEMI__COL]: ";",
            [elpusk_util_keyboard_const.HIDKEY_APOS_QUOT]: "'",
            [elpusk_util_keyboard_const.HIDKEY_COMA___LT]: ",",
            [elpusk_util_keyboard_const.HIDKEY_PERIOD_GT]: ".",
            [elpusk_util_keyboard_const.HIDKEY_SLASH__QM]: "/",
            [elpusk_util_keyboard_const.HIDKEY_GRAV_TILD]: "`",
        };

        // 4. 결과 반환
        return reverseKeyMap[hexString] || "";
    };

    /**
     * @description 제조사 타입 코드를 기반으로 제조사 이름 문자열을 반환합니다.
     * @param type 제조사 타입 코드 (ManufacturerType)
     * @returns 제조사 이름 (기본값 "unknown")
     */
    private _get_manufacturer_string = (type: number): string => {
        // 1. 유효성 검사
        if (typeof type !== 'number') {
            return "unknown";
        }

        // 2. 제조사 매핑
        switch (type) {
            case _type_manufacturer.mf_elpusk:
                return "Elpusk";
            case _type_manufacturer.mf_btc:
                return "BTC";
            default:
                return "unknown";
        }
    };

    /**
     * @description 장치 기능 코드와 버전을 조합하여 지원 기능을 문자열로 반환합니다.
     * @param typeFunction 장치 기능 타입 코드
     * @param version 장치 버전 정보 (4개의 숫자로 구성된 배열)
     * @returns 지원 기능 명칭 (예: "MSR and SCR", "MSR and i-button")
     */
    private _get_function_string = (typeFunction: number, version: number[]): string => {
        // 1. 유효성 검사
        if (typeof typeFunction !== 'number') {
            return "unknown";
        }

        // 2. 기능 타입별 판별
        switch (typeFunction) {
            case type_function.fun_none:
                return "None";

            case type_function.fun_msr:
                return "MSR only";

            case type_function.fun_msr_ibutton:
                /** * 특정 버전 조건에 따라 iButton 기능이 SCR로 변경됨 
                 * _is_version_ten 함수가 별도로 정의되어 있어야 합니다.
                 */
                if (this._is_version_ten(version)) {
                    return "MSR and SCR";
                }
                return "MSR and i-button";

            case type_function.fun_ibutton:
                return "i-button only";

            default:
                return "unknown";
        }
    };

    /**
     * @private
     * @function _get_system_interface_string
     * @param {number} inf type_system_interface value.
     * @returns {string} system interface string.
     */
    private _get_system_interface_string = (inf: number): string => {
        // 유효성 검사
        if (typeof inf !== 'number') {
            return "unknown";
        }

        // enum을 활용한 매핑
        switch (inf) {
            case type_system_interface.system_interface_usb_keyboard:
                return "Usb Hid keyboard";

            case type_system_interface.system_interface_usb_msr:
                return "Usb Hid vendor defined";

            case type_system_interface.system_interface_uart:
                return "Uart";

            case type_system_interface.system_interface_ps2_stand_alone:
                return "Standalone PS2";

            case type_system_interface.system_interface_ps2_bypass:
                return "Bypass PS2";

            case type_system_interface.system_interface_by_hw_setting:
                return "By HW setting";

            default:
                return "unknown";
        }
    }

    /**
     * @private
     * @function _get_keyboard_language_index_string
     * @param {number} lang type_keyboard_language_index value.
     * @returns {string} language name.
     */
    private _get_keyboard_language_index_string = (lang: number): string => {
        // 유효성 검사
        if (typeof lang !== 'number') {
            return "unknown";
        }

        // enum 값을 기반으로 언어 이름 매핑
        switch (lang) {
            case type_keyboard_language_index.language_map_index_english:
                return "English";
            case type_keyboard_language_index.language_map_index_spanish:
                return "Spanish";
            case type_keyboard_language_index.language_map_index_danish:
                return "Danish";
            case type_keyboard_language_index.language_map_index_french:
                return "French";
            case type_keyboard_language_index.language_map_index_german:
                return "German";
            case type_keyboard_language_index.language_map_index_italian:
                return "Italian";
            case type_keyboard_language_index.language_map_index_norwegian:
                return "Norwegian";
            case type_keyboard_language_index.language_map_index_swedish:
                return "Swedish";
            case type_keyboard_language_index.language_map_index_uk_english:
                return "UK English";
            case type_keyboard_language_index.language_map_index_israel:
                return "Israel";
            case type_keyboard_language_index.language_map_index_turkey:
                return "Turkey";
            default:
                return "unknown";
        }
    }

    /**
     * @private
     * @function _get_frequency_from_timer_count
     * @param {number} n_count 하드웨어 타이머의 카운트 수
     * @returns {number} 주파수 (단위: Hz), 오류 시 0 반환
     */
    private _get_frequency_from_timer_count = (n_count: number): number => {
        // 1. 타입 및 유효성 검사 (숫자가 아니거나 0 이하일 경우 0 반환)
        if (typeof n_count !== 'number' || n_count <= 0) {
            return 0;
        }

        // 2. 주파수 계산 (카운트 값을 하드웨어 상수 8.67로 나눔)
        // 공식: $f = \frac{count}{8.67}$
        const n_freq = n_count / 8.67;

        return n_freq;
    }

    /**
     * @private
     * @description 첫 바이트를 길이 정보로 포함하는 두 개의 16진수 태그 문자열이 동일한지 비교합니다.
     * @param s_tag0 길이 정보를 포함한 16진수 태그 문자열 (예: "02AABB")
     * @param s_tag1 비교할 두 번째 16진수 태그 문자열
     * @returns 두 태그의 내용이 일치하면 true, 그렇지 않으면 false
     */
    private _is_equal_tag = (s_tag0: string, s_tag1: string): boolean => {
        // 1. 기본 유효성 및 타입 검사
        if (typeof s_tag0 !== 'string' || typeof s_tag1 !== 'string') return false;

        // 16진수 문자열은 항상 짝수 길이어야 함 (2글자가 1바이트)
        if (s_tag0.length % 2 !== 0 || s_tag1.length % 2 !== 0) return false;

        // 둘 다 빈 문자열이면 동일한 것으로 간주
        if (s_tag0.length === 0 && s_tag1.length === 0) return true;

        // 2. 문자열을 숫자 배열(Byte Array)로 변환
        const n_tag0: number[] = this._hex_to_bytes(s_tag0);
        const n_tag1: number[] = this._hex_to_bytes(s_tag1);

        // 3. 길이(Length) 바이트 추출 (첫 번째 요소)
        const len0 = n_tag0.shift();
        const len1 = n_tag1.shift();

        // 정의된 데이터 길이가 서로 다르거나 데이터가 부족한 경우 false
        if (len0 !== len1 || n_tag0.length < (len0 || 0) || n_tag1.length < (len1 || 0)) {
            return false;
        }

        // 4. 정의된 길이만큼 실제 데이터 비교
        for (let i = 0; i < (len0 || 0); i++) {
            if (n_tag0[i] !== n_tag1[i]) {
                return false;
            }
        }

        return true;
    }


    /**
     * @private
     * @description i-button 읽기 모드 값을 기반으로 모드 명칭 문자열을 반환합니다.
     * @param type_ibutton_mode _type_ibutton_mode 열거형 값
     * @returns i-button 읽기 모드 명칭 (기본값 "unknown")
     */
    private _get_ibutton_mode_string(type_ibutton_mode: _type_ibutton_mode): string {
        // 1. 타입 유효성 검사
        if (typeof type_ibutton_mode !== 'number') {
            return "unknown";
        }

        // 2. 모드별 문자열 매핑
        switch (type_ibutton_mode) {
            case _type_ibutton_mode.ibutton_none:
                return "None mode";

            case _type_ibutton_mode.ibutton_zeros:
                return "Zeros mode";

            case _type_ibutton_mode.ibutton_f12:
                return "F12 key mode";

            case _type_ibutton_mode.ibutton_zeros7:
                return "Zeros 7times mode";

            case _type_ibutton_mode.ibutton_addmit:
                return "Addmit codestick mode";

            default:
                return "unknown";
        }
    }

    /**
     * @public
     * @description MMD1100 리셋 간격 값을 문자열로 반환합니다.
     * @param n_interval 리셋 간격 값 (0~240, 16의 배수)
     * @param b_device_version_greater_then_5_18 장치 펌웨어 버전이 5.18보다 높은지 여부
     * @returns 리셋 간격 설명 문자열
     */
    public get_mmd1100_reset_interval_string(
        n_interval: number,
        b_device_version_greater_then_5_18: boolean
    ): string {
        // 1. 유효성 검사 (타입, 범위, 16의 배수 체크)
        if (typeof n_interval !== 'number' || n_interval < 0 || n_interval > 240) {
            return "unknown";
        }

        // 2. 특수 케이스 처리 (0 및 240)
        if (n_interval === 0) {
            return "0(default, 03:22)";
        }

        if (n_interval === 240) {
            return b_device_version_greater_then_5_18
                ? "240(disable)"
                : "240(don't use code)";
        }

        // 16의 배수가 아니면 unknown 반환
        if (n_interval % 16 !== 0) {
            return "unknown";
        }

        // 3. 간격별 시간 정보 매핑
        const intervalMap: Record<number, string> = {
            16: "06:43", 32: "13:27", 48: "20:10", 64: "26:53",
            80: "33:36", 96: "40:19", 112: "47:03", 128: "53:46",
            144: "01:00:29", 160: "01:07:12", 176: "01:13:55",
            192: "01:20:39", 208: "01:27:22", 224: "01:34:05"
        };

        const timeInfo = intervalMap[n_interval];

        return timeInfo ? `${n_interval}(${timeInfo})` : "unknown";
    }

    /**
     * @public
     * @description 카드 읽기 방향 값을 기반으로 명칭 문자열을 반환합니다.
     * @param n_track 카드의 트랙 번호.(0~2)
     * @returns 읽기 방향 명칭 (기본값 "unknown")
     */
    public get_direction_string = (n_track:number): string =>{

        if(n_track<0 || n_track >2){
            return "";
        }

        let d = this._get_direction_string(this._n_direction[n_track]);
        return d;
    }

    /**
     * @private
     * @description 카드 읽기 방향 값을 기반으로 명칭 문자열을 반환합니다.
     * @param direction type_direction 열거형 값
     * @returns 읽기 방향 명칭 (기본값 "unknown")
     */
    private _get_direction_string(direction: type_direction): string {
        // 1. 타입 유효성 검사
        if (typeof direction !== 'number') {
            return "unknown";
        }

        const s_d = Object.keys(this._DIRECTION_MAP).find(k => this._DIRECTION_MAP[k] === direction) || 'unknown';
        return s_d;
    }

    /**
     * @private
     * @function _get_parity_type_string
     * @param {number} pt type_parity value.
     * @returns {string} parity type.
     */
    private _get_parity_type_string(pt: number): string {
        // 유효성 검사
        if (typeof pt !== 'number') {
            return "unknown";
        }

        // 패리티 타입 매핑
        switch (pt) {
            case type_parity.parity_even:
                return "even parity";
            case type_parity.parity_odd:
                return "odd parity";
            default:
                return "unknown";
        }
    }

    /**
     * @private
     * @function _get_error_correct_type_string
     * @param {number} et type_error_correct value.
     * @returns {string} error correction type.
     */
    private _get_error_correct_type_string(et: number): string {
        // 유효성 검사
        if (typeof et !== 'number') {
            return "unknown";
        }

        // 오류 교정 타입 매핑 (Early Return)
        switch (et) {
            case type_error_correct.error_correct_lrc:
                return "LRC error correction";

            case type_error_correct.error_correct_inv_lrc:
                return "Inversion LRC error correction";

            case type_error_correct.error_correct_crc:
                return "CRC error correction";

            default:
                return "unknown";
        }
    }

    /**
     * @private
     * @function _get_version_string
     * @param {number[]} version 4개 숫자로 이루어진 배열 (시스템 버전)
     * @returns {string} 버전 문자열 및 하드웨어 모델 정보
     */
    private _get_version_string(version: number[]): string {
        let s_value = "0.0.0.0";

        // 유효성 검사: 배열 여부 및 길이 확인
        if (!Array.isArray(version) || version.length !== 4) {
            return s_value;
        }

        // 기본 버전 문자열 생성 (Semantic Versioning 형태)
        s_value = `${version[0]}.${version[1]}.${version[2]}.${version[3]}`;

        // 첫 번째 메이저 버전에 따른 하드웨어 모델 정보 부가
        if (version[0] <= 4) {
            s_value += "(LPU237)"; // Callisto 보드 계열
        } else if (version[0] === 5) {
            s_value += "(LPU237 ,LPU-207 or LPU208)";
        } else if (version[0] === 10) {
            s_value += "(LPU-208D)";
        }

        return s_value;
    }

    /**
     * @private
     * @function _get_version_structure_string
     * @param {number[]} version 4개 숫자로 이루어진 배열 (구조 버전)
     * @returns {string} 버전 문자열
     */
    private _get_version_structure_string(version: number[]): string {
        let s_value = "0.0.0.0";

        if (!Array.isArray(version) || version.length !== 4) {
            return s_value;
        }

        // 구조 버전은 단순 포맷팅만 수행
        s_value = `${version[0]}.${version[1]}.${version[2]}.${version[3]}`;

        return s_value;
    }

    /**
     * @private
     * @function _is_version_ten
     * @param {number[]} version 4개의 숫자로 구성된 배열 (예: [10, 0, 0, 0])
     * @returns {boolean} 메이저 버전이 10이면 true, 아니면 false
     */
    private _is_version_ten(version: number[]): boolean {
        // 유효성 검사: 배열이 아니거나 길이가 4가 아니면 false
        if (!Array.isArray(version) || version.length !== 4) {
            return false;
        }

        /** * 메이저 버전(index 0)이 10인지 확인
         * 원본의 s_value 변환 로직은 결과에 영향을 주지 않으므로 
         * 성능을 위해 실제 비교 로직만 남겼습니다.
         */
        return version[0] === 10;
    }

    /**
     * @private
     * @function _first_version_greater_then_second_version
     * @param {boolean} b_equal true : 두 버전이 같을 때도 true를 반환. 
     * @param {number[] | number} first_version 비교할 첫 번째 버전 (4개 숫자 배열 또는 단일 숫자)
     * @param {number[] | number} second_version 비교할 두 번째 버전 (4개 숫자 배열 또는 단일 숫자)
     * @returns {boolean} first_version이 second_version보다 크면 true (b_equal이 true면 같을 때도 true)
     */
    private _first_version_greater_then_second_version = (
        b_equal: boolean,
        first_version: number[] | number,
        second_version: number[] | number
    ): boolean => {
        // 1. 입력 유효성 검사 및 정규화 (배열로 통일)
        const ar1: number[] = this._normalize_version(first_version);
        const ar2: number[] = this._normalize_version(second_version);

        // 2. 버전 비교 (Major -> Minor -> Patch -> Build 순서)
        for (let i = 0; i < 4; i++) {
            if (ar1[i] > ar2[i]) return true;
            if (ar1[i] < ar2[i]) return false;
            // 값이 같으면 다음 자리수(i++) 비교 진행
        }

        // 3. 모든 자릿수가 같을 경우 b_equal 설정에 따라 결과 반환
        return b_equal;
    }

    /**
     * @private
     * @function _is_success_response
     * @description 응답 패킷이 'Good(0xFF)' 또는 'Negative Good(0x80)'을 포함하는지 확인합니다.
     */
    private _is_success_response = (s_response: string): boolean => {
        if (typeof s_response !== 'string') return false;

        // 헤더 사이즈 체크 (16진수 문자열이므로 헤더 길이에 2를 곱함)
        if (s_response.length < (2 * this._const_min_size_response_header)) return false;

        // Prefix 확인: 0번째 바이트가 0x52('R')인지 확인
        const prefix = parseInt(s_response.substring(0, 2), 16);
        if (prefix !== 0x52) return false;

        // 결과 코드 확인: 1번째 바이트 추출
        const c_result = parseInt(s_response.substring(2, 4), 16);

        // 0xFF(Good) 또는 0x80(Negative Good)이면 성공
        return c_result === 0xFF || c_result === 0x80;
    }

    /**
     * @private
     * @function _is_good_response
     * @description 응답 패킷이 'Good(0xFF)'만 포함하는지 확인합니다.
     */
    private _is_good_response = (s_response: string): boolean => {
        if (typeof s_response !== 'string') return false;
        if (s_response.length < (2 * this._const_min_size_response_header)) return false;

        if (parseInt(s_response.substring(0, 2), 16) !== 0x52) return false;

        const c_result = parseInt(s_response.substring(2, 4), 16);
        return c_result === 0xFF;
    }

    /**
     * @private
     * @function _is_success_enter_config_mode
     */
    private _is_success_enter_config_mode = (s_response: string): boolean => {
        return this._is_success_response(s_response);
    }

    /**
     * @private
     * @function _is_success_leave_config_mode
     */
    private _is_success_leave_config_mode = (s_response: string): boolean => {
        return this._is_success_response(s_response);
    }

    /**
     * @private
     * @function _is_success_apply_config_mode
     */
    private _is_success_apply_config_mode = (s_response: string): boolean => {
        return this._is_success_response(s_response);
    }

    /**
     * @private
     * @function _get_length_member_of_response
     * @param {string} s_response - lpu237 프로토콜 패킷 (16진수 문자열)
     * @returns {number} 0 이상의 데이터 길이, 오류 시 음수(-1) 반환
     */
    private _get_length_member_of_response = (s_response: string): number => {
        let n_length = -1;

        // 1. 유효성 검사: 타입 확인 및 최소 헤더 길이 체크
        if (typeof s_response !== 'string') {
            return n_length;
        }

        // 16진수 문자열은 2글자가 1바이트이므로 길이 비교 시 2를 곱함
        if (s_response.length < (2 * this._const_min_size_response_header)) {
            return n_length;
        }

        /**
         * 2. 길이 필드 추출
         * n_offset = 2 (0: Prefix, 1: Result Code, 2: Length 순서로 추정)
         * n_size = 1 (길이 필드가 1바이트임)
         */
        const n_offset = 2;
        const n_size = 1;

        // n_offset * 2는 문자열 상의 인덱스 시작점, n_size * 2는 자를 길이
        const s_length_hex = s_response.substring(n_offset * 2, (n_offset + n_size) * 2);
        n_length = parseInt(s_length_hex, 16);

        return n_length;
    }

    /**
     * @private
     * @function _get_data_field_member_of_response_by_number_array
     * @description Data 필드를 숫자 배열(byte array)로 반환합니다.
     */
    private _get_data_field_member_of_response_by_number_array = (s_response: string): number[] | null => {
        const n_length = this._get_valid_length(s_response);
        if (n_length <= 0) return null;

        const n_data: number[] = [];
        let n_offset = 3; // Data 시작 오프셋 (Prefix, Result, Length 이후)

        for (let i = 0; i < n_length; i++) {
            const val = parseInt(s_response.substring((n_offset + i) * 2, (n_offset + i + 1) * 2), 16);
            n_data.push(val);
        }
        return n_data;
    }

    /**
     * @private
     * @function _get_data_field_member_of_response_by_string
     * @description Data 필드를 ASCII 문자열로 반환합니다. (Null 종단 문자 확인)
     */
    private _get_data_field_member_of_response_by_string = (s_response: string): string | null => {
        const n_length = this._get_valid_length(s_response);
        if (n_length <= 0) return null;

        let s_data = "";
        const n_offset = 3;

        for (let i = 0; i < n_length; i++) {
            const n_val = parseInt(s_response.substring((n_offset + i) * 2, (n_offset + i + 1) * 2), 16);
            if (n_val === 0) break; // Null terminator 발견 시 중단
            s_data += String.fromCharCode(n_val);
        }
        return s_data;
    }

    /**
     * @private
     * @function _get_data_field_member_of_response_by_hex_string
     * @description Data 필드를 16진수 문자열 그대로 반환합니다.
     */
    private _get_data_field_member_of_response_by_hex_string = (s_response: string): string | null => {
        const n_length = this._get_valid_length(s_response);
        if (n_length <= 0) return null;

        const n_offset = 3;
        return s_response.substring(n_offset * 2, (n_offset + n_length) * 2);
    }

    /**
     * @private
     * @function _get_data_field_member_of_response_by_boolean
     * @description Data 필드 중 0이 아닌 값이 하나라도 있으면 true를 반환합니다.
     */
    private _get_data_field_member_of_response_by_boolean = (s_response: string): boolean | null => {
        const n_length = this._get_valid_length(s_response);
        if (n_length <= 0) return null;

        const n_offset = 3;
        for (let i = 0; i < n_length; i++) {
            const c_val = parseInt(s_response.substring((n_offset + i) * 2, (n_offset + i + 1) * 2), 16);
            if (c_val !== 0) return true;
        }
        return false;
    }

    /**
     * @private
     * @function _get_data_field_member_of_response_by_number
     * @description Data 필드를 Little-Endian 방식의 숫자로 변환합니다.
     */
    private _get_data_field_member_of_response_by_number = (s_response: string): number => {
        const n_length = this._get_valid_length(s_response);
        if (n_length <= 0) return -1;

        const n_offset = 3;
        const s_data = s_response.substring(n_offset * 2, (n_offset + n_length) * 2);

        // 외부 유틸리티 호출 (elpusk 라이브러리 가정)
        return util.get_number_from_little_endian_hex_string(s_data);
    }

    /**
     * @description 공통 유효성 검사 및 데이터 길이 추출 내부 메서드
     */
    private _get_valid_length = (s_response: string): number => {
        if (typeof s_response !== 'string') return -1;
        if (s_response.length < (2 * this._const_min_size_response_header)) return -1;

        // Index 2 (Offset 2)에 위치한 Length 필드 추출
        return parseInt(s_response.substring(4, 6), 16);
    }

    /**
     * @private
     * @function _get_version_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷 (WebSocket 데이터 필드)
     * @returns {number[] | null} 버전 정보를 담은 4개 숫자 배열, 실패 시 null
     */
    private _get_version_from_response = (s_response: string): number[] | null => {
        let version: number[] | null = null;

        // 1. 응답 성공 여부 확인
        if (!this._is_success_response(s_response)) {
            return null;
        }

        /**
         * 2. 데이터 필드 길이 확인
         * SYS_SIZE_VERSION은 보통 4(Major, Minor, Patch, Build)를 의미합니다.
         */
        const n_size = _type_system_size.SYS_SIZE_VERSION;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        // 3. 데이터 필드에서 버전 숫자 배열 추출
        version = this._get_data_field_member_of_response_by_number_array(s_response);

        return version;
    }

    /**
     * @private
     * @function _get_version_structure_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷 (WebSocket 데이터 필드)
     * @returns {number[] | null} 구조 버전 정보를 담은 4개 숫자 배열, 실패 시 null
     */
    private _get_version_structure_from_response = (s_response: string): number[] | null => {
        let version: number[] | null = null;

        // 1. 응답 성공 여부 확인 (R prefix 및 결과 코드 검증)
        if (!this._is_success_response(s_response)) {
            return null;
        }

        /**
         * 2. 데이터 필드 길이 확인
         * SYS_SIZE_VERSION_STRUCTURE 값에 따라 응답 데이터의 길이를 검증합니다.
         */
        const n_size = _type_system_size.SYS_SIZE_VERSION_STRUCTURE;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        // 3. 데이터 필드(Payload)를 숫자 배열로 변환하여 반환
        version = this._get_data_field_member_of_response_by_number_array(s_response);

        return version;
    }

    /**
     * @private
     * @function _get_name_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @returns {string | null} 시스템 이름, 실패 시 null
     */
    private _get_name_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) {
            return null;
        }

        const n_size = _type_system_size.SYS_SIZE_NAME;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        return this._get_data_field_member_of_response_by_string(s_response);
    }

    /**
     * @private
     * @function _get_support_mmd1000_from_response
     * @description MMD1000 디코더 사용 여부를 반환합니다. (Good Response면 true)
     */
    private _get_support_mmd1000_from_response = (s_response: string): boolean => {
        return this._is_good_response(s_response);
    }

    /**
     * @private
     * @function _get_uid_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @returns {string | null} Hex 문자열 형식의 UID, 실패 시 null
     */
    private _get_uid_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) {
            return null;
        }

        const n_size = this._const_the_size_of_uid;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_type_from_response
     * @description 하드웨어의 i-button 지원 여부를 반환합니다.
     */
    private _get_ibutton_type_from_response = (s_response: string): boolean => {
        return this._is_good_response(s_response);
    }

    /**
     * @private
     * @function _get_type_from_response
     * @description 하드웨어가 표준(Standard) 타입인지 여부를 반환합니다.
     */
    private _get_type_from_response = (s_response: string): boolean => {
        return this._is_good_response(s_response);
    }

    /**
     * @private
     * @function _get_global_pre_postfix_send_condition_from_response
     * @description 모든 트랙에 에러가 없을 때만 전역 Pre/Postfix를 보낼지 여부를 확인합니다.
     * @returns {boolean | null} true(조건부 송신), false(무조건 송신), null(오류)
     */
    private _get_global_pre_postfix_send_condition_from_response = (s_response: string): boolean | null => {
        if (!this._is_success_response(s_response)) {
            return null;
        }

        const n_size = _type_system_size.SYS_SIZE_G_TAG_CONDITION;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        return this._get_data_field_member_of_response_by_boolean(s_response);
    }

    /**
     * @private
     * @function _get_track_order_from_response
     * @description 카드 트랙(Track 1, 2, 3)의 출력 순서 설정을 가져옵니다.
     * @returns {number[] | null} 3개의 요소를 가진 숫자 배열 (예: [1, 2, 3]), 실패 시 null
     */
    private _get_track_order_from_response = (s_response: string): number[] | null => {
        if (!this._is_success_response(s_response)) {
            return null;
        }

        const n_size = _type_system_size.SYS_SIZE_CONTAINER_TRACK_ORDER;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        return this._get_data_field_member_of_response_by_number_array(s_response);
    }

    /**
     * @private
     * @function _get_blank_4bytes_from_response
     * @description 장치 응답에서 예약된 4바이트 공백 필드 데이터를 가져옵니다.
     * @returns {number[] | null} 4바이트 숫자 배열, 실패 시 null
     */
    private _get_blank_4bytes_from_response = (s_response: string): number[] | null => {
        if (!this._is_success_response(s_response)) {
            return null;
        }

        const n_size = _type_system_size.SYS_SIZE_BLANK_4BYTES;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return null;
        }

        return this._get_data_field_member_of_response_by_number_array(s_response);
    }

    /**
     * @private
     * @function _get_interface_from_response
     * @description 장치의 통신 인터페이스 번호(USB HID, 벤더 모드 등)를 가져옵니다.
     * @returns {number} 인터페이스 번호, 에러 시 음수(-1)
     */
    private _get_interface_from_response = (s_response: string): number => {
        if (!this._is_success_response(s_response)) {
            return -1;
        }

        const n_size = _type_system_size.SYS_SIZE_INTERFACE;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return -1;
        }

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_language_from_response
     * @description 장치에 설정된 키보드 언어 맵 인덱스를 가져옵니다.
     * @returns {number} 언어 번호, 에러 시 음수(-1)
     */
    private _get_language_from_response = (s_response: string): number => {
        if (!this._is_success_response(s_response)) {
            return -1;
        }

        const n_size = _type_system_size.SYS_SIZE_CONTAINER_MAP_INDEX;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return -1;
        }

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_buzzer_count_from_response
     * @description 카드 읽기 성공/실패 시 발생하는 부저 횟수 설정을 가져옵니다.
     * @returns {number} 부저 횟수, 에러 시 음수(-1)
     */
    private _get_buzzer_count_from_response = (s_response: string): number => {
        if (!this._is_success_response(s_response)) {
            return -1;
        }

        const n_size = _type_system_size.SYS_SIZE_BUZZER_FREQ;
        if (this._get_length_member_of_response(s_response) !== n_size) {
            return -1;
        }

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_boot_run_time_from_response
     * @description MSD 부트로더가 실행되는 시간(msec)을 가져옵니다.
     * @returns {number} 실행 시간(ms), 에러 시 음수(-1)
     */
    private _get_boot_run_time_from_response = (s_response: string): number => {
        if (!this._is_success_response(s_response)) return -1;

        const n_size = _type_system_size.SYS_SIZE_BOOT_RUN_TIME;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_enable_track_from_response
     * @param {string} s_response - 응답 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @returns {boolean | null} 트랙 읽기 활성화 여부, 에러 시 null
     */
    private _get_enable_track_from_response = (s_response: string, n_track: number): boolean | null => {
        // 1. 트랙 번호 유효성 및 해당 트랙의 기대 데이터 크기 확인
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_ENABLE_TRACK[n_track];
        } else {
            return null;
        }

        // 2. 응답 성공 및 길이 검증
        if (!this._is_success_response(s_response)) return null;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_boolean(s_response);
    }

    /**
     * @private
     * @function _get_direction_from_response
     * @param {string} s_response - 응답 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @returns {number} 읽기 방향 값, 에러 시 음수(-1)
     */
    private _get_direction_from_response = (s_response: string, n_track: number): number => {
        // 1. 트랙 번호 유효성 확인
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_DIRECTION[n_track];
        } else {
            return -1;
        }

        // 2. 응답 성공 및 길이 검증
        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_global_prefix_from_response
     * @description 모든 데이터 송신 시작 시 붙는 전역 접두사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식의 Prefix, 실패 시 null
     */
    private _get_global_prefix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_G_PRE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_global_postfix_from_response
     * @description 모든 데이터 송신 종료 시 붙는 전역 접미사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식의 Postfix, 실패 시 null
     */
    private _get_global_postfix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_G_POST;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_number_combi_from_response
     * @param {string} s_response - 응답 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @returns {number} 해당 트랙에서 지원하는 포맷 조합의 수, 에러 시 음수(-1)
     */
    private _get_number_combi_from_response = (s_response: string, n_track: number): number => {
        // 1. 트랙 번호에 따른 기대 사이즈 결정
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_COMBINATION[n_track];
        } else {
            return -1;
        }

        // 2. 패킷 유효성 및 길이 검증
        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_max_size_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {number} 트랙 조합별 최대 데이터 길이 (STX, ETX, LRC 제외), 에러 시 음수(-1)
     */
    private _get_max_size_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        // 1. 조합 인덱스 범위 유효성 검사
        if (n_combi < 0 || n_combi > 2) {
            return -1;
        }

        // 2. 트랙 번호에 따른 기대 패킷 데이터 사이즈 결정
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            // 2차원 배열 구조에서 해당 트랙/조합의 필드 크기를 참조
            n_size = _type_system_size.SYS_SIZE_MAX_SIZE[n_track][n_combi];
        } else {
            return -1;
        }

        // 3. 응답 성공 여부 및 추출된 길이 정보 검증
        if (!this._is_success_response(s_response)) {
            return -1;
        }

        if (this._get_length_member_of_response(s_response) !== n_size) {
            return -1;
        }

        // 4. 데이터 필드를 숫자로 변환하여 반환
        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_bit_size_from_response
     * @description 트랙 조합별 데이터 비트 수(단위: bit)를 가져옵니다.
     * @returns {number} 비트 수, 에러 시 -1
     */
    private _get_bit_size_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return -1;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_BIT_SIZE[n_track][n_combi];
        } else {
            return -1;
        }

        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_data_mask_from_response
     * @description 각 데이터의 마스크 패턴을 가져옵니다. (에러 체크 비트 포함, 좌측 정렬)
     * @returns {number} 마스크 패턴 값
     */
    private _get_data_mask_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return 0;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_DATA_MASK[n_track][n_combi];
        } else {
            return 0;
        }

        if (!this._is_success_response(s_response)) return 0;
        if (this._get_length_member_of_response(s_response) !== n_size) return 0;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_use_parity_from_response
     * @description 패리티 비트 사용 여부를 가져옵니다.
     * @returns {boolean | null} 사용 여부, 에러 시 null
     */
    private _get_use_parity_from_response = (s_response: string, n_track: number, n_combi: number): boolean | null => {
        if (n_combi < 0 || n_combi > 2) return null;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_USE_PARITY[n_track][n_combi];
        } else {
            return null;
        }

        if (!this._is_success_response(s_response)) return null;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_boolean(s_response);
    }

    /**
     * @private
     * @function _get_parity_type_from_response
     * @description 패리티 타입을 가져옵니다. (0: Even, 1: Odd)
     * @returns {number} 패리티 타입 번호, 에러 시 -1
     */
    private _get_parity_type_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return -1;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_PARITY_TYPE[n_track][n_combi];
        } else {
            return -1;
        }

        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_stxl_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {number} 각 트랙 조합의 Start Sentinel 패턴 (패리티 포함, 좌측 정렬)
     */
    private _get_stxl_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return 0;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_STXL[n_track][n_combi];
        } else {
            return 0;
        }

        if (!this._is_success_response(s_response)) return 0;
        if (this._get_length_member_of_response(s_response) !== n_size) return 0;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_etxl_from_response
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {number} 각 트랙 조합의 End Sentinel 패턴 (패리티 포함, 좌측 정렬)
     */
    private _get_etxl_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return 0;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_ETXL[n_track][n_combi];
        } else {
            return 0;
        }

        if (!this._is_success_response(s_response)) return 0;
        if (this._get_length_member_of_response(s_response) !== n_size) return 0;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_use_error_correct_from_response
     * @description 특정 트랙 조합에서 에러 교정 사용 여부를 확인합니다.
     * @returns {boolean | null} true(사용), false(미사용), null(에러)
     */
    private _get_use_error_correct_from_response = (s_response: string, n_track: number, n_combi: number): boolean | null => {
        if (n_combi < 0 || n_combi > 2) return null;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_USE_ERROR_CORRECT[n_track][n_combi];
        } else {
            return null;
        }

        if (!this._is_success_response(s_response)) return null;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_boolean(s_response);
    }

    /**
     * @private
     * @function _get_ecm_type_from_response
     * @description 에러 교정 모드(ECM)의 타입을 가져옵니다. (0: LRC, 1: Inverse LRC, 2: CRC)
     * @returns {number} ECM 타입 번호, 에러 시 음수(-1)
     */
    private _get_ecm_type_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return -1;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_ECM_TYPE[n_track][n_combi];
        } else {
            return -1;
        }

        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_add_value_from_response
     * @description 비트 데이터를 ASCII 코드로 변환하기 위해 더해지는 보정값을 가져옵니다.
     * @returns {number} 가산값(Add Value), 에러 시 음수(-1)
     */
    private _get_add_value_from_response = (s_response: string, n_track: number, n_combi: number): number => {
        if (n_combi < 0 || n_combi > 2) return -1;

        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_ADD_VALUE[n_track][n_combi];
        } else {
            return -1;
        }

        if (!this._is_success_response(s_response)) return -1;
        if (this._get_length_member_of_response(s_response) !== n_size) return -1;

        return this._get_data_field_member_of_response_by_number(s_response);
    }

    /**
     * @private
     * @function _get_private_prefix_from_response
     * @description 특정 트랙의 특정 조합에 설정된 개별 접두사를 가져옵니다.
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {string | null} Hex 문자열 형식의 Prefix, 에러 시 null
     */
    private _get_private_prefix_from_response = (s_response: string, n_track: number, n_combi: number): string | null => {
        // 1. 트랙 번호 유효성 및 해당 필드의 기대 사이즈 확인
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_P_PRE[n_track][n_combi];
        } else {
            return null;
        }

        // 2. 응답 성공 여부 및 데이터 길이 검증
        if (!this._is_success_response(s_response)) return null;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        // 3. 헥사 문자열로 변환하여 반환
        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_private_postfix_from_response
     * @description 특정 트랙의 특정 조합에 설정된 개별 접미사를 가져옵니다.
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @param {number} n_track - ISO 트랙 번호 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {string | null} Hex 문자열 형식의 Postfix, 에러 시 null
     */
    private _get_private_postfix_from_response = (s_response: string, n_track: number, n_combi: number): string | null => {
        // 1. 트랙 번호 유효성 및 해당 필드의 기대 사이즈 확인
        let n_size = 0;
        if (n_track >= _type_msr_track_Numer.iso1_track && n_track <= _type_msr_track_Numer.iso3_track) {
            n_size = _type_system_size.SYS_SIZE_P_POST[n_track][n_combi];
        } else {
            return null;
        }

        // 2. 응답 성공 여부 및 데이터 길이 검증
        if (!this._is_success_response(s_response)) return null;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        // 3. 헥사 문자열로 변환하여 반환
        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_remove_from_response
     * @description iButton 제거 시 전송할 기본 데이터 설정을 가져옵니다.
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_ibutton_remove_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_IBUTTON_REMOVE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_prefix_from_response
     * @description iButton 접촉 시 데이터 앞에 붙는 전역 접두사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_ibutton_prefix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_prefix_remove_from_response
     * @description iButton 제거 시 데이터 앞에 붙는 전역 접두사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_ibutton_prefix_remove_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE_REMOVE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_postfix_from_response
     * @description iButton 접촉 시 데이터 뒤에 붙는 전역 접미사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_ibutton_postfix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_ibutton_postfix_remove_from_response
     * @description iButton 제거 시 데이터 뒤에 붙는 전역 접미사를 가져옵니다.
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_ibutton_postfix_remove_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST_REMOVE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_uart_prefix_from_response
     * @description UART 인터페이스 데이터 송신 시 앞에 붙는 전역 접두사를 가져옵니다.
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_uart_prefix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_UART_G_PRE;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_uart_postfix_from_response
     * @description UART 인터페이스 데이터 송신 시 뒤에 붙는 전역 접미사를 가져옵니다.
     * @param {string} s_response - lpu237 프로토콜 패킷
     * @returns {string | null} Hex 문자열 형식, 에러 시 null
     */
    private _get_uart_postfix_from_response = (s_response: string): string | null => {
        if (!this._is_success_response(s_response)) return null;

        const n_size = _type_system_size.SYS_SIZE_UART_G_POST;
        if (this._get_length_member_of_response(s_response) !== n_size) return null;

        return this._get_data_field_member_of_response_by_hex_string(s_response);
    }

    /**
     * @private
     * @function _get_global_pre_postfix_send_condition_from_string
     * @description 문자열 입력을 바탕으로 전역 접두사/접미사 전송 조건을 결정합니다.
     * @param {string} s_string - "and" 또는 "or"
     * @returns {boolean | null} true(And 조건: 모든 트랙 성공 시), false(Or 조건: 하나만 성공해도), 에러 시 null
     */
    private _get_global_pre_postfix_send_condition_from_string(s_string: string): boolean | null {
        if (typeof s_string !== 'string') return null;

        if (s_string === "and") {
            return true;
        } else if (s_string === "or") {
            return false;
        }

        return null;
    }

    /**
     * @private
     * @function _get_track_order_from_string
     * @description 문자열(예: "123")을 기반으로 트랙 출력 순서를 배열로 반환합니다.
     * @param {string} s_string - "123", "132", "213", "231", "312", "321" 중 하나
     * @returns {number[] | null} 트랙 인덱스 배열 (예: [0, 1, 2]), 에러 시 null
     */
    private _get_track_order_from_string(s_string: string): number[] | null {
        if (typeof s_string !== 'string') return null;

        // 매핑 테이블을 사용하여 가독성 개선
        const orderMap: { [key: string]: number[] } = {
            "123": [0, 1, 2],
            "132": [0, 2, 1],
            "213": [1, 0, 2],
            "231": [1, 2, 0],
            "312": [2, 0, 1],
            "321": [2, 1, 0]
        };

        return orderMap[s_string] || null;
    }

    /**
     * @private
     * @function _get_indicate_error_condition_from_string
     * @description 장치가 성공/에러 상태를 표시할 기준 조건을 결정합니다.
     * @returns {boolean | null} true(And: 모든 트랙 성공 시만 성공 표시), false(Or: 하나만 성공해도 성공 표시), 에러 시 null
     */
    private _get_indicate_error_condition_from_string(s_string: string): boolean | null {
        if (typeof s_string !== 'string') return null;

        if (s_string === "and") return true;
        if (s_string === "or") return false;

        return null;
    }

    /**
     * @private
     * @function _get_interface_from_string
     * @description 문자열을 기반으로 시스템 인터페이스 번호를 가져옵니다.
     * @returns {number} 인터페이스 번호, 에러 시 -1
     */
    private _get_interface_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        const interfaceMap: Record<string, number> = {
            "usb_kb": type_system_interface.system_interface_usb_keyboard,
            "usb_hid": type_system_interface.system_interface_usb_msr,
            "rs232": type_system_interface.system_interface_uart
        };

        return interfaceMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_language_from_string
     * @description 키보드 시뮬레이션에 사용할 언어 인덱스를 가져옵니다.
     * @returns {number} 언어 인덱스 번호, 에러 시 -1
     */
    private _get_language_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        const langMap: Record<string, number> = {
            "usa_english": type_keyboard_language_index.language_map_index_english,
            "spanish": type_keyboard_language_index.language_map_index_spanish,
            "danish": type_keyboard_language_index.language_map_index_danish,
            "french": type_keyboard_language_index.language_map_index_french,
            "german": type_keyboard_language_index.language_map_index_german,
            "italian": type_keyboard_language_index.language_map_index_italian,
            "norwegian": type_keyboard_language_index.language_map_index_norwegian,
            "swedish": type_keyboard_language_index.language_map_index_swedish,
            "hebrew": type_keyboard_language_index.language_map_index_israel,
            "turkey": type_keyboard_language_index.language_map_index_turkey
        };

        return langMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_buzzer_count_from_string
     * @description 문자열 입력을 바탕으로 버저 주파수 카운터를 계산합니다.
     * @param {string} s_string - "on", "off" 또는 숫자로 된 주파수 문자열
     * @returns {number | null} 주파수 카운터 값, 에러 시 null
     */
    private _get_buzzer_count_from_string = (s_string: string): number | null => {
        if (s_string === "on") {
            return this._const_default_buzzer_count;
        }
        if (s_string === "off") {
            return this._const_default_buzzer_count_for_off;
        }

        // 주파수(Hz)를 카운터 값으로 변환
        const n_freq = parseInt(s_string, 10);
        if (isNaN(n_freq)) {
            return null;
        }

        // 장치 내부 타이머 틱에 맞춘 변환 수식: Count = 8.67 * Frequency
        return 8.67 * n_freq;
    }

    /**
     * @private
     * @function _get_enable_track_from_string
     * @description 트랙 읽기 활성화 여부를 결정합니다.
     * @param {string} s_string - "enable" 또는 "disable"
     * @returns {boolean | null} true(활성), false(비활성), 에러 시 null
     */
    private _get_enable_track_from_string(s_string: string): boolean | null {
        if (typeof s_string !== 'string') return null;

        if (s_string === "enable") return true;
        if (s_string === "disable") return false;

        return null;
    }

    /**
     * @private
     * @function _get_use_parity_from_string
     * @description 패리티 비트 사용 여부를 결정합니다. (내부적으로 _get_enable_track_from_string 활용)
     */
    private _get_use_parity_from_string = (s_string: string): boolean | null => {
        return this._get_enable_track_from_string(s_string);
    }

    /**
     * @private
     * @function _get_use_error_correct_from_string
     * @description 에러 교정 사용 여부를 결정합니다. (내부적으로 _get_enable_track_from_string 활용)
     */
    private _get_use_error_correct_from_string = (s_string: string): boolean | null => {
        return this._get_enable_track_from_string(s_string);
    }

    /**
     * @private
     * @function _get_direction_from_string
     * @description 카드를 읽는 허용 방향을 문자열로부터 파싱합니다.
     * @param {string} s_string - "bidirectional", "forward" 또는 "backward"
     * @returns {number} 읽기 방향 코드값, 에러 시 -1
     */
    private _get_direction_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        // 매핑 객체를 사용하여 조건문 가독성 향상
        const directionMap: Record<string, number> = {
            "bidirectional": type_direction.dir_bidectional, // 오타가 포함된 원본 속성명 유지
            "forward": type_direction.dir_forward,
            "backward": type_direction.dir_backward
        };

        // 매핑된 값이 있으면 반환, 없으면 -1 반환
        return directionMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_hid_key_pair_hex_string_from_string
     * @description [Modifier][Key] 형태의 문자열을 파싱하여 HID Hex 문자열로 변환합니다.
     * @param {boolean} b_ibutton_remove - iButton 제거 인디케이터 포함 여부
     * @param {string} s_string - 파싱할 XML 태그 문자열
     * @returns {string | null} Hex 문자열 (앞에 길이 정보 포함), 에러 시 null
     */
    private _get_hid_key_pair_hex_string_from_string = (b_ibutton_remove: boolean, s_string: string): string | null => {
        let s_hex_result: string | null = null;
        let b_all_zero = true;

        if (typeof s_string !== 'string') return null;

        let s_src = s_string.trim();

        // 1. 빈 문자열 처리 (기본 제로 패딩)
        if (s_src.length === 0) {
            return b_ibutton_remove ? '00'.repeat(41) : '00'.repeat(15);
        }

        let b_error = false;
        let s_token = "";
        const array_s_open_close: string[] = [];
        const array_s_token: string[] = [];

        // 2. 토큰 분리 로직 ([ ] 사이의 문자열 추출)
        while (s_src.length > 0) {
            let s_char = s_src.slice(0, 1);
            s_src = s_src.substring(1).trim();

            if (s_char === "[") {
                if (array_s_open_close.length % 2 === 0) {
                    s_token = "";
                    array_s_open_close.push(s_char);
                    continue;
                }
                s_token += s_char;
                continue;
            }

            if (array_s_open_close.length % 2 !== 1 || array_s_open_close[array_s_open_close.length - 1] !== "[") {
                b_error = true;
                break;
            }

            if (s_char === "]") {
                if (s_src.length === 0 || s_src.slice(0, 1) === "[") {
                    array_s_open_close.push(s_char);
                    array_s_token.push(s_token);
                    continue;
                }
            }
            s_token += s_char;
        }

        // 3. 유효성 검사
        if (b_error || array_s_token.length === 0 || array_s_token.length % 2 !== 0) {
            return null;
        }

        const array_s_mod: string[] = [];
        const array_s_key: string[] = [];

        // 4. Modifier와 Key 분리 및 All Zero 체크
        for (let i = 0; i < array_s_token.length; i++) {
            if (i % 2 === 0) {
                array_s_mod.push(array_s_token[i]);
            } else {
                array_s_key.push(array_s_token[i]);
            }
            if (array_s_token[i] !== "00" && array_s_token[i].length > 0) {
                b_all_zero = false;
            }
        }

        // 5. 심볼을 실제 HID Hex 코드로 변환
        s_hex_result = "";
        for (let i = 0; i < array_s_mod.length; i++) {
            const s_hid_modifier_code_hex = this._get_hid_modifier_code_hex_string_by_key_symbol(array_s_mod[i]);
            const s_hid_key_code_hex = this._get_hid_key_code_hex_string_by_key_symbol(array_s_key[i]);

            if (s_hid_modifier_code_hex === null || s_hid_key_code_hex === null) {
                b_error = true;
                break;
            }
            s_hex_result += s_hid_modifier_code_hex + s_hid_key_code_hex;
        }

        if (b_error) return null;

        // 6. 길이 정보 및 최종 결과 생성
        let s_len = array_s_token.length.toString(16).padStart(2, '0');

        if (b_all_zero) {
            return b_ibutton_remove ? '00'.repeat(41) : '00'.repeat(15);
        } else {
            return s_len + s_hex_result;
        }
    }

    /**
     * @private
     * @function _get_ibutton_mode_from_string
     * @description 문자열 입력을 바탕으로 iButton 동작 모드 번호를 가져옵니다.
     * @param {string} s_string - "none", "zeros", "f12", "zeros7" 또는 "addimat"
     * @returns {number} iButton 모드 번호, 에러 시 음수(-1) 반환
     */
    private _get_ibutton_mode_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        // 매핑 객체를 사용하여 다중 if문을 깔끔하게 처리
        const modeMap: Record<string, number> = {
            "none": _type_ibutton_mode.ibutton_none,
            "zeros": _type_ibutton_mode.ibutton_zeros,
            "f12": _type_ibutton_mode.ibutton_f12,
            "zeros7": _type_ibutton_mode.ibutton_zeros7,
            "addimat": _type_ibutton_mode.ibutton_addmit // 원본 속성명(addmit) 유지
        };

        // 매핑된 값이 있으면 반환, 없으면 -1 반환
        return modeMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_parity_type_from_string
     * @description 패리티 검사 방식(홀수/짝수)을 파싱합니다.
     * @param {string} s_string - "odd" 또는 "even"
     * @returns {number} 0(Even), 1(Odd), 에러 시 -1
     */
    private _get_parity_type_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        const parityMap: Record<string, number> = {
            "even": type_parity.parity_even,
            "odd": type_parity.parity_odd
        };

        return parityMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_error_correct_type_from_string
     * @description 에러 교정 및 검출 알고리즘 타입을 파싱합니다.
     * @param {string} s_string - "lrc", "invlrc" 또는 "crc"
     * @returns {number} 0(LRC), 1(invLRC), 2(CRC), 에러 시 -1
     */
    private _get_error_correct_type_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        const errorCorrectMap: Record<string, number> = {
            "lrc": type_error_correct.error_correct_lrc,
            "invlrc": type_error_correct.error_correct_inv_lrc,
            "crc": type_error_correct.error_correct_crc
        };

        return errorCorrectMap[s_string] ?? -1;
    }

    /**
     * @private
     * @function _get_mmd1100_reset_interval_from_string
     * @description MMD1100 보안 칩의 리셋 간격 값을 파싱합니다.
     * @param {string} s_string - "default", "disable", 또는 "0", "16", ... "240" (16의 배수 문자열)
     * @returns {number} 0~240 사이의 16의 배수, 에러 시 음수(-1)
     */
    private _get_mmd1100_reset_interval_from_string(s_string: string): number {
        if (typeof s_string !== 'string') return -1;

        // 1. 특수 키워드 처리
        if (s_string === "default") {
            return 0;
        }
        if (s_string === "disable") {
            return 240;
        }

        // 2. 숫자 파싱 및 유효성 검사
        const n_interval = parseInt(s_string, 10);

        if (isNaN(n_interval)) {
            return -1;
        }

        // 16의 배수인지 확인 (하드웨어 레지스터 제약 조건)
        if (n_interval < 0 || n_interval > 240 || (n_interval % 16) !== 0) {
            return -1;
        }

        return n_interval;
    }

    /**
     * @private
     * @function _generate_request
     * @description 장치로 보낼 프로토콜 패킷을 생성하여 큐에 추가합니다.
     * @param {string[]} queue_s_tx - 생성된 요청이 저장될 배열(큐)
     * @param {string} s_type_request - 요청 타입 (_type_cmd 중 하나)
     * @param {string} s_hex_sub - 2자리의 16진수 서브 타입 문자열
     * @param {string} s_hex_data_field - 16진수 데이터 필드 문자열 (구분자 없음)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_request(
        queue_s_tx: string[],
        s_type_request: string,
        s_hex_sub: string,
        s_hex_data_field: string
    ): boolean {
        let n_length = 0;

        // 1. 데이터 필드 길이 유효성 검사 및 길이 계산
        if (typeof s_hex_data_field === 'string') {
            if (s_hex_data_field.length % 2 !== 0) {
                return false; // Hex 문자열은 반드시 2글자 단위여야 함
            }
            n_length = s_hex_data_field.length / 2;
        }

        // 2. 패킷 조립 시작 (Type + Sub)
        let s_request = s_type_request + s_hex_sub;

        // 3. 길이 필드 생성 (16진수 문자열로 변환 및 2자리 패딩)
        let s_length_hex = n_length.toString(16).padStart(2, '0');

        // 4. 전체 요청 문자열 완성
        s_request += s_length_hex;

        if (n_length > 0) {
            s_request += s_hex_data_field;
        }

        // 5. 전송 큐에 삽입
        queue_s_tx.push(s_request);
        return true;
    }

    /**
     * @private
     * @function _generate_config_get
     * @description 시스템 파라미터를 읽기 위한 요청 패킷을 생성하여 큐에 추가합니다.
     * @param {string[]} queue_s_tx - 생성된 요청이 저장될 배열
     * @param {number} n_offset - 읽어올 파라미터의 시작 오프셋
     * @param {number} n_size - 읽어올 데이터의 크기 (바이트 단위)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_config_get = (queue_s_tx: string[], n_offset: number, n_size: number): boolean => {
        // 1. 입력값 유효성 검사
        if (typeof n_offset !== 'number' || n_offset < 0) return false;
        if (typeof n_size !== 'number' || n_size < 0) return false;

        /**
         * 2. 데이터 필드 구성
         * Offset(4바이트) + Size(4바이트) 형태의 Hex 문자열을 생성합니다.
         * util.get_dword_hex_string_from_number는 숫자를 8자리(DWORD) Hex 문자열로 변환한다고 가정합니다.
         */
        const s_offset = util.get_dword_hex_string_from_number(n_offset);
        const s_size = util.get_dword_hex_string_from_number(n_size);
        const s_data = s_offset + s_size;

        // 3. 공통 요청 생성 함수 호출
        // 서브 타입은 request_config_get을 16진수 문자열로 변환하여 전달합니다.
        return this._generate_request(
            queue_s_tx,
            _type_cmd.REQ_CONFIG,
            _type_system_request_config.request_config_get.toString(16).padStart(2, '0'),
            s_data
        );
    }

    /**
     * @private
     * @function _generate_get_version
     * @description 장치의 펌웨어 버전 정보를 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_version = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_VERSION;
        const n_size = _type_system_size.SYS_SIZE_VERSION;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_version_structure
     * @description 장치의 버전 구조체 정보(포맷 정보 등)를 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_version_structure = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_VERSION_STRUCTURE;
        const n_size = _type_system_size.SYS_SIZE_VERSION_STRUCTURE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_name
     * @description 장치의 모델 이름(예: LPU237)을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_name = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_NAME;
        const n_size = _type_system_size.SYS_SIZE_NAME;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_device_support_mmd1000
     * @description 장치가 MMD1000 보안 디코더 칩을 지원하는지 확인하는 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_device_support_mmd1000 = (queue_s_tx: string[]): boolean => {
        // 데이터 필드(s_hex_data_field)가 없는 경우 빈 문자열("")을 전달합니다.
        return this._generate_request(queue_s_tx, _type_cmd.REQ_IS_MMD1000, "00", "");
    }

    /**
     * @private
     * @function _generate_get_uid
     * @description 장치의 고유 식별 번호(Unique ID)를 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_uid = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_GET_ID, "00", "");
    }

    /**
     * @private
     * @function _generate_get_device_ibutton_type
     * @description 장치가 iButton 전용(Only iButton) 모델인지 확인하는 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_device_ibutton_type = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_IS_ONLY_IBUTTON, "00", "");
    }

    /**
     * @private
     * @function _generate_get_device_type
     * @description 장치가 표준 모델(Standard)인지 확인하는 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_device_type = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_IS_STANDARD, "00", "");
    }

    /**
     * @private
     * @function _generate_get_global_pre_postfix_send_condition
     * @description 글로벌 Pre/Post-fix의 전송 조건 설정을 읽어오기 위한 요청을 생성합니다.
     */
    private _generate_get_global_pre_postfix_send_condition = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_TAG_CONDITION;
        const n_size = _type_system_size.SYS_SIZE_G_TAG_CONDITION;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_blank_4bytes
     * @description 예약된 4바이트 공백 영역을 읽어옵니다. (보통 장치 정렬이나 특정 더미 데이터 확인용)
     */
    private _generate_get_blank_4bytes = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_BLANK_4BYTES;
        const n_size = _type_system_size.SYS_SIZE_BLANK_4BYTES;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_interface
     * @description 현재 장치의 통신 인터페이스(USB HID, V-COM 등) 설정을 읽어옵니다.
     */
    private _generate_get_interface = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_INTERFACE;
        const n_size = _type_system_size.SYS_SIZE_INTERFACE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_language
     * @description 키보드 레이아웃/언어 설정(Keymap)을 읽어옵니다.
     */
    private _generate_get_language = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_KEYMAP;
        const n_size = _type_system_size.SYS_SIZE_KEYMAP;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_buzzer_count
     * @description 현재 설정된 버저의 주파수 카운터 값을 읽어옵니다.
     */
    private _generate_get_buzzer_count = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_BUZZER_FREQ;
        const n_size = _type_system_size.SYS_SIZE_BUZZER_FREQ;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_boot_run_time
     * @description 부트 후 실행 시간 관련 설정을 읽어옵니다.
     */
    private _generate_get_boot_run_time = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_BOOT_RUN_TIME;
        const n_size = _type_system_size.SYS_SIZE_BOOT_RUN_TIME;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_enable_track
     * @description 특정 트랙의 활성화 여부 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0: Track1, 1: Track2, 2: Track3)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_enable_track = (queue_s_tx: string[], n_track: number): boolean => {
        // 인덱스 범위 유효성 검사 (0~2)
        if (n_track < 0 || n_track > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ENABLE_TRACK[n_track];
        const n_size = _type_system_size.SYS_SIZE_ENABLE_TRACK[n_track];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_direction
     * @description 특정 트랙의 읽기 방향 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_direction = (queue_s_tx: string[], n_track: number): boolean => {
        // 인덱스 범위 유효성 검사 (0~2)
        if (n_track < 0 || n_track > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_DIRECTION[n_track];
        const n_size = _type_system_size.SYS_SIZE_DIRECTION[n_track];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_global_prefix
     * @description 모든 데이터 전송 시 최상단에 붙는 글로벌 접두사(Prefix) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_global_prefix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_G_PRE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_global_postfix
     * @description 모든 데이터 전송 시 최하단에 붙는 글로벌 접미사(Postfix) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @returns {boolean} 성공 여부
     */
    private _generate_get_global_postfix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_POST;
        const n_size = _type_system_size.SYS_SIZE_G_POST;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_number_combi
     * @description 특정 트랙의 키 조합(Combination) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 생성된 요청이 저장될 배열(큐)
     * @param {number} n_track - 트랙 인덱스 (0: Track 1, 1: Track 2, 2: Track 3)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_get_number_combi = (queue_s_tx: string[], n_track: number): boolean => {
        // 1. 인덱스 유효성 검사 (0, 1, 2만 허용)
        if (n_track < 0 || n_track > 2) {
            return false;
        }

        /**
         * 2. 오프셋 및 사이즈 결정
         * 원본 switch 로직을 배열 인덱스 접근으로 최적화했습니다.
         */
        const n_offset = _type_system_offset.SYS_OFFSET_COMBINATION[n_track];
        const n_size = _type_system_size.SYS_SIZE_COMBINATION[n_track];

        // 3. 공통 설정 읽기 함수 호출
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_max_size
     * @description 트랙 및 조합별 데이터의 최대 허용 크기 설정을 읽어옵니다.
     */
    private _generate_get_max_size = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_MAX_SIZE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_MAX_SIZE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_bit_size
     * @description 트랙 및 조합별 비트 단위 데이터 크기 설정을 읽어옵니다.
     */
    private _generate_get_bit_size = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_BIT_SIZE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_BIT_SIZE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_data_mask
     * @description 특정 트랙 데이터 추출 시 적용할 마스크(추출 범위) 설정을 읽어옵니다.
     */
    private _generate_get_data_mask = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_DATA_MASK[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_DATA_MASK[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_use_parity
     * @description 특정 트랙 및 조합에서 패리티 비트 사용 여부 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_use_parity = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        // 인덱스 범위 유효성 검사
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) {
            return false;
        }

        // 2차원 오프셋 및 사이즈 맵에서 값 추출
        const n_offset = _type_system_offset.SYS_OFFSET_USE_PARITY[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_USE_PARITY[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_parity_type
     * @description 특정 트랙 및 조합의 패리티 검사 방식(Even/Odd) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_parity_type = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        // 인덱스 범위 유효성 검사 (Track: 0~2, Combination: 0~2)
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) {
            return false;
        }

        /**
         * 2차원 배열 구조의 상수를 사용하여 Offset과 Size를 결정합니다.
         * 원본의 switch-case 문을 인덱스 참조 방식으로 간소화했습니다.
         */
        const n_offset = _type_system_offset.SYS_OFFSET_PARITY_TYPE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_PARITY_TYPE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_stxl
     * @description 특정 트랙 및 조합의 시작 센티널(Start Sentinel) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_stxl = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        // 인덱스 범위 유효성 검사
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) {
            return false;
        }

        const n_offset = _type_system_offset.SYS_OFFSET_STXL[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_STXL[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_etxl
     * @description 특정 트랙 및 조합의 종료 센티널(End Sentinel) 설정을 읽기 위한 요청을 생성합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     * @returns {boolean} 성공 여부
     */
    private _generate_get_etxl = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        // 인덱스 범위 유효성 검사
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) {
            return false;
        }

        const n_offset = _type_system_offset.SYS_OFFSET_ETXL[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ETXL[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_use_error_correct
     * @description 특정 트랙 및 조합의 에러 교정 기능 사용 여부를 읽어옵니다.
     */
    private _generate_get_use_error_correct = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_USE_ERROR_CORRECT[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_USE_ERROR_CORRECT[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_ecm_type
     * @description 에러 교정 모드(ECM)의 세부 유형 설정을 읽어옵니다.
     */
    private _generate_get_ecm_type = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ECM_TYPE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ECM_TYPE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_add_value
     * @description 디코딩된 데이터 값에 특정 수치를 더하거나 변환할 때 사용하는 추가 값 설정을 읽어옵니다.
     */
    private _generate_get_add_value = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ADD_VALUE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ADD_VALUE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_private_prefix
     * @description 특정 트랙 및 조합의 개별 접두사(Private Prefix) 설정을 읽어옵니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     */
    private _generate_get_private_prefix = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_P_PRE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_P_PRE[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_get_private_postfix
     * @description 특정 트랙 및 조합의 개별 접미사(Private Postfix) 설정을 읽어옵니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_track - 트랙 인덱스 (0~2)
     * @param {number} n_combi - 조합 인덱스 (0~2)
     */
    private _generate_get_private_postfix = (queue_s_tx: string[], n_track: number, n_combi: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_P_POST[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_P_POST[n_track][n_combi];

        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    // === iButton 접촉(Attach) 관련 설정 ===

    /** @description iButton 접촉 시 데이터 앞에 붙는 Prefix 조회 */
    private _generate_get_ibutton_prefix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /** @description iButton 접촉 시 데이터 뒤에 붙는 Postfix 조회 */
    private _generate_get_ibutton_postfix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_POST;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    // === iButton 제거(Remove) 관련 설정 ===

    /** @description iButton 제거 시 알림 전송 여부 설정 조회 */
    private _generate_get_ibutton_remove = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_REMOVE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /** @description iButton 제거 알림 시 사용할 Prefix 조회 */
    private _generate_get_ibutton_prefix_remove = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_PRE_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE_REMOVE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /** @description iButton 제거 알림 시 사용할 Postfix 조회 */
    private _generate_get_ibutton_postfix_remove = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_POST_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST_REMOVE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    // === UART(Serial) 관련 설정 ===

    /** @description UART 데이터 전송 시 사용할 Prefix 조회 */
    private _generate_get_uart_prefix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_UART_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_UART_G_PRE;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /** @description UART 데이터 전송 시 사용할 Postfix 조회 */
    private _generate_get_uart_postfix = (queue_s_tx: string[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_UART_G_POST;
        const n_size = _type_system_size.SYS_SIZE_UART_G_POST;
        return this._generate_config_get(queue_s_tx, n_offset, n_size);
    }

    /**
     * @private
     * @function _generate_config_set
     * @description 장치의 시스템 파라미터를 설정하기 위한 요청 패킷을 생성합니다.
     * @param {string[]} queue_s_tx - 생성된 요청이 저장될 큐(배열)
     * @param {number} n_offset - 시스템 파라미터의 메모리 오프셋
     * @param {number} n_size - 설정할 데이터의 바이트 크기
     * @param {string} s_setting_data - 설정할 데이터 (구분자 없는 Hex String)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_config_set = (
        queue_s_tx: string[],
        n_offset: number,
        n_size: number,
        s_setting_data: string
    ): boolean => {
        let b_result = false;

        // 1. 입력 파라미터 유효성 검사
        if (typeof n_offset !== 'number' || n_offset < 0) return false;
        if (typeof n_size !== 'number' || n_size < 0) return false;

        /**
         * 2. 데이터 패킷 구성
         * Offset(4byte hex) + Size(4byte hex) + Setting Data
         */
        const s_offset = util.get_dword_hex_string_from_number(n_offset);
        const s_size = util.get_dword_hex_string_from_number(n_size);
        const s_data = s_offset + s_size + s_setting_data;

        // 3. 공통 요청 생성 함수 호출
        // _type_system_request_config.request_config_set는 기록 모드를 식별하는 서브 커맨드입니다.
        b_result = this._generate_request(
            queue_s_tx,
            _type_cmd.REQ_CONFIG,
            _type_system_request_config.request_config_set.toString(16),
            s_data
        );

        return b_result;
    }

    /**
     * @description 글로벌 Prefix/Postfix 전송 조건 설정
     * @param b_send_always true면 데이터가 없어도 태그 전송, false면 데이터가 있을 때만 전송
     */
    private _generate_set_global_pre_postfix_send_condition = (
        queue_s_tx: string[],
        b_send_always: boolean
    ): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_TAG_CONDITION;
        const n_size = _type_system_size.SYS_SIZE_G_TAG_CONDITION;

        // Boolean 값을 DWORD(4바이트) Hex 문자열로 변환 (1 또는 0)
        const s_data = util.get_dword_hex_string_from_number(b_send_always ? 1 : 0);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 카드 트랙 출력 순서 설정 (예: [2, 1, 3] 순서로 출력)
     * @param array_n_order 트랙 번호가 담긴 3개 요소의 숫자 배열
     */
    private _generate_set_track_order = (queue_s_tx: string[], array_n_order: number[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_CONTAINER_TRACK_ORDER;
        const n_size = _type_system_size.SYS_SIZE_CONTAINER_TRACK_ORDER;

        // 각 트랙 번호를 DWORD Hex로 변환하여 병합
        const s_data = array_n_order
            .map(order => util.get_dword_hex_string_from_number(order))
            .join("");

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 시스템 예약 또는 공백 4바이트 데이터 설정
     * @param cblank 4개의 숫자로 이루어진 배열
     */
    private _generate_set_blank_4byets = (queue_s_tx: string[], cblank: number[]): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_BLANK_4BYTES;
        const n_size = _type_system_size.SYS_SIZE_BLANK_4BYTES;

        // 각 요소를 Byte Hex로 변환하여 병합
        const s_data = cblank
            .slice(0, n_size)
            .map(val => util.get_byte_hex_string_from_number(val))
            .join("");

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 장치 통신 인터페이스 설정 (USB HID, 가상 컴포트 등)
     * @param n_interface 인터페이스 타입 코드
     */
    private _generate_set_interface = (queue_s_tx: string[], n_interface: number): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_INTERFACE;
        const n_size = _type_system_size.SYS_SIZE_INTERFACE;
        const s_data = util.get_byte_hex_string_from_number(n_interface);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @private
     * @function _generate_set_language
     * @description 장치의 키보드 언어 레이아웃(Map Index)을 설정합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {number} n_language - 설정할 언어 인덱스 코드
     * @returns {boolean} 모든 요청 생성 성공 여부
     */
    private _generate_set_language = (queue_s_tx: string[], n_language: number): boolean => {
        // 1. 공통 데이터 준비 (DWORD 형태의 Hex 문자열)
        const s_data = util.get_dword_hex_string_from_number(n_language);

        // 2. 전역 컨테이너 언어 설정 (Container Map Index)
        let n_offset: number = _type_system_offset.SYS_OFFSET_CONTAINER_MAP_INDEX;
        let n_size: number = _type_system_size.SYS_SIZE_CONTAINER_MAP_INDEX;

        if (!this._generate_config_set(queue_s_tx, n_offset, n_size, s_data)) {
            return false;
        }

        // 3. 각 트랙별 언어 설정 동기화 (InformSR Map Index)
        // this._const_the_number_of_track는 보통 3 (Track 1, 2, 3)입니다.
        for (let i = 0; i < this._const_the_number_of_track; i++) {
            n_offset = _type_system_offset.SYS_OFFSET_INFOMSR_MAP_INDEX[i];
            n_size = _type_system_size.SYS_SIZE_INFOMSR_MAP_INDEX[i];

            if (!this._generate_config_set(queue_s_tx, n_offset, n_size, s_data)) {
                return false; // 하나라도 실패하면 즉시 중단
            }
        }

        return true;
    }

    /**
     * @description 부저(Buzzer) 소리 횟수 또는 주파수 설정
     * @param n_buzzer 설정할 수치 (4바이트 DWORD 형식으로 변환됨)
     */
    private _generate_set_buzzer_count = (queue_s_tx: string[], n_buzzer: number): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_BUZZER_FREQ;
        const n_size = _type_system_size.SYS_SIZE_BUZZER_FREQ;
        const s_data = util.get_dword_hex_string_from_number(n_buzzer);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 특정 트랙(0~2)의 활성화/비활성화 설정
     * @param n_track 트랙 인덱스 (0~2)
     * @param b_enable 활성화 여부
     */
    private _generate_set_enable_track = (queue_s_tx: string[], n_track: number, b_enable: boolean): boolean => {
        if (n_track < 0 || n_track > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ENABLE_TRACK[n_track];
        const n_size = _type_system_size.SYS_SIZE_ENABLE_TRACK[n_track];
        // 1바이트 데이터 (01: Enable, 00: Disable)
        const s_data = util.get_byte_hex_string_from_number(b_enable ? 1 : 0);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 트랙 읽기 방향 설정 (정방향/역방향/양방향 등)
     * @param n_track 트랙 인덱스 (0~2)
     * @param n_direction 방향 설정 코드
     */
    private _generate_set_direction = (queue_s_tx: string[], n_track: number, n_direction: number): boolean => {
        if (n_track < 0 || n_track > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_DIRECTION[n_track];
        const n_size = _type_system_size.SYS_SIZE_DIRECTION[n_track];
        const s_data = util.get_byte_hex_string_from_number(n_direction);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 모든 트랙 데이터의 최상단에 붙는 글로벌 접두사(Global Prefix) 설정
     * @param s_tag 설정할 태그 문자열 (Hex String)
     */
    private _generate_set_global_prefix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_G_PRE;

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @description 모든 트랙 데이터의 최하단에 붙는 글로벌 접미사(Global Postfix) 설정
     * @param s_tag 설정할 태그 문자열 (Hex String)
     */
    private _generate_set_global_postfix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_G_POST;
        const n_size = _type_system_size.SYS_SIZE_G_POST;

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @description 트랙별 사용될 조합(Combination)의 개수를 설정합니다.
     * @param n_track 트랙 인덱스 (0~2)
     * @param n_combi_number 조합 개수 (1~3)
     */
    private _generate_set_number_combi = (queue_s_tx: string[], n_track: number, n_combi_number: number): boolean => {
        if (n_track < 0 || n_track > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_COMBINATION[n_track];
        const n_size = _type_system_size.SYS_SIZE_COMBINATION[n_track];
        const s_data = util.get_byte_hex_string_from_number(n_combi_number);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 특정 트랙/조합의 최대 데이터 길이를 설정합니다.
     */
    private _generate_set_max_size = (queue_s_tx: string[], n_track: number, n_combi: number, n_max_size: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_MAX_SIZE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_MAX_SIZE[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(n_max_size);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 한 문자를 구성하는 비트 수(5-bit, 7-bit 등)를 설정합니다.
     */
    private _generate_set_bit_size = (queue_s_tx: string[], n_track: number, n_combi: number, n_bit_size: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_BIT_SIZE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_BIT_SIZE[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(n_bit_size);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 데이터 유효 비트를 추출하기 위한 마스크 패턴을 설정합니다.
     */
    private _generate_set_data_mask = (queue_s_tx: string[], n_track: number, n_combi: number, c_data_mask: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_DATA_MASK[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_DATA_MASK[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(c_data_mask);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 패리티(Parity) 체크 기능 사용 여부를 설정합니다.
     */
    private _generate_set_use_parity = (queue_s_tx: string[], n_track: number, n_combi: number, b_enable: boolean): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_USE_PARITY[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_USE_PARITY[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(b_enable ? 1 : 0);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 패리티 타입을 설정합니다 (0: Even, 1: Odd).
     */
    private _generate_set_parity_type = (queue_s_tx: string[], n_track: number, n_combi: number, n_parity_type: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_PARITY_TYPE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_PARITY_TYPE[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(n_parity_type);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 시작 센티넬(Start Sentinel) 패턴 설정
     * @param c_stxl 시작 센티넬로 사용할 문자 패턴 (1바이트)
     */
    private _generate_set_stxl = (queue_s_tx: string[], n_track: number, n_combi: number, c_stxl: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_STXL[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_STXL[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(c_stxl);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 종료 센티넬(End Sentinel) 패턴 설정
     * @param c_etxl 종료 센티넬로 사용할 문자 패턴 (1바이트)
     */
    private _generate_set_etxl = (queue_s_tx: string[], n_track: number, n_combi: number, c_etxl: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ETXL[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ETXL[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(c_etxl);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 에러 교정(Error Correction) 기능 활성화 여부 설정
     */
    private _generate_set_use_error_correct = (queue_s_tx: string[], n_track: number, n_combi: number, b_enable: boolean): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_USE_ERROR_CORRECT[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_USE_ERROR_CORRECT[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(b_enable ? 1 : 0);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 에러 교정 모드(ECM) 유형 설정
     */
    private _generate_set_ecm_type = (queue_s_tx: string[], n_track: number, n_combi: number, n_ecm_type: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ECM_TYPE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ECM_TYPE[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(n_ecm_type);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description ASCII 코드 변환을 위한 가산 값(Add Value) 설정
     */
    private _generate_set_add_value = (queue_s_tx: string[], n_track: number, n_combi: number, c_add: number): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_ADD_VALUE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_ADD_VALUE[n_track][n_combi];
        const s_data = util.get_byte_hex_string_from_number(c_add);

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_data);
    }

    /**
     * @description 특정 트랙 및 조합의 개별 접두사(Private Prefix)를 설정합니다.
     * @param n_track 트랙 인덱스 (0~2)
     * @param n_combi 조합 인덱스 (0~2)
     * @param s_tag 설정할 태그 데이터 (Hex 문자열)
     */
    private _generate_set_private_prefix = (
        queue_s_tx: string[],
        n_track: number,
        n_combi: number,
        s_tag: string
    ): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_P_PRE[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_P_PRE[n_track][n_combi];

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @description 특정 트랙 및 조합의 개별 접미사(Private Postfix)를 설정합니다.
     * @param n_track 트랙 인덱스 (0~2)
     * @param n_combi 조합 인덱스 (0~2)
     * @param s_tag 설정할 태그 데이터 (Hex 문자열)
     */
    private _generate_set_private_postfix = (
        queue_s_tx: string[],
        n_track: number,
        n_combi: number,
        s_tag: string
    ): boolean => {
        if (n_track < 0 || n_track > 2 || n_combi < 0 || n_combi > 2) return false;

        const n_offset = _type_system_offset.SYS_OFFSET_P_POST[n_track][n_combi];
        const n_size = _type_system_size.SYS_SIZE_P_POST[n_track][n_combi];

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @private
     * @function _generate_set_key_map
     * @description 선택된 언어에 해당하는 HID 및 PS2 키 매핑 테이블을 장치에 기록합니다.
     * @param {string[]} queue_s_tx - 요청 패킷이 저장될 큐
     * @param {number} n_language - 언어 인덱스
     * @returns {boolean} 모든 매핑 데이터 기록 성공 여부
     */
    private _generate_set_key_map = (queue_s_tx: string[], n_language: number): boolean => {
        // 최대 ASCII 코드 변환 크기 (보통 128 또는 256)
        const n_max_cvt = elpusk_util_keyboard_const.FOR_CVT_MAX_ASCII_CODE;

        // --- 1. USB HID Key Map 설정 ---
        let s_full_data = elpusk_util_keyboard_map.get_ascii_to_hid_key_map_string(n_language);
        if (!this._send_split_config(queue_s_tx, this._const_address_system_hid_key_map_offset, n_max_cvt, s_full_data)) {
            return false;
        }

        // --- 2. PS/2 Key Map 설정 ---
        s_full_data = elpusk_util_keyboard_map.get_ascii_to_ps2_key_map_string(n_language);
        if (!this._send_split_config(queue_s_tx, this._const_address_system_ps2_key_map_offset, n_max_cvt, s_full_data)) {
            return false;
        }

        return true;
    }

    /**
     * @description 데이터를 절반으로 나누어 장치에 기록하는 헬퍼 함수
     */
    private _send_split_config = (queue_s_tx: string[], n_base_offset: number, n_size: number, s_full_data: string): boolean => {
        const half_len = Math.floor(s_full_data.length / 2);

        // 전반부 기록
        const s_first_half = s_full_data.substring(0, half_len);
        if (!this._generate_config_set(queue_s_tx, n_base_offset, n_size, s_first_half)) {
            return false;
        }

        // 후반부 기록 (오프셋을 n_size만큼 이동)
        const s_second_half = s_full_data.substring(half_len);
        if (!this._generate_config_set(queue_s_tx, n_base_offset + n_size, n_size, s_second_half)) {
            return false;
        }

        return true;
    }

    // === iButton 접촉(Attach) 관련 설정 기록 ===

    /** @description iButton 접촉 시 전송될 데이터의 Prefix 설정 */
    private _generate_set_ibutton_prefix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE;
        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /** @description iButton 접촉 시 전송될 데이터의 Postfix 설정 */
    private _generate_set_ibutton_postfix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_POST;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST;
        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    // === iButton 제거(Remove) 관련 설정 기록 ===

    /** @description iButton 제거 이벤트 발생 여부 및 관련 데이터 설정 */
    private _generate_set_ibutton_remove = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_REMOVE;
        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /** @description iButton 제거 시 전송될 데이터의 Prefix 설정 */
    private _generate_set_ibutton_prefix_remove = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_PRE_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_PRE_REMOVE;
        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /** @description iButton 제거 시 전송될 데이터의 Postfix 설정 */
    private _generate_set_ibutton_postfix_remove = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_IBUTTON_G_POST_REMOVE;
        const n_size = _type_system_size.SYS_SIZE_IBUTTON_G_POST_REMOVE;
        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @private
     * @function _generate_set_uart_prefix
     * @description UART 통신 시 데이터 앞에 붙는 Prefix를 설정합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {string} s_tag - 설정할 Prefix (Hex 문자열)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_set_uart_prefix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_UART_G_PRE;
        const n_size = _type_system_size.SYS_SIZE_UART_G_PRE;

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @private
     * @function _generate_set_uart_postfix
     * @description UART 통신 시 데이터 뒤에 붙는 Postfix를 설정합니다.
     * @param {string[]} queue_s_tx - 요청이 저장될 큐
     * @param {string} s_tag - 설정할 Postfix (Hex 문자열)
     * @returns {boolean} 생성 성공 여부
     */
    private _generate_set_uart_postfix = (queue_s_tx: string[], s_tag: string): boolean => {
        const n_offset = _type_system_offset.SYS_OFFSET_UART_G_POST;
        const n_size = _type_system_size.SYS_SIZE_UART_G_POST;

        return this._generate_config_set(queue_s_tx, n_offset, n_size, s_tag);
    }

    /**
     * @description OPOS(OLE for Retail POS) 모드로 진입합니다.
     */
    private _generate_enter_opos_mode = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_ENTER_OPOS, "00", "");
    }

    /**
     * @description OPOS 모드에서 벗어나 일반 모드로 복귀합니다.
     */
    private _generate_leave_opos_mode = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_LEAVE_OPOS, "00", "");
    }

    /**
     * @description 설정 모드(Configuration Mode/CS)로 진입합니다. (설정 변경 전 필수)
     */
    private _generate_enter_config_mode = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_ENTER_CS, "00", "");
    }

    /**
     * @description 설정 모드에서 나갑니다.
     */
    private _generate_leave_config_mode = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_LEAVE_CS, "00", "");
    }

    /**
     * @description 변경된 설정 사항들을 장치의 비휘발성 메모리에 실제로 적용(Commit)합니다.
     */
    private _generate_apply_config_mode = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_APPLY, "00", "");
    }

    /**
     * @description 장치를 부트 로더 모드로 전환합니다. (펌웨어 업데이트 시 사용)
     */
    private _generate_run_boot_loader = (queue_s_tx: string[]): boolean => {
        return this._generate_request(queue_s_tx, _type_cmd.REQ_GOTO_BOOT, "00", "");
    }

    /**
     * @private
     * @description 장치에서 수신한 Hex 문자열 태그를 분석하여 ASCII 코드 배열로 변환합니다.
     * @param n_language 언어 인덱스 (0~10)
     * @param s_len_tag_hex 장치에서 읽어온 태그 데이터 (첫 바이트는 길이 정보)
     * @returns {number[]} ASCII 코드 값들이 담긴 배열
     */
    private _get_tag_by_ascii_code = (n_language: number, s_len_tag_hex: string): number[] => {
        const n_hex_result: number[] = [];

        // 1. 기본 유효성 검사
        if (typeof n_language !== 'number' || typeof s_len_tag_hex !== 'string') {
            return n_hex_result;
        }
        if (s_len_tag_hex.length % 2 !== 0) {
            return n_hex_result;
        }

        // 2. Hex 문자열을 바이트 배열로 변환
        const n_tag_bytes: number[] = [];
        for (let i = 0; i < s_len_tag_hex.length; i += 2) {
            const s_one_byte = s_len_tag_hex.substring(i, i + 2);
            n_tag_bytes.push(parseInt(s_one_byte, 16));
        }

        // 3. 길이 정보 추출 및 유효성 확인
        let n_len = n_tag_bytes.shift() || 0; // 첫 번째 바이트는 태그의 실제 길이
        if (n_len === 0) return n_hex_result;

        if (n_len > this._const_max_size_tag_byte) {
            n_len = this._const_max_size_tag_byte;
        }
        n_tag_bytes.length = n_len; // 실제 유효 데이터 크기만큼 자르기

        // 4. 태그 분석 (2바이트가 한 쌍: Modifier + KeyCode)
        for (let i = 0; i < n_tag_bytes.length; i += 2) {
            const modifier = n_tag_bytes[i];
            const key_code = n_tag_bytes[i + 1];

            if (modifier === 0 && key_code === 0) continue;

            // 특별 케이스: ASCII 코드 포맷 (0xFF로 시작하는 경우)
            if (modifier === 0xff) {
                n_hex_result.push(key_code);
                continue;
            }

            // HID 키보드 코드를 ASCII 인덱스로 역매핑
            const current_lang_map = elpusk_util_keyboard_map.sASCToHIDKeyMap[n_language];

            for (let j = 0; j < current_lang_map.length; j++) {
                const map_modifier = parseInt(current_lang_map[j][0], 16);
                const map_key_code = parseInt(current_lang_map[j][1], 16);

                if (map_modifier === modifier && map_key_code === key_code) {
                    n_hex_result.push(j); // 찾은 경우 해당 인덱스(ASCII 코드) 추가
                    break;
                }
            }
        }

        return n_hex_result;
    }

    /**
     * @private
     * @description 태그 데이터를 ASCII 코드의 Hex 문자열 배열로 변환합니다. (예: [65, 66] -> ["41", "42"])
     * @param n_language 언어 인덱스
     * @param s_len_tag_hex 장치에서 수신한 원시 Hex 문자열
     */
    private _get_tag_by_ascii_hex_string = (n_language: number, s_len_tag_hex: string): string[] => {
        const s_hex_result: string[] = [];
        // 1. 먼저 HID 코드를 ASCII 숫자 배열로 변환
        const n_ascii_codes = this._get_tag_by_ascii_code(n_language, s_len_tag_hex);

        // 2. 각 ASCII 숫자를 2자리 Hex 문자열로 변환하여 배열에 삽입
        for (let i = 0; i < n_ascii_codes.length; i++) {
            s_hex_result.push(util.get_byte_hex_string_from_number(n_ascii_codes[i]));
        }

        return s_hex_result;
    }

    /**
     * @private
     * @description 태그 데이터를 실제 문자 배열로 변환합니다. (예: [65, 66] -> ["A", "B"])
     * @param n_language 언어 인덱스
     * @param s_len_tag_hex 장치에서 수신한 원시 Hex 문자열
     */
    private _get_tag_by_ascii_string = (n_language: number, s_len_tag_hex: string): string[] => {
        const s_char_result: string[] = [];
        // 1. 먼저 HID 코드를 ASCII 숫자 배열로 변환
        const n_ascii_codes = this._get_tag_by_ascii_code(n_language, s_len_tag_hex);

        // 2. 각 ASCII 숫자를 실제 문자로 변환하여 배열에 삽입
        for (let i = 0; i < n_ascii_codes.length; i++) {
            s_char_result.push(String.fromCharCode(n_ascii_codes[i]));
        }

        return s_char_result;
    }

    /**
     * @private
     * @description 태그 데이터를 가독성 있는 심볼 문자열 포맷(예: [Shift][A])으로 변환합니다.
     * @param n_language 언어 인덱스
     * @param s_len_tag_hex 장치에서 수신한 원시 Hex 문자열
     * @returns {string | null} 심볼 문자열, 오류 시 null 반환
     */
    private _get_tag_by_symbol = (n_language: number, s_len_tag_hex: string): string | null => {
        let s_symbols: string | null = null;

        // 1. 유효성 검사 및 초기화
        if (typeof n_language !== 'number' || typeof s_len_tag_hex !== 'string') {
            return null;
        }
        if (s_len_tag_hex.length % 2 !== 0) {
            return null;
        }

        s_symbols = "";

        // 2. Hex 문자열을 바이트 배열로 변환
        const n_tag_bytes: number[] = [];
        for (let i = 0; i < s_len_tag_hex.length; i += 2) {
            const s_one_byte = s_len_tag_hex.substring(i, i + 2);
            n_tag_bytes.push(parseInt(s_one_byte, 16));
        }

        // 3. 길이 바이트 추출 및 유효 범위 제한
        let n_len = n_tag_bytes.shift() || 0;
        if (n_len === 0) {
            return s_symbols; // 데이터가 없는 경우 빈 문자열 반환
        }

        if (n_len > this._const_max_size_tag_byte) {
            n_len = this._const_max_size_tag_byte;
        }
        n_tag_bytes.length = n_len;

        // 4. 바이트 쌍 분석 및 심볼 생성
        for (let i = 0; i < n_tag_bytes.length; i += 2) {
            const modifier = n_tag_bytes[i];
            const key_code = n_tag_bytes[i + 1];

            // 데이터가 비어있으면 건너뜀
            if (modifier === 0 && key_code === 0) continue;

            if (modifier === 0xff) {
                // 특수 케이스: ASCII 코드 포맷인 경우
                const ascii_symbol = util.get_ascii_symbol_from_char_code(key_code);
                s_symbols += `[][${ascii_symbol}]`;
            } else {
                // 일반 케이스: HID 키보드 코드 (Modifier + KeyCode)
                const mod_symbol = this._get_key_symbol_string_by_hid_modifier_code_number(modifier);
                const key_symbol = this._get_key_symbol_string_by_hid_key_code_number(key_code);
                s_symbols += `[${mod_symbol}][${key_symbol}]`;
            }
        }

        return s_symbols;
    }

    /**
     * @private
     * @description iButton 제거(Remove) 태그 데이터를 심볼 문자열 포맷(예: [Shift][Q])으로 변환합니다.
     * @param n_language 언어 인덱스
     * @param s_len_tag_hex 장치에서 수신한 원시 Hex 문자열
     * @returns {string | null} 심볼 문자열, 오류 시 null 반환
     */
    private _get_tag_remove_by_symbol = (n_language: number, s_len_tag_hex: string): string | null => {
        let s_symbols: string | null = null;

        // 1. 유효성 검사
        if (typeof n_language !== 'number' || typeof s_len_tag_hex !== 'string') {
            return null;
        }
        if (s_len_tag_hex.length % 2 !== 0) {
            return null;
        }

        s_symbols = "";

        // 2. Hex 문자열 -> 바이트 배열 변환
        const n_tag_bytes: number[] = [];
        for (let i = 0; i < s_len_tag_hex.length; i += 2) {
            const s_one_byte = s_len_tag_hex.substring(i, i + 2);
            n_tag_bytes.push(parseInt(s_one_byte, 16));
        }

        // 3. 길이 정보 추출 (첫 바이트) 및 Remove 태그 전용 최대 길이 제한
        let n_len = n_tag_bytes.shift() || 0;
        if (n_len === 0) {
            return s_symbols; // 태그 없음
        }

        // iButton 제거 태그 전용 상수 사용
        if (n_len > this._const_max_size_tag_remove_byte) {
            n_len = this._const_max_size_tag_remove_byte;
        }
        n_tag_bytes.length = n_len;

        // 4. HID/ASCII 분석 및 심볼 조립
        for (let i = 0; i < n_tag_bytes.length; i += 2) {
            const modifier = n_tag_bytes[i];
            const key_code = n_tag_bytes[i + 1];

            if (modifier === 0 && key_code === 0) continue;

            if (modifier === 0xff) {
                // ASCII 직접 코드 방식
                const ascii_symbol = util.get_ascii_symbol_from_char_code(key_code);
                s_symbols += `[][${ascii_symbol}]`;
            } else {
                // HID 키보드 스캔 코드 방식
                const mod_symbol = this._get_key_symbol_string_by_hid_modifier_code_number(modifier);
                const key_symbol = this._get_key_symbol_string_by_hid_key_code_number(key_code);
                s_symbols += `[${mod_symbol}][${key_symbol}]`;
            }
        }

        return s_symbols;
    }

    /**
     * @constructor
     * @param {string} s_path USB HID 장치 경로
     */
    constructor(s_path: string) {
        // 부모 클래스(hid) 생성자 호출
        super(s_path);

        // 생성 시점의 로직은 필드 초기화로 대부분 처리되었으므로,
        // 추가적인 런타임 초기화가 필요하다면 여기에 작성합니다.
    }

    /**
     * @description 현재 장치가 설정 모드(Config Mode)인지 여부를 확인합니다.
     * @returns {boolean} true: 설정 모드임, false: 일반 동작 모드임.
     */
    public is_config_mode = (): boolean => {
        return this._b_config_mode;
    }

    /**
     * @description 현재 장치가 OPOS 모드인지 확인합니다.
     * @returns {boolean} true: OPOS 모드 활성(Vendor-defined HID 인터페이스 사용), false: 일반 키보드 모드.
     */
    public is_opos_mode = (): boolean => {
        return this._b_opos_mode;
    }

    /**
     * @description 지정된 ISO 트랙의 카드 데이터를 가져옵니다.
     * @param {number} n_track ISO 트랙 번호 (0~2)
     * @returns {string | null} 카드 데이터 문자열. 오류가 있거나 데이터가 없으면 null 반환.
     */
    public get_msr_data = (n_track: number): string | null => {
        // 1. 매개변수 유효성 검사 (트랙 번호 범위 확인)
        if (typeof n_track !== 'number' || n_track < 0 || n_track >= this._const_the_number_of_track) {
            return null;
        }

        // 2. 트랙별 에러 코드 확인
        // 0이 아니면 읽기 실패(LRC 에러, 패리티 에러 등)를 의미함
        if (this._array_n_card_error_code[n_track] !== 0) {
            return null;
        }

        // 3. 정상 데이터 반환 (데이터가 비어있어도 저장된 문자열 반환)
        return this._array_s_card_data[n_track];
    }

    /**
     * @public
     * @description iButton 리더기에서 읽은 태그 데이터를 가져옵니다.
     * @returns {string | null} iButton 고유 ID 데이터 문자열. 오류 발생 시 null 반환.
     */
    public get_ibutton_data = (): string | null => {
        // 1. iButton 읽기 에러 코드 확인
        // 0이 아니면 체크섬 오류나 통신 오류가 발생한 상태임
        if (this._n_ibutton_error_code !== 0) {
            return null;
        }

        // 2. 정상 데이터 반환 (ID 데이터가 담긴 문자열)
        return this._s_ibutton_data;
    }

    /**
     * @public
     * @description 지정된 ISO 트랙의 MSR 에러 코드를 가져옵니다.
     * @param {number} n_track ISO 트랙 번호 (0~2)
     * @returns {number | null} 에러 코드 (0: 정상), 입력값이 잘못된 경우 null 반환
     */
    public get_msr_error_code = (n_track: number): number | null => {
        // 1. 매개변수 유효성 검사
        if (typeof n_track !== 'number' || n_track < 0 || n_track >= this._const_the_number_of_track) {
            return null;
        }

        // 2. 해당 트랙의 에러 코드 반환
        return this._array_n_card_error_code[n_track];
    }

    /**
     * @public
     * @description iButton 리더기의 에러 코드를 가져옵니다.
     * @returns {number} 에러 코드 (0: 정상)
     */
    public get_ibutton_error_code = (): number => {
        return this._n_ibutton_error_code;
    }

    /**
     * @public
     * @description 현재 수신된 iButton 데이터를 무시하도록 설정되어 있는지 확인합니다.
     * @returns {boolean} true: 데이터 무시 중, false: 데이터 처리 중
     */
    public is_ignore_ibutton_data = (): boolean => {
        return this._b_ignore_ibutton_data;
    }

    /**
     * @public
     * @description 장치의 펌웨어 버전을 가져옵니다.
     * @returns {number[] | null} 4개 숫자로 구성된 버전 배열 (예: [5, 1, 6, 0]), 오류 시 null
     */
    public get_version = (): number[] | null => {
        // 1. 버전 배열의 유효성 검사
        if (!Array.isArray(this._version) || this._version.length !== 4) {
            return null;
        }

        return this._version;
    }

    /**
     * @public
     * @description 장치 설정 구조(Structure)의 버전을 가져옵니다.
     * @returns {number[] | null} 4개 숫자로 구성된 구조 버전 배열, 오류 시 null
     */
    public get_version_structure = (): number[] | null => {
        // 2. 구조 버전 배열의 유효성 검사
        if (!Array.isArray(this._version_structure) || this._version_structure.length !== 4) {
            return null;
        }

        return this._version_structure;
    }

    /**
     * @public
     * @description 장치의 시스템 이름을 가져옵니다. 
     * 정해진 최대 길이(this._const_the_size_of_name)를 초과할 경우 잘라서 반환합니다.
     * @returns {string} 시스템 이름 (이름이 없거나 유효하지 않으면 빈 문자열 반환)
     */
    public get_name = (): string => {
        let s_name: string = "";

        // 1. 이름 데이터가 유효한 문자열인지 확인
        if (typeof this._s_name === 'string') {
            // 2. 최대 길이를 초과하는 경우 서브스트링으로 자름
            if (this._s_name.length > this._const_the_size_of_name) {
                s_name = this._s_name.substring(0, this._const_the_size_of_name);
            } else {
                s_name = this._s_name;
            }
        }

        return s_name;
    }

    /**
     * @public
     * @description 글로벌 전/후첨자(Prefix/Postfix) 전송 조건을 확인합니다.
     * @returns {boolean} true: 모든 트랙에 에러가 없을 때만 전송, false: 하나라도 정상이면 전송.
     */
    public get_global_pre_postfix_send_condition = (): boolean => {
        return this._b_global_pre_postfix_send_condition;
    }

    /**
     * @public
     * @description MSR 트랙 데이터의 전송 순서를 가져옵니다.
     * @returns {number[]} 트랙 번호 배열 (예: [0, 1, 2])
     */
    public get_track_order = (): number[] => {
        return this._n_order;
    }

    /**
     * @public
     * @description the blank 4 bytes array
     * @returns {number[]} bitmap system parameters.
     */
    public get_blank = (): number[] => {
        return this._c_blank;
    }

    /**
     * @public
     * @description 트랙 하나라도 정상일 때 성공으로 간주할지 여부를 확인합니다.
     * @returns {boolean} true: 하나라도 정상이면 성공 표시, false: 모두 정상이어야 성공 표시.
     */
    public get_indicate_success_when_any_not_error = (): boolean => {
        return (this._c_blank[1] & 0x01) !== 0;
    }

    /**
     * @public
     * @description 트랙 1과 2의 데이터가 동일할 때 트랙 1을 무시할지 여부를 확인합니다.
     * @returns {boolean} true: 중복 시 트랙 2만 전송, false: 모두 전송.
     */
    public get_ignore_iso1 = (): boolean => {
        return (this._c_blank[1] & 0x02) !== 0;
    }

    /**
     * @public
     * @description 트랙 2와 3의 데이터가 동일할 때 트랙 3을 무시할지 여부를 확인합니다.
     * @returns {boolean} true: 중복 시 트랙 2만 전송, false: 모두 전송.
     */
    public get_ignore_iso3 = (): boolean => {
        return (this._c_blank[1] & 0x04) !== 0;
    }

    /**
     * @public
     * @description 특정 조건(ETXL 0xE0)에서 첫 글자가 콜론(':')인 경우 삭제 여부를 확인합니다.
     * @returns {boolean} true: 콜론 삭제 전송, false: 그대로 전송.
     */
    public get_remove_colon = (): boolean => {
        return (this._c_blank[1] & 0x08) !== 0;
    }

    /**
     * @public
     * @description 사용된 디코더 칩셋이 MMD1000인지 확인합니다.
     * @returns {boolean} true: MMD1000 사용, false: Magtek DeltaAsic 사용.
     */
    public get_device_is_mmd1000 = (): boolean => {
        return this._b_device_is_mmd1000;
    }

    /**
     * @public
     * @description 제조사 정보를 가져옵니다.
     * @returns {number} 0: elpusk, 1: BTC (Legacy)
     */
    public get_manufacture = (): number => {
        return this._n_manufacture;
    }

    /**
     * @public
     * @description 장치의 고유 ID(UID)를 가져옵니다. 
     * 정해진 최대 길이(_const_the_size_of_uid * 2)를 초과할 경우 잘라서 반환합니다.
     * @returns {string | null} Hex 문자열 형태의 UID, 유효하지 않은 경우 null 반환
     */
    public get_uid = (): string | null => {
        let s_uid: string | null = null;

        // 1. UID 데이터가 유효한 문자열인지 확인
        if (typeof this._s_uid === 'string') {
            const max_len = this._const_the_size_of_uid * 2;

            // 2. Hex 문자열이므로 바이트 크기의 2배를 기준으로 길이를 제한
            if (this._s_uid.length > max_len) {
                s_uid = this._s_uid.substring(0, max_len);
            } else {
                s_uid = this._s_uid;
            }
        }

        return s_uid;
    }

    /**
     * @description 장치의 지원 기능을 확인합니다.
     * @returns {number} 0: 미정의, 1: MSR 지원, 2: MSR 및 i-button 지원, 3: i-button 전용
     */
    public get_device_function = (): number => {
        return this._n_device_function;
    }

    /**
     * @description 장치의 시스템 펌웨어 버전을 가져옵니다.
     * @returns {number[]} [Major, Minor, Build, Revision] 형태의 4개 숫자 배열
     */
    public get_system_version = (): number[] => {
        return this._version;
    }

    /**
     * @description 장치의 설정 데이터 구조 버전을 가져옵니다.
     * @returns {number[]} 4개 숫자 배열
     */
    public get_structure_version = (): number[] => {
        return this._version_structure;
    }

    /**
     * @description 키 맵 테이블 저장 방식(메모리 절약 모드)을 확인합니다.
     * @returns {boolean} true: 선택된 언어만 저장(메모리 절약), false: 모든 언어 맵 저장
     */
    public get_removed_key_map_table = (): boolean => {
        return this._b_removed_key_map_table;
    }

    /**
     * @description 부트로더의 종류를 확인합니다.
     * @returns {boolean} true: HID 부트로더 사용, false: MSD(이동식 디스크) 부트로더 사용
     */
    public get_hid_boot = (): boolean => {
        return this._b_is_hid_boot;
    }

    /**
     * @description i-button 전용 모델 여부를 확인합니다.
     * @returns {boolean} true: i-button 전용, false: MSR 포함 모델
     */
    public get_device_is_ibutton_only = (): boolean => {
        return this._b_device_is_ibutton_only;
    }

    /**
     * @description 하드웨어 타입(Standard 여부)을 확인합니다.
     * @returns {boolean} true: D 또는 E 타입 HW, false: C 또는 F 타입 HW
     */
    public get_device_is_standard = (): boolean => {
        return this._b_device_is_standard;
    }

    /**
     * @description 시스템 인터페이스 설정을 가져옵니다.
     * @returns {number} 0: USB KB, 1: USB MSR(HID), 10: UART, 20: PS2, 21: Bypass 100: HW 스위치 결정
     */
    public get_interface = (): number => {
        return this._n_interface;
    }

    /**
     * @description 카드 읽기 성공 시 부저(비프음) 횟수를 가져옵니다.
     */
    public get_buzzer_count = (): number => {
        return this._dw_buzzer_count;
    }

    /**
     * @description MSD 부트로더가 실행되는 시간(대기 시간)을 가져옵니다.
     * @returns {number} 밀리초(msec) 단위
     */
    public get_boot_run_time = (): number => {
        return this._dw_boot_run_time;
    }

    /**
     * @description 키보드 언어 레이아웃 설정을 가져옵니다.
     * @returns {number} 0(US) ~ 10(Turkey) 사이의 인덱스
     */
    public get_language = (): number => {
        return this._n_language_index;
    }

    /**
     * @public
     * @description 특정 MSR 트랙의 활성화(읽기 가능) 여부를 확인합니다.
     * @param {number} n_track 트랙 번호 (0~2)
     * @returns {boolean} true: 해당 트랙 읽기 활성, false: 비활성
     */
    public get_enable_iso = (n_track: number): boolean => {
        // 유효성 검사: 숫자 타입 여부, 배열 존재 여부, 트랙 개수 일치 여부
        if (
            typeof n_track !== 'number' ||
            !Array.isArray(this._b_enable_iso) ||
            this._b_enable_iso.length !== this._const_the_number_of_track
        ) {
            return false;
        }

        return this._b_enable_iso[n_track] ?? false;
    }

    /**
     * @public
     * @description 특정 트랙의 읽기 허용 방향을 가져옵니다.
     * @param {number} [n_track] 트랙 번호 (0~2). 생략 시 트랙 0의 설정을 반환합니다.
     * @returns {number} 0: 양방향(Bidirectional), 1: 정방향(Forward), 2: 역방향(Backward)
     */
    public get_direction = (n_track?: number): number => {
        const default_dir = type_direction.dir_bidectional;

        // 기본 배열 유효성 검사
        if (!Array.isArray(this._n_direction) || this._n_direction.length !== this._const_the_number_of_track) {
            return default_dir;
        }

        // n_track이 제공되지 않았거나 undefined인 경우 트랙 0 반환 (기존 로직 유지)
        if (typeof n_track === 'undefined') {
            return this._n_direction[0];
        }

        // n_track이 숫자가 아니거나 범위를 벗어난 경우 처리
        if (typeof n_track !== 'number' || n_track < 0 || n_track >= this._const_the_number_of_track) {
            return default_dir;
        }

        return this._n_direction[n_track];
    }

    /**
     * @public
     * @description 모든 출력 데이터의 앞에 붙는 글로벌 전첨자(Prefix)를 가져옵니다.
     * @returns {string | null} Hex 문자열 형태의 전첨자 데이터 또는 null
     */
    public get_global_prefix = (): string | null => {
        return this._s_global_prefix;
    }

    /**
     * @public
     * @description 모든 출력 데이터의 뒤에 붙는 글로벌 후첨자(Postfix)를 가져옵니다.
     * @returns {string | null} Hex 문자열 형태의 후첨자 데이터 또는 null
     */
    public get_global_postfix = (): string | null => {
        return this._s_global_postfix;
    }

    /**
     * @public
     * @description 특정 트랙에 설정된 디코딩 조합(Combination)의 개수를 가져옵니다.
     * @param {number} n_track MSR 트랙 번호 (0~2)
     */
    public get_number_combination = (n_track: number): number => {
        if (typeof n_track !== 'number' || !Array.isArray(this._n_number_combination) ||
            this._n_number_combination.length !== this._const_the_number_of_track) {
            return 0;
        }
        return this._n_number_combination[n_track];
    }

    /**
     * @public
     * @description 특정 트랙/조합에서의 최대 데이터 길이를 가져옵니다.
     * @param {number} n_track MSR 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     */
    public get_max_size = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._n_max_size)) return 0;
        return this._n_max_size[n_track][n_combi];
    }

    /**
     * @public
     * @description 한 글자를 구성하는 비트 크기를 가져옵니다.
     * @param {number} n_track MSR 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     */
    public get_bit_size = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._n_bit_size)) return 0;
        return this._n_bit_size[n_track][n_combi];
    }

    /**
     * @public
     * @description 데이터 추출 시 사용할 비트 마스크 패턴을 가져옵니다.
     */
    public get_data_mask = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._c_data_mask)) return 0;
        return this._c_data_mask[n_track][n_combi];
    }

    /**
     * @public
     * @description 패리티(Parity) 비트 사용 여부를 확인합니다.
     */
    public get_use_parity = (n_track: number, n_combi: number): boolean => {
        if (this._is_invalid_track_combi(n_track, this._b_use_parity)) return false;
        return this._b_use_parity[n_track][n_combi];
    }

    /**
     * @public
     * @description 패리티 타입을 가져옵니다.
     * @returns {number} 0: Even(짝수), 1: Odd(홀수)
     */
    public get_parity_type = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._n_parity_type)) return 0;
        return this._n_parity_type[n_track][n_combi];
    }

    /**
     * @public
     * @description 시작 센티넬(Start Sentinel) 패턴을 가져옵니다.
     * @param {number} n_track 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     */
    public get_stxl = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._c_stxl)) return 0;
        return this._c_stxl[n_track][n_combi];
    }

    /**
     * @public
     * @description 종료 센티넬(End Sentinel) 패턴을 가져옵니다.
     * @param {number} n_track 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     */
    public get_etxl = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._c_etxl)) return 0;
        return this._c_etxl[n_track][n_combi];
    }

    /**
     * @public
     * @description 에러 교정 모드(ECM) 사용 여부를 확인합니다.
     */
    public get_use_ecm = (n_track: number, n_combi: number): boolean => {
        if (this._is_invalid_track_combi(n_track, this._b_use_ecm)) return false;
        return this._b_use_ecm[n_track][n_combi];
    }

    /**
     * @public
     * @description 에러 교정 방식을 가져옵니다.
     * @returns {number} 0: LRC, 1: Inversion LRC, 2: CRC
     */
    public get_ecm_type = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._n_ecm_type)) return 0;
        return this._n_ecm_type[n_track][n_combi];
    }

    /**
     * @public
     * @description 비트 데이터를 ASCII 문자로 변환할 때 더해지는 오프셋 값을 가져옵니다.
     */
    public get_add_value = (n_track: number, n_combi: number): number => {
        if (this._is_invalid_track_combi(n_track, this._n_add_value)) return 0;
        return this._n_add_value[n_track][n_combi];
    }

    /**
     * @public
     * @description 특정 트랙 및 조합에 설정된 개별 전첨자(Private Prefix)를 가져옵니다.
     * @param {number} n_track MSR 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     * @returns {string | null} Hex 문자열 형태의 전첨자, 유효하지 않으면 null 반환
     */
    public get_private_prefix = (n_track: number, n_combi: number): string | null => {
        if (this._is_invalid_track_combi(n_track, this._s_private_prefix)) {
            return null;
        }

        return this._s_private_prefix[n_track][n_combi];
    }

    /**
     * @public
     * @description 특정 트랙 및 조합에 설정된 개별 후첨자(Private Postfix)를 가져옵니다.
     * @param {number} n_track MSR 트랙 번호 (0~2)
     * @param {number} n_combi 조합 인덱스 (0~2)
     * @returns {string | null} Hex 문자열 형태의 후첨자, 유효하지 않으면 null 반환
     */
    public get_private_postfix = (n_track: number, n_combi: number): string | null => {
        if (this._is_invalid_track_combi(n_track, this._s_private_postfix)) {
            return null;
        }

        return this._s_private_postfix[n_track][n_combi];
    }

    /**
     * @public
     * @description i-Button 태그 접촉 시 데이터 앞에 붙는 전첨자를 가져옵니다.
     * @returns {string | null} Hex 문자열 또는 null
     */
    public get_prefix_ibutton = (): string | null => {
        return this._s_prefix_ibutton;
    }

    /**
     * @public
     * @description i-Button 태그 접촉 시 데이터 뒤에 붙는 후첨자를 가져옵니다.
     */
    public get_postfix_ibutton = (): string | null => {
        return this._s_postfix_ibutton;
    }

    /**
     * @public
     * @description i-Button 태그가 제거되었을 때 전송할 식별 문자열을 가져옵니다.
     */
    public get_ibutton_remove = (): string | null => {
        return this._s_ibutton_remove;
    }

    /**
     * @public
     * @description i-Button 태그 제거 시 전송 데이터의 전첨자를 가져옵니다.
     */
    public get_prefix_ibutton_remove = (): string | null => {
        return this._s_prefix_ibutton_remove;
    }

    /**
     * @public
     * @description i-Button 태그 제거 시 전송 데이터의 후첨자를 가져옵니다.
     */
    public get_postfix_ibutton_remove = (): string | null => {
        return this._s_postfix_ibutton_remove;
    }

    /**
     * @public
     * @description UART 인터페이스 사용 시 데이터 앞에 붙는 전첨자를 가져옵니다.
     */
    public get_prefix_uart = (): string | null => {
        return this._s_prefix_uart;
    }

    /**
     * @public
     * @description UART 인터페이스 사용 시 데이터 뒤에 붙는 후첨자를 가져옵니다.
     */
    public get_postfix_uart = (): string | null => {
        return this._s_postfix_uart;
    }

    /**
     * @public
     * @description get i-button range
     * @returns {number[]} 2 byte array. [0] - start pos (0~15), [1] - end pos (0~15)
     */    
    public get_ibutton_range = (): number[] => {
        let ar_pos = [0,15];

        ar_pos[0] = this._c_blank[0] & 0xF0;
        ar_pos[0] = ar_pos[0] >> 4;

        ar_pos[1] = this._c_blank[0] & 0x0F;    
        return ar_pos;
    }


    /**
     * @public
     * @description i-button 모드가 F12 모드인지 확인합니다.
     * @returns {boolean} true: F12 모드 사용 중
     */
    public get_enable_f12_ibutton = (): boolean => {
        return (this._c_blank[2] & 0x01) !== 0;
    }

    /**
     * @public
     * @description i-button 모드가 Zeros 모드인지 확인합니다. (0x02 비트가 0일 때 true)
     * @returns {boolean} true: Zeros 모드 사용 중
     */
    public get_enable_zeros_ibutton = (): boolean => {
        // 원본 로직 유지: 0x02 비트가 세팅되어 있으면 false 반환
        return (this._c_blank[2] & 0x02) === 0;
    }

    /**
     * @public
     * @description i-button 모드가 Zeros 7times 모드인지 확인합니다.
     * @returns {boolean} true: Zeros7 모드 사용 중
     */
    public get_enable_zeros_7times_ibutton = (): boolean => {
        return (this._c_blank[2] & 0x04) !== 0;
    }

    /**
     * @public
     * @description i-button 모드가 Addmit Code Stick 모드인지 확인합니다.
     * @returns {boolean} true: ibutton_addmit 모드 사용 중
     */
    public get_enable_addmit_code_stick_ibutton = (): boolean => {
        return (this._c_blank[2] & 0x08) !== 0;
    }

    /**
     * @public
     * @description i-button 모드가 None 모드(사용자 정의 모드)인지 확인합니다.
     * @returns {boolean} true: 하위 4비트 값이 정확히 0x02인 경우
     */
    public get_enable_none_ibutton = (): boolean => {
        return (this._c_blank[2] & 0x0F) === 0x02;
    }

    /**
     * @public
     * @description MMD1100 디코딩 칩의 리셋 간격을 가져옵니다.
     * @returns {number} 0 ~ 240 범위의 값 (16의 배수)
     */
    public get_mmd1100_reset_interval = (): number => {
        // 0xF0(1111 0000)으로 비트 마스킹하여 상위 4비트 값만 추출
        const n_interval = this._c_blank[1] & 0xF0;
        return n_interval;
    }

    /**
     * @public
     * @description 송신 대기열(TX Queue)에서 가장 오래된 요청 문자열을 하나 꺼내옵니다. (FIFO)
     * @returns {string | null} 요청 명령 문자열, 대기열이 비어있으면 null
     */
    public get_tx_transaction = (): string | null => {
        if (this._dequeu_s_tx.length <= 0) {
            return null;
        }

        // shift()는 배열의 첫 번째 요소를 제거하고 그 요소를 반환합니다.
        return this._dequeu_s_tx.shift() || null;
    }

    /**
     * @public
     * @description 장치로부터 받은 응답 데이터를 수신 대기열(RX Queue)에 저장합니다.
     * @param {string} s_response LPU237 프로토콜 패킷 문자열
     * @returns {boolean} 저장 성공 여부
     */
    public set_rx_transaction = (s_response: string): boolean => {
        if (typeof s_response !== 'string' || s_response.length <= 0) {
            return false;
        }

        this._dequeu_s_rx.push(s_response);
        return true;
    }

    /**
     * @public
     * @description 응답 패킷 문자열에서 실제 데이터 필드(Data Field) 부분만 추출합니다.
     * @param {string} s_data_field 전체 응답 패킷 문자열 (Hex String)
     * @returns {string} 추출된 데이터 필드 문자열
     */
    public get_data_field(s_data_field: string): string {
        let s_data = "";

        try {
            // 인덱스 4 (2바이트 이후) 위치에서 데이터 길이를 나타내는 1바이트(2글자)를 읽음
            const n_index = 2 * 2;
            const n_length = parseInt(s_data_field.substring(n_index, n_index + 2), 16);

            if (n_length > 0) {
                // 길이 필드 다음 위치부터 (데이터 길이 * 2) 만큼 잘라냄
                const data_start_index = n_index + 2;
                s_data = s_data_field.substring(data_start_index, data_start_index + (n_length * 2));
            }
        } catch (e) {
            console.error("Data field parsing error:", e);
        }

        return s_data;
    }

    /**
     * @public
     * @description 현재 처리 대기 중인 요청의 유형(Type)을 확인합니다.
     * @returns {number} 0 이상의 값 (gt_xxx 상수), 요청이 없으면 -1 반환
     * @description set_from_rx() 호출 전, 어떤 응답을 기다리고 있는지 디버깅 용도로 주로 사용됩니다.
     */
    public get_current_request_type = (): number => {
        // 큐(Queue)의 첫 번째 요소를 제거하지 않고 값만 확인(Peek)합니다.
        if (this._deque_generated_tx.length <= 0) {
            return -1;
        }

        return this._deque_generated_tx[0];
    }

    /**
     * @public
     * @description 모든 트랜잭션 버퍼를 비웁니다. (송신 대기열, 수신 대기열, 요청 타입 큐 전체 초기화)
     */
    public clear_transaction = (): void => {
        this._deque_generated_tx.length = 0;
        this._dequeu_s_rx.length = 0;
        this._dequeu_s_tx.length = 0;
    }

    /**
     * @public
     * @description 장치의 시스템 정보를 가져오기 위한 일련의 요청 패킷들을 생성합니다.
     *  enter_config, get_system_version, get_structure_version, get_device_type, get_system_name, leave_config 명령 패킷 생성. 
     * @returns {number} 생성된 요청의 개수 (실패 시 0)
     */
    public generate_get_system_information = (): number => {
        let b_result = false;

        // 시퀀스 생성 도중 하나라도 실패하면 전체 롤백하기 위해 do-while 패턴 유지 혹은 try-catch 활용
        do {
            // 1. 설정 모드 진입 명령
            if (!this._generate_enter_config_mode(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_enter_config);

            // 2. 펌웨어 버전 요청
            if (!this._generate_get_version(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_version);

            // 3. 버전 구조 정보 요청
            if (!this._generate_get_version_structure(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_version_structure);

            // 4. 장치 타입 요청
            if (!this._generate_get_device_type(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_type_device);

            //
            if (!this._generate_get_device_ibutton_type(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_type_ibutton);

            // 5. 장치 이름 요청
            if (!this._generate_get_name(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_name);

            // 6. 설정 모드 탈출 명령
            if (!this._generate_leave_config_mode(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_leave_config);

            b_result = true;
        } while (false);

        // 시퀀스 생성 중 실패 시, 불완전한 큐를 모두 비움
        if (!b_result) {
            this._dequeu_s_tx.length = 0;
            this._deque_generated_tx.length = 0;
            return 0;
        }

        return this._deque_generated_tx.length;
    }

    /**
     * @public
     * @description 장치의 모든 파라미터(MSR, i-Button, 인터페이스 등)를 읽어오기 위한 패킷 시퀀스를 생성합니다.
     * @returns {number} 생성된 총 요청 패킷의 개수
     */
    public generate_get_parameters = (): number => {
        let b_result = false;

        // 시퀀스 생성 도중 에러 발생 시 초기화 처리를 위해 do-while 패턴 유지
        do {
            // 1. 설정 모드 진입
            if (!this._generate_enter_config_mode(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_enter_config);

            // 2. 장치 타입 및 버전별 i-Button 지원 확인 (v3.6.0.4 이상)
            const isV3604OrHigher = this._first_version_greater_then_second_version(false, this._version, [3, 6, 0, 4]);

            if (this._b_device_is_standard && isV3604OrHigher) {
                if (!this._generate_get_device_ibutton_type(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_type_ibutton);
            }

            if (isV3604OrHigher) {
                if (!this._generate_get_uid(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_read_uid);
            }

            // 3. 기본 공통 정보 (이름, 글로벌 전/후첨자 조건, MMD1000 지원여부 등)
            if (!this._generate_get_name(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_name);

            if (!this._generate_get_global_pre_postfix_send_condition(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_global_prepostfix_send_condition);

            if (!this._generate_get_device_support_mmd1000(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_support_mmd1000);

            if (!this._generate_get_interface(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_interface);

            if (!this._generate_get_language(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_language);

            if (!this._generate_get_buzzer_count(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_buzzer_count);

            if (!this._generate_get_boot_run_time(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_boot_run_time);

            // 5. i-Button 및 UART 상세 설정 (버전별 분기)
            if (this._first_version_greater_then_second_version(false, this._version, [3, 0, 0, 0])) {
                if (!this._generate_get_ibutton_prefix(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_prefix_ibutton);

                if (!this._generate_get_ibutton_postfix(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_postfix_ibutton);

                if (!this._generate_get_uart_prefix(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_prefix_uart);

                if (!this._generate_get_uart_postfix(this._dequeu_s_tx)) continue;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_postfix_uart);

                // i-Button 제거(Remove) 이벤트 지원 확인 (v4.0.0.0 이상 구조)
                if (this._first_version_greater_then_second_version(true, this._version_structure, [4, 0, 0, 0])) {
                    if (!this._generate_get_ibutton_remove(this._dequeu_s_tx)) continue;
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_ibutton_remove);
                    if (!this._generate_get_ibutton_prefix_remove(this._dequeu_s_tx)) continue;
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_prefix_ibutton_remove);
                    if (!this._generate_get_ibutton_postfix_remove(this._dequeu_s_tx)) continue;
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_postfix_ibutton_remove);
                }
            }

            // 6. 트랙별 활성화 및 프라이빗 전/후첨자 (기본 조합)
            if (!this._generate_get_blank_4bytes(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_blank_4byets);

            // 7. 글로벌 전/후첨자
            if (!this._generate_get_global_prefix(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_global_prefix);
            if (!this._generate_get_global_postfix(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_get_global_postfix);

            let trackSuccess = true;
            for (let i = 0; i < this._const_the_number_of_track; i++) {
                if (!this._generate_get_enable_track(this._dequeu_s_tx, i)) { trackSuccess = false; break; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_enable_iso1 + i);
            }
            if (!trackSuccess) continue;

            // 8. 고급 다중 조합(Multi-Combination) 설정 (특정 모델 및 버전 이상)
            let b_run_combination = false;
            if (this._first_version_greater_then_second_version(false, this._version, [5, 12, 0, 0])) b_run_combination = true;
            if (this._first_version_greater_then_second_version(false, [4, 0, 0, 0], this._version)) {
                if (this._first_version_greater_then_second_version(false, this._version, [3, 20, 0, 0])) b_run_combination = true;
            }
            
            let n_max_combi = lpu237._const_the_number_of_combination;

            if(!b_run_combination){
                n_max_combi = 1;
            }
            
            trackSuccess = true;

            for (let i = 0; i < this._const_the_number_of_track; i++) {
                if (!this._generate_get_number_combi(this._dequeu_s_tx, i)) { trackSuccess = false; break; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_number_combi + i);

                if (!this._generate_get_direction(this._dequeu_s_tx, i)) { trackSuccess = false; break; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_get_direction1 + i);

                let comboSuccess = true;    
                for (let j = 0; j < lpu237._const_the_number_of_combination; j++) {
                    // 조합별 상세 파라미터 (BitSize, Mask, Parity, ECM, STX/ETX 등) 요청 생성...
                    if (!this._generate_get_max_size(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_MaxSize+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_bit_size(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_BitSize+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_data_mask(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_DataMask+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_use_parity(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_UseParity+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_parity_type(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_ParityType+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_stxl(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_STX_L+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_etxl(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_ETX_L+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_use_error_correct(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_UseErrorCorrect+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_ecm_type(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_ECMType+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_add_value(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_iso1_Combi0_AddValue+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_private_prefix(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_private_prefix10+ i*this._const_the_number_of_track + j);

                    if (!this._generate_get_private_postfix(this._dequeu_s_tx, i,j)) { comboSuccess = false; break; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_get_private_postfix10+ i*this._const_the_number_of_track + j);

                }
                if (!comboSuccess) continue;
            }
            if (!trackSuccess) continue;

            // 9. 설정 모드 탈출
            if (!this._generate_leave_config_mode(this._dequeu_s_tx)) continue;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_leave_config);

            b_result = true;
        } while (false);

        if (!b_result) {
            this.clear_transaction();
            return 0;
        }

        return this._deque_generated_tx.length;
    }

    /**
     * @public
     * @description 장치의 읽기 활성화 또는 비활성화 요청을 생성합니다 (OPOS 모드 제어).
     * @param {boolean} b_enable true: 읽기 활성화(Enter OPOS), false: 읽기 비활성화(Leave OPOS)
     * @returns {number} 생성된 요청 개수 (실패 시 0)
     */
    public generate_enable_read = (b_enable: boolean): number => {
        let b_result = false;

        do {
            if (typeof b_enable !== 'boolean') break;

            if (b_enable) {
                // OPOS 모드 진입 시 읽기 이벤트가 활성화됩니다.
                if (!this._generate_enter_opos_mode(this._dequeu_s_tx)) break;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_enter_opos);
            } else {
                // OPOS 모드 해제 시 읽기 이벤트가 중단됩니다.
                if (!this._generate_leave_opos_mode(this._dequeu_s_tx)) break;
                this._deque_generated_tx.push(_type_generated_tx_type.gt_leave_opos);
            }

            b_result = true;
        } while (false);

        if (!b_result) {
            this.clear_transaction();
            return 0;
        }

        return this._deque_generated_tx.length;
    }

    /**
     * @public
     * @description 장치를 부트로더 모드로 전환하는 요청을 생성합니다.
     * @returns {number} 생성된 요청 개수 (2개 예상: Enter Config + Goto Boot)
     * @description 이 명령 이후 장치는 재부팅되며 펌웨어 업데이트 대기 상태가 됩니다.
     */
    public generate_run_bootloader = (): number => {
        let b_result = false;

        do {
            // 부트로더 실행 명령을 내리기 위해서는 반드시 설정 모드(Config Mode)여야 합니다.
            if (!this._generate_enter_config_mode(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_enter_config);

            if (!this._generate_run_boot_loader(this._dequeu_s_tx)) break;
            this._deque_generated_tx.push(_type_generated_tx_type.gt_goto_boot);

            b_result = true;
        } while (false);

        if (!b_result) {
            this.clear_transaction();
            return 0;
        }

        return this._deque_generated_tx.length;
    }

    /**
     * @public
     * @description 펌웨어 ROM 파일을 읽어 데이터 처리를 준비합니다.
     * @param {File} file_rom 펌웨어가 포함된 ROM 파일
     * @returns {Promise<boolean>} 파일 읽기 성공 시 true 반환
     */
    public update_firmware = (file_rom: File): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (!(file_rom instanceof File)) {
                return reject(this._get_error_object('en_e_parameter'));
            }

            const reader = new FileReader();

            reader.onload = (evt: ProgressEvent<FileReader>) => {
                if (!evt.target || !evt.target.result) {
                    return reject(this._get_error_object('en_e_parameter'));
                }

                try {
                    const array_data = evt.target.result as ArrayBuffer;
                    const bytes = new Uint8Array(array_data);
                    let s_hex_total = "";

                    // 바이너리 데이터를 Hex String으로 변환
                    for (let i = 0; i < bytes.byteLength; i++) {
                        // 16진수로 변환 후 2자리 패딩(padStart 대신 toString과 조건문 사용 가능)
                        let s_hex = bytes[i].toString(16);
                        if (s_hex.length === 1) {
                            s_hex = "0" + s_hex;
                        }
                        s_hex_total += s_hex;
                    }

                    /**
                     * NOTE: 원본 코드에서는 s_hex_total을 서버나 장치로 전송하는 로직이 
                     * 생략되어 있습니다. 현재는 변환 성공 시 resolve(true)만 수행합니다.
                     */
                    console.log("Firmware conversion completed. Length:", s_hex_total.length);
                    resolve(true);

                } catch (error) {
                    reject(this._get_error_object('en_e_parameter'));
                }
            };

            reader.onerror = () => {
                reject(this._get_error_object('en_e_unknown'));
            };

            // 파일을 ArrayBuffer 형태로 읽기 시작
            reader.readAsArrayBuffer(file_rom);
        });
    }

    /**
     * @public
     * @description 현재 인스턴스의 모든 설정 데이터를 sessionStorage에 저장합니다.
     * @description 페이지 새로고침 시에도 장치 설정 상태를 유지하기 위해 사용됩니다.
     */
    public save_to_sessionStorage = (): void => {
        const s_key_p = "{EB7BECC9-E37D-4F41-BDBF-104D5AD624E6}";
        const ss = window.sessionStorage;

        // 공통 및 디바이스 파라미터 저장
        ss.setItem(`${s_key_p}_b_global_pre_postfix_send_condition`, JSON.stringify(this._b_global_pre_postfix_send_condition));
        ss.setItem(`${s_key_p}_n_order`, JSON.stringify(this._n_order));
        ss.setItem(`${s_key_p}_n_interface`, JSON.stringify(this._n_interface));
        ss.setItem(`${s_key_p}_dw_buzzer_count`, JSON.stringify(this._dw_buzzer_count));
        ss.setItem(`${s_key_p}_dw_boot_run_time`, JSON.stringify(this._dw_boot_run_time));
        ss.setItem(`${s_key_p}_n_language_index`, JSON.stringify(this._n_language_index));

        // MSR 트랙 관련 설정
        ss.setItem(`${s_key_p}_b_enable_iso`, JSON.stringify(this._b_enable_iso));
        ss.setItem(`${s_key_p}_n_direction`, JSON.stringify(this._n_direction));
        ss.setItem(`${s_key_p}_s_global_prefix`, JSON.stringify(this._s_global_prefix));
        ss.setItem(`${s_key_p}_s_global_postfix`, JSON.stringify(this._s_global_postfix));

        // 데이터 조합(Combination) 및 디코딩 상세 설정
        ss.setItem(`${s_key_p}_n_number_combination`, JSON.stringify(this._n_number_combination));
        ss.setItem(`${s_key_p}_n_max_size`, JSON.stringify(this._n_max_size));
        ss.setItem(`${s_key_p}_n_bit_size`, JSON.stringify(this._n_bit_size));
        ss.setItem(`${s_key_p}_c_data_mask`, JSON.stringify(this._c_data_mask));
        ss.setItem(`${s_key_p}_b_use_parity`, JSON.stringify(this._b_use_parity));
        ss.setItem(`${s_key_p}_n_parity_type`, JSON.stringify(this._n_parity_type));
        ss.setItem(`${s_key_p}_c_stxl`, JSON.stringify(this._c_stxl));
        ss.setItem(`${s_key_p}_c_etxl`, JSON.stringify(this._c_etxl));
        ss.setItem(`${s_key_p}_b_use_ecm`, JSON.stringify(this._b_use_ecm));
        ss.setItem(`${s_key_p}_n_ecm_type`, JSON.stringify(this._n_ecm_type));
        ss.setItem(`${s_key_p}_n_add_value`, JSON.stringify(this._n_add_value));

        // 트랙별 프라이빗 전/후첨자
        ss.setItem(`${s_key_p}_s_private_prefix`, JSON.stringify(this._s_private_prefix));
        ss.setItem(`${s_key_p}_s_private_postfix`, JSON.stringify(this._s_private_postfix));

        // i-Button 설정
        ss.setItem(`${s_key_p}_s_prefix_ibutton`, JSON.stringify(this._s_prefix_ibutton));
        ss.setItem(`${s_key_p}_s_postfix_ibutton`, JSON.stringify(this._s_postfix_ibutton));
        ss.setItem(`${s_key_p}_s_ibutton_remove`, JSON.stringify(this._s_ibutton_remove));
        ss.setItem(`${s_key_p}_s_prefix_ibutton_remove`, JSON.stringify(this._s_prefix_ibutton_remove));
        ss.setItem(`${s_key_p}_s_postfix_ibutton_remove`, JSON.stringify(this._s_postfix_ibutton_remove));

        // 공통 바이트 배열 및 RS232(UART) 설정
        ss.setItem(`${s_key_p}_c_blank`, JSON.stringify(this._c_blank));
        ss.setItem(`${s_key_p}_s_prefix_uart`, JSON.stringify(this._s_prefix_uart));
        ss.setItem(`${s_key_p}_s_postfix_uart`, JSON.stringify(this._s_postfix_uart));
    }

    /**
     * @public
     * @description sessionStorage에 저장된 데이터를 읽어와 객체의 멤버 변수를 복원합니다.
     */
    public set_from_sessionStorage = (): void => {
        const s_key_p = "{EB7BECC9-E37D-4F41-BDBF-104D5AD624E6}";
        const ss = window.sessionStorage;

        // 헬퍼 함수: JSON 파싱 시 발생할 수 있는 오류 방지
        const getStoredValue = (key: string) => {
            const item = ss.getItem(s_key_p + key);
            return item ? JSON.parse(item) : null;
        };

        // 설정 값 복원
        this._b_global_pre_postfix_send_condition = getStoredValue('_b_global_pre_postfix_send_condition');
        this._n_order = getStoredValue('_n_order');

        // 디바이스 파라미터 복원
        this._n_interface = getStoredValue('_n_interface');
        this._dw_buzzer_count = getStoredValue('_dw_buzzer_count');
        this._dw_boot_run_time = getStoredValue('_dw_boot_run_time');
        this._n_language_index = getStoredValue('_n_language_index');
        this._b_enable_iso = getStoredValue('_b_enable_iso');
        this._n_direction = getStoredValue('_n_direction');
        this._s_global_prefix = getStoredValue('_s_global_prefix');
        this._s_global_postfix = getStoredValue('_s_global_postfix');

        // 디코딩 조합 및 마스크 설정 복원
        this._n_number_combination = getStoredValue('_n_number_combination');
        this._n_max_size = getStoredValue('_n_max_size');
        this._n_bit_size = getStoredValue('_n_bit_size');
        this._c_data_mask = getStoredValue('_c_data_mask');
        this._b_use_parity = getStoredValue('_b_use_parity');
        this._n_parity_type = getStoredValue('_n_parity_type');
        this._c_stxl = getStoredValue('_c_stxl');
        this._c_etxl = getStoredValue('_c_etxl');
        this._b_use_ecm = getStoredValue('_b_use_ecm');
        this._n_ecm_type = getStoredValue('_n_ecm_type');
        this._n_add_value = getStoredValue('_n_add_value');

        // 프라이빗 전/후첨자 및 i-Button 설정 복원
        this._s_private_prefix = getStoredValue('_s_private_prefix');
        this._s_private_postfix = getStoredValue('_s_private_postfix');
        this._s_prefix_ibutton = getStoredValue('_s_prefix_ibutton');
        this._s_postfix_ibutton = getStoredValue('_s_postfix_ibutton');
        this._s_ibutton_remove = getStoredValue('_s_ibutton_remove');
        this._s_prefix_ibutton_remove = getStoredValue('_s_prefix_ibutton_remove');
        this._s_postfix_ibutton_remove = getStoredValue('_s_postfix_ibutton_remove');

        // 공통 바이트 및 RS232 설정 복원
        this._c_blank = getStoredValue('_c_blank');
        this._s_prefix_uart = getStoredValue('_s_prefix_uart');
        this._s_postfix_uart = getStoredValue('_s_postfix_uart');
    }

    /**
     * @public
     * @description 카드 트랙 데이터를 담고 있는 버퍼를 초기화합니다.
     * @param {number} [n_track] ISO 트랙 번호 (0~2). 생략 시 모든 트랙 초기화.
     */
    public reset_msr_data = (n_track?: number): void => {
        // 1. 매개변수가 없는 경우 전체 트랙 초기화
        if (n_track === undefined) {
            for (let i = 0; i < this._array_s_card_data.length; i++) {
                this._array_s_card_data[i] = "";
                this._array_n_card_error_code[i] = 0;
            }
            return;
        }

        // 2. 특정 트랙 초기화 (유효성 검사)
        if (typeof n_track === 'number' && n_track >= 0 && n_track < this._const_the_number_of_track) {
            this._array_s_card_data[n_track] = "";
            this._array_n_card_error_code[n_track] = 0;
        }
    }

    /**
     * @public
     * @description i-Button 데이터를 담고 있는 버퍼와 에러 코드를 초기화합니다.
     */
    public reset_ibutton_data = (): void => {
        this._s_ibutton_data = "";
        this._n_ibutton_error_code = 0;
    }

    /**
     * @public
     * @description i-Button 데이터 무시 여부를 설정합니다.
     * @param {boolean} b_ignore true면 데이터를 무시하고, false면 데이터를 처리합니다.
     */
    public set_ignore_ibutton_data = (b_ignore: boolean): void => {
        if (typeof b_ignore === 'boolean') {
            this._b_ignore_ibutton_data = b_ignore;
        }
    }

    /**
     * @public
     * @description 수신된 MSR raw 패킷을 분석하여 각 트랙 버퍼에 저장합니다.
     * @param {string} s_rx - 16진수 문자열 형태의 수신 패킷
     * @returns {boolean} 분석 성공 여부
     */
    public set_msr_data_from_rx = (s_rx: string): boolean => {
        let b_result = false;

        do {
            // 1. 기본 유효성 검사
            if (typeof s_rx !== 'string') break;
            if (s_rx.length % 2 !== 0) break; // 바이트 단위(2글자)여야 함
            if (s_rx.length < 2 * this._const_the_number_of_track) break; // 헤더(길이 정보) 부족

            let s_src = s_rx;
            let s_char = "";
            const n_len: number[] = [0, 0, 0];
            let n_len_error = 0;

            // 2. 헤더 파싱: 각 트랙의 데이터 길이 또는 에러 코드 추출
            for (let i = 0; i < this._const_the_number_of_track; i++) {
                this._array_s_card_data[i] = ""; // 버퍼 초기화
                this._array_n_card_error_code[i] = 0;

                s_char = s_src.slice(0, 2);
                s_src = s_src.substring(2);

                n_len_error = parseInt(s_char, 16);

                // 2-byte Signed Integer 처리 (0x80 이상은 에러 코드로 간주)
                if (n_len_error > 127) {
                    this._array_n_card_error_code[i] = n_len_error - 256;
                } else {
                    n_len[i] = n_len_error; // 실제 데이터 바이트 길이
                }
            }

            // 3. 본문 파싱: 실제 카드 데이터 복원
            for (let i = 0; i < this._const_the_number_of_track; i++) {
                if (n_len[i] <= 0) continue;

                // 해당 트랙의 데이터 길이만큼 잘라냄
                let s_op = s_src.slice(0, n_len[i] * 2);
                s_src = s_src.substring(n_len[i] * 2);

                const n_op = s_op.length;
                for (let j = 0; j < n_op / 2; j++) {
                    const hex_byte = s_op.slice(0, 2);
                    let n_data = parseInt(hex_byte, 16);

                    /**
                     * LPU237 프로토콜 특성:
                     * Track 1: 6-bit 형식 (ASCII 0x20 offset)
                     * Track 2, 3: 4-bit 형식 (ASCII 0x30 offset)
                     */
                    if (i === 0) {
                        n_data += 0x20; // Track 1 Offset
                    } else {
                        n_data += 0x30; // Track 2, 3 Offset
                    }

                    this._array_s_card_data[i] += String.fromCharCode(n_data);
                    s_op = s_op.substring(2);
                }
            }

            b_result = true;
        } while (false);

        return b_result;
    }

    /**
     * @public
     * @description 수신된 패킷에서 i-Button 데이터를 분석하고 저장합니다.
     * @param {string} s_rx - 16진수 문자열 형태의 수신 패킷
     * @returns {boolean} i-Button 데이터로 확인되어 성공적으로 추출했는지 여부
     */
    public set_ibutton_data_from_rx = (s_rx: string): boolean => {
        let b_result = false;

        do {
            // 1. 기본 유효성 검사
            if (typeof s_rx !== 'string') break;
            if (s_rx.length % 2 !== 0) break;

            // 패킷 최소 길이 검사: 헤더(3) + 데이터(8) + 마커(20) = 총 31바이트 (62자)
            const MIN_LENGTH = 2 * (3 + 8 + 20);
            if (s_rx.length < MIN_LENGTH) break;

            // 2. 바이트 배열 변환
            const ar_byte = new Uint8Array(s_rx.length / 2);
            for (let i = 0; i < s_rx.length; i += 2) {
                ar_byte[i / 2] = parseInt(s_rx.substring(i, i + 2), 16);
            }

            // 3. 마커(Pattern) 확인
            // 패킷의 11번째 바이트부터 20바이트 구간을 추출
            const MARKER_START = 11;
            const MARKER_LEN = 20;
            let s_pattern = '';
            for (let i = 0; i < MARKER_LEN; i++) {
                s_pattern += String.fromCharCode(ar_byte[MARKER_START + i]);
            }

            const IBUTTON_MAKER = "this_is_ibutton_data";
            if (s_pattern !== IBUTTON_MAKER) {
                // 패턴이 일치하지 않으면 i-Button 패킷이 아님
                break;
            }

            // 4. i-Button ID 추출 (8바이트 ID 정보)
            // 패킷의 3번째 바이트부터 11번째 바이트 전까지 (index 3~10)
            const hexStart = 3 * 2; // 6번째 문자
            const hexEnd = (3 + 8) * 2; // 22번째 문자 전까지
            const s_ibutton = s_rx.slice(hexStart, hexEnd);

            // 데이터 저장
            this._n_ibutton_error_code = 0;
            this._s_ibutton_data = s_ibutton;

            b_result = true;
        } while (false);

        return b_result;
    }

    /**
     * @public
     * @description 장치의 시스템 파라미터 및 설정 상태를 개행 문자(\n)로 구분된 문자열로 반환합니다.
     * @returns {string} 장치 설정 요약 리포트
     */
    public get_string = (): string => {
        let s_description = "";

        try {
            // 1. 기본 시스템 정보
            s_description += `System name : ${this._s_name}\n`;
            s_description += `System version : ${this._get_version_string(this._version)}\n`;
            s_description += `Structure version : ${this._get_version_structure_string(this._version_structure)}\n`;
            s_description += `System UID : ${this._s_uid}\n`;

            s_description += `Used bootloader : ${this._b_is_hid_boot ? "Hid" : "MSD"}.\n`;
            s_description += `System interface : ${this._get_system_inferface_string(this._n_interface)}\n`;
            s_description += `Language : ${this._get_keyboard_language_index_string(this._n_language_index)}\n`;
            s_description += `Manufacture : ${this._get_manufacturer_string(this._n_manufacture)}\n`;
            s_description += `MSD bootloader running time : ${this._dw_boot_run_time}\n`;

            // 2. 하드웨어 세부 사양 (Buzzer, Decoder 등)
            const buzzerKHz = (this._get_freqency_from_timer_count(this._dw_buzzer_count) / 1000).toFixed(0);
            s_description += `Buzzer frequency : ${buzzerKHz} KHz(${this._dw_buzzer_count})\n`;
            s_description += `The supported functions : ${this._get_function_string(this._n_device_function, this._version)}\n`;

            let decoderName = "Magtek";
            if (this._b_device_is_ibutton_only) decoderName = "None";
            else if (this._b_device_is_mmd1000) decoderName = "MMD1100";
            s_description += `Msr decoder : ${decoderName}\n`;

            s_description += `i-Button mode : ${this._get_ibutton_mode_string(this._c_blank[2] & 0x0F)}\n`;

            // 3. MSR 전송 및 오류 처리 조건
            const prePostCondition = this._b_global_pre_postfix_send_condition
                ? "send when all track isn't error."
                : "send when a track isn't error.";
            s_description += `MSR global pre/postfixs sending condition : ${prePostCondition}\n`;

            const trackOrder = this._n_order.map(n => n + 1).join("");
            s_description += `MSR track order : ${trackOrder}\n`;

            const errCondition = (this._c_blank[1] & 0x01)
                ? "If any track is not error, it is success."
                : "If all track are not error, it is success.";
            s_description += `indication error condition : ${errCondition}\n`;

            s_description += `c_blank : 0x${this._c_blank[0].toString(16)}: 0x${this._c_blank[1].toString(16)}: 0x${this._c_blank[2].toString(16)}: 0x${this._c_blank[3].toString(16)}\n`;

            // 4. ISO 트랙 무시 및 특수 설정 (Bitmask 처리)
            s_description += `Ignore ISO1 : ${(this._c_blank[1] & 0x02) ? "If 1 & 2 track data is equal, send 2 track data only." : "not ignore iso1 track."}\n`;
            s_description += `Ignore ISO3 : ${(this._c_blank[1] & 0x04) ? "If 2 & 3 track data is equal, send 2 track data only." : "not ignore iso3 track"}\n`;
            s_description += `remove colon : ${(this._c_blank[1] & 0x08) ? "If a track ETXL is 0xe0 and the first data is ASCII ':',then track's ':' isn't sent." : "not remove colon."}\n`;

            // 5. 버전별 특수 파라미터 (MMD1100 리셋 간격 등)
            if (this._first_version_greater_then_second_version(false, this._version, [5, 15, 0, 0]) &&
                this._first_version_greater_then_second_version(false, [6, 0, 0, 0], this._version)) {
                const isGreater518 = this._first_version_greater_then_second_version(false, this._version, [5, 18, 0, 0]);
                s_description += `mmd1100 reset interval : ${this.get_mmd1100_reset_interval_string(this._c_blank[1] & 0xF0, isGreater518)}\n`;
            }

            // 6. 접두사/접미사 정보
            s_description += `MSR global prefixs : ${this._s_global_prefix}\n`;
            s_description += `MSR global postfixs : ${this._s_global_postfix}\n`;
            s_description += `i-button prefixs : ${this._s_prefix_ibutton}\n`;
            s_description += `i-button postfixs : ${this._s_postfix_ibutton}\n`;

            if (this._first_version_greater_then_second_version(true, this._version_structure, [4, 0, 0, 0])) {
                s_description += `i-button remove : ${this._s_ibutton_remove}\n`;
                s_description += `i-button prefixs remove : ${this._s_prefix_ibutton_remove}\n`;
                s_description += `i-button postfixs remove : ${this._s_postfix_ibutton_remove}\n`;
            }

            s_description += `Uart prefixs : ${this._s_prefix_uart}\n`;
            s_description += `Uart postfixs : ${this._s_postfix_uart}\n`;

            // 7. 트랙 및 조합별 상세 디코딩 정보 (Nested Loop)
            for (let i = 0; i < this._const_the_number_of_track; i++) {
                s_description += "==================================================\n";
                s_description += `.......ISO track ${i + 1} Information.\n`;
                s_description += `MSR enabled track ${i + 1} : ${this._b_enable_iso[i] ? "enabled" : "disabled"}.\n`;
                s_description += `MSR reading direction track ${i + 1} : ${this._get_direction_string(this._n_direction[i])}\n`;
                s_description += `the number of combination track ${i + 1} : ${this._n_number_combination[i]}\n`;

                for (let j = 0; j < lpu237._const_the_number_of_combination; j++) {
                    s_description += "------------------------------\n";
                    s_description += `.......combination ${j} Information.\n`;
                    s_description += `max size of track ${i + 1} combination ${j} : ${this._n_max_size[i][j]}\n`;
                    s_description += `one bit size of track ${i + 1} combination ${j} : ${this._n_bit_size[i][j]}\n`;
                    s_description += `data mask of track ${i + 1} combination ${j} : 0x${this._c_data_mask[i][j].toString(16)}\n`;
                    s_description += `parity bit of track ${i + 1} combination ${j} : ${this._b_use_parity[i][j] ? "enabled" : "disabled"}.\n`;
                    s_description += `parity bit type of track ${i + 1} combination ${j} : ${this._get_parity_type_string(this._n_parity_type[i][j])}\n`;
                    s_description += `STX pattern of track ${i + 1} combination ${j} : 0x${this._c_stxl[i][j].toString(16)}\n`;
                    s_description += `ETX pattern of track ${i + 1} combination ${j} : 0x${this._c_etxl[i][j].toString(16)}\n`;
                    s_description += `ecm of track ${i + 1} combination ${j} : ${this._b_use_ecm[i][j] ? "enabled" : "disabled"}.\n`;
                    s_description += `ecm type of track ${i + 1} combination ${j} : ${this._get_error_correct_type_string(this._n_ecm_type[i][j])}\n`;
                    s_description += `for converting to ASCII, add value of track ${i + 1} combination ${j} : ${this._n_add_value[i][j]}\n`;
                    s_description += `MSR private prefix track ${i + 1} combination ${j} : ${this._s_private_prefix[i][j]}\n`;
                    s_description += `MSR private postfix track ${i + 1} combination ${j} : ${this._s_private_postfix[i][j]}\n`;
                }
            }
        } catch (e) {
            console.error("Error generating system string:", e);
        }

        return s_description;
    }

    /**
     * @public
     * @description 장치에서 받은 태그(Hex)를 현재 설정된 언어 인덱스에 맞춰 ASCII Hex 문자열 배열로 변환합니다.
     * @param {string} s_tag - 장치로부터 수신된 Hex 형식의 태그 문자열
     * @returns {string[]} ASCII 코드가 담긴 Hex 문자열 배열
     */
    public get_tag_by_ascii_hex_string = (s_tag: string): string[] => {
        // 내부 헬퍼 함수를 호출하며 현재 객체의 언어 설정(_n_language_index)을 전달합니다.
        return this._get_tag_by_ascii_hex_string(this._n_language_index, s_tag);
    }

    /**
     * @public
     * @description OPOS 모드 진입 명령에 대한 응답이 성공인지 확인합니다.
     * @param {string} s_response - LPU237 장치로부터 받은 응답 패킷
     * @returns {boolean} 성공(Good 또는 Negative Good)이면 true, 아니면 false
     */
    public is_success_enter_opos_mode = (s_response: string): boolean => {
        // 응답 패킷의 상태 코드를 분석하는 공용 함수를 호출합니다.
        return this._is_success_response(s_response);
    }

    /**
     * @public
     * @description 장치 태그를 현재 설정된 언어 레이아웃에 맞게 ASCII 숫자 배열로 변환합니다.
     */
    public get_tag_by_ascii_code = (s_tag: string): number[] => {
        return this._get_tag_by_ascii_code(this._n_language_index, s_tag);
    }

    /**
     * @public
     * @description 장치 태그를 현재 설정된 언어 레이아웃에 맞게 ASCII 문자 배열(string[])로 변환합니다.
     */
    public get_tag_by_ascii_string = (s_tag: string): string[] => {
        return this._get_tag_by_ascii_string(this._n_language_index, s_tag);
    }

    /**
     * @public
     * @description 에러 이름을 전달하여 해당 에러의 상세 메시지를 가져옵니다.
     */
    public get_error_message = (s_error_name: string): string => {
        return this._get_error_message(s_error_name);
    }

    /**
     * @public
     * @description 디바이스 경로(_s_path)를 정규표현식으로 분석하여 장치 타입을 분류합니다.
     * @returns {string} 'compositive_msr', 'compositive_scr', 'compositive_ibutton', 'compositive_switch' 등
     */
    public get_type_string = (): string => {
        if (typeof this._s_path !== 'string') return '';

        const path = this._s_path.trim();

        // 정규표현식을 사용한 하위 인터페이스 판별
        if (/&msr$/.test(path)) return 'compositive_msr';
        if (/&scr\d+$/.test(path)) return 'compositive_scr';
        if (/&ibutton$/.test(path)) return 'compositive_ibutton';
        if (/&switch\d+$/.test(path)) return 'compositive_switch';

        return 'primitive';
    }

    /**
     * Returns a string containing the system parameters in an HTML table format.
     *
     * @public
     * @param {string | null} s_section - The section to retrieve. Can be "system", "iso1", "iso2", or "iso3". If null, all sections are retrieved.
     * @returns {string} The system parameters as an HTML table.
     */
    public get_string_html_table = (s_section: string | null = null): string => {
        let s_description: string = "";
        const as_name: string[] = [];
        const as_value: string[] = [];
        let n_count: number = 0;

        const as_n: string[][] = [];
        const as_v: string[][] = [];

        let b_system: boolean = true;
        const b_iso: boolean[] = [true, true, true];

        if (s_section === "system") {
            b_iso[0] = b_iso[1] = b_iso[2] = false;
        } else if (s_section === "iso1") {
            b_system = false;
            b_iso[1] = b_iso[2] = false;
        } else if (s_section === "iso2") {
            b_system = false;
            b_iso[0] = b_iso[2] = false;
        } else if (s_section === "iso3") {
            b_system = false;
            b_iso[0] = b_iso[1] = false;
        }

        do {
            const ver: number[] = [0, 0, 0, 0];
            let n_value: number = 0;
            //
            n_count = 0;
            if (b_system) {
                as_name[n_count] = "System name";
                as_value[n_count] = this._s_name ?? "";
                //
                ++n_count;
                as_name[n_count] = "System version";
                as_value[n_count] = this._get_version_string(this._version);
                //
                ++n_count;
                as_name[n_count] = "Structure version";
                as_value[n_count] = this._get_version_structure_string(this._version_structure);
                //
                ++n_count;
                as_name[n_count] = "System UID";
                as_value[n_count] = this._s_uid ?? "";
                //
                ++n_count;
                as_name[n_count] = "Used bootloader";
                if (this._b_is_hid_boot) {
                    as_value[n_count] = "Hid";
                } else {
                    as_value[n_count] = "MSD";
                }
                //
                ++n_count;
                as_name[n_count] = "System interface";
                as_value[n_count] = this._get_system_inferface_string(this._n_interface);
                //
                ++n_count;
                as_name[n_count] = "Language";
                as_value[n_count] = this._get_keyboard_language_index_string(this._n_language_index);
                //
                ++n_count;
                as_name[n_count] = "Manufacture";
                as_value[n_count] = this._get_manufacturer_string(this._n_manufacture);
                //
                ++n_count;
                as_name[n_count] = "MSD bootloader running time";
                as_value[n_count] = String(this._dw_boot_run_time);
                //
                ++n_count;
                as_name[n_count] = "Buzzer frequency";
                as_value[n_count] = (this._get_freqency_from_timer_count(this._dw_buzzer_count) / 1000).toFixed(0) + " KHz(" + String(this._dw_buzzer_count) + ")";
                //
                ++n_count;
                as_name[n_count] = "The supported functions";
                as_value[n_count] = this._get_function_string(this._n_device_function, this._version);
                //
                ++n_count;
                as_name[n_count] = "Msr decoder";
                if (this._b_device_is_ibutton_only) {
                    as_value[n_count] = "None";
                } else {
                    if (this._b_device_is_mmd1000) {
                        as_value[n_count] = "MMD1100";
                    } else {
                        as_value[n_count] = "Magtek";
                    }
                }
                //
                ++n_count;
                as_name[n_count] = "i-Button mode";
                as_value[n_count] = this._get_ibutton_mode_string(this._c_blank[2] & 0x0F);
                //
                ++n_count;
                as_name[n_count] = "blank data";
                as_value[n_count] = "0x" + this._c_blank[0].toString(16)
                    + " : 0x" + this._c_blank[1].toString(16)
                    + " : 0x" + this._c_blank[2].toString(16)
                    + " : 0x" + this._c_blank[3].toString(16);
                //
                ++n_count;
                as_name[n_count] = "MSR global pre/postfixs sending condition";
                if (this._b_global_pre_postfix_send_condition) {
                    as_value[n_count] = "send when all track have not a error.";
                } else {
                    as_value[n_count] = "send when any track isn't error.";
                }
                //
                ++n_count;
                as_name[n_count] = "MSR track order";
                as_value[n_count] = (this._n_order[0] + 1).toString() + (this._n_order[1] + 1).toString() + (this._n_order[2] + 1).toString();
                //
                ++n_count;
                as_name[n_count] = "indication error condition";
                if (this._c_blank[1] & 0x01) {
                    as_value[n_count] = "If any track is not error, it is success.";
                } else {
                    as_value[n_count] = "If all track are not error, it is success.";
                }
                //
                ++n_count;
                as_name[n_count] = "Ignore ISO1";
                if (this._c_blank[1] & 0x02) {
                    as_value[n_count] = "If 1 & 2 track data is equal, send 2 track data only.";
                } else {
                    as_value[n_count] = "Ignore ISO1 : not ignore iso1 track.";
                }
                //
                ++n_count;
                as_name[n_count] = "Ignore ISO3";
                if (this._c_blank[1] & 0x04) {
                    as_value[n_count] = "If 3 & 2 track data is equal, send 2 track data only.";
                } else {
                    as_value[n_count] = "Ignore ISO3 : not ignore iso3 track.";
                }
                //
                ++n_count;
                as_name[n_count] = "remove colon";
                if (this._c_blank[1] & 0x08) {
                    as_value[n_count] = "If a track ETXL is 0xe0 and the first data is ASCII ':',then track's ':' isn't sent.";
                } else {
                    as_value[n_count] = "remove colon : not remove colon.";
                }
                //
                let b_device_version_greater_then_5_18: boolean = false;
                if (this._first_version_greater_then_second_version(false, this._version, [5, 18, 0, 0])) {
                    if (this._first_version_greater_then_second_version(false, [6, 0, 0, 0], this._version)) {
                        b_device_version_greater_then_5_18 = true;
                    }
                }
                if (this._first_version_greater_then_second_version(false, this._version, [5, 15, 0, 0])) {
                    if (this._first_version_greater_then_second_version(false, [6, 0, 0, 0], this._version)) {
                        ++n_count;
                        as_name[n_count] = "mmd1100 reset interval";
                        as_value[n_count] = this.get_mmd1100_reset_interval_string(this._c_blank[1] & 0xF0, b_device_version_greater_then_5_18);
                    }
                }
                //
                ++n_count;
                as_name[n_count] = "MSR global prefixs";
                as_value[n_count] = this._s_global_prefix ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_global_prefix ?? "");
                //
                ++n_count;
                as_name[n_count] = "MSR global postfixs";
                as_value[n_count] = this._s_global_postfix ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_global_postfix ?? "");
                //
                ++n_count;
                as_name[n_count] = "i-button prefixs";
                as_value[n_count] = this._s_prefix_ibutton ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_prefix_ibutton ?? "");
                //
                ++n_count;
                as_name[n_count] = "i-button postfixs";
                as_value[n_count] = this._s_postfix_ibutton ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_postfix_ibutton ?? "");

                if (this._first_version_greater_then_second_version(true, this._version_structure, [4, 0, 0, 0])) {
                    //
                    ++n_count;
                    as_name[n_count] = "i-button remove";
                    as_value[n_count] = this._s_ibutton_remove ?? "";
                    as_value[n_count] += "<br/>";
                    as_value[n_count] += this._get_tag_remove_by_symbol(this._n_language_index, this._s_ibutton_remove ?? "");
                    //
                    ++n_count;
                    as_name[n_count] = "i-button prefixs remove";
                    as_value[n_count] = this._s_prefix_ibutton_remove ?? "";
                    as_value[n_count] += "<br/>";
                    as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_prefix_ibutton_remove ?? "");
                    //
                    ++n_count;
                    as_name[n_count] = "i-button postfixs remove";
                    as_value[n_count] = this._s_postfix_ibutton_remove ?? "";
                    as_value[n_count] += "<br/>";
                    as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_postfix_ibutton_remove ?? "");
                }
                //
                ++n_count;
                as_name[n_count] = "Uart prefixs";
                as_value[n_count] = this._s_prefix_uart ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_prefix_uart ?? "");
                //
                ++n_count;
                as_name[n_count] = "Uart postfixs";
                as_value[n_count] = this._s_postfix_uart ?? "";
                as_value[n_count] += "<br/>";
                as_value[n_count] += this._get_tag_by_symbol(this._n_language_index, this._s_postfix_uart ?? "");
            }//system section
            ////////////////////////////////////////////////////

            for (let i = 0; i < this._const_the_number_of_track; i++) {
                as_n.push([]);
                as_n[i].push("ISO track " + String(i + 1) + " Information");
                as_v.push([]);
                as_v[i].push("ISO track " + String(i + 1) + " Information");//for colspan 2

                as_n[i].push("MSR enabled track");
                if (this._b_enable_iso[i]) {
                    as_v[i].push("enabled");
                } else {
                    as_v[i].push("disabled");
                }
                //
                as_n[i].push("MSR reading direction");
                as_v[i].push(this._get_direction_string(this._n_direction[i]));
                //
                as_n[i].push("the number of combination");
                as_v[i].push(String(this._n_number_combination[i]));

                let s_tag: string = "";
                for (let j = 0; j < lpu237._const_the_number_of_combination; j++) {
                    as_n[i].push("ISO track " + String(i + 1) + "combination " + String(j) + " Information");
                    as_v[i].push("ISO track " + String(i + 1) + "combination " + String(j) + " Information");//for colspan 2

                    //
                    as_n[i].push("max size combination" + String(j));
                    as_v[i].push(String(this._n_max_size[i][j]));
                    //
                    as_n[i].push("one bit size combination" + String(j));
                    as_v[i].push(String(this._n_bit_size[i][j]));
                    //
                    as_n[i].push("data mask combination" + String(j));
                    as_v[i].push("0x" + this._c_data_mask[i][j].toString(16));
                    //
                    as_n[i].push("parity bit combination" + String(j));
                    if (this._b_use_parity[i][j]) {
                        as_v[i].push("enabled");
                    } else {
                        as_v[i].push("disabled");
                    }
                    //
                    as_n[i].push("parity bit type combination" + String(j));
                    as_v[i].push(this._get_parity_type_string(this._n_parity_type[i][j]));
                    //
                    as_n[i].push("STX pattern combination" + String(j));
                    as_v[i].push("0x" + this._c_stxl[i][j].toString(16));
                    //
                    as_n[i].push("ETX pattern combination" + String(j));
                    as_v[i].push("0x" + this._c_etxl[i][j].toString(16));
                    //
                    as_n[i].push("ecm combination" + String(j));
                    if (this._b_use_ecm[i][j]) {
                        as_v[i].push("enabled");
                    } else {
                        as_v[i].push("disabled");
                    }
                    //
                    as_n[i].push("ecm type combination" + String(j));
                    as_v[i].push(this._get_error_correct_type_string(this._n_ecm_type[i][j]));
                    //
                    as_n[i].push("for converting to ASCII,add value combination" + String(j));
                    as_v[i].push(String(this._n_add_value[i][j]));
                    //
                    as_n[i].push("MSR private prefix combination" + String(j));
                    s_tag = this._s_private_prefix[i][j]
                        + "<br/>" + this._get_tag_by_symbol(this._n_language_index, this._s_private_prefix[i][j] ?? "");
                    as_v[i].push(s_tag);
                    //
                    as_n[i].push("MSR postfix prefix combination" + String(j));
                    s_tag = this._s_private_postfix[i][j]
                        + "<br/>" + this._get_tag_by_symbol(this._n_language_index, this._s_private_postfix[i][j] ?? "");
                    as_v[i].push(s_tag);

                }//end for j
            }//end for                

            /////////////////////////////////////////////////////////////////
            s_description += "<table border=1>";

            if (b_system) {
                s_description += "<tr> <th colspan = '2' bgcolor='#E6E6E6'>";
                s_description += "System information";
                s_description += "</th> </tr>";
                //
                for (let i = 0; i < as_name.length; i++) {
                    s_description += "<tr> <td>";
                    s_description += as_name[i];
                    s_description += "</td><td>";
                    s_description += as_value[i];
                    s_description += "</td> </tr>";
                }//end for
            }

            //
            for (let i = 0; i < as_n.length; i++) {
                if (!b_iso[i]) {
                    continue;
                }
                for (let j = 0; j < as_n[i].length; j++) {
                    if (as_n[i][j] === as_v[i][j]) {
                        s_description += "<tr> <th colspan = '2' bgcolor='#FAFAFA'>";
                        s_description += as_n[i][j];
                        s_description += "</th> </tr>";
                    } else {
                        s_description += "<tr> <td>";
                        s_description += as_n[i][j];
                        s_description += "</td><td>";
                        s_description += as_v[i][j];
                        s_description += "</td> </tr>";
                    }
                }//end for
            }//end for

            s_description += "</table>";

        } while (false);
        return s_description;
    }

    /**
     * @public
     * @param {number} n_type request type number (_type_generated_tx_type.gt_xxx value).
     * @returns {string | null} the description string of type number. Error return null.
     * @description get the request type description with it's number.
     */
    public get_request_type_string_with_number(n_type: number): string | null {
        let s_description: string | null = null;
        do {
            if (typeof n_type !== 'number') {
                continue;
            }
            if (n_type < _type_generated_tx_type.gt_read_uid) {//minmum
                continue;
            }
            if (n_type > _type_generated_tx_type.gt_set_postfix_ibutton_remove) {//max
                continue;
            }
            //
            switch (n_type) {
                case _type_generated_tx_type.gt_get_version: s_description = "get version"; break;
                case _type_generated_tx_type.gt_get_version_structure: s_description = "get strcuture version"; break;
                case _type_generated_tx_type.gt_type_device: s_description = "get device type"; break;
                case _type_generated_tx_type.gt_type_ibutton: s_description = "get i-button mode"; break;
                case _type_generated_tx_type.gt_read_uid: s_description = "get uid"; break;
                case _type_generated_tx_type.gt_change_authkey: s_description = "change authentication key"; break;
                case _type_generated_tx_type.gt_change_status: s_description = "change status"; break;
                case _type_generated_tx_type.gt_change_sn: s_description = "change serial number"; break;
                case _type_generated_tx_type.gt_enter_config: s_description = "enter configuration"; break;
                case _type_generated_tx_type.gt_leave_config: s_description = "leave configuration"; break;
                case _type_generated_tx_type.gt_apply: s_description = "apply"; break;
                case _type_generated_tx_type.gt_goto_boot: s_description = "goto boot"; break;
                case _type_generated_tx_type.gt_enter_opos: s_description = "enter OPOS"; break;
                case _type_generated_tx_type.gt_leave_opos: s_description = "leave OPOS"; break;
                case _type_generated_tx_type.gt_support_mmd1000: s_description = "support mmd1000"; break;
                case _type_generated_tx_type.gt_get_name: s_description = "get name"; break;
                case _type_generated_tx_type.gt_get_global_prepostfix_send_condition: s_description = "get global send condition"; break;
                case _type_generated_tx_type.gt_get_blank_4byets: s_description = "get blank 4bytes."; break;
                case _type_generated_tx_type.gt_get_interface: s_description = "get interface"; break;
                case _type_generated_tx_type.gt_get_language: s_description = "get language"; break;
                case _type_generated_tx_type.gt_get_buzzer_count: s_description = "get buzzer count"; break;
                case _type_generated_tx_type.gt_get_boot_run_time: s_description = "get MSD boot run time"; break;
                case _type_generated_tx_type.gt_get_enable_iso1: s_description = "get enable iso1"; break;
                case _type_generated_tx_type.gt_get_enable_iso2: s_description = "get enable iso2"; break;
                case _type_generated_tx_type.gt_get_enable_iso3: s_description = "get enable iso3"; break;
                case _type_generated_tx_type.gt_get_direction1: s_description = "get iso1 direction"; break;
                case _type_generated_tx_type.gt_get_direction2: s_description = "get iso2 direction"; break;
                case _type_generated_tx_type.gt_get_direction3: s_description = "get iso3 direction"; break;
                case _type_generated_tx_type.gt_get_global_prefix: s_description = "get global prefix"; break;
                case _type_generated_tx_type.gt_get_global_postfix: s_description = "get global postfix"; break;
                case _type_generated_tx_type.gt_get_iso1_number_combi: s_description = "get_iso1_number_combi"; break;
                case _type_generated_tx_type.gt_get_iso2_number_combi: s_description = "get_iso2_number_combi"; break;
                case _type_generated_tx_type.gt_get_iso3_number_combi: s_description = "get_iso3_number_combi"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_MaxSize: s_description = "get_iso1_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_MaxSize: s_description = "get_iso1_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_MaxSize: s_description = "get_iso1_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_MaxSize: s_description = "get_iso2_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_MaxSize: s_description = "get_iso2_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_MaxSize: s_description = "get_iso2_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_MaxSize: s_description = "get_iso3_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_MaxSize: s_description = "get_iso3_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_MaxSize: s_description = "get_iso3_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_BitSize: s_description = "get_iso1_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_BitSize: s_description = "get_iso1_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_BitSize: s_description = "get_iso1_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_BitSize: s_description = "get_iso2_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_BitSize: s_description = "get_iso2_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_BitSize: s_description = "get_iso2_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_BitSize: s_description = "get_iso3_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_BitSize: s_description = "get_iso3_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_BitSize: s_description = "get_iso3_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_DataMask: s_description = "get_iso1_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_DataMask: s_description = "get_iso1_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_DataMask: s_description = "get_iso1_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_DataMask: s_description = "get_iso2_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_DataMask: s_description = "get_iso2_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_DataMask: s_description = "get_iso2_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_DataMask: s_description = "get_iso3_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_DataMask: s_description = "get_iso3_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_DataMask: s_description = "get_iso3_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_UseParity: s_description = "get_iso1_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_UseParity: s_description = "get_iso1_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_UseParity: s_description = "get_iso1_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_UseParity: s_description = "get_iso2_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_UseParity: s_description = "get_iso2_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_UseParity: s_description = "get_iso2_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_UseParity: s_description = "get_iso3_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_UseParity: s_description = "get_iso3_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_UseParity: s_description = "get_iso3_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ParityType: s_description = "get_iso1_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_ParityType: s_description = "get_iso1_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_ParityType: s_description = "get_iso1_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ParityType: s_description = "get_iso2_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_ParityType: s_description = "get_iso2_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_ParityType: s_description = "get_iso2_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ParityType: s_description = "get_iso3_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_ParityType: s_description = "get_iso3_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_ParityType: s_description = "get_iso3_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_STX_L: s_description = "get_iso1_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_STX_L: s_description = "get_iso1_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_STX_L: s_description = "get_iso1_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_STX_L: s_description = "get_iso2_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_STX_L: s_description = "get_iso2_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_STX_L: s_description = "get_iso2_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_STX_L: s_description = "get_iso3_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_STX_L: s_description = "get_iso3_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_STX_L: s_description = "get_iso3_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ETX_L: s_description = "get_iso1_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_ETX_L: s_description = "get_iso1_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_ETX_L: s_description = "get_iso1_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ETX_L: s_description = "get_iso2_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_ETX_L: s_description = "get_iso2_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_ETX_L: s_description = "get_iso2_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ETX_L: s_description = "get_iso3_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_ETX_L: s_description = "get_iso3_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_ETX_L: s_description = "get_iso3_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_UseErrorCorrect: s_description = "get_iso1_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_UseErrorCorrect: s_description = "get_iso1_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_UseErrorCorrect: s_description = "get_iso1_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_UseErrorCorrect: s_description = "get_iso2_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_UseErrorCorrect: s_description = "get_iso2_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_UseErrorCorrect: s_description = "get_iso2_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_UseErrorCorrect: s_description = "get_iso3_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_UseErrorCorrect: s_description = "get_iso3_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_UseErrorCorrect: s_description = "get_iso3_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ECMType: s_description = "get_iso1_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_ECMType: s_description = "get_iso1_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_ECMType: s_description = "get_iso1_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ECMType: s_description = "get_iso2_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_ECMType: s_description = "get_iso2_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_ECMType: s_description = "get_iso2_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ECMType: s_description = "get_iso3_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_ECMType: s_description = "get_iso3_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_ECMType: s_description = "get_iso3_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_AddValue: s_description = "get_iso1_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi1_AddValue: s_description = "get_iso1_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso1_Combi2_AddValue: s_description = "get_iso1_Combi2_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_AddValue: s_description = "get_iso2_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi1_AddValue: s_description = "get_iso2_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso2_Combi2_AddValue: s_description = "get_iso2_Combi2_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_AddValue: s_description = "get_iso3_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi1_AddValue: s_description = "get_iso3_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_get_iso3_Combi2_AddValue: s_description = "get_iso3_Combi2_AddValue"; break;
                case _type_generated_tx_type.gt_get_private_prefix10: s_description = "get private prefix10"; break;
                case _type_generated_tx_type.gt_get_private_prefix11: s_description = "get private prefix11"; break;
                case _type_generated_tx_type.gt_get_private_prefix12: s_description = "get private prefix12"; break;
                case _type_generated_tx_type.gt_get_private_prefix20: s_description = "get private prefix20"; break;
                case _type_generated_tx_type.gt_get_private_prefix21: s_description = "get private prefix21"; break;
                case _type_generated_tx_type.gt_get_private_prefix22: s_description = "get private prefix22"; break;
                case _type_generated_tx_type.gt_get_private_prefix30: s_description = "get private prefix30"; break;
                case _type_generated_tx_type.gt_get_private_prefix31: s_description = "get private prefix31"; break;
                case _type_generated_tx_type.gt_get_private_prefix32: s_description = "get private prefix32"; break;
                case _type_generated_tx_type.gt_get_private_postfix10: s_description = "get private posfix10"; break;
                case _type_generated_tx_type.gt_get_private_postfix11: s_description = "get private posfix11"; break;
                case _type_generated_tx_type.gt_get_private_postfix12: s_description = "get private posfix12"; break;
                case _type_generated_tx_type.gt_get_private_postfix20: s_description = "get private posfix20"; break;
                case _type_generated_tx_type.gt_get_private_postfix21: s_description = "get private posfix21"; break;
                case _type_generated_tx_type.gt_get_private_postfix22: s_description = "get private posfix22"; break;
                case _type_generated_tx_type.gt_get_private_postfix30: s_description = "get private posfix30"; break;
                case _type_generated_tx_type.gt_get_private_postfix31: s_description = "get private posfix31"; break;
                case _type_generated_tx_type.gt_get_private_postfix32: s_description = "get private posfix32"; break;
                case _type_generated_tx_type.gt_get_prefix_ibutton: s_description = "get i-button prefix"; break;
                case _type_generated_tx_type.gt_get_postfix_ibutton: s_description = "get i-button postfix"; break;
                case _type_generated_tx_type.gt_get_ibutton_remove: s_description = "get i-button remove"; break;
                case _type_generated_tx_type.gt_get_prefix_ibutton_remove: s_description = "get i-button prefix remove"; break;
                case _type_generated_tx_type.gt_get_postfix_ibutton_remove: s_description = "get i-button postfix remove"; break;
                case _type_generated_tx_type.gt_get_prefix_uart: s_description = "get uart prefix"; break;
                case _type_generated_tx_type.gt_get_postfix_uart: s_description = "get uart postfix"; break;
                case _type_generated_tx_type.gt_set_global_prepostfix_send_condition: s_description = "set global send condition"; break;
                case _type_generated_tx_type.gt_set_blank_4byets: s_description = "set blank 4bytes"; break;
                case _type_generated_tx_type.gt_set_interface: s_description = "set interface"; break;
                case _type_generated_tx_type.gt_set_language: s_description = "set language"; break;
                case _type_generated_tx_type.get_set_keymap: s_description = "set keymap"; break;
                case _type_generated_tx_type.gt_set_buzzer_count: s_description = "set buzzer count"; break;
                case _type_generated_tx_type.gt_set_enable_iso1: s_description = "set enable iso1"; break;
                case _type_generated_tx_type.gt_set_enable_iso2: s_description = "set enable iso2"; break;
                case _type_generated_tx_type.gt_set_enable_iso3: s_description = "set enable iso3"; break;
                case _type_generated_tx_type.gt_set_direction1: s_description = "set iso1 direction"; break;
                case _type_generated_tx_type.gt_set_direction2: s_description = "set iso2 direction"; break;
                case _type_generated_tx_type.gt_set_direction3: s_description = "set iso3 direction"; break;
                case _type_generated_tx_type.gt_set_global_prefix: s_description = "set global prefix"; break;
                case _type_generated_tx_type.gt_set_global_postfix: s_description = "set global postfix"; break;
                case _type_generated_tx_type.gt_set_iso1_number_combi: s_description = "set_iso1_number_combi"; break;
                case _type_generated_tx_type.gt_set_iso2_number_combi: s_description = "set_iso2_number_combi"; break;
                case _type_generated_tx_type.gt_set_iso3_number_combi: s_description = "set_iso3_number_combi"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_MaxSize: s_description = "set_iso1_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_MaxSize: s_description = "set_iso1_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_MaxSize: s_description = "set_iso1_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_MaxSize: s_description = "set_iso2_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_MaxSize: s_description = "set_iso2_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_MaxSize: s_description = "set_iso2_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_MaxSize: s_description = "set_iso3_Combi0_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_MaxSize: s_description = "set_iso3_Combi1_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_MaxSize: s_description = "set_iso3_Combi2_MaxSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_BitSize: s_description = "set_iso1_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_BitSize: s_description = "set_iso1_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_BitSize: s_description = "set_iso1_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_BitSize: s_description = "set_iso2_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_BitSize: s_description = "set_iso2_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_BitSize: s_description = "set_iso2_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_BitSize: s_description = "set_iso3_Combi0_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_BitSize: s_description = "set_iso3_Combi1_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_BitSize: s_description = "set_iso3_Combi2_BitSize"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_DataMask: s_description = "set_iso1_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_DataMask: s_description = "set_iso1_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_DataMask:
                    s_description = "set_iso1_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_DataMask:
                    s_description = "set_iso2_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_DataMask:
                    s_description = "set_iso2_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_DataMask:
                    s_description = "set_iso2_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_DataMask:
                    s_description = "set_iso3_Combi0_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_DataMask:
                    s_description = "set_iso3_Combi1_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_DataMask:
                    s_description = "set_iso3_Combi2_DataMask"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_UseParity:
                    s_description = "set_iso1_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_UseParity:
                    s_description = "set_iso1_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_UseParity:
                    s_description = "set_iso1_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_UseParity:
                    s_description = "set_iso2_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_UseParity:
                    s_description = "set_iso2_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_UseParity:
                    s_description = "set_iso2_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_UseParity:
                    s_description = "set_iso3_Combi0_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_UseParity:
                    s_description = "set_iso3_Combi1_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_UseParity:
                    s_description = "set_iso3_Combi2_UseParity"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_ParityType:
                    s_description = "set_iso1_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_ParityType:
                    s_description = "set_iso1_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_ParityType:
                    s_description = "set_iso1_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_ParityType:
                    s_description = "set_iso2_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_ParityType:
                    s_description = "set_iso2_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_ParityType:
                    s_description = "set_iso2_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_ParityType:
                    s_description = "set_iso3_Combi0_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_ParityType:
                    s_description = "set_iso3_Combi1_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_ParityType:
                    s_description = "set_iso3_Combi2_ParityType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_STX_L:
                    s_description = "set_iso1_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_STX_L:
                    s_description = "set_iso1_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_STX_L:
                    s_description = "set_iso1_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_STX_L:
                    s_description = "set_iso2_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_STX_L:
                    s_description = "set_iso2_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_STX_L:
                    s_description = "set_iso2_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_STX_L:
                    s_description = "set_iso3_Combi0_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_STX_L:
                    s_description = "set_iso3_Combi1_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_STX_L:
                    s_description = "set_iso3_Combi2_STX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_ETX_L:
                    s_description = "set_iso1_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_ETX_L:
                    s_description = "set_iso1_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_ETX_L:
                    s_description = "set_iso1_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_ETX_L:
                    s_description = "set_iso2_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_ETX_L:
                    s_description = "set_iso2_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_ETX_L:
                    s_description = "set_iso2_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_ETX_L:
                    s_description = "set_iso3_Combi0_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_ETX_L:
                    s_description = "set_iso3_Combi1_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_ETX_L:
                    s_description = "set_iso3_Combi2_ETX_L"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_UseErrorCorrect:
                    s_description = "set_iso1_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_UseErrorCorrect:
                    s_description = "set_iso1_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_UseErrorCorrect:
                    s_description = "set_iso1_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_UseErrorCorrect:
                    s_description = "set_iso2_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_UseErrorCorrect:
                    s_description = "set_iso2_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_UseErrorCorrect:
                    s_description = "set_iso2_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_UseErrorCorrect:
                    s_description = "set_iso3_Combi0_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_UseErrorCorrect:
                    s_description = "set_iso3_Combi1_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_UseErrorCorrect:
                    s_description = "set_iso3_Combi2_UseErrorCorrect"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_ECMType:
                    s_description = "set_iso1_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_ECMType:
                    s_description = "set_iso1_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_ECMType:
                    s_description = "set_iso1_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_ECMType:
                    s_description = "set_iso2_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_ECMType:
                    s_description = "set_iso2_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_ECMType:
                    s_description = "set_iso2_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_ECMType:
                    s_description = "set_iso3_Combi0_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_ECMType:
                    s_description = "set_iso3_Combi1_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_ECMType:
                    s_description = "set_iso3_Combi2_ECMType"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi0_AddValue:
                    s_description = "set_iso1_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi1_AddValue:
                    s_description = "set_iso1_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso1_Combi2_AddValue:
                    s_description = "set_iso1_Combi2_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi0_AddValue:
                    s_description = "set_iso2_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi1_AddValue:
                    s_description = "set_iso2_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso2_Combi2_AddValue:
                    s_description = "set_iso2_Combi2_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi0_AddValue:
                    s_description = "set_iso3_Combi0_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi1_AddValue:
                    s_description = "set_iso3_Combi1_AddValue"; break;
                case _type_generated_tx_type.gt_set_iso3_Combi2_AddValue:
                    s_description = "set_iso3_Combi2_AddValue"; break;
                //
                case _type_generated_tx_type.gt_set_private_prefix10:
                    s_description = "set private prefix10"; break;
                case _type_generated_tx_type.gt_set_private_prefix11:
                    s_description = "set private prefix11"; break;
                case _type_generated_tx_type.gt_set_private_prefix12:
                    s_description = "set private prefix12"; break;

                case _type_generated_tx_type.gt_set_private_prefix20:
                    s_description = "set private prefix20"; break;
                case _type_generated_tx_type.gt_set_private_prefix21:
                    s_description = "set private prefix21"; break;
                case _type_generated_tx_type.gt_set_private_prefix22:
                    s_description = "set private prefix22"; break;

                case _type_generated_tx_type.gt_set_private_prefix30:
                    s_description = "set private prefix30"; break;
                case _type_generated_tx_type.gt_set_private_prefix31:
                    s_description = "set private prefix31"; break;
                case _type_generated_tx_type.gt_set_private_prefix32:
                    s_description = "set private prefix32"; break;

                case _type_generated_tx_type.gt_set_private_postfix10:
                    s_description = "set private posfix10"; break;
                case _type_generated_tx_type.gt_set_private_postfix11:
                    s_description = "set private posfix11"; break;
                case _type_generated_tx_type.gt_set_private_postfix12:
                    s_description = "set private posfix12"; break;

                case _type_generated_tx_type.gt_set_private_postfix20:
                    s_description = "set private posfix20"; break;
                case _type_generated_tx_type.gt_set_private_postfix21:
                    s_description = "set private posfix21"; break;
                case _type_generated_tx_type.gt_set_private_postfix22:
                    s_description = "set private posfix22"; break;

                case _type_generated_tx_type.gt_set_private_postfix30:
                    s_description = "set private posfix30"; break;
                case _type_generated_tx_type.gt_set_private_postfix31:
                    s_description = "set private posfix31"; break;
                case _type_generated_tx_type.gt_set_private_postfix32:
                    s_description = "set private posfix32"; break;
                //
                case _type_generated_tx_type.gt_set_prefix_ibutton:
                    s_description = "set i-button prefix"; break;
                case _type_generated_tx_type.gt_set_postfix_ibutton:
                    s_description = "set i-button postfix"; break;

                case _type_generated_tx_type.gt_set_ibutton_remove:
                    s_description = "set i-button remove"; break;

                case _type_generated_tx_type.gt_set_prefix_ibutton_remove:
                    s_description = "set i-button prefix remove"; break;
                case _type_generated_tx_type.gt_set_postfix_ibutton_remove:
                    s_description = "set i-button postfix remove "; break;

                case _type_generated_tx_type.gt_set_prefix_uart:
                    s_description = "set uart prefix"; break;
                case _type_generated_tx_type.gt_set_postfix_uart:
                    s_description = "set uart postfix"; break;
                default:
                    continue;
            }//end switch
        } while (false);
        return s_description;
    }

    /**
     * @public
     * @return {number} the number of generated requests.
     * <br /> 0 - error
     */
    public generate_set_parameters = (): number => {
        let b_result: boolean = false;

        do {
            if (!this._generate_enter_config_mode(this._dequeu_s_tx)) { continue; }
            this._deque_generated_tx.push(_type_generated_tx_type.gt_enter_config);

            //. set cBlank
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Blank_4bytes) >= 0) {
                if (!this._generate_set_blank_4byets(this._dequeu_s_tx, this._c_blank)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_blank_4byets);
            }

            //
            if (this._first_version_greater_then_second_version(false, this._version, [3, 0, 0, 0])) {

                // . set iButton Pretag
                if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Prefix_iButton) >= 0) {
                    if (!this._generate_set_ibutton_prefix(this._dequeu_s_tx, this._s_prefix_ibutton ?? "")) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_set_prefix_ibutton);
                }

                // . set iButton Posttag
                if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Postfix_iButton) >= 0) {
                    if (!this._generate_set_ibutton_postfix(this._dequeu_s_tx, this._s_postfix_ibutton ?? "")) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_set_postfix_ibutton);
                }

                // . set Uart Pretag
                if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Prefix_Uart) >= 0) {
                    if (!this._generate_set_uart_prefix(this._dequeu_s_tx, this._s_prefix_uart ?? "")) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_set_prefix_uart);
                }

                // . set Uart Posttag
                if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Postfix_Uart) >= 0) {
                    if (!this._generate_set_uart_postfix(this._dequeu_s_tx, this._s_postfix_uart ?? "")) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_set_postfix_uart);
                }

                if (this._first_version_greater_then_second_version(true, this._version, [3, 0, 0, 0])) {
                    // . set iButton remove
                    if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_iButton_Remove) >= 0) {
                        if (!this._generate_set_ibutton_remove(this._dequeu_s_tx, this._s_ibutton_remove ?? "")) { continue; }
                        this._deque_generated_tx.push(_type_generated_tx_type.gt_set_ibutton_remove);
                    }

                    // . set iButton Pretag remove
                    if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Prefix_iButton_Remove) >= 0) {
                        if (!this._generate_set_ibutton_prefix_remove(this._dequeu_s_tx, this._s_prefix_ibutton_remove ?? "")) { continue; }
                        this._deque_generated_tx.push(_type_generated_tx_type.gt_set_prefix_ibutton_remove);
                    }

                    // . set iButton Posttag remove
                    if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Postfix_iButton_Remove) >= 0) {
                        if (!this._generate_set_ibutton_postfix_remove(this._dequeu_s_tx, this._s_postfix_ibutton_remove ?? "")) { continue; }
                        this._deque_generated_tx.push(_type_generated_tx_type.gt_set_postfix_ibutton_remove);
                    }
                }
            }

            //. set globalPrePostfixSendCondition
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_GlobalPrePostfixSendCondition) >= 0) {
                if (!this._generate_set_global_pre_postfix_send_condition(this._dequeu_s_tx, this._b_global_pre_postfix_send_condition)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_global_prepostfix_send_condition);
            }

            // .set order of info object
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_TrackOrder) >= 0) {
                if (!this._generate_set_track_order(this._dequeu_s_tx, this._n_order)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_track_order);
            }

            // . set interface
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Interface) >= 0) {
                if (!this._generate_set_interface(this._dequeu_s_tx, this._n_interface)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_interface);
            }

            // . set language
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Language) >= 0) {
                if (!this._generate_set_language(this._dequeu_s_tx, this._n_language_index)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_language);

                //set key map
                if (this._b_removed_key_map_table) {
                    if (!this._generate_set_key_map(this._dequeu_s_tx, this._n_language_index)) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.get_set_keymap);
                }

            }

            // . set buzzer
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_BuzzerFrequency) >= 0) {
                if (!this._generate_set_buzzer_count(this._dequeu_s_tx, this._dw_buzzer_count)) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_buzzer_count);
            }

            // .enable 1
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_EnableISO1) >= 0) {
                if (!this._generate_set_enable_track(this._dequeu_s_tx, _type_msr_track_Numer.iso1_track, this._b_enable_iso[_type_msr_track_Numer.iso1_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_enable_iso1);
            }

            // .enable 2
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_EnableISO2) >= 0) {
                if (!this._generate_set_enable_track(this._dequeu_s_tx, _type_msr_track_Numer.iso2_track, this._b_enable_iso[_type_msr_track_Numer.iso2_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_enable_iso2);
            }

            // .enable 3
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_EnableISO3) >= 0) {
                if (!this._generate_set_enable_track(this._dequeu_s_tx, _type_msr_track_Numer.iso3_track, this._b_enable_iso[_type_msr_track_Numer.iso3_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_enable_iso3);
            }

            // direction 1
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Direction1) >= 0) {
                if (!this._generate_set_direction(this._dequeu_s_tx, _type_msr_track_Numer.iso1_track, this._n_direction[_type_msr_track_Numer.iso1_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_direction1);
            }
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Direction2) >= 0) {
                if (!this._generate_set_direction(this._dequeu_s_tx, _type_msr_track_Numer.iso2_track, this._n_direction[_type_msr_track_Numer.iso2_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_direction2);
            }
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Direction3) >= 0) {
                if (!this._generate_set_direction(this._dequeu_s_tx, _type_msr_track_Numer.iso3_track, this._n_direction[_type_msr_track_Numer.iso3_track])) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_direction3);
            }


            // . global prefix.............................................
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_GlobalPrefix) >= 0) {
                if (!this._generate_set_global_prefix(this._dequeu_s_tx, this._s_global_prefix ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_global_prefix);
            }

            // . global postfix
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_GlobalPostfix) >= 0) {
                if (!this._generate_set_global_postfix(this._dequeu_s_tx, this._s_global_postfix ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_global_postfix);
            }

            // . private prefix 1
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePrefix10) >= 0) {
                if (!this._generate_set_private_prefix(this._dequeu_s_tx, _type_msr_track_Numer.iso1_track, 0, this._s_private_prefix[_type_msr_track_Numer.iso1_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_prefix10);
            }

            // . private postfix 1
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePostfix10) >= 0) {
                if (!this._generate_set_private_postfix(this._dequeu_s_tx, _type_msr_track_Numer.iso1_track, 0, this._s_private_postfix[_type_msr_track_Numer.iso1_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_postfix10);
            }

            // . private prefix 2
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePrefix20) >= 0) {
                if (!this._generate_set_private_prefix(this._dequeu_s_tx, _type_msr_track_Numer.iso2_track, 0, this._s_private_prefix[_type_msr_track_Numer.iso2_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_prefix20);
            }

            // . private postfix 2
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePostfix20) >= 0) {
                if (!this._generate_set_private_postfix(this._dequeu_s_tx, _type_msr_track_Numer.iso2_track, 0, this._s_private_postfix[_type_msr_track_Numer.iso2_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_postfix20);
            }

            // . private prefix 3
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePrefix30) >= 0) {
                if (!this._generate_set_private_prefix(this._dequeu_s_tx, _type_msr_track_Numer.iso3_track, 0, this._s_private_prefix[_type_msr_track_Numer.iso3_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_prefix30);
            }
            // . private postfix 3
            if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_PrivatePostfix30) >= 0) {
                if (!this._generate_set_private_postfix(this._dequeu_s_tx, _type_msr_track_Numer.iso3_track, 0, this._s_private_postfix[_type_msr_track_Numer.iso3_track][0] ?? "")) { continue; }
                this._deque_generated_tx.push(_type_generated_tx_type.gt_set_private_postfix30);
            }

            let b_run_combination: boolean = false;
            if (this._first_version_greater_then_second_version(false, this._version, [5, 12, 0, 0])) {
                b_run_combination = true;//support from ganymede v5.13
            }
            if (this._first_version_greater_then_second_version(false, [4, 0, 0, 0], this._version)) {
                //callisto
                if (this._first_version_greater_then_second_version(false, this._version, [3, 20, 0, 0])) {
                    b_run_combination = true;//support from callisto v3.21
                }
            }

            if (b_run_combination) {
                //.cp_Blank_4bytes
                if (util.find_from_set(this._set_change_parameter, _type_change_parameter.cp_Blank_4bytes) >= 0) {
                    if (!this._generate_set_blank_4byets(this._dequeu_s_tx, this._c_blank)) { continue; }
                    this._deque_generated_tx.push(_type_generated_tx_type.gt_set_blank_4byets);
                }

                let ii: number = 0, jj: number = 0;
                for (ii = 0; ii < this._const_the_number_of_track; ii++) {
                    //.cp_ISO1_NumberCombi~cp_ISO3_NumberCombi
                    if (util.find_from_set(this._set_change_parameter,
                        _type_change_parameter.cp_ISO1_NumberCombi + ii) >= 0) {

                        if (!this._generate_set_number_combi(this._dequeu_s_tx, ii,
                            this._n_number_combination[ii])) { break; }
                        this._deque_generated_tx.push(
                            _type_generated_tx_type.gt_set_iso1_number_combi + ii
                        );
                    }

                    for (jj = 0; jj < lpu237._const_the_number_of_combination; jj++) {
                        //.cp_ISO1_Combi0_MaxSize~cp_ISO3_Combi2_MaxSize
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_MaxSize
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_max_size(this._dequeu_s_tx, ii, jj,
                                this._n_max_size[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_MaxSize
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //.cp_ISO1_Combi0_BitSize ~cp_ISO3_Combi2_BitSize 
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_BitSize
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_bit_size(this._dequeu_s_tx, ii, jj,
                                this._n_bit_size[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_BitSize
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //.cp_ISO1_Combi0_DataMask ~cp_ISO3_Combi2_DataMask 
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_DataMask
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_data_mask(this._dequeu_s_tx, ii, jj,
                                this._c_data_mask[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_DataMask
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_UseParity ~cp_ISO3_Combi2_UseParity
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_UseParity
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_use_parity(this._dequeu_s_tx, ii, jj,
                                this._b_use_parity[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_UseParity
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_ParityType ~cp_ISO3_Combi2_ParityType
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_ParityType
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_parity_type(this._dequeu_s_tx, ii, jj,
                                this._n_parity_type[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_ParityType
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_STX_L ~cp_ISO3_Combi2_STX_L
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_STX_L
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_stxl(this._dequeu_s_tx, ii, jj,
                                this._c_stxl[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_STX_L
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_ETX_L ~cp_ISO3_Combi2_ETX_L
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_ETX_L
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_etxl(this._dequeu_s_tx, ii, jj,
                                this._c_etxl[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_ETX_L
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_UseErrorCorrect ~cp_ISO3_Combi2_UseErrorCorrect

                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_UseErrorCorrect
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_use_error_correct(this._dequeu_s_tx, ii, jj,
                                this._b_use_ecm[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_UseErrorCorrect
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }

                        //cp_ISO1_Combi0_ECMType ~cp_ISO3_Combi2_ECMType
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_ECMType
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_ecm_type(this._dequeu_s_tx, ii, jj,
                                this._n_ecm_type[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_ECMType
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }
                        //cp_ISO1_Combi0_AddValue ~cp_ISO3_Combi2_AddValue
                        if (util.find_from_set(this._set_change_parameter,
                            _type_change_parameter.cp_ISO1_Combi0_AddValue
                            + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                            if (!this._generate_set_add_value(this._dequeu_s_tx, ii, jj,
                                this._n_add_value[ii][jj])) { break; }
                            this._deque_generated_tx.push(
                                _type_generated_tx_type.gt_set_iso1_Combi0_AddValue
                                + ii * lpu237._const_the_number_of_combination + jj
                            );
                        }

                        if (jj > 0) {
                            //cp_PrivatePrefix11~cp_PrivatePrefix22
                            if (util.find_from_set(this._set_change_parameter,
                                _type_change_parameter.cp_PrivatePrefix10
                                + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                                if (!this._generate_set_private_prefix(this._dequeu_s_tx, ii, jj,
                                    this._s_private_prefix[ii][jj] ?? "")) { break; }
                                this._deque_generated_tx.push(
                                    _type_generated_tx_type.gt_set_private_prefix10
                                    + ii * lpu237._const_the_number_of_combination + jj
                                );
                            }
                            //cp_PrivatePostfix11~cp_PrivatePostfix22
                            if (util.find_from_set(this._set_change_parameter,
                                _type_change_parameter.cp_PrivatePostfix10
                                + ii * lpu237._const_the_number_of_combination + jj) >= 0) {

                                if (!this._generate_set_private_postfix(this._dequeu_s_tx, ii, jj,
                                    this._s_private_postfix[ii][jj] ?? "")) { break; }
                                this._deque_generated_tx.push(
                                    _type_generated_tx_type.gt_set_private_postfix10
                                    + ii * lpu237._const_the_number_of_combination + jj
                                );
                            }
                        }
                    }//end for jj
                    if (jj < lpu237._const_the_number_of_combination) {
                        break;//error condition
                    }
                }//end for ii

                if (ii < this._const_the_number_of_track || jj < lpu237._const_the_number_of_combination) {
                    continue;//error
                }
            }
            //
            if (!this._generate_apply_config_mode(this._dequeu_s_tx)) { continue; }
            this._deque_generated_tx.push(_type_generated_tx_type.gt_apply);

            if (!this._generate_leave_config_mode(this._dequeu_s_tx)) { continue; }
            this._deque_generated_tx.push(_type_generated_tx_type.gt_leave_config);
            //
            b_result = true;
            util.clear_set(this._set_change_parameter);
        } while (false);

        if (!b_result) {
            this._dequeu_s_tx.length = 0;
            this._deque_generated_tx.length = 0;
        }

        return this._deque_generated_tx.length;
    }


    /**
     * @public
     * @return {boolean} processing result
     * @description analysis and save from response.
     */
    public set_from_rx = (): boolean => {
        let b_result: boolean = false;
        do {
            if (this._deque_generated_tx.length <= 0) {
                continue;
            }
            if (this._dequeu_s_rx.length <= 0) {
                continue;
            }
            const s_response: string = this._dequeu_s_rx.shift()!;

            let b_value: boolean | null = null;
            let s_value: string | null = null;
            let n_value: number = 0;
            let version: number[] | null = [];
            let blank: number[] | null = [];
            let order: number[] | null = [];
            const n_generated_tx: number = this._deque_generated_tx.shift()!;

            switch (n_generated_tx) {
                case _type_generated_tx_type.gt_get_version:
                    version = this._get_version_from_response(s_response);
                    if (version === null) {
                        break;
                    }
                    if (this._first_version_greater_then_second_version(false, version, [1, 1, 0, 0])) {
                        if (this._first_version_greater_then_second_version(false, version, [2, 2, 0, 0])) {
                            this._b_is_hid_boot = true;
                            if (this._first_version_greater_then_second_version(false, version, [3, 3, 0, 2])) {
                                // From FW version 3.4.0.1, Keymapping table was removed from firmware.
                                // therefor less then equal version 3.3.0.2, Don't call SetKeyMapToDevice() method of CMsrDevice class. 
                                this._b_removed_key_map_table = true;
                            }
                        }
                    } else {
                        break;
                    }
                    //
                    this._version = version;
                    b_result = true;
                    break;
                case _type_generated_tx_type.gt_get_version_structure:
                    version = this._get_version_structure_from_response(s_response);
                    if (version === null) {
                        break;
                    }
                    //
                    this._version_structure = version;
                    b_result = true;
                    break;
                case _type_generated_tx_type.gt_type_device:
                    this._b_device_is_standard = this._get_type_from_response(s_response);
                    if (!this._b_device_is_standard) {
                        this._n_device_function = type_function.fun_msr;//compact model
                    } else {
                        this._n_device_function = type_function.fun_msr_ibutton;//standard model
                    }
                    b_result = true;
                    break;
                case _type_generated_tx_type.gt_type_ibutton:
                    this._b_device_is_ibutton_only = this._get_ibutton_type_from_response(s_response);
                    if (this._b_device_is_ibutton_only) {
                        this._n_device_function = type_function.fun_ibutton;//ibutton only model
                    }
                    b_result = true;
                    break;
                case _type_generated_tx_type.gt_read_uid:
                    s_value = this._get_uid_from_response(s_response);
                    if (s_value !== null) {
                        this._s_uid = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_enter_config:
                    b_result = this._is_success_response(s_response);
                    if (b_result) {
                        this._b_config_mode = true;
                    }
                    break;
                case _type_generated_tx_type.gt_leave_config:
                    b_result = this._is_success_response(s_response);
                    if (b_result) {
                        this._b_config_mode = false;
                    }
                    break;
                case _type_generated_tx_type.gt_enter_opos:
                    b_result = this._is_success_response(s_response);
                    if (b_result) {
                        this._b_opos_mode = true;
                    }
                    break;
                case _type_generated_tx_type.gt_leave_opos:
                    b_result = this._is_success_response(s_response);
                    if (b_result) {
                        this._b_opos_mode = false;
                    }
                    break;
                case _type_generated_tx_type.gt_change_authkey:
                case _type_generated_tx_type.gt_change_status:
                case _type_generated_tx_type.gt_change_sn:
                case _type_generated_tx_type.gt_apply:
                case _type_generated_tx_type.gt_goto_boot:
                    b_result = this._is_success_response(s_response);
                    break;
                case _type_generated_tx_type.gt_support_mmd1000:
                    this._b_device_is_mmd1000 = this._get_support_mmd1000_from_response(s_response);
                    b_result = true;
                    break;
                case _type_generated_tx_type.gt_get_name:
                    this._s_name = this._get_name_from_response(s_response);
                    if (this._s_name !== null) {
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_global_prepostfix_send_condition:
                    b_value = this._get_global_pre_postfix_send_condition_from_response(s_response);
                    if (b_value !== null) {
                        this._b_global_pre_postfix_send_condition = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_track_order:
                    order = this._get_track_order_from_response(s_response);
                    if (order !== null) {
                        this._n_order = order;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_blank_4byets:
                    blank = this._get_blank_4bytes_from_response(s_response);
                    if (blank !== null) {
                        this._c_blank = blank;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_interface:
                    n_value = this._get_interface_from_response(s_response);
                    if (n_value >= 0) {
                        this._n_interface = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_language:
                    n_value = this._get_language_from_response(s_response);
                    if (n_value >= 0) {
                        this._n_language_index = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_buzzer_count:
                    n_value = this._get_buzzer_count_from_response(s_response);
                    if (n_value >= 0) {
                        this._dw_buzzer_count = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_boot_run_time:
                    n_value = this._get_boot_run_time_from_response(s_response);
                    if (n_value >= 0) {
                        this._dw_boot_run_time = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_enable_iso1:
                    b_value = this._get_enable_track_from_response(s_response, _type_msr_track_Numer.iso1_track);
                    if (b_value !== null) {
                        this._b_enable_iso[_type_msr_track_Numer.iso1_track] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_enable_iso2:
                    b_value = this._get_enable_track_from_response(s_response, _type_msr_track_Numer.iso2_track);
                    if (b_value !== null) {
                        this._b_enable_iso[_type_msr_track_Numer.iso2_track] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_enable_iso3:
                    b_value = this._get_enable_track_from_response(s_response, _type_msr_track_Numer.iso3_track);
                    if (b_value !== null) {
                        this._b_enable_iso[_type_msr_track_Numer.iso3_track] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_direction1:
                    n_value = this._get_direction_from_response(s_response, _type_msr_track_Numer.iso1_track);
                    if (n_value >= 0) {
                        this._n_direction[_type_msr_track_Numer.iso1_track] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_direction2:
                    n_value = this._get_direction_from_response(s_response, _type_msr_track_Numer.iso2_track);
                    if (n_value >= 0) {
                        this._n_direction[_type_msr_track_Numer.iso2_track] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_direction3:
                    n_value = this._get_direction_from_response(s_response, _type_msr_track_Numer.iso3_track);
                    if (n_value >= 0) {
                        this._n_direction[_type_msr_track_Numer.iso3_track] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_global_prefix:
                    s_value = this._get_global_prefix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_global_prefix = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_global_postfix:
                    s_value = this._get_global_postfix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_global_postfix = s_value;
                        b_result = true;
                    }
                    break;
                //
                case _type_generated_tx_type.gt_get_iso1_number_combi:
                case _type_generated_tx_type.gt_get_iso2_number_combi:
                case _type_generated_tx_type.gt_get_iso3_number_combi:
                    n_value = this._get_number_combi_from_response(s_response, n_generated_tx - _type_generated_tx_type.gt_get_iso1_number_combi);
                    if (n_value >= 0) {
                        this._n_number_combination[n_generated_tx - _type_generated_tx_type.gt_get_iso1_number_combi] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_MaxSize:
                case _type_generated_tx_type.gt_get_iso1_Combi1_MaxSize:
                case _type_generated_tx_type.gt_get_iso1_Combi2_MaxSize:
                    n_value = this._get_max_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso1_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_MaxSize);
                    if (n_value >= 0) {
                        this._n_max_size[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_MaxSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_MaxSize:
                case _type_generated_tx_type.gt_get_iso2_Combi1_MaxSize:
                case _type_generated_tx_type.gt_get_iso2_Combi2_MaxSize:
                    n_value = this._get_max_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso2_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_MaxSize);
                    if (n_value >= 0) {
                        this._n_max_size[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_MaxSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_MaxSize:
                case _type_generated_tx_type.gt_get_iso3_Combi1_MaxSize:
                case _type_generated_tx_type.gt_get_iso3_Combi2_MaxSize:
                    n_value = this._get_max_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso3_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_MaxSize);
                    if (n_value >= 0) {
                        this._n_max_size[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_MaxSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_BitSize:
                case _type_generated_tx_type.gt_get_iso1_Combi1_BitSize:
                case _type_generated_tx_type.gt_get_iso1_Combi2_BitSize:
                    n_value = this._get_bit_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso1_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_BitSize);
                    if (n_value >= 0) {
                        this._n_bit_size[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_BitSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_BitSize:
                case _type_generated_tx_type.gt_get_iso2_Combi1_BitSize:
                case _type_generated_tx_type.gt_get_iso2_Combi2_BitSize:
                    n_value = this._get_bit_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso2_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_BitSize);
                    if (n_value >= 0) {
                        this._n_bit_size[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_BitSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_BitSize:
                case _type_generated_tx_type.gt_get_iso3_Combi1_BitSize:
                case _type_generated_tx_type.gt_get_iso3_Combi2_BitSize:
                    n_value = this._get_bit_size_from_response(
                        s_response
                        , _type_msr_track_Numer.iso3_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_BitSize);
                    if (n_value >= 0) {
                        this._n_bit_size[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_BitSize] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_DataMask:
                case _type_generated_tx_type.gt_get_iso1_Combi1_DataMask:
                case _type_generated_tx_type.gt_get_iso1_Combi2_DataMask:
                    n_value = this._get_data_mask_from_response(
                        s_response
                        , _type_msr_track_Numer.iso1_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_DataMask);
                    if (n_value >= 0) {
                        this._c_data_mask[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_DataMask] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_DataMask:
                case _type_generated_tx_type.gt_get_iso2_Combi1_DataMask:
                case _type_generated_tx_type.gt_get_iso2_Combi2_DataMask:
                    n_value = this._get_data_mask_from_response(
                        s_response
                        , _type_msr_track_Numer.iso2_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_DataMask);
                    if (n_value >= 0) {
                        this._c_data_mask[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_DataMask] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_DataMask:
                case _type_generated_tx_type.gt_get_iso3_Combi1_DataMask:
                case _type_generated_tx_type.gt_get_iso3_Combi2_DataMask:
                    n_value = this._get_data_mask_from_response(
                        s_response
                        , _type_msr_track_Numer.iso3_track
                        , n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_DataMask);
                    if (n_value >= 0) {
                        this._c_data_mask[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_DataMask] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_UseParity:// this._b_use_parity
                case _type_generated_tx_type.gt_get_iso1_Combi1_UseParity:
                case _type_generated_tx_type.gt_get_iso1_Combi2_UseParity:
                    b_value = this._get_use_parity_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_UseParity);
                    if (b_value !== null) {
                        this._b_use_parity[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_UseParity] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_UseParity:
                case _type_generated_tx_type.gt_get_iso2_Combi1_UseParity:
                case _type_generated_tx_type.gt_get_iso2_Combi2_UseParity:
                    b_value = this._get_use_parity_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_UseParity);
                    if (b_value !== null) {
                        this._b_use_parity[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_UseParity] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_UseParity:
                case _type_generated_tx_type.gt_get_iso3_Combi1_UseParity:
                case _type_generated_tx_type.gt_get_iso3_Combi2_UseParity:
                    b_value = this._get_use_parity_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_UseParity);
                    if (b_value !== null) {
                        this._b_use_parity[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_UseParity] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ParityType://this._n_parity_type
                case _type_generated_tx_type.gt_get_iso1_Combi1_ParityType:
                case _type_generated_tx_type.gt_get_iso1_Combi2_ParityType:
                    n_value = this._get_parity_type_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ParityType);
                    if (n_value >= 0) {
                        this._n_parity_type[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ParityType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ParityType:
                case _type_generated_tx_type.gt_get_iso2_Combi1_ParityType:
                case _type_generated_tx_type.gt_get_iso2_Combi2_ParityType:
                    n_value = this._get_parity_type_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ParityType);
                    if (n_value >= 0) {
                        this._n_parity_type[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ParityType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ParityType:
                case _type_generated_tx_type.gt_get_iso3_Combi1_ParityType:
                case _type_generated_tx_type.gt_get_iso3_Combi2_ParityType:
                    n_value = this._get_parity_type_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ParityType);
                    if (n_value >= 0) {
                        this._n_parity_type[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ParityType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_STX_L://this._c_stxl
                case _type_generated_tx_type.gt_get_iso1_Combi1_STX_L:
                case _type_generated_tx_type.gt_get_iso1_Combi2_STX_L:
                    n_value = this._get_stxl_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_STX_L);
                    if (n_value >= 0) {
                        this._c_stxl[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_STX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_STX_L:
                case _type_generated_tx_type.gt_get_iso2_Combi1_STX_L:
                case _type_generated_tx_type.gt_get_iso2_Combi2_STX_L:
                    n_value = this._get_stxl_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_STX_L);
                    if (n_value >= 0) {
                        this._c_stxl[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_STX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_STX_L:
                case _type_generated_tx_type.gt_get_iso3_Combi1_STX_L:
                case _type_generated_tx_type.gt_get_iso3_Combi2_STX_L:
                    n_value = this._get_stxl_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_STX_L);
                    if (n_value >= 0) {
                        this._c_stxl[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_STX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ETX_L://this._c_etxl
                case _type_generated_tx_type.gt_get_iso1_Combi1_ETX_L:
                case _type_generated_tx_type.gt_get_iso1_Combi2_ETX_L:
                    n_value = this._get_etxl_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ETX_L);
                    if (n_value >= 0) {
                        this._c_etxl[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ETX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ETX_L:
                case _type_generated_tx_type.gt_get_iso2_Combi1_ETX_L:
                case _type_generated_tx_type.gt_get_iso2_Combi2_ETX_L:
                    n_value = this._get_etxl_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ETX_L);
                    if (n_value >= 0) {
                        this._c_etxl[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ETX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ETX_L:
                case _type_generated_tx_type.gt_get_iso3_Combi1_ETX_L:
                case _type_generated_tx_type.gt_get_iso3_Combi2_ETX_L:
                    n_value = this._get_etxl_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ETX_L);
                    if (n_value >= 0) {
                        this._c_etxl[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ETX_L] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_UseErrorCorrect://this._b_use_ecm
                case _type_generated_tx_type.gt_get_iso1_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_get_iso1_Combi2_UseErrorCorrect:
                    b_value = this._get_use_error_correct_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_UseErrorCorrect);
                    if (b_value !== null) {
                        this._b_use_ecm[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_UseErrorCorrect] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_UseErrorCorrect:
                case _type_generated_tx_type.gt_get_iso2_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_get_iso2_Combi2_UseErrorCorrect:
                    b_value = this._get_use_error_correct_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_UseErrorCorrect);
                    if (b_value !== null) {
                        this._b_use_ecm[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_UseErrorCorrect] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_UseErrorCorrect:
                case _type_generated_tx_type.gt_get_iso3_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_get_iso3_Combi2_UseErrorCorrect:
                    b_value = this._get_use_error_correct_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_UseErrorCorrect);
                    if (b_value !== null) {
                        this._b_use_ecm[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_UseErrorCorrect] = b_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_ECMType://this._n_ecm_type
                case _type_generated_tx_type.gt_get_iso1_Combi1_ECMType:
                case _type_generated_tx_type.gt_get_iso1_Combi2_ECMType:
                    n_value = this._get_ecm_type_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ECMType);
                    if (n_value >= 0) {
                        this._n_ecm_type[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_ECMType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_ECMType:
                case _type_generated_tx_type.gt_get_iso2_Combi1_ECMType:
                case _type_generated_tx_type.gt_get_iso2_Combi2_ECMType:
                    n_value = this._get_ecm_type_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ECMType);
                    if (n_value >= 0) {
                        this._n_ecm_type[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_ECMType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_ECMType:
                case _type_generated_tx_type.gt_get_iso3_Combi1_ECMType:
                case _type_generated_tx_type.gt_get_iso3_Combi2_ECMType:
                    n_value = this._get_ecm_type_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ECMType);
                    if (n_value >= 0) {
                        this._n_ecm_type[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_ECMType] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso1_Combi0_AddValue://this._n_add_value
                case _type_generated_tx_type.gt_get_iso1_Combi1_AddValue:
                case _type_generated_tx_type.gt_get_iso1_Combi2_AddValue:
                    n_value = this._get_add_value_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_AddValue);
                    if (n_value >= 0) {
                        this._n_add_value[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_iso1_Combi0_AddValue] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso2_Combi0_AddValue:
                case _type_generated_tx_type.gt_get_iso2_Combi1_AddValue:
                case _type_generated_tx_type.gt_get_iso2_Combi2_AddValue:
                    n_value = this._get_add_value_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_AddValue);
                    if (n_value >= 0) {
                        this._n_add_value[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_iso2_Combi0_AddValue] = n_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_iso3_Combi0_AddValue:
                case _type_generated_tx_type.gt_get_iso3_Combi1_AddValue:
                case _type_generated_tx_type.gt_get_iso3_Combi2_AddValue:
                    n_value = this._get_add_value_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_AddValue);
                    if (n_value >= 0) {
                        this._n_add_value[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_iso3_Combi0_AddValue] = n_value;
                        b_result = true;
                    }
                    break;
                //
                case _type_generated_tx_type.gt_get_private_prefix10:
                case _type_generated_tx_type.gt_get_private_prefix11:
                case _type_generated_tx_type.gt_get_private_prefix12:
                    s_value = this._get_private_prefix_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_private_prefix10);
                    if (s_value !== null) {
                        this._s_private_prefix[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_private_prefix10] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_private_prefix20:
                case _type_generated_tx_type.gt_get_private_prefix21:
                case _type_generated_tx_type.gt_get_private_prefix22:
                    s_value = this._get_private_prefix_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_private_prefix20);
                    if (s_value !== null) {
                        this._s_private_prefix[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_private_prefix20] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_private_prefix30:
                case _type_generated_tx_type.gt_get_private_prefix31:
                case _type_generated_tx_type.gt_get_private_prefix32:
                    s_value = this._get_private_prefix_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_private_prefix30);
                    if (s_value !== null) {
                        this._s_private_prefix[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_private_prefix30] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_private_postfix10:
                case _type_generated_tx_type.gt_get_private_postfix11:
                case _type_generated_tx_type.gt_get_private_postfix12:
                    s_value = this._get_private_postfix_from_response(s_response, _type_msr_track_Numer.iso1_track, n_generated_tx - _type_generated_tx_type.gt_get_private_postfix10);
                    if (s_value !== null) {
                        this._s_private_postfix[_type_msr_track_Numer.iso1_track][n_generated_tx - _type_generated_tx_type.gt_get_private_postfix10] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_private_postfix20:
                case _type_generated_tx_type.gt_get_private_postfix21:
                case _type_generated_tx_type.gt_get_private_postfix22:
                    s_value = this._get_private_postfix_from_response(s_response, _type_msr_track_Numer.iso2_track, n_generated_tx - _type_generated_tx_type.gt_get_private_postfix20);
                    if (s_value !== null) {
                        this._s_private_postfix[_type_msr_track_Numer.iso2_track][n_generated_tx - _type_generated_tx_type.gt_get_private_postfix20] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_private_postfix30:
                case _type_generated_tx_type.gt_get_private_postfix31:
                case _type_generated_tx_type.gt_get_private_postfix32:
                    s_value = this._get_private_postfix_from_response(s_response, _type_msr_track_Numer.iso3_track, n_generated_tx - _type_generated_tx_type.gt_get_private_postfix30);
                    if (s_value !== null) {
                        this._s_private_postfix[_type_msr_track_Numer.iso3_track][n_generated_tx - _type_generated_tx_type.gt_get_private_postfix30] = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_prefix_ibutton:
                    s_value = this._get_ibutton_prefix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_prefix_ibutton = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_postfix_ibutton:
                    s_value = this._get_ibutton_postfix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_postfix_ibutton = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_ibutton_remove:
                    s_value = this._get_ibutton_remove_from_response(s_response);
                    if (s_value !== null) {
                        this._s_ibutton_remove = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_prefix_ibutton_remove:
                    s_value = this._get_ibutton_prefix_remove_from_response(s_response);
                    if (s_value !== null) {
                        this._s_prefix_ibutton_remove = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_postfix_ibutton_remove:
                    s_value = this._get_ibutton_postfix_remove_from_response(s_response);
                    if (s_value !== null) {
                        this._s_postfix_ibutton_remove = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_prefix_uart:
                    s_value = this._get_uart_prefix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_prefix_uart = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_get_postfix_uart:
                    s_value = this._get_uart_postfix_from_response(s_response);
                    if (s_value !== null) {
                        this._s_postfix_uart = s_value;
                        b_result = true;
                    }
                    break;
                case _type_generated_tx_type.gt_set_global_prepostfix_send_condition:
                case _type_generated_tx_type.gt_set_track_order:
                case _type_generated_tx_type.gt_set_blank_4byets:
                case _type_generated_tx_type.gt_set_interface:
                case _type_generated_tx_type.gt_set_language:
                case _type_generated_tx_type.get_set_keymap:
                case _type_generated_tx_type.gt_set_buzzer_count:
                case _type_generated_tx_type.gt_set_enable_iso1:
                case _type_generated_tx_type.gt_set_enable_iso2:
                case _type_generated_tx_type.gt_set_enable_iso3:
                case _type_generated_tx_type.gt_set_direction1:
                case _type_generated_tx_type.gt_set_direction2:
                case _type_generated_tx_type.gt_set_direction3:
                case _type_generated_tx_type.gt_set_global_prefix:
                case _type_generated_tx_type.gt_set_global_postfix:
                //
                case _type_generated_tx_type.gt_set_iso1_number_combi:
                case _type_generated_tx_type.gt_set_iso2_number_combi:
                case _type_generated_tx_type.gt_set_iso3_number_combi:
                case _type_generated_tx_type.gt_set_iso1_Combi0_MaxSize:
                case _type_generated_tx_type.gt_set_iso1_Combi1_MaxSize:
                case _type_generated_tx_type.gt_set_iso1_Combi2_MaxSize:
                case _type_generated_tx_type.gt_set_iso2_Combi0_MaxSize:
                case _type_generated_tx_type.gt_set_iso2_Combi1_MaxSize:
                case _type_generated_tx_type.gt_set_iso2_Combi2_MaxSize:
                case _type_generated_tx_type.gt_set_iso3_Combi0_MaxSize:
                case _type_generated_tx_type.gt_set_iso3_Combi1_MaxSize:
                case _type_generated_tx_type.gt_set_iso3_Combi2_MaxSize:
                case _type_generated_tx_type.gt_set_iso1_Combi0_BitSize:
                case _type_generated_tx_type.gt_set_iso1_Combi1_BitSize:
                case _type_generated_tx_type.gt_set_iso1_Combi2_BitSize:
                case _type_generated_tx_type.gt_set_iso2_Combi0_BitSize:
                case _type_generated_tx_type.gt_set_iso2_Combi1_BitSize:
                case _type_generated_tx_type.gt_set_iso2_Combi2_BitSize:
                case _type_generated_tx_type.gt_set_iso3_Combi0_BitSize:
                case _type_generated_tx_type.gt_set_iso3_Combi1_BitSize:
                case _type_generated_tx_type.gt_set_iso3_Combi2_BitSize:
                case _type_generated_tx_type.gt_set_iso1_Combi0_DataMask:
                case _type_generated_tx_type.gt_set_iso1_Combi1_DataMask:
                case _type_generated_tx_type.gt_set_iso1_Combi2_DataMask:
                case _type_generated_tx_type.gt_set_iso2_Combi0_DataMask:
                case _type_generated_tx_type.gt_set_iso2_Combi1_DataMask:
                case _type_generated_tx_type.gt_set_iso2_Combi2_DataMask:
                case _type_generated_tx_type.gt_set_iso3_Combi0_DataMask:
                case _type_generated_tx_type.gt_set_iso3_Combi1_DataMask:
                case _type_generated_tx_type.gt_set_iso3_Combi2_DataMask:
                case _type_generated_tx_type.gt_set_iso1_Combi0_UseParity:// this._b_use_parity
                case _type_generated_tx_type.gt_set_iso1_Combi1_UseParity:
                case _type_generated_tx_type.gt_set_iso1_Combi2_UseParity:
                case _type_generated_tx_type.gt_set_iso2_Combi0_UseParity:
                case _type_generated_tx_type.gt_set_iso2_Combi1_UseParity:
                case _type_generated_tx_type.gt_set_iso2_Combi2_UseParity:
                case _type_generated_tx_type.gt_set_iso3_Combi0_UseParity:
                case _type_generated_tx_type.gt_set_iso3_Combi1_UseParity:
                case _type_generated_tx_type.gt_set_iso3_Combi2_UseParity:
                case _type_generated_tx_type.gt_set_iso1_Combi0_ParityType://this._n_parity_type
                case _type_generated_tx_type.gt_set_iso1_Combi1_ParityType:
                case _type_generated_tx_type.gt_set_iso1_Combi2_ParityType:
                case _type_generated_tx_type.gt_set_iso2_Combi0_ParityType:
                case _type_generated_tx_type.gt_set_iso2_Combi1_ParityType:
                case _type_generated_tx_type.gt_set_iso2_Combi2_ParityType:
                case _type_generated_tx_type.gt_set_iso3_Combi0_ParityType:
                case _type_generated_tx_type.gt_set_iso3_Combi1_ParityType:
                case _type_generated_tx_type.gt_set_iso3_Combi2_ParityType:
                case _type_generated_tx_type.gt_set_iso1_Combi0_STX_L://this._c_stxl
                case _type_generated_tx_type.gt_set_iso1_Combi1_STX_L:
                case _type_generated_tx_type.gt_set_iso1_Combi2_STX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi0_STX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi1_STX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi2_STX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi0_STX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi1_STX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi2_STX_L:
                case _type_generated_tx_type.gt_set_iso1_Combi0_ETX_L://this._c_etxl
                case _type_generated_tx_type.gt_set_iso1_Combi1_ETX_L:
                case _type_generated_tx_type.gt_set_iso1_Combi2_ETX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi0_ETX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi1_ETX_L:
                case _type_generated_tx_type.gt_set_iso2_Combi2_ETX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi0_ETX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi1_ETX_L:
                case _type_generated_tx_type.gt_set_iso3_Combi2_ETX_L:
                case _type_generated_tx_type.gt_set_iso1_Combi0_UseErrorCorrect://this._b_use_ecm
                case _type_generated_tx_type.gt_set_iso1_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso1_Combi2_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso2_Combi0_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso2_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso2_Combi2_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso3_Combi0_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso3_Combi1_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso3_Combi2_UseErrorCorrect:
                case _type_generated_tx_type.gt_set_iso1_Combi0_ECMType://this._n_ecm_type
                case _type_generated_tx_type.gt_set_iso1_Combi1_ECMType:
                case _type_generated_tx_type.gt_set_iso1_Combi2_ECMType:
                case _type_generated_tx_type.gt_set_iso2_Combi0_ECMType:
                case _type_generated_tx_type.gt_set_iso2_Combi1_ECMType:
                case _type_generated_tx_type.gt_set_iso2_Combi2_ECMType:
                case _type_generated_tx_type.gt_set_iso3_Combi0_ECMType:
                case _type_generated_tx_type.gt_set_iso3_Combi1_ECMType:
                case _type_generated_tx_type.gt_set_iso3_Combi2_ECMType:
                case _type_generated_tx_type.gt_set_iso1_Combi0_AddValue://this._n_add_value
                case _type_generated_tx_type.gt_set_iso1_Combi1_AddValue:
                case _type_generated_tx_type.gt_set_iso1_Combi2_AddValue:
                case _type_generated_tx_type.gt_set_iso2_Combi0_AddValue:
                case _type_generated_tx_type.gt_set_iso2_Combi1_AddValue:
                case _type_generated_tx_type.gt_set_iso2_Combi2_AddValue:
                case _type_generated_tx_type.gt_set_iso3_Combi0_AddValue:
                case _type_generated_tx_type.gt_set_iso3_Combi1_AddValue:
                case _type_generated_tx_type.gt_set_iso3_Combi2_AddValue:
                //
                case _type_generated_tx_type.gt_set_private_prefix10:
                case _type_generated_tx_type.gt_set_private_prefix11:
                case _type_generated_tx_type.gt_set_private_prefix12:
                case _type_generated_tx_type.gt_set_private_prefix20:
                case _type_generated_tx_type.gt_set_private_prefix21:
                case _type_generated_tx_type.gt_set_private_prefix22:
                case _type_generated_tx_type.gt_set_private_prefix30:
                case _type_generated_tx_type.gt_set_private_prefix31:
                case _type_generated_tx_type.gt_set_private_prefix32:
                case _type_generated_tx_type.gt_set_private_postfix10:
                case _type_generated_tx_type.gt_set_private_postfix11:
                case _type_generated_tx_type.gt_set_private_postfix12:
                case _type_generated_tx_type.gt_set_private_postfix20:
                case _type_generated_tx_type.gt_set_private_postfix21:
                case _type_generated_tx_type.gt_set_private_postfix22:
                case _type_generated_tx_type.gt_set_private_postfix30:
                case _type_generated_tx_type.gt_set_private_postfix31:
                case _type_generated_tx_type.gt_set_private_postfix32:
                case _type_generated_tx_type.gt_set_prefix_ibutton:
                case _type_generated_tx_type.gt_set_postfix_ibutton:
                case _type_generated_tx_type.gt_set_ibutton_remove:
                case _type_generated_tx_type.gt_set_prefix_ibutton_remove:
                case _type_generated_tx_type.gt_set_postfix_ibutton_remove:
                case _type_generated_tx_type.gt_set_prefix_uart:
                case _type_generated_tx_type.gt_set_postfix_uart:
                    b_result = this._is_success_response(s_response);
                    break;
                default:
                    continue;
            }//end switch
        } while (false);
        return b_result;
    }


    /**
     * @public
     * @param {File} file_xml xml file format setting file.
     * @return {Promise<boolean>} processing result.
     * @description load from xml setting file. and set parameter with this setting.
     */
    public set_from_file = (file_xml: File): Promise<boolean> => {

        const this_device = this;

        return new Promise<boolean>((resolve, reject) => {

            do {
                if (typeof file_xml !== 'object') {
                    reject(this._get_error_object('en_e_parameter'));
                    continue;
                }
                //
                const reader = new FileReader();

                (reader as any)._device = this_device;

                reader.onload = function (evt: ProgressEvent<FileReader>) {
                    const s_data = evt.target!.result as string;
                    //
                    const parser = new DOMParser();
                    const xml_doc = parser.parseFromString(s_data, "text/xml");

                    let s_attr_name: string = "";
                    let s_attr: string = "";
                    let ele: Element | null = null;
                    //common element
                    let array_ele: HTMLCollectionOf<Element>;

                    let n_interface: number | null = null;
                    let n_buzzer: number | null = null;
                    let n_language: number | null = null;
                    const array_b_enable_track: (boolean | null)[] = [null, null, null];
                    let b_condition: boolean | null = null;
                    let n_order: number[] | null = null;
                    let b_indicate_all_success_is_success: boolean | null = null;
                    let b_ignore_iso1: boolean | null = null;
                    let b_ignore_iso3: boolean | null = null;
                    let b_remove_colon: boolean | null = null;
                    let n_ibutton: number | null = null;
                    let n_reset_interval: number | null = null;
                    let n_direction: number | null = null;
                    let s_gpre: string | null = null;
                    let s_gpost: string | null = null;

                    const n_combination: (number | null)[] = [null, null, null];
                    const n_max_size: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_bit_size: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_data_mask: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const b_use_parity: (boolean | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_parity_type: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_stxl: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_etxl: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const b_use_error_correct: (boolean | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_error_correct_type: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const n_add_value: (number | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];

                    const s_ppretag: (string | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    const s_pposttag: (string | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
                    let s_ipre: string | null = null;
                    let s_ipost: string | null = null;

                    let s_iremove: string | null = null;
                    let s_ipre_remove: string | null = null;
                    let s_ipost_remove: string | null = null;

                    let s_upre: string | null = null;
                    let s_upost: string | null = null;

                    let b_result: boolean = false;

                    do {
                        array_ele = xml_doc.getElementsByTagName("common");
                        if (array_ele.length > 0) {
                            ele = array_ele[0];
                            // interface attribute
                            s_attr_name = "interface";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_interface = this_device._get_interface_from_string(s_attr);
                                if (n_interface < 0) {
                                    continue;//error
                                }
                            }
                            // buzzer attribute
                            s_attr_name = "buzzer";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_buzzer = this_device._get_buzzer_count_from_string(s_attr);
                                if (n_buzzer === null) {
                                    continue;
                                }
                            }
                            // language attribute
                            s_attr_name = "language";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_language = this_device._get_language_from_string(s_attr);
                                if (n_language < 0) {
                                    continue;
                                }
                            }
                            // iso1 attribute
                            s_attr_name = "iso1";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                array_b_enable_track[0] = this_device._get_enable_track_from_string(s_attr);
                                if (array_b_enable_track[0] === null) {
                                    continue;
                                }
                            }
                            // iso2 attribute
                            s_attr_name = "iso2";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                array_b_enable_track[1] = this_device._get_enable_track_from_string(s_attr);
                                if (array_b_enable_track[1] === null) {
                                    continue;
                                }
                            }
                            // iso3 attribute
                            s_attr_name = "iso3";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                array_b_enable_track[2] = this_device._get_enable_track_from_string(s_attr);
                                if (array_b_enable_track[2] === null) {
                                    continue;
                                }
                            }
                            // condition attribute
                            s_attr_name = "condition";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                b_condition = this_device._get_global_pre_postfix_send_condition_from_string(s_attr);
                                if (b_condition === null) {
                                    continue;
                                }
                            }
                            // track_order attribute
                            s_attr_name = "track_order";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_order = this_device._get_track_order_from_string(s_attr);
                                if (n_order === null) {
                                    continue;
                                }
                            }

                            // indication attribute
                            s_attr_name = "indication";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                b_indicate_all_success_is_success = this_device._get_indicate_error_condition_from_string(s_attr);
                                if (b_indicate_all_success_is_success === null) {
                                    continue;
                                }
                            }

                            // ignore1 attribute
                            s_attr_name = "ignore1";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                b_ignore_iso1 = this_device._get_enable_track_from_string(s_attr);
                                if (b_ignore_iso1 === null) {
                                    continue;
                                }
                            }
                            // ignore3 attribute
                            s_attr_name = "ignore3";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                b_ignore_iso3 = this_device._get_enable_track_from_string(s_attr);
                                if (b_ignore_iso3 === null) {
                                    continue;
                                }
                            }
                            // rm_colon attribute
                            s_attr_name = "rm_colon";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                b_remove_colon = this_device._get_enable_track_from_string(s_attr);
                                if (b_remove_colon === null) {
                                    continue;
                                }
                            }

                            // ibutton attribute
                            s_attr_name = "ibutton";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_ibutton = this_device._get_ibutton_mode_from_string(s_attr);
                                if (n_ibutton < 0) {
                                    continue;
                                }
                            }

                            // ibutton attribute
                            s_attr_name = "mmd1100_reset_interval";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_reset_interval = this_device._get_mmd1100_reset_interval_from_string(s_attr);
                                if (n_reset_interval < 0) {
                                    continue;
                                }
                            }

                            // direction attribute
                            s_attr_name = "direction";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                n_direction = this_device._get_direction_from_string(s_attr);
                                if (n_direction < 0) {
                                    continue;
                                }
                            }
                        }//the end of common element.

                        //global element
                        array_ele = xml_doc.getElementsByTagName("global");
                        if (array_ele.length > 0) {
                            ele = array_ele[0];

                            // prefix attribute
                            s_attr_name = "prefix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_gpre = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_gpre === null) {
                                    continue;
                                }
                            }
                            // postfix attribute
                            s_attr_name = "postfix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_gpost = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_gpost === null) {
                                    continue;
                                }
                            }
                        }//the end of global element.

                        //iso1~iso3 element
                        let n_track: number = 0;
                        let s_track: string = "iso";
                        for (n_track = 0; n_track < this_device._const_the_number_of_track; n_track++) {
                            s_track = "iso" + String(n_track + 1);
                            array_ele = xml_doc.getElementsByTagName(s_track);
                            if (array_ele.length > 0) {
                                ele = array_ele[0];

                                // prefix attribute
                                s_attr_name = "prefix";
                                if (ele.hasAttribute(s_attr_name)) {
                                    s_attr = ele.getAttribute(s_attr_name)!;
                                    s_ppretag[0][0] = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                    if (s_ppretag[0][0] === null) {
                                        continue;
                                    }
                                }
                                // postfix attribute
                                s_attr_name = "postfix";
                                if (ele.hasAttribute(s_attr_name)) {
                                    s_attr = ele.getAttribute(s_attr_name)!;
                                    s_pposttag[0][0] = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                    if (s_pposttag[0][0] === null) {
                                        continue;
                                    }
                                }
                                ////////////////////////////////////////////////////
                                //
                                s_attr_name = "combination";
                                if (ele.hasAttribute(s_attr_name)) {
                                    s_attr = ele.getAttribute(s_attr_name)!;
                                    n_combination[n_track] = parseInt(s_attr, 10);
                                    if (isNaN(n_combination[n_track]!)) {
                                        n_combination[n_track] = null;
                                        continue;
                                    }
                                }

                                let i: number;
                                for (i = 0; i < lpu237._const_the_number_of_combination; i++) {
                                    s_attr_name = "max_size";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_max_size[n_track][i] = parseInt(s_attr, 10);
                                        if (isNaN(n_max_size[n_track][i]!)) {
                                            n_max_size[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "bit_size";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_bit_size[n_track][i] = parseInt(s_attr, 10);
                                        if (isNaN(n_bit_size[n_track][i]!)) {
                                            n_bit_size[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "data_mask";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_data_mask[n_track][i] = parseInt(s_attr, 16);
                                        if (isNaN(n_data_mask[n_track][i]!)) {
                                            n_data_mask[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "use_parity";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        b_use_parity[n_track][i] = this_device._get_enable_track_from_string(s_attr);
                                        if (b_use_parity[n_track][i] === null) {
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "parity_type";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_parity_type[n_track][i] = this_device._get_parity_type_from_string(s_attr);
                                        if (n_parity_type[n_track][i]! < 0) {
                                            n_parity_type[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "stxl";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_stxl[n_track][i] = parseInt(s_attr, 16);
                                        if (isNaN(n_stxl[n_track][i]!)) {
                                            n_stxl[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "etxl";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_etxl[n_track][i] = parseInt(s_attr, 16);
                                        if (isNaN(n_etxl[n_track][i]!)) {
                                            n_etxl[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "use_error_correct";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        b_use_error_correct[n_track][i] = this_device._get_enable_track_from_string(s_attr);
                                        if (b_use_error_correct[n_track][i] === null) {
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "error_correct_type";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_error_correct_type[n_track][i] = this_device._get_error_correct_type_from_string(s_attr);
                                        if (n_error_correct_type[n_track][i]! < 0) {
                                            n_error_correct_type[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    //
                                    s_attr_name = "add_value";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        n_add_value[n_track][i] = parseInt(s_attr, 10);
                                        if (isNaN(n_add_value[n_track][i]!)) {
                                            n_add_value[n_track][i] = null;
                                            break;//exit for
                                        }
                                    }
                                    // new prefix attribute
                                    s_attr_name = "prefix";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        s_ppretag[n_track][i] = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                        if (s_ppretag[n_track][i] === null) {
                                            break;//exit for
                                        }
                                    }
                                    // new postfix attribute
                                    s_attr_name = "postfix";
                                    s_attr_name += String(i);
                                    if (ele.hasAttribute(s_attr_name)) {
                                        s_attr = ele.getAttribute(s_attr_name)!;
                                        s_pposttag[n_track][i] = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                        if (s_pposttag[n_track][i] === null) {
                                            break;//exit for
                                        }
                                    }
                                }//end for

                                if (i < lpu237._const_the_number_of_combination) {
                                    continue;//error
                                }
                            }//the end of iso1~3 element.
                        }//end for n_track

                        //ibutton element
                        array_ele = xml_doc.getElementsByTagName("ibutton");
                        if (array_ele.length > 0) {
                            ele = array_ele[0];

                            // prefix attribute
                            s_attr_name = "prefix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_ipre = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_ipre === null) {
                                    continue;
                                }
                            }
                            // postfix attribute
                            s_attr_name = "postfix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_ipost = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_ipost === null) {
                                    continue;
                                }
                            }

                            // remove attribute
                            s_attr_name = "remove";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_iremove = this_device._get_hid_key_pair_hex_string_from_string(true, s_attr);
                                if (s_iremove === null) {
                                    continue;
                                }
                            }

                            // prefix_remove attribute
                            s_attr_name = "prefix_remove";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_ipre_remove = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_ipre_remove === null) {
                                    continue;
                                }
                            }
                            // postfix_remove attribute
                            s_attr_name = "postfix_remove";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_ipost_remove = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_ipost_remove === null) {
                                    continue;
                                }
                            }

                        }//the end of ibutton element.

                        //uart element or rs232
                        array_ele = xml_doc.getElementsByTagName("uart");
                        if (array_ele.length > 0) {
                            ele = array_ele[0];

                            // prefix attribute
                            s_attr_name = "prefix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_upre = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_upre === null) {
                                    continue;
                                }
                            }
                            // postfix attribute
                            s_attr_name = "postfix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_upost = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_upost === null) {
                                    continue;
                                }
                            }
                        }//the end of ibutton element.

                        array_ele = xml_doc.getElementsByTagName("rs232");
                        if (array_ele.length > 0) {
                            ele = array_ele[0];

                            // prefix attribute
                            s_attr_name = "prefix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_upre = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_upre === null) {
                                    continue;
                                }
                            }
                            // postfix attribute
                            s_attr_name = "postfix";
                            if (ele.hasAttribute(s_attr_name)) {
                                s_attr = ele.getAttribute(s_attr_name)!;
                                s_upost = this_device._get_hid_key_pair_hex_string_from_string(false, s_attr);
                                if (s_upost === null) {
                                    continue;
                                }
                            }
                        }//the end of ibutton element.

                        b_result = true;
                    } while (false);

                    if (b_result) {
                        if (n_interface !== null) {
                            if ((this as any)._device._n_interface !== n_interface) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Interface);
                                (this as any)._device._n_interface = n_interface;
                            }
                        }
                        if (n_buzzer !== null) {
                            if ((this as any)._device._dw_buzzer_count !== n_buzzer) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_BuzzerFrequency);
                                (this as any)._device._dw_buzzer_count = n_buzzer;
                            }
                        }
                        if (n_language !== null) {
                            if ((this as any)._device._n_language_index !== n_language) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Language);
                                (this as any)._device._n_language_index = n_language;
                            }
                        }
                        if (b_condition !== null) {
                            if ((this as any)._device._b_global_pre_postfix_send_condition !== b_condition) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_GlobalPrePostfixSendCondition);
                                (this as any)._device._b_global_pre_postfix_send_condition = b_condition;
                            }
                        }
                        if (n_order !== null) {
                            if (((this as any)._device._n_order[0] !== n_order[0]) || ((this as any)._device._n_order[1] !== n_order[1]) || ((this as any)._device._n_order[2] !== n_order[2])) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_TrackOrder);
                                (this as any)._device._n_order = n_order;
                            }
                        }

                        if (b_indicate_all_success_is_success !== null) {
                            let b_indicate_set: boolean = true;
                            if (!((this as any)._device._c_blank[1] & 0x01)) {
                                b_indicate_set = false;
                            }
                            if (b_indicate_all_success_is_success && b_indicate_set) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] & 0xfe;
                            } else if (!b_indicate_all_success_is_success && !b_indicate_set) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] | 0x01;
                            }
                        }
                        if (b_ignore_iso1 !== null) {
                            let b_ignore_iso1_cur: boolean = false;
                            if ((this as any)._device._c_blank[1] & 0x02) {
                                b_ignore_iso1_cur = true;
                            }
                            if (b_ignore_iso1 && !b_ignore_iso1_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] | 0x02;
                            } else if (!b_ignore_iso1 && b_ignore_iso1_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] & 0xfd;
                            }
                        }
                        if (b_ignore_iso3 !== null) {
                            var b_ignore_iso3_cur = false;
                            if ((this as any)._device._c_blank[1] & 0x04) {
                                b_ignore_iso3_cur = true;
                            }
                            if (b_ignore_iso3 && !b_ignore_iso3_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] | 0x04;
                            }
                            else if (!b_ignore_iso3 && b_ignore_iso3_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] & 0xfb;
                            }
                        }
                        if (b_remove_colon !== null) {
                            var b_remove_colon_cur = false;
                            if ((this as any)._device._c_blank[1] & 0x08) {
                                b_remove_colon_cur = true;
                            }
                            if (b_remove_colon && !b_remove_colon_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] | 0x08;
                            }
                            else if (!b_remove_colon && b_remove_colon_cur) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] & 0xf7;
                            }
                        }

                        if (n_ibutton !== null) {
                            if (((this as any)._device._c_blank[2] & 0x0F) !== n_ibutton) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[2] = (this as any)._device._c_blank[2] & 0xF0;
                                (this as any)._device._c_blank[2] = (this as any)._device._c_blank[2] | n_ibutton;
                            }
                        }
                        if (n_direction !== null) {
                            if ((this as any)._device._n_direction[_type_msr_track_Numer.iso1_track] !== n_direction) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Direction1);
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Direction2);
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Direction3);
                                (this as any)._device._n_direction[_type_msr_track_Numer.iso1_track] = n_direction;
                                (this as any)._device._n_direction[_type_msr_track_Numer.iso2_track] = n_direction;
                                (this as any)._device._n_direction[_type_msr_track_Numer.iso3_track] = n_direction;
                            }
                        }
                        if (n_reset_interval != null) {
                            if (((this as any)._device._c_blank[1] & 0xF0) !== n_reset_interval) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Blank_4bytes);
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] & 0x0F;
                                (this as any)._device._c_blank[1] = (this as any)._device._c_blank[1] | n_reset_interval;
                            }
                        }
                        if (s_gpre !== null) {
                            if (!this_device._is_equal_tag((this as any)._s_global_prefix, s_gpre)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_GlobalPrefix);
                                (this as any)._device._s_global_prefix = s_gpre;
                            }
                        }
                        if (s_gpost !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_global_postfix, s_gpost)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_GlobalPostfix);
                                (this as any)._device._s_global_postfix = s_gpost;
                            }
                        }
                        if (s_ipre !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_prefix_ibutton, s_ipre)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Prefix_iButton);
                                (this as any)._device._s_prefix_ibutton = s_ipre;
                            }
                        }
                        if (s_ipost !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_postfix_ibutton, s_ipost)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Postfix_iButton);
                                (this as any)._device._s_postfix_ibutton = s_ipost;
                            }
                        }

                        if (s_iremove !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_ibutton_remove, s_iremove)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_iButton_Remove);
                                (this as any)._device._s_ibutton_remove = s_iremove;
                            }
                        }
                        if (s_ipre_remove !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_prefix_ibutton_remove, s_ipre_remove)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Prefix_iButton_Remove);
                                (this as any)._device._s_prefix_ibutton_remove = s_ipre_remove;
                            }
                        }
                        if (s_ipost_remove !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_postfix_ibutton_remove, s_ipost_remove)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Postfix_iButton_Remove);
                                (this as any)._device._s_postfix_ibutton_remove = s_ipost_remove;
                            }
                        }

                        if (s_upre !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_prefix_uart, s_upre)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Prefix_Uart);
                                (this as any)._device._s_prefix_uart = s_upre;
                            }
                        }
                        if (s_upost !== null) {
                            if (!this_device._is_equal_tag((this as any)._device._s_prefix_uart, s_upost)) {
                                util.insert_to_set((this as any)._device._set_change_parameter, _type_change_parameter.cp_Postfix_Uart);
                                (this as any)._device._s_prefix_uart = s_upost;
                            }
                        }

                        for (let i = 0; i < this_device._const_the_number_of_track; i++) {
                            if (n_combination[i] !== null) {
                                if ((this as any)._device._n_number_combination[i] !== n_combination[i]) {
                                    util.insert_to_set((this as any)._device._set_change_parameter
                                        , _type_change_parameter.cp_ISO1_NumberCombi + i);
                                    (this as any)._device._n_number_combination[i] = n_combination[i];
                                }
                            }

                            if (array_b_enable_track[i] !== null) {
                                if ((this as any)._device._b_enable_iso[i] !== array_b_enable_track[i]) {
                                    util.insert_to_set((this as any)._device._set_change_parameter
                                        , _type_change_parameter.cp_EnableISO1 + i);
                                    (this as any)._device._b_enable_iso[i] = array_b_enable_track[i];
                                }
                            }
                            //
                            for (let j = 0; j < lpu237._const_the_number_of_combination; j++) {
                                if (n_max_size[i][j] !== null) {
                                    if ((this as any)._device._n_max_size[i][j] !== n_max_size[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_MaxSize + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._n_max_size[i][j] = n_max_size[i][j];
                                    }
                                }
                                if (n_bit_size[i][j] !== null) {
                                    if ((this as any)._device._n_bit_size[i][j] !== n_bit_size[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_BitSize + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._n_bit_size[i][j] = n_bit_size[i][j];
                                    }
                                }
                                if (n_data_mask[i][j] !== null) {
                                    if ((this as any)._device._c_data_mask[i][j] !== n_data_mask[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_DataMask + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._c_data_mask[i][j] = n_data_mask[i][j];
                                    }
                                }
                                if (b_use_parity[i][j] !== null) {
                                    if ((this as any)._device._b_use_parity[i][j] !== b_use_parity[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_UseParity + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._b_use_parity[i][j] = b_use_parity[i][j];
                                    }
                                }
                                if (n_parity_type[i][j] !== null) {
                                    if ((this as any)._device._n_parity_type[i][j] !== n_parity_type[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_ParityType + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._n_parity_type[i][j] = n_parity_type[i][j];
                                    }
                                }
                                if (n_stxl[i][j] !== null) {
                                    if ((this as any)._device._c_stxl[i][j] !== n_stxl[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_STX_L + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._c_stxl[i][j] = n_stxl[i][j];
                                    }
                                }
                                if (n_etxl[i][j] !== null) {
                                    if ((this as any)._device._c_etxl[i][j] !== n_etxl[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_ETX_L + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._c_etxl[i][j] = n_etxl[i][j];
                                    }
                                }
                                if (b_use_error_correct[i][j] !== null) {
                                    if ((this as any)._device._b_use_ecm[i][j] !== b_use_error_correct[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_UseErrorCorrect + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._b_use_ecm[i][j] = b_use_error_correct[i][j];
                                    }
                                }
                                if (n_error_correct_type[i][j] !== null) {
                                    if ((this as any)._device._n_ecm_type[i][j] !== n_error_correct_type[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_ECMType + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._n_ecm_type[i][j] = n_error_correct_type[i][j];
                                    }
                                }
                                if (n_add_value[i][j] !== null) {
                                    if ((this as any)._device._n_add_value[i][j] !== n_add_value[i][j]) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_ISO1_Combi0_AddValue + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._n_add_value[i][j] = n_add_value[i][j];
                                    }
                                }
                                if (s_ppretag[i][j] !== null) {
                                    if (!this_device._is_equal_tag((this as any)._device._s_private_prefix[i][j], s_ppretag[i][j] ?? "")) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_PrivatePrefix10 + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._s_private_prefix[i][j] = s_ppretag[i][j];
                                    }
                                }
                                if (s_pposttag[i][j] !== null) {
                                    if (!this_device._is_equal_tag((this as any)._device._s_private_postfix[i][j], s_pposttag[i][j] ?? "")) {
                                        util.insert_to_set((this as any)._device._set_change_parameter
                                            , _type_change_parameter.cp_PrivatePostfix10 + i * lpu237._const_the_number_of_combination + j);
                                        (this as any)._device._s_private_postfix[i][j] = s_pposttag[i][j];
                                    }
                                }
                            }//end for j
                        }//end for i

                        resolve(true);
                    }
                    else {//error
                        reject(this_device._get_error_object('en_e_parameter'));
                    }
                };// the end of onload event handler.
                //
                reader.readAsText(file_xml);

            } while (false);

        });//the end of Promise definition.
    }

    /**
     * @private
     * @description 하드웨어 타이머 카운트를 주파수(Hz)로 변환합니다.
     * @param {number} n_count - 하드웨어 타이머의 카운트 값
     * @returns {number} 주파수 (단위: Hz)
     */
    private _get_freqency_from_timer_count(n_count: number): number {
        // 유효성 검사 및 0 이하의 값 방지 (나눗셈 오류 방지)
        if (typeof n_count !== 'number' || n_count <= 0) {
            return 0;
        }

        /**
         * 주파수 계산식
         * LPU237 장치의 클럭 소스와 프리스케일러에 기반한 고유 계수(8.67)를 사용합니다.
         */
        return n_count / 8.67;
    }
    /**
     * @private
     * @description 인터페이스 타입 코드를 사람이 읽을 수 있는 문자열로 변환합니다.
     * @param {number} inf - 시스템 인터페이스 타입 코드
     * @returns {string} 인터페이스 명칭 (알 수 없는 경우 "unknown")
     */
    private _get_system_inferface_string(inf: number): string {
        // 유효성 검사
        if (typeof inf !== 'number') {
            return "unknown";
        }

        switch (inf) {
            case type_system_interface.system_interface_usb_keyboard:
                return "Usb Hid keyboard";
            case type_system_interface.system_interface_usb_msr:
                return "Usb Hid vendor defined"; // 일반적인 웹 SDK나 OPOS 모드에서 사용
            case type_system_interface.system_interface_uart:
                return "Uart";
            case type_system_interface.system_interface_ps2_stand_alone:
                return "Standalone PS2";
            case type_system_interface.system_interface_ps2_bypass:
                return "Bypass PS2";
            case type_system_interface.system_interface_by_hw_setting:
                return "By HW setting";
            default:
                return "unknown";
        }
    }

    /**
     * @private
     * @description 내부 유효성 검사 헬퍼 함수
     */
    private _is_invalid_track_combi = (n_track: number, targetArray: any[][]): boolean => {
        return (
            typeof n_track !== 'number' ||
            !Array.isArray(targetArray) ||
            targetArray.length !== this._const_the_number_of_track
        );
    }

    /**
     * @private
     * @description 숫자 또는 배열 입력을 표준 4자릿수 버전 배열로 변환합니다.
     */
    private _normalize_version(version: number[] | number): number[] {
        const result = [0, 0, 0, 0];
        if (typeof version === 'number') {
            result[0] = version;
        } else if (Array.isArray(version)) {
            for (let i = 0; i < Math.min(version.length, 4); i++) {
                result[i] = version[i];
            }
        }
        return result;
    }

    /**
     * @private
     * @description Hex 문자열을 바이트 숫자 배열로 변환하는 유틸리티 함수
     */
    private _hex_to_bytes(hex: string): number[] {
        const bytes: number[] = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return bytes;
    }

} //the end of lpu237 class



