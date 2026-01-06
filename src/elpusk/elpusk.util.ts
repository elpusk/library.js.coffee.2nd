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

import { elpusk } from "./elpusk";

export class util extends elpusk {

    /**
     * @private
     * @const
     * @type {Array<string>}
     * @description An array mapping ASCII codes (0–127) to their common symbol representations.
     */
    private static readonly ascii_symbol_map: string[] = [
         "NUL"
        ,"SOH"
        ,"STX"
        ,"ETX"
        ,"EOT"
        ,"ENQ"
        ,"ACK"
        ,"BEL"
        ,"BS"
        ,"HT"
        ,"LF"
        ,"VT"
        ,"FF"
        ,"CR"
        ,"SO"
        ,"SI"
        ,"DLE"
        ,"DC1"
        ,"DC2"
        ,"DC3"
        ,"DC4"
        ,"NAK"
        ,"SYN"
        ,"ETB"
        ,"CAN"
        ,"EM"
        ,"SUB"
        ,"ESC"
        ,"FS"
        ,"GS"
        ,"RS"
        ,"US"
        ,"SP"
        ,"!"
        ,'"'
        ,'#'
        ,'%'
        ,'&'
        ,"'"
        ,"("
        ,")"
        ,"*"
        ,"+"
        ,","
        ,"-"
        ,"."
        ,"/"
        ,"0"
        ,"1"
        ,"2"
        ,"3"
        ,"4"
        ,"5"
        ,"6"
        ,"7"
        ,"8"
        ,"9"
        ,":"
        ,";"
        ,"<"
        ,"="
        ,">"
        ,"?"
        ,"@"
        ,"A"
        ,"B"
        ,"C"
        ,"D"
        ,"E"
        ,"F"
        ,"G"
        ,"H"
        ,"I"
        ,"J"
        ,"K"
        ,"L"
        ,"M"
        ,"N"
        ,"O"
        ,"P"
        ,"Q"
        ,"R"
        ,"S"
        ,"T"
        ,"U"
        ,"V"
        ,"W"
        ,"X"
        ,"Y"
        ,"Z"
        ,"["
        ,"\\"
        ,"]"
        ,"^"
        ,"_"
        ,"`"
        ,"a"
        ,"b"
        ,"c"
        ,"d"
        ,"e"
        ,"f"
        ,"g"
        ,"h"
        ,"i"
        ,"j"
        ,"k"
        ,"l"
        ,"m"
        ,"n"
        ,"o"
        ,"p"
        ,"q"
        ,"u"
        ,"v"
        ,"w"
        ,"x"
        ,"y"
        ,"z"
        ,"{"
        ,"|"
        ,"}"
        ,"~"
        ,"DEL"
    ];

    /**
     * Converts a little-endian hexadecimal string to a number.
     *
     * @param sHex A hexadecimal string in little-endian format.
     *             Example: "78563412" -> 0x12345678
     * @returns The converted number.
     */
    public static get_number_from_little_endian_hex_string(sHex: string): number {
        if (!sHex) {
            return 0;
        }

        // Split into 2-hex-digit groups (bytes)
        const bytes = sHex.match(/../g);
        if (!bytes) {
            return 0;
        }

        // Convert little-endian -> big-endian
        const bigEndianHex = bytes.reverse().join("");

        return parseInt(bigEndianHex, 16);
    }

    /**
     * @public
     * @function elpusk.util.get_version_string_from_version
     * @param version An array of 4 numbers representing the version.
     * @returns The formatted version string (e.g., "1.2.3.4").
     */
    public static get_version_string_from_version(version: number[]): string {
        let s_value = "0.0.0.0";

        do {
            if (!Array.isArray(version)) {
                continue;
            }
            if (version.length !== 4) {
                continue;
            }

            s_value =
                version[0].toString(10) + "." +
                version[1].toString(10) + "." +
                version[2].toString(10) + "." +
                version[3].toString(10);
        } while (false);

        return s_value;
    }

    /**
     * @public
     * @function elpusk.util.get_dword_hex_string_from_number
     * @param dw_data An unsigned 32-bit integer (double word).
     * @returns A little-endian hexadecimal string representing the double word (8 characters).
     * @description Converts a number to a little-endian, 8-character hexadecimal string.
     */
    public static get_dword_hex_string_from_number(dw_data: number): string {
        let s_big_hex = dw_data.toString(16);

        // add a leading zero if needed
        s_big_hex = s_big_hex.replace(/^(.(..)*)$/, "0$1");

        let n_need_zeros = 4 * 2 - s_big_hex.length;
        for (let i = 0; i < n_need_zeros; i++) {
            s_big_hex = "0" + s_big_hex; // padding for dword
        }

        // split number in groups of two (bytes)
        const a = s_big_hex.match(/../g);
        if (!a) {
            return "";
        }

        // reverse the groups (big-endian → little-endian)
        a.reverse();

        const s_little_hex = a.join("");
        return s_little_hex;
    }

