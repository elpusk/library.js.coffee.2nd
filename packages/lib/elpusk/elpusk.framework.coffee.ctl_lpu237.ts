/**
 * 2020.10.8
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
 * 
 * @author developer 00000006
 * @copyright Elpusk.Co.,Ltd 2025
 * @version 1.7.0
 * @description lpu237 controller of elpusk framework coffee typescript library.
 */

'use strict';

import { coffee, type_cb_error, type_cb_received } from './elpusk.framework.coffee';
import { lpu237 } from './elpusk.device.usb.hid.lpu237';
import { util } from './elpusk.util';

/**
 * @readonly
 * @enum {number}
 */
enum _type_status {
    ST_UNDEFINED = -1,
    ST_IDLE = 0,
    ST_WAIT_RSP = 1,
    ST_WAIT_READ_DATA = 2,
    ST_WAIT_CANCEL = 3
}

/**
 * Parameter interface for queue
 */
interface IQueueParameter {
    server: coffee;
    device: lpu237;
    resolve?: (value: string) => void;
    reject?: (reason: Error) => void;
    b_read?: boolean;
    cb_received?: (n_device_index: number, s_data: string) => void;
    cb_error?: type_cb_error;
    cb_progress?: (n_device_index: number, stage_max: number, stage_cur: number) => void;
    stage_max?: number;
    stage_cur?: number;
}

export class ctl_lpu237{

    /**
     * map of queue of promise resolve & reject.
     */
    private _map_q_para = new Map<number, IQueueParameter[]>();

    /**
     * map of device status
     */
    private _map_status = new Map<number, _type_status>();


    /**
     * Get status
     */
    private _get_status(n_device_index: number): _type_status {
        let st = _type_status.ST_UNDEFINED;

        do {
            if (typeof n_device_index !== 'number') {
                continue;
            }
            if (n_device_index <= 0) {
                continue;
            }

            st = _type_status.ST_IDLE;
            if (!this._map_status.has(n_device_index)) {
                this._map_status.set(n_device_index, st);
                continue;
            }
            st = this._map_status.get(n_device_index)!;
        } while (false);
        return st;
    }

    /**
     * Set status
     */
    private _set_status(n_device_index: number, new_status: _type_status): void {
        do {
            if (typeof n_device_index !== 'number') {
                continue;
            }
            if (n_device_index <= 0) {
                continue;
            }
            if (typeof new_status === 'undefined') {
                continue;
            }

            switch (new_status) {
                case _type_status.ST_IDLE:
                case _type_status.ST_WAIT_RSP:
                case _type_status.ST_WAIT_READ_DATA:
                case _type_status.ST_WAIT_CANCEL:
                    break;
                default:
                    continue;
            }

            this._map_status.set(n_device_index, new_status);
        } while (false);
    }  
    

