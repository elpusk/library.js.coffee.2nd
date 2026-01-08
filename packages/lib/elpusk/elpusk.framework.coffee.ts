/**
 * 2025.08.04
 * @license MIT
 * Copyright (c) 2026 Elpusk.Co.,Ltd.
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
 * 
 * @author developer 00000006
 * @copyright Elpusk.Co.,Ltd 2025
 * @version 2.2.1
 * @description elpusk framework coffee typescript library.
 */

import { framework } from "./elpusk.framework";

'use strict';

// Type definitions
type ErrorName = 
    | 'en_e_server_connect'
    | 'en_e_device_open'
    | 'en_e_server_mismatch_action'
    | 'en_e_server_data_field_format'
    | 'en_e_server_unsupport_data'
    | 'en_e_device_index'
    | 'en_e_device_out_id'
    | 'en_e_device_in_id';

interface ErrorNameMessage {
    name: ErrorName;
    message: string;
}

enum _type_request_type {
    CLINET_TO_SERVER = "T",
    SERVER_TO_CLINET = "R",
    SYSTEM_EVENT = "S"
}

enum _type_packet_owner {
    MANAGER = "M",
    DEVICE = "D"
}

enum _type_action_code {
    UNKNOWN = "U",
    ECHO = "E",
    DEVICE_LIST = "L",
    CONTROL_SHOW = "S",
    FILE_OPERATION = "F",
    DEVICE_PLUG_IN = "P",
    ADVANCE_OPERATION = "A",
    SERVER_CLOSE = "C",
    KERNEL_OPERATION = "K",
    DEVICE_INDEPENDENT_BOOTLOADER = "b",
    DEVICE_OPEN = "o",
    DEVICE_CLOSE = "c",
    DEVICE_SEND = "s",
    DEVICE_RECEIVE = "r",
    DEVICE_TRANSMIT = "t",
    DEVICE_CANCEL = "x",
    DEVICE_BOOTLOADER = "0"
}

enum _type_data_field_type {
    HEX_STRING = "H",
    STRING_OR_STRING_ARRAY = "S"
}

interface JsonPacket {
    request_type: string;
    session_number: number;
    packet_owner: string;
    device_index: number;
    action_code: string;
    in_id: number;
    out_id: number;
    data_field_type: string;
    data_field?: string | string[];
}

export type type_cb_received = (deviceIndex: number, s_rx: Array<string> | string) => void;
export type type_cb_error = (deviceIndex: number, event_error: Event | Error) => void;

interface PromiseParameter {
    n_device_index: number;
    method: string;
    resolve: ((value: any) => void) | null;
    reject: ((reason?: any) => void) | null;
    cb_received?: type_cb_received;
    cb_error?:  type_cb_error;
    cb_progress?: (b_result: boolean, n_current: number, n_total: number, s_message: string) => void;
    b_device_index?: boolean;
}

export type SystemEventHandler = (action_code: string, device_paths: string[]) => void;

// Coffee class extending framework
export class coffee extends framework {
    private static _instance: coffee | null = null;
    private static _b_connet: boolean = false;
    private static _system_handler: SystemEventHandler | null = null;

    private _websocket: WebSocket | null = null;
    private _s_session: string = "";
    private _map_of_queue_promise_parameter: Map<number, PromiseParameter[]> = new Map();

    private readonly _error_name_message: ErrorNameMessage[] = [
        {name: 'en_e_server_connect', message: "not connected to server"},
        {name: 'en_e_device_open', message: "device is not openned"},
        {name: 'en_e_server_mismatch_action', message: "server action code is not identical"},
        {name: 'en_e_server_data_field_format', message: "server data field format is not matched"},
        {name: 'en_e_server_unsupport_data', message: "server data cannot accept"},
        {name: 'en_e_device_index', message: "unknown device index"},
        {name: 'en_e_device_out_id', message: "unknown device out ID"},
        {name: 'en_e_device_in_id', message: "unknown device in ID"}
    ];

    private readonly const_n_undefined_session_number: number = 0xFFFFFFFF;
    private readonly const_n_undefined_device_index: number = 0;

    private constructor() {
        super();
    }

    public static get_instance(): coffee {
        if (!coffee._instance) {
            coffee._instance = new coffee();
        }
        return coffee._instance;
    }

    public static get_this_library_version(): string {
        return "2.2.1";
    }

    public static set_system_event_handler(handler: SystemEventHandler): void {
        coffee._system_handler = handler;
    }

    private _push_promise_parameter(n_device_index: number, parameter: PromiseParameter): void {
        if (!this._map_of_queue_promise_parameter.has(n_device_index)) {
            const queue: PromiseParameter[] = [];
            queue.push(parameter);
            this._map_of_queue_promise_parameter.set(n_device_index, queue);
        } else {
            const q = this._map_of_queue_promise_parameter.get(n_device_index)!;
            q.push(parameter);
        }
    }

    private _front_promise_parameter(n_device_index: number): PromiseParameter | null {
        if (!this._map_of_queue_promise_parameter.has(n_device_index)) {
            return null;
        }
        const q = this._map_of_queue_promise_parameter.get(n_device_index)!;
        if (q.length <= 0) {
            return null;
        }
        const parameter = q.shift()!;
        if (q.length <= 0) {
            this._map_of_queue_promise_parameter.delete(n_device_index);
        }
        return parameter;
    }

    private _is_empty_promise_parameter(n_device_index: number): boolean {
        if (!this._map_of_queue_promise_parameter.has(n_device_index)) {
            return true;
        }
        const q = this._map_of_queue_promise_parameter.get(n_device_index)!;
        return q.length <= 0;
    }

    private _delete_promise_parameter(n_device_index: number): void {
        if (this._map_of_queue_promise_parameter.has(n_device_index)) {
            this._map_of_queue_promise_parameter.delete(n_device_index);
        }
    }

    private _clear_promise_parameter(): void {
        this._map_of_queue_promise_parameter.clear();
    }

    /**
     * @private
     * @description error messge string 얻기.
     * @param {ErrorName} error name(string)
     * @returns {string} error description message
     */
    private _get_error_message(s_error_name: ErrorName): string {
        for (let i = 0; i < this._error_name_message.length; i++) {
            if (this._error_name_message[i].name === s_error_name) {
                return this._error_name_message[i].message;
            }
        }
        return "";
    }

    /**
     * @private
     * @description Error object 얻기.
     * @param {ErrorName} error name(string)
     * @returns {Error} Error object
     */
    private _get_error_object(s_name: ErrorName): Error {
        const s_message = this._get_error_message(s_name);
        const e = new Error(s_message);
        e.name = s_name;
        return e;
    }