    /**
     * @public
     * @function elpusk.util.get_byte_hex_string_from_number
     * @param c_data An unsigned 8-bit integer (byte).
     * @returns A 2-character hexadecimal string.
     * @description Converts a number to a 2-character hexadecimal string.
     */
    public static get_byte_hex_string_from_number(c_data: number): string {
        let s_big_hex = c_data.toString(16);

        // add a leading zero if needed
        s_big_hex = s_big_hex.replace(/^(.(..)*)$/, "0$1");

        let n_need_zeros = 1 * 2 - s_big_hex.length;
        for (let i = 0; i < n_need_zeros; i++) {
            s_big_hex = "0" + s_big_hex; // padding for byte
        }

        return s_big_hex.substring(0, 2);
    }

    /**
     * @public
     * @function elpusk.util.insert_to_set
     * @param target_set The array to treat as a set.
     * @param item The item to insert.
     * @returns True if the item was inserted, false otherwise.
     * @description Inserts an item into an array if it does not already exist.
     */
    public static insert_to_set<T>(target_set: T[] | undefined, item: T | undefined): boolean {
        let b_result = false;

        do {
            if (typeof target_set === "undefined") {
                continue;
            }
            if (!Array.isArray(target_set)) {
                continue;
            }
            if (typeof item === "undefined") {
                continue;
            }

            if (target_set.indexOf(item) >= 0) {
                continue;
            }

            target_set.push(item);
            b_result = true;
        } while (false);

        return b_result;
    }

    /**
     * @public
     * @function elpusk.util.remove_from_set
     * @param target_set The array to treat as a set.
     * @param item The item to remove.
     * @returns True if the item was removed, false otherwise.
     * @description Removes an item from an array.
     */
    public static remove_from_set<T>(target_set: T[] | undefined, item: T | undefined): boolean {
        let b_result = false;

        do {
            if (typeof target_set === "undefined") {
                continue;
            }
            if (!Array.isArray(target_set)) {
                continue;
            }
            if (typeof item === "undefined") {
                continue;
            }

            const n_index = target_set.indexOf(item);
            if (n_index < 0) {
                continue;
            }

            target_set.splice(n_index, 1);
            b_result = true;
        } while (false);

        return b_result;
    }

    /**
     * @public
     * @function elpusk.util.clear_set
     * @param target_set The array to clear.
     * @description Clears all items from an array.
     */
    public static clear_set<T>(target_set: T[] | undefined): void {
        do {
            if (typeof target_set === "undefined") {
                continue;
            }
            if (!Array.isArray(target_set)) {
                continue;
            }

            target_set.length = 0;
        } while (false);
    }