    /**
     * Generate get system info start IO
     */
    private _gen_get_sysinfo_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_sys_info: type_cb_received,
        cb_error_sys_info: type_cb_error
    ): number {
        let n_req = 0;
        let s_request: string | null = null;

        do {
            device.clear_transaction();

            n_req = device.generate_get_system_information();
            if (n_req <= 0) {
                continue;
            }
            s_request = device.get_tx_transaction();
            if (s_request === null) {
                n_req = 0;
                continue;
            }

            const b_result = server.device_transmit_with_callback(
                device.get_device_index(), 0, 0, s_request,
                cb_complete_sys_info,
                cb_error_sys_info,
                true
            );
            if (!b_result) {
                n_req = 0;
                device.clear_transaction();
                continue;
            }
        } while (false);
        return n_req;
    }

    /**
     * Generate get parameter start IO
     */
    private _gen_get_para_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_get_parameter: type_cb_received,
        cb_error_get_parameter: type_cb_error
    ): number {
        let s_request: string | null = null;
        let n_req = 0;

        do {
            device.clear_transaction();

            n_req = device.generate_get_parameters();
            if (n_req <= 0) {
                n_req = 0;
                continue;
            }

            s_request = device.get_tx_transaction();
            if (s_request === null) {
                n_req = 0;
                continue;
            }

            const b_result = server.device_transmit_with_callback(
                device.get_device_index(), 0, 0, s_request,
                cb_complete_get_parameter,
                cb_error_get_parameter,
                true
            );
            if (!b_result) {
                device.clear_transaction();
                n_req = 0;
                continue;
            }
        } while (false);
        return n_req;
    }

    /**
     * Generate set parameter start IO
     */
    private _gen_set_para_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_set_parameter: type_cb_received,
        cb_error_set_parameter: type_cb_error
    ): number {
        let s_request: string | null = null;
        let n_req = 0;

        do {
            device.clear_transaction();

            n_req = device.generate_set_parameters();
            if (n_req <= 0) {
                continue;
            }

            s_request = device.get_tx_transaction();
            if (s_request === null) {
                n_req = 0;
                continue;
            }

            const b_result = server.device_transmit_with_callback(
                device.get_device_index(), 0, 0, s_request,
                cb_complete_set_parameter,
                cb_error_set_parameter,
                true
            );
            if (!b_result) {
                device.clear_transaction();
                n_req = 0;
                continue;
            }
        } while (false);
        return n_req;
    }

    /**
     * Generate OPOS start IO
     */
    private _gen_opos_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_changed_opos: type_cb_received,
        cb_error_changed_opos: type_cb_error,
        b_read: boolean
    ): boolean {
        let b_result = false;
        let s_request: string | null = null;
        let n_req = 0;

        do {
            device.clear_transaction();

            n_req = device.generate_enable_read(b_read);
            if (n_req <= 0) {
                continue;
            }

            s_request = device.get_tx_transaction();
            if (s_request === null) {
                continue;
            }

            b_result = server.device_transmit_with_callback(
                device.get_device_index(), 0, 0, s_request,
                cb_complete_changed_opos,
                cb_error_changed_opos,
                true
            );
            if (!b_result) {
                device.clear_transaction();
                continue;
            }

            b_result = true;
        } while (false);
        return b_result;
    }

    /**
     * Cancel start IO
     */
    private _cancel_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_cancel: type_cb_received,
        cb_error_cancel: type_cb_error
    ): boolean {
        let b_result = false;

        do {
            b_result = server.device_cancel_with_callback(
                device.get_device_index(), 0, 0,
                cb_complete_cancel,
                cb_error_cancel,
                true
            );
        } while (false);
        return b_result;
    }

    /**
     * Generate run bootloader start IO
     */
    private _gen_run_bootloader_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_run_bootloader: type_cb_received,
        cb_error_run_bootloader: type_cb_error
    ): boolean {
        let b_result = false;
        let s_request: string | null = null;
        let n_req = 0;

        do {
            device.clear_transaction();

            n_req = device.generate_run_bootloader();
            if (n_req <= 0) {
                continue;
            }

            s_request = device.get_tx_transaction();
            if (s_request === null) {
                continue;
            }

            b_result = server.device_transmit_with_callback(
                device.get_device_index(), 0, 0, s_request,
                cb_complete_run_bootloader,
                cb_error_run_bootloader,
                true
            );
            if (!b_result) {
                device.clear_transaction();
                continue;
            }

            b_result = true;
        } while (false);
        return b_result;
    }

    /**
     * Generate iButton start IO
     */
    private _gen_ibutton_start_io(
        server: coffee,
        device: lpu237,
        cb_complete_ibutton: type_cb_received,
        cb_error_ibutton: type_cb_error
    ): boolean {
        let b_result = false;

        do {
            device.clear_transaction();

            b_result = server.device_receive_with_callback(
                device.get_device_index(),
                0,
                cb_complete_ibutton,
                cb_error_ibutton,
                true
            );
            if (!b_result) {
                device.clear_transaction();
                continue;
            }

            b_result = true;
        } while (false);
        return b_result;
    }

    /**
     * Notify error
     */
    private _notify_error(parameter: IQueueParameter, event_error?: Error): void {
        do {
            if (typeof parameter !== 'object') {
                continue;
            }

            let e: Error;
            if (event_error instanceof Error) {
                e = event_error;
            } else {
                e = new Error("error");
            }
            if (parameter.reject) {
                parameter.reject(e);
                continue;
            }
            if (parameter.cb_error) {
                parameter.cb_error(parameter.device.get_device_index(), e);
            }
        } while (false);
    }

    /**
     * Notify error all
     */
    private _notify_error_all(n_device_index: number, event_error?: Error): void {
        do {
            if (typeof n_device_index !== 'number') {
                continue;
            }
            if (!this._map_q_para.has(n_device_index)) {
                continue;
            }

            const q = this._map_q_para.get(n_device_index)!;
            if (q.length <= 0) {
                util.map_of_queue_delete(this._map_q_para, n_device_index);
                continue;
            }

            for (let i = 0; i < q.length; i++) {
                this._notify_error(q[i], event_error);
            }
            util.map_of_queue_delete(this._map_q_para, n_device_index);
        } while (false);
    }

    /**
     * Notify error map
     */
    private _notifiy_error_map(event_error?: Error): void {
        do {
            this._map_q_para.forEach((value, key) => {
                this._notify_error_all(key, event_error);
            });
            util.map_of_queue_clear(this._map_q_para);
        } while (false);
    }

    /**
     * Notify received
     */
    private _notify_received(parameter: IQueueParameter): void {
        do {
            if (typeof parameter !== 'object') {
                continue;
            }

            if (parameter.resolve) {
                parameter.resolve("success");
                continue;
            }
            if (parameter.cb_received) {
                parameter.cb_received(parameter.device.get_device_index(), "success");
            }
        } while (false);
    }

    /**
     * Is event response good
     */
    private _is_event_rsp_good(device: lpu237, s_rx: Array<string> | string): boolean {
        let b_result = false;
        do {
            if (Array.isArray(s_rx)) {
                if (s_rx[0] !== "success") {
                    continue;
                }
            } else {
                if (!device.set_rx_transaction(s_rx)) {
                    continue;
                }
                if (!device.set_from_rx()) {
                    continue;
                }
            }
            b_result = true;
        } while (false);
        return b_result;
    }

    /**
     * Is event response cancel
     */
    private _is_event_rsp_cancel(s_rx: Array<string> | string): boolean {
        let b_result = false;
        do {
            if (!Array.isArray(s_rx)) {
                continue;
            }
            if (s_rx[0] !== "cancel") {
                continue;
            }
            b_result = true;
        } while (false);
        return b_result;
    }

    /**
     * Process response event in idle
     */
    private _process_rsp_event_in_idle(n_device_index: number): void {
        this._notify_error_all(n_device_index);
        util.map_of_queue_delete(this._map_q_para, n_device_index);
    }

    /**
     * Process response event in wait response
     */
    private _process_rsp_event_in_wait_rsp(n_device_index: number, s_rx: Array<string> | string): void {
        do {
            const para = util.map_of_queue_get(this._map_q_para, n_device_index);
            if (!para) {
                continue;
            }
            if (!this._is_event_rsp_good(para.device, s_rx)) {
                continue;
            }
            //e_rsp_good
            if (para.b_read) {
                const b_result = para.server.device_receive_with_callback(
                    n_device_index, 0,
                    this._cb_complete_rsp,
                    this._cb_error_frame,
                    true
                );
                if (!b_result) {
                    continue;
                }
                this._set_status(n_device_index, _type_status.ST_WAIT_READ_DATA);
            } else {
                this._notify_received(para);
                util.map_of_queue_delete(this._map_q_para, n_device_index);
                this._set_status(n_device_index, _type_status.ST_IDLE);
            }
            return;
        } while (false);

        this._notify_error_all(n_device_index);
        util.map_of_queue_delete(this._map_q_para, n_device_index);
        this._set_status(n_device_index, _type_status.ST_IDLE);
    }

    /**
     * Process response event in wait card
     */
    private _process_rsp_event_in_wait_card(n_device_index: number, s_rx: Array<string> | string): void {
        do {
            if (this._is_event_rsp_cancel(s_rx)) {
                //event e_rsp_cancel
                this._notify_error(util.map_of_queue_front(this._map_q_para, n_device_index)!);
                this._set_status(n_device_index, _type_status.ST_WAIT_CANCEL);
                return;
            }

            const para = util.map_of_queue_get(this._map_q_para, n_device_index);
            if (!para) {
                continue;
            }
            if (para.device.get_type_string() == "compositive_msr") {
                if( typeof s_rx !== 'string'){
                    continue;
                }
                if (!para.device.set_msr_data_from_rx(s_rx)) {
                    continue;
                }
            } else if (para.device.get_type_string() == "compositive_ibutton") {
                if( typeof s_rx !== 'string'){
                    continue;
                }
                if (!para.device.set_ibutton_data_from_rx(s_rx)) {
                    continue;
                }
            } else {
                // error. not supported device type
                continue;
            }

            //event e_rsp_card
            if (para.resolve) {
                //the end of waiting for promise type
                const removed_para = util.map_of_queue_front(this._map_q_para, n_device_index)!;
                this._set_status(n_device_index, _type_status.ST_IDLE);
                this._notify_received(removed_para);
                return;
            }
            this._notify_received(para);
            //re-waiting card data for callback type
            const b_result = para.server.device_receive_with_callback(
                n_device_index, 0,
                this._cb_complete_rsp,
                this._cb_error_frame,
                true
            );
            if (!b_result) {
                continue;
            }
            return;
        } while (false);

        this._notify_error_all(n_device_index);
        util.map_of_queue_delete(this._map_q_para, n_device_index);
        this._set_status(n_device_index, _type_status.ST_IDLE);
    }

    /**
     * Process response event in wait cancel
     */
    private _process_rsp_event_in_wait_cancel(n_device_index: number, s_rx: Array<string> | string): void {
        do {
            const para = util.map_of_queue_get(this._map_q_para, n_device_index);
            if (!para) {
                continue;
            }
            if (!this._is_event_rsp_good(para.device, s_rx)) {
                continue;
            }

            //e_rsp_good
            let b_result = false;

            if (para.device.get_type_string() == "compositive_msr") {
                //to OPOS mode
                b_result = this._gen_opos_start_io(para.server, para.device, this._cb_complete_rsp, this._cb_error_frame, para.b_read!);
                if (!b_result) {
                    continue;
                }
                this._set_status(para.device.get_device_index(), _type_status.ST_WAIT_RSP);
                return;
            }
            if (para.device.get_type_string() == "compositive_ibutton") {
                if (para.b_read) {
                    b_result = this._gen_ibutton_start_io(para.server, para.device, this._cb_complete_rsp, this._cb_error_frame);
                    if (!b_result) {
                        continue;
                    }
                    this._set_status(para.device.get_device_index(), _type_status.ST_WAIT_READ_DATA);
                } else {
                    this._notify_received(para);
                    util.map_of_queue_delete(this._map_q_para, n_device_index);
                    this._set_status(para.device.get_device_index(), _type_status.ST_IDLE);
                }
                return;
            }

            // error
        } while (false);

        this._notify_error_all(n_device_index);
        util.map_of_queue_delete(this._map_q_para, n_device_index);
        this._set_status(n_device_index, _type_status.ST_IDLE);
    }

    /**
     * Callback complete response
     */
    private _cb_complete_rsp = (n_device_index: number, s_rx: Array<string> | string) => {
        do {
            const para = util.map_of_queue_get(this._map_q_para, n_device_index);
            if (!para) {
                continue;
            }
            
            const st = this._get_status(n_device_index);
            switch (st) {
                case _type_status.ST_IDLE:
                    this._process_rsp_event_in_idle(n_device_index);
                    continue;
                case _type_status.ST_WAIT_RSP:
                    this._process_rsp_event_in_wait_rsp(n_device_index, s_rx);
                    continue;
                case _type_status.ST_WAIT_READ_DATA:
                    this._process_rsp_event_in_wait_card(n_device_index, s_rx);
                    continue;
                case _type_status.ST_WAIT_CANCEL:
                    this._process_rsp_event_in_wait_cancel(n_device_index, s_rx);
                    continue;
                default:
                    break;
            }
        } while (false);
    }

    /**
     * Callback error frame
     */
    private _cb_error_frame = (n_device_index: number, event_error: Event | Error) => {
        if( event_error instanceof Error){
            console.log("_cb_error_frame : " + n_device_index.toString() + event_error.message);
            this._notifiy_error_map(event_error);
            this._map_status.clear();
        }
        else{
            console.log("_cb_error_frame : event type");
        }
    }

    /**
     * Callback error common
     */
    private _cb_error_common = (n_device_index: number, event_error: Event | Error) => {
        const parameter = util.map_of_queue_front(this._map_q_para, n_device_index);
        if (parameter) {
            if( event_error instanceof Error ){
                this._notify_error(parameter, event_error);
            }
        }
    }

    /**
     * Callback complete get parameter
     */
    private _cb_complete_get_parameter = (n_device_index: number, s_rx: Array<string> | string) => {
        let b_result = false;
        let parameter = util.map_of_queue_front(this._map_q_para, n_device_index);
        do {
            if (parameter === null) {
                continue;
            }
            if( typeof s_rx !== 'string' ){
                continue;
            }   
            if (!parameter.device.set_rx_transaction(s_rx)) {
                continue;
            }
            if (!parameter.device.set_from_rx()) {
                continue;
            }
            
            if (typeof parameter.cb_progress === 'function') {
                parameter.stage_cur!++;
                parameter.cb_progress(n_device_index, parameter.stage_max!, parameter.stage_cur!);
            }
            
            const s_request = parameter.device.get_tx_transaction();
            if (s_request === null) {
                parameter.device.clear_transaction();
                this._notify_received(parameter);
                parameter = null;
                b_result = true;
                continue;
            }
            
            b_result = parameter.server.device_transmit_with_callback(
                parameter.device.get_device_index(), 0, 0, s_request,
                this._cb_complete_get_parameter,
                this._cb_error_common,
                true
            );
            if (!b_result) {
                continue;
            }

            b_result = true;
        } while (false);

        if (parameter) {
            if (b_result) {
                util.map_of_queue_push(this._map_q_para, n_device_index, parameter);
            } else {
                parameter.device.clear_transaction();
                this._notify_error(parameter);
            }
        }
    }

    /**
     * Callback complete system info
     */
    private _cb_complete_sys_info = (n_device_index: number, s_rx: Array<string> | string) => {
        let b_result = false;
        let n_request = 0;
        let parameter = util.map_of_queue_front(this._map_q_para, n_device_index);
        do {
            if (parameter === null) {
                continue;
            }
            if (typeof s_rx !== 'string') {
                continue;
            }
            if (!parameter.device.set_rx_transaction(s_rx)) {
                continue;
            }
            if (!parameter.device.set_from_rx()) {
                continue;
            }

            if (typeof parameter.cb_progress === 'function') {
                parameter.stage_cur!++;
                parameter.cb_progress(n_device_index, parameter.stage_max!, parameter.stage_cur!);
            }

            const s_request = parameter.device.get_tx_transaction();
            if (s_request === null) {
                n_request = this._gen_get_para_start_io(parameter.server, parameter.device, this._cb_complete_get_parameter, this._cb_error_common);
                if (n_request <= 0) {
                    console.log("E : _cb_complete_sys_info : _gen_get_para_start_io");
                } else {
                    if (typeof parameter.cb_progress === 'function') {
                        parameter.stage_max = n_request;
                        parameter.stage_cur = 0;
                    }
                    b_result = true;
                }
                continue;
            }

            b_result = parameter.server.device_transmit_with_callback(
                parameter.device.get_device_index(), 0, 0, s_request,
                this._cb_complete_sys_info,
                this._cb_error_common,
                true
            );
            if (!b_result) {
                continue;
            }
            b_result = true;
        } while (false);

        if (parameter) {
            if (b_result) {
                util.map_of_queue_push(this._map_q_para, n_device_index, parameter);
            } else {
                parameter.device.clear_transaction();
                this._notify_error(parameter);
            }
        }
    }

    /**
     * Callback complete system info only
     */
    private _cb_complete_sys_info_only = (n_device_index: number, s_rx: Array<string> | string) => {
        console.info("_cb_complete_sys_info_only : ",this);
        let b_result = false;
        let parameter = util.map_of_queue_front(this._map_q_para, n_device_index);
        do {
            if (parameter === null) {
                console.info("_cb_complete_sys_info_only : parameter is null");
                continue;
            }
            if (typeof s_rx !== 'string') {
                console.info("_cb_complete_sys_info_only : s_rx isn't string");
                continue;
            }
            if (!parameter.device.set_rx_transaction(s_rx)) {
                console.info("_cb_complete_sys_info_only : set_rx_transaction : error");
                continue;
            }
            if (!parameter.device.set_from_rx()) {
                console.info("_cb_complete_sys_info_only : set_from_rx : error");
                continue;
            }

            if (typeof parameter.cb_progress === 'function') {
                parameter.stage_cur!++;
                parameter.cb_progress(n_device_index, parameter.stage_max!, parameter.stage_cur!);
            }

            const s_request = parameter.device.get_tx_transaction();
            if (s_request === null) {
                parameter.device.clear_transaction();
                this._notify_received(parameter);
                parameter = null;
                b_result = true;
                continue;
            }

            b_result = parameter.server.device_transmit_with_callback(
                parameter.device.get_device_index(), 0, 0, s_request,
                this._cb_complete_sys_info_only,
                this._cb_error_common,
                true
            );
            if (!b_result) {
                continue;
            }
            b_result = true;
        } while (false);

        if (parameter) {
            if (b_result) {
                util.map_of_queue_push(this._map_q_para, n_device_index, parameter);
            } else {
                parameter.device.clear_transaction();
                this._notify_error(parameter);
            }
        }
    }    

    /**
     * @private
     * @function _cb_complete_set_parameter
     * @param {number} n_device_index - 장치 인덱스.
     * @param {Array<string>|string} s_rx - 수신된 데이터 필드.
     * @description 파라미터 설정 요청이 완료될 때마다 호출되며, 남은 요청이 있다면 연속해서 실행합니다.
     */
    private _cb_complete_set_parameter = (n_device_index: number, s_rx: string[] | string) => {
        let b_result = false;
        
        // 1. 현재 대기 중인 파라미터 정보 가져오기
        let parameter = util.map_of_queue_front(this._map_q_para, n_device_index);

        do {
            if (parameter === null) {
                console.error("E : _cb_complete_set_parameter : parameter is null");
                continue;
            }

            // 2. 수신 데이터 파싱 및 장치 객체에 반영
            if(typeof s_rx !== 'string'){
                console.error("E : _cb_complete_set_parameter : rx type isn't string");
                continue;
            }
            if (!parameter.device.set_rx_transaction(s_rx)) {
                console.error("E : _cb_complete_set_parameter : set_rx_transaction failure");
                continue;
            }
            if (!parameter.device.set_from_rx()) {
                console.error("E : _cb_complete_set_parameter : set_from_rx failure");
                continue;
            }

            // 3. 진행률 알림 (예: 1/5 단계 완료)
            if (typeof parameter.cb_progress === 'function') {
                if(parameter.stage_cur != undefined && parameter.stage_max != undefined){
                    parameter.stage_cur++;
                    parameter.cb_progress(n_device_index, parameter.stage_max, parameter.stage_cur);
                }
            }

            // 4. 다음 보낼 데이터(Next Step)가 있는지 확인
            const s_request = parameter.device.get_tx_transaction();

            if (s_request === null) {
                // 모든 트랜잭션 완료
                parameter.device.clear_transaction();
                this._notify_received(parameter);
                parameter = null; // 루프 종료를 위해 참조 제거
                b_result = true;
                continue;
            }

            // 5. 다음 요청 전송 (자기 자신을 콜백으로 다시 등록 - Chain)
            b_result = parameter.server.device_transmit_with_callback(
                parameter.device.get_device_index(),
                0,
                0,
                s_request,
                this._cb_complete_set_parameter, // Recursive-like callback
                this._cb_error_common,
                true
            );

            if (!b_result) {
                console.error("E : _cb_complete_set_parameter : device_transmit_with_callback failure");
                continue;
            }

            b_result = true;
        } while (false);

        // 6. 결과에 따른 큐 관리 및 에러 알림
        if (parameter) {
            if (b_result) {
                // 다음 단계를 위해 다시 큐에 삽입
                util.map_of_queue_push(this._map_q_para, n_device_index, parameter);
            } else {
                // 에러 발생 시 정리
                parameter.device.clear_transaction();
                this._notify_error(parameter);
            }
        }
    }

    /**
     * @private
     * @function _cb_complete_run_bootloader
     * @param {number} n_device_index - 장치 인덱스.
     * @param {Array<string>|string} s_rx - 부트로더 실행 중 수신된 데이터.
     * @description 부트로더 실행 요청의 각 단계가 완료될 때 호출되며, 남은 부트로더 명령 시퀀스를 이어갑니다.
     */
    private _cb_complete_run_bootloader = (n_device_index: number, s_rx: string[] | string) => {
        let b_result = false;
        
        // 큐에서 현재 처리 중인 파라미터 컨텍스트 추출
        let parameter = util.map_of_queue_front(this._map_q_para, n_device_index);

        do {
            if (parameter === null) {
                console.error("E : _cb_complete_run_bootloader : parameter is null");
                continue;
            }

            // 수신된 응답을 장치 상태에 반영
            if( typeof s_rx !== 'string'){
                console.error("E : _cb_complete_run_bootloader : s_tx isn't string.");
                continue;
            }
            if (!parameter.device.set_rx_transaction(s_rx)) {
                console.error("E : _cb_complete_run_bootloader : set_rx_transaction failure");
                continue;
            }
            if (!parameter.device.set_from_rx()) {
                console.error("E : _cb_complete_run_bootloader : set_from_rx failure");
                continue;
            }

            // 다음으로 수행할 부트로더 트랜잭션이 있는지 확인
            const s_request = parameter.device.get_tx_transaction();

            if (s_request === null) {
                // 모든 부트로더 명령 시퀀스 완료
                parameter.device.clear_transaction();
                this._notify_received(parameter);
                parameter = null; 
                b_result = true;
                continue;
            }

            // 다음 부트로더 명령 전송 (자기 자신을 다시 콜백으로 지정)
            b_result = parameter.server.device_transmit_with_callback(
                parameter.device.get_device_index(),
                0,
                0,
                s_request,
                this._cb_complete_run_bootloader, // Recursive Chain
                this._cb_error_common,
                true
            );

            if (!b_result) {
                console.error("E : _cb_complete_run_bootloader : device_transmit_with_callback failure");
                continue;
            }

            b_result = true;
        } while (false);

        // 상태 유지 및 에러 처리
        if (parameter) {
            if (b_result) {
                // 다음 단계 실행을 위해 파라미터 정보를 다시 큐에 유지
                util.map_of_queue_push(this._map_q_para, n_device_index, parameter);
            } else {
                parameter.device.clear_transaction();
                this._notify_error(parameter);
            }
        }
    }
        
    /**
     * @private
     * @function _check_server_and_device
     * @param {any} server - Coffee manager 서버 객체.
     * @param {any} device - LPU237 등의 USB 장치 프로토콜 객체.
     * @returns {boolean} 서버와 장치가 모두 사용 가능하면 true, 그렇지 않으면 false.
     * @description 작업을 수행하기 전 서버 연결 상태와 장치의 오픈 여부를 검증합니다.
     */
    private _check_server_and_device(server: coffee, device: lpu237): boolean {
        let b_check_ok = false;

        // do-while(false) 패턴을 사용한 조건부 조기 탈출 구조
        do {
            // 1. 서버 객체 존재 여부 확인
            if (!server) {
                console.error("Validation Failed: Server object is null or undefined.");
                break; // 원본 코드의 continue와 동일한 효과 (루프가 한 번이므로)
            }

            // 2. 장치 객체 존재 여부 확인
            if (!device) {
                console.error("Validation Failed: Device object is null or undefined.");
                break;
            }

            // 3. 장치 오픈 상태 확인 (Index가 0보다 커야 함)
            // 0 이하는 보통 초기화되지 않았거나 잘못된 인덱스를 의미함
            if (device.get_device_index() <= 0) {
                console.error("Validation Failed: Device is not opened (Invalid Index).");
                break;
            }

            b_check_ok = true;
        } while (false);

        return b_check_ok;
    }    

    private _server: coffee; // elpusk.framework.coffee 타입
    private _device: lpu237; // elpusk.device.usb.hid.lpu237 타입

    /**
     * @constructor
     * @param {coffee} server - Coffee manager 서버 객체.
     * @param {lpu237} device - 제어 대상인 LPU237 장치 객체.
     */
    constructor(server: coffee, device: lpu237) {
        this._server = server;
        this._device = device;
    }

    /**
     * @public
     * @function toString
     * @returns {string} 클래스명(서버 세션 번호, 장치 경로) 형식의 문자열.
     */
    public toString(): string {
        let s_server = "none";
        let s_device = "none";

        if (this._server && typeof this._server.get_session_number === 'function') {
            s_server = this._server.get_session_number();
        }
        
        if (this._device && typeof this._device.get_path === 'function') {
            s_device = this._device.get_path();
        }

        return `ctl_lpu237(${s_server}, ${s_device})`;
    }

    /**
     * @public
     * @function get_server
     * @returns {any} 연결된 서버 객체를 반환합니다.
     */
    public get_server(): any {
        return this._server;
    }

    /**
     * @public
     * @function get_device
     * @returns {any} 연결된 LPU237 장치 객체를 반환합니다.
     */
    public get_device(): any {
        return this._device;
    }

    /**
     * @public
     * @function open_with_promise
     * @returns {Promise<string>} 성공 시 "success"를 반환하고, 실패 시 Error 객체를 던집니다.
     * @description 생성 시 전달된 서버와 LPU237 객체를 사용하여 실제 장치를 오픈합니다.
     */
    public async open_with_promise(): Promise<string> {
        const _server = this._server;
        const _device = this._device;

        // 1. 객체 유효성 확인
        if (!_server || !_device) {
            throw new Error("error");
        }

        // 2. 이미 오픈되어 있는지 확인
        if (_device.get_device_index() > 0) {
            return "success";
        }

        try {
            // 3. 장치 타입에 따른 공유 모드 설정
            // iButton 복합 장치의 경우 공유 모드로 오픈함
            const b_shared = _device.get_type_string() === "compositive_ibutton";

            // 4. 서버에 장치 오픈 요청
            const n_device_index = await _server.device_open(_device.get_path(), b_shared);

            // 5. 결과 검증 및 상태 저장
            if (typeof n_device_index === 'undefined' || n_device_index === 0) {
                throw new Error("error");
            }

            // 이전 작업 큐 정리 (안전 장치)
            util.map_of_queue_delete(this._map_q_para, n_device_index);
            
            // 장치 객체에 인덱스 할당 및 오픈 상태 마킹
            _device.opened(n_device_index);

            return "success";
        } catch (error) {
            // 서버 응답 에러 또는 통신 실패 처리
            throw error instanceof Error ? error : new Error("error");
        }
    }

    /**
     * @public
     * @function close_with_promise
     * @returns {Promise<string>} 성공 시 "success" 반환, 실패 시 Error 객체 반환.
     * @description 현재 점유 중인 LPU237 장치를 닫고 관련 자원을 해제합니다.
     */
    public async close_with_promise(): Promise<string> {
        const _server = this._server;
        const _device = this._device;

        // 1. 객체 유효성 확인
        if (!_server || !_device) {
            throw new Error("error");
        }

        // 2. 이미 닫혀있는지 확인 (Index 0 이하는 비활성 상태)
        const deviceIndex = _device.get_device_index();
        if (deviceIndex <= 0) {
            return "success";
        }

        try {
            // 3. 서버에 장치 종료 요청 전송
            const s_rx = await _server.device_close(deviceIndex);

            // 4. 응답 확인 (배열 또는 문자열 형태 대응)
            let isSuccess = false;
            if (Array.isArray(s_rx)) {
                isSuccess = s_rx[0] === "success";
            } else {
                // 원본 코드의 "success " (공백 포함) 유의
                isSuccess = s_rx.trim() === "success";
            }

            if (isSuccess) {
                // 5. 내부 자원 및 상태 정리
                util.map_of_queue_delete(this._map_q_para, deviceIndex);
                _device.closed(); // 장치 내부 인덱스를 0으로 초기화
                return "success";
            } else {
                throw new Error("error");
            }
        } catch (error) {
            throw error instanceof Error ? error : new Error("error");
        }
    }

    /**
     * @public
     * @function load_all_parameter_from_device_with_promise
     * @param {Function} [cb_progress] - 진행 상태 콜백 (n_idx, n_total, n_current) => void
     * @returns {Promise<string>} 모든 파라미터 로드 완료 시 "success" 반환.
     * @description 장치로부터 시스템 정보 및 모든 파라미터를 읽어옵니다.
     */
    public async load_all_parameter_from_device_with_promise(
        cb_progress?: (n_device_index: number, n_total: number, n_current: number) => void
    ): Promise<string> {
        const server = this._server;
        const device = this._device;

        // 1. 서버/장치 상태 확인 및 중복 요청 방지
        if (!this._check_server_and_device(server, device)) {
            throw new Error("error");
        }

        if (!util.map_of_queue_is_empty(this._map_q_para, device.get_device_index())) {
            // 이미 다른 작업(트랜잭션)이 진행 중임
            throw new Error("error");
        }

        return new Promise((resolve, reject) => {
            let n_request = 0;

            // 2. 시스템 정보 조회를 위한 첫 번째 IO 시작 및 전체 단계 수 획득
            // _cb_complete_sys_info는 수신 성공 시 실행될 내부 콜백
            n_request = this._gen_get_sysinfo_start_io(
                server, 
                device, 
                this._cb_complete_sys_info, 
                this._cb_error_common
            );

            if (n_request <= 0) {
                return reject(new Error("error"));
            }

            // 3. 비동기 체이닝을 위한 파라미터 컨텍스트 구성
            const parameter = {
                server: server,
                device: device,
                resolve: resolve,
                reject: reject,
                b_read: undefined,
                cb_received: undefined,
                cb_error: undefined,
                cb_progress: cb_progress,
                stage_max: n_request,
                stage_cur: 0
            };

            // 4. 전역 큐에 컨텍스트를 푸시하여 연속적인 콜백 처리가 가능하게 함
            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
        });
    }

    /**
     * @public
     * @function load_min_parameter_from_device_with_promise
     * @param {Function} [cb_progress] - 시스템 정보 획득 단계별 콜백.
     * @returns {Promise<string>} 성공 시 "success" 반환.
     * @description MSR/iButton 데이터 읽기 전 장치 기본 정보를 신속하게 로드할 때 사용합니다.
     */
    public async load_min_parameter_from_device_with_promise(
        cb_progress?: (n_device_index: number, n_total: number, n_current: number) => void
    ): Promise<string> {
        const server = this._server;
        const device = this._device;

        // 1. 상태 검증 및 중복 실행 방지
        if (!this._check_server_and_device(server, device) || 
            !util.map_of_queue_is_empty(this._map_q_para, device.get_device_index())) {
            throw new Error("error");
        }

        return new Promise((resolve, reject) => {
            // 2. 시스템 정보 조회를 위한 IO 시작
            // 여기서는 '_cb_complete_sys_info_only'를 사용하여 추가 파라미터 조회를 생략함
            const n_request = this._gen_get_sysinfo_start_io(
                server, 
                device, 
                this._cb_complete_sys_info_only, 
                this._cb_error_common
            );

            if (n_request <= 0) {
                return reject(new Error("error"));
            }

            // 3. 트랜잭션 컨텍스트 구성
            const parameter = {
                server: server,
                device: device,
                resolve: resolve,
                reject: reject,
                b_read: undefined,
                cb_received: undefined,
                cb_error: undefined,
                cb_progress: cb_progress,
                stage_max: n_request,
                stage_cur: 0
            };

            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
            console.info("pushed:", this);
        });
    }

    /**
     * @public
     * @function save_parameter_to_device_with_promise
     * @param {Function} [cb_progress] - 저장 단계별 진행률 콜백.
     * @returns {Promise<string>} 모든 설정 저장 완료 시 "success" 반환.
     * @description 현재 장치 객체에 설정된 파라미터들을 실제 하드웨어에 기록합니다.
     */
    public async save_parameter_to_device_with_promise(
        cb_progress?: (n_device_index: number, n_total: number, n_current: number) => void
    ): Promise<string> {
        const server = this._server;
        const device = this._device;

        // 1. 사전 유효성 검사 (서버 연결, 장치 오픈 여부, 진행 중인 작업 유무)
        if (!this._check_server_and_device(server, device) || 
            !util.map_of_queue_is_empty(this._map_q_para, device.get_device_index())) {
            throw new Error("error");
        }

        return new Promise((resolve, reject) => {
            // 2. 파라미터 쓰기 트랜잭션 시작
            // _cb_complete_set_parameter 가 다음 단계를 연쇄적으로 호출함
            const n_request = this._gen_set_para_start_io(
                server, 
                device, 
                this._cb_complete_set_parameter, 
                this._cb_error_common
            );

            if (n_request <= 0) {
                return reject(new Error("error"));
            }

            // 3. 비동기 추적을 위한 파라미터 객체 구성
            const parameter = {
                server: server,
                device: device,
                resolve: resolve,
                reject: reject,
                b_read: undefined,
                cb_received: undefined,
                cb_error: undefined,
                cb_progress: cb_progress,
                stage_max: n_request,
                stage_cur: 0
            };

            // 4. 큐에 관리 객체 푸시
            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
        });
    }

    /**
     * @public
     * @function run_bootloader_of_device_with_promise
     * @returns {Promise<string>} 부트로더 진입 성공 시 "success" 반환.
     * @description LPU237 장치를 부트로더 모드로 전환합니다. (펌웨어 업데이트 준비)
     */
    public async run_bootloader_of_device_with_promise(): Promise<string> {
        const server = this._server;
        const device = this._device;

        // 1. 보안 및 유효성 검사
        if (!this._check_server_and_device(server, device) || 
            !util.map_of_queue_is_empty(this._map_q_para, device.get_device_index())) {
            throw new Error("error");
        }

        return new Promise((resolve, reject) => {
            // 2. 부트로더 시작 IO 발생
            // _cb_complete_run_bootloader가 이후의 연쇄 반응을 처리함
            const b_request = this._gen_run_bootloader_start_io(
                server, 
                device, 
                this._cb_complete_run_bootloader, 
                this._cb_error_common
            );

            if (!b_request) {
                return reject(new Error("error"));
            }

            // 3. 트랜잭션 관리 객체 생성 (부트로더는 단계별 진행률 파라미터가 생략됨)
            const parameter = {
                server: server,
                device: device,
                resolve: resolve,
                reject: reject,
                b_read: undefined,
                cb_received: undefined,
                cb_error: undefined,
                cb_progress: undefined,
                stage_max: undefined,
                stage_cur: undefined
            };

            // 4. 전역 작업 큐에 등록
            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
        });
    }

    /**
     * @public
     * @function read_card_from_device_with_callback
     * @param {boolean} b_read - true: 카드 읽기 활성화, false: 읽기 중단.
     * @param {Function} cb_read_done - 카드 읽기 완료 시 호출되는 콜백 (n_idx, s_data) => void.
     * @param {Function} cb_read_error - 에러 발생 시 호출되는 콜백 (n_idx, error(must be Error object)) => void.
     * @returns {boolean} 요청 처리 성공 여부.
     */
    public read_card_from_device_with_callback(
        b_read: boolean,
        cb_read_done: (n_device_index: number, s_data: string) => void,
        cb_read_error: (n_device_index: number, error: Event | Error) => void
    ): boolean {
        let b_result = false;
        const server = this._server;
        const device = this._device;

        if (typeof b_read !== 'boolean') return false;

        // 장치 내부의 이전 MSR 데이터 버퍼 초기화
        device.reset_msr_data();

        const currentStatus = this._get_status(device.get_device_index());

        switch (currentStatus) {
            case _type_status.ST_IDLE:
                if (!this._check_server_and_device(server, device)) break;
                
                // 읽기 시작 전 취소/초기화 명령 전송
                b_result = this._cancel_start_io(server, device, this._cb_complete_rsp, this._cb_error_frame);
                if (b_result) {
                    this._set_status(device.get_device_index(), _type_status.ST_WAIT_CANCEL);
                }
                break;

            case _type_status.ST_WAIT_READ_DATA:
                // 이미 읽기 대기 중인데 다시 읽으라고 하면 할 일이 없음
                if (b_read) break;

                // 읽기 중단 요청인 경우 취소 명령 전송
                b_result = this._cancel_start_io(server, device, this._cb_complete_rsp, this._cb_error_frame);
                break;

            default:
                // 기타 상태(처리 중 등)에서는 무시
                break;
        }

        // 성공적으로 명령이 전달되었다면, 콜백 정보를 큐에 등록
        if (b_result) {
            const parameter = {
                server: server,
                device: device,
                resolve: undefined, // Promise 기반이 아니므로 null
                reject: undefined,
                b_read: b_read,
                cb_received: cb_read_done,
                cb_error: cb_read_error,
                cb_progress: undefined,
                stage_max: undefined,
                stage_cur: undefined
            };
            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
        }

        return b_result;
    }

    /**
     * @public
     * @function read_ibutton_from_device_with_callback
     * @param {boolean} b_read - true: iButton 읽기 활성화, false: 읽기 중단.
     * @param {Function} cb_read_done - iButton 태깅 완료 시 호출 (n_idx, s_id) => void.
     * @param {Function} cb_read_error - 에러 발생 시 호출 (n_idx, error(Error object)) => void.
     * @returns {boolean} 요청 처리 성공 여부.
     */
    public read_ibutton_from_device_with_callback(
        b_read: boolean,
        cb_read_done: (n_device_index: number, s_id: string) => void,
        cb_read_error: (n_device_index: number, error: Event | Error) => void
    ): boolean {
        let b_result = false;
        const server = this._server;
        const device = this._device;

        if (typeof b_read !== 'boolean') return false;

        // 1. iButton 데이터 버퍼 초기화
        device.reset_ibutton_data();

        // 2. 장치 상태에 따른 입출력 초기화
        const currentStatus = this._get_status(device.get_device_index());

        switch (currentStatus) {
            case _type_status.ST_IDLE:
                if (!this._check_server_and_device(server, device)) break;
                
                // iButton 읽기 시퀀스 준비를 위해 취소/초기화 명령 전송
                b_result = this._cancel_start_io(server, device, this._cb_complete_rsp, this._cb_error_frame);
                if (b_result) {
                    this._set_status(device.get_device_index(), _type_status.ST_WAIT_CANCEL);
                }
                break;

            case _type_status.ST_WAIT_READ_DATA:
                if (b_read) break; // 이미 대기 중이면 유지
                b_result = this._cancel_start_io(server, device, this._cb_complete_rsp, this._cb_error_frame);
                break;

            default:
                break;
        }

        // 3. iButton 수신 필터링 설정 및 파라미터 큐 등록
        if (b_result) {
            // b_read 값에 따라 데이터 무시 여부를 장치 객체에 명시
            device.set_ignore_ibutton_data(!b_read);

            const parameter = {
                server: server,
                device: device,
                resolve: undefined,
                reject: undefined,
                b_read: b_read,
                cb_received: cb_read_done,
                cb_error: cb_read_error,
                cb_progress: undefined,
                stage_max: undefined,
                stage_cur: undefined
            };
            util.map_of_queue_push(this._map_q_para, device.get_device_index(), parameter);
        }

        return b_result;
    }

}// the end of ctl_lpu237 class



