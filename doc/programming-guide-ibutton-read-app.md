# Programming Guide: i-Button Key Reader Web App using the Elpusk Library

> **Target audience:** Web application developers who want to read Dallas/Maxim 1-Wire i-Button keys using the `@elpusk/lib` TypeScript library.
>
> **Library root:** `packages/lib/elpusk`  
> **Reference app:** `packages/app/webibutton-read`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [Project Setup](#3-project-setup)
4. [Architecture Overview](#4-architecture-overview)
5. [Step-by-Step Implementation](#5-step-by-step-implementation)
   - 5.1 [Register the System Event Handler](#51-register-the-system-event-handler)
   - 5.2 [Connect to the CF2 Server](#52-connect-to-the-cf2-server)
   - 5.3 [Get the Device List and Select a Device Path](#53-get-the-device-list-and-select-a-device-path)
   - 5.4 [Create an `lpu237` Device Object](#54-create-an-lpu237-device-object)
   - 5.5 [Create a `ctl_lpu237` Controller Object](#55-create-a-ctl_lpu237-controller-object)
   - 5.6 [Open the Device](#56-open-the-device)
   - 5.7 [Load Basic Device Information](#57-load-basic-device-information)
   - 5.8 [Start Waiting for an i-Button Key Touch](#58-start-waiting-for-an-i-button-key-touch)
   - 5.9 [Stop Waiting for an i-Button Key Touch](#59-stop-waiting-for-an-i-button-key-touch)
   - 5.10 [Close the Device and Disconnect](#510-close-the-device-and-disconnect)
6. [Callback Reference](#6-callback-reference)
7. [Complete Example (TypeScript)](#7-complete-example-typescript)
8. [React Integration Pattern](#8-react-integration-pattern)
9. [Error Handling](#9-error-handling)
10. [Differences from the MSR (Magnetic Card) Guide](#10-differences-from-the-msr-magnetic-card-guide)
11. [Notes and Caveats](#11-notes-and-caveats)

---

## 1. Overview

The Elpusk coffee framework (cf2) provides a WebSocket-based bridge between a browser and USB HID devices such as the **LPU237 / LPU238** i-Button reader family. The browser communicates with a locally-running cf2 server process that owns the USB HID connection; the browser itself never touches the USB layer.

```
Browser (your web app)
    │  WebSocket (wss://localhost:443)
    ▼
CF2 Server (local service)
    │  USB HID
    ▼
LPU237 i-Button Reader
```

The key classes and their source files are:

| Class / Module | Source file | Purpose |
|---|---|---|
| `coffee` | `elpusk.framework.coffee.ts` | WebSocket session management, device list, file/firmware operations |
| `lpu237` | `elpusk.device.usb.hid.lpu237.ts` | Device data model – stores all parameters and i-Button key data |
| `ctl_lpu237` | `elpusk.framework.coffee.ctl_lpu237.ts` | Controller – sends/receives HID packets via `coffee` |

The i-Button reader shares the same hardware family and the same three classes as the magnetic card reader (MSR). The primary differences are:

- The device **path** ends with `&ibutton` (not `&msr`).
- The controller method used is **`read_ibutton_from_device_with_callback()`** (not `read_card_from_device_with_callback()`).
- The data accessor methods on `lpu237` are **`get_ibutton_data()`**, **`get_ibutton_error_code()`**, and **`reset_ibutton_data()`**.

---

## 2. Prerequisites

- **CF2 server** installed on the host machine (version **2.8.0** or higher, installer v2.9+).  
  Download: https://github.com/elpusk/publish.framework.coffee.2nd
- Node.js 18+ and a bundler (Vite is used in the reference app).
- The `@elpusk/lib` workspace package resolved to `packages/lib/elpusk`.

---

## 3. Project Setup

### 3.1 package.json dependency

```json
{
  "dependencies": {
    "@elpusk/lib": "workspace:*"
  }
}
```

### 3.2 Vite path alias (vite.config.ts)

```ts
// vite.config.ts
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../../lib/elpusk')
    }
  }
});
```

### 3.3 Imports used in this guide

```ts
import { coffee }      from '@lib/elpusk.framework.coffee';
import { lpu237 }      from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 }  from '@lib/elpusk.framework.coffee.ctl_lpu237';
```

---

## 4. Architecture Overview

The application lifecycle follows this flow:

```
set_system_event_handler()
        │
coffee.get_instance().connect()      ← creates/reuses the WebSocket session
        │
coffee.get_device_list()             ← returns device path strings
  └─ filter paths ending with "&ibutton"
        │
new lpu237(path)                     ← device model object
        │
new ctl_lpu237(coffee, lpu237)       ← controller
        │
ctl_lpu237.open_with_promise()
        │
ctl_lpu237.load_basic_info_from_device_with_promise()
        │
ctl_lpu237.read_ibutton_from_device_with_callback(true, onDone, onError)
        │  (key touched)
        ├─ onDone()  → lpu237.get_ibutton_data()       → display key ID
        │              lpu237.reset_ibutton_data()
        │              [device automatically re-enters wait state]
        │
        └─ onError() → [device exits wait state automatically]
```

---

## 5. Step-by-Step Implementation

### 5.1 Register the System Event Handler

Register a callback **before** connecting to the server. The framework calls this function when devices are physically plugged in (`"P"`) or removed (`"c"`).

```ts
// Module-level globals
let g_coffee       = coffee.get_instance();
let g_lpu237:      lpu237     | null = null;
let g_ctl_lpu237:  ctl_lpu237 | null = null;

function _cb_system_event(s_action_code: string, s_data_field: string[]): void {
    if (typeof s_action_code === 'undefined') return;

    if (s_action_code === 'c') {
        // A previously-open device was physically removed.
        if (!s_data_field || s_data_field.length <= 0) return;
        if (!g_ctl_lpu237 || !g_ctl_lpu237.get_device()) return;

        for (let i = 0; i < s_data_field.length; i++) {
            if (g_ctl_lpu237.get_device().get_path() === s_data_field[i]) {
                // The device currently in use has been unplugged.
                g_ctl_lpu237 = null;
                g_lpu237     = null;
                // TODO: update UI to show disconnected state
                break;
            }
        }
    }

    if (s_action_code === 'P') {
        // A new device was plugged in.
        // Refresh the device list if needed; safe to ignore if already connected.
    }
}

// Call this once during application startup
coffee.set_system_event_handler(_cb_system_event);
```

> **Important:** `coffee.set_system_event_handler()` is a static method. Call it once, before `connect()`.

---

### 5.2 Connect to the CF2 Server

```ts
async function connectServer(): Promise<void> {
    // protocol: "wss", port: 443 (default CF2 server endpoint)
    const s_session_number = await g_coffee.connect('wss', '443');

    if (typeof s_session_number !== 'string') {
        throw new Error('Failed to connect to CF2 server.');
    }
    console.log('Session number:', s_session_number);
}
```

`connect()` returns a session number string on success. The session is maintained until `disconnect()` is called or the browser tab closes.

---

### 5.3 Get the Device List and Select a Device Path

After a successful server connection, query the available HID devices and filter for i-Button paths:

```ts
const IBUTTON_DEVICE_FILTER = 'hid#vid_134b&pid_0206&mi_01';
const IBUTTON_PATH_SUFFIX   = '&ibutton';

async function getIButtonPaths(): Promise<string[]> {
    const raw_list: string[] = await g_coffee.get_device_list(IBUTTON_DEVICE_FILTER);

    if (!Array.isArray(raw_list) || raw_list.length === 0) return [];

    // Keep only the sub-interface path ending with "&ibutton"
    return raw_list.filter(p => p.endsWith(IBUTTON_PATH_SUFFIX));
}
```

> **Key difference from MSR:** For i-Button reading you select the path that ends with `&ibutton`. For magnetic card reading you would select the root composite path (or the path ending with `&msr`). Each sub-interface is a separate logical device with its own path.

---

### 5.4 Create an `lpu237` Device Object

```ts
const s_selected_path: string = ibutton_paths[0]; // choose from the list
g_lpu237 = new lpu237(s_selected_path);
```

`lpu237` is a data-model class. It holds all device parameters and i-Button key data in memory but does not communicate with the hardware on its own.

---

### 5.5 Create a `ctl_lpu237` Controller Object

```ts
g_ctl_lpu237 = new ctl_lpu237(g_coffee, g_lpu237);
```

`ctl_lpu237` wraps the `lpu237` object and uses the `coffee` session to send and receive HID packets.

---

### 5.6 Open the Device

```ts
await g_ctl_lpu237.open_with_promise();
```

Opens the USB HID channel through the CF2 server. Throws on failure.

---

### 5.7 Load Basic Device Information

```ts
await g_ctl_lpu237.load_basic_info_from_device_with_promise();
```

Reads the firmware version, serial number, and minimum configuration. After this call you can safely query:

```ts
const name:    string = g_lpu237.get_name();
const version: string = g_lpu237.get_system_version_by_string();
const uid:     string = g_lpu237.get_uid();
```

---

### 5.8 Start Waiting for an i-Button Key Touch

Pass `true` as the first argument to enter key-wait mode:

```ts
g_ctl_lpu237.read_ibutton_from_device_with_callback(
    true,                    // true = start waiting, false = stop waiting
    _cb_read_ibutton_done,   // called when a key is touched (success or error)
    _cb_read_ibutton_error   // called when a protocol/communication error occurs
);
```

#### `_cb_read_ibutton_done` callback

Called after each key touch. The device **automatically re-enters wait mode** after this callback returns.

```ts
function _cb_read_ibutton_done(n_device_index: number, s_msg: string): void {
    // s_msg is always "success"

    if (!g_ctl_lpu237) return;

    const err_code = g_ctl_lpu237.get_device().get_ibutton_error_code();

    if (err_code !== 0) {
        console.warn(`i-Button error code: ${err_code.toString(16)}h (${err_code})`);
    } else {
        const key_data: string = g_ctl_lpu237.get_device().get_ibutton_data();

        if (key_data.length === 0) {
            console.log('i-Button: no key data received');
        } else {
            console.log('i-Button key ID:', key_data);
            // TODO: display key_data in your UI
        }
    }

    // Always clear the key data from the controller after reading
    g_ctl_lpu237.get_device().reset_ibutton_data();
}
```

#### `_cb_read_ibutton_error` callback

Called when a communication or protocol error occurs. The device **exits wait mode** automatically.

```ts
function _cb_read_ibutton_error(n_device_index: number, event_error: Error): void {
    console.error(`i-Button read error on device ${n_device_index}:`, event_error.message);
    // TODO: update UI — the device is no longer in wait mode
}
```

---

### 5.9 Stop Waiting for an i-Button Key Touch

To cancel the ongoing wait before a key is touched, call the same function with `false`:

```ts
g_ctl_lpu237.read_ibutton_from_device_with_callback(
    false,                   // stop waiting
    _cb_stop_ibutton_done,
    _cb_stop_ibutton_error
);
```

```ts
function _cb_stop_ibutton_done(n_device_index: number, s_msg: string): void {
    // s_msg is always "success"; safe to ignore
    console.log(`Device ${n_device_index}: i-Button wait cancelled.`);
}

function _cb_stop_ibutton_error(n_device_index: number, event_error: Error): void {
    console.error(`Stop-iButton error on device ${n_device_index}:`, event_error.message);
}
```

---

### 5.10 Close the Device and Disconnect

When i-Button reading is no longer needed:

```ts
async function cleanup(): Promise<void> {
    if (g_ctl_lpu237) {
        // 1. Cancel the wait state if currently active (use callbacks or a Promise wrapper)
        //    See the complete example below for a Promise-based stop pattern.

        // 2. Close the device channel
        await g_ctl_lpu237.close_with_promise();
        g_ctl_lpu237 = null;
        g_lpu237     = null;
    }

    // 3. Disconnect from the CF2 server (also ends the session)
    await g_coffee.disconnect();
}
```

---

## 6. Callback Reference

| Callback | Signature | When called | Device state after |
|---|---|---|---|
| `_cb_system_event` | `(s_action_code: string, s_data_field: string[]) => void` | Device plug-in (`"P"`) or plug-out (`"c"`) | — |
| `_cb_read_ibutton_done` | `(n_device_index: number, s_msg: string) => void` | i-Button key touched (error code may be non-zero) | Auto re-enters wait |
| `_cb_read_ibutton_error` | `(n_device_index: number, event_error: Error) => void` | Protocol/communication error during wait | Exits wait |
| `_cb_stop_ibutton_done` | `(n_device_index: number, s_msg: string) => void` | Wait successfully cancelled | Idle |
| `_cb_stop_ibutton_error` | `(n_device_index: number, event_error: Error) => void` | Error while trying to cancel wait | Undefined |

### i-Button data accessors on `lpu237`

| Method | Description |
|---|---|
| `get_ibutton_data(): string` | Returns the key ID string. Returns `""` if no data was received. |
| `get_ibutton_error_code(): number` | Returns `0` if the key was read without error. Non-zero values are device-specific error codes. |
| `reset_ibutton_data(): void` | Clears the buffered i-Button key data. **Call this after processing each key touch.** |

---

## 7. Complete Example (TypeScript)

Below is a self-contained TypeScript module providing continuous i-Button key reading.

```ts
import { coffee }     from '@lib/elpusk.framework.coffee';
import { lpu237 }     from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 } from '@lib/elpusk.framework.coffee.ctl_lpu237';

// ── Constants ─────────────────────────────────────────────────────────────────
const IBUTTON_DEVICE_FILTER = 'hid#vid_134b&pid_0206&mi_01';
const IBUTTON_PATH_SUFFIX   = '&ibutton';

// ── Module-level state ────────────────────────────────────────────────────────
let g_coffee      = coffee.get_instance();
let g_lpu237:     lpu237     | null = null;
let g_ctl_lpu237: ctl_lpu237 | null = null;
let g_is_reading  = false;

// ── Callbacks ────────────────────────────────────────────────────────────────

function _cb_system_event(s_action_code: string, s_data_field: string[]): void {
    if (typeof s_action_code === 'undefined') return;

    if (s_action_code === 'c') {
        if (!s_data_field || s_data_field.length <= 0) return;
        if (!g_ctl_lpu237 || !g_ctl_lpu237.get_device()) return;

        for (let i = 0; i < s_data_field.length; i++) {
            if (g_ctl_lpu237.get_device().get_path() === s_data_field[i]) {
                console.warn('Device unplugged — cleaning up.');
                g_ctl_lpu237 = null;
                g_lpu237     = null;
                g_is_reading = false;
                break;
            }
        }
    }

    if (s_action_code === 'P') {
        // New device plugged in — optionally refresh device list
        console.log('New device detected.');
    }
}

function _cb_read_ibutton_done(n_device_index: number, s_msg: string): void {
    if (!g_ctl_lpu237) return;

    const err_code = g_ctl_lpu237.get_device().get_ibutton_error_code();

    if (err_code !== 0) {
        console.warn(`  i-Button error code: 0x${err_code.toString(16)} (${err_code})`);
    } else {
        const key_data = g_ctl_lpu237.get_device().get_ibutton_data();
        if (key_data.length > 0) {
            console.log('  Key ID:', key_data);
            // TODO: display key_data in your UI
        } else {
            console.log('  i-Button: (no data)');
        }
    }

    // Clear buffered data — mandatory before the next key touch
    g_ctl_lpu237.get_device().reset_ibutton_data();

    // The device automatically re-enters wait mode here.
}

function _cb_read_ibutton_error(n_device_index: number, event_error: Error): void {
    console.error('i-Button read error:', event_error.message);
    g_is_reading = false;
    // The device exits wait mode automatically.
    // Call read_ibutton_from_device_with_callback(true, ...) again to resume.
}

function _cb_stop_ibutton_done(n_device_index: number, s_msg: string): void {
    console.log('i-Button wait cancelled successfully.');
    g_is_reading = false;
}

function _cb_stop_ibutton_error(n_device_index: number, event_error: Error): void {
    console.error('Stop-iButton error:', event_error.message);
    g_is_reading = false;
}

// ── Main flow ─────────────────────────────────────────────────────────────────

export async function startIButtonReader(): Promise<void> {
    // Step 1 — register system event handler
    coffee.set_system_event_handler(_cb_system_event);

    // Step 2 — connect to CF2 server
    const s_session = await g_coffee.connect('wss', '443');
    if (typeof s_session !== 'string') throw new Error('Server connection failed.');
    console.log('Connected. Session:', s_session);

    // Step 3 — get device list and select the i-Button path
    const raw_list: string[] = await g_coffee.get_device_list(IBUTTON_DEVICE_FILTER);
    const ibutton_paths = raw_list.filter(p => p.endsWith(IBUTTON_PATH_SUFFIX));
    if (ibutton_paths.length === 0) throw new Error('No i-Button device found.');

    const s_path = ibutton_paths[0];
    console.log('Using device path:', s_path);

    // Step 4 — create lpu237 object
    g_lpu237 = new lpu237(s_path);

    // Step 5 — create controller
    g_ctl_lpu237 = new ctl_lpu237(g_coffee, g_lpu237);

    // Step 6 — open device
    await g_ctl_lpu237.open_with_promise();
    console.log('Device opened.');

    // Step 7 — load basic info
    await g_ctl_lpu237.load_basic_info_from_device_with_promise();
    console.log('Device:', g_lpu237.get_name(), 'FW:', g_lpu237.get_system_version_by_string());

    // Step 8 — start waiting for key touch
    g_ctl_lpu237.read_ibutton_from_device_with_callback(
        true,
        _cb_read_ibutton_done,
        _cb_read_ibutton_error
    );
    g_is_reading = true;
    console.log('Waiting for i-Button key touch...');
}

export async function stopIButtonReader(): Promise<void> {
    if (!g_ctl_lpu237) return;

    // Step 9 — cancel wait state (wrapped in a Promise for clean sequencing)
    if (g_is_reading) {
        await new Promise<void>((resolve) => {
            g_ctl_lpu237!.read_ibutton_from_device_with_callback(
                false,
                (_idx, _msg) => { resolve(); },
                (_idx, _err) => { resolve(); }
            );
        });
    }

    // Step 10 — close device
    await g_ctl_lpu237.close_with_promise();
    g_ctl_lpu237 = null;
    g_lpu237     = null;
    g_is_reading = false;

    // Disconnect server
    await g_coffee.disconnect();
    console.log('Reader stopped and server disconnected.');
}
```

---

## 8. React Integration Pattern

The reference app (`webibutton-read`) places all library interactions inside a `createHandlers()` factory that receives React state refs and setters. Key design points:

### 8.1 Singleton `coffee` instance

`coffee` is a singleton: `coffee.get_instance()` always returns the same object. Declare it at module level (outside any component) so it persists across renders.

```ts
// handlers.ts (module level — outside any React component)
let g_coffee      = coffee.get_instance();
let g_lpu237:     lpu237     | null = null;
let g_ctl_lpu237: ctl_lpu237 | null = null;
let g_initialized = false;
```

### 8.2 Initialisation and cleanup with `useEffect`

```tsx
const handlers = useMemo(() => createHandlers(stateRef, setState, addLog), []);

useEffect(() => {
    handlers.initializeSystem();
    return () => {
        handlers.uninitializeSystem();
    };
}, []); // empty deps — runs once
```

### 8.3 Preventing double-init in React StrictMode

React 18 StrictMode mounts components twice in development. Guard with a module-level flag:

```ts
let g_initialized = false;

function initializeSystem(): void {
    if (g_initialized) return;
    g_initialized = true;
    coffee.set_system_event_handler(_cb_system_event);
}

function uninitializeSystem(): void {
    if (!g_initialized) return;
    g_initialized = false;
    window.removeEventListener('beforeunload', _cb_before_unload);
    // Disconnect server on unmount
    try { g_coffee.disconnect(); } catch (_) {}
    g_ctl_lpu237 = null;
    g_lpu237     = null;
}
```

### 8.4 Stopping read before disconnect (Promise wrapper)

When the user clicks Disconnect while the device is in key-wait mode, it is important to stop the wait first. Wrap the callback-based stop in a Promise for clean sequential logic:

```ts
async function onDisconnect() {
    if (!g_ctl_lpu237) return;

    if (stateRef.current.isReading) {
        await new Promise<void>((resolve) => {
            g_ctl_lpu237!.read_ibutton_from_device_with_callback(
                false,
                (_idx, _msg) => { resolve(); },
                (_idx, _err) => { resolve(); }
            );
        });
    }

    await g_ctl_lpu237.close_with_promise();
    g_ctl_lpu237 = null;
    g_lpu237     = null;
    setState(prev => ({
        ...prev,
        deviceStatus: 'Disconnected',
        devicePath: '',
        isReading: false,
    }));
}
```

### 8.5 Graceful cleanup on browser close

Register a `beforeunload` listener to cancel any active wait when the user closes the tab:

```ts
function _cb_before_unload(): void {
    if (g_ctl_lpu237 && stateRef.current.isReading) {
        g_ctl_lpu237.read_ibutton_from_device_with_callback(
            false,
            (_idx, _msg) => {},
            (_idx, _err) => {}
        );
    }
}

// In initializeSystem():
window.addEventListener('beforeunload', _cb_before_unload);

// In uninitializeSystem():
window.removeEventListener('beforeunload', _cb_before_unload);
```

### 8.6 Tracking read state in React state

The reference app stores `isReading: boolean` in the React state. Update it whenever a read is started, stopped, or encounters an error:

```ts
// Start
setState(prev => ({ ...prev, isReading: true }));

// Stop (done or error callbacks)
setState(prev => ({ ...prev, isReading: false }));
```

Use `isReading` to conditionally enable/disable the Start / Stop buttons in the UI.

### 8.7 Reacting to server disconnection

If the CF2 server connection drops while a device is open, automatically reset the device state:

```tsx
useEffect(() => {
    if (
        state.serverStatus === ConnectionStatus.DISCONNECTED &&
        state.deviceStatus === ConnectionStatus.CONNECTED
    ) {
        setState(prev => ({
            ...prev,
            deviceStatus: ConnectionStatus.DISCONNECTED,
            devicePath: '',
            isReading: false,
        }));
    }
}, [state.serverStatus]);
```

---

## 9. Error Handling

All `*_with_promise()` methods throw `Error` objects on failure. Wrap them in `try/catch`:

```ts
try {
    await g_ctl_lpu237.open_with_promise();
} catch (err: any) {
    console.error('Open failed:', err.message);
    g_ctl_lpu237 = null;
    g_lpu237     = null;
}
```

Common error scenarios:

| Scenario | What to do |
|---|---|
| Server not running / wrong port | Inform the user to start the CF2 server |
| No i-Button devices found (`get_device_list` filtered list is empty) | Show "please connect your i-Button reader" message |
| Device open fails | Null out `g_ctl_lpu237` and `g_lpu237`; display an error |
| `_cb_read_ibutton_error` fired | Device has left wait mode; call `read_ibutton_from_device_with_callback(true, ...)` again to resume |
| Physical unplug detected in `_cb_system_event` (`"c"`) | Null out instances; update UI to disconnected state |

---

## 10. Differences from the MSR (Magnetic Card) Guide

This guide covers i-Button key reading. The overall flow is identical to the MSR flow, with the following specific differences:

| Aspect | MSR (Magnetic Card) | i-Button Key |
|---|---|---|
| Device path filter | Root composite path (filter out `&ibutton`, `&msr`, `&scr*`, `&switch*`) | Path ending with `&ibutton` |
| Start/stop method | `read_card_from_device_with_callback(b, done, error)` | `read_ibutton_from_device_with_callback(b, done, error)` |
| Data accessor | `get_msr_data(track)` — 3 tracks (0, 1, 2) | `get_ibutton_data()` — single key ID string |
| Error accessor | `get_msr_error_code(track)` — per-track | `get_ibutton_error_code()` — single value |
| Data reset | `reset_msr_data()` | `reset_ibutton_data()` |
| Read done semantics | All three ISO tracks available (some may be empty) | Single key ID value |

---

## 11. Notes and Caveats

- **`reset_ibutton_data()` is mandatory.** Always call `g_ctl_lpu237.get_device().reset_ibutton_data()` at the end of `_cb_read_ibutton_done`. Failing to do so means stale key data persists in the `lpu237` object and will appear on the next key touch.

- **Automatic state transitions.** After `_cb_read_ibutton_done` returns, the device automatically re-enters key-wait mode — you do **not** need to call `read_ibutton_from_device_with_callback(true, ...)` again. After `_cb_read_ibutton_error` fires, the device is **no longer** in wait mode; you must call it again to resume.

- **Stop before close.** Always call `read_ibutton_from_device_with_callback(false, ...)` and wait for the stop callback before calling `close_with_promise()`. Closing while still in wait mode may leave the device in an undefined state.

- **Stop before server disconnect.** Similarly, cancel the active wait before calling `g_coffee.disconnect()`.

- **`coffee.get_instance()` is a singleton.** Do not call `new coffee()`. Always use `coffee.get_instance()`.

- **`connect()` accepts protocol string and port separately.** The protocol must be `"wss"` (not `"wss:"`). Port is passed as a string or number.

- **Path suffix `&ibutton` is case-sensitive.** Always use the exact suffix when filtering device paths.

- **Key history management.** The reference app limits stored key history to 50 entries (`[newEntry, ...prev].slice(0, 50)`). Apply a similar cap in your implementation to prevent unbounded memory growth.

- **Error code `0` means success.** Always check `get_ibutton_error_code() !== 0` before attempting to use the key data, even inside `_cb_read_ibutton_done`.

---

*Document generated based on source code in `packages/lib/elpusk` and `packages/app/webibutton-read`, and the development guide in `prompt/develop-ibutton-read-app.md`.*