    private _is_supported_browser(): boolean {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('whale')) return true;
        if (ua.includes('chrome')) return true;
        if (ua.includes('firefox')) return true;
        if (ua.includes('opr/') || ua.includes('opera')) return true;
        if (ua.includes('edg/')) return true;
        return false;
    }

    private _get_server_url(s_protocol?: string, s_port?: string): string {
        let s_used_port = "443";
        let s_used_protocol = "wss";
        let s_used_domain = "127.0.0.1";
        
        if (typeof s_protocol !== 'undefined') {
            if (s_protocol === "ws") {
                s_used_protocol = "ws";
                s_used_port = "80";
            }
        }
        if (typeof s_port !== 'undefined') {
            s_used_port = s_port;
        }
        if (this._is_supported_browser()) {
            s_used_domain = "localhost";
        }

        return `${s_used_protocol}://${s_used_domain}:${s_used_port}`;
    }

    private _is_valid_request_type(s_request_type: string): boolean {
        return s_request_type === _type_request_type.CLINET_TO_SERVER ||
               s_request_type === _type_request_type.SERVER_TO_CLINET ||
               s_request_type === _type_request_type.SYSTEM_EVENT;
    }

    private _is_valid_packet_owner(s_packet_owner: string): boolean {
        return s_packet_owner === _type_packet_owner.DEVICE ||
               s_packet_owner === _type_packet_owner.MANAGER;
    }

    private _is_valid_action_code(s_action_code: string): boolean {
        return Object.values(_type_action_code).includes(s_action_code as _type_action_code);
    }

    private _is_valid_data_field_type(s_data_field_type: string): boolean {
        return s_data_field_type === _type_data_field_type.HEX_STRING ||
               s_data_field_type === _type_data_field_type.STRING_OR_STRING_ARRAY;
    }

    private _is_valid_session_number(session_number: string | number): boolean {
        let n_session = 0;
        if (typeof session_number === 'string') {
            n_session = parseInt(session_number);
            if (isNaN(n_session)) {
                return false;
            }
        } else {
            n_session = session_number;
        }
        return n_session !== this.const_n_undefined_session_number;
    }

    private _is_valid_device_index(device_index: string | number): boolean {
        let n_device_index = 0;
        if (typeof device_index === 'string') {
            n_device_index = parseInt(device_index);
            if (isNaN(n_device_index)) {
                return false;
            }
        } else {
            n_device_index = device_index;
        }
        return n_device_index !== this.const_n_undefined_device_index;
    }

    private _is_valid_device_id(device_id: string | number): boolean {
        let n_device_id = 0;
        if (typeof device_id === 'string') {
            n_device_id = parseInt(device_id);
            if (isNaN(n_device_id)) {
                return false;
            }
        } else {
            n_device_id = device_id;
        }
        return n_device_id >= 0 && n_device_id <= 255;
    }

    private _generate_request_packet(
        s_packet_owner: string,
        n_device_index: number,
        s_action_code: string,
        n_in_id: number,
        n_out_id: number,
        s_data_field_type: string,
        data_field?: string | string[]
    ): JsonPacket | undefined {
        if (!this._is_valid_packet_owner(s_packet_owner)) return undefined;
        if (!this._is_valid_session_number(this._s_session)) return undefined;
        if (!this._is_valid_device_index(n_device_index)) {
            if (n_device_index !== this.const_n_undefined_device_index) {
                return undefined;
            }
        }
        if (!this._is_valid_action_code(s_action_code)) return undefined;
        if (!this._is_valid_device_id(n_in_id)) return undefined;
        if (!this._is_valid_device_id(n_out_id)) return undefined;
        if (!this._is_valid_data_field_type(s_data_field_type)) return undefined;

        const json_packet: JsonPacket = {
            request_type: _type_request_type.CLINET_TO_SERVER,
            session_number: Number(this._s_session),
            packet_owner: s_packet_owner,
            device_index: Number(n_device_index),
            action_code: s_action_code,
            in_id: Number(n_in_id),
            out_id: Number(n_out_id),
            data_field_type: s_data_field_type,
            data_field: data_field
        };

        return json_packet;
    }

    private _promise_echo(s_data_type: string, s_data?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) {
                reject(this._get_error_object('en_e_server_connect'));
                return;
            }

            let s_used_data_type: string;
            if (!this._is_valid_data_field_type(s_data_type)) {
                if (typeof s_data_type !== 'undefined') {
                    reject(this._get_error_object('en_e_server_data_field_format'));
                    return;
                }
                s_used_data_type = _type_data_field_type.STRING_OR_STRING_ARRAY;
            } else {
                s_used_data_type = s_data_type;
            }

            this._websocket!.onerror = (evt) => {
                this._on_def_error(0, evt);
            };

            this._websocket!.onmessage = (evt) => {
                this._on_def_message_json_format(0, evt);
            };

            const parameter: PromiseParameter = {
                n_device_index: 0,
                method: "_promise_echo",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            let s_echo_data: string;
            if (typeof s_data === 'undefined') {
                s_echo_data = Math.floor(Math.random() * 10000).toString();
            } else {
                s_echo_data = s_data;
            }

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                _type_action_code.ECHO,
                0,
                0,
                s_used_data_type,
                String(s_echo_data)
            );

            const s_json_packet = JSON.stringify(json_packet);
            this._websocket!.send(s_json_packet);
        });
    }

    private _promise_load_file(file_loaded: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) {
                reject(this._get_error_object('en_e_server_connect'));
                return;
            }

            const reader = new FileReader();

            reader.onload = (evt) => {
                const array_data = evt.target!.result as ArrayBuffer;
                resolve(array_data);
            };

            reader.onerror = () => {
                reject(new Error("_promise_load_file"));
            };

            reader.readAsArrayBuffer(file_loaded);
        });
    }

    private _load_and_append_file(
        this_class_instance: coffee,
        file_loaded: File,
        n_packet_size: number,
        cb_process: (b_result: boolean, n_progress: number, n_file_size: number, s_message: string) => void
    ): void {
        let n_chunk = 1024;
        let n_offset = 0;

        if (typeof n_packet_size === 'number' && n_packet_size > 0) {
            n_chunk = n_packet_size;
        }

        const reader = new FileReader();
        
        reader.onload = (evt) => {
            const array_data = evt.target!.result as ArrayBuffer;
            let s_hex = "";
            let s_hex_total = "";
            const bytes = new Uint8Array(array_data);
            const length = bytes.byteLength;
            
            for (let i = 0; i < length; i++) {
                s_hex = bytes[i].toString(16);
                if (s_hex.length === 1) {
                    s_hex = "0" + s_hex;
                }
                s_hex_total += s_hex;
            }
            n_offset += length;

            this_class_instance.file_append(s_hex_total)
                .then((s_rx : string[] ) => {
                    let b_result = false;
                    if (Array.isArray(s_rx) && s_rx !== null && s_rx[0] === "success") {
                        b_result = true;
                    }

                    if (b_result) {
                        if (_read_chunk_()) {
                            console.log(" ++ _load_and_append_file : last.");
                        } else {
                            console.log(" ++ _load_and_append_file : more");
                        }
                    } else {
                        if (typeof cb_process === 'function') {
                            cb_process(false, -1, file_loaded.size, "file_append");
                        }
                    }
                })
                .catch((event_error:any) => {
                    console.log("-_load_and_append_file::file_append : " + event_error);
                    if (typeof cb_process === 'function') {
                        cb_process(false, -1, file_loaded.size, event_error.message);
                    }
                });
        };

        reader.onerror = () => {
            if (typeof cb_process === 'function') {
                cb_process(false, -1, file_loaded.size, "FileReader::onerror");
            }
        };

        const _read_chunk_ = (): boolean => {
            if (n_offset >= file_loaded.size) {
                this_class_instance.file_close()
                    .then((s_rx : string[]) => {
                        let b_result = false;
                        if (Array.isArray(s_rx) && s_rx !== null && s_rx[0] === "success") {
                            b_result = true;
                        }
                        
                        if (b_result) {
                            console.log(" ++ _load_and_append_file : file_close : compete.");
                            if (typeof cb_process === 'function') {
                                cb_process(true, file_loaded.size, file_loaded.size, "complete");
                            }
                        } else {
                            if (typeof cb_process === 'function') {
                                cb_process(false, -1, file_loaded.size, "file_close");
                            }
                        }
                    })
                    .catch((event_error : any) => {
                        console.log("-_load_and_append_file::file_close : " + event_error);
                        if (typeof cb_process === 'function') {
                            cb_process(false, -1, file_loaded.size, event_error.message);
                        }
                    });
                return true;
            } else {
                if (typeof cb_process === 'function') {
                    cb_process(true, n_offset, file_loaded.size, "copying");
                }
                const slice = file_loaded.slice(n_offset, n_offset + n_chunk);
                reader.readAsArrayBuffer(slice);
                return false;
            }
        };

        _read_chunk_();
    }

    private _on_def_open(evt: Event): void {
        // console.log('_on_def_open');
    }

    private _on_def_close(evt: Event): void {
        console.log('_on_def_close');
        coffee._b_connet = false;

        const n_device_index = 0;

        if (!this._is_empty_promise_parameter(n_device_index)) {
            const parameter = this._front_promise_parameter(n_device_index);
            if (parameter && parameter.method === "disconnect") {
                parameter.resolve!(this._s_session);
            }
        } else {
            console.log(evt);
            if (typeof coffee._system_handler === 'function') {
                const closed: string[] = ["close"];
                coffee._system_handler(_type_action_code.SERVER_CLOSE, closed);
            }
        }
        this._s_session = "";
    }

    private _on_def_message_json_format(n_device_index: number, evt: MessageEvent): void {
        const json_obj = JSON.parse(evt.data);

        if (json_obj.request_type === _type_request_type.SYSTEM_EVENT) {
            if (typeof coffee._system_handler === 'function') {
                coffee._system_handler(json_obj.action_code, json_obj.data_field);
            }
            return;
        }

        if (this._is_empty_promise_parameter(n_device_index)) {
            return;
        }
        
        const parameter = this._front_promise_parameter(n_device_index);
        if (!parameter) return;

        if (n_device_index === 0) {
            this._handle_manager_response(parameter, json_obj);
        } else {
            this._handle_device_response(parameter, json_obj, n_device_index);
        }
    }

    private _handle_manager_response(parameter: PromiseParameter, json_obj: any): void {
        switch (parameter.method) {
            case "connect":
                if (!coffee._b_connet) {
                    this._s_session = json_obj.session_number.toString();
                    coffee._b_connet = true;
                }
                parameter.resolve!(this._s_session);
                break;
            case "_promise_echo":
                if (json_obj.action_code === _type_action_code.ECHO) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "get_device_list":
                if (json_obj.action_code === _type_action_code.DEVICE_LIST) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "file_create":
            case "file_open":
            case "file_close":
            case "file_delete":
            case "file_truncate":
            case "file_get_size":
            case "file_get_list":
            case "file_append":
                if (json_obj.action_code === _type_action_code.FILE_OPERATION) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "advance_set_session_name":
            case "advance_get_session_name":
            case "advance_send_data_to_session":
            case "advance_send_data_to_all":
                if (json_obj.action_code === _type_action_code.ADVANCE_OPERATION) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "kernel_load":
            case "kernel_unload":
            case "kernel_execute":
            case "kernel_cancel":
            case "kernel_list":
                if (json_obj.action_code === _type_action_code.KERNEL_OPERATION) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "kernel_open":
                if (json_obj.action_code === _type_action_code.KERNEL_OPERATION) {
                    if (Array.isArray(json_obj.data_field)) {
                        if (json_obj.data_field[0] === "success") {
                            this._delete_promise_parameter(json_obj.device_index);
                            parameter.resolve!(json_obj.device_index);
                        } else {
                            parameter.resolve!(this.const_n_undefined_device_index);
                        }
                    } else {
                        parameter.reject!(this._get_error_object('en_e_server_data_field_format'));
                    }
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "device_open":
                if (json_obj.action_code === _type_action_code.DEVICE_OPEN) {
                    if (json_obj.data_field === "success") {
                        this._delete_promise_parameter(json_obj.device_index);
                        parameter.resolve!(json_obj.device_index);
                    } else {
                        parameter.resolve!(this.const_n_undefined_device_index);
                    }
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
        }
    }

    private _handle_callback_response(parameter: PromiseParameter, json_obj: any, n_device_index: number): void {
        switch (parameter.method) {
            case "device_receive":
                if (json_obj.action_code == _type_action_code.DEVICE_RECEIVE) {
                    if( parameter.resolve === null ){
                        if( parameter.cb_received == undefined ){
                            // 에러 콜백이 없어서 에러 표시 불가,
                        }
                        else{
                            if( parameter.b_device_index ){
                                parameter.cb_received(n_device_index,json_obj.data_field);
                            }
                            else{
                                parameter.cb_received(this.const_n_undefined_device_index,json_obj.data_field);
                            }
                        }
                    }
                    else{
                        parameter.resolve(json_obj.data_field);
                    }
                }
                else {
                    if( parameter.reject === null ){
                        if( parameter.cb_error != undefined && parameter.cb_error != null){
                            if( parameter.b_device_index ){
                                parameter.cb_error(n_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                            else{
                                parameter.cb_error(this.const_n_undefined_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                        }
                    }
                    else{
                        parameter.reject(this._get_error_object('en_e_server_mismatch_action'));
                    }
                }
                break;
            case "device_transmit":
                if (json_obj.action_code == _type_action_code.DEVICE_TRANSMIT) {
                    if( parameter.resolve === null ){
                        if( parameter.cb_received == undefined ){
                            // 에러 콜백이 없어서 에러 표시 불가,
                        }
                        else{
                            if( parameter.b_device_index ){
                                parameter.cb_received(n_device_index,json_obj.data_field);
                            }
                            else{
                                parameter.cb_received(this.const_n_undefined_device_index,json_obj.data_field);
                            }
                        }
                    }
                    else{
                        parameter.resolve(json_obj.data_field);
                    }
                }
                else {
                    if( parameter.reject === null ){
                        if( parameter.cb_error == undefined ){
                            // 에러 콜백이 없어서 에러 표시 불가,
                        }
                        else{
                            if( parameter.b_device_index ){
                                parameter.cb_error(n_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                            else{
                                parameter.cb_error(this.const_n_undefined_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                        }
                    }
                    else{
                        parameter.reject(this._get_error_object('en_e_server_mismatch_action'));
                    }
                }
                break;
            case "device_cancel":
                if (json_obj.action_code == _type_action_code.DEVICE_CANCEL) {
                    if( parameter.resolve === null ){
                        if( parameter.cb_received == undefined ){
                            // 에러 콜백이 없어서 에러 표시 불가,
                        }
                        else{
                            if( parameter.b_device_index ){
                                parameter.cb_received(n_device_index,json_obj.data_field);
                            }
                            else{
                                parameter.cb_received(this.const_n_undefined_device_index,json_obj.data_field);
                            }
                        }
                    }
                    else{
                        parameter.resolve(json_obj.data_field);
                    }
                }
                else {
                    if( parameter.reject === null ){
                        if( parameter.cb_error == undefined ){
                            // 에러 콜백이 없어서 에러 표시 불가,
                        }
                        else{
                            if( parameter.b_device_index ){
                                parameter.cb_error(n_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                            else{
                                parameter.cb_error(this.const_n_undefined_device_index,this._get_error_object('en_e_server_mismatch_action'));
                            }
                        }
                    }
                    else{
                        parameter.reject(this._get_error_object('en_e_server_mismatch_action'));
                    }
                }
                break;
            default:
                break;
        }//end switch
    }

    private _handle_device_response(parameter: PromiseParameter, json_obj: any, n_device_index: number): void {
        switch (parameter.method) {
            case "device_close":
                if (json_obj.action_code === _type_action_code.DEVICE_CLOSE) {
                    this._delete_promise_parameter(n_device_index);
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "device_send":
                if (json_obj.action_code === _type_action_code.DEVICE_SEND) {
                    parameter.resolve!(json_obj.data_field);
                } else {
                    parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                }
                break;
            case "device_receive":
            case "device_transmit":
            case "device_cancel":
                this._handle_callback_response(parameter, json_obj, n_device_index);
                break;
            case "device_update_set_parameter":
                if (json_obj.action_code === _type_action_code.DEVICE_BOOTLOADER) {
                    if (parameter.resolve === null) {
                        if (parameter.b_device_index && parameter.cb_received) {
                            parameter.cb_received(n_device_index, json_obj.data_field);
                        } else if (parameter.cb_received) {
                            parameter.cb_received(this.const_n_undefined_device_index,json_obj.data_field);
                        }
                    } else {
                        parameter.resolve!(json_obj.data_field);
                    }
                } else {
                    if (parameter.reject === null) {
                        if (parameter.b_device_index && parameter.cb_error) {
                            parameter.cb_error(n_device_index, this._get_error_object('en_e_server_mismatch_action'));
                        } else if (parameter.cb_error) {
                            parameter.cb_error(this.const_n_undefined_device_index,this._get_error_object('en_e_server_mismatch_action'));
                        }
                    } else {
                        parameter.reject!(this._get_error_object('en_e_server_mismatch_action'));
                    }
                }
                break;
            case "device_update_start":
                if (json_obj.action_code === _type_action_code.DEVICE_BOOTLOADER) {
                    if (parameter.cb_progress) {
                        if (!Array.isArray(json_obj.data_field)) {
                            parameter.cb_progress(false, 0, 0, 'en_e_server_mismatch_data_field');
                        } else {
                            let n_cur = 0;
                            let n_total = 0;
                            let s_message = "";
                            let b_result = false;

                            if (json_obj.data_field[0] === 'success') {
                                b_result = true;
                            }
                            if (json_obj.data_field.length === 4) {
                                n_cur = Number(json_obj.data_field[1]);
                                n_total = Number(json_obj.data_field[2]);
                                s_message = json_obj.data_field[3];
                            }
                            if (b_result) {
                                if (json_obj.data_field.length === 1) {
                                    this._push_promise_parameter(n_device_index, parameter);
                                } else if ((n_cur + 1) < n_total) {
                                    this._push_promise_parameter(n_device_index, parameter);
                                }
                            }
                            parameter.cb_progress(b_result, n_cur, n_total, s_message);
                        }
                    }
                } else {
                    if (parameter.cb_progress) {
                        parameter.cb_progress(false, 0, 0, 'en_e_server_mismatch_action');
                    }
                }
                break;
            case "kernel_close":
            case "kernel_execute":
            case "kernel_cancel":
                if (json_obj.action_code == _type_action_code.KERNEL_OPERATION) {
                    if(parameter.resolve){
                        parameter.resolve(json_obj.data_field);
                    }
                }
                else {
                    if(parameter.reject){
                        parameter.reject(this._get_error_object('en_e_server_mismatch_action'));
                    }
                }
                break;
            default:
                break;
        }//end switch
    } // the end of _handle_device_response

    /**
     * @private
     * @description 웹소켓 에러 발생 시 호출되는 기본 핸들러입니다.
     * @param {number} n_device_index - 장치 인덱스
     * @param {Event} evt - 에러 이벤트 객체
     */
    private _on_def_error(n_device_index: number, evt: Event): void {
        // 1. 대기 중인 파라미터가 없으면 즉시 종료
        if (this._is_empty_promise_parameter(n_device_index)) {
            return;
        }

        const parameter = this._front_promise_parameter(n_device_index);
        if(parameter == null){
            return;
        }

        // 2. 관리자 요청(index 0) 혹은 일반 장치 요청 처리
        switch (parameter.method) {
            // Promise 기반 메서드들 (공통적으로 reject 처리)
            case "connect":
            case "disconnect":
            case "get_device_list":
            case "device_open":
            case "device_close":
            case "device_send":
            case "kernel_open":
            case "kernel_execute":
            case "device_update_set_parameter":
                if( parameter.reject ){
                    parameter.reject(evt);
                }
                break;

            // 콜백과 Promise를 모두 지원하는 메서드들
            case "device_receive":
            case "device_transmit":
            case "device_cancel":
                if (parameter.reject === null) {
                    // 콜백 방식 핸들링
                    if(parameter.cb_error){
                        if (parameter.b_device_index) {
                            parameter.cb_error(n_device_index, evt);
                        } else {
                            parameter.cb_error(this.const_n_undefined_device_index,evt);
                        }
                    }
                } else {
                    // Promise 방식 핸들링
                    parameter.reject(evt);
                }
                break;

            default:
                // 정의되지 않은 메서드도 안전을 위해 reject 처리하는 것이 좋음
                if (parameter.reject) parameter.reject(evt);
                break;
        }
    }

    /**
     * @public 
     * @function get_session_number
     * @returns {string} The current session number.
     * @description Gets the session number of the current connection.
     */
    public get_session_number() : string {
        return this._s_session;
    }

    /** 
     * @public 
     * @function get_error_message
     * @param {Error} error_object The error object.
     * @returns {string} The error description message.
     * @description Gets the error message from an Error object.
    */                
    public get_error_message(error_object:Error) : string{
        let s_name : ErrorName = error_object.name as ErrorName;
        return this._get_error_message(s_name);
    }

    /**
     * @public
     * @description 서버에 연결하고 웹소켓 세션을 생성합니다.
     * @param {string} [s_protocol="wss"] - 프로토콜 ("wss" 또는 "ws")
     * @param {string} [s_port] - 포트 번호
     * @returns {Promise<string>} 세션 번호를 반환하는 Promise
     */
    public connect(s_protocol: string = "wss", s_port?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const s_url = this._get_server_url(s_protocol, s_port);

            // 1. 이미 연결된 경우 기존 세션 반환
            if (coffee._b_connet) {
                return resolve(this._s_session);
            }

            // 2. 새로운 연결 준비 (기존 대기열 초기화)
            this._clear_promise_parameter();

            try {
                // 3. 웹소켓 생성 및 핸들러 등록
                this._websocket = new WebSocket(s_url, "elpusk.protocol.coffee.manager");

                this._websocket.onopen = (evt) => this._on_def_open(evt);
                this._websocket.onclose = (evt) => this._on_def_close(evt);
                
                // 에러와 메시지 핸들러에는 관리자 인덱스(0)를 전달
                this._websocket.onerror = (evt) => this._on_def_error(0, evt);
                this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

                // 4. 비동기 응답을 처리하기 위해 Promise 파라미터 저장
                const parameter = {
                    n_device_index: 0,
                    method: "connect",
                    resolve: resolve,
                    reject: reject
                };
                this._push_promise_parameter(0, parameter);

            } catch (error) {
                reject(error);
            }
        });
    }    
    
    /** 
     * @public 
     * @async
     * @function disconnect
     * @returns {Promise<string>} A promise that resolves with the session number string on success, or rejects with an Error.
     * @description Disconnects from the server.
    */                
    public disconnect() : Promise<string> {
        return new Promise((resolve, reject) => {

            if (!coffee._b_connet) {
                //already websocket disconnected.
                resolve(this._s_session);
            }
            else {
                let parameter = {
                    "n_device_index" : 0,
                    "method" : "disconnect",
                    "resolve" : resolve,
                    "reject" : reject
                };
                this._push_promise_parameter(0,parameter);
                if(this._websocket){
                    this._websocket.close();
                }
            }
        });
    }

    /** 
     * @public 
     * @async
     * @function echo_string
     * @param {string} s_data s_data is string type.
     * 
     * @returns {Promise} if success, resolve with echo data from server.
     * <br /> else reject with Error object.
     * 
     * @description run echo action to server by promise.
    */                
    public echo_string(s_data:string) : Promise<string> {
        return this._promise_echo(_type_data_field_type.STRING_OR_STRING_ARRAY, s_data);
    }

    /** 
     * @public 
     * @async
     * @function echo_hex
     * @param {string} s_data s_data is hex string type.
     * <br />  server will change this parameter to binary. 
     * 
     * @returns {Promise} if success, resolve with echo data from server.
     * <br /> else reject with Error object.
     * 
     * @description run echo action to server by promise.
    */                
    public echo_hex(s_data:string) : Promise<string> {
        return this._promise_echo(_type_data_field_type.HEX_STRING, s_data);
    }

    /**
     * @public
     * @description 서비스 DLL을 커널에 바인딩합니다.
     * @param {string} s_category - 카테고리 (예: "service")
     * @param {string} s_target - 서비스 DLL 경로
     * @returns {Promise<string[]>} 성공 시 ["success", ...] 형태의 배열 반환
     */
    public kernel_load(s_category: string, s_target: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // 1. 사전 체크
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 응답 핸들러 등록 (장치 인덱스 0: 매니저)
            if(this._websocket == null){
                return reject(this._get_error_object('en_e_server_connect'));
            }

            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            // 3. 비동기 처리를 위한 파라미터 저장
            const parameter = {
                n_device_index: 0,
                method: "kernel_load",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 4. 전송 데이터 구성
            const action_code = _type_action_code.KERNEL_OPERATION;
            const s_command = `load ${s_category} ${s_target}`;

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index, // 특정 장치 지정 전이므로 미정의 인덱스 사용
                action_code,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command]
            );

            // 5. 서버로 요청 발송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }                    

    /**
     * @public
     * @description 실행 중인 서비스 DLL을 커널에서 해제합니다.
     * @param {string} s_category - 카테고리 (예: "service")
     * @param {string} s_target - 해제할 서비스 DLL 경로
     * @returns {Promise<string[]>} 성공 시 ["success", ...] 반환
     */
    kernel_unload(s_category: string, s_target: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 매니저 응답을 받기 위한 핸들러 설정
            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            // 대기열에 추가
            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: "kernel_unload",
                resolve: resolve,
                reject: reject
            });

            // 언로드 명령 패킷 생성
            const s_command = `unload ${s_category} ${s_target}`;
            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                _type_action_code.KERNEL_OPERATION,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command]
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }
    
    /**
     * @public
     * @description 서비스 DLL의 "sd_execute" 함수를 실행합니다.
     * @param {number} n_device_index - 장치 인덱스 (0은 매니저)
     * @param {number} n_in_id - 입력 ID (HID: Report ID / USB: End-point)
     * @param {number} n_out_id - 출력 ID (HID: Report ID / USB: End-point)
     * @param {string} s_category - 카테고리 (예: "service")
     * @param {string} s_target - DLL 경로
     * @param {string[]} sa_data - 실행 함수에 전달할 파라미터 배열
     * @returns {Promise<string[]>} ["success", "응답데이터"...] 형태의 결과
     */
    kernel_execute(
        n_device_index: number, 
        n_in_id: number, 
        n_out_id: number, 
        s_category: string, 
        s_target: string, 
        sa_data: string[]
    ): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // 1. 상태 및 파라미터 타입 체크
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            if (typeof n_device_index !== 'number') 
                return reject(this._get_error_object('en_e_device_index'));
            if (typeof n_in_id !== 'number')
                 return reject(this._get_error_object('en_e_device_in_id'));
            if (typeof n_out_id !== 'number') 
                return reject(this._get_error_object('en_e_device_out_id'));
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));

            // 2. 이벤트 핸들러 바인딩 (특정 장치 인덱스 기준)
            this._websocket.onerror = (evt) => this._on_def_error(n_device_index, evt);
            this. _websocket.onmessage = (evt) => this._on_def_message_json_format(n_device_index, evt);

            // 3. Promise 관리 큐에 등록
            this._push_promise_parameter(n_device_index, {
                n_device_index,
                method: "kernel_execute",
                resolve,
                reject
            });

            // 4. 소유자 판별 및 패킷 생성
            const c_owner = (n_device_index === this.const_n_undefined_device_index) 
                ? _type_packet_owner.MANAGER 
                : _type_packet_owner.DEVICE;

            const s_base_command = `execute ${s_category} ${s_target}`;
            
            const json_packet = this._generate_request_packet(
                c_owner,
                n_device_index,
                _type_action_code.KERNEL_OPERATION,
                n_in_id,
                n_out_id,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_base_command, ...sa_data] // 스프레드 연산자로 간결하게 합침
            );

            // 5. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }    

    /**
     * @public
     * @description 실행 중인 서비스 DLL의 작업을 중단(sd_cancel)합니다.
     * @param {number} n_device_index - 장치 인덱스 (0: 매니저, >0: 특정 장치)
     * @param {number} n_in_id - 입력 ID
     * @param {number} n_out_id - 출력 ID
     * @param {string} s_category - 카테고리 (예: "service")
     * @param {string} s_target - 대상 DLL 경로
     * @returns {Promise<string[]>} 성공 시 ["success"] 반환
     */
    kernel_cancel(
        n_device_index: number,
        n_in_id: number,
        n_out_id: number,
        s_category: string,
        s_target: string
    ): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // 1. 유효성 검사
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            if (typeof n_device_index !== 'number')
                 return reject(this._get_error_object('en_e_device_index'));
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));
            
            // 2. 응답 처리를 위한 핸들러 및 큐 등록
            this._websocket.onerror = (evt) => this._on_def_error(n_device_index, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(n_device_index, evt);

            this._push_promise_parameter(n_device_index, {
                n_device_index,
                method: "kernel_cancel",
                resolve,
                reject
            });

            // 3. 소유자 판별 및 패킷 생성
            const c_owner = (n_device_index === this.const_n_undefined_device_index) 
                ? _type_packet_owner.MANAGER 
                : _type_packet_owner.DEVICE;

            const s_command = `cancel ${s_category} ${s_target}`;
            const json_packet = this._generate_request_packet(
                c_owner,
                n_device_index,
                _type_action_code.KERNEL_OPERATION,
                n_in_id,
                n_out_id,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command]
            );

            // 4. 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @description 서버에서 관리 중인 USB 장치 경로 목록을 가져옵니다.
     * @param {string} s_category - 카테고리 (보통 "device")
     * @param {string} [s_filter="hid"] - 필터 (예: "hid#vid_134b&pid_0001")
     * @returns {Promise<string[]>} 연결된 장치 경로 배열
     */
    kernel_list(s_category: string, s_filter?: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 1. 필터 및 액션 코드 설정
            const s_used_filter = s_filter || "hid";
            const action_code = _type_action_code.KERNEL_OPERATION;

            // 2. 관리자(0) 핸들러 바인딩
            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            // 3. 응답 대기열 등록
            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: "kernel_list",
                resolve,
                reject
            });

            // 4. 요청 데이터 생성
            // 데이터 형식: ["list device", "필터문자열"]
            const s_command = `list ${s_category}`;
            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command, String(s_used_filter)]
            );

            // 5. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @description 서버에 특정 장치를 열도록 요청하고 장치 인덱스를 할당받습니다.
     * @param {string} s_category - 카테고리 (보통 "device")
     * @param {string} s_path - kernel_list를 통해 얻은 장치 경로
     * @returns {Promise<number>} 할당된 장치 인덱스 (1 이상의 숫자)
     */
    kernel_open(s_category: string, s_path: string): Promise<number> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 경로 유효성 검사
            if (typeof s_path === 'undefined' || s_path === "") {
                return reject(this._get_error_object('en_e_server_unsupport_data'));
            }

            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 3. 매니저(0) 채널 핸들러 설정
            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            // 4. 비동기 대기열 등록 (매니저 채널 0 사용)
            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: "kernel_open",
                resolve,
                reject
            });

            // 5. 오픈 요청 패킷 생성
            const action_code = _type_action_code.KERNEL_OPERATION;
            const s_command = `open ${s_category}`;

            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                this.const_n_undefined_device_index, // 아직 인덱스가 없으므로 undefined 상수 사용
                action_code,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command, String(s_path)]
            );

            // 6. 서버로 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @description 점유 중인 장치를 닫고 리소스를 반환합니다.
     * @param {number} n_device_index - 닫을 장치의 인덱스 (0보다 커야 함)
     * @param {string} s_category - 카테고리 (보통 "device")
     * @returns {Promise<string[]>} 성공 시 ["success"] 반환
     */
    kernel_close(n_device_index: number, s_category: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 및 파라미터 유효성 검사
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            
            if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));

            // 2. 해당 장치 채널의 이벤트 핸들러 설정
            this._websocket.onerror = (evt) => this._on_def_error(n_device_index, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(n_device_index, evt);

            // 3. 비동기 응답 대기열 등록
            this._push_promise_parameter(n_device_index, {
                n_device_index,
                method: "kernel_close",
                resolve,
                reject
            });

            // 4. 장치 닫기 패킷 생성
            const s_command = `close ${s_category}`;
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                _type_action_code.KERNEL_OPERATION,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [s_command]
            );

            // 5. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @description 서버에 펌웨어 업로드를 위한 임시 파일을 생성합니다.
     */
    async file_firmware_create(): Promise<any> {
        return this._execute_file_op(["firmware", "create"], "file_create");
    }

    /**
     * @public
     * @description 서버의 임시 펌웨어 파일을 삭제합니다.
     */
    async file_firmware_delete(): Promise<any> {
        return this._execute_file_op(["firmware", "delete"], "file_delete");
    }

    /**
     * @private
     * @description 공통 파일 오퍼레이션 로직
     */
    private _execute_file_op(data_payload: string[], method_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));

            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: method_name,
                resolve,
                reject
            });

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                _type_action_code.FILE_OPERATION, // 파일 오퍼레이션 코드
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                data_payload
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @description 서버 파일 시스템 조작을 위한 범용 함수
     * @param {'create' | 'open' | 'close' | 'delete' | 'truncate' } mode - 수행할 작업 (생성 또는 열기)
     * @param {string | undefined} s_file_name - 대상 파일 이름
     */
    private async _handle_file_request(
        mode: 'create' | 'open' | 'close' | 'delete' | 'truncate'
        , s_file_name: string | undefined
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));

            // 채널 0번(매니저) 핸들러 바인딩
            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: `file_${mode}`,
                resolve,
                reject
            });

            if(s_file_name == undefined){
                const json_packet = this._generate_request_packet(
                    _type_packet_owner.MANAGER,
                    this.const_n_undefined_device_index,
                    _type_action_code.FILE_OPERATION,
                    0, 0,
                    _type_data_field_type.STRING_OR_STRING_ARRAY,
                    [mode] // ["close"], ["truncate"]
                );

                this._websocket.send(JSON.stringify(json_packet));
            }
            else{
                const json_packet = this._generate_request_packet(
                    _type_packet_owner.MANAGER,
                    this.const_n_undefined_device_index,
                    _type_action_code.FILE_OPERATION,
                    0, 0,
                    _type_data_field_type.STRING_OR_STRING_ARRAY,
                    // ["create", "test.log"] 또는 ["open", "test.log"]
                    // ["delete", "test.log"]
                    [mode, s_file_name] 
                );

                this._websocket.send(JSON.stringify(json_packet));
            }
        });
    }


    /**
     * @public
     * @description 서버 파일 시스템 조작을 위한 범용 함수
     * @param {'size' | 'list' } mode - 수행할 작업 (생성 또는 열기)
     */
    private async _handle_file_get_request( mode: 'size' | 'list' ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet) 
                return reject(this._get_error_object('en_e_server_connect'));
            if (this._websocket == null) 
                return reject(this._get_error_object('en_e_server_connect'));

            // 채널 0번(매니저) 핸들러 바인딩
            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: `file_get_${mode}`,
                resolve,
                reject
            });

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                _type_action_code.FILE_OPERATION,
                0, 0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                // ["create", "test.log"] 또는 ["open", "test.log"]
                // ["delete", "test.log"]
                ["get", mode] 
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    // 개별 익스포트 함수
    public file_create = (name: string) => this._handle_file_request('create', name);
    public file_open = (name: string) => this._handle_file_request('open', name);    
    public file_close = () => this._handle_file_request('close',undefined);
    public file_delete = (name: string) => this._handle_file_request('delete',undefined);    
    public file_truncate = () => this._handle_file_request('truncate',undefined);    
    public file_get_size = () => this._handle_file_get_request('size');    
    public file_get_list = () => this._handle_file_get_request('list');    

    /**
     * @public
     * @description 현재 열린 파일 끝에 데이터를 추가합니다.
     * @param {string} s_hex_string - 추가할 데이터 (16진수 문자열 예: "01 0A FF")
     * @returns {Promise<any>}
     */
    public async file_append(s_hex_string : string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!coffee._b_connet){
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null){
                return reject(this._get_error_object('en_e_server_connect'));
            }

            this._websocket.onerror = (evt) => this._on_def_error(0, evt);
            this._websocket.onmessage = (evt) => this._on_def_message_json_format(0, evt);

            this._push_promise_parameter(0, {
                n_device_index: 0,
                method: "file_append",
                resolve,
                reject
            });

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                _type_action_code.FILE_OPERATION,
                0, 0,
                _type_data_field_type.HEX_STRING, // 16진수 문자열 타입 지정
                String(s_hex_string)
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /** * @public 
     * @async
     * @function file_Copy_callback
     * @param {File} file_src - 복사할 소스 파일 객체.
     * @param {string} s_virtual_file_path_dst - 대상 가상 드라이브 파일 전체 경로.
     * @param {number} n_packet_size - 한 번에 전송할 패킷 크기 (Byte 단위).
     * @param {Function} cb_progress - 진행 상황을 알리는 콜백 함수.
     * @returns {boolean} 프로세스 시작 성공 여부.
     */
    public file_Copy_callback(
        file_src: File, 
        s_virtual_file_path_dst: string, 
        n_packet_size: number, 
        cb_progress: (b_result: boolean, n_progress: number, n_file_size: number, s_message: string) => void
    ): boolean {
        
        // 1. 목적지 경로 유효성 검사
        if (typeof s_virtual_file_path_dst !== 'string') {
            return false;
        }

        const this_obj = this;

        // 2. 서버에 파일 생성 요청
        this.file_create(s_virtual_file_path_dst)
            .then((s_rx: any) => {
                let b_result = false;

                // 3. 응답 결과 검증 (기존 do-while 로직 유지)
                do {
                    if (!Array.isArray(s_rx)) {
                        continue;
                    }
                    if (s_rx === null) {
                        continue;
                    } else if (s_rx[0] !== "success") { // 보통 배열의 첫 번째 요소가 결과 상태임
                        continue;
                    }
                    b_result = true;
                } while (false);

                if (b_result) {
                    console.log(" ++ file_Copy::file_create : Success");
                    // 4. 실제 데이터 분할 전송 시작
                    this._load_and_append_file(this_obj, file_src, n_packet_size, cb_progress);
                } else {
                    console.log(" -- file_Copy::file_create : Fail");
                    if (typeof cb_progress === 'function') {
                        cb_progress(false, -1, file_src.size, "file_create fail");
                    }
                }
            })
            .catch((event_error: Error) => {
                // 5. 예외 발생 처리
                console.log("-file_Copy_callback::file_create Error : " + event_error);
                if (typeof cb_progress === 'function') {
                    cb_progress(false, -1, file_src.size, event_error.message);
                }
            });

        // 비동기 작업이 시작되었음을 알림
        return true;
    }

    private _is_success_rx(rx : string[]) : boolean{
        let b_result : boolean =false;
        do{
            if (!Array.isArray(rx)) {
                continue;
            }
            else if( rx[0] != "success" ){
                continue;
            }
            b_result = true;
        }while(false);
        return b_result;
    }

    /**
     * @public
     * @async
     * @function file_Copy_small_size
     * @param {File} file_src - 복사할 소스 파일 (200KB 이하 권장).
     * @param {string} s_virtual_file_path_dst - 대상 가상 드라이브 파일 경로.
     * @returns {Promise<string>} 성공 시 "success" 반환, 실패 시 에러 reject.
     */
    public async file_Copy_small_size(file_src: File, s_virtual_file_path_dst: string): Promise<string> {
        try {
            // 1. 서버에 파일 생성
            const create_rx = await this.file_create(s_virtual_file_path_dst);
            if (!this._is_success_rx(create_rx)) {
                throw new Error("file_create fail");
            }
            console.log(" ++ file_Copy_small_size::file_create : Success");

            // 2. 로컬 파일 읽기 (ArrayBuffer)
            const arrayBuffer = await this._promise_load_file(file_src);
            
            // 3. 바이너리 데이터를 Hex String으로 변환
            const bytes = new Uint8Array(arrayBuffer);
            let s_hex_total = "";
            for (let i = 0; i < bytes.byteLength; i++) {
                let s_hex = bytes[i].toString(16);
                s_hex_total += s_hex.padStart(2, '0'); // 한 자리 수일 경우 앞에 0 추가
            }
            console.log(" ++ file_Copy_small_size::load_file : Success");

            // 4. 변환된 데이터를 서버 파일에 추가(기록)
            const append_rx = await this.file_append(s_hex_total);
            if (!this._is_success_rx(append_rx)) {
                throw new Error("file_append fail");
            }
            console.log(" ++ file_Copy_small_size::file_append : Success");

            // 5. 파일 핸들 닫기
            const close_rx = await this.file_close();
            if (!this._is_success_rx(close_rx)) {
                throw new Error("file_close fail");
            }
            console.log(" ++ file_Copy_small_size::file_close : Success");

            return "success";

        } catch (error) {
            console.error("- file_Copy_small_size Error:", error);
            throw error;
        }
    }

    /** 
     * @public 
     * @async
     * @function file_Copy_firmware_callback
     * @param {File} file_src - 전송할 펌웨어 소스 파일.
     * @param {number} n_packet_size - 한 번에 전송할 패킷 크기 (Byte).
     * @param {Function} cb_progress - 진행 상황을 전달받을 콜백 함수.
     * @returns {boolean} 전송 프로세스 시작 여부.
     * * @description 펌웨어 파일을 서버의 임시 가상 드라이브 영역으로 복사합니다.
     */
    public file_Copy_firmware_callback(
        file_src: File, 
        n_packet_size: number, 
        cb_progress: (b_result: boolean, n_progress: number, n_file_size: number, s_message: string) => void
    ): boolean {
        const this_obj = this;

        // 1. 펌웨어 전용 임시 파일 생성 요청
        this.file_firmware_create()
            .then((s_rx: any) => {
                if (this_obj._is_success_rx(s_rx)) {
                    console.log(" ++ file_Copy_firmware_callback::file_firmware_create : Success");
                    // 2. 실제 데이터 스트리밍 시작
                    this_obj._load_and_append_file(this_obj, file_src, n_packet_size, cb_progress);
                } 
                else {
                    console.log(" -- file_Copy_firmware_callback::file_firmware_create : Fail");
                    if (typeof cb_progress === 'function') {
                        cb_progress(false, -1, file_src.size, "file_firmware_create fail");
                    }
                }
            })
            .catch((event_error: Error) => {
                console.error("-file_Copy_firmware_callback::file_firmware_create Error : " + event_error.message);
                if (typeof cb_progress === 'function') {
                    cb_progress(false, -1, file_src.size, event_error.message);
                }
            });

        // 비동기 루틴이 시작되었음을 즉시 반환
        return true;
    }

    /**
     * @public
     * @async
     * @function advance_set_session_name
     * @param {string} s_session_name - 설정할 세션 이름.
     * @returns {Promise<any>} 성공 시 서버의 응답 데이터와 함께 resolve, 실패 시 Error 객체와 함께 reject.
     * @description 현재 연결된 세션의 이름을 설정합니다.
     */
    public advance_set_session_name(s_session_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 동작 코드 및 이벤트 핸들러 설정
            const action_code = _type_action_code.ADVANCE_OPERATION;

            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 3. 응답 처리를 위한 파라미터 저장
            const parameter = {
                n_device_index: 0,
                method: "advance_set_session_name",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 4. 요청 패킷 생성
            // 데이터 필드 타입: STRING_OR_STRING_ARRAY
            // 데이터 내용: ["set_session_name", 세션이름]
            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                ["set_session_name", String(s_session_name)]
            );

            // 5. 전송
            const s_json_packet = JSON.stringify(json_packet);
            this._websocket.send(s_json_packet);
        });
    }

    /**
     * @public
     * @async
     * @function advance_get_session_name
     * @returns {Promise<any>} 성공 시 현재 세션 이름을 resolve, 실패 시 Error 객체를 reject.
     * @description 현재 연결된 세션의 이름을 조회합니다.
     */
    public advance_get_session_name(): Promise<any> {
        return new Promise((resolve, reject) => {
            // 1. WebSocket 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 동작 코드 설정 (고급 관리 작업)
            const action_code = _type_action_code.ADVANCE_OPERATION;

            // 3. 이벤트 핸들러 등록 (WebSocket 공통 핸들러 사용)
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 4. 비동기 처리를 위한 파라미터 큐잉
            const parameter = {
                n_device_index: 0,
                method: "advance_get_session_name",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 5. 요청 패킷 생성
            // 데이터 필드 내용: ["get_session_name"] 키워드만 전달
            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                ["get_session_name"]
            );

            // 6. 서버로 전송
            const s_json_packet = JSON.stringify(json_packet);
            this._websocket.send(s_json_packet);
        });
    }

    /**
     * @public
     * @async
     * @function advance_send_data_to_session
     * @param {string} s_target_session_name - 메시지를 받을 대상 세션의 이름.
     * @param {string[]} sa_data - 전송할 데이터 배열 (문자열 배열).
     * @returns {Promise<any>} 성공 시 서버의 에코 데이터를 resolve, 실패 시 Error 객체를 reject.
     * @description 대상 세션으로 데이터를 전송합니다.
     */
    public advance_send_data_to_session(s_target_session_name: string, sa_data: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            // 1. 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 동작 코드 설정
            const action_code = _type_action_code.ADVANCE_OPERATION;

            // 3. 이벤트 핸들러 설정
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 4. 비동기 결과 처리를 위한 파라미터 저장
            const parameter = {
                n_device_index: 0,
                method: "advance_send_data_to_session",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 5. 요청 패킷 생성
            // 데이터 구조: ["send_data_to_session", 대상세션명, 데이터1, 데이터2, ...]
            const data_payload = ["send_data_to_session", s_target_session_name].concat(sa_data);

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                data_payload
            );

            // 6. JSON 직렬화 및 전송
            const s_json_packet = JSON.stringify(json_packet);
            this._websocket.send(s_json_packet);
        });
    }

    /**
     * @public
     * @async
     * @function advance_send_data_to_all
     * @param {string | string[]} sa_data - 전송할 데이터 (단일 문자열 또는 문자열 배열).
     * @returns {Promise<any>} 성공 시 서버의 응답 데이터를 resolve, 실패 시 Error 객체를 reject.
     * @description 현재 세션을 제외한 모든 세션에 데이터를 브로드캐스트합니다.
     */
    public advance_send_data_to_all(sa_data: string | string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            // 1. 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 공통 설정
            const action_code = _type_action_code.ADVANCE_OPERATION;

            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 3. 비동기 처리를 위한 파라미터 저장
            const parameter = {
                n_device_index: 0,
                method: "advance_send_data_to_all",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 4. 패킷 생성 로직 (데이터 타입에 따른 처리)
            let data_payload: string[];
            if (Array.isArray(sa_data)) {
                // 배열인 경우 concat으로 병합
                data_payload = ["send_data_to_all"].concat(sa_data);
            } else {
                // 단일 문자열인 경우 배열 형태로 구성
                data_payload = ["send_data_to_all", sa_data];
            }

            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                data_payload
            );

            // 5. 서버 전송
            const s_json_packet = JSON.stringify(json_packet);
            this._websocket.send(s_json_packet);
        });
    }

    /**
     * @public
     * @async
     * @function get_device_list
     * @param {string} [s_filter] - 대상 USB 장치를 찾기 위한 필터 문자열.
     * <br />형식: "class#vid_xxxx&pid_yyyy&mi_zz" (예: "hid#vid_134b")
     * @returns {Promise<string[]>} 성공 시 장치 경로(Device Path) 배열을 반환.
     * @description 서버에서 관리 중인 연결된 장치 리스트를 가져옵니다.
     */
    public get_device_list(s_filter : string | undefined): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 기본값은 "hid" 클래스로 설정
            let s_used_filter = "hid";
            const action_code = _type_action_code.DEVICE_LIST;

            if (typeof s_filter == 'string') {
                s_used_filter = s_filter;
            }

            // 2. 이벤트 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 3. 응답 매칭 정보 저장 (Index 0은 매니저 공용 인덱스로 사용됨)
            const parameter = {
                n_device_index: 0,
                method: "get_device_list",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 4. 요청 패킷 생성 및 전송
            // 이 요청의 소유자는 개별 DEVICE가 아닌 MANAGER입니다.
            const json_packet = this._generate_request_packet(
                _type_packet_owner.MANAGER,
                this.const_n_undefined_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                [String(s_used_filter)]
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @async
     * @function device_open
     * @param {string} s_path - 장치의 고유 경로 (Device Path).
     * @param {boolean} b_shared - 공유 모드 활성화 여부.
     * @returns {Promise<number>} 성공 시 0이 아닌 장치 인덱스(n_device_index)를 resolve.
     * @description 서버에 해당 장치의 오픈을 요청합니다. 반환된 인덱스가 0이면 에러로 간주해야 합니다.
     */
    public device_open(s_path: string, b_shared: boolean): Promise<number> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 및 유효성 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            const action_code = _type_action_code.DEVICE_OPEN;

            // 2. 웹소켓 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(0, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(0, evt);
            };

            // 3. 응답 대기를 위한 파라미터 저장
            const parameter = {
                n_device_index: 0,
                method: "device_open",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(0, parameter);

            // 4. 요청 패킷 구성 (공유 모드 여부에 따른 처리)
            let json_packet;

            if (b_shared) {
                // 공유 모드일 경우: 특수 문자열 처리("::" -> ":") 및 "share" 플래그 추가
                const s_processed_path = String(s_path).replace(/::/g, ':');
                
                json_packet = this._generate_request_packet(
                    _type_packet_owner.DEVICE,
                    this.const_n_undefined_device_index,
                    action_code,
                    0,
                    0,
                    _type_data_field_type.STRING_OR_STRING_ARRAY,
                    [s_processed_path, "share"]
                );
            } else {
                // 단독 모드일 경우: 경로 문자열만 전송
                json_packet = this._generate_request_packet(
                    _type_packet_owner.DEVICE,
                    this.const_n_undefined_device_index,
                    action_code,
                    0,
                    0,
                    _type_data_field_type.STRING_OR_STRING_ARRAY,
                    String(s_path)
                );
            }

            // 5. 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @async
     * @function device_close
     * @param {number} n_device_index - 닫으려는 장치의 인덱스 번호 (0보다 커야 함).
     * @returns {Promise<string>} 성공 시 "success" 문자열을 resolve.
     * @description 서버에 특정 장치의 클로즈를 요청합니다.
     */
    public device_close(n_device_index: number): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 및 파라미터 유효성 검사
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // 2. 파라미터 유효성 검사
            if (n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            const action_code = _type_action_code.DEVICE_CLOSE;

            // 2. 이벤트 핸들러 등록 (특정 장치 인덱스 전달)
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 3. 응답 매칭을 위해 파라미터 큐에 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_close",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 4. 요청 패킷 생성 및 전송
            // Close 명령은 추가 데이터 필드 없이 장치 인덱스만으로 동작함
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                0,
                0,
                _type_data_field_type.STRING_OR_STRING_ARRAY
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @async
     * @function device_send
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_out_id - HID의 경우 Report ID, WinUSB의 경우 Endpoint 번호 (0~255).
     * @param {string} s_hex_string - 전송할 데이터의 16진수 문자열 (예: "FF 01 02" 또는 "FF0102").
     * @returns {Promise<string>} 성공 시 "success"를 resolve, 실패 시 Error 객체 또는 "error"/"cancel"을 reject/resolve.
     * @description 16진수 문자열 데이터를 장치로 전송합니다.
     */
    public device_send(n_device_index: number, n_out_id: number, s_hex_string: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. WebSocket 연결 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            const action_code = _type_action_code.DEVICE_SEND;

            // 2. 파라미터 유효성 검사
            if (n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            // n_out_id는 1바이트(0~255) 범위여야 함
            if (typeof n_out_id !== 'number' || n_out_id < 0 || n_out_id > 0xff) {
                return reject(this._get_error_object('en_e_device_out_id'));
            }

            if (typeof s_hex_string !== 'string') {
                return reject(this._get_error_object('en_e_server_data_field_format'));
            }

            // 3. 이벤트 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 4. 비동기 응답 매칭을 위한 파라미터 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_send",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 5. 요청 패킷 생성 (HEX_STRING 타입 사용)
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                0,            // n_in_id (보통 send에서는 사용 안 함)
                n_out_id,     // Report ID 또는 Endpoint
                _type_data_field_type.HEX_STRING,
                String(s_hex_string)
            );

            // 6. JSON 직렬화 및 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @async
     * @function device_receive
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - HID의 경우 In Report ID, WinUSB의 경우 In End-point 번호 (0~255).
     * @returns {Promise<string>} 성공 시 구분자 없는 16진수 문자열(hex string)을 resolve.
     * @description 장치로부터 데이터를 수신합니다. 결과는 16진수 문자열 형태로 반환됩니다.
     */
    public device_receive(n_device_index: number, n_in_id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            const action_code = _type_action_code.DEVICE_RECEIVE;

            // 2. 파라미터 유효성 검사
            if (n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
                return reject(this._get_error_object('en_e_device_in_id'));
            }

            // 3. 이벤트 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 4. 비동기 응답 매칭을 위한 파라미터 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_receive",
                resolve: resolve,
                reject: reject,
                cb_received: undefined,     // 명시적 undefined
                cb_error: undefined,
                cb_progress: undefined,
                b_device_index: undefined                
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 5. 요청 패킷 생성
            // 수신 요청이므로 n_in_id를 설정하고 데이터 필드는 비워둡니다.
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                n_in_id,      // In Report ID 또는 In End-point
                0,            // n_out_id (수신 시 사용 안 함)
                _type_data_field_type.HEX_STRING
            );

            // 6. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @function device_receive_with_callback
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - HID의 In Report ID 또는 WinUSB의 In End-point 번호.
     * @param {Function} cb_received - 데이터 수신 시 호출될 콜백 (hex_string: string 전달).
     * @param {Function} cb_error - 에러 발생 시 호출될 콜백 (error: Error 전달).
     * @param {boolean} [b_need_device_index] - 콜백의 첫 번째 인자로 n_device_index를 포함할지 여부.
     * @returns {boolean} 프로세스 시작 성공 시 true, 실패 시 false.
     * @description 콜백 방식을 통해 지속적으로 장치 데이터를 수신합니다. 
     * 단, 송수신이 한 쌍으로 이루어지는 프로토콜(Pair type)에서는 사용을 권장하지 않습니다.
     */
    public device_receive_with_callback(
        n_device_index: number, 
        n_in_id: number, 
        cb_received: type_cb_received, 
        cb_error: type_cb_error, 
        b_need_device_index?: boolean
    ): boolean {
        let b_result = false;
        let b_device_index = false;

        // 1. 파라미터 유효성 검사
        if (typeof b_need_device_index === 'boolean' && b_need_device_index === true) {
            b_device_index = true;
        }

        if (typeof cb_received !== 'function' || typeof cb_error !== 'function') {
            return false;
        }

        if (!coffee._b_connet) return false;

        if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
            return false;
        }

        if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
            return false;
        }


        if (this._websocket == null) {
            return false;
        }

        const action_code = _type_action_code.DEVICE_RECEIVE;

        // 2. 웹소켓 핸들러 등록
        this._websocket.onerror = (evt: Event) => {
            this._on_def_error(n_device_index, evt);
        };

        this._websocket.onmessage = (evt: MessageEvent) => {
            this._on_def_message_json_format(n_device_index, evt);
        };

        // 3. 콜백 정보 저장
        // Promise 대신 콜백 함수들을 파라미터 큐에 저장합니다.
        const parameter = {
            n_device_index: n_device_index,
            method: "device_receive",
            resolve: null, // Promise를 사용하지 않으므로 null
            reject: null,
            cb_received: cb_received,
            cb_error: cb_error,
            b_device_index: b_device_index
        };
        this._push_promise_parameter(n_device_index, parameter);

        // 4. 요청 패킷 전송
        const json_packet = this._generate_request_packet(
            _type_packet_owner.DEVICE,
            n_device_index,
            action_code,
            n_in_id,
            0,
            _type_data_field_type.HEX_STRING
        );

        this._websocket.send(JSON.stringify(json_packet));
        b_result = true;

        return b_result;
    }

    /**
     * @public
     * @async
     * @function device_transmit
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - (수신용) HID In Report ID 또는 WinUSB In End-point.
     * @param {number} n_out_id - (송신용) HID Out Report ID 또는 WinUSB Out End-point.
     * @param {string} s_hex_string - 전송할 16진수 문자열 데이터.
     * @returns {Promise<string>} 성공 시 수신된 데이터(Hex String)를 resolve.
     * @description 데이터를 전송한 후 즉시 응답을 수신합니다. 
     * 송수신 쌍(Send-Receive pair) 타입의 프로토콜일 경우 반드시 이 메소드를 사용해야 합니다.
     */
    public device_transmit(
        n_device_index: number, 
        n_in_id: number, 
        n_out_id: number, 
        s_hex_string: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            const action_code = _type_action_code.DEVICE_TRANSMIT;

            // 2. 파라미터 유효성 검사 (Index, In ID, Out ID, Hex String)
            if (n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
                return reject(this._get_error_object('en_e_device_in_id'));
            }

            if (typeof n_out_id !== 'number' || n_out_id < 0 || n_out_id > 0xff) {
                return reject(this._get_error_object('en_e_device_out_id'));
            }

            if (typeof s_hex_string !== 'string') {
                return reject(this._get_error_object('en_e_server_data_field_format'));
            }

            // 3. 이벤트 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 4. 비동기 처리를 위한 파라미터 큐 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_transmit",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 5. 요청 패킷 생성 (송수신 ID를 모두 포함)
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                n_in_id,
                n_out_id,
                _type_data_field_type.HEX_STRING,
                String(s_hex_string)
            );

            // 6. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @function device_transmit_with_callback
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - (수신용) HID In Report ID 또는 WinUSB In End-point.
     * @param {number} n_out_id - (송신용) HID Out Report ID 또는 WinUSB Out End-point.
     * @param {string} s_hex_string - 전송할 16진수 문자열 데이터.
     * @param {Function} fun_cb_received - 데이터 수신 시 호출될 콜백 (hex_string 전달).
     * @param {Function} fun_cb_error - 에러 발생 시 호출될 콜백 (Error 객체 전달).
     * @param {boolean} [b_need_device_index] - 콜백의 첫 번째 인자로 n_device_index를 포함할지 여부.
     * @returns {boolean} 프로세스 시작 성공 시 true, 실패 시 false.
     * @description 전송 후 수신(Transmit) 동작을 콜백 방식으로 수행합니다.
     */
    public device_transmit_with_callback(
        n_device_index: number,
        n_in_id: number,
        n_out_id: number,
        s_hex_string: string,
        fun_cb_received: type_cb_received,
        fun_cb_error: type_cb_error,
        b_need_device_index?: boolean
    ): boolean {
        let b_result = false;
        let b_device_index = false;

        // 1. 파라미터 유효성 검사
        if (typeof b_need_device_index === 'boolean' && b_need_device_index === true) {
            b_device_index = true;
        }

        if (typeof fun_cb_received !== 'function' || typeof fun_cb_error !== 'function') {
            return false;
        }

        if (!coffee._b_connet){
            return false;
        }
        if (this._websocket == null) {
            return false;
        }

        const action_code = _type_action_code.DEVICE_TRANSMIT;

        if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
            return false;
        }

        if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
            return false;
        }

        if (typeof n_out_id !== 'number' || n_out_id < 0 || n_out_id > 0xff) {
            return false;
        }

        if (typeof s_hex_string !== 'string') {
            return false;
        }

        // 2. 웹소켓 핸들러 등록
        this._websocket.onerror = (evt: Event) => {
            this._on_def_error(n_device_index, evt);
        };

        this._websocket.onmessage = (evt: MessageEvent) => {
            this._on_def_message_json_format(n_device_index, evt);
        };

        // 3. 콜백 파라미터 큐 저장
        const parameter = {
            n_device_index: n_device_index,
            method: "device_transmit", // 내부 매칭을 위해 device_transmit 사용
            resolve: null,
            reject: null,
            cb_received: fun_cb_received,
            cb_error: fun_cb_error,
            undefined,
            b_device_index: b_device_index
        };
        this._push_promise_parameter(n_device_index, parameter);

        // 4. 요청 패킷 생성 및 전송
        const json_packet = this._generate_request_packet(
            _type_packet_owner.DEVICE,
            n_device_index,
            action_code,
            n_in_id,
            n_out_id,
            _type_data_field_type.HEX_STRING,
            String(s_hex_string)
        );

        this._websocket.send(JSON.stringify(json_packet));
        b_result = true;

        return b_result;
    }

    /**
     * @public
     * @async
     * @function device_cancel
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - 취소할 작업의 In ID (HID Report ID 또는 End-point).
     * @param {number} n_out_id - 취소할 작업의 Out ID.
     * @returns {Promise<string>} 성공 시 "success", 실패 시 "error" 또는 Error 객체 반환.
     * @description 서버에서 대기 중인 현재 장치 작업을 취소합니다.
     */
    public device_cancel(n_device_index: number, n_in_id: number, n_out_id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 상태 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            const action_code = _type_action_code.DEVICE_CANCEL;

            // 2. 파라미터 유효성 검사
            if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
                return reject(this._get_error_object('en_e_device_in_id'));
            }

            if (typeof n_out_id !== 'number' || n_out_id < 0 || n_out_id > 0xff) {
                return reject(this._get_error_object('en_e_device_out_id'));
            }

            // 3. 이벤트 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 4. 요청 매칭을 위한 파라미터 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_cancel",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 5. 취소 요청 패킷 생성 및 전송
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                n_in_id,
                n_out_id,
                _type_data_field_type.HEX_STRING
            );

            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @function device_cancel_with_callback
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - 취소할 작업의 In ID.
     * @param {number} n_out_id - 취소할 작업의 Out ID.
     * @param {Function} cb_received - 취소 성공 시 호출될 콜백 (보통 "success" 문자열 전달).
     * @param {Function} cb_error - 에러 발생 시 호출될 콜백 (Error 객체 전달).
     * @param {boolean} [b_need_device_index] - 콜백 인자에 장치 인덱스를 포함할지 여부.
     * @returns {boolean} 취소 프로세스 시작 성공 시 true, 실패 시 false.
     * @description 콜백 방식을 통해 현재 진행 중인 장치 작업을 중단합니다.
     */
    public device_cancel_with_callback(
        n_device_index: number,
        n_in_id: number,
        n_out_id: number,
        cb_received: type_cb_received,
        cb_error: type_cb_error,
        b_need_device_index?: boolean
    ): boolean {
        let b_result = false;
        let b_device_index = false;

        // 1. 옵션 파라미터 체크
        if (typeof b_need_device_index === 'boolean' && b_need_device_index === true) {
            b_device_index = true;
        }

        // 2. 필수 콜백 유효성 검사
        if (typeof cb_received !== 'function' || typeof cb_error !== 'function') {
            return false;
        }

        // 3. 서버 연결 확인
        if (!coffee._b_connet){
            return false;
        }
        if (this._websocket == null) {
            return false;
        }

        const action_code = _type_action_code.DEVICE_CANCEL;

        // 4. 장치 및 ID 유효성 검사
        if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
            return false;
        }
        if (typeof n_in_id !== 'number' || n_in_id < 0 || n_in_id > 0xff) {
            return false;
        }
        if (typeof n_out_id !== 'number' || n_out_id < 0 || n_out_id > 0xff) {
            return false;
        }

        // 5. 웹소켓 핸들러 갱신
        this._websocket.onerror = (evt: Event) => {
            this._on_def_error(n_device_index, evt);
        };
        this._websocket.onmessage = (evt: MessageEvent) => {
            this._on_def_message_json_format(n_device_index, evt);
        };

        // 6. 비동기 응답 매칭을 위한 파라미터 저장
        const parameter = {
            n_device_index: n_device_index,
            method: "device_cancel", // 내부적으로는 cancel 로직 공유
            resolve: null,
            reject: null,
            cb_received: cb_received,
            cb_error: cb_error,
            b_device_index: b_device_index
        };
        this._push_promise_parameter(n_device_index, parameter);

        // 7. 취소 요청 패킷 생성 및 전송
        const json_packet = this._generate_request_packet(
            _type_packet_owner.DEVICE,
            n_device_index,
            action_code,
            n_in_id,
            n_out_id,
            _type_data_field_type.HEX_STRING
        );

        this._websocket.send(JSON.stringify(json_packet));
        b_result = true;

        return b_result;
    }

    /**
     * @public
     * @async
     * @function device_update_set_parameter
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {string} s_key - 설정할 파라미터의 키 이름 (예: "baudrate", "path").
     * @param {string} s_value - 설정할 파라미터의 값.
     * @returns {Promise<string>} 성공 시 "success", 실패 시 "error" 또는 Error 객체 반환.
     * @description 펌웨어 업데이트를 위한 부트로더 파라미터를 설정합니다.
     */
    public device_update_set_parameter(
        n_device_index: number, 
        s_key: string, 
        s_value: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // 1. 서버 연결 확인
            if (!coffee._b_connet) {
                return reject(this._get_error_object('en_e_server_connect'));
            }
            if (this._websocket == null) {
                return reject(this._get_error_object('en_e_server_connect'));
            }

            // action_code가 일반 전송이 아닌 BOOTLOADER 전용임을 유의
            const action_code = _type_action_code.DEVICE_BOOTLOADER;

            // 2. 파라미터 유효성 검사
            if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
                return reject(this._get_error_object('en_e_device_index'));
            }

            // 3. 웹소켓 핸들러 등록
            this._websocket.onerror = (evt: Event) => {
                this._on_def_error(n_device_index, evt);
            };

            this._websocket.onmessage = (evt: MessageEvent) => {
                this._on_def_message_json_format(n_device_index, evt);
            };

            // 4. 비동기 응답 매칭 정보 저장
            const parameter = {
                n_device_index: n_device_index,
                method: "device_update_set_parameter",
                resolve: resolve,
                reject: reject
            };
            this._push_promise_parameter(n_device_index, parameter);

            // 5. 요청 패킷 생성
            // 데이터 필드 타입이 STRING_OR_STRING_ARRAY이며 배열 형태로 전달됩니다.
            const json_packet = this._generate_request_packet(
                _type_packet_owner.DEVICE,
                n_device_index,
                action_code,
                0, // n_in_id (부트로더 설정 시에는 대개 0)
                0, // n_out_id
                _type_data_field_type.STRING_OR_STRING_ARRAY,
                ["set", String(s_key), String(s_value)]
            );

            // 6. 서버 전송
            this._websocket.send(JSON.stringify(json_packet));
        });
    }

    /**
     * @public
     * @function device_update_start_with_callback
     * @param {number} n_device_index - 대상 장치의 인덱스 번호.
     * @param {number} n_in_id - 통신용 In ID (HID Report ID 등).
     * @param {number} n_out_id - 통신용 Out ID.
     * @param {Function} cb_progress - 업데이트 진행 상태를 수신할 콜백 함수.
     * @returns {boolean} 업데이트 프로세스 시작 성공 시 true, 실패 시 false.
     * @description 펌웨어 업데이트를 시작합니다. 이 작업은 취소할 수 없습니다.
     */
    public device_update_start_with_callback(
        n_device_index: number,
        n_in_id: number,
        n_out_id: number,
        cb_progress: (b_result: boolean, n_current: number, n_total: number, s_msg: string) => void
    ): boolean {
        let b_result = false;

        // 1. 서버 연결 확인
        if (!coffee._b_connet) return false;

        const action_code = _type_action_code.DEVICE_BOOTLOADER;

        // 2. 파라미터 유효성 검사
        if (typeof n_device_index !== 'number' || n_device_index === this.const_n_undefined_device_index) {
            return false;
        }
        if (this._websocket == null) {
            return false;
        }

        // 3. 웹소켓 핸들러 등록
        this._websocket.onerror = (evt: Event) => {
            this._on_def_error(n_device_index, evt);
        };
        this._websocket.onmessage = (evt: MessageEvent) => {
            this._on_def_message_json_format(n_device_index, evt);
        };

        // 4. 진행 상태 관리를 위한 콜백 저장
        // 내부적으로 "device_update_start" 키를 사용하여 서버 응답을 라우팅합니다.
        const parameter = {
            n_device_index: n_device_index,
            method: "device_update_start",
            resolve: null,
            reject: null,
            cb_received : undefined,
            cb_error : undefined,
            cb_progress: cb_progress,
            b_device_index : undefined
        };
        this._push_promise_parameter(n_device_index, parameter);

        // 5. 업데이트 시작 요청 패킷 전송
        // 데이터 필드에 ["start"] 배열을 담아 보냅니다.
        const json_packet = this._generate_request_packet(
            _type_packet_owner.DEVICE,
            n_device_index,
            action_code,
            n_in_id,
            n_out_id,
            _type_data_field_type.STRING_OR_STRING_ARRAY,
            ["start"]
        );

        this._websocket.send(JSON.stringify(json_packet));
        b_result = true;

        return b_result;
    }


}//the end of class