    /**
     * @public
     * @function elpusk.util.find_from_set
     * @param target_set The array to search.
     * @param item The item to find.
     * @returns The index of the item in the array, or -1 if not found.
     * @description Finds the index of an item in an array.
     */
    public static find_from_set<T>(target_set: T[] | undefined, item: T | undefined): number {
        let n_index = -1;

        do {
            if (typeof target_set === "undefined") {
                continue;
            }
            if (!Array.isArray(target_set)) {
                continue;
            }
            if (typeof item === "undefined") {
                continue;
            }

            n_index = target_set.indexOf(item);
        } while (false);

        return n_index;
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_push
     * @param target_map The Map instance where keys map to queues (arrays).
     * @param key The key of the map.
     * @param value The value to push to the queue associated with the key.
     * @description Pushes a value onto a queue within a map. If the key does not exist, a new queue is created.
     */                
    public static map_of_queue_push<K, V>(
        target_map: Map<K, V[]> | undefined,
        key: K,
        value: V
    ): void {
        do {
            if (!(target_map instanceof Map)) {
                continue;
            }
            if (!target_map.has(key)) {
                const queue: V[] = [];
                queue.push(value);
                target_map.set(key, queue);
                continue;
            }
            const q = target_map.get(key);
            if (q) {
                q.push(value);
            }
        } while (false);
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_front
     * @param target_map The Map instance.
     * @param key The key of the map.
     * @returns The first value from the queue, or null if the queue is empty or the key doesn't exist.
     * @description Retrieves and removes the first value from the queue associated with the given key.
     */                
    public static map_of_queue_front<K, V>(
        target_map: Map<K, V[]> | undefined,
        key: K
    ): V | null {
        let value: V | null = null;

        do {
            if (!(target_map instanceof Map)) {
                continue;
            }
            if (!target_map.has(key)) {
                continue;
            }
            const q = target_map.get(key);
            if (!q || q.length <= 0) {
                continue;
            }

            value = q.shift() ?? null;
            if (q.length <= 0) {
                target_map.delete(key);
            }
        } while (false);

        return value;
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_get
     * @param target_map The Map instance.
     * @param key The key of the map.
     * @returns The first value from the queue without removing it, or null if not found.
     * @description Retrieves the first value from the queue for a given key without removing it.
     */                
    public static map_of_queue_get<K, V>(
        target_map: Map<K, V[]> | undefined,
        key: K
    ): V | null {
        let value: V | null = null;

        do {
            if (!(target_map instanceof Map)) {
                continue;
            }
            if (!target_map.has(key)) {
                continue;
            }
            const q = target_map.get(key);
            if (!q || q.length <= 0) {
                continue;
            }

            value = q[0];
        } while (false);

        return value;
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_is_empty
     * @param target_map The Map instance.
     * @param key The key of the map.
     * @returns True if the queue for the given key is empty or does not exist, otherwise false.
     * @description Checks if the queue for a given key in the map is empty.
     */                
    public static map_of_queue_is_empty<K, V>(
        target_map: Map<K, V[]> | undefined,
        key: K
    ): boolean {
        let b_empty = true;

        do {
            if (!(target_map instanceof Map)) {
                continue;
            }
            if (!target_map.has(key)) {
                continue;
            }
            const q = target_map.get(key);
            if (!q || q.length <= 0) {
                continue;
            }

            b_empty = false;
        } while (false);

        return b_empty;
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_delete
     * @param target_map The Map instance.
     * @param key The key to delete from the map.
     * @description Deletes the queue associated with the given key from the map.
     */                
    public static map_of_queue_delete<K, V>(
        target_map: Map<K, V[]> | undefined,
        key: K
    ): void {
        do {
            if (!(target_map instanceof Map)) {
                continue;
            }
            if (target_map.has(key)) {
                target_map.delete(key);
            }
        } while (false);
    }

    /** 
     * @public 
     * @function elpusk.util.map_of_queue_clear
     * @param target_map The Map instance to clear.
     * @description Removes all key-value pairs from the map.
     */                
    public static map_of_queue_clear<K, V>(
        target_map: Map<K, V[]> | undefined
    ): void {
        if (target_map instanceof Map) {
            target_map.clear();
        }
    }

    /**
     * @public 
     * @function elpusk.util.get_ascii_symbol_from_char_code
     * @param n_ascii A one-byte ASCII code.
     * @returns The corresponding ASCII symbol string, or an empty string if the code is invalid.
     * @description Gets an ASCII symbol string from an ASCII code.
     */                
    public static get_ascii_symbol_from_char_code(n_ascii: number): string {
        let s_symbol = "";

        do {
            if (typeof n_ascii !== "number") {
                continue;
            }
            if (n_ascii < 0 || n_ascii > 127) {
                continue;
            }
            s_symbol = util.ascii_symbol_map[n_ascii];
        } while (false);

        return s_symbol;
    }

    /**
     * @public 
     * @function elpusk.util.is_a_greater_than_equal_b
     * @param s_a The first version string (e.g., "x.y.z").
     * @param s_b The second version string (e.g., "x.y.z").
     * @returns True if version `s_a` is greater than or equal to version `s_b`.
     * @description Compares two version strings in "x.y.z" format.
     */                
    public static is_a_greater_than_equal_b(s_a: string, s_b: string): boolean {
        // input version format (x.y.z)
        if (!/^\d+\.\d+\.\d+$/.test(s_a)) {
            throw new Error("Invalid s_a input version format. Expected format: x.y.z");
        }
        if (!/^\d+\.\d+\.\d+$/.test(s_b)) {
            throw new Error("Invalid s_b input version format. Expected format: x.y.z");
        }

        // convert string version to integer version
        const currentParts = s_b.split(".").map(Number);
        const inputParts = s_a.split(".").map(Number);

        // compare version
        for (let i = 0; i < Math.max(currentParts.length, inputParts.length); i++) {
            const current = currentParts[i] || 0;
            const input = inputParts[i] || 0;

            if (current < input) {
                return false;
            } else if (current > input) {
                return true;
            }
        }

        // case: currentVersion >= inputVersion
        return true;
    }



} //the end of util
