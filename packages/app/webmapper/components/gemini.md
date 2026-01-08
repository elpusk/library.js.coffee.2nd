# UI Components Directory

This directory houses the modular React components that form the Elpusk configuration interface.

## Component Overview
- **Header & Footer**: Persistent layout elements providing status information and metadata.
- **Sidebar**: Dynamic navigation that adjusts based on the connected device type.
- **DeviceTab**: Handles the "Connect" logic, log display, and file operations (Loading/Saving settings and Firmware updates).
- **CommonTab**: Manages shared settings like Interface mode, Buzzer state, and Language.
- **KeyMapTab**: A reusable interface for mapping key sequences (Prefixes/Suffixes) using a visual editor.
- **VirtualKeyboard**: A specialized input component that captures keyboard events without requiring physical keystrokes, ideal for remote or specialized configuration.

## Design Principles
- **Aesthetics**: Clean, industrial gray palette with high-contrast active states.
- **Feedback**: Real-time logging of all configuration changes.
- **Safety**: Configuration tabs are disabled until a device connection is simulated or established.