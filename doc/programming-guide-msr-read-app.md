# Programming Guide: Magnetic Card Reader Web App using the Elpusk Library

> **Target audience:** Web application developers who want to read magnetic stripe cards (MSR) using the `@elpusk/lib` TypeScript library.
>
> **Library root:** `packages/lib/elpusk`  
> **Reference app:** `packages/app/webmapper`

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
   - 5.8 [Start Waiting for a Card Swipe](#58-start-waiting-for-a-card-swipe)
   - 5.9 [Stop Waiting for a Card Swipe](#59-stop-waiting-for-a-card-swipe)
   - 5.10 [Close the Device and Disconnect](#510-close-the-device-and-disconnect)
6. [Callback Reference](#6-callback-reference)
7. [Complete Example (TypeScript)](#7-complete-example-typescript)
8. [React Integration Pattern](#8-react-integration-pattern)
9. [Error Handling](#9-error-handling)
10. [Notes and Caveats](#10-notes-and-caveats)

---

## 1. Overview

The Elpusk coffee framework (cf2) provides a WebSocket-based bridge between a browser and USB HID devices such as the **LPU237 / LPU238 / LPU-208D** magnetic card reader family. The browser never talks to the USB hardware directly; it communicates with a locally-running cf2 server process that owns the USB connection.

```
Browser (your web app)
    │  WebSocket (wss://localhost:443)
    ▼
CF2 Server (local service)
    │  USB HID
    ▼
LPU237 Magnetic Card Reader
```

The key classes and their source files are:

| Class / Module | Source file | Purpose |
|---|---|---|
| `coffee` | `elpusk.framework.coffee.ts` | WebSocket session management, device list, file/firmware operations |
| `lpu237` | `elpusk.device.usb.hid.lpu237.ts` | Device data model – stores all parameters and card data |
| `ctl_lpu237` | `elpusk.framework.coffee.ctl_lpu237.ts` | Controller – sends/receives HID packets via `coffee` |

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

The reference app maps `@lib` to the library root so that imports stay short:

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
coffee.get_instance().connect()   ← creates/reuses the WebSocket session
        │
coffee.get_device_list()          ← returns device path strings
        │
new lpu237(path)                  ← device model object
        │
new ctl_lpu237(coffee, lpu237)    ← controller
        │
ctl_lpu237.open_with_promise()
        │
ctl_lpu237.load_basic_info_from_device_with_promise()
        │
ctl_lpu237.read_card_from_device_with_callback(true, onDone, onError)
        │  (card swiped)
        ├─ onDone()  → lpu237.get_msr_data(track)  → display data
        │              lpu237.reset_msr_data()
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
let g_coffee   = coffee.get_instance();
let g_lpu237:   lpu237    | null = null;
let g_ctl:      ctl_lpu237| null = null;

function _cb_system_event(s_action_code: string, s_data_field: string[]): void {
    if (typeof s_action_code === 'undefined') return;

    if (s_action_code === 'c') {
        // A previously-open device was physically removed.
        if (!g_ctl || !g_ctl.get_device()) return;

        for (let i = 0; i < s_data_field.length; i++) {
            if (g_ctl.get_device().get_path() === s_data_field[i]) {
                // The device that is currently in use has been unplugged.
                g_ctl    = null;
                g_lpu237 = null;
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
    const s_session_number = await g_coffee.connect("wss", 443);

    if (typeof s_session_number !== 'string') {
        throw new Error('Failed to connect to CF2 server.');
    }
    console.log('Session number:', s_session_number);
}
```

`connect()` returns a session number string on success. The session is maintained until `disconnect()` is called or the browser tab closes.

#### Server version check (recommended)

The reference app verifies the server version before proceeding:

```ts
const server_version: string = await g_coffee.get_version();
// Require 2.8.0 or higher
```

---

### 5.3 Get the Device List and Select a Device Path

After a successful server connection, query the available HID devices:

```ts
async function getDevicePaths(): Promise<string[]> {
    const raw_list: string[] = await g_coffee.get_device_list("hid#vid_134b&pid_0206&mi_01");

    if (!Array.isArray(raw_list) || raw_list.length === 0) return [];

    // Filter out sub-interface paths (ibutton, msr, scr, switch).
    // Keep only the root composite device paths.
    return raw_list.filter(
        (p) => !/&(ibutton|msr|(scr|switch)\d+)$/.test(p)
    );
}
```

The VID/PID string `hid#vid_134b&pid_0206&mi_01` identifies the Elpusk LPU237 family.

**Selecting the MSR interface path** — if you need the dedicated MSR sub-interface path (e.g., to check raw paths), select the entry whose path ends with `&msr`:

```ts
const msr_path = raw_list.find(p => p.endsWith('&msr'));
```

For typical usage, use the filtered composite path returned by `getDevicePaths()` above.

---

### 5.4 Create an `lpu237` Device Object

```ts
const s_selected_path: string = device_paths[0]; // choose from the list
g_lpu237 = new lpu237(s_selected_path);
```

`lpu237` is a data-model class. It holds all device parameters and card track data in memory but does not communicate with the hardware on its own.

---

### 5.5 Create a `ctl_lpu237` Controller Object

```ts
g_ctl = new ctl_lpu237(g_coffee, g_lpu237);
```

`ctl_lpu237` wraps the `lpu237` object and uses the `coffee` session to send and receive HID packets.

---

### 5.6 Open the Device

```ts
await g_ctl.open_with_promise();
```

Opens the USB HID channel through the CF2 server. Throws on failure.

---

### 5.7 Load Basic Device Information

```ts
await g_ctl.load_basic_info_from_device_with_promise();
```

Reads the firmware version, serial number, and minimum configuration needed to operate the device. After this call you can safely query:

```ts
const name:    string = g_lpu237.get_name();
const version: string = g_lpu237.get_system_version_by_string();
const uid:     string = g_lpu237.get_uid();
```

---

### 5.8 Start Waiting for a Card Swipe

Pass `true` as the first argument to enter read-wait mode:

```ts
g_ctl.read_card_from_device_with_callback(
    true,              // true = start waiting, false = stop waiting
    _cb_read_msr_done, // called when a card is read (success or track error)
    _cb_read_msr_error // called when a protocol/communication error occurs
);
```

#### `_cb_read_msr_done` callback

Called after each card swipe. The device **automatically re-enters wait mode** after this callback returns.

```ts
function _cb_read_msr_done(n_device_index: number, s_msg: string): void {
    // s_msg is always "success"

    for (let track = 0; track < 3; track++) {
        const err_code = g_ctl!.get_device().get_msr_error_code(track);
        if (err_code !== 0) {
            console.warn(`Track ${track + 1} error code: ${err_code}`);
            continue;
        }

        const card_data: string = g_ctl!.get_device().get_msr_data(track);
        if (card_data.length === 0) {
            console.log(`Track ${track + 1}: no data`);
        } else {
            console.log(`Track ${track + 1}: ${card_data}`);
            // TODO: display card_data in your UI
        }
    }

    // Always clear the card data from the controller after reading
    g_ctl!.get_device().reset_msr_data();
}
```

#### `_cb_read_msr_error` callback

Called when a communication or protocol error occurs. The device **exits wait mode** automatically.

```ts
function _cb_read_msr_error(n_device_index: number, event_error: Error): void {
    console.error(`MSR read error on device ${n_device_index}:`, event_error.message);
    // TODO: update UI, decide whether to restart waiting
}
```

---

### 5.9 Stop Waiting for a Card Swipe

To cancel the ongoing wait before a card is swiped, call the same function with `false`:

```ts
g_ctl.read_card_from_device_with_callback(
    false,              // stop waiting
    _cb_stop_msr_done,
    _cb_stop_msr_error
);
```

```ts
function _cb_stop_msr_done(n_device_index: number, s_msg: string): void {
    // s_msg is always "success"; safe to ignore
    console.log(`Device ${n_device_index}: MSR wait cancelled.`);
}

function _cb_stop_msr_error(n_device_index: number, event_error: Error): void {
    console.error(`Stop-MSR error on device ${n_device_index}:`, event_error.message);
}
```

---

### 5.10 Close the Device and Disconnect

When card reading is no longer needed:

```ts
async function cleanup(): Promise<void> {
    // 1. Cancel the wait state (if active)
    //    Use a Promise wrapper or call with callbacks as in step 5.9

    // 2. Close the device channel
    if (g_ctl) {
        await g_ctl.close_with_promise();
        g_ctl    = null;
        g_lpu237 = null;
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
| `_cb_read_msr_done` | `(n_device_index: number, s_msg: string) => void` | Card successfully read (track errors may exist per-track) | Auto re-enters wait |
| `_cb_read_msr_error` | `(n_device_index: number, event_error: Error) => void` | Protocol/communication error during wait | Exits wait |
| `_cb_stop_msr_done` | `(n_device_index: number, s_msg: string) => void` | Wait successfully cancelled | Idle |
| `_cb_stop_msr_error` | `(n_device_index: number, event_error: Error) => void` | Error while trying to cancel wait | Undefined |

### MSR data accessors on `lpu237`

| Method | Description |
|---|---|
| `get_msr_data(track: number): string` | Returns track data string. `track` is 0-based (0=ISO1, 1=ISO2, 2=ISO3). Returns `""` if no data. |
| `get_msr_error_code(track: number): number` | Returns `0` if the track was read without error. Non-zero values are device-specific error codes. |
| `reset_msr_data(): void` | Clears all buffered track data from the object. **Call this after processing each swipe.** |

---

## 7. Complete Example (TypeScript)

Below is a self-contained TypeScript module that reads a card once and then cleans up. It can be adapted to a continuous-reading loop.

```ts
import { coffee }     from '@lib/elpusk.framework.coffee';
import { lpu237 }     from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 } from '@lib/elpusk.framework.coffee.ctl_lpu237';

// ── Module-level state ────────────────────────────────────────────────────────
let g_coffee   = coffee.get_instance();
let g_lpu237:  lpu237    | null = null;
let g_ctl:     ctl_lpu237| null = null;

// ── Callbacks ────────────────────────────────────────────────────────────────

function _cb_system_event(s_action_code: string, s_data_field: string[]): void {
    if (typeof s_action_code === 'undefined') return;

    if (s_action_code === 'c') {
        if (!g_ctl || !g_ctl.get_device()) return;
        for (let i = 0; i < s_data_field.length; i++) {
            if (g_ctl.get_device().get_path() === s_data_field[i]) {
                console.warn('Device unplugged — cleaning up.');
                g_ctl    = null;
                g_lpu237 = null;
                break;
            }
        }
    }

    if (s_action_code === 'P') {
        // New device plugged in — optionally refresh device list
    }
}

function _cb_read_msr_done(n_device_index: number, s_msg: string): void {
    if (!g_ctl) return;

    for (let track = 0; track < 3; track++) {
        if (g_ctl.get_device().get_msr_error_code(track) !== 0) {
            console.warn(`  Track ${track + 1} error:`, g_ctl.get_device().get_msr_error_code(track));
            continue;
        }
        const data = g_ctl.get_device().get_msr_data(track);
        if (data.length > 0) {
            console.log(`  Track ${track + 1}:`, data);
        } else {
            console.log(`  Track ${track + 1}: (empty)`);
        }
    }

    // Clear buffered data — mandatory before the next swipe
    g_ctl.get_device().reset_msr_data();

    // The device automatically re-enters wait mode here.
}

function _cb_read_msr_error(n_device_index: number, event_error: Error): void {
    console.error('MSR read error:', event_error.message);
    // The device exits wait mode automatically; call read_card_from_device_with_callback(true,...)
    // again if you want to restart.
}

function _cb_stop_msr_done(n_device_index: number, s_msg: string): void {
    console.log('MSR wait cancelled successfully.');
}

function _cb_stop_msr_error(n_device_index: number, event_error: Error): void {
    console.error('Stop-MSR error:', event_error.message);
}

// ── Main flow ─────────────────────────────────────────────────────────────────

export async function startMsrReader(): Promise<void> {
    // Step 1 — register system event handler
    coffee.set_system_event_handler(_cb_system_event);

    // Step 2 — connect to CF2 server
    const s_session = await g_coffee.connect('wss', 443);
    if (typeof s_session !== 'string') throw new Error('Server connection failed.');
    console.log('Connected. Session:', s_session);

    // Step 3 — get device list and select a path
    const raw_list: string[] = await g_coffee.get_device_list('hid#vid_134b&pid_0206&mi_01');
    const filtered = raw_list.filter(p => !/&(ibutton|msr|(scr|switch)\d+)$/.test(p));
    if (filtered.length === 0) throw new Error('No LPU237 device found.');

    const s_path = filtered[0];
    console.log('Using device path:', s_path);

    // Step 4 — create lpu237 object
    g_lpu237 = new lpu237(s_path);

    // Step 5 — create controller
    g_ctl = new ctl_lpu237(g_coffee, g_lpu237);

    // Step 6 — open device
    await g_ctl.open_with_promise();
    console.log('Device opened.');

    // Step 7 — load basic info
    await g_ctl.load_basic_info_from_device_with_promise();
    console.log('Device:', g_lpu237.get_name(), 'FW:', g_lpu237.get_system_version_by_string());

    // Step 8 — start waiting for card swipe
    g_ctl.read_card_from_device_with_callback(true, _cb_read_msr_done, _cb_read_msr_error);
    console.log('Waiting for card swipe...');
}

export async function stopMsrReader(): Promise<void> {
    if (!g_ctl) return;

    // Step 9 — cancel wait
    g_ctl.read_card_from_device_with_callback(false, _cb_stop_msr_done, _cb_stop_msr_error);

    // Step 10 — close device
    await g_ctl.close_with_promise();
    g_ctl    = null;
    g_lpu237 = null;

    // Disconnect server
    await g_coffee.disconnect();
    console.log('Reader stopped and server disconnected.');
}
```

---

## 8. React Integration Pattern

The reference app (`webmapper`) places all library interactions inside a `createHandlers()` factory that receives React state refs and setters. Key design points:

### 8.1 Singleton `coffee` instance

`coffee` is a singleton: `coffee.get_instance()` always returns the same object. Declare it at module level (outside any component) so it persists across renders.

```ts
// handlers.ts (module level — outside any React component)
let g_coffee   = coffee.get_instance();
let g_lpu237:  lpu237    | null = null;
let g_ctl:     ctl_lpu237| null = null;
```

### 8.2 Initialisation and cleanup with `useEffect`

```tsx
useEffect(() => {
    // On mount: register system event handler
    coffee.set_system_event_handler(_cb_system_event);

    return () => {
        // On unmount: clean up
        // (optional: disconnect server)
    };
}, []); // empty deps — runs once
```

### 8.3 Preventing double-init in React StrictMode

React 18 StrictMode mounts components twice in development. Guard with a flag:

```ts
let g_initialized = false;

function initializeSystem(): void {
    if (g_initialized) return;
    g_initialized = true;
    coffee.set_system_event_handler(_cb_system_event);
}

function uninitializeSystem(): void {
    g_initialized = false;
}
```

### 8.4 Hot-plug callback registration

Because React may re-mount components, the plug-out cleanup callback should be re-assigned on each initialization so it always closes over the current state setters:

```ts
let g_plugout_cleanup: (() => void) | null = null;

// Inside initializeSystem():
g_plugout_cleanup = () => {
    g_ctl    = null;
    g_lpu237 = null;
    setState(prev => ({ ...prev, status: 'disconnected' }));
};
```

### 8.5 Exposing initialise / uninitialise via the window object (optional)

The reference app uses a pattern compatible with external script loading:

```ts
(window as any).cf2_initialize   = () => { coffee.set_system_event_handler(_cb_system_event); };
(window as any).cf2_uninitialize = () => {};
```

---

## 9. Error Handling

All `*_with_promise()` methods throw `Error` objects on failure. Wrap them in `try/catch`:

```ts
try {
    await g_ctl.open_with_promise();
} catch (err: any) {
    console.error('Open failed:', err.message);
    g_ctl    = null;
    g_lpu237 = null;
}
```

Common error scenarios:

| Scenario | What to do |
|---|---|
| Server not running / wrong port | Show a message asking the user to start the CF2 server |
| Server version too low | Prompt download link to https://github.com/elpusk/publish.framework.coffee.2nd |
| No devices found (`get_device_list` returns empty array) | Show "please connect your reader" message |
| Device open fails | Null out `g_ctl` and `g_lpu237`; display an error |
| `_cb_read_msr_error` fired | Device has left wait mode; call `read_card_from_device_with_callback(true,...)` again if you want to resume |
| Physical unplug detected in `_cb_system_event` (`"c"`) | Null out instances; update UI to disconnected state |

---

## 10. Notes and Caveats

- **`reset_msr_data()` is mandatory.** Always call `g_ctl.get_device().reset_msr_data()` at the end of `_cb_read_msr_done`. Failing to do so means stale card data will persist in the `lpu237` object and appear in the next swipe.

- **Automatic state transitions.** After `_cb_read_msr_done` returns, the device automatically re-enters card-wait mode — you do **not** need to call `read_card_from_device_with_callback(true, ...)` again. After `_cb_read_msr_error` fires, the device is **no longer** in wait mode; you must call it again to resume.

- **One session, many devices.** A single `coffee` session can manage multiple devices simultaneously. Each device is identified by a unique path and a numeric `device_index` returned by `lpu237.get_device_index()`.

- **Empty track data is normal.** Not every magnetic card encodes all three ISO tracks. Always check both `get_msr_error_code(track)` and `get_msr_data(track).length` before attempting to process a track.

- **`coffee.get_instance()` is a singleton.** Do not call `new coffee()`. Always use `coffee.get_instance()`.

- **`connect()` accepts protocol string and port separately.** The protocol must be `"wss"` (not `"wss:"`). Port is a number or numeric string.

- **Device path filtering.** `get_device_list()` returns paths for all sub-interfaces of the device (MSR, iButton, SCR, etc.). For the composite device object used by `lpu237` / `ctl_lpu237`, filter out paths that end with `&msr`, `&ibutton`, `&scr0`, `&switch0`, etc., keeping only the root path.

---

*Document generated based on source code in `packages/lib/elpusk` and `packages/app/webmapper`, and the development guide in `prompt/develop-msr-read-app.md` by Claude.*